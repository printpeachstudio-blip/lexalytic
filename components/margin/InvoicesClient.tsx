'use client'

import React, { useState, useRef, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { money2, pct, fmtDate } from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import {
  registerInvoice, setLineMatch, setLineDecision, updateLine,
  applyInvoice, ingredientFromLine, deleteInvoice,
} from '@/app/margin/invoices/actions'

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Invoice {
  id: string
  file_name: string | null
  status: string
  supplier_name: string | null
  invoice_ref: string | null
  invoice_date: string | null
  total_net: number | null
  notes: string | null
  error: string | null
  created_at: string
}

interface Line {
  id: string
  invoice_id: string
  raw_description: string
  raw_code: string | null
  quantity: number | null
  pack_size: string | null
  unit_price: number | null
  line_total: number | null
  ingredient_id: string | null
  match_confidence: 'exact' | 'likely' | 'unsure' | 'none' | null
  implied_price: number | null
  decision: 'apply' | 'skip' | 'new_ingredient' | null
  ingredient_name: string | null
  ingredient_current_price: number | null
  ingredient_recipe_unit: string | null
  price_change_pct: number | null
}

const STATUS = {
  uploaded:   { label: 'Waiting', c: '#57514A', b: '#EDE7DD' },
  extracting: { label: 'Reading', c: '#8F6318', b: 'rgba(176,122,30,0.22)' },
  review:     { label: 'Needs review', c: '#8F6318', b: 'rgba(176,122,30,0.22)' },
  applied:    { label: 'Applied', c: '#3F6B4C', b: 'rgba(63,107,76,0.22)' },
  failed:     { label: 'Could not read', c: '#A13B2A', b: 'rgba(161,59,42,0.22)' },
  ignored:    { label: 'Ignored', c: '#8A8279', b: '#EDE7DD' },
}

const CONFIDENCE = {
  exact:  { label: 'Matched', c: '#3F6B4C' },
  likely: { label: 'Probably', c: '#8F6318' },
  unsure: { label: 'Not sure', c: '#A13B2A' },
  none:   { label: 'No match', c: '#A13B2A' },
}

export default function InvoicesClient({
  siteId, invoices, lines, ingredients,
}: {
  siteId: string
  invoices: Invoice[]
  lines: Line[]
  ingredients: { id: string; name: string; recipe_unit: string; current_price: number }[]
}) {
  const [open, setOpen] = useState<string | null>(
    invoices.find(i => i.status === 'review')?.id ?? null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [newFor, setNewFor] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [pending, start] = useTransition()

  const linesFor = (id: string) => lines.filter(l => l.invoice_id === id)

  const run = (fn: () => Promise<any>, msg?: string) => {
    setError(''); setNotice('')
    start(async () => {
      const r = await fn()
      if (r?.error) setError(r.error)
      else if (msg) setNotice(msg)
      else if (r?.applied !== undefined) {
        setNotice(`${r.applied} price${r.applied === 1 ? '' : 's'} updated` +
          (r.unchanged ? `, ${r.unchanged} unchanged` : ''))
      }
    })
  }

  const upload = async (file: File) => {
    setBusy(true); setError(''); setNotice('')
    try {
      const supabase = createClient()
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
      const path = `${siteId}/${crypto.randomUUID()}.${ext}`

      const { error: upErr } = await supabase.storage
        .from('invoices').upload(path, file, { contentType: file.type })
      if (upErr) throw new Error(upErr.message)

      const reg = await registerInvoice(siteId, path, file.name, file.type)
      if (reg?.error) throw new Error(reg.error)

      setNotice('Uploaded. Reading it now, which usually takes a few seconds.')

      const res = await fetch('/api/invoices/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId: reg.id }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Could not read the document')
      if (!data.ok) {
        setError(data.reason || 'Nothing readable was found on that document.')
      } else {
        setNotice(`${data.lines} lines found, ${data.matched} matched automatically.` +
          (data.unmatched ? ` ${data.unmatched} need a look.` : ''))
        setOpen(reg.id!)
      }
      window.location.reload()
    } catch (e: any) {
      setError(e?.message || 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="m-wrap" style={{ paddingTop: 36 }}>
      <style>{MARGIN_STYLES}</style>
      <style>{`
        .iv-line { display: grid; grid-template-columns: 1.5fr 1.3fr 110px 120px 150px;
          gap: 12px; align-items: center; padding: 13px 0; border-bottom: 1px solid #F4F0E8; }
        .iv-drop { border: 2px dashed #DDD6CC; border-radius: 10px; padding: 32px;
          text-align: center; cursor: pointer; background: #fff; transition: border-color .15s; }
        .iv-drop:hover { border-color: ${AMBER}; }
        @media (max-width: 900px) { .iv-line { grid-template-columns: 1fr 1fr; gap: 6px; } }
      `}</style>

      <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400,
        letterSpacing: '-0.02em', margin: '0 0 8px' }}>
        Invoices
      </h1>
      <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 8px', maxWidth: 680 }}>
        Photograph a delivery note or upload a PDF and the line items come back structured. Prices are
        never applied automatically, because a wrong figure would move every dish containing that
        ingredient. You confirm each line first.
      </p>
      <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 680 }}>
        The first invoice from a supplier takes a few minutes. After that it remembers what each line
        means, so the next one is mostly a glance.
      </p>

      {ingredients.length === 0 && invoices.length > 0 && (
        <div style={{ fontSize: 14.5, color: '#8F6318', background: 'rgba(176,122,30,0.07)',
          border: '1px solid rgba(176,122,30,0.22)', borderRadius: 8,
          padding: '14px 18px', marginBottom: 16, lineHeight: 1.7 }}>
          You have no ingredients yet, so nothing can match automatically. Use the New button on each
          line to create one from the invoice, or add them first on the{' '}
          <a href="/margin/ingredients" style={{ color: '#8F6318', fontWeight: 600 }}>ingredients page</a>.
        </div>
      )}

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6,
          padding: '11px 14px', marginBottom: 16 }}>{error}</div>
      )}
      {notice && (
        <div style={{ fontSize: 14, color: '#3F6B4C', background: 'rgba(63,107,76,0.07)',
          border: '1px solid rgba(63,107,76,0.2)', borderRadius: 6,
          padding: '11px 14px', marginBottom: 16 }}>{notice}</div>
      )}

      {/* Upload */}
      <div className="iv-drop" style={{ marginBottom: 24, opacity: busy ? 0.6 : 1 }}
        onClick={() => !busy && fileRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault()
          const f = e.dataTransfer.files?.[0]
          if (f && !busy) upload(f)
        }}>
        <input ref={fileRef} type="file" accept="image/*,application/pdf" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f) }} />
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>
          {busy ? 'Reading the document…' : 'Drop an invoice here, or click to choose one'}
        </div>
        <div style={{ fontSize: 13.5, color: '#8A8279', lineHeight: 1.6 }}>
          A photo taken on a phone is usually fine. PDF works too. Up to 10MB.
        </div>
        <div style={{ fontSize: 12.5, color: '#8A8279', lineHeight: 1.6, marginTop: 8,
          maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
          The file is stored in your account and sent to Anthropic, whose model reads it. They do not
          use it to train anything. Deleting the invoice deletes the file.
        </div>
      </div>

      {invoices.length === 0 && (
        <div className="m-card" style={{ padding: '26px 30px', fontSize: 15,
          color: '#57514A', lineHeight: 1.75 }}>
          Nothing uploaded yet. Start with the supplier you buy from most, since that is where the
          learning pays back fastest.
        </div>
      )}

      {invoices.map(inv => {
        const st = STATUS[inv.status as keyof typeof STATUS] || STATUS.uploaded
        const isOpen = open === inv.id
        const iLines = linesFor(inv.id)
        const toApply = iLines.filter(l => l.decision === 'apply').length
        const needsLook = iLines.filter(l =>
          !l.decision && (l.match_confidence === 'unsure' || l.match_confidence === 'none')).length

        return (
          <div key={inv.id} className="m-card" style={{ marginBottom: 12, overflow: 'hidden',
            borderColor: inv.status === 'review' ? 'rgba(176,122,30,0.25)'
              : inv.status === 'failed' ? 'rgba(161,59,42,0.25)' : '#E8E2D8' }}>

            <button onClick={() => setOpen(isOpen ? null : inv.id)} aria-expanded={isOpen}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 0,
                font: 'inherit', padding: '16px 22px', cursor: 'pointer',
                display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 220px' }}>
                <div style={{ fontSize: 15.5, fontWeight: 600 }}>
                  {inv.supplier_name || inv.file_name || 'Invoice'}
                </div>
                <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                  {inv.invoice_ref ? `${inv.invoice_ref} · ` : ''}
                  {inv.invoice_date ? fmtDate(inv.invoice_date) : fmtDate(inv.created_at.slice(0, 10))}
                  {iLines.length ? ` · ${iLines.length} lines` : ''}
                  {inv.total_net ? ` · ${money2(Number(inv.total_net))}` : ''}
                </div>
              </div>
              {needsLook > 0 && inv.status === 'review' && (
                <span className="m-tag" style={{ color: '#A13B2A',
                  border: '1px solid rgba(161,59,42,0.22)' }}>
                  {needsLook} need a look
                </span>
              )}
              <span className="m-tag" style={{ color: st.c, border: `1px solid ${st.b}` }}>
                {st.label}
              </span>
              <span style={{ fontSize: 13, color: '#8A8279' }}>{isOpen ? 'Close' : 'Open'}</span>
            </button>

            {isOpen && (
              <div style={{ padding: '4px 22px 20px', borderTop: '1px solid #F0EBE2' }}>
                {inv.error && (
                  <div style={{ marginTop: 14, padding: '13px 16px', borderRadius: 6,
                    background: 'rgba(161,59,42,0.05)', border: '1px solid rgba(161,59,42,0.2)',
                    fontSize: 14, color: '#A13B2A', lineHeight: 1.7 }}>
                    {inv.error}
                  </div>
                )}
                {inv.notes && (
                  <div style={{ marginTop: 14, padding: '13px 16px', borderRadius: 6,
                    background: 'rgba(176,122,30,0.06)', border: '1px solid rgba(176,122,30,0.2)',
                    fontSize: 14, color: '#8F6318', lineHeight: 1.7 }}>
                    Worth checking: {inv.notes}
                  </div>
                )}

                {iLines.length > 0 && (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, margin: '18px 0 4px' }}>
                      Lines read from the document
                    </div>
                    <div style={{ fontSize: 12.5, color: '#8A8279', marginBottom: 12, lineHeight: 1.6 }}>
                      Anything marked not sure needs confirming before it will change a price. Every
                      figure here is editable, so if a number was misread you can correct it rather than
                      rejecting the line. A price outlined in amber was not readable and needs filling in.
                    </div>

                    {iLines.map(l => {
                      const conf = CONFIDENCE[l.match_confidence || 'none']
                      const changed = l.price_change_pct !== null && Math.abs(Number(l.price_change_pct)) > 0.5
                      return (
                        <div key={l.id}>
                          <div className="iv-line">
                            <div>
                              {inv.status === 'applied' ? (
                                <div style={{ fontSize: 14 }}>{l.raw_description}</div>
                              ) : (
                                <input className="m-in" defaultValue={l.raw_description}
                                  style={{ fontSize: 14, padding: '6px 9px' }}
                                  onBlur={e => {
                                    const v = e.target.value.trim()
                                    if (v && v !== l.raw_description) {
                                      run(() => updateLine(l.id, { raw_description: v }))
                                    }
                                  }} />
                              )}
                              <div style={{ display: 'flex', gap: 7, alignItems: 'center',
                                marginTop: 5, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 12, color: '#8A8279' }}>qty</span>
                                <input className="m-in" type="number" step="0.01"
                                  defaultValue={l.quantity ?? ''} placeholder="?"
                                  disabled={inv.status === 'applied'}
                                  style={{ width: 62, fontSize: 12.5, padding: '4px 6px' }}
                                  onBlur={e => {
                                    const v = e.target.value === '' ? null : parseFloat(e.target.value)
                                    if (v !== l.quantity) run(() => updateLine(l.id, { quantity: v }))
                                  }} />
                                <span style={{ fontSize: 12, color: '#8A8279' }}>at £</span>
                                <input className="m-in" type="number" step="0.0001"
                                  defaultValue={l.unit_price ?? ''} placeholder="?"
                                  disabled={inv.status === 'applied'}
                                  style={{ width: 84, fontSize: 12.5, padding: '4px 6px',
                                    borderColor: l.unit_price == null ? '#C17D2E' : '#DDD6CC' }}
                                  onBlur={e => {
                                    const v = e.target.value === '' ? null : parseFloat(e.target.value)
                                    if (v !== l.unit_price) run(() => updateLine(l.id, { unit_price: v }))
                                  }} />
                                {l.pack_size && (
                                  <span style={{ fontSize: 12, color: '#8A8279' }}>{l.pack_size}</span>
                                )}
                              </div>
                            </div>

                            <div>
                              {ingredients.length === 0 ? (
                                <div style={{ fontSize: 12.5, color: '#8A8279', lineHeight: 1.5 }}>
                                  No ingredients yet. Use New to create one from this line.
                                </div>
                              ) : (
                                <select className="m-sel" style={{ fontSize: 13.5, padding: '7px 9px' }}
                                  value={l.ingredient_id || ''}
                                  disabled={inv.status === 'applied'}
                                  onChange={e => {
                                    const v = e.target.value || null
                                    run(() => setLineMatch(l.id, v, l.unit_price))
                                  }}>
                                  <option value="">Not matched</option>
                                  {ingredients.map(i => (
                                    <option key={i.id} value={i.id}>{i.name}</option>
                                  ))}
                                </select>
                              )}
                            </div>

                            <div style={{ fontSize: 13, color: conf.c, fontWeight: 500 }}>
                              {conf.label}
                            </div>

                            <div style={{ fontSize: 13.5 }}>
                              {l.ingredient_id && l.ingredient_current_price != null ? (
                                <>
                                  <span style={{ color: '#8A8279' }}>
                                    {money2(Number(l.ingredient_current_price))}
                                  </span>
                                  {changed && (
                                    <span style={{ color: Number(l.price_change_pct) > 0 ? '#A13B2A' : '#3F6B4C',
                                      fontWeight: 600 }}>
                                      {' → '}{money2(Number(l.implied_price))}
                                    </span>
                                  )}
                                  {changed && (
                                    <div style={{ fontSize: 12,
                                      color: Number(l.price_change_pct) > 0 ? '#A13B2A' : '#3F6B4C' }}>
                                      {Number(l.price_change_pct) > 0 ? '+' : ''}
                                      {Number(l.price_change_pct).toFixed(1)}%
                                    </div>
                                  )}
                                  {!changed && (
                                    <div style={{ fontSize: 12, color: '#8A8279' }}>no change</div>
                                  )}
                                </>
                              ) : (
                                <span style={{ color: '#C4BDB2' }}>—</span>
                              )}
                            </div>

                            <div style={{ display: 'flex', gap: 10, alignItems: 'center',
                              flexWrap: 'wrap' }}>
                              {inv.status === 'applied' ? (
                                <span style={{ fontSize: 13,
                                  color: l.decision === 'apply' ? '#3F6B4C' : '#8A8279' }}>
                                  {l.decision === 'apply' ? 'Applied' : 'Skipped'}
                                </span>
                              ) : !l.ingredient_id ? (
                                <>
                                  <button className="m-btn m-quiet"
                                    style={{ fontSize: 13, padding: '6px 12px' }}
                                    onClick={() => setNewFor(newFor === l.id ? null : l.id)}>
                                    {newFor === l.id ? 'Cancel' : 'Create ingredient'}
                                  </button>
                                  <span style={{ fontSize: 12, color: '#8A8279', lineHeight: 1.4,
                                    flexBasis: '100%' }}>
                                    Match it above first, or create it here.
                                  </span>
                                </>
                              ) : l.unit_price == null ? (
                                <span style={{ fontSize: 12.5, color: '#8F6318', lineHeight: 1.5 }}>
                                  Enter a price before this can be applied.
                                </span>
                              ) : (
                                <label style={{ fontSize: 13, display: 'flex', gap: 6,
                                  alignItems: 'center', cursor: 'pointer' }}>
                                  <input type="checkbox" checked={l.decision === 'apply'}
                                    onChange={e => run(() =>
                                      setLineDecision(l.id, e.target.checked ? 'apply' : 'skip'))} />
                                  Apply
                                </label>
                              )}
                            </div>
                          </div>

                          {newFor === l.id && (
                            <div className="nl-form" style={{ padding: '14px 0 18px',
                              borderBottom: '1px solid #F4F0E8' }}>
                              <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 10 }}>
                                Create an ingredient from this line. The price comes from the invoice.
                              </div>
                              <div style={{ display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                                gap: 10, marginBottom: 12, maxWidth: 640 }}>
                                <div>
                                  <label className="m-label">Name</label>
                                  <input name="name" className="m-in"
                                    defaultValue={l.raw_description.slice(0, 40)} />
                                </div>
                                <div>
                                  <label className="m-label">Pack size</label>
                                  <input name="pack_size" type="number" step="0.01"
                                    className="m-in" defaultValue="1" />
                                </div>
                                <div>
                                  <label className="m-label">Pack unit</label>
                                  <input name="pack_unit" className="m-in" defaultValue="kg" />
                                </div>
                                <div>
                                  <label className="m-label">Recipe unit</label>
                                  <input name="recipe_unit" className="m-in" defaultValue="g" />
                                </div>
                                <div>
                                  <label className="m-label">Units per pack</label>
                                  <input name="units_per_pack" type="number" className="m-in"
                                    defaultValue="1000" />
                                </div>
                              </div>
                              <button className="m-btn m-quiet" disabled={pending} onClick={e => {
                                const wrap = e.currentTarget.closest('.nl-form') as HTMLElement
                                const fd = new FormData()
                                wrap.querySelectorAll('input').forEach((x: any) => {
                                  if (x.name) fd.append(x.name, x.value)
                                })
                                run(async () => {
                                  const r = await ingredientFromLine(l.id, fd)
                                  if (!r?.error) setNewFor(null)
                                  return r
                                }, 'Ingredient created and matched.')
                              }}>Create and match</button>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {inv.status === 'review' && (
                      <div style={{ display: 'flex', gap: 16, alignItems: 'center',
                        flexWrap: 'wrap', marginTop: 18, paddingTop: 14,
                        borderTop: '1px solid #F0EBE2' }}>
                        <button className="m-btn" disabled={pending || toApply === 0}
                          onClick={() => {
                            if (!confirm(`Apply ${toApply} price change${toApply === 1 ? '' : 's'}? Every dish using these ingredients will recost.`)) return
                            run(() => applyInvoice(inv.id))
                          }}>
                          Apply {toApply} line{toApply === 1 ? '' : 's'}
                        </button>
                        <span style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.6,
                          maxWidth: 460 }}>
                          {toApply === 0
                            ? 'Nothing ticked yet. A line can only be applied once it is matched to an ingredient and has a price.'
                            : 'Each ticked line overwrites that ingredient price, records a dated entry in its history, and recosts every dish containing it. The match is remembered for next time.'}
                        </span>
                      </div>
                    )}
                  </>
                )}

                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center',
                  marginTop: 16, paddingTop: 12, borderTop: '1px solid #F4F0E8' }}>
                  {inv.status === 'failed' && (
                    <span style={{ fontSize: 13.5, color: '#8A8279' }}>
                      A clearer photo, taken square on with the whole page in frame, usually fixes it.
                    </span>
                  )}
                  <button className="m-link" style={{ color: '#8A8279', marginLeft: 'auto' }}
                    onClick={() => {
                      if (!confirm('Delete this invoice and its file?')) return
                      run(() => deleteInvoice(inv.id), 'Deleted.')
                    }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
