'use client'

import React, { useState, useMemo, useTransition } from 'react'
import {
  type Site, type Ingredient, type Supplier, type PriceRow, type Dish, type DishLine,
  money2, fmtDate, todayStr,
} from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import { saveIngredient, archiveIngredient, saveSupplier, applyPriceRise } from '@/app/margin/actions'

const AMBER = '#C17D2E'
const INK = '#1A1815'

const UNIT_PRESETS = [
  { label: 'kg pack, grams in recipes', pack: 'kg', recipe: 'g', per: 1000 },
  { label: 'litre pack, ml in recipes', pack: 'l', recipe: 'ml', per: 1000 },
  { label: 'case, units in recipes', pack: 'case', recipe: 'unit', per: 1 },
  { label: 'each', pack: 'each', recipe: 'each', per: 1 },
]

export default function IngredientsClient({
  site, ingredients, suppliers, prices, dishes, lines,
}: {
  site: Site; ingredients: Ingredient[]; suppliers: Supplier[]
  prices: PriceRow[]; dishes: Dish[]; lines: DishLine[]
}) {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const [addingSupplier, setAddingSupplier] = useState(false)
  const [riseFor, setRiseFor] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [pending, start] = useTransition()

  // Which dishes use each ingredient, so a price change shows its blast radius
  const usedBy = useMemo(() => {
    const m: Record<string, string[]> = {}
    lines.forEach(l => {
      if (!l.ingredient_id) return
      const d = dishes.find(x => x.id === l.dish_id)
      if (!d) return
      ;(m[l.ingredient_id] = m[l.ingredient_id] || []).push(d.name)
    })
    return m
  }, [lines, dishes])

  const pricesFor = (id: string) =>
    prices.filter(p => p.ingredient_id === id)
      .sort((a, b) => b.effective_on.localeCompare(a.effective_on))

  // Anything that has moved in the last 60 days
  const recentMoves = useMemo(() => {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 60)
    const out: { ing: Ingredient; from: number; to: number; on: string; pct: number }[] = []
    ingredients.forEach(i => {
      const hist = pricesFor(i.id)
      if (hist.length < 2) return
      const latest = hist[0]
      if (new Date(latest.effective_on + 'T00:00:00') < cutoff) return
      const prev = hist[1]
      const from = Number(prev.price), to = Number(latest.price)
      if (Math.abs(to - from) < 0.0001) return
      out.push({ ing: i, from, to, on: latest.effective_on, pct: from > 0 ? ((to - from) / from) * 100 : 0 })
    })
    return out.sort((a, b) => b.pct - a.pct)
  }, [ingredients, prices])

  const run = (fn: () => Promise<any>) => {
    setError(''); setNotice('')
    start(async () => {
      const res = await fn()
      if (res?.error) setError(res.error)
      else if (res?.count) setNotice(`${res.count} ingredient${res.count === 1 ? '' : 's'} updated.`)
    })
  }

  const collect = (el: HTMLElement) => {
    const fd = new FormData()
    el.querySelectorAll('input, select').forEach((x: any) => {
      if (!x.name) return
      if (x.type === 'checkbox') fd.append(x.name, x.checked ? 'on' : 'off')
      else fd.append(x.name, x.value)
    })
    return fd
  }

  const IngForm = ({ ing, onDone }: { ing?: Ingredient; onDone: () => void }) => (
    <div className="m-card ig-form" style={{ padding: 22, marginBottom: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: 14, marginBottom: 14 }}>
        <div>
          <label className="m-label">Name</label>
          <input name="name" className="m-in" defaultValue={ing?.name || ''} placeholder="Diced beef" />
        </div>
        <div>
          <label className="m-label">Supplier</label>
          <select name="supplier_id" className="m-sel" defaultValue={ing?.supplier_id || ''}>
            <option value="">Not set</option>
            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="m-label">Price per pack</label>
          <input name="current_price" type="number" step="0.0001" className="m-in"
            defaultValue={ing?.current_price ?? ''} />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label className="m-label">How it is bought and used</label>
        <select className="m-sel" style={{ maxWidth: 320 }}
          defaultValue={ing ? `${ing.pack_unit}|${ing.recipe_unit}|${ing.units_per_pack}` : 'kg|g|1000'}
          onChange={e => {
            const [p, r, per] = e.target.value.split('|')
            const wrap = e.target.closest('.ig-form') as HTMLElement
            ;(wrap.querySelector('input[name=pack_unit]') as HTMLInputElement).value = p
            ;(wrap.querySelector('input[name=recipe_unit]') as HTMLInputElement).value = r
            ;(wrap.querySelector('input[name=units_per_pack]') as HTMLInputElement).value = per
          }}>
          {UNIT_PRESETS.map(u => (
            <option key={u.label} value={`${u.pack}|${u.recipe}|${u.per}`}>{u.label}</option>
          ))}
        </select>
        <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4, maxWidth: 520, lineHeight: 1.5 }}>
          A 2.5kg pack at £18 used in grams means recipes are written in grams and the cost per gram
          works itself out.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: 12, marginBottom: 16, maxWidth: 560 }}>
        <div>
          <label className="m-label">Pack size</label>
          <input name="pack_size" type="number" step="0.01" className="m-in"
            defaultValue={ing?.pack_size ?? 1} />
        </div>
        <div>
          <label className="m-label">Pack unit</label>
          <input name="pack_unit" className="m-in" defaultValue={ing?.pack_unit || 'kg'} />
        </div>
        <div>
          <label className="m-label">Recipe unit</label>
          <input name="recipe_unit" className="m-in" defaultValue={ing?.recipe_unit || 'g'} />
        </div>
        <div>
          <label className="m-label">Units per pack</label>
          <input name="units_per_pack" type="number" step="0.01" className="m-in"
            defaultValue={ing?.units_per_pack ?? 1000} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="m-btn" disabled={pending} onClick={e => {
          const fd = collect(e.currentTarget.closest('.ig-form') as HTMLElement)
          run(async () => {
            const r = await saveIngredient(site.id, ing?.id ?? null, fd)
            if (!r?.error) onDone()
            return r
          })
        }}>{pending ? 'Saving…' : ing ? 'Save changes' : 'Add ingredient'}</button>
        <button className="m-link" style={{ color: '#8A8279' }} onClick={onDone}>Cancel</button>
        {ing && (
          <span style={{ fontSize: 12.5, color: '#8A8279', maxWidth: 380, lineHeight: 1.5 }}>
            Changing the price records a dated entry and recosts every dish that uses this.
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div className="m-wrap" style={{ paddingTop: 36 }}>
      <style>{MARGIN_STYLES}</style>
      <style>{`
        .i-row { display: grid; grid-template-columns: 1.6fr 130px 120px 1fr 90px;
          gap: 14px; align-items: center; }
        @media (max-width: 820px) { .i-row { grid-template-columns: 1fr 1fr; gap: 6px; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
          Ingredients
        </h1>
        {!adding && <button className="m-link" onClick={() => setAdding(true)}>Add an ingredient</button>}
        {!addingSupplier && (
          <button className="m-link" style={{ color: '#8A8279' }}
            onClick={() => setAddingSupplier(true)}>Add a supplier</button>
        )}
      </div>
      <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 22px', maxWidth: 640 }}>
        Every price change is recorded with a date, so when somebody asks why margin moved in March the
        answer is here rather than in a memory.
      </p>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}
      {notice && (
        <div style={{ fontSize: 14, color: '#3F6B4C', background: 'rgba(63,107,76,0.07)',
          border: '1px solid rgba(63,107,76,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {notice}
        </div>
      )}

      {/* Supplier */}
      {addingSupplier && (
        <div className="m-card sp-form" style={{ padding: 22, marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label className="m-label">Supplier name</label>
              <input name="name" className="m-in" placeholder="Brakes, Bidfood, the local butcher" />
            </div>
            <div style={{ width: 150 }}>
              <label className="m-label">Account ref</label>
              <input name="account_ref" className="m-in" />
            </div>
            <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center',
              cursor: 'pointer', paddingBottom: 10 }}>
              <input type="checkbox" name="is_tied" /> Tied supply
            </label>
            <button className="m-btn" disabled={pending} onClick={e => {
              const fd = collect(e.currentTarget.closest('.sp-form') as HTMLElement)
              run(async () => {
                const r = await saveSupplier(site.id, null, fd)
                if (!r?.error) setAddingSupplier(false)
                return r
              })
            }}>Add</button>
            <button className="m-link" style={{ color: '#8A8279', paddingBottom: 12 }}
              onClick={() => setAddingSupplier(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Bulk rise */}
      {suppliers.length > 0 && (
        <div className="m-card pr-form" style={{ padding: '18px 22px', marginBottom: 18 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>
            A supplier has put everything up
          </div>
          <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 12, maxWidth: 600, lineHeight: 1.6 }}>
            Apply it once here rather than editing each line. Every ingredient from that supplier moves,
            each gets a dated price entry, and every dish that uses them recosts.
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px', maxWidth: 260 }}>
              <label className="m-label">Supplier</label>
              <select className="m-sel" value={riseFor || ''} onChange={e => setRiseFor(e.target.value || null)}>
                <option value="">Choose one</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({ingredients.filter(i => i.supplier_id === s.id).length})
                  </option>
                ))}
              </select>
            </div>
            <div style={{ width: 120 }}>
              <label className="m-label">Increase</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <input className="m-in" name="rise" type="number" step="0.1" placeholder="4" />
                <span style={{ fontSize: 14, color: '#8A8279' }}>%</span>
              </div>
            </div>
            <button className="m-btn m-quiet" disabled={pending || !riseFor} onClick={e => {
              const wrap = e.currentTarget.closest('.pr-form') as HTMLElement
              const v = parseFloat((wrap.querySelector('input[name=rise]') as HTMLInputElement).value)
              if (!riseFor || !isFinite(v)) { setError('Pick a supplier and give a percentage.'); return }
              if (!confirm(`Apply a ${v}% change to every ingredient from that supplier?`)) return
              run(() => applyPriceRise(riseFor, v))
            }}>Apply</button>
          </div>
        </div>
      )}

      {/* Recent moves */}
      {recentMoves.length > 0 && (
        <div className="m-card" style={{ padding: '20px 24px', marginBottom: 20 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 10 }}>
            Moved in the last 60 days
          </div>
          {recentMoves.slice(0, 6).map(m => (
            <div key={m.ing.id} style={{ display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 150px 90px 120px', gap: 12,
              padding: '7px 0', fontSize: 14, alignItems: 'baseline',
              borderBottom: '1px solid #F7F4EF' }}>
              <div>{m.ing.name}</div>
              <div style={{ color: '#8A8279' }}>
                {money2(m.from)} to {money2(m.to)}
              </div>
              <div style={{ fontWeight: 600, color: m.pct > 0 ? '#A13B2A' : '#3F6B4C' }}>
                {m.pct > 0 ? '+' : ''}{m.pct.toFixed(1)}%
              </div>
              <div style={{ fontSize: 13, color: '#8A8279' }}>
                {fmtDate(m.on)}
                {usedBy[m.ing.id] ? ` · ${usedBy[m.ing.id].length} dishes` : ''}
              </div>
            </div>
          ))}
        </div>
      )}

      {(adding || ingredients.length === 0) && <IngForm onDone={() => setAdding(false)} />}

      {ingredients.map(i => {
        const isOpen = open === i.id
        const hist = pricesFor(i.id)
        const dishNames = usedBy[i.id] || []
        if (editing === i.id) return <IngForm key={i.id} ing={i} onDone={() => setEditing(null)} />

        return (
          <div key={i.id} className="m-card" style={{ marginBottom: 10, overflow: 'hidden' }}>
            <button onClick={() => setOpen(isOpen ? null : i.id)} aria-expanded={isOpen}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                padding: '14px 22px', cursor: 'pointer' }}>
              <div className="i-row">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{i.name}</div>
                  <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                    {suppliers.find(s => s.id === i.supplier_id)?.name || 'No supplier'}
                  </div>
                </div>
                <div style={{ fontSize: 14.5 }}>
                  {money2(Number(i.current_price))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>per {i.pack_unit}</div>
                </div>
                <div style={{ fontSize: 14, color: '#57514A' }}>
                  {money2(Number(i.current_price) / Math.max(Number(i.units_per_pack), 1))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>per {i.recipe_unit}</div>
                </div>
                <div style={{ fontSize: 13, color: '#8A8279' }}>
                  {dishNames.length
                    ? `Used in ${dishNames.length} dish${dishNames.length === 1 ? '' : 'es'}`
                    : 'Not used yet'}
                </div>
                <div style={{ fontSize: 13, color: '#8A8279', textAlign: 'right' }}>
                  {isOpen ? 'Close' : 'Open'}
                </div>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: '4px 22px 18px', borderTop: '1px solid #F0EBE2' }}>
                {hist.length > 0 && (
                  <div style={{ marginTop: 14, marginBottom: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Price history</div>
                    {hist.slice(0, 8).map((p, idx) => {
                      const prev = hist[idx + 1]
                      const change = prev && Number(prev.price) > 0
                        ? ((Number(p.price) - Number(prev.price)) / Number(prev.price)) * 100 : null
                      return (
                        <div key={p.id} style={{ display: 'grid',
                          gridTemplateColumns: '120px 110px 80px minmax(0, 1fr)', gap: 12,
                          padding: '6px 0', fontSize: 13.5, borderBottom: '1px solid #F7F4EF' }}>
                          <div style={{ color: '#57514A' }}>{fmtDate(p.effective_on)}</div>
                          <div>{money2(Number(p.price))}</div>
                          <div style={{ color: change === null ? '#C4BDB2'
                            : change > 0 ? '#A13B2A' : '#3F6B4C' }}>
                            {change === null ? '—' : `${change > 0 ? '+' : ''}${change.toFixed(1)}%`}
                          </div>
                          <div style={{ color: '#8A8279' }}>{p.source || ''}</div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {dishNames.length > 0 && (
                  <div style={{ marginBottom: 16, paddingTop: 12, borderTop: '1px solid #F4F0E8' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                      A price change here moves these
                    </div>
                    <div style={{ fontSize: 13.5, color: '#57514A', lineHeight: 1.7 }}>
                      {dishNames.join(', ')}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center',
                  paddingTop: 12, borderTop: '1px solid #F4F0E8' }}>
                  <button className="m-link" onClick={() => setEditing(i.id)}>Edit</button>
                  <button className="m-link" style={{ color: '#8A8279', marginLeft: 'auto' }}
                    onClick={() => {
                      if (dishNames.length) {
                        if (!confirm(`${i.name} is used in ${dishNames.length} dishes. Archive it anyway?`)) return
                      } else if (!confirm(`Archive ${i.name}?`)) return
                      run(() => archiveIngredient(i.id))
                    }}>Archive</button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
