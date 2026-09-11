import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Claude reads the document and returns structured lines. It is told
// plainly to leave a field null rather than guess, because a wrong
// price cascades to every dish containing that ingredient.
const PROMPT = `You are reading a supplier invoice or delivery note for a UK hospitality business.

Return ONLY a JSON object, no preamble, no markdown fences, in exactly this shape:

{
  "supplier_name": string or null,
  "invoice_ref": string or null,
  "invoice_date": "YYYY-MM-DD" or null,
  "total_net": number or null,
  "total_gross": number or null,
  "currency": string or null,
  "lines": [
    {
      "description": string,
      "code": string or null,
      "quantity": number or null,
      "pack_size": string or null,
      "unit_price": number or null,
      "line_total": number or null
    }
  ],
  "notes": string or null
}

Rules that matter:

- Read every product line. Ignore delivery charges, surcharges and VAT lines.
- description is the product text exactly as printed. Do not tidy it, expand
  abbreviations or correct spelling. It is used to match against previous invoices.
- pack_size is the pack as printed, for example "6x2.5kg" or "12x1L" or "25kg".
  Leave it null if the invoice does not state one.
- unit_price is the price for one of whatever the quantity counts, before VAT.
- If a figure is unclear, blurred or ambiguous, set it to null. Do not estimate.
- If the image is too poor to read reliably, return an empty lines array and
  explain why in notes.
- Use notes for anything a human should check, such as a credit line, a
  handwritten amendment, or figures that do not add up.
- Dates on UK invoices are day first. 03/04/2026 is 3 April.`

interface Extracted {
  supplier_name: string | null
  invoice_ref: string | null
  invoice_date: string | null
  total_net: number | null
  total_gross: number | null
  lines: Array<{
    description: string
    code: string | null
    quantity: number | null
    pack_size: string | null
    unit_price: number | null
    line_total: number | null
  }>
  notes: string | null
}

// Normalise a description enough to compare it, without losing meaning
function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
}

