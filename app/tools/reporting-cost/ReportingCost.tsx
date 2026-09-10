'use client'

import React, { useState, useMemo, useCallback } from 'react'

const AMBER = '#C17D2E'
const INK = '#1A1815'

// Employer on-costs, England, 2026/27
const NI_RATE = 0.15
const NI_THRESHOLD = 5000
const PENSION_RATE = 0.03
const WEEKS_WORKED = 46.4      // 52 less 28 days statutory holiday
const HOURS_PER_WEEK = 37.5

interface Role {
  id: string
  title: string
  salary: string
  people: string
  hours: string      // hours per occurrence
  perMonth: string   // occurrences per month
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function money(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

// What an hour of someone's time actually costs the business
function trueHourlyCost(salary: number): number {
  const ni = Math.max(0, salary - NI_THRESHOLD) * NI_RATE
  const pension = salary * PENSION_RATE
  return (salary + ni + pension) / (WEEKS_WORKED * HOURS_PER_WEEK)
}

interface RoleResult {
  role: Role
  people: number
  salary: number
  hourly: number
  hoursYear: number
  costYear: number
}

export default function ReportingCost() {
  const [roles, setRoles] = useState<Role[]>([
    { id: uid(), title: 'Finance manager', salary: '52000', people: '1', hours: '6', perMonth: '1' },
    { id: uid(), title: 'Analyst', salary: '34000', people: '2', hours: '4', perMonth: '4' },
  ])
  const [reduction, setReduction] = useState('80')
  const [buildCost, setBuildCost] = useState('5000')

  const addRole = () => setRoles(r => [...r,
    { id: uid(), title: '', salary: '35000', people: '1', hours: '3', perMonth: '4' }])
  const removeRole = (id: string) => setRoles(r => r.filter(x => x.id !== id))
  const update = (id: string, patch: Partial<Role>) =>
    setRoles(r => r.map(x => (x.id === id ? { ...x, ...patch } : x)))

  const results = useMemo<RoleResult[]>(() => roles.map(role => {
    const salary = parseFloat(role.salary) || 0
    const people = parseFloat(role.people) || 0
    const hours = parseFloat(role.hours) || 0
    const perMonth = parseFloat(role.perMonth) || 0
    const hourly = trueHourlyCost(salary)
    const hoursYear = people * hours * perMonth * 12
    return { role, people, salary, hourly, hoursYear, costYear: hoursYear * hourly }
  }), [roles])

  const totals = useMemo(() => {
    const hours = results.reduce((s, r) => s + r.hoursYear, 0)
    const cost = results.reduce((s, r) => s + r.costYear, 0)
    const pct = Math.min(95, Math.max(0, parseFloat(reduction) || 0)) / 100
    const saved = cost * pct
    const savedHours = hours * pct
    const build = parseFloat(buildCost) || 0
    const paybackMonths = saved > 0 ? (build / (saved / 12)) : null
    const weeks = hours / HOURS_PER_WEEK
    return {
      hours, cost, saved, savedHours, build, paybackMonths, weeks,
      remaining: cost - saved,
      threeYear: cost * 3,
      threeYearSaved: saved * 3 - build,
    }
  }, [results, reduction, buildCost])

  // Which role is the expensive one to have doing this
  const worst = useMemo(() => {
    if (results.length < 2) return null
    const sorted = [...results].filter(r => r.costYear > 0).sort((a, b) => b.costYear - a.costYear)
    if (!sorted.length) return null
    const top = sorted[0]
    const share = totals.cost > 0 ? top.costYear / totals.cost : 0
    return share >= 0.4 ? { ...top, share } : null
  }, [results, totals])

  const cheapest = useMemo(() => {
    const withCost = results.filter(r => r.hoursYear > 0)
    if (withCost.length < 2) return null
    const byRate = [...withCost].sort((a, b) => a.hourly - b.hourly)
    const low = byRate[0], high = byRate[byRate.length - 1]
    if (high.hourly / low.hourly < 1.4) return null
    return { low, high, diff: (high.hourly - low.hourly) * high.hoursYear }
  }, [results])

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .rc-wrap { max-width: 900px; margin: 0 auto; padding: 0 20px; }
        .rc-serif { font-family: Georgia, 'Times New Roman', serif; }
        .rc-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .rc-in { font: inherit; font-size: 15px; padding: 9px 12px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; }
        .rc-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .rc-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; }
        .rc-primary { background: ${AMBER}; color: #fff; }
        .rc-primary:hover { background: #A96C25; }
        .rc-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .rc-role { display: grid; grid-template-columns: 1.5fr 1fr 0.7fr 0.7fr 0.8fr 40px;
          gap: 12px; align-items: end; padding: 16px 0; border-bottom: 1px solid #F4F0E8; }
        .rc-role:last-of-type { border-bottom: 0; }
        .rc-head { display: grid; grid-template-columns: 1.5fr 1fr 0.7fr 0.7fr 0.8fr 40px;
          gap: 12px; padding-bottom: 10px; border-bottom: 2px solid #EDE7DD;
          font-size: 12px; color: #8A8279; }
        @media (max-width: 820px) {
          .rc-role { grid-template-columns: 1fr 1fr; }
          .rc-head { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="rc-wrap" style={{ padding: 20 }}>
          <a href="/" className="rc-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="rc-wrap" style={{ paddingTop: 44 }}>
        <h1 className="rc-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 640 }}>
          What is manual reporting actually costing you?
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 640, margin: '0 0 8px' }}>
          Most calculators multiply hours by salary, which understates it by roughly a third. An hour of
          someone's time costs the business their salary plus employer National Insurance plus pension,
          divided across the weeks they actually work rather than all fifty two.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 640, margin: '0 0 32px' }}>
          Add a row per role. Someone on £55,000 doing four hours costs considerably more than someone on
          £28,000 doing the same, and that difference is usually where the problem is.
        </p>

        {/* Roles */}
        <div className="rc-card" style={{ padding: '20px 24px', marginBottom: 22 }}>
          <div className="rc-head">
            <div>Role</div><div>Salary</div><div>People</div><div>Hours each</div><div>Per month</div><div></div>
          </div>

          {roles.map((r, i) => (
            <div key={r.id} className="rc-role">
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Role</label>
                <input className="rc-in" style={{ width: '100%' }} value={r.title}
                  placeholder="Who does it" onChange={e => update(r.id, { title: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Salary</label>
                <input className="rc-in" style={{ width: '100%' }} type="number" value={r.salary}
                  onChange={e => update(r.id, { salary: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>People</label>
                <input className="rc-in" style={{ width: '100%' }} type="number" value={r.people}
                  onChange={e => update(r.id, { people: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Hours</label>
                <input className="rc-in" style={{ width: '100%' }} type="number" step="0.5" value={r.hours}
                  onChange={e => update(r.id, { hours: e.target.value })} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Per month</label>
                <input className="rc-in" style={{ width: '100%' }} type="number" step="0.5" value={r.perMonth}
                  onChange={e => update(r.id, { perMonth: e.target.value })} />
              </div>
              <div>
                {roles.length > 1 && (
                  <button className="rc-link" style={{ color: '#8A8279', fontSize: 13, paddingBottom: 10 }}
                    onClick={() => removeRole(r.id)} aria-label={`Remove row ${i + 1}`}>Remove</button>
                )}
              </div>
            </div>
          ))}

          <button className="rc-link" style={{ marginTop: 16 }} onClick={addRole}>Add another role</button>
        </div>

        {/* Results */}
        {totals.cost > 0 && (
          <>
            <div className="rc-card" style={{ padding: '28px 30px', marginBottom: 22 }}>
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingBottom: 24, borderBottom: '2px solid ' + INK, marginBottom: 22 }}>
                <div>
                  <div className="rc-serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)',
                    lineHeight: 1, color: '#A13B2A' }}>
                    {money(totals.cost)}
                  </div>
                  <div style={{ fontSize: 13, color: '#8A8279', marginTop: 8 }}>A year, on manual reporting</div>
                </div>
                <div>
                  <div className="rc-serif" style={{ fontSize: 26, lineHeight: 1.1, color: '#57514A' }}>
                    {Math.round(totals.hours).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Hours</div>
                </div>
                <div>
                  <div className="rc-serif" style={{ fontSize: 26, lineHeight: 1.1, color: '#57514A' }}>
                    {totals.weeks.toFixed(1)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Working weeks</div>
                </div>
                <div>
                  <div className="rc-serif" style={{ fontSize: 26, lineHeight: 1.1, color: '#57514A' }}>
                    {money(totals.threeYear)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Over three years</div>
                </div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Where it goes</div>
              {results.filter(r => r.hoursYear > 0).sort((a, b) => b.costYear - a.costYear).map(r => (
                <div key={r.role.id} style={{ display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.4fr) 110px 110px 90px', gap: 14,
                  padding: '10px 0', borderBottom: '1px solid #F7F4EF', fontSize: 14, alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 500 }}>
                    {r.role.title || 'Unnamed role'}
                    {r.people > 1 && <span style={{ color: '#8A8279', fontWeight: 400 }}> × {r.people}</span>}
                  </div>
                  <div style={{ color: '#57514A' }}>{money(r.hourly)}/hr</div>
                  <div style={{ color: '#57514A' }}>{Math.round(r.hoursYear)} hrs</div>
                  <div style={{ fontWeight: 600, textAlign: 'right' }}>{money(r.costYear)}</div>
                </div>
              ))}
              <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 12, lineHeight: 1.6 }}>
                Hourly figures include employer National Insurance at {(NI_RATE * 100).toFixed(0)}% above
                £{NI_THRESHOLD.toLocaleString()} and pension at {(PENSION_RATE * 100).toFixed(0)}%, spread
                across {WEEKS_WORKED} working weeks rather than 52.
              </div>
            </div>

            {/* What it says */}
            {(worst || cheapest) && (
              <div className="rc-card" style={{ padding: '24px 30px', marginBottom: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>What that tells you</div>
                <ul style={{ fontSize: 15, color: '#57514A', lineHeight: 1.85, paddingLeft: 20, margin: 0 }}>
                  {worst && (
                    <li>
                      <strong>{worst.role.title || 'One role'}</strong> accounts for{' '}
                      {Math.round(worst.share * 100)}% of the cost on its own, at {money(worst.costYear)}.
                      Worth asking whether that is the right person to be doing it.
                    </li>
                  )}
                  {cheapest && (
                    <li>
                      An hour of <strong>{cheapest.high.role.title || 'the senior role'}</strong> costs{' '}
                      {money(cheapest.high.hourly)} against {money(cheapest.low.hourly)} for{' '}
                      {cheapest.low.role.title || 'the other role'}. Moving that work down would save
                      roughly {money(cheapest.diff)} a year before automating anything.
                    </li>
                  )}
                  <li>
                    {totals.weeks.toFixed(1)} working weeks a year go into this. That is{' '}
                    {totals.weeks >= 40 ? 'most of a full time role' :
                     totals.weeks >= 12 ? 'a quarter of a full time role' :
                     'a meaningful slice of someone\u2019s year'}, spent producing something that already exists in your systems.
                  </li>
                </ul>
              </div>
            )}

            {/* Automation */}
            <div className="rc-card" style={{ padding: '24px 30px', marginBottom: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>If it were automated</div>
              <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.65, margin: '0 0 18px', maxWidth: 600 }}>
                Automation rarely removes all of it. Extraction, joining and formatting go; review,
                judgement and chasing whoever has not submitted their numbers do not. Eighty per cent is a
                realistic assumption for most reporting work. Adjust it if you disagree.
              </p>

              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                <div style={{ minWidth: 150 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>
                    Time removed
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input className="rc-in" type="number" min={0} max={95} value={reduction}
                      onChange={e => setReduction(e.target.value)} style={{ width: 80 }} />
                    <span style={{ fontSize: 14, color: '#8A8279' }}>%</span>
                  </div>
                </div>
                <div style={{ minWidth: 170 }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>
                    Cost to build it
                  </label>
                  <input className="rc-in" type="number" value={buildCost}
                    onChange={e => setBuildCost(e.target.value)} style={{ width: 130 }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end',
                paddingTop: 20, borderTop: '1px solid #F0EBE2' }}>
                <div>
                  <div className="rc-serif" style={{ fontSize: 30, lineHeight: 1, color: '#3F6B4C' }}>
                    {money(totals.saved)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6 }}>Saved a year</div>
                </div>
                <div>
                  <div className="rc-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>
                    {Math.round(totals.savedHours).toLocaleString()}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Hours back</div>
                </div>
                {totals.paybackMonths !== null && isFinite(totals.paybackMonths) && (
                  <div>
                    <div className="rc-serif" style={{ fontSize: 24, lineHeight: 1.1,
                      color: totals.paybackMonths <= 12 ? '#3F6B4C' : '#57514A' }}>
                      {totals.paybackMonths < 1
                        ? 'Under a month'
                        : `${totals.paybackMonths.toFixed(1)} months`}
                    </div>
                    <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>To pay for itself</div>
                  </div>
                )}
                <div>
                  <div className="rc-serif" style={{ fontSize: 24, lineHeight: 1.1,
                    color: totals.threeYearSaved > 0 ? '#3F6B4C' : '#A13B2A' }}>
                    {money(totals.threeYearSaved)}
                  </div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Net over three years</div>
                </div>
              </div>

              {totals.paybackMonths !== null && isFinite(totals.paybackMonths) && (
                <p style={{ fontSize: 14, color: '#57514A', lineHeight: 1.75, marginTop: 20, marginBottom: 0, maxWidth: 620 }}>
                  {totals.paybackMonths <= 6
                    ? 'A payback under six months is the point at which the argument stops being about whether and starts being about when.'
                    : totals.paybackMonths <= 18
                    ? 'Anything under eighteen months is a straightforward case. The cost is one off, the saving is not.'
                    : 'A payback beyond eighteen months is worth questioning. Either the build is scoped larger than it needs to be, or the reporting is not the expensive problem here.'}
                </p>
              )}
            </div>

            {/* CTA */}
            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
              <div className="rc-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                {totals.paybackMonths !== null && totals.paybackMonths <= 18
                  ? 'That is a build worth doing'
                  : 'Worth finding out what it would actually cost'}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 22px', maxWidth: 560 }}>
                The £{(parseFloat(buildCost) || 0).toLocaleString()} above is a placeholder. Our build
                estimator asks five questions about what you actually need and gives you an itemised range,
                with a reason against every line, plus a written brief you can take anywhere.
              </p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="/tools/build-estimator" className="rc-btn rc-primary"
                  style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Price it properly
                </a>
                <a href="/#contact" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  Or book a free scoping call
                </a>
              </div>
            </div>
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 640 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 640 }}>
          Employer National Insurance and pension rates are those applying in England for 2026/27 and are
          simplified. Pension is calculated on full salary rather than qualifying earnings, which slightly
          overstates it for higher earners. This is a management estimate, not a costing exercise.
        </p>
      </div>
    </div>
  )
}
