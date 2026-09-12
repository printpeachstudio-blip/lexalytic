'use client'

import React, { useState, useMemo, useEffect } from 'react'

const STATE_KEY = 'lexalytic.ld.v1'

/** A realistic example, so somebody can see what this does before trusting it with real figures. */
const SAMPLE_SESSIONS = [
    { id: 'ex1', day: 'Tuesday', name: 'Lunch', sales: '410', hours: '14', avgRate: '13.20', covers: '32' },
    { id: 'ex2', day: 'Tuesday', name: 'Evening', sales: '980', hours: '22', avgRate: '13.40', covers: '71' },
    { id: 'ex3', day: 'Wednesday', name: 'Lunch', sales: '385', hours: '14', avgRate: '13.20', covers: '29' },
    { id: 'ex4', day: 'Wednesday', name: 'Evening', sales: '1240', hours: '24', avgRate: '13.40', covers: '88' },
    { id: 'ex5', day: 'Thursday', name: 'Lunch', sales: '520', hours: '15', avgRate: '13.20', covers: '41' },
    { id: 'ex6', day: 'Thursday', name: 'Evening', sales: '1680', hours: '28', avgRate: '13.60', covers: '116' },
    { id: 'ex7', day: 'Friday', name: 'Lunch', sales: '740', hours: '18', avgRate: '13.20', covers: '58' },
    { id: 'ex8', day: 'Friday', name: 'Evening', sales: '2890', hours: '38', avgRate: '13.80', covers: '184' },
    { id: 'ex9', day: 'Saturday', name: 'Lunch', sales: '1120', hours: '22', avgRate: '13.40', covers: '82' },
    { id: 'ex10', day: 'Saturday', name: 'Evening', sales: '3240', hours: '42', avgRate: '13.80', covers: '206' },
    { id: 'ex11', day: 'Sunday', name: 'Lunch', sales: '2410', hours: '34', avgRate: '13.60', covers: '158' },
    { id: 'ex12', day: 'Sunday', name: 'Evening', sales: '620', hours: '18', avgRate: '13.40', covers: '44' },
  ]


const AMBER = '#C17D2E'
const INK = '#1A1815'

// Employer on-costs, England 2026/27
const NI_RATE = 0.15
const NI_THRESHOLD_HOURLY = 2.56   // £5,000 a year over roughly 1,950 hours
const PENSION_RATE = 0.03
const HOLIDAY_UPLIFT = 0.1207      // 28 days on 5.6 weeks, the standard accrual

// National Living and Minimum Wage, April 2026
const NLW = 12.71

