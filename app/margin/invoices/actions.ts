'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function ctx() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not signed in')
  return { userId: user.id, supabase }
}

/** Called after the file has been uploaded to storage from the browser. */
export async function registerInvoice(
  siteId: string, filePath: string, fileName: string, mimeType: string
) {
  const { userId, supabase } = await ctx()
  const { data, error } = await supabase.from('invoices').insert({
    site_id: siteId,
    file_path: filePath,
    file_name: fileName,
    mime_type: mimeType,
    status: 'uploaded',
    created_by: userId,
  }).select('id').single()

  if (error) return { error: error.message }
  revalidatePath('/margin/invoices')
  return { ok: true, id: data?.id }
}

/** Set what a line should be matched to, before applying. */
export async function setLineMatch(
  lineId: string, ingredientId: string | null, impliedPrice: number | null
) {
  const { supabase } = await ctx()
  const { error } = await supabase.from('invoice_lines').update({
    ingredient_id: ingredientId,
    implied_price: impliedPrice,
    match_confidence: ingredientId ? 'exact' : 'none',
  }).eq('id', lineId)

  if (error) return { error: error.message }
  revalidatePath('/margin/invoices')
  return { ok: true }
}

export async function setLineDecision(lineId: string, decision: 'apply' | 'skip') {
  const { supabase } = await ctx()
  const { error } = await supabase.from('invoice_lines').update({
    decision, decided_at: new Date().toISOString(),
  }).eq('id', lineId)

  if (error) return { error: error.message }
  revalidatePath('/margin/invoices')
  return { ok: true }
}

/**
 * Apply the confirmed lines. Writes the new price to each ingredient,
 * records a dated price history row, and remembers the description so
 * the same line matches itself next month.
 */
export async function applyInvoice(invoiceId: string) {
  const { userId, supabase } = await ctx()

  const { data: invoice } = await supabase
    .from('invoices').select('*').eq('id', invoiceId).single()
  if (!invoice) return { error: 'Invoice not found' }

  const { data: lines } = await supabase
    .from('invoice_lines').select('*').eq('invoice_id', invoiceId)

  const toApply = (lines ?? []).filter((l: any) =>
    l.decision === 'apply' && l.ingredient_id && l.implied_price != null)

  if (!toApply.length) {
    return { error: 'No lines are marked to apply.' }
  }

  let applied = 0
  let unchanged = 0

  for (const line of toApply) {
    const { data: ing } = await supabase
      .from('ingredients').select('current_price').eq('id', line.ingredient_id).single()

    const next = Number(line.implied_price)
    const moved = !ing || Math.abs(Number(ing.current_price) - next) > 0.0001

    if (moved) {
      await supabase.from('ingredients')
        .update({ current_price: next }).eq('id', line.ingredient_id)

      await supabase.from('ingredient_prices').insert({
        ingredient_id: line.ingredient_id,
        price: next,
        effective_on: invoice.invoice_date || new Date().toISOString().slice(0, 10),
        source: invoice.supplier_name
          ? `${invoice.supplier_name}${invoice.invoice_ref ? ' ' + invoice.invoice_ref : ''}`
          : 'Invoice',
      })
      applied++
    } else {
      unchanged++
    }

    // Remember the match for next time
    await supabase.from('supplier_aliases').upsert({
      site_id: invoice.site_id,
      supplier_id: invoice.supplier_id,
      raw_description: line.raw_description,
      raw_code: line.raw_code,
      ingredient_id: line.ingredient_id,
      units_per_invoice_unit: 1,
      confirmed_by: userId,
    }, { onConflict: 'site_id,raw_description,raw_code' })
  }

  await supabase.from('invoices').update({
    status: 'applied',
    applied_at: new Date().toISOString(),
    applied_by: userId,
  }).eq('id', invoiceId)

  revalidatePath('/margin/invoices')
  revalidatePath('/margin/ingredients')
  revalidatePath('/margin/dishes')
  revalidatePath('/margin')

  return { ok: true, applied, unchanged }
}

/** Create a new ingredient straight from an unmatched line. */
export async function ingredientFromLine(lineId: string, formData: FormData) {
  const { supabase } = await ctx()

  const { data: line } = await supabase
    .from('invoice_lines').select('*, invoices(site_id, supplier_id)').eq('id', lineId).single()
  if (!line) return { error: 'Line not found' }

  const site = (line as any).invoices?.site_id
  if (!site) return { error: 'Could not work out the site' }

  const name = String(formData.get('name') || '').trim()
  if (!name) return { error: 'Give the ingredient a name.' }

  const unitsPerPack = parseFloat(String(formData.get('units_per_pack') || '1')) || 1
  const price = Number(line.unit_price) || 0

  const { data: ing, error } = await supabase.from('ingredients').insert({
    site_id: site,
    supplier_id: (line as any).invoices?.supplier_id ?? null,
    name,
    pack_size: parseFloat(String(formData.get('pack_size') || '1')) || 1,
    pack_unit: String(formData.get('pack_unit') || 'kg'),
    recipe_unit: String(formData.get('recipe_unit') || 'g'),
    units_per_pack: unitsPerPack,
    current_price: price,
  }).select('id').single()

  if (error) return { error: error.message }

  await supabase.from('ingredient_prices').insert({
    ingredient_id: ing.id, price, source: 'Created from an invoice',
  })

  await supabase.from('invoice_lines').update({
    ingredient_id: ing.id,
    match_confidence: 'exact',
    implied_price: price,
    decision: 'apply',
  }).eq('id', lineId)

  revalidatePath('/margin/invoices')
  return { ok: true }
}

export async function deleteInvoice(invoiceId: string) {
  const { supabase } = await ctx()

  const { data: invoice } = await supabase
    .from('invoices').select('file_path').eq('id', invoiceId).single()

  if (invoice?.file_path) {
    await supabase.storage.from('invoices').remove([invoice.file_path])
  }

  const { error } = await supabase.from('invoices').delete().eq('id', invoiceId)
  if (error) return { error: error.message }

  revalidatePath('/margin/invoices')
  return { ok: true }
}
