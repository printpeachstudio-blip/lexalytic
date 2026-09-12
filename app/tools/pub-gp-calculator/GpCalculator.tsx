'use client'

import React, { useState, useMemo, useEffect } from 'react'

const STATE_KEY = 'lexalytic.gp.v1'

/** A realistic example, so somebody can see what this does before trusting it with real figures. */
const SAMPLE_LINES = [
    { id: 'ex1', name: 'House lager', category: 'draught', cost: '1.42', price: '5.40', volume: '380', wastage: '' },
    { id: 'ex2', name: 'Cask bitter', category: 'draught', cost: '1.18', price: '4.60', volume: '210', wastage: '' },
    { id: 'ex3', name: 'Craft IPA', category: 'draught', cost: '2.05', price: '6.80', volume: '140', wastage: '' },
    { id: 'ex4', name: 'Bottled lager', category: 'bottled', cost: '1.30', price: '4.50', volume: '95', wastage: '' },
    { id: 'ex5', name: 'House gin measure', category: 'spirits', cost: '0.62', price: '4.20', volume: '160', wastage: '' },
    { id: 'ex6', name: 'Premium gin measure', category: 'spirits', cost: '1.10', price: '5.80', volume: '85', wastage: '' },
    { id: 'ex7', name: 'House red 175ml', category: 'wine', cost: '1.65', price: '6.20', volume: '120', wastage: '' },
    { id: 'ex8', name: 'Prosecco 125ml', category: 'wine', cost: '1.40', price: '6.50', volume: '70', wastage: '' },
    { id: 'ex9', name: 'Post mix cola', category: 'softs', cost: '0.18', price: '2.80', volume: '240', wastage: '' },
    { id: 'ex10', name: 'Bottled water', category: 'softs', cost: '0.45', price: '2.20', volume: '60', wastage: '' },
  ]


const AMBER = '#C17D2E'
const INK = '#1A1815'

// Typical wastage by product type. Draught is the worst because of line
// cleaning, ullage and the first pull of the session.
interface Category {
  key: string
  label: string
  wastage: number
  gpLow: number
  gpHigh: number
  unitHint: string
  note: string
}

const CATEGORIES: Category[] = [
  { key: 'draught', label: 'Draught beer or cider', wastage: 5.5, gpLow: 65, gpHigh: 72,
    unitHint: 'Cost per pint from the keg or cask', note: 'Line cleaning, ullage and spillage put this at 5 to 6 per cent for most cellars.' },
  { key: 'spirits', label: 'Spirits', wastage: 3, gpLow: 75, gpHigh: 80,
    unitHint: 'Cost per 25ml or 50ml measure', note: 'Over-pouring is the main loss. Optics help, free pour does not.' },
  { key: 'wineglass', label: 'Wine by the glass', wastage: 4, gpLow: 70, gpHigh: 75,
    unitHint: 'Cost per glass poured', note: 'Oxidation on slow-moving bottles is the usual culprit.' },
  { key: 'winebottle', label: 'Wine by the bottle', wastage: 1, gpLow: 72, gpHigh: 78,
    unitHint: 'Cost per bottle', note: 'Little waste, and the highest cash margin per transaction.' },
  { key: 'cocktails', label: 'Cocktails', wastage: 6, gpLow: 70, gpHigh: 75,
    unitHint: 'Total ingredient cost per serve', note: 'Multiple ingredients, garnish and remakes push waste higher than people expect.' },
  { key: 'bottled', label: 'Bottled beer or cider', wastage: 1, gpLow: 60, gpHigh: 68,
    unitHint: 'Cost per bottle', note: 'Almost no waste, but the tightest margin on the bar.' },
  { key: 'soft', label: 'Soft drinks', wastage: 3, gpLow: 70, gpHigh: 80,
    unitHint: 'Cost per serve', note: 'Post-mix is the best margin in the building.' },
  { key: 'food', label: 'Food', wastage: 5, gpLow: 65, gpHigh: 70,
    unitHint: 'Plate cost of ingredients', note: 'Prep waste, spoilage and comps combined. Under 3 per cent is tight, over 8 is a problem.' },
]

interface Line {
  id: string
  name: string
  category: string
  cost: string
  price: string
  volume: string
  wastage: string
}

