'use client'

import React, { useState, useMemo, useEffect } from 'react'

const STATE_KEY = 'lexalytic.dm.v1'

/** A realistic example, so somebody can see what this does before trusting it with real figures. */
const SAMPLE_DISHES = [
    { id: 'ex1', name: 'Margherita pizza', dineInPrice: '11.50', foodCost: '2.40', deliveryPrice: '12.50', weeklyOrders: '85' },
    { id: 'ex2', name: 'Chicken katsu curry', dineInPrice: '13.95', foodCost: '4.10', deliveryPrice: '14.95', weeklyOrders: '62' },
    { id: 'ex3', name: 'Beef burger and fries', dineInPrice: '14.50', foodCost: '5.20', deliveryPrice: '15.50', weeklyOrders: '110' },
    { id: 'ex4', name: 'Caesar salad', dineInPrice: '9.95', foodCost: '3.60', deliveryPrice: '9.95', weeklyOrders: '28' },
    { id: 'ex5', name: 'Sticky toffee pudding', dineInPrice: '6.50', foodCost: '1.35', deliveryPrice: '6.50', weeklyOrders: '44' },
  ]


const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Platform {
  key: string
  label: string
  commission: number
  note: string
}

const PLATFORMS: Platform[] = [
  { key: 'deliveroo', label: 'Deliveroo', commission: 30,
    note: 'Typically 25 to 35 per cent depending on whether you use their riders.' },
  { key: 'ubereats', label: 'Uber Eats', commission: 30,
    note: 'Usually around 30 per cent on full service, lower if you deliver yourself.' },
  { key: 'justeat', label: 'Just Eat', commission: 14,
    note: 'Lower headline rate on the order-only tier, higher when they deliver.' },
  { key: 'own', label: 'Your own site', commission: 2,
    note: 'Card fees only, if you take the orders and deliver yourself.' },
  { key: 'custom', label: 'Something else', commission: 25,
    note: 'Set your own rate below.' },
]

interface Dish {
  id: string
  name: string
  dineInPrice: string
  foodCost: string
  deliveryPrice: string
  weeklyOrders: string
}