// How similar two descriptions are, 0 to 1, on shared words
function similarity(a: string, b: string): number {
  const wa = new Set(norm(a).split(' ').filter(w => w.length > 2))
  const wb = new Set(norm(b).split(' ').filter(w => w.length > 2))
  if (!wa.size || !wb.size) return 0
  let shared = 0
  wa.forEach(w => { if (wb.has(w)) shared++ })
  return shared / Math.max(wa.size, wb.size)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  let body: { invoiceId?: string }
  try { body = await request.json() } catch { body = {} }
  if (!body.invoiceId) {
    return NextResponse.json({ error: 'No invoice given' }, { status: 400 })
  }

  // RLS means this only returns an invoice the user can reach
  const { data: invoice, error: invErr } = await supabase
    .from('invoices').select('*').eq('id', body.invoiceId).single()

  if (invErr || !invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }
  if (!invoice.file_path) {
    return NextResponse.json({ error: 'No file attached' }, { status: 400 })
  }

  await supabase.from('invoices').update({ status: 'extracting', error: null })
    .eq('id', invoice.id)

  try {
    // Pull the file back out of storage as base64
    const { data: file, error: dlErr } = await supabase.storage
      .from('invoices').download(invoice.file_path)
    if (dlErr || !file) throw new Error('Could not read the uploaded file')

    const buf = Buffer.from(await file.arrayBuffer())
    const b64 = buf.toString('base64')
    const mime = invoice.mime_type || 'image/jpeg'
    const isPdf = mime === 'application/pdf'

    const content: any[] = [
      isPdf
        ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b64 } }
        : { type: 'image', source: { type: 'base64', media_type: mime, data: b64 } },
      { type: 'text', text: PROMPT },
    ]

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content }],
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      throw new Error(`Extraction failed: ${res.status} ${detail.slice(0, 200)}`)
    }

    const data = await res.json()
    const text = (data.content || [])
      .filter((c: any) => c.type === 'text')
      .map((c: any) => c.text)
      .join('')
      .replace(/```json|```/g, '')
      .trim()

    let parsed: Extracted
    try {
      parsed = JSON.parse(text)
    } catch {
      throw new Error('Could not read the response as structured data')
    }

    if (!Array.isArray(parsed.lines) || parsed.lines.length === 0) {
      await supabase.from('invoices').update({
        status: 'failed',
        error: parsed.notes || 'Nothing readable was found on the document',
        notes: parsed.notes,
      }).eq('id', invoice.id)
      return NextResponse.json({
        ok: false,
        reason: parsed.notes || 'Nothing readable was found. A clearer photo usually fixes it.',
      })
    }

    // Load what we know, for matching
    const [{ data: ingredients }, { data: aliases }] = await Promise.all([
      supabase.from('ingredients').select('*')
        .eq('site_id', invoice.site_id).eq('archived', false),
      supabase.from('supplier_aliases').select('*').eq('site_id', invoice.site_id),
    ])

    const rows = parsed.lines.map(line => {
      const desc = line.description || ''
      let ingredientId: string | null = null
      let confidence: 'exact' | 'likely' | 'unsure' | 'none' = 'none'
      let impliedPrice: number | null = null

      // A confirmed alias is the strongest signal, and carries the conversion
      const alias = (aliases ?? []).find((a: any) =>
        norm(a.raw_description) === norm(desc) ||
        (line.code && a.raw_code && a.raw_code === line.code))

      if (alias) {
        ingredientId = alias.ingredient_id
        confidence = 'exact'
        if (line.unit_price != null && Number(alias.units_per_invoice_unit) > 0) {
          // Price per invoice unit divided by how many recipe units that is
          impliedPrice = Number(line.unit_price)
        }
      } else {
        // Fall back to comparing against ingredient names
        let bestId: string | null = null
        let bestScore = 0
        for (const ing of (ingredients ?? []) as any[]) {
          const score = similarity(desc, ing.name)
          if (score > bestScore) {
            bestScore = score
            bestId = ing.id
          }
        }
        if (bestId && bestScore >= 0.6) {
          ingredientId = bestId
          confidence = bestScore >= 0.8 ? 'likely' : 'unsure'
          if (line.unit_price != null) impliedPrice = Number(line.unit_price)
        }
      }

      return {
        invoice_id: invoice.id,
        raw_description: desc,
        raw_code: line.code ?? null,
        quantity: line.quantity ?? null,
        pack_size: line.pack_size ?? null,
        unit_price: line.unit_price ?? null,
        line_total: line.line_total ?? null,
        ingredient_id: ingredientId,
        match_confidence: confidence,
        implied_price: impliedPrice,
      }
    })

    // Replace any previous attempt on this invoice
    await supabase.from('invoice_lines').delete().eq('invoice_id', invoice.id)
    const { error: insErr } = await supabase.from('invoice_lines').insert(rows)
    if (insErr) throw new Error(insErr.message)

    // Try to attach it to a supplier we already know
    let supplierId = invoice.supplier_id
    if (!supplierId && parsed.supplier_name) {
      const { data: suppliers } = await supabase.from('suppliers')
        .select('id, name').eq('site_id', invoice.site_id)
      const hit = (suppliers ?? []).find((s: any) =>
        similarity(s.name, parsed.supplier_name!) >= 0.7)
      if (hit) supplierId = hit.id
    }

    await supabase.from('invoices').update({
      status: 'review',
      supplier_id: supplierId,
      supplier_name: parsed.supplier_name,
      invoice_ref: parsed.invoice_ref,
      invoice_date: parsed.invoice_date,
      total_net: parsed.total_net,
      total_gross: parsed.total_gross,
      notes: parsed.notes,
      extracted_at: new Date().toISOString(),
      error: null,
    }).eq('id', invoice.id)

    const matched = rows.filter(r => r.ingredient_id).length
    return NextResponse.json({
      ok: true,
      lines: rows.length,
      matched,
      unmatched: rows.length - matched,
      supplier: parsed.supplier_name,
      notes: parsed.notes,
    })

  } catch (e: any) {
    const message = String(e?.message || e).slice(0, 400)
    await supabase.from('invoices').update({ status: 'failed', error: message })
      .eq('id', invoice.id)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