function uid() { return Math.random().toString(36).slice(2, 9) }
function money(n: number) {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function money0(n: number) {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

interface Row {
  line: Line
  cat: Category
  cost: number
  price: number
  volume: number
  wastage: number
  netPrice: number
  adjustedCost: number
  gpPerUnit: number
  gpPct: number
  naiveGpPct: number
  weeklyGp: number
  weeklyRevenue: number
  gapToBenchmark: number
  priceToHitLow: number
}

export default function GpCalculator() {
  const [vat, setVat] = useState(true)
  const [lines, setLines] = useState<Line[]>([

    { id: uid(), name: 'House lager', category: 'draught', cost: '1.42', price: '5.60', volume: '420', wastage: '5.5' },
    { id: uid(), name: 'House gin, 25ml', category: 'spirits', cost: '0.62', price: '4.20', volume: '110', wastage: '3' },
    { id: uid(), name: 'House red, 175ml', category: 'wineglass', cost: '1.35', price: '6.50', volume: '85', wastage: '4' },
    { id: uid(), name: 'Burger', category: 'food', cost: '4.20', price: '15.50', volume: '140', wastage: '5' },
  ])

  const add = () => setLines(l => [...l,
    { id: uid(), name: '', category: 'draught', cost: '', price: '', volume: '', wastage: '5.5' }])
  const remove = (id: string) => setLines(l => l.filter(x => x.id !== id))
  const update = (id: string, patch: Partial<Line>) =>
    setLines(l => l.map(x => {
      if (x.id !== id) return x
      // changing category resets wastage to that category's default
      if (patch.category && patch.category !== x.category) {
        const c = CATEGORIES.find(k => k.key === patch.category)
        return { ...x, ...patch, wastage: String(c?.wastage ?? 5) }
      }
      return { ...x, ...patch }
    }))

  const rows = useMemo<Row[]>(() => lines.map(line => {
    const cat = CATEGORIES.find(c => c.key === line.category) || CATEGORIES[0]
    const cost = parseFloat(line.cost) || 0
    const price = parseFloat(line.price) || 0
    const volume = parseFloat(line.volume) || 0
    const wastage = parseFloat(line.wastage) || 0

    const netPrice = vat ? price / 1.2 : price
    // Wastage means you buy more than you sell, so it inflates effective cost
    const adjustedCost = wastage < 100 ? cost / (1 - wastage / 100) : cost
    const gpPerUnit = netPrice - adjustedCost
    const gpPct = netPrice > 0 ? (gpPerUnit / netPrice) * 100 : 0
    const naiveGpPct = netPrice > 0 ? ((netPrice - cost) / netPrice) * 100 : 0

    const priceToHitLow = cat.gpLow < 100
      ? (adjustedCost / (1 - cat.gpLow / 100)) * (vat ? 1.2 : 1)
      : 0

    return {
      line, cat, cost, price, volume, wastage, netPrice, adjustedCost,
      gpPerUnit, gpPct, naiveGpPct,
      weeklyGp: gpPerUnit * volume,
      weeklyRevenue: netPrice * volume,
      gapToBenchmark: cat.gpLow - gpPct,
      priceToHitLow,
    }
  }), [lines, vat])

  const totals = useMemo(() => {
    const active = rows.filter(r => r.price > 0 && r.volume > 0)
    const revenue = active.reduce((s, r) => s + r.weeklyRevenue, 0)
    const gp = active.reduce((s, r) => s + r.weeklyGp, 0)
    const blended = revenue > 0 ? (gp / revenue) * 100 : 0

    // What the same book would earn with zero wastage
    const perfect = active.reduce((s, r) => s + (r.netPrice - r.cost) * r.volume, 0)
    const wastageCost = perfect - gp

    const below = active.filter(r => r.gapToBenchmark > 0)
    const worst = [...active].sort((a, b) => b.gapToBenchmark - a.gapToBenchmark)[0]

    return { revenue, gp, blended, wastageCost, below, worst, count: active.length,
      annualWastage: wastageCost * 52, annualGp: gp * 52 }
  }, [rows])

  // Restore on load, save on change. Same pattern as the other tools.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        if (v.vat !== undefined) setVat(v.vat)
        if (v.lines !== undefined) setLines(v.lines)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ vat, lines }))
    } catch { /* ignore */ }
  }, [vat, lines])

  const loadSample = () => {
    setLines(SAMPLE_LINES)
  setVat(true)
  }

  return (
    <div className="tool-page">
      <style>{`
        .gp-row { display: grid; grid-template-columns: 1.3fr 1.2fr 0.8fr 0.8fr 0.8fr 0.7fr 44px;
          gap: 10px; align-items: end; padding: 13px 0; border-bottom: 1px solid #F4F0E8; }
        .gp-head { display: grid; grid-template-columns: 1.3fr 1.2fr 0.8fr 0.8fr 0.8fr 0.7fr 44px;
          gap: 10px; padding-bottom: 10px; border-bottom: 2px solid #EDE7DD;
          font-size: 12px; color: #8A8279; }
        .gp-res { display: grid; grid-template-columns: 1.4fr 90px 90px 100px 1fr;
          gap: 14px; padding: 13px 0; border-bottom: 1px solid #F7F4EF; align-items: baseline; }
        @media (max-width: 900px) { .gp-row { grid-template-columns: 1fr 1fr; } .gp-head { display: none; } .gp-res { grid-template-columns: 1fr 1fr; gap: 6px; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="tool-wrap" style={{ padding: 20 }}>
          <a href="/" className="tool-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="tool-wrap" style={{ paddingTop: 44 }}>
        <h1 className="tool-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 680 }}>
          Gross profit across the whole range, with wastage in it
        </h1>
        {lines.length === 0 && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={loadSample}>Try it with an example</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>A wet led pub with ten lines across draught, bottles, spirits, wine and softs. The blended figure is what matters, and the mix is doing more than any single line.</span>
          </div>
        )}

        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 660, margin: '0 0 8px' }}>
          Most GP calculators do one product at a time and ignore wastage, which makes every number
          flattering. Line cleaning, ullage and over-pouring mean you buy more than you sell, so the real
          cost per pint is higher than the invoice says.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 660, margin: '0 0 32px' }}>
          Put your range in below. Nothing is uploaded and this runs entirely in your browser.
        </p>

        <div className="tool-card" style={{ padding: '18px 26px', marginBottom: 18 }}>
          <label style={{ fontSize: 15, display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
            <input type="checkbox" checked={vat} onChange={e => setVat(e.target.checked)} />
            <span>
              VAT registered
              <span style={{ display: 'block', fontSize: 13, color: '#8A8279', marginTop: 3 }}>
                Selling prices below are what the customer pays. Using gross till receipts in a GP
                calculation overstates the result by around 17 per cent.
              </span>
            </span>
          </label>
        </div>

        {/* Lines */}
        <div className="tool-card" style={{ padding: '20px 26px', marginBottom: 22 }}>
          <div className="gp-head">
            <div>Product</div><div>Category</div><div>Unit cost</div>
            <div>Selling price</div><div>Sold a week</div><div>Wastage %</div><div></div>
          </div>

          {lines.map((l, i) => {
            const cat = CATEGORIES.find(c => c.key === l.category) || CATEGORIES[0]
            return (
              <div key={l.id} className="gp-row">
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Product</label>
                  <input className="tool-in" value={l.name} placeholder="Name"
                    onChange={e => update(l.id, { name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Category</label>
                  <select className="tool-sel" value={l.category}
                    onChange={e => update(l.id, { category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Cost</label>
                  <input className="tool-in" type="number" min={0} step="0.01" value={l.cost}
                    onChange={e => update(l.id, { cost: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Price</label>
                  <input className="tool-in" type="number" min={0} step="0.01" value={l.price}
                    onChange={e => update(l.id, { price: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Weekly</label>
                  <input className="tool-in" type="number" min={0} value={l.volume}
                    onChange={e => update(l.id, { volume: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Waste %</label>
                  <input className="tool-in" type="number" min={0} step="0.5" value={l.wastage}
                    onChange={e => update(l.id, { wastage: e.target.value })} />
                </div>
                <div style={{ paddingBottom: 10 }}>
                  {lines.length > 1 && (
                    <button className="tool-link" style={{ color: '#8A8279', fontSize: 13 }}
                      onClick={() => remove(l.id)} aria-label={`Remove row ${i + 1}`}>Remove</button>
                  )}
                </div>
              </div>
            )
          })}

          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            <button className="tool-link" onClick={add}>Add another product</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>
              Wastage defaults to the typical figure for each category. Change it if you know yours.
            </span>
          </div>
        </div>

        {/* Results */}
        {totals.count > 0 && (
          <>
            <div className="tool-card" style={{ padding: '28px 30px', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 38, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingBottom: 22, borderBottom: '2px solid ' + INK, marginBottom: 20 }}>
                <div>
                  <div className="tool-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', lineHeight: 1,
                    color: totals.blended >= 65 ? '#3F6B4C' : totals.blended >= 58 ? '#8F6318' : '#A13B2A' }}>
                    {totals.blended.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 7 }}>
                    Blended gross profit, after wastage
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>
                    {money0(totals.gp)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Gross profit a week</div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#A13B2A' }}>
                    {money0(totals.wastageCost)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Lost to wastage a week</div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#A13B2A' }}>
                    {money0(totals.annualWastage)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>A year</div>
                </div>
              </div>

              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#57514A', maxWidth: 680 }}>
                {totals.below.length > 0 ? (
                  <>
                    <strong>
                      {totals.below.length} of {totals.count} products {totals.below.length === 1 ? 'sits' : 'sit'} below
                      the usual range for {totals.below.length === 1 ? 'its' : 'their'} category.
                    </strong>
                    {totals.worst && totals.worst.gapToBenchmark > 0 && (
                      <> The furthest off is {totals.worst.line.name || 'one line'}, running at{' '}
                      {totals.worst.gpPct.toFixed(1)}% against a normal {totals.worst.cat.gpLow} to{' '}
                      {totals.worst.cat.gpHigh}%.</>
                    )}
                  </>
                ) : (
                  <>Every line is inside the usual range for its category, which is a stronger position
                  than most sites manage.</>
                )}
                {' '}Wastage is costing {money0(totals.annualWastage)} a year at these volumes. Getting
                draught wastage from 5 per cent to 3 is usually cellar discipline rather than spend.
              </div>
            </div>

            {/* Per line */}
            <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Line by line</div>
              <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 16, maxWidth: 660, lineHeight: 1.6 }}>
                The GP without wastage column is what a normal calculator would have told you. The
                difference between the two is the number that matters.
              </div>

              {[...rows].filter(r => r.price > 0).sort((a, b) => b.gapToBenchmark - a.gapToBenchmark).map(r => (
                <div key={r.line.id} className="gp-res">
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{r.line.name || 'Unnamed'}</div>
                    <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                      {r.cat.label}{r.volume > 0 ? `, ${r.volume} a week` : ''}
                    </div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600,
                    color: r.gapToBenchmark > 5 ? '#A13B2A' : r.gapToBenchmark > 0 ? '#8F6318' : '#3F6B4C' }}>
                    {r.gpPct.toFixed(1)}%
                    <div style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}>real GP</div>
                  </div>
                  <div style={{ fontSize: 14, color: '#8A8279' }}>
                    {r.naiveGpPct.toFixed(1)}%
                    <div style={{ fontSize: 12 }}>without waste</div>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A' }}>
                    {r.cat.gpLow} to {r.cat.gpHigh}%
                    <div style={{ fontSize: 12, color: '#8A8279' }}>normal range</div>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A' }}>
                    {r.gapToBenchmark > 0 && r.priceToHitLow > 0 ? (
                      <>
                        {money(r.priceToHitLow)}
                        <div style={{ fontSize: 12, color: '#8A8279' }}>
                          to reach {r.cat.gpLow}%, {((r.priceToHitLow / r.price - 1) * 100).toFixed(0)}% more
                        </div>
                      </>
                    ) : (
                      <span style={{ color: '#3F6B4C', fontSize: 13 }}>Inside the range</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Category notes */}
            <div className="tool-card" style={{ padding: '24px 30px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Why the wastage figures differ</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
                {CATEGORIES.filter(c => lines.some(l => l.category === c.key)).map(c => (
                  <div key={c.key}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>
                      {c.label} <span style={{ color: '#8A8279', fontWeight: 400 }}>{c.wastage}%</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: '#57514A', lineHeight: 1.7 }}>{c.note}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
              <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                Duty went up 3.66 per cent in February
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 580 }}>
                Which added 38 pence to a bottle of gin and 14 pence to a bottle of red, straight onto
                supplier invoices. Every pint and measure sold at the old price since then has quietly
                given away margin. That happens every year and most sites recost weeks late.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="/margin-manager" className="tool-btn"
                  style={{ textDecoration: 'none', display: 'inline-block' }}>
                  See Margin Manager
                </a>
                <a href="/tools/delivery-margin" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  Or check your delivery margin
                </a>
              </div>
            </div>
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 660 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 660 }}>
          Wastage defaults and GP ranges are typical UK figures for 2026 rather than yours. Wastage is
          applied by inflating cost, which assumes you buy more than you sell rather than discounting the
          price. Tied tenants should expect lower drink margins than the ranges shown, because the tie
          costs 8 to 12 points against buying on the open market.
        </p>
      </div>
    </div>
  )
}