function uid() { return Math.random().toString(36).slice(2, 9) }
function money(n: number) {
  return '£' + Math.abs(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function signed(n: number) {
  return (n < 0 ? '-' : '') + money(n)
}

interface Row {
  dish: Dish
  price: number
  cost: number
  orders: number
  netPrice: number       // after VAT
  received: number       // after commission
  margin: number         // per order
  marginPct: number
  weekly: number
  dineInMargin: number
  dineInPct: number
  breakEvenPrice: number
  targetPrice: number    // to match dine-in margin percentage
}

export default function DeliveryMargin() {
  const [platform, setPlatform] = useState('deliveroo')
  const [customRate, setCustomRate] = useState('25')
  const [vatRegistered, setVatRegistered] = useState(true)
  const [packaging, setPackaging] = useState('0.45')

  const [dishes, setDishes] = useState<Dish[]>([

    { id: uid(), name: 'Chicken burger', dineInPrice: '14.50', foodCost: '4.20', deliveryPrice: '14.50', weeklyOrders: '40' },
    { id: uid(), name: 'Margherita pizza', dineInPrice: '11.00', foodCost: '2.10', deliveryPrice: '11.00', weeklyOrders: '65' },
    { id: uid(), name: 'Steak frites', dineInPrice: '24.00', foodCost: '9.80', deliveryPrice: '24.00', weeklyOrders: '12' },
  ])

  const p = PLATFORMS.find(x => x.key === platform)!
  const commission = platform === 'custom' ? (parseFloat(customRate) || 0) : p.commission
  const pack = parseFloat(packaging) || 0

  const add = () => setDishes(d => [...d,
    { id: uid(), name: '', dineInPrice: '', foodCost: '', deliveryPrice: '', weeklyOrders: '' }])
  const remove = (id: string) => setDishes(d => d.filter(x => x.id !== id))
  const update = (id: string, patch: Partial<Dish>) =>
    setDishes(d => d.map(x => (x.id === id ? { ...x, ...patch } : x)))

  const rows = useMemo<Row[]>(() => dishes.map(dish => {
    const price = parseFloat(dish.deliveryPrice) || parseFloat(dish.dineInPrice) || 0
    const dineIn = parseFloat(dish.dineInPrice) || 0
    const cost = parseFloat(dish.foodCost) || 0
    const orders = parseFloat(dish.weeklyOrders) || 0

    const vatDiv = vatRegistered ? 1.2 : 1
    const netPrice = price / vatDiv
    const netDineIn = dineIn / vatDiv

    const received = netPrice * (1 - commission / 100)
    const totalCost = cost + pack
    const margin = received - totalCost
    const marginPct = netPrice > 0 ? (margin / netPrice) * 100 : 0

    const dineInMargin = netDineIn - cost
    const dineInPct = netDineIn > 0 ? (dineInMargin / netDineIn) * 100 : 0

    // What you would need to charge on the platform to break even
    const breakEvenPrice = commission < 100
      ? (totalCost / (1 - commission / 100)) * vatDiv
      : 0

    // What you would need to charge to match the dine-in margin percentage
    const targetPrice = commission < 100 && dineInPct < 100
      ? (totalCost / ((1 - commission / 100) - (dineInPct / 100))) * vatDiv
      : 0

    return { dish, price, cost, orders, netPrice, received, margin, marginPct,
      weekly: margin * orders, dineInMargin, dineInPct, breakEvenPrice, targetPrice }
  }), [dishes, commission, vatRegistered, pack])

  const totals = useMemo(() => {
    const withOrders = rows.filter(r => r.orders > 0 && r.price > 0)
    const weekly = withOrders.reduce((s, r) => s + r.weekly, 0)
    const losing = withOrders.filter(r => r.margin < 0)
    const losingWeekly = losing.reduce((s, r) => s + r.weekly, 0)
    const revenue = withOrders.reduce((s, r) => s + r.netPrice * r.orders, 0)
    const dineInEquivalent = withOrders.reduce((s, r) => s + r.dineInMargin * r.orders, 0)
    const avgPct = revenue > 0 ? (weekly / revenue) * 100 : 0
    const avgDineIn = withOrders.length
      ? withOrders.reduce((s, r) => s + r.dineInPct, 0) / withOrders.length : 0
    return { weekly, annual: weekly * 52, losing, losingWeekly, revenue,
      dineInEquivalent, avgPct, avgDineIn, gap: avgDineIn - avgPct, count: withOrders.length }
  }, [rows])

  // Restore on load, save on change. Same pattern as the other tools.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        if (v.platform !== undefined) setPlatform(v.platform)
        if (v.customRate !== undefined) setCustomRate(v.customRate)
        if (v.vatRegistered !== undefined) setVatRegistered(v.vatRegistered)
        if (v.packaging !== undefined) setPackaging(v.packaging)
        if (v.dishes !== undefined) setDishes(v.dishes)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ platform, customRate, vatRegistered, packaging, dishes }))
    } catch { /* ignore */ }
  }, [platform, customRate, vatRegistered, packaging, dishes])

  const loadSample = () => {
    setDishes(SAMPLE_DISHES)
  setPlatform('deliveroo')
  setVatRegistered(true)
  setPackaging('0.85')
  }

  const samePricing = rows.some(r =>
    r.dish.deliveryPrice && r.dish.dineInPrice &&
    parseFloat(r.dish.deliveryPrice) === parseFloat(r.dish.dineInPrice))

  return (
    <div className="tool-page">
      <style>{`
        .dm-opt { font: inherit; font-size: 14px; padding: 9px 15px; border-radius: 6px; cursor: pointer;
          background: #fff; border: 1px solid #DDD6CC; color: #4A453F; }
        .dm-opt[aria-pressed=true] { background: ${INK}; border-color: ${INK}; color: #fff; }
        .dm-opt:focus-visible, .tool-btn:focus-visible, .tool-link:focus-visible {
          outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .dm-row { display: grid; grid-template-columns: 1.5fr 0.9fr 0.9fr 0.9fr 0.8fr 44px;
          gap: 10px; align-items: end; padding: 14px 0; border-bottom: 1px solid #F4F0E8; }
        .dm-head { display: grid; grid-template-columns: 1.5fr 0.9fr 0.9fr 0.9fr 0.8fr 44px;
          gap: 10px; padding-bottom: 10px; border-bottom: 2px solid #EDE7DD;
          font-size: 12px; color: #8A8279; }
        .dm-res { display: grid; grid-template-columns: 1.4fr 100px 100px 110px 1fr;
          gap: 14px; padding: 13px 0; border-bottom: 1px solid #F7F4EF; align-items: baseline; }
        @media (max-width: 860px) { .dm-row { grid-template-columns: 1fr 1fr; } .dm-head { display: none; } .dm-res { grid-template-columns: 1fr 1fr; gap: 6px; } }
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
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 660 }}>
          Which dishes lose you money on delivery?
        </h1>
        {dishes.length === 0 && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={loadSample}>Try it with an example</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>A neighbourhood restaurant on Deloveroo at standard commission. Five dishes, two of which are priced the same for delivery as dine in, which is where the problem usually is.</span>
          </div>
        )}

        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 650, margin: '0 0 8px' }}>
          A £12 dish on Deliveroo returns about £8.40 after commission, before you have taken the VAT off
          or paid for the box it went in. Most kitchens price delivery identically to dine-in, which means
          the dishes with the thinnest margins are quietly losing money on every order.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 650, margin: '0 0 32px' }}>
          Nothing is uploaded. This runs entirely in your browser.
        </p>

        {/* Setup */}
        <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Which channel?</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {PLATFORMS.map(x => (
              <button key={x.key} className="dm-opt" aria-pressed={platform === x.key}
                onClick={() => setPlatform(x.key)}>{x.label}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#57514A', marginBottom: 5 }}>
                Commission
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input className="tool-in" type="number" min={0} style={{ width: 90 }}
                  value={platform === 'custom' ? customRate : String(p.commission)}
                  onChange={e => { setPlatform('custom'); setCustomRate(e.target.value) }} />
                <span style={{ fontSize: 14, color: '#8A8279' }}>%</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#57514A', marginBottom: 5 }}>
                Packaging per order
              </label>
              <input className="tool-in" type="number" min={0} step="0.01" style={{ width: 110 }}
                value={packaging} onChange={e => setPackaging(e.target.value)} />
            </div>
            <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center',
              cursor: 'pointer', paddingBottom: 10 }}>
              <input type="checkbox" checked={vatRegistered}
                onChange={e => setVatRegistered(e.target.checked)} />
              VAT registered
            </label>
          </div>
          <div style={{ fontSize: 13, color: '#8A8279', marginTop: 12, lineHeight: 1.6 }}>
            {platform === 'custom' ? 'Set your own rate above.' : p.note}
            {vatRegistered && ' VAT comes off before commission is applied, which catches people out.'}
          </div>
        </div>

        {/* Dishes */}
        <div className="tool-card" style={{ padding: '20px 26px', marginBottom: 22 }}>
          <div className="dm-head">
            <div>Dish</div><div>Dine-in price</div><div>Food cost</div>
            <div>Delivery price</div><div>Orders a week</div><div></div>
          </div>

          {dishes.map((d, i) => (
            <div key={d.id} className="dm-row">
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Dish</label>
                <input className="tool-in" value={d.name} placeholder="Name"
                  onChange={e => update(d.id, { name: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Dine-in</label>
                <input className="tool-in" type="number" min={0} step="0.01" value={d.dineInPrice}
                  onChange={e => update(d.id, { dineInPrice: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Food cost</label>
                <input className="tool-in" type="number" min={0} step="0.01" value={d.foodCost}
                  onChange={e => update(d.id, { foodCost: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Delivery</label>
                <input className="tool-in" type="number" min={0} step="0.01" value={d.deliveryPrice}
                  placeholder={d.dineInPrice || ''}
                  onChange={e => update(d.id, { deliveryPrice: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Orders</label>
                <input className="tool-in" type="number" min={0} value={d.weeklyOrders}
                  onChange={e => update(d.id, { weeklyOrders: e.target.value })} />
              </div>
              <div style={{ paddingBottom: 10 }}>
                {dishes.length > 1 && (
                  <button className="tool-link" style={{ color: '#8A8279', fontSize: 13 }}
                    onClick={() => remove(d.id)} aria-label={`Remove row ${i + 1}`}>Remove</button>
                )}
              </div>
            </div>
          ))}

          <button className="tool-link" style={{ marginTop: 16 }} onClick={add}>Add another dish</button>
        </div>

        {/* Results */}
        {totals.count > 0 && (
          <>
            <div className="tool-card" style={{ padding: '28px 30px', marginBottom: 20,
              background: totals.losing.length > 0 ? 'rgba(161,59,42,0.04)' : '#fff',
              borderColor: totals.losing.length > 0 ? 'rgba(161,59,42,0.22)' : '#E8E2D8' }}>
              <div style={{ display: 'flex', gap: 38, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingBottom: 22, borderBottom: '2px solid ' + INK, marginBottom: 22 }}>
                <div>
                  <div className="tool-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', lineHeight: 1,
                    color: totals.weekly >= 0 ? '#3F6B4C' : '#A13B2A' }}>
                    {signed(totals.weekly)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 7 }}>
                    Gross margin a week from these dishes on {p.label.toLowerCase()}
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>
                    {totals.avgPct.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Against {totals.avgDineIn.toFixed(1)}% dine-in
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1,
                    color: totals.losing.length > 0 ? '#A13B2A' : '#C4BDB2' }}>
                    {totals.losing.length}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Losing money per order
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>
                    {signed(totals.annual)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>A year at this rate</div>
                </div>
              </div>

              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#57514A', maxWidth: 660 }}>
                {totals.losing.length > 0 ? (
                  <>
                    <strong style={{ color: '#A13B2A' }}>
                      {totals.losing.length} {totals.losing.length === 1 ? 'dish is' : 'dishes are'} costing
                      you money on every order sent out.
                    </strong>{' '}
                    Together they lose {money(Math.abs(totals.losingWeekly))} a week, or{' '}
                    {money(Math.abs(totals.losingWeekly * 52))} a year. Selling more of them makes it worse.
                  </>
                ) : (
                  <>Every dish is contributing, but the margin is {totals.gap.toFixed(1)} points below what
                  the same dishes earn dine-in. That gap is what the platform takes.</>
                )}
              </div>

              {samePricing && (
                <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 6,
                  background: 'rgba(176,122,30,0.07)', border: '1px solid rgba(176,122,30,0.22)',
                  fontSize: 14, lineHeight: 1.7, color: '#8F6318', maxWidth: 660 }}>
                  Some of your delivery prices match your dine-in prices. Delivery menus generally need 8
                  to 12 points more margin than dine-in to end up in the same place, which usually means
                  pricing 15 to 25 per cent higher. The platforms allow it and most operators do it.
                </div>
              )}
            </div>

            {/* Per dish */}
            <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Dish by dish</div>
              <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 16 }}>
                Break even is what you would need to charge to stop losing money. Match dine-in is what
                you would need to charge to earn the same margin percentage as the restaurant.
              </div>

              {[...rows].filter(r => r.price > 0).sort((a, b) => a.margin - b.margin).map(r => (
                <div key={r.dish.id} className="dm-res">
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{r.dish.name || 'Unnamed dish'}</div>
                    {r.orders > 0 && (
                      <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                        {r.orders} a week
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600,
                    color: r.margin < 0 ? '#A13B2A' : r.margin < 1 ? '#8F6318' : '#3F6B4C' }}>
                    {signed(r.margin)}
                    <div style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}>per order</div>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A' }}>
                    {r.marginPct.toFixed(0)}%
                    <div style={{ fontSize: 12, color: '#8A8279' }}>vs {r.dineInPct.toFixed(0)}% in</div>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A' }}>
                    {money(r.breakEvenPrice)}
                    <div style={{ fontSize: 12, color: '#8A8279' }}>break even</div>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A' }}>
                    {r.targetPrice > 0 && r.targetPrice < r.price * 4 ? (
                      <>
                        {money(r.targetPrice)}
                        <div style={{ fontSize: 12, color: '#8A8279' }}>
                          to match dine-in, {(((r.targetPrice / r.price) - 1) * 100).toFixed(0)}% more
                        </div>
                      </>
                    ) : (
                      <span style={{ color: '#C4BDB2' }}>—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What to do */}
            <div className="tool-card" style={{ padding: '24px 30px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>What people actually do</div>
              <ul style={{ fontSize: 15, color: '#57514A', lineHeight: 1.9, paddingLeft: 20, margin: 0, maxWidth: 680 }}>
                <li><strong>Price the delivery menu separately.</strong> Fifteen to twenty five per cent
                  above dine-in is normal and customers are used to it. Every platform allows it.</li>
                <li><strong>Take the worst offenders off delivery entirely.</strong> A dish losing money
                  on every order does not need repricing, it needs removing from that menu.</li>
                <li><strong>Push the ones that travel well and carry margin.</strong> The platform
                  algorithm rewards what sells, so what you promote matters.</li>
                <li><strong>Check the commission you are actually on.</strong> Rates vary by tier and by
                  whether you use their riders, and the one you signed up on may not be the one you are
                  paying now.</li>
                <li><strong>Remember the platforms report your income to HMRC.</strong> Delivery turnover
                  is visible whatever your records say, so the two need to agree.</li>
              </ul>
            </div>

            {/* CTA */}
            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
              <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                This changes every time a price moves
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 570 }}>
                Ingredient costs move weekly and platform rates change without much warning, so a dish
                that worked in January can be losing money by March. We are building something that keeps
                this current rather than making you redo it.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="/margin-manager" className="tool-btn"
                  style={{ textDecoration: 'none', display: 'inline-block' }}>
                  See Margin Manager
                </a>
                <a href="/tools/restaurant-benchmark-check" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  Or check your margin against the benchmarks
                </a>
              </div>
            </div>
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 650 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 650 }}>
          Commission rates are typical rather than yours, and vary by tier, by contract and by whether the
          platform provides the rider. Check your own statements. This covers food cost and packaging
          only, not the kitchen labour a delivery order takes, so the real position is slightly worse
          than shown.
        </p>
      </div>
    </div>
  )
}