interface Session {
  id: string
  day: string
  name: string
  sales: string
  hours: string
  avgRate: string
  covers: string
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function uid() { return Math.random().toString(36).slice(2, 9) }
function money(n: number) { return '£' + Math.round(n).toLocaleString('en-GB') }
function money2(n: number) {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// What an hour actually costs once NI, pension and holiday accrual are in
function trueHourly(rate: number): number {
  const holiday = rate * HOLIDAY_UPLIFT
  const gross = rate + holiday
  const ni = Math.max(0, gross - NI_THRESHOLD_HOURLY) * NI_RATE
  const pension = gross * PENSION_RATE
  return gross + ni + pension
}

interface Row {
  session: Session
  sales: number
  hours: number
  rate: number
  covers: number
  cost: number
  labourPct: number
  contribution: number      // sales at assumed GP less labour
  salesPerHour: number
  costPerCover: number
  verdict: 'strong' | 'ok' | 'thin' | 'negative'
}

export default function LabourDaypart() {
  const [gp, setGp] = useState('68')
  const [fixedWeekly, setFixedWeekly] = useState('3200')
  const [sessions, setSessions] = useState<Session[]>([

    { id: uid(), day: 'Tue', name: 'Lunch', sales: '340', hours: '14', avgRate: '13.20', covers: '22' },
    { id: uid(), day: 'Tue', name: 'Evening', sales: '890', hours: '22', avgRate: '13.20', covers: '48' },
    { id: uid(), day: 'Fri', name: 'Evening', sales: '2650', hours: '38', avgRate: '13.80', covers: '135' },
    { id: uid(), day: 'Sat', name: 'Lunch', sales: '1100', hours: '24', avgRate: '13.50', covers: '62' },
    { id: uid(), day: 'Sun', name: 'Lunch', sales: '2200', hours: '32', avgRate: '13.50', covers: '110' },
  ])

  const gpPct = Math.min(100, Math.max(0, parseFloat(gp) || 0)) / 100
  const fixed = parseFloat(fixedWeekly) || 0

  const add = () => setSessions(s => [...s,
    { id: uid(), day: 'Mon', name: 'Evening', sales: '', hours: '', avgRate: '13.00', covers: '' }])
  const remove = (id: string) => setSessions(s => s.filter(x => x.id !== id))
  const update = (id: string, patch: Partial<Session>) =>
    setSessions(s => s.map(x => (x.id === id ? { ...x, ...patch } : x)))

  const rows = useMemo<Row[]>(() => sessions.map(session => {
    const sales = parseFloat(session.sales) || 0
    const hours = parseFloat(session.hours) || 0
    const rate = parseFloat(session.avgRate) || 0
    const covers = parseFloat(session.covers) || 0

    const cost = trueHourly(rate) * hours
    const labourPct = sales > 0 ? (cost / sales) * 100 : 0
    const contribution = (sales * gpPct) - cost

    let verdict: Row['verdict'] = 'ok'
    if (contribution < 0) verdict = 'negative'
    else if (labourPct > 40) verdict = 'thin'
    else if (labourPct <= 25) verdict = 'strong'

    return {
      session, sales, hours, rate, covers, cost, labourPct, contribution,
      salesPerHour: hours > 0 ? sales / hours : 0,
      costPerCover: covers > 0 ? cost / covers : 0,
      verdict,
    }
  }), [sessions, gpPct])

  const totals = useMemo(() => {
    const active = rows.filter(r => r.sales > 0 && r.hours > 0)
    const sales = active.reduce((s, r) => s + r.sales, 0)
    const cost = active.reduce((s, r) => s + r.cost, 0)
    const contribution = active.reduce((s, r) => s + r.contribution, 0)
    const hours = active.reduce((s, r) => s + r.hours, 0)
    const labourPct = sales > 0 ? (cost / sales) * 100 : 0
    const negative = active.filter(r => r.contribution < 0)
    const thin = active.filter(r => r.verdict === 'thin' && r.contribution >= 0)
    const afterFixed = contribution - fixed
    const worst = [...active].sort((a, b) => a.contribution - b.contribution)[0]
    const best = [...active].sort((a, b) => b.contribution - a.contribution)[0]
    return { sales, cost, contribution, hours, labourPct, negative, thin,
      afterFixed, worst, best, count: active.length,
      annualNegative: negative.reduce((s, r) => s + r.contribution, 0) * 52 }
  }, [rows, fixed])

  // Restore on load, save on change. Same pattern as the other tools.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        if (v.gp !== undefined) setGp(v.gp)
        if (v.fixedWeekly !== undefined) setFixedWeekly(v.fixedWeekly)
        if (v.sessions !== undefined) setSessions(v.sessions)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ gp, fixedWeekly, sessions }))
    } catch { /* ignore */ }
  }, [gp, fixedWeekly, sessions])

  const loadSample = () => {
    setSessions(SAMPLE_SESSIONS)
  setGp('68')
  setFixedWeekly('1850')
  }

  const exampleRate = parseFloat(sessions[0]?.avgRate || '13.20') || 13.2

  return (
    <div className="tool-page">
      <style>{`
        .ld-row { display: grid; grid-template-columns: 0.7fr 1fr 0.9fr 0.7fr 0.9fr 0.7fr 44px;
          gap: 10px; align-items: end; padding: 13px 0; border-bottom: 1px solid #F4F0E8; }
        .ld-head { display: grid; grid-template-columns: 0.7fr 1fr 0.9fr 0.7fr 0.9fr 0.7fr 44px;
          gap: 10px; padding-bottom: 10px; border-bottom: 2px solid #EDE7DD;
          font-size: 12px; color: #8A8279; }
        .ld-res { display: grid; grid-template-columns: 1.2fr 100px 90px 110px 1fr;
          gap: 14px; padding: 13px 0; border-bottom: 1px solid #F7F4EF; align-items: baseline; }
        @media (max-width: 900px) { .ld-row { grid-template-columns: 1fr 1fr; } .ld-head { display: none; } .ld-res { grid-template-columns: 1fr 1fr; gap: 6px; } }
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
          Which sessions actually make you money?
        </h1>
        {sessions.length === 0 && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={loadSample}>Try it with an example</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>A gastropub week, twelve sessions. Friday and Saturday evening carry it, Tuesday and Wednesday lunch cost money to open, and Sunday evening is the one worth looking at.</span>
          </div>
        )}

        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 660, margin: '0 0 8px' }}>
          A publican worked out after six months that his afternoon shift covered its costs and
          contributed nothing, because nobody had put labour spend next to till sales for that
          session. The week looks profitable. Two of the sessions in it are carrying the rest.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 660, margin: '0 0 32px' }}>
          Uses true employment cost including the 15 per cent employer National Insurance, pension and
          holiday accrual, not the hourly rate. Nothing is uploaded.
        </p>

        {/* Setup */}
        <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#57514A', marginBottom: 5 }}>
                Your gross profit
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input className="tool-in" type="number" min={0} style={{ width: 90 }} value={gp}
                  onChange={e => setGp(e.target.value)} />
                <span style={{ fontSize: 14, color: '#8A8279' }}>%</span>
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
                Blended across food and drink
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#57514A', marginBottom: 5 }}>
                Fixed costs a week
              </label>
              <input className="tool-in" type="number" min={0} style={{ width: 130 }} value={fixedWeekly}
                onChange={e => setFixedWeekly(e.target.value)} />
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
                Rent, rates, utilities, salaried staff
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F0EBE2',
            fontSize: 13.5, color: '#57514A', lineHeight: 1.7 }}>
            An hour at {money2(exampleRate)} costs the business{' '}
            <strong>{money2(trueHourly(exampleRate))}</strong> once holiday accrual, employer National
            Insurance and pension are added. That is around{' '}
            {(((trueHourly(exampleRate) / exampleRate) - 1) * 100).toFixed(0)} per cent on top of the
            rate, and it is the number every calculation below uses. The National Living Wage is{' '}
            {money2(NLW)}, which really costs {money2(trueHourly(NLW))}.
          </div>
        </div>

        {/* Sessions */}
        <div className="tool-card" style={{ padding: '20px 26px', marginBottom: 22 }}>
          <div className="ld-head">
            <div>Day</div><div>Session</div><div>Sales</div>
            <div>Staff hours</div><div>Average rate</div><div>Covers</div><div></div>
          </div>

          {sessions.map((s, i) => (
            <div key={s.id} className="ld-row">
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Day</label>
                <select className="tool-sel" value={s.day} onChange={e => update(s.id, { day: e.target.value })}>
                  {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Session</label>
                <input className="tool-in" value={s.name} placeholder="Lunch, evening"
                  onChange={e => update(s.id, { name: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Sales</label>
                <input className="tool-in" type="number" min={0} value={s.sales}
                  onChange={e => update(s.id, { sales: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Hours</label>
                <input className="tool-in" type="number" min={0} step="0.5" value={s.hours}
                  onChange={e => update(s.id, { hours: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Rate</label>
                <input className="tool-in" type="number" min={0} step="0.01" value={s.avgRate}
                  onChange={e => update(s.id, { avgRate: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Covers</label>
                <input className="tool-in" type="number" min={0} value={s.covers}
                  onChange={e => update(s.id, { covers: e.target.value })} />
              </div>
              <div style={{ paddingBottom: 10 }}>
                {sessions.length > 1 && (
                  <button className="tool-link" style={{ color: '#8A8279', fontSize: 13 }}
                    onClick={() => remove(s.id)} aria-label={`Remove row ${i + 1}`}>Remove</button>
                )}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginTop: 16 }}>
            <button className="tool-link" onClick={add}>Add another session</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>
              A typical week is enough. You do not need every session.
            </span>
          </div>
        </div>

        {/* Results */}
        {totals.count > 0 && (
          <>
            <div className="tool-card" style={{ padding: '28px 30px', marginBottom: 20,
              background: totals.negative.length > 0 ? 'rgba(161,59,42,0.04)' : '#fff',
              borderColor: totals.negative.length > 0 ? 'rgba(161,59,42,0.22)' : '#E8E2D8' }}>
              <div style={{ display: 'flex', gap: 38, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingBottom: 22, borderBottom: '2px solid ' + INK, marginBottom: 20 }}>
                <div>
                  <div className="tool-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.5rem)', lineHeight: 1,
                    color: totals.afterFixed >= 0 ? '#3F6B4C' : '#A13B2A' }}>
                    {money(totals.afterFixed)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 7, maxWidth: 190 }}>
                    Left after gross profit, labour and fixed costs
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1,
                    color: totals.labourPct > 35 ? '#A13B2A' : totals.labourPct > 30 ? '#8F6318' : '#3F6B4C' }}>
                    {totals.labourPct.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Labour, typically 30 to 33
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>
                    {money(totals.cost)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                    Real labour cost, {totals.hours} hours
                  </div>
                </div>
                <div>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1,
                    color: totals.negative.length > 0 ? '#A13B2A' : '#C4BDB2' }}>
                    {totals.negative.length}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Sessions losing money</div>
                </div>
              </div>

              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#57514A', maxWidth: 690 }}>
                {totals.negative.length > 0 ? (
                  <>
                    <strong style={{ color: '#A13B2A' }}>
                      {totals.negative.length} session{totals.negative.length === 1 ? '' : 's'} cost
                      more in labour than {totals.negative.length === 1 ? 'it brings' : 'they bring'} in
                      gross profit.
                    </strong>{' '}
                    That is {money(Math.abs(totals.annualNegative))} a year the rest of the week is
                    covering. Closing them is not always the answer, but knowing is.
                  </>
                ) : totals.thin.length > 0 ? (
                  <>
                    Every session contributes, but {totals.thin.length} {totals.thin.length === 1 ? 'is' : 'are'} running
                    labour above 40 per cent of sales. Those are the ones that tip into losing money on a
                    quiet week.
                  </>
                ) : (
                  <>Every session contributes and labour is controlled across the week. That is a better
                  position than most sites are in.</>
                )}
                {totals.best && totals.worst && totals.best.session.id !== totals.worst.session.id && (
                  <>
                    {' '}{totals.best.session.day} {totals.best.session.name.toLowerCase()} contributes{' '}
                    {money(totals.best.contribution)} against {totals.worst.session.day}{' '}
                    {totals.worst.session.name.toLowerCase()} at {money(totals.worst.contribution)}.
                  </>
                )}
              </div>
            </div>

            {/* Per session */}
            <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Session by session</div>
              <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 16, maxWidth: 660, lineHeight: 1.6 }}>
                Contribution is gross profit on the sales less the real cost of the labour. It is what
                that session leaves toward rent and everything else.
              </div>

              {[...rows].filter(r => r.sales > 0).sort((a, b) => a.contribution - b.contribution).map(r => {
                const tone = r.verdict === 'negative' ? '#A13B2A'
                  : r.verdict === 'thin' ? '#8F6318'
                  : r.verdict === 'strong' ? '#3F6B4C' : '#57514A'
                return (
                  <div key={r.session.id} className="ld-res">
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>
                        {r.session.day} {r.session.name.toLowerCase()}
                      </div>
                      <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                        {money(r.sales)} on {r.hours} hours
                        {r.covers > 0 ? `, ${r.covers} covers` : ''}
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: tone }}>
                      {money(r.contribution)}
                      <div style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}>contribution</div>
                    </div>
                    <div style={{ fontSize: 14, color: tone }}>
                      {r.labourPct.toFixed(0)}%
                      <div style={{ fontSize: 12, color: '#8A8279' }}>labour</div>
                    </div>
                    <div style={{ fontSize: 14, color: '#57514A' }}>
                      {money2(r.salesPerHour)}
                      <div style={{ fontSize: 12, color: '#8A8279' }}>sales per hour</div>
                    </div>
                    <div style={{ fontSize: 13.5, color: '#57514A', lineHeight: 1.6 }}>
                      {r.verdict === 'negative'
                        ? 'Losing money. Either fewer hours or a reason to keep it open.'
                        : r.verdict === 'thin'
                        ? 'Covers itself, little more. One quiet week and it does not.'
                        : r.verdict === 'strong'
                        ? 'Carrying the week. Worth protecting.'
                        : 'Contributing normally.'}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* What to do */}
            <div className="tool-card" style={{ padding: '24px 30px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Before you cut anything</div>
              <ul style={{ fontSize: 15, color: '#57514A', lineHeight: 1.9, paddingLeft: 20, margin: 0, maxWidth: 700 }}>
                <li><strong>A quiet session can still be worth running.</strong> Closing Tuesday lunch
                  saves the labour but may cost you the regulars who also come on Friday. Look at whether
                  the same customers appear across sessions before deciding.</li>
                <li><strong>Fixed costs do not go away.</strong> Rent runs whether you open or not, so a
                  session making any contribution at all is better than being shut, unless the staff
                  could be deployed somewhere that earns more.</li>
                <li><strong>Trim hours rather than sessions.</strong> Most weak sessions are overstaffed
                  at the edges. Starting one person an hour later is usually worth more than it sounds
                  and costs nothing in trade.</li>
                <li><strong>Watch the hourly rate creep.</strong> Every rise in the National Living Wage
                  costs you around 26 per cent more than the headline, once employer National Insurance,
                  pension and holiday accrual are added.</li>
              </ul>
            </div>

            {/* CTA */}
            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
              <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                This is worth knowing before the rota goes up
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 580 }}>
                Doing it after the fact tells you what happened. Doing it on Monday, against forecast
                sales, tells you what to change while you still can. We are building something that does
                the second one.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="/margin-manager" className="tool-btn"
                  style={{ textDecoration: 'none', display: 'inline-block' }}>
                  See Margin Manager
                </a>
                <a href="/tools/pub-gp-calculator" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  Or check your GP across the range
                </a>
              </div>
            </div>
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 660 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p className="tool-disclaimer">

          Employment costs use the current National Living Wage, employer National Insurance and minimum pension contribution. Your actual cost depends on age bands, thresholds and any enhanced pension, so your payroll figure will differ a little. The contribution figure is an estimate built on the gross profit you entered.

        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 660 }}>
          True hourly cost adds holiday accrual at 12.07 per cent, employer National Insurance at 15 per
          cent above the threshold, and pension at 3 per cent. It is simplified, and does not account for
          apprentice rates, staff under 21, or anyone earning below the NI threshold across the year.
          Contribution uses your blended gross profit on every session, which will be slightly generous
          for drink-led sessions and slightly harsh for food-led ones.
        </p>
      </div>
    </div>
  )
}
