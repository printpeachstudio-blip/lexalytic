'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'

// Stripe Payment Link for the position report.
// Success URL must be: https://www.lexalytic.com/tools/restaurant-benchmark-check?ref=bpr-6q3wz8
// The paid report is off while the AML tax adviser question is unresolved.
// Set this to true to bring it back. The report code below is untouched.
const REPORT_ENABLED = false

const STRIPE_LINK = 'https://buy.stripe.com/5kQ7sEdkZ2Ma37u6JK3AY0a'
const REPORT_PRICE = '£49'
const UNLOCK_PARAM = 'bpr-6q3wz8'
const PAID_KEY = 'lexalytic.benchmark.paid'
const BUSINESS_KEY = 'lexalytic.benchmark.business'

const AMBER = '#C17D2E'
const INK = '#1A1815'

// Published benchmark ranges, UK 2026. Sources vary slightly so these are the
// midpoints of the commonly cited ranges rather than a single authority.
interface Concept {
  key: string
  label: string
  gpLow: number
  gpHigh: number
  netLow: number
  netHigh: number
  note: string
}

const CONCEPTS: Concept[] = [
  { key: 'casual', label: 'Full service or casual dining', gpLow: 65, gpHigh: 70, netLow: 3, netHigh: 6,
    note: 'The largest group and the one HMRC benchmarks most often.' },
  { key: 'qsr', label: 'Quick service or takeaway', gpLow: 65, gpHigh: 70, netLow: 6, netHigh: 9,
    note: 'Higher net expectation because service costs are lower.' },
  { key: 'pub', label: 'Pub or bar', gpLow: 70, gpHigh: 80, netLow: 7, netHigh: 15,
    note: 'Drink-led sales carry higher GP, so the expected band is higher.' },
  { key: 'fine', label: 'Fine dining', gpLow: 65, gpHigh: 70, netLow: 5, netHigh: 15,
    note: 'Wide net range because covers and spend vary enormously.' },
  { key: 'cafe', label: 'Cafe or coffee shop', gpLow: 65, gpHigh: 75, netLow: 4, netHigh: 10,
    note: 'Beverage margin lifts GP above a food-led site.' },
]

// Things that legitimately depress margin, with a rough scale of effect
interface Factor {
  key: string
  label: string
  question: string
  gpEffect: (v: number) => number   // percentage points off GP
  netEffect: (v: number) => number  // percentage points off net
  evidence: string[]
  unit: string
  max: number
}

const FACTORS: Factor[] = [
  {
    key: 'delivery',
    label: 'Delivery platform mix',
    question: 'What share of turnover comes through Deliveroo, Uber Eats or Just Eat?',
    unit: '%', max: 100,
    gpEffect: v => 0,  // commission is not COGS, so it hits net not GP
    netEffect: v => (v / 100) * 30,  // commission averages 25 to 35 per cent
    evidence: [
      'Platform statements showing commission deducted',
      'The split between platform and direct sales in your till reports',
      'Your platform menu prices against your dine-in prices',
    ],
  },
  {
    key: 'discount',
    label: 'Discounting and offers',
    question: 'What share of covers are on a discount, set menu or offer?',
    unit: '%', max: 100,
    gpEffect: v => (v / 100) * 12,
    netEffect: v => (v / 100) * 8,
    evidence: [
      'Till reports showing discount codes applied by period',
      'Copies of the offers that ran and the dates they ran',
      'Any third party voucher settlement statements',
    ],
  },
  {
    key: 'waste',
    label: 'Waste and spoilage',
    question: 'Roughly what share of stock is wasted, spoiled or comped?',
    unit: '%', max: 30,
    gpEffect: v => v * 0.9,
    netEffect: v => v * 0.7,
    evidence: [
      'A dated waste log kept as it happens, not reconstructed',
      'Photographs or supervisor sign-off on significant write-offs',
      'Stocktake variance reports showing the trend',
    ],
  },
  {
    key: 'staffmeals',
    label: 'Staff meals',
    question: 'Roughly what share of food cost goes on staff meals?',
    unit: '%', max: 20,
    gpEffect: v => v * 0.85,
    netEffect: v => v * 0.6,
    evidence: [
      'A staff meal policy in writing',
      'A log of meals taken, or a per-shift allowance applied consistently',
      'Payroll records showing whether it is treated as a benefit',
    ],
  },
  {
    key: 'tied',
    label: 'Tied supply agreement',
    question: 'What share of drinks purchases are tied to a pub company?',
    unit: '%', max: 100,
    gpEffect: v => (v / 100) * 10,
    netEffect: v => (v / 100) * 6,
    evidence: [
      'Your tenancy or lease agreement showing the tie',
      'Pubco price lists against open market quotes for the same products',
      'Any MRO correspondence with the pub company',
    ],
  },
]

