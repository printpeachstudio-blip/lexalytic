'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  ELEMENTS, HIDDEN, REGIONS, AGES, money,
  type Spec, type Element,
} from '@/lib/renovation'

const STRIPE_LINK = 'https://buy.stripe.com/YOUR_RENO_LINK'
const UNLOCK_PARAM = 'rnv-5t8bk2'
const PAID_KEY = 'lexalytic.reno.paid.v1'
const STATE_KEY = 'lexalytic.reno.v1'

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Quote {
  id: string
  builder: string
  total: string
  includes: Record<string, boolean>
  vatIncluded: boolean
  notes: string
}

interface Variation {
  id: string
  date: string
  what: string
  cost: string
  agreedBy: string
}

function uid() { return Math.random().toString(36).slice(2, 9) }
function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function RenovationPlanner() {
  const [picked, setPicked] = useState<Set<string>>(new Set(['kitchen', 'bathroom', 'rewire']))
  const [spec, setSpec] = useState<Spec>('mid')
  const [region, setRegion] = useState('midlands')
  const [age, setAge] = useState('1945_1979')
  const [floorArea, setFloorArea] = useState('')

  const [paid, setPaid] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [variations, setVariations] = useState<Variation[]>([])
  const [budget, setBudget] = useState('')

  useEffect(() => {
    try {
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        if (v.picked) setPicked(new Set(v.picked))
        if (v.spec) setSpec(v.spec)
        if (v.region) setRegion(v.region)
        if (v.age) setAge(v.age)
        if (v.floorArea) setFloorArea(v.floorArea)
        if (v.quotes) setQuotes(v.quotes)
        if (v.variations) setVariations(v.variations)
        if (v.budget) setBudget(v.budget)
      }
      const params = new URLSearchParams(window.location.search)
      if (params.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1')
        setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({
        picked: Array.from(picked), spec, region, age, floorArea, quotes, variations, budget,
      }))
    } catch { /* ignore */ }
  }, [picked, spec, region, age, floorArea, quotes, variations, budget])

  const reg = REGIONS.find(r => r.id === region)!
  const ageInfo = AGES.find(a => a.id === age)!

  const result = useMemo(() => {
    const chosen = ELEMENTS.filter(e => picked.has(e.id))
    if (!chosen.length) return null

    let low = 0, high = 0
    const lines = chosen.map(e => {
      const [l, h] = e[spec]
      const rl = l * reg.multiplier
      const rh = h * reg.multiplier
      low += rl; high += rh
      return { element: e, low: rl, high: rh }
    })

    // Which hidden costs this selection triggers
    const triggered = new Set<string>()
    chosen.forEach(e => (e.triggers || []).forEach(t => triggered.add(t)))

    // Some always apply
    triggered.add('vat')
    triggered.add('contingency')
    triggered.add('furnishing')
    if (['pre1919', '1919_1944', '1945_1979'].includes(age)) triggered.add('asbestos')
    if (['pre1919', '1919_1944'].includes(age)) triggered.add('damp')
    if (chosen.some(e => e.group === 'Structural')) triggered.add('skip')
    if (chosen.length >= 5) triggered.add('accommodation')

    const hidden = HIDDEN.filter(h => triggered.has(h.id))

    // Hidden cost totals
    let hLow = 0, hHigh = 0
    const hiddenLines = hidden.map(h => {
      let l = h.low, hi = h.high
      if (h.pctOfBuild) {
        l = low * (h.pctOfBuild[0] / 100)
        hi = high * (h.pctOfBuild[1] / 100)
      }
      hLow += l; hHigh += hi
      return { hidden: h, low: l, high: hi }
    })

    const contingencyPct = ageInfo.contingency
    const contingency = ((low + high) / 2) * (contingencyPct / 100)

    return {
      lines, low, high, hidden: hiddenLines, hLow, hHigh,
      allLow: low + hLow, allHigh: high + hHigh,
      contingency, contingencyPct,
      structural: chosen.some(e => e.group === 'Structural'),
    }
  }, [picked, spec, reg, age, ageInfo])

  const toggle = (id: string) => {
    const next = new Set(picked)
    if (next.has(id)) next.delete(id); else next.add(id)
    setPicked(next)
  }

  const groups = Array.from(new Set(ELEMENTS.map(e => e.group)))

  // ---- the scope brief, free ----
  const openBrief = useCallback(() => {
    if (!result) return
    const today = new Date().toLocaleDateString('en-GB',
      { day: 'numeric', month: 'long', year: 'numeric' })

    const rows = result.lines.map(l => `
      <tr><td>${l.element.label}</td><td>${l.element.note}</td></tr>`).join('')

    const hiddenRows = result.hidden.map(h => `
      <tr><td>${h.hidden.label}</td><td class="r">${h.hidden.pctOfBuild
        ? h.hidden.pctOfBuild[0] + ' to ' + h.hidden.pctOfBuild[1] + '% of build'
        : money(h.hidden.low) + ' to ' + money(h.hidden.high)}</td>
      <td>${h.hidden.when}</td></tr>`).join('')

    const html = `<!doctype html><html><head><meta charset="utf-8">
<title>Renovation scope</title><style>
@page { margin: 20mm; }
body { font-family: Georgia,'Times New Roman',serif; color:#111; line-height:1.65; max-width:760px; margin:0 auto; padding:28px; font-size:13.5px; }
h1 { font-size:23px; margin:0 0 4px; } h2 { font-size:17px; margin:28px 0 10px; }
.sub { color:#666; font-size:13px; margin:0 0 24px; }
table { width:100%; border-collapse:collapse; margin:10px 0 16px; font-size:12.5px; }
th,td { text-align:left; padding:7px 6px; border-bottom:1px solid #ddd; vertical-align:top; }
th { border-bottom:2px solid #333; } .r { text-align:right; white-space:nowrap; }
.note { font-size:11.5px; color:#666; border-top:1px solid #ddd; padding-top:12px; margin-top:26px; }
ul { padding-left:20px; } li { margin-bottom:6px; }
@media print { .noprint { display:none; } }
</style></head><body>
<div class="noprint" style="background:#1A1815;color:#fff;padding:13px 17px;border-radius:8px;margin-bottom:24px;font-family:sans-serif;font-size:13px;">
  Print this and choose Save as PDF. Send the same document to every builder you ask, so the quotes come back comparable.
</div>

<h1>Renovation scope</h1>
<p class="sub">Prepared ${today} &middot; ${reg.label} &middot; property built ${ageInfo.label.toLowerCase()}</p>

<h2>What I am asking you to price</h2>
<table><thead><tr><th>Element</th><th>Notes</th></tr></thead><tbody>${rows}</tbody></table>

<h2>Please make clear in your quote</h2>
<ul>
  <li><strong>Whether the figure includes VAT.</strong> If it does not, say so at the top rather than in the small print.</li>
  <li><strong>Which of the items below you have included and which you have not.</strong> An exclusion stated up front is not a problem. One discovered halfway through is.</li>
  <li><strong>What period the scaffold and skip hire assume</strong>, and what happens to that cost if the programme runs over.</li>
  <li><strong>How variations will be priced and agreed.</strong> I would like every change confirmed in writing with its cost before it is carried out.</li>
  <li><strong>Your payment schedule</strong>, tied to stages completed rather than dates in a calendar.</li>
</ul>

<h2>Costs I am aware of and want addressed</h2>
<table><thead><tr><th>Item</th><th class="r">Typical</th><th>When it applies</th></tr></thead>
<tbody>${hiddenRows}</tbody></table>
<p>Please say whether each of these is inside your figure, outside it, or not applicable. I am not expecting you to carry all of them, only to be clear about which.</p>

<h2>How I will compare quotes</h2>
<p>On what is included rather than the total. A lower number that excludes scaffold, making good and VAT is not a lower number. I am asking the same questions of everyone and would rather have an honest higher figure than a low one that moves.</p>

<p class="note">Prepared using the free renovation planner at lexalytic.com. The cost ranges behind it are indicative figures from published 2026 UK guides and are not a quotation or a valuation. Nothing here is professional advice, and decisions about planning permission, building regulations and party wall matters should be confirmed with your council, an approved inspector or a surveyor.</p>
</body></html>`

    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [result, reg, ageInfo])

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .rv-wrap { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
        .rv-serif { font-family: Georgia, 'Times New Roman', serif; }
        .rv-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .rv-in, .rv-sel { font: inherit; font-size: 14.5px; padding: 9px 11px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .rv-in:focus-visible, .rv-sel:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .rv-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; background: ${AMBER}; color: #fff; }
        .rv-btn:hover { background: #A96C25; }
        .rv-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .rv-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .rv-btn:focus-visible, .rv-link:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .rv-chip { font: inherit; font-size: 13.5px; padding: 9px 14px; border-radius: 6px;
          cursor: pointer; background: #fff; border: 1px solid #DDD6CC; color: #4A453F; text-align: left; }
        .rv-chip[aria-pressed="true"] { background: ${INK}; border-color: ${INK}; color: #fff; }
        .rv-label { display: block; font-size: 12px; color: #8A8279; margin-bottom: 4px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="rv-wrap" style={{ padding: 20 }}>
          <a href="/" className="rv-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="rv-wrap" style={{ paddingTop: 44 }}>
        <h1 className="rv-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 700 }}>
          The costs nobody puts in the quote
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 670, margin: '0 0 8px' }}>
          Cost overrun is the thing homeowners regret most, and the commonest cause of a fight with a
          builder is not late payment but work nobody agreed to in writing. Both come from the same
          place: a scope that was never written down properly and a budget that only counted the build.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 670, margin: '0 0 32px' }}>
          Pick what you are doing. This gives you a range, the costs that sit outside a builder's quote,
          and a written scope you can send to three of them so the answers come back comparable. Nothing
          is uploaded and it runs in your browser.
        </p>

        {/* Pick the work */}
        <div className="rv-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>What are you doing?</div>
          <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 18 }}>
            Pick everything that applies. Some of these trigger costs you may not have thought about.
          </div>

          {groups.map(g => (
            <div key={g} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: '#8A8279', letterSpacing: '0.04em',
                marginBottom: 8, textTransform: 'uppercase' }}>{g}</div>
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))', gap: 8 }}>
                {ELEMENTS.filter(e => e.group === g).map(e => (
                  <button key={e.id} className="rv-chip" aria-pressed={picked.has(e.id)}
                    onClick={() => toggle(e.id)}>{e.label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Context */}
        <div className="rv-card" style={{ padding: '22px 26px', marginBottom: 22 }}>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
            <div>
              <label className="rv-label">Where is it</label>
              <select className="rv-sel" value={region} onChange={e => setRegion(e.target.value)}>
                {REGIONS.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
              </select>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5, lineHeight: 1.5 }}>
                {reg.note}
              </div>
            </div>
            <div>
              <label className="rv-label">When was it built</label>
              <select className="rv-sel" value={age} onChange={e => setAge(e.target.value)}>
                {AGES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5, lineHeight: 1.5 }}>
                {ageInfo.note}
              </div>
            </div>
            <div>
              <label className="rv-label">Specification</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['budget', 'mid', 'premium'] as Spec[]).map(s => (
                  <button key={s} className="rv-chip" aria-pressed={spec === s}
                    style={{ flex: 1, textAlign: 'center', textTransform: 'capitalize' }}
                    onClick={() => setSpec(s)}>{s}</button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5, lineHeight: 1.5 }}>
                The finishes move the number more than anything else.
              </div>
            </div>
          </div>
        </div>

        {result && (
          <>
            {/* Headline */}
            <div className="rv-card" style={{ padding: '28px 30px', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 38, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingBottom: 22, borderBottom: '2px solid ' + INK, marginBottom: 20 }}>
                <div>
                  <div className="rv-serif" style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.2rem)', lineHeight: 1 }}>
                    {money(result.allLow)} to {money(result.allHigh)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 7, maxWidth: 260 }}>
                    Everything, including the costs outside the builder's quote
                  </div>
                </div>
                <div>
                  <div className="rv-serif" style={{ fontSize: 22, lineHeight: 1.1, color: '#57514A' }}>
                    {money(result.low)} to {money(result.high)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    The building work itself
                  </div>
                </div>
                <div>
                  <div className="rv-serif" style={{ fontSize: 22, lineHeight: 1.1, color: '#8F6318' }}>
                    {money(result.hLow)} to {money(result.hHigh)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Everything else
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#57514A', maxWidth: 690 }}>
                The gap between those two figures is the point of this. A builder quotes the middle
                number. The one that leaves your account is the first one, and the difference is
                typically {Math.round((result.hLow / Math.max(result.low, 1)) * 100)} to{' '}
                {Math.round((result.hHigh / Math.max(result.high, 1)) * 100)} per cent on top.
              </div>
            </div>

            {/* The work */}
            <div className="rv-card" style={{ padding: '22px 26px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>The work itself</div>
              {result.lines.map(l => (
                <div key={l.element.id} style={{ display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) 180px', gap: 16,
                  padding: '11px 0', borderBottom: '1px solid #F7F4EF', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 500 }}>{l.element.label}</div>
                    <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 3, lineHeight: 1.6 }}>
                      {l.element.note}
                    </div>
                  </div>
                  <div style={{ fontSize: 14.5, textAlign: 'right', color: '#57514A' }}>
                    {money(l.low)} to {money(l.high)}
                  </div>
                </div>
              ))}
            </div>

            {/* Hidden costs, the heart of it */}
            <div className="rv-card" style={{ padding: '24px 28px', marginBottom: 20,
              background: 'rgba(176,122,30,0.03)', borderColor: 'rgba(176,122,30,0.22)' }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                What is not in the builder's quote
              </div>
              <p style={{ fontSize: 14, color: '#57514A', lineHeight: 1.7, margin: '0 0 18px', maxWidth: 660 }}>
                These are the ones people find out about later. Not every one will apply to you, but
                each is triggered by something you have picked or by the age of the property.
              </p>

              {result.hidden.map(h => (
                <div key={h.hidden.id} style={{ marginBottom: 16, paddingBottom: 16,
                  borderBottom: '1px solid rgba(176,122,30,0.12)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline',
                    flexWrap: 'wrap', marginBottom: 5 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{h.hidden.label}</span>
                    <span style={{ fontSize: 14, color: '#8F6318', fontWeight: 500 }}>
                      {h.hidden.pctOfBuild
                        ? `${h.hidden.pctOfBuild[0]} to ${h.hidden.pctOfBuild[1]}%, so ${money(h.low)} to ${money(h.high)}`
                        : `${money(h.hidden.low)} to ${money(h.hidden.high)}`}
                    </span>
                    <span style={{ fontSize: 12.5, color: '#8A8279', marginLeft: 'auto' }}>
                      {h.hidden.when}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A', lineHeight: 1.75 }}>
                    {h.hidden.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Contingency */}
            <div className="rv-card" style={{ padding: '24px 28px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                Your contingency should be {result.contingencyPct} per cent
              </div>
              <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: '0 0 12px', maxWidth: 680 }}>
                On a property built {ageInfo.label.toLowerCase()}, that is about{' '}
                <strong>{money(result.contingency)}</strong> set aside and not spent on anything you can
                see. {ageInfo.note}
              </p>
              <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.75, margin: 0, maxWidth: 680 }}>
                The commonest budgeting mistake is leaving this out entirely. A contingency is not
                optional spending, it is spending you have not identified yet. If you finish without
                using it, you have a kitchen island. If you never had it, you have a half finished job
                and a difficult conversation.
              </p>
            </div>

            {/* Brief */}
            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff', marginBottom: 20 }}>
              <div className="rv-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                Send the same document to every builder
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)',
                margin: '0 0 20px', maxWidth: 600 }}>
                Three quotes written to three different assumptions cannot be compared, which is how
                people end up picking the one that quietly left things out. This produces a scope with
                the same questions for everybody, including whether VAT is in the number and what
                happens if the scaffold stays up longer than planned.
              </p>
              <button className="rv-btn" onClick={openBrief}>Open the scope document</button>
            </div>

            {/* PAID SECTION */}
            {!paid ? (
              <div className="rv-card" style={{ padding: '28px 30px', marginBottom: 20 }}>
                <div className="rv-serif" style={{ fontSize: 21, marginBottom: 12 }}>
                  Then keep hold of it once the work starts
                </div>
                <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8,
                  margin: '0 0 8px', maxWidth: 660 }}>
                  The commonest cause of a dispute with a builder is not late payment. It is work that
                  changed partway through and was never written down. Forty eight per cent of
                  contractors who have payment disputes name unforeseen cost and scope change as the
                  trigger, ahead of clients who will not pay.
                </p>
                <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8,
                  margin: '0 0 20px', maxWidth: 660 }}>
                  Both sides remember the conversation differently six weeks later. Whoever wrote it
                  down at the time is the one who is right.
                </p>

                <div style={{ display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                  gap: 18, marginBottom: 24 }}>
                  {[
                    ['A variation log', 'Every change recorded with the date, what it is, what it costs and who agreed it. Printable at the end as a single document.'],
                    ['Quote comparison', 'Put three quotes side by side on what each includes rather than what each totals. The cheapest number is rarely the cheapest job.'],
                    ['Budget tracking', 'Planned against actual by line, with the contingency drawn down separately so you can see how much of it is left.'],
                  ].map(([h, p2]) => (
                    <div key={h}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 5 }}>{h}</div>
                      <div style={{ fontSize: 13.5, color: '#57514A', lineHeight: 1.7 }}>{p2}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <a href={STRIPE_LINK} className="rv-btn"
                    style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Unlock for £29
                  </a>
                  <span style={{ fontSize: 13, color: '#8A8279' }}>
                    One payment, for the whole project. Refundable within fourteen days.
                  </span>
                </div>
              </div>
            ) : (
              <>
                {/* Variation log */}
                <div className="rv-card" style={{ padding: '24px 28px', marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Variation log</div>
                  <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7,
                    margin: '0 0 18px', maxWidth: 660 }}>
                    Every change to the original scope, written down when it happens. Record it before
                    the work is done rather than after, and note who agreed it. This is the document
                    that settles an argument six weeks later.
                  </p>

                  <div className="vr-form" style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
                    gap: 12, marginBottom: 14 }}>
                    <div>
                      <label className="rv-label">Date</label>
                      <input className="rv-in" name="date" type="date" max={todayStr()}
                        defaultValue={todayStr()} />
                    </div>
                    <div style={{ gridColumn: 'span 2' }}>
                      <label className="rv-label">What changed</label>
                      <input className="rv-in" name="what"
                        placeholder="Moved the soil pipe to allow the shower position" />
                    </div>
                    <div>
                      <label className="rv-label">Agreed cost</label>
                      <input className="rv-in" name="cost" type="number" min={0} step="0.01" />
                    </div>
                    <div>
                      <label className="rv-label">Agreed with</label>
                      <input className="rv-in" name="agreedBy" placeholder="Name" />
                    </div>
                  </div>
                  <button className="rv-btn rv-quiet" onClick={e => {
                    const wrap = e.currentTarget.closest('.rv-card')!.querySelector('.vr-form') as HTMLElement
                    const get = (n: string) =>
                      (wrap.querySelector(`[name=${n}]`) as HTMLInputElement)?.value || ''
                    const what = get('what').trim()
                    if (!what) return
                    setVariations(v => [...v, {
                      id: uid(), date: get('date') || todayStr(), what,
                      cost: get('cost') || '0', agreedBy: get('agreedBy'),
                    }])
                    ;(wrap.querySelector('[name=what]') as HTMLInputElement).value = ''
                    ;(wrap.querySelector('[name=cost]') as HTMLInputElement).value = ''
                  }}>Add to the log</button>

                  {variations.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      {variations.map(v => (
                        <div key={v.id} style={{ display: 'grid',
                          gridTemplateColumns: '110px minmax(0, 1fr) 110px 120px 70px', gap: 12,
                          padding: '10px 0', borderBottom: '1px solid #F7F4EF',
                          fontSize: 14, alignItems: 'baseline' }}>
                          <div style={{ color: '#8A8279' }}>{v.date}</div>
                          <div>{v.what}</div>
                          <div style={{ fontWeight: 500 }}>{money(parseFloat(v.cost) || 0)}</div>
                          <div style={{ fontSize: 13, color: '#8A8279' }}>{v.agreedBy || 'not noted'}</div>
                          <div style={{ textAlign: 'right' }}>
                            <button className="rv-link" style={{ fontSize: 13, color: '#8A8279' }}
                              onClick={() => setVariations(list => list.filter(x => x.id !== v.id))}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '2px solid ' + INK,
                        display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 600 }}>
                          {money(variations.reduce((a, v) => a + (parseFloat(v.cost) || 0), 0))} in
                          variations across {variations.length}{' '}
                          {variations.length === 1 ? 'change' : 'changes'}
                        </span>
                        {result && (
                          <span style={{ fontSize: 13.5, color: '#8A8279' }}>
                            That is {Math.round((variations.reduce((a, v) => a + (parseFloat(v.cost) || 0), 0)
                              / Math.max(result.contingency, 1)) * 100)}% of your contingency
                          </span>
                        )}
                        <button className="rv-link" style={{ marginLeft: 'auto' }}
                          onClick={() => {
                            const rows = variations.map(v => `<tr><td>${v.date}</td><td>${v.what}</td><td class="r">${money(parseFloat(v.cost) || 0)}</td><td>${v.agreedBy || ''}</td></tr>`).join('')
                            const total = variations.reduce((a, v) => a + (parseFloat(v.cost) || 0), 0)
                            const w = window.open('', '_blank')
                            if (w) {
                              w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Variation log</title><style>body{font-family:Georgia,serif;max-width:760px;margin:0 auto;padding:28px;font-size:13.5px;line-height:1.65}table{width:100%;border-collapse:collapse;margin:14px 0}th,td{text-align:left;padding:8px 6px;border-bottom:1px solid #ddd}th{border-bottom:2px solid #333}.r{text-align:right}</style></head><body><h1>Variation log</h1><p>Changes to the agreed scope, recorded as they happened.</p><table><thead><tr><th>Date</th><th>What changed</th><th class="r">Agreed cost</th><th>Agreed with</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><th colspan="2">Total</th><th class="r">${money(total)}</th><th></th></tr></tfoot></table></body></html>`)
                              w.document.close()
                            }
                          }}>Print the log</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quote comparison */}
                <div className="rv-card" style={{ padding: '24px 28px', marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Compare the quotes</div>
                  <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7,
                    margin: '0 0 18px', maxWidth: 660 }}>
                    Tick what each builder has actually included. A lower total that leaves out scaffold,
                    making good and VAT is not a lower total.
                  </p>

                  {quotes.length < 4 && (
                    <button className="rv-link" style={{ marginBottom: 16 }}
                      onClick={() => setQuotes(q => [...q, {
                        id: uid(), builder: '', total: '', includes: {}, vatIncluded: false, notes: '',
                      }])}>Add a quote</button>
                  )}

                  {quotes.map(q => {
                    const inc = Object.values(q.includes).filter(Boolean).length
                    const total = parseFloat(q.total) || 0
                    const trueTotal = q.vatIncluded ? total : total * 1.2
                    return (
                      <div key={q.id} style={{ border: '1px solid #EDE7DD', borderRadius: 8,
                        padding: '18px 20px', marginBottom: 14 }}>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap',
                          alignItems: 'flex-end', marginBottom: 14 }}>
                          <div style={{ flex: '1 1 180px' }}>
                            <label className="rv-label">Builder</label>
                            <input className="rv-in" value={q.builder}
                              onChange={e => setQuotes(list => list.map(x =>
                                x.id === q.id ? { ...x, builder: e.target.value } : x))} />
                          </div>
                          <div style={{ width: 140 }}>
                            <label className="rv-label">Their total</label>
                            <input className="rv-in" type="number" min={0} value={q.total}
                              onChange={e => setQuotes(list => list.map(x =>
                                x.id === q.id ? { ...x, total: e.target.value } : x))} />
                          </div>
                          <label style={{ fontSize: 14, display: 'flex', gap: 8,
                            alignItems: 'center', cursor: 'pointer', paddingBottom: 10 }}>
                            <input type="checkbox" checked={q.vatIncluded}
                              onChange={e => setQuotes(list => list.map(x =>
                                x.id === q.id ? { ...x, vatIncluded: e.target.checked } : x))} />
                            VAT included
                          </label>
                          <button className="rv-link" style={{ color: '#8A8279', paddingBottom: 12 }}
                            onClick={() => setQuotes(list => list.filter(x => x.id !== q.id))}>
                            Remove
                          </button>
                        </div>

                        <div style={{ fontSize: 12, color: '#8A8279', marginBottom: 8 }}>
                          What have they included?
                        </div>
                        <div style={{ display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))',
                          gap: 6, marginBottom: 12 }}>
                          {result && [...result.lines.map(l => l.element.label),
                            ...result.hidden.map(h => h.hidden.label)].map(label => (
                            <label key={label} style={{ fontSize: 13, display: 'flex', gap: 7,
                              alignItems: 'flex-start', cursor: 'pointer' }}>
                              <input type="checkbox" checked={!!q.includes[label]}
                                style={{ marginTop: 2 }}
                                onChange={e => setQuotes(list => list.map(x =>
                                  x.id === q.id
                                    ? { ...x, includes: { ...x.includes, [label]: e.target.checked } }
                                    : x))} />
                              <span>{label}</span>
                            </label>
                          ))}
                        </div>

                        {total > 0 && (
                          <div style={{ fontSize: 14, color: '#57514A', paddingTop: 12,
                            borderTop: '1px solid #F4F0E8', lineHeight: 1.7 }}>
                            {!q.vatIncluded && (
                              <strong style={{ color: '#A13B2A' }}>
                                {money(trueTotal)} once VAT is added.{' '}
                              </strong>
                            )}
                            Covers {inc} of the items you listed.
                            {result && inc > 0 && (
                              <> Against your range of {money(result.allLow)} to {money(result.allHigh)},
                              that is {trueTotal < result.allLow
                                ? 'below the bottom of it, which is worth understanding rather than celebrating'
                                : trueTotal > result.allHigh
                                ? 'above the top of it'
                                : 'inside it'}.</>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {quotes.filter(q => parseFloat(q.total) > 0).length >= 2 && result && (
                    <div style={{ marginTop: 16, padding: '16px 18px', borderRadius: 8,
                      background: 'rgba(176,122,30,0.05)', border: '1px solid rgba(176,122,30,0.22)',
                      fontSize: 14, color: '#57514A', lineHeight: 1.75 }}>
                      {(() => {
                        const withTotals = quotes.filter(q => parseFloat(q.total) > 0)
                          .map(q => ({
                            q,
                            t: q.vatIncluded ? parseFloat(q.total) : parseFloat(q.total) * 1.2,
                            inc: Object.values(q.includes).filter(Boolean).length,
                          }))
                        const cheapest = [...withTotals].sort((a, b) => a.t - b.t)[0]
                        const most = [...withTotals].sort((a, b) => b.inc - a.inc)[0]
                        if (cheapest.q.id === most.q.id) {
                          return <>The lowest quote also covers the most, which is unusual and worth a
                            second look at what they have understood the job to be.</>
                        }
                        return <>
                          <strong>{cheapest.q.builder || 'One quote'}</strong> is the cheapest at{' '}
                          {money(cheapest.t)} but covers {cheapest.inc} items, while{' '}
                          <strong>{most.q.builder || 'another'}</strong> covers {most.inc} at{' '}
                          {money(most.t)}. The gap between them is {money(most.t - cheapest.t)}, and
                          the question is whether the {most.inc - cheapest.inc} extra items would cost
                          you more than that if you had to sort them out yourself later.
                        </>
                      })()}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 670 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 670 }}>
          Cost ranges are indicative figures drawn from published UK guides for 2026, which disagree
          with each other considerably. A kitchen is quoted anywhere between five and eighty five
          thousand pounds across sources depending on what is counted. Treat these as a starting point
          for a conversation rather than an estimate of your job, and get quotes from builders who have
          seen the property. This is not a quotation, a valuation or professional advice. Whether you
          need planning permission, building regulations approval or a party wall award depends on your
          specific property, and those should be confirmed with your council, an approved inspector or a
          surveyor rather than with a calculator.
        </p>
      </div>
    </div>
  )
}
