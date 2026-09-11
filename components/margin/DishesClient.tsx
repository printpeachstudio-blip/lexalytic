'use client'

import React, { useState, useMemo, useTransition } from 'react'
import {
  type Site, type Dish, type DishLine, type Ingredient, type Channel, type DishSale,
  CONCEPTS, money, money2, pct, channelMargin, todayStr,
} from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import {
  saveDish, archiveDish, addDishLine, updateDishLine, removeDishLine, saveDishSales,
} from '@/app/margin/actions'

const AMBER = '#C17D2E'
const INK = '#1A1815'

export default function DishesClient({
  site, dishes, lines, ingredients, channels, sales,
}: {
  site: Site; dishes: Dish[]; lines: DishLine[]
  ingredients: Ingredient[]; channels: Channel[]; sales: DishSale[]
}) {
  const [open, setOpen] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'menu' | 'components' | 'problem'>('all')
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const concept = CONCEPTS[site.concept]
  const target = site.target_gp ? Number(site.target_gp) : concept.gpLow

  const components = dishes.filter(d => d.is_component)
  const menuItems = dishes.filter(d => !d.is_component)

  const salesByDish = useMemo(() => {
    const m: Record<string, { dineIn: number; delivery: number }> = {}
    sales.forEach(s => {
      const cur = m[s.dish_id] || { dineIn: 0, delivery: 0 }
      cur.dineIn += s.dine_in_qty
      cur.delivery += s.delivery_qty
      m[s.dish_id] = cur
    })
    return m
  }, [sales])

  const shown = useMemo(() => {
    let list = dishes
    if (filter === 'menu') list = menuItems
    else if (filter === 'components') list = components
    else if (filter === 'problem') {
      list = menuItems.filter(d => {
        if (d.gp_pct !== null && Number(d.gp_pct) < target) return true
        return channels.some(ch => channelMargin(d, ch, site.vat_registered).margin < 0)
      })
    }
    return [...list].sort((a, b) => {
      if (a.is_component !== b.is_component) return a.is_component ? 1 : -1
      const ga = a.gp_pct === null ? 999 : Number(a.gp_pct)
      const gb = b.gp_pct === null ? 999 : Number(b.gp_pct)
      return ga - gb
    })
  }, [dishes, filter, menuItems, components, target, channels, site])

  const linesFor = (id: string) => lines.filter(l => l.dish_id === id)

  const run = (fn: () => Promise<any>) => {
    setError('')
    start(async () => {
      const res = await fn()
      if (res?.error) setError(res.error)
    })
  }

  const collect = (el: HTMLElement) => {
    const fd = new FormData()
    el.querySelectorAll('input, select, textarea').forEach((x: any) => {
      if (!x.name) return
      if (x.type === 'checkbox') fd.append(x.name, x.checked ? 'on' : 'off')
      else fd.append(x.name, x.value)
    })
    return fd
  }

  const DishForm = ({ dish, onDone }: { dish?: Dish; onDone: () => void }) => (
    <div className="m-card df-form" style={{ padding: 22, marginBottom: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: 14, marginBottom: 14 }}>
        <div>
          <label className="m-label">Name</label>
          <input name="name" className="m-in" defaultValue={dish?.name || ''} placeholder="Dish name" />
        </div>
        <div>
          <label className="m-label">Category</label>
          <input name="category" className="m-in" defaultValue={dish?.category || ''} placeholder="Mains, sides" />
        </div>
        <div>
          <label className="m-label">Menu price</label>
          <input name="menu_price" type="number" step="0.01" className="m-in"
            defaultValue={dish?.menu_price ?? ''} />
        </div>
        <div>
          <label className="m-label">Delivery price</label>
          <input name="delivery_price" type="number" step="0.01" className="m-in"
            defaultValue={dish?.delivery_price ?? ''} placeholder="Same as menu" />
        </div>
      </div>

      <label style={{ fontSize: 14, display: 'flex', gap: 9, alignItems: 'flex-start',
        cursor: 'pointer', marginBottom: 12 }}>
        <input type="checkbox" name="is_component" defaultChecked={dish?.is_component}
          style={{ marginTop: 3 }} />
        <span>
          This is a component, not a menu item
          <span style={{ display: 'block', fontSize: 12.5, color: '#8A8279', marginTop: 3, maxWidth: 520 }}>
            A base gravy, a stock, a dough. Cost it once and use it inside other dishes, so a supplier
            price rise moves everything that contains it.
          </span>
        </span>
      </label>

      <div style={{ maxWidth: 200, marginBottom: 16 }}>
        <label className="m-label">Batch yields</label>
        <input name="batch_yield" type="number" step="0.01" className="m-in"
          defaultValue={dish?.batch_yield ?? 1} />
        <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
          Portions from one batch. Leave at 1 for a menu item.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="m-btn" disabled={pending} onClick={e => {
          const fd = collect(e.currentTarget.closest('.df-form') as HTMLElement)
          run(async () => {
            const r = await saveDish(site.id, dish?.id ?? null, fd)
            if (!r?.error) onDone()
            return r
          })
        }}>{pending ? 'Saving…' : dish ? 'Save changes' : 'Add dish'}</button>
        <button className="m-link" style={{ color: '#8A8279' }} onClick={onDone}>Cancel</button>
      </div>
    </div>
  )

  return (
    <div className="m-wrap" style={{ paddingTop: 36 }}>
      <style>{MARGIN_STYLES}</style>
      <style>{`
        .d-row { display: grid; grid-template-columns: 1.6fr 100px 100px 90px 110px;
          gap: 14px; align-items: center; }
        .d-line { display: grid; grid-template-columns: 1.6fr 120px 110px 80px;
          gap: 12px; align-items: center; padding: 9px 0; border-bottom: 1px solid #F7F4EF; }
        @media (max-width: 820px) {
          .d-row { grid-template-columns: 1fr 1fr; gap: 6px; }
          .d-line { grid-template-columns: 1fr 1fr; gap: 6px; }
        }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
          Dishes
        </h1>
        {!adding && <button className="m-link" onClick={() => setAdding(true)}>Add a dish</button>}
      </div>
      <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 22px', maxWidth: 640 }}>
        Cost is worked out from the recipe and updates whenever an ingredient price moves. A component
        used inside other dishes cascades through all of them.
      </p>

      {dishes.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {([['all', `All ${dishes.length}`], ['menu', `Menu ${menuItems.length}`],
             ['components', `Components ${components.length}`], ['problem', 'Needs attention']] as const).map(([k, label]) => (
            <button key={k} onClick={() => setFilter(k as any)}
              style={{ font: 'inherit', fontSize: 13.5, padding: '7px 14px', borderRadius: 6,
                cursor: 'pointer', border: '1px solid ' + (filter === k ? INK : '#DDD6CC'),
                background: filter === k ? INK : '#fff', color: filter === k ? '#fff' : '#4A453F' }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {(adding || dishes.length === 0) && <DishForm onDone={() => setAdding(false)} />}

      {shown.map(d => {
        const isOpen = open === d.id
        const dLines = linesFor(d.id)
        const vol = salesByDish[d.id]
        const below = d.gp_pct !== null && !d.is_component && Number(d.gp_pct) < target
        const losing = !d.is_component &&
          channels.some(ch => channelMargin(d, ch, site.vat_registered).margin < 0)

        if (editing === d.id) return <DishForm key={d.id} dish={d} onDone={() => setEditing(null)} />

        return (
          <div key={d.id} className="m-card" style={{ marginBottom: 12, overflow: 'hidden',
            borderColor: losing ? 'rgba(161,59,42,0.25)' : below ? 'rgba(176,122,30,0.25)' : '#E8E2D8' }}>
            <button onClick={() => setOpen(isOpen ? null : d.id)} aria-expanded={isOpen}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                padding: '16px 22px', cursor: 'pointer' }}>
              <div className="d-row">
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 600 }}>
                    {d.name}
                    {d.is_component && (
                      <span className="m-tag" style={{ color: '#57514A', border: '1px solid #EDE7DD',
                        marginLeft: 9, fontWeight: 500 }}>Component</span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                    {d.category || 'No category'}
                    {dLines.length > 0 ? ` · ${dLines.length} line${dLines.length === 1 ? '' : 's'}` : ' · no recipe yet'}
                    {vol ? ` · ${vol.dineIn + vol.delivery} sold` : ''}
                  </div>
                </div>
                <div style={{ fontSize: 14.5 }}>
                  {money2(Number(d.unit_cost))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>
                    cost{d.is_component ? ' per batch' : ''}
                  </div>
                </div>
                <div style={{ fontSize: 14.5 }}>
                  {d.is_component ? '—' : money2(Number(d.menu_price))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>{d.is_component ? '' : 'menu'}</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600,
                  color: d.is_component ? '#C4BDB2' : below ? '#8F6318' : '#3F6B4C' }}>
                  {d.is_component ? '—' : pct(d.gp_pct)}
                  {!d.is_component && <div style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}>GP</div>}
                </div>
                <div style={{ fontSize: 13, textAlign: 'right' }}>
                  {losing && <span className="m-tag" style={{ color: '#A13B2A',
                    border: '1px solid rgba(161,59,42,0.22)' }}>Losing on delivery</span>}
                  {!losing && <span style={{ color: '#8A8279' }}>{isOpen ? 'Close' : 'Open'}</span>}
                </div>
              </div>
            </button>

            {isOpen && (
              <div style={{ padding: '4px 22px 20px', borderTop: '1px solid #F0EBE2' }}>
                {/* Recipe */}
                <div style={{ marginTop: 16, marginBottom: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Recipe</div>
                  {dLines.length === 0 && (
                    <div style={{ fontSize: 13.5, color: '#8A8279', lineHeight: 1.6, marginBottom: 12 }}>
                      Nothing yet, so the cost shows as zero. Add ingredients, or a component if this
                      dish uses a base you have already costed.
                    </div>
                  )}
                  {dLines.map(l => {
                    const ing = ingredients.find(i => i.id === l.ingredient_id)
                    const comp = dishes.find(x => x.id === l.component_id)
                    const lineCost = ing
                      ? Number(l.quantity) * (Number(ing.current_price) / Number(ing.units_per_pack))
                      : comp
                      ? Number(l.quantity) * (Number(comp.unit_cost) / Math.max(Number(comp.batch_yield), 1))
                      : 0
                    return (
                      <div key={l.id} className="d-line">
                        <div style={{ fontSize: 14 }}>
                          {ing?.name || comp?.name || 'Missing'}
                          {comp && <span style={{ color: '#8A8279', fontSize: 12.5 }}> (component)</span>}
                        </div>
                        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                          <input className="m-in" type="number" step="0.01" defaultValue={l.quantity}
                            style={{ width: 80, padding: '6px 9px', fontSize: 14 }}
                            onBlur={e => {
                              const v = parseFloat(e.target.value)
                              if (isFinite(v) && v !== Number(l.quantity)) {
                                run(() => updateDishLine(l.id, v))
                              }
                            }} />
                          <span style={{ fontSize: 13, color: '#8A8279' }}>
                            {ing?.recipe_unit || 'portions'}
                          </span>
                        </div>
                        <div style={{ fontSize: 14, color: '#57514A' }}>{money2(lineCost)}</div>
                        <div style={{ textAlign: 'right' }}>
                          <button className="m-link" style={{ fontSize: 13, color: '#8A8279' }}
                            onClick={() => run(() => removeDishLine(l.id))}>Remove</button>
                        </div>
                      </div>
                    )
                  })}

                  {/* Add a line */}
                  <div className="dl-add" style={{ display: 'flex', gap: 10, flexWrap: 'wrap',
                    alignItems: 'flex-end', marginTop: 14 }}>
                    <div style={{ flex: '1 1 240px' }}>
                      <label className="m-label">Add ingredient or component</label>
                      <select className="m-sel" name="target" defaultValue="">
                        <option value="">Choose one</option>
                        {ingredients.length > 0 && (
                          <optgroup label="Ingredients">
                            {ingredients.map(i => <option key={i.id} value={'i:' + i.id}>{i.name}</option>)}
                          </optgroup>
                        )}
                        {components.filter(c => c.id !== d.id).length > 0 && (
                          <optgroup label="Components">
                            {components.filter(c => c.id !== d.id).map(c =>
                              <option key={c.id} value={'c:' + c.id}>{c.name}</option>)}
                          </optgroup>
                        )}
                      </select>
                    </div>
                    <div style={{ width: 110 }}>
                      <label className="m-label">Quantity</label>
                      <input className="m-in" name="qty" type="number" step="0.01" defaultValue="" />
                    </div>
                    <button className="m-btn m-quiet" disabled={pending} onClick={e => {
                      const wrap = e.currentTarget.closest('.dl-add') as HTMLElement
                      const sel = wrap.querySelector('select[name=target]') as HTMLSelectElement
                      const qty = wrap.querySelector('input[name=qty]') as HTMLInputElement
                      const v = sel.value
                      const q = parseFloat(qty.value)
                      if (!v || !isFinite(q)) { setError('Pick something and give it a quantity.'); return }
                      const target = v.startsWith('i:')
                        ? { ingredientId: v.slice(2) } : { componentId: v.slice(2) }
                      run(async () => {
                        const r = await addDishLine(d.id, target, q)
                        if (!r?.error) { sel.value = ''; qty.value = '' }
                        return r
                      })
                    }}>Add</button>
                  </div>
                </div>

                {/* Channels */}
                {!d.is_component && channels.length > 0 && d.menu_price > 0 && (
                  <div style={{ marginBottom: 18, paddingTop: 14, borderTop: '1px solid #F4F0E8' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>On each channel</div>
                    <div style={{ fontSize: 12.5, color: '#8A8279', marginBottom: 10 }}>
                      After VAT, commission and packaging, in that order.
                    </div>
                    {channels.map(ch => {
                      const m = channelMargin(d, ch, site.vat_registered)
                      return (
                        <div key={ch.id} style={{ display: 'grid',
                          gridTemplateColumns: 'minmax(0, 1fr) 100px 90px 130px', gap: 12,
                          padding: '7px 0', fontSize: 14, alignItems: 'baseline' }}>
                          <div>{ch.name} <span style={{ color: '#8A8279', fontSize: 12.5 }}>
                            {ch.commission_pct}%</span></div>
                          <div style={{ color: '#57514A' }}>{money2(m.received)}</div>
                          <div style={{ fontWeight: 600, color: m.margin < 0 ? '#A13B2A' : '#3F6B4C' }}>
                            {money2(m.margin)}
                          </div>
                          <div style={{ fontSize: 13, color: '#8A8279' }}>
                            {m.margin < 0 ? `break even at ${money2(m.breakEven)}` : pct(m.marginPct)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Sales */}
                {!d.is_component && (
                  <div className="ds-form" style={{ marginBottom: 16, paddingTop: 14,
                    borderTop: '1px solid #F4F0E8' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Record sales</div>
                    <div style={{ fontSize: 12.5, color: '#8A8279', marginBottom: 10 }}>
                      Volumes drive the menu engineering on the overview. Monthly is enough.
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                      <div style={{ width: 150 }}>
                        <label className="m-label">From</label>
                        <input className="m-in" name="period_start" type="date" max={todayStr()} />
                      </div>
                      <div style={{ width: 150 }}>
                        <label className="m-label">To</label>
                        <input className="m-in" name="period_end" type="date" max={todayStr()}
                          defaultValue={todayStr()} />
                      </div>
                      <div style={{ width: 110 }}>
                        <label className="m-label">Dine in</label>
                        <input className="m-in" name="dine_in_qty" type="number" />
                      </div>
                      <div style={{ width: 110 }}>
                        <label className="m-label">Delivery</label>
                        <input className="m-in" name="delivery_qty" type="number" />
                      </div>
                      <button className="m-btn m-quiet" disabled={pending} onClick={e => {
                        const fd = collect(e.currentTarget.closest('.ds-form') as HTMLElement)
                        run(() => saveDishSales(d.id, fd))
                      }}>Save</button>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center',
                  paddingTop: 12, borderTop: '1px solid #F4F0E8' }}>
                  <button className="m-link" onClick={() => setEditing(d.id)}>Edit dish</button>
                  <button className="m-link" style={{ color: '#8A8279', marginLeft: 'auto' }}
                    onClick={() => { if (confirm(`Archive ${d.name}?`)) run(() => archiveDish(d.id)) }}>
                    Archive
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {dishes.length > 0 && shown.length === 0 && (
        <div className="m-card" style={{ padding: '24px 28px', fontSize: 15, color: '#57514A', lineHeight: 1.7 }}>
          Nothing matches that filter. Every dish is inside target and none is losing money on delivery.
        </div>
      )}
    </div>
  )
}