interface Flag {
  level: 'high' | 'medium' | 'low'
  title: string
  detail: string
}

function money(n: number) {
  return '£' + Math.round(n).toLocaleString('en-GB')
}
function pct(n: number) {
  return n.toFixed(1) + '%'
}

export default function HmrcBenchmark() {
  const [concept, setConcept] = useState('casual')
  const [turnover, setTurnover] = useState('480000')
  const [cogs, setCogs] = useState('172800')
  const [wages, setWages] = useState('148000')
  const [otherCosts, setOtherCosts] = useState('132000')
  const [cash, setCash] = useState('18')
  const [factors, setFactors] = useState<Record<string, string>>({
    delivery: '22', discount: '15', waste: '4', staffmeals: '2', tied: '0',
  })

  // Prior year, optional, used to show whether the gap is widening
  const [priorTurnover, setPriorTurnover] = useState('')
  const [priorCogs, setPriorCogs] = useState('')
  const [showPrior, setShowPrior] = useState(false)

  const [paid, setPaid] = useState(false)
  const [business, setBusiness] = useState({ name: '', trading: '', yearEnd: '', preparedBy: '' })
  const [editingBusiness, setEditingBusiness] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const b = localStorage.getItem(BUSINESS_KEY)
      if (b) setBusiness(JSON.parse(b))
    } catch { /* storage unavailable */ }
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1')
        setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(BUSINESS_KEY, JSON.stringify(business)) } catch { /* ignore */ }
  }, [business])

  const businessReady = business.name.trim().length >= 2 && business.yearEnd.trim().length > 0

  const c = CONCEPTS.find(x => x.key === concept)!

  const result = useMemo(() => {
    const t = parseFloat(turnover) || 0
    const cg = parseFloat(cogs) || 0
    const w = parseFloat(wages) || 0
    const o = parseFloat(otherCosts) || 0
    if (t <= 0) return null

    const gp = ((t - cg) / t) * 100
    const net = ((t - cg - w - o) / t) * 100
    const prime = ((cg + w) / t) * 100

    const gpGap = c.gpLow - gp          // positive means below benchmark
    const netGap = c.netLow - net

    // How much of the gap the stated factors would explain
    let gpExplained = 0
    let netExplained = 0
    const applied: { factor: Factor; value: number; gp: number; net: number }[] = []

    FACTORS.forEach(f => {
      const v = parseFloat(factors[f.key]) || 0
      if (v <= 0) return
      const g = f.gpEffect(v)
      const n = f.netEffect(v)
      gpExplained += g
      netExplained += n
      applied.push({ factor: f, value: v, gp: g, net: n })
    })

    applied.sort((a, b) => (b.gp + b.net) - (a.gp + a.net))

    const cashPct = Math.min(100, Math.max(0, parseFloat(cash) || 0))

    const flags: Flag[] = []

    if (gpGap > 0) {
      flags.push({
        level: gpGap > 5 ? 'high' : 'medium',
        title: `Gross profit ${pct(gpGap)} below the expected range`,
        detail: `You are at ${pct(gp)} against an expected ${c.gpLow} to ${c.gpHigh}%. Consistently below benchmark is the single most common trigger for an enquiry, because it can indicate either unrecorded sales or overstated purchases.`,
      })
    }
    if (netGap > 0) {
      flags.push({
        level: netGap > 3 ? 'high' : 'medium',
        title: `Net margin ${pct(netGap)} below the expected range`,
        detail: `You are at ${pct(net)} against an expected ${c.netLow} to ${c.netHigh}%. HMRC publishes net profit benchmarks for restaurants and the Connect system compares filed returns against them.`,
      })
    }
    if (prime > 70) {
      flags.push({
        level: 'medium',
        title: `Prime cost at ${pct(prime)}`,
        detail: 'Food plus labour above 70% of turnover leaves very little for rent, utilities and profit. It is a warning sign operationally as well as a thing that gets noticed.',
      })
    }
    if (cashPct > 30) {
      flags.push({
        level: 'high',
        title: `${cashPct}% of takings in cash`,
        detail: 'Cash-heavy businesses attract more attention, and Electronic Sales Suppression is an active enforcement area. The defence is a complete and reconciled till record, not a lower cash percentage.',
      })
    } else if (cashPct > 15) {
      flags.push({
        level: 'low',
        title: `${cashPct}% of takings in cash`,
        detail: 'Not unusual for hospitality, but worth being able to show daily reconciliation between till, banking and declared takings.',
      })
    }

    const deliveryPct = parseFloat(factors.delivery) || 0
    if (deliveryPct > 0) {
      flags.push({
        level: 'low',
        title: 'Delivery platform income is reported to HMRC directly',
        detail: `Under the digital platform reporting rules, Deliveroo, Uber Eats and Just Eat report seller income to HMRC. Roughly ${money(t * deliveryPct / 100)} of your turnover will have been reported by them. Your own records need to agree with that.`,
      })
    }

    const gpRemaining = Math.max(0, gpGap - gpExplained)
    const netRemaining = Math.max(0, netGap - netExplained)

    // Prior year, if given
    const pt = parseFloat(priorTurnover) || 0
    const pc = parseFloat(priorCogs) || 0
    const priorGp = pt > 0 ? ((pt - pc) / pt) * 100 : null
    const gpTrend = priorGp !== null ? gp - priorGp : null

    return {
      t, cg, w, o, gp, net, prime, gpGap, netGap,
      gpExplained, netExplained, gpRemaining, netRemaining,
      applied, flags, cashPct, priorGp, gpTrend,
      gpOk: gpGap <= 0, netOk: netGap <= 0,
    }
  }, [turnover, cogs, wages, otherCosts, cash, factors, c, priorTurnover, priorCogs])


  // The paid report. A dated record of the position with the working shown,
  // which is worth having on file regardless of whether anyone ever asks.
  const openReport = useCallback(() => {
    if (!result) return
    const today = new Date().toLocaleDateString('en-GB',
      { day: 'numeric', month: 'long', year: 'numeric' })

    const factorRows = result.applied.map(a => `
      <tr>
        <td>${a.factor.label}</td>
        <td class="r">${a.value}${a.factor.unit}</td>
        <td class="r">${a.gp > 0 ? a.gp.toFixed(1) + ' pts' : '—'}</td>
        <td class="r">${a.net > 0 ? a.net.toFixed(1) + ' pts' : '—'}</td>
      </tr>`).join('')

    const evidenceBlocks = result.applied.map(a => `
      <div class="ev">
        <h4>${a.factor.label}</h4>
        <p class="small">Stated at ${a.value}${a.factor.unit}, accounting for approximately
        ${a.gp > 0 ? a.gp.toFixed(1) + ' points of gross profit' : ''}${a.gp > 0 && a.net > 0 ? ' and ' : ''}${a.net > 0 ? a.net.toFixed(1) + ' points of net margin' : ''}.</p>
        <ul>${a.factor.evidence.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>`).join('')

    const flagRows = result.flags.map(f => `
      <div class="flag ${f.level}">
        <strong>${f.title}</strong>
        <p>${f.detail}</p>
      </div>`).join('')

    const trendLine = result.gpTrend !== null
      ? `<p><strong>Trend.</strong> Gross profit ${result.gpTrend >= 0 ? 'rose' : 'fell'} by
         ${Math.abs(result.gpTrend).toFixed(1)} points against the prior year, from
         ${result.priorGp!.toFixed(1)}% to ${result.gp.toFixed(1)}%.
         ${result.gpTrend < -2
           ? 'A fall of more than two points in a year is itself worth explaining, since a sudden movement draws more attention than a consistently low figure.'
           : result.gpTrend > 2
           ? 'An improvement of that size is worth being able to account for as well, since large movements in either direction get noticed.'
           : 'A movement of that size is within normal year to year variation.'}</p>`
      : ''

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Gross profit position</title>
<style>
  @page { margin: 20mm; }
  body { font-family: Georgia,'Times New Roman',serif; color:#111; line-height:1.6; max-width:760px; margin:0 auto; padding:28px; font-size:13.5px; }
  h1 { font-size:23px; margin:0 0 4px; }
  h2 { font-size:17px; margin:30px 0 10px; }
  h3 { font-size:15px; margin:22px 0 8px; }
  h4 { font-size:14px; margin:0 0 5px; }
  .sub { color:#666; font-size:13px; margin:0 0 26px; }
  .headline { border:2px solid #111; padding:20px 24px; margin-bottom:22px; }
  .big { font-size:32px; line-height:1.1; }
  .biglabel { color:#555; font-size:13px; margin-top:6px; }
  .stats { display:flex; gap:32px; flex-wrap:wrap; margin:18px 0 24px; }
  .stat b { display:block; font-size:20px; font-weight:normal; }
  .stat span { font-size:12px; color:#666; }
  table { width:100%; border-collapse:collapse; margin:12px 0 18px; font-size:12.5px; }
  th,td { text-align:left; padding:7px 6px; border-bottom:1px solid #ddd; }
  th { border-bottom:2px solid #333; font-weight:600; }
  .r { text-align:right; }
  .flag { border-left:3px solid #999; padding:10px 14px; margin:12px 0; background:#fafafa; }
  .flag.high { border-color:#A13B2A; background:#faf4f3; }
  .flag.medium { border-color:#B07A1E; background:#fdf9f2; }
  .flag p { margin:5px 0 0; font-size:12.5px; color:#444; }
  .ev { margin-bottom:16px; }
  .ev ul { margin:6px 0 0; padding-left:20px; font-size:12.5px; }
  .small { font-size:12.5px; color:#555; margin:0; }
  .note { font-size:11.5px; color:#666; border-top:1px solid #ddd; padding-top:13px; margin-top:28px; }
  ul.check { padding-left:20px; }
  ul.check li { margin-bottom:7px; }
  @media print { .noprint { display:none; } }
</style></head>
<body>
  <div class="noprint" style="background:#1A1815;color:#fff;padding:13px 17px;border-radius:8px;margin-bottom:24px;font-family:-apple-system,sans-serif;font-size:13px;">
    Use your browser print dialogue and choose Save as PDF. Keep a copy on file with the year it relates to.
  </div>

  <h1>Gross profit position</h1>
  <p class="sub">${business.name}${business.trading ? ', trading as ' + business.trading : ''}<br/>
  Year ended ${business.yearEnd} &middot; Prepared ${today}${business.preparedBy ? ' by ' + business.preparedBy : ''}</p>

  <div class="headline">
    <div class="big">${result.gp.toFixed(1)}% gross, ${result.net.toFixed(1)}% net</div>
    <div class="biglabel">Against a published range of ${c.gpLow} to ${c.gpHigh}% gross and
    ${c.netLow} to ${c.netHigh}% net for ${c.label.toLowerCase()}</div>
  </div>

  <div class="stats">
    <div class="stat"><b>${money(result.t)}</b><span>Turnover, ex VAT</span></div>
    <div class="stat"><b>${money(result.cg)}</b><span>Cost of sales</span></div>
    <div class="stat"><b>${result.prime.toFixed(1)}%</b><span>Prime cost</span></div>
    <div class="stat"><b>${result.cashPct}%</b><span>Cash takings</span></div>
  </div>

  <h2>Summary</h2>
  <p>${result.gpOk && result.netOk
    ? 'Both gross profit and net margin fall inside the published range for this format. Nothing in the figures below would appear unusual against sector benchmarks.'
    : `Gross profit is ${result.gpGap > 0 ? result.gpGap.toFixed(1) + ' points below' : 'inside'} the published range and net margin is ${result.netGap > 0 ? result.netGap.toFixed(1) + ' points below' : 'inside'} it. The factors set out below account for approximately ${Math.min(result.gpExplained, Math.max(result.gpGap, 0)).toFixed(1)} points of the gross variance.`}</p>
  ${trendLine}

  <h2>Factors affecting margin</h2>
  <p class="small">Each of the following legitimately reduces gross profit or net margin and is not
  visible as a separate line in a set of accounts.</p>
  <table>
    <thead><tr><th>Factor</th><th class="r">Stated level</th><th class="r">Gross effect</th><th class="r">Net effect</th></tr></thead>
    <tbody>${factorRows || '<tr><td colspan="4">None stated.</td></tr>'}</tbody>
  </table>
  ${result.gpRemaining > 1
    ? `<p><strong>Unaccounted variance.</strong> Approximately ${result.gpRemaining.toFixed(1)} points of
       gross profit are not explained by the factors above. That is worth investigating on its own
       account, since an unexplained gap between expected and actual margin usually indicates stock
       leaving without being recorded, portioning that has drifted, or supplier price increases that
       were not passed through.</p>`
    : ''}

  <h2>What would draw attention</h2>
  ${flagRows || '<p class="small">Nothing in the figures is outside normal parameters.</p>'}

  <h2>Supporting records</h2>
  <p class="small">The records below evidence the factors stated. They are considerably easier to keep
  as events occur than to reconstruct afterwards, and a contemporaneous record carries far more weight
  than a figure estimated later.</p>
  ${evidenceBlocks || '<p class="small">No factors stated, so no supporting records are identified.</p>'}

  <h2>Suggested record keeping</h2>
  <ul class="check">
    <li>Waste log completed daily, dated, with supervisor sign-off on anything significant</li>
    <li>Till reports retained by period showing discounts and comps applied</li>
    <li>Platform statements filed monthly, reconciled against till and bank</li>
    <li>Written staff meal policy, with meals taken recorded or a consistent allowance applied</li>
    <li>Stocktake performed at consistent intervals with variance recorded and investigated</li>
    <li>Supplier price changes noted when they occur, with menu recosting dated</li>
    <li>Daily reconciliation between till, banking and declared takings</li>
  </ul>

  <p class="note">Prepared using the Lexalytic benchmark check from figures entered by the business.
  Benchmark ranges are drawn from commonly published UK hospitality figures for 2026 and are indicative
  rather than an HMRC publication. The effect attributed to each factor is a model rather than a
  calculation of actual impact. This document is a management record and is not tax advice. If a
  compliance check has been opened, take advice from an accountant or a tax investigation specialist.</p>
</body></html>`

    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [result, business, c])

  const Num = ({ label, value, onChange, hint }:
    { label: string; value: string; onChange: (v: string) => void; hint?: string }) => (
    <div>
      <label style={{ display: 'block', fontSize: 13, color: '#57514A', marginBottom: 5 }}>{label}</label>
      <input className="tool-in" type="number" min={0} value={value} onChange={e => onChange(e.target.value)} />
      {hint && <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4, lineHeight: 1.5 }}>{hint}</div>}
    </div>
  )

  return (
    <div className="tool-page">
      <style>{`
        .hb-opt { font: inherit; font-size: 14px; padding: 9px 15px; border-radius: 6px; cursor: pointer;
          background: #fff; border: 1px solid #DDD6CC; color: #4A453F; }
        .hb-opt[aria-pressed=true] { background: ${INK}; border-color: ${INK}; color: #fff; }
        .hb-opt:focus-visible, .tool-btn:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .hb-dark { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          background: rgba(255,255,255,0.06); color: #fff;
          border: 1px solid rgba(255,255,255,0.15); width: 100%; }
        .hb-dark::placeholder { color: rgba(255,255,255,0.35); }
        .hb-dark:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .hb-g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 760px) { .tool-g2, .hb-g4 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .tool-g2, .hb-g4 { grid-template-columns: 1fr; } }
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
          How do your numbers look from the outside?
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 650, margin: '0 0 8px' }}>
          HMRC publishes expected profit benchmarks for restaurants and compares filed returns against
          them automatically. A business can be entirely straight and still sit below the range, because
          delivery commission, discounting and waste all depress margin without appearing anywhere
          obvious in the accounts.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8A8279', maxWidth: 650, margin: '0 0 32px' }}>
          This shows where you sit, how much of any gap your own circumstances explain, and what records
          would evidence it. Everything runs in your browser and nothing is sent anywhere.
        </p>

        {/* Concept */}
        <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>What kind of site is it?</div>
          <div style={{ fontSize: 13.5, color: '#8A8279', marginBottom: 14 }}>
            The expected range differs by format, so this changes everything below.
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {CONCEPTS.map(x => (
              <button key={x.key} className="hb-opt" aria-pressed={concept === x.key}
                onClick={() => setConcept(x.key)}>{x.label}</button>
            ))}
          </div>
          <div style={{ fontSize: 13.5, color: '#57514A', lineHeight: 1.6 }}>
            Expected {c.gpLow} to {c.gpHigh}% gross, {c.netLow} to {c.netHigh}% net. {c.note}
          </div>
        </div>

        {/* Figures */}
        <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Last full year</div>
          <div className="hb-g4" style={{ marginBottom: 16 }}>
            <Num label="Turnover, ex VAT" value={turnover} onChange={setTurnover} />
            <Num label="Cost of sales" value={cogs} onChange={setCogs} hint="Food and drink only" />
            <Num label="Wages and NI" value={wages} onChange={setWages} />
            <Num label="All other costs" value={otherCosts} onChange={setOtherCosts} hint="Rent, utilities, everything else" />
          </div>
          <div style={{ maxWidth: 200 }}>
            <Num label="Cash takings" value={cash} onChange={setCash} hint="As a % of turnover" />
          </div>

          <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F0EBE2' }}>
            {!showPrior ? (
              <button className="hb-opt" style={{ fontSize: 13.5 }} onClick={() => setShowPrior(true)}>
                Add the prior year as well
              </button>
            ) : (
              <>
                <div style={{ fontSize: 13.5, color: '#8A8279', marginBottom: 12, maxWidth: 600, lineHeight: 1.6 }}>
                  Optional, but a sudden movement in either direction draws more attention than a
                  consistently low figure, so it is worth knowing which you have.
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ width: 180 }}>
                    <Num label="Prior year turnover" value={priorTurnover} onChange={setPriorTurnover} />
                  </div>
                  <div style={{ width: 180 }}>
                    <Num label="Prior year cost of sales" value={priorCogs} onChange={setPriorCogs} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Factors */}
        <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 26 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>What is pulling your margin down?</div>
          <div style={{ fontSize: 13.5, color: '#8A8279', marginBottom: 18, maxWidth: 620, lineHeight: 1.6 }}>
            These are the legitimate reasons a well run site sits below benchmark. Being able to point at
            them, with records behind them, is the difference between a short conversation and a long one.
          </div>
          <div className="tool-g2" style={{ gap: 18 }}>
            {FACTORS.map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 13, color: '#57514A', marginBottom: 5 }}>
                  {f.label}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input className="tool-in" type="number" min={0} max={f.max} style={{ width: 90 }}
                    value={factors[f.key] || '0'}
                    onChange={e => setFactors({ ...factors, [f.key]: e.target.value })} />
                  <span style={{ fontSize: 14, color: '#8A8279' }}>{f.unit}</span>
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5, lineHeight: 1.5 }}>
                  {f.question}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {result && (
          <>
            <div className="tool-card" style={{ padding: '28px 30px', marginBottom: 20,
              background: result.gpOk && result.netOk ? '#fff' : 'rgba(176,122,30,0.04)',
              borderColor: result.gpOk && result.netOk ? '#E8E2D8' : 'rgba(176,122,30,0.22)' }}>
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingBottom: 22, borderBottom: '2px solid ' + INK, marginBottom: 22 }}>
                <div>
                  <div className="tool-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', lineHeight: 1,
                    color: result.gpOk ? '#3F6B4C' : '#8F6318' }}>
                    {pct(result.gp)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 7 }}>
                    Gross profit, expected {c.gpLow} to {c.gpHigh}%
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 26, lineHeight: 1.1,
                    color: result.netOk ? '#3F6B4C' : '#8F6318' }}>
                    {pct(result.net)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Net, expected {c.netLow} to {c.netHigh}%
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 26, lineHeight: 1.1,
                    color: result.prime > 70 ? '#8F6318' : '#57514A' }}>
                    {pct(result.prime)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Prime cost, warning above 70%
                  </div>
                </div>
              </div>

              {result.gpTrend !== null && (
                <div style={{ marginBottom: 16, padding: '13px 16px', borderRadius: 6,
                  background: '#FDFCFA', border: '1px solid #EDE7DD',
                  fontSize: 14.5, color: '#57514A', lineHeight: 1.7 }}>
                  Gross profit {result.gpTrend >= 0 ? 'rose' : 'fell'} by{' '}
                  {Math.abs(result.gpTrend).toFixed(1)} points against last year, from{' '}
                  {result.priorGp!.toFixed(1)}% to {result.gp.toFixed(1)}%.
                  {result.gpTrend < -2
                    ? ' A fall of more than two points in a year is worth explaining in itself, because a sudden movement draws more attention than a figure that has always been low.'
                    : result.gpTrend > 2
                    ? ' A rise that size gets noticed too, so it is worth being able to say what changed.'
                    : ' That is within normal year to year variation.'}
                </div>
              )}

              {result.gpOk && result.netOk ? (
                <div style={{ fontSize: 16, lineHeight: 1.75, color: '#3F6B4C' }}>
                  Both figures sit inside the expected range for your format. Nothing here would look
                  unusual on a filed return.
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>
                    What explains the gap
                  </div>
                  {result.applied.length > 0 ? (
                    <>
                      {result.applied.map(a => (
                        <div key={a.factor.key} style={{ display: 'grid',
                          gridTemplateColumns: 'minmax(0, 1fr) 90px 90px', gap: 14,
                          padding: '9px 0', borderBottom: '1px solid #F7F4EF', fontSize: 14 }}>
                          <div>{a.factor.label} <span style={{ color: '#8A8279' }}>at {a.value}{a.factor.unit}</span></div>
                          <div style={{ color: '#57514A', textAlign: 'right' }}>
                            {a.gp > 0 ? `${a.gp.toFixed(1)}pt GP` : ''}
                          </div>
                          <div style={{ color: '#57514A', textAlign: 'right' }}>
                            {a.net > 0 ? `${a.net.toFixed(1)}pt net` : ''}
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8, color: '#57514A' }}>
                        {result.gpGap > 0 && (
                          <div>
                            Your gross profit is {pct(result.gpGap)} below the range, and the factors above
                            account for roughly {pct(Math.min(result.gpExplained, result.gpGap))} of it.
                            {result.gpRemaining > 1
                              ? ` That leaves about ${pct(result.gpRemaining)} unexplained, which is worth understanding before somebody else asks.`
                              : ' That accounts for it.'}
                          </div>
                        )}
                        {result.netGap > 0 && (
                          <div style={{ marginTop: 8 }}>
                            Net margin is {pct(result.netGap)} below, with roughly{' '}
                            {pct(Math.min(result.netExplained, result.netGap))} explained.
                            {result.netRemaining > 1
                              ? ` About ${pct(result.netRemaining)} is not accounted for by what you have entered.`
                              : ' That accounts for it.'}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 15, lineHeight: 1.75, color: '#57514A' }}>
                      You are below the expected range and have not recorded anything that would explain
                      it. Either there is something above worth filling in, or the gap is operational and
                      worth investigating on its own account.
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Flags */}
            {result.flags.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
                  What would stand out
                </div>
                <div style={{ border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden' }}>
                  {result.flags.map((f, i) => {
                    const tone = f.level === 'high'
                      ? { c: '#A13B2A', bg: 'rgba(161,59,42,0.05)', b: 'rgba(161,59,42,0.22)' }
                      : f.level === 'medium'
                      ? { c: '#8F6318', bg: 'rgba(176,122,30,0.05)', b: 'rgba(176,122,30,0.22)' }
                      : { c: '#57514A', bg: '#fff', b: '#EDE7DD' }
                    return (
                      <div key={i} style={{ padding: '16px 22px', background: tone.bg,
                        borderBottom: i < result.flags.length - 1 ? '1px solid #F0EBE2' : 'none' }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: tone.c, marginBottom: 5 }}>
                          {f.title}
                        </div>
                        <div style={{ fontSize: 14, color: '#57514A', lineHeight: 1.7 }}>{f.detail}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Evidence */}
            {result.applied.length > 0 && (
              <div className="tool-card" style={{ padding: '24px 30px', marginBottom: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                  What would evidence it
                </div>
                <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.65, margin: '0 0 18px', maxWidth: 620 }}>
                  An assertion that delivery commission cost you three points is worth very little. The
                  same claim with platform statements behind it is worth a great deal. These records are
                  far easier to keep as you go than to reconstruct a year later.
                </p>
                {result.applied.map(a => (
                  <div key={a.factor.key} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 7 }}>{a.factor.label}</div>
                    <ul style={{ fontSize: 14, color: '#57514A', lineHeight: 1.8,
                      paddingLeft: 20, margin: 0 }}>
                      {a.factor.evidence.map(e => <li key={e}>{e}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Paid report, currently off */}
            {REPORT_ENABLED && (
            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff', marginBottom: 20 }}>
              <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                Put it on the record, dated
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 8px', maxWidth: 600 }}>
                The screen tells you where you stand today. The report is a dated document setting out
                the position with the working shown: the figures, what accounts for the variance, what is
                left unexplained, and which records evidence each factor.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 600 }}>
                Two reasons that matters. It is the thing to hand an accountant rather than describing it
                over the phone. And a file note made while the year is fresh is worth considerably more
                than the same explanation offered eighteen months later, because it shows the position was
                reviewed rather than reconstructed.
              </p>

              {paid ? (
                (!businessReady || editingBusiness) ? (
                  <div style={{ padding: '20px 22px', borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)' }}>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 14 }}>
                      A few details for the front of the report.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                      gap: 12, marginBottom: 14 }}>
                      <input className="hb-dark" placeholder="Business name" value={business.name}
                        onChange={e => setBusiness({ ...business, name: e.target.value })} />
                      <input className="hb-dark" placeholder="Trading as (optional)" value={business.trading}
                        onChange={e => setBusiness({ ...business, trading: e.target.value })} />
                      <input className="hb-dark" placeholder="Year ended, e.g. 31 March 2026" value={business.yearEnd}
                        onChange={e => setBusiness({ ...business, yearEnd: e.target.value })} />
                      <input className="hb-dark" placeholder="Prepared by (optional)" value={business.preparedBy}
                        onChange={e => setBusiness({ ...business, preparedBy: e.target.value })} />
                    </div>
                    <button className="tool-btn" disabled={!businessReady}
                      style={{ opacity: businessReady ? 1 : 0.5 }}
                      onClick={() => { setEditingBusiness(false); if (businessReady) openReport() }}>
                      Generate the report
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="tool-btn" onClick={openReport}>Generate the report</button>
                    <button onClick={() => setEditingBusiness(true)}
                      style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                        color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}>
                      Change the details
                    </button>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                      Opens in a new tab. Print or save as PDF.
                    </span>
                  </div>
                )
              ) : (
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <a href={STRIPE_LINK} className="tool-btn"
                    style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Get the report, {REPORT_PRICE}
                  </a>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    One payment. Regenerate whenever the figures change.
                  </span>
                </div>
              )}
            </div>

            )}

            {/* What is coming */}
            <div className="tool-card" style={{ padding: '24px 30px' }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                Keeping the records is the hard part, not the maths
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#57514A', margin: '0 0 16px', maxWidth: 620 }}>
                You cannot reconstruct last year's waste log once a letter arrives. We are building
                something that keeps the operational side and the evidence side in one place, so the
                wastage record you keep to protect your margin is also the record that answers the
                question if it is ever asked.
              </p>
              <a href="/margin-manager" style={{ fontSize: 15, color: AMBER }}>
                See Margin Manager for hospitality
              </a>
            </div>
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 650 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 650 }}>
          Benchmark ranges are drawn from commonly published UK hospitality figures for 2026 and are
          indicative rather than an HMRC publication. The effect of each factor is a rough model, not a
          calculation of your actual position. This is a prompt to look at your own numbers and keep
          proper records. It is not tax advice, and if you have received an enquiry letter you should
          speak to an accountant or a tax investigation specialist rather than relying on this.
        </p>
      </div>
    </div>
  )
}
