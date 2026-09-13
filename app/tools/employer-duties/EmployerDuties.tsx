'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { assess, toIcs, fmt, type EmployerInput, type DueItem } from '@/lib/employer-duties'

const STRIPE_LINK = 'https://buy.stripe.com/YOUR_EMP_LINK'
const UNLOCK_PARAM = 'edr-4k9tm2'
const PAID_KEY = 'lexalytic.emp.paid.v1'
const STATE_KEY = 'lexalytic.emp.v1'

const STATUS = {
  overdue: { label: 'Overdue', color: '#A13B2A', bg: 'rgba(161,59,42,0.06)', border: 'rgba(161,59,42,0.22)' },
  now:     { label: 'Due now', color: '#A13B2A', bg: 'rgba(161,59,42,0.04)', border: 'rgba(161,59,42,0.16)' },
  soon:    { label: 'Due soon', color: '#B07A1E', bg: 'rgba(176,122,30,0.06)', border: 'rgba(176,122,30,0.22)' },
  later:   { label: 'Later', color: '#5A6B57', bg: 'rgba(90,107,87,0.05)', border: 'rgba(90,107,87,0.18)' },
  unknown: { label: 'Ongoing', color: '#5A6B57', bg: 'rgba(90,107,87,0.05)', border: 'rgba(90,107,87,0.18)' },
  na:      { label: 'Not you', color: '#8A8279', bg: 'transparent', border: 'rgba(0,0,0,0.08)' },
} as const

interface Staff {
  id: string
  name: string
  started: string
  enrolled: string
  optedOut: string
  note: string
}

const BLANK: EmployerInput = {
  dutiesStart: '', lastReenrolment: '', holidayYearStart: '',
  elRenewal: '', headcount: '', providesBenefits: false, payrollsBenefits: false,
}

const SAMPLE: EmployerInput = {
  dutiesStart: '2019-06-01', lastReenrolment: '2022-06-01',
  holidayYearStart: '2026-01-01', elRenewal: '2026-11-14',
  headcount: '18', providesBenefits: true, payrollsBenefits: false,
}

const SAMPLE_STAFF: Staff[] = [
  { id: 'a', name: 'R Adeyemi', started: '2019-03-11', enrolled: '2019-06-01', optedOut: '2019-06-20', note: 'Opted out at enrolment' },
  { id: 'b', name: 'K Novak', started: '2021-09-06', enrolled: '2021-12-01', optedOut: '', note: '' },
  { id: 'c', name: 'S Duffy', started: '2022-05-03', enrolled: '2022-06-01', optedOut: '2024-02-14', note: 'Opted out later, contributions kept' },
  { id: 'd', name: 'M Farrell', started: '2025-07-21', enrolled: '2025-10-01', optedOut: '', note: '' },
]

function uid() { return Math.random().toString(36).slice(2, 9) }

export default function EmployerDuties() {
  const [input, setInput] = useState<EmployerInput>(BLANK)
  const [paid, setPaid] = useState(false)
  const [staff, setStaff] = useState<Staff[]>([])
  const [company, setCompany] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        if (v.input) setInput(v.input)
        if (v.staff) setStaff(v.staff)
        if (v.company) setCompany(v.company)
      }
      const p = new URLSearchParams(window.location.search)
      if (p.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1'); setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ input, staff, company })) }
    catch { /* ignore */ }
  }, [input, staff, company])

  const items = useMemo(() => assess(input), [input])
  const live = items.filter(i => i.status !== 'na')
  const pressing = live.filter(i => i.status === 'overdue' || i.status === 'now')

  const set = (k: keyof EmployerInput, v: string | boolean) =>
    setInput(s => ({ ...s, [k]: v } as EmployerInput))

  // who needs putting back in at the next re-enrolment
  const reenrolDate = items.find(i => i.duty.key === 'reenrolment')?.due ?? null
  const toReenrol = useMemo(() => {
    if (!reenrolDate) return []
    return staff.filter(s => {
      if (!s.optedOut) return false
      const out = new Date(s.optedOut + 'T00:00:00')
      if (isNaN(out.getTime())) return false
      // opted out more than 12 months before the re-enrolment date
      const cutoff = new Date(reenrolDate)
      cutoff.setFullYear(cutoff.getFullYear() - 1)
      return out < cutoff
    })
  }, [staff, reenrolDate])

  const downloadIcs = useCallback(() => {
    const blob = new Blob([toIcs(items)], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employer-duties.ics'
    a.click()
    URL.revokeObjectURL(url)
  }, [items])

  const openRecord = useCallback(() => {
    const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const dutyRows = live.map(i => `<tr>
      <td>${i.duty.label}</td>
      <td>${i.due ? fmt(i.due) : 'Ongoing'}</td>
      <td>${i.because}</td>
      <td class="q">${i.duty.missed}</td></tr>`).join('')
    const staffRows = staff.map(s => `<tr>
      <td>${s.name}</td><td>${s.started ? fmt(new Date(s.started + 'T00:00:00')) : ''}</td>
      <td>${s.enrolled ? fmt(new Date(s.enrolled + 'T00:00:00')) : ''}</td>
      <td>${s.optedOut ? fmt(new Date(s.optedOut + 'T00:00:00')) : 'In the scheme'}</td>
      <td>${toReenrol.some(x => x.id === s.id) ? 'Re-enrol at the next date' : ''}</td></tr>`).join('')

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Employer duties record</title>
<style>@page{margin:18mm}body{font-family:Georgia,'Times New Roman',serif;max-width:880px;margin:0 auto;padding:26px;font-size:12.5px;line-height:1.65;color:#111}
h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:26px 0 9px}.sub{color:#666;font-size:12px;margin:0 0 22px}
table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:11.5px}
th,td{text-align:left;padding:6px 5px;border-bottom:1px solid #ddd;vertical-align:top}
th{border-bottom:2px solid #333}.q{color:#666;font-size:10.5px}
.note{font-size:11px;color:#666;border-top:1px solid #ddd;padding-top:11px;margin-top:24px}
@media print{.noprint{display:none}}</style></head><body>
<div class="noprint" style="background:#1A1815;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:22px;font-family:sans-serif;font-size:13px">
Print and choose Save as PDF. Auto enrolment records have to be kept for six years and opt-out notices for four, so this is worth filing rather than reading once.</div>
<h1>Employer duties record</h1>
<p class="sub">${company || ''}${company ? ' &middot; ' : ''}Prepared ${now}${input.headcount ? ' &middot; ' + input.headcount + ' staff' : ''}</p>
<h2>What falls due and when</h2>
<table><thead><tr><th>Duty</th><th>Next due</th><th>Worked out from</th><th>If missed</th></tr></thead><tbody>${dutyRows}</tbody></table>
${staff.length ? `<h2>Pension position by person</h2>
<table><thead><tr><th>Name</th><th>Started</th><th>Enrolled</th><th>Opted out</th><th>At next re-enrolment</th></tr></thead><tbody>${staffRows}</tbody></table>
<p>Anyone who opted out more than twelve months before the re-enrolment date has to be put back in, whether or not they intend to stay. They can opt out again immediately, and most do, but the duty is to enrol them first.</p>` : ''}
<p class="note">Produced with the free employer duties checker at lexalytic.com. It applies published deadlines to the dates entered. It does not decide whether a particular duty applies to your circumstances, and it is not advice. The Pensions Regulator, ACAS and gov.uk all publish the underlying guidance free of charge, and payroll or employment advice on anything unusual is worth taking.</p>
</body></html>`
    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [live, staff, company, input, toReenrol])

  const hasAnything = input.dutiesStart || input.holidayYearStart || input.elRenewal

  return (
    <div className="tool-page">
      <div className="tool-top">
        <div className="tool-wrap" style={{ padding: 20 }}>
          <a href="/" className="tool-brand">Lex<span>alytic</span></a>
        </div>
      </div>

      <div className="tool-wrap" style={{ paddingTop: 44 }}>
        <h1 className="tool-h1">
          Auto enrolment was not a one-off. It comes back every three years.
        </h1>
        <p className="tool-lede">
          Most small employers did it once, filed the declaration, and moved on. Re-enrolment is a
          standing duty on a three year cycle, and so is the re-declaration, which is due even when
          you have nobody to put back in. It is the duty small employers miss most often, because
          three years is long enough to forget it exists.
        </p>
        <p className="tool-sub">
          That and six other things with published deadlines, worked out from your dates rather than
          left as general advice. Nothing is uploaded.
        </p>

        {!hasAnything && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={() => { setInput(SAMPLE); setStaff(SAMPLE_STAFF) }}>
              Try it with an example
            </button>
            <span style={{ fontSize: 13, color: 'var(--tool-ink-3)' }}>
              An eighteen person business that staged in 2019 and re-enrolled once in 2022.
            </span>
          </div>
        )}

        {/* Inputs */}
        <div className="tool-card" style={{ padding: '24px 26px', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Your dates</div>
          <div style={{ fontSize: 13, color: 'var(--tool-ink-3)', marginBottom: 18, maxWidth: 620, lineHeight: 1.6 }}>
            Fill in what you know. Anything left blank is simply not worked out, rather than assumed.
          </div>

          <div className="tool-g2">
            <div className="tool-field">
              <label className="tool-label">Auto enrolment duties start date</label>
              <input aria-label="Auto enrolment duties start date" className="tool-in" type="date"
                value={input.dutiesStart} onChange={e => set('dutiesStart', e.target.value)} />
              <div className="tool-hint">
                Your staging date, or the day your first member of staff started if later. The Pensions
                Regulator has it on your declaration.
              </div>
            </div>
            <div className="tool-field">
              <label className="tool-label">Last re-enrolment date</label>
              <input aria-label="Last re-enrolment date" className="tool-in" type="date"
                value={input.lastReenrolment} onChange={e => set('lastReenrolment', e.target.value)} />
              <div className="tool-hint">Leave blank if you have never done one.</div>
            </div>
          </div>

          <div className="tool-g3">
            <div className="tool-field">
              <label className="tool-label">Holiday year starts</label>
              <input aria-label="Holiday year start date" className="tool-in" type="date"
                value={input.holidayYearStart} onChange={e => set('holidayYearStart', e.target.value)} />
            </div>
            <div className="tool-field">
              <label className="tool-label">Employers liability renews</label>
              <input aria-label="Employers liability insurance renewal date" className="tool-in" type="date"
                value={input.elRenewal} onChange={e => set('elRenewal', e.target.value)} />
            </div>
            <div className="tool-field">
              <label className="tool-label">How many staff</label>
              <input aria-label="Number of staff" className="tool-in" type="number" min={0}
                value={input.headcount} onChange={e => set('headcount', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginTop: 6 }}>
            <label style={{ fontSize: 14, display: 'flex', gap: 9, alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" checked={input.providesBenefits}
                onChange={e => set('providesBenefits', e.target.checked)} />
              We provide benefits in kind
            </label>
            {input.providesBenefits && (
              <label style={{ fontSize: 14, display: 'flex', gap: 9, alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" checked={input.payrollsBenefits}
                  onChange={e => set('payrollsBenefits', e.target.checked)} />
                and we payroll them
              </label>
            )}
          </div>
        </div>

        {/* Pressing */}
        {pressing.length > 0 && (
          <div className="tool-card" style={{ padding: '24px 28px', marginBottom: 20,
            background: STATUS.overdue.bg, borderColor: STATUS.overdue.border }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
              {pressing.length === 1 ? 'One thing' : `${pressing.length} things`} inside thirty days
            </div>
            {pressing.map(i => (
              <div key={i.duty.key} style={{ fontSize: 15, color: 'var(--tool-ink-2)',
                lineHeight: 1.8, marginBottom: 4 }}>
                <strong>{i.duty.label}</strong>
                {i.due && <>, {fmt(i.due)}{i.daysAway !== null && i.daysAway >= 0
                  ? `, ${i.daysAway} day${i.daysAway === 1 ? '' : 's'} away`
                  : i.daysAway !== null ? `, ${Math.abs(i.daysAway)} days ago` : ''}</>}
              </div>
            ))}
          </div>
        )}

        {/* The list */}
        {items.map(i => {
          const s = STATUS[i.status]
          const open = expanded === i.duty.key
          return (
            <div key={i.duty.key} className="tool-card" style={{ marginBottom: 10, overflow: 'hidden',
              opacity: i.status === 'na' ? 0.6 : 1 }}>
              <button onClick={() => setExpanded(open ? null : i.duty.key)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                  padding: '14px 20px', cursor: 'pointer', display: 'flex', gap: 14,
                  alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="tool-tag" style={{ color: s.color, borderColor: s.border }}>{s.label}</span>
                <span style={{ flex: '1 1 200px', fontSize: 15 }}>{i.duty.label}</span>
                <span style={{ fontSize: 14, color: 'var(--tool-ink-2)' }}>
                  {i.due ? fmt(i.due) : i.status === 'na' ? '' : 'Every new starter'}
                </span>
                <span style={{ fontSize: 13, color: 'var(--tool-amber)' }}>{open ? 'Close' : 'What it is'}</span>
              </button>

              {open && (
                <div style={{ padding: '2px 20px 18px', borderTop: '1px solid var(--tool-hairline)' }}>
                  <p style={{ fontSize: 14.5, color: 'var(--tool-ink-2)', lineHeight: 1.8, margin: '14px 0 10px' }}>
                    {i.duty.what}
                  </p>
                  {i.windowOpens && i.windowCloses && (
                    <p style={{ fontSize: 14, color: 'var(--tool-ink-2)', lineHeight: 1.75, margin: '0 0 10px' }}>
                      You can choose any date between <strong>{fmt(i.windowOpens)}</strong> and{' '}
                      <strong>{fmt(i.windowCloses)}</strong>. The re-declaration deadline runs from the
                      anniversary regardless of which you pick, so choosing a later date does not buy
                      you more time for the paperwork.
                    </p>
                  )}
                  {i.duty.note && (
                    <p style={{ fontSize: 14, color: 'var(--tool-ink-2)', lineHeight: 1.75, margin: '0 0 10px' }}>
                      {i.duty.note}
                    </p>
                  )}
                  <p style={{ fontSize: 13.5, color: 'var(--tool-ink-3)', lineHeight: 1.7, margin: '0 0 10px' }}>
                    {i.because}
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--tool-ink-2)', lineHeight: 1.75, margin: 0,
                    paddingTop: 10, borderTop: `1px solid ${s.border}` }}>
                    <strong style={{ color: s.color }}>If it is missed. </strong>{i.duty.missed}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {hasAnything && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginTop: 18 }}>
            <button className="tool-btn tool-btn-quiet" onClick={downloadIcs}>
              Put these in a calendar
            </button>
            <span style={{ fontSize: 13, color: 'var(--tool-ink-3)' }}>
              Downloads a file that imports into Outlook, Google or Apple, with a reminder a month
              before each one.
            </span>
          </div>
        )}

        {/* Paid */}
        {hasAnything && (!paid ? (
          <div className="tool-dark" style={{ marginTop: 24 }}>
            <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
              Knowing the date is the easy half
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 8px', maxWidth: 610 }}>
              When re-enrolment comes round the question is not when, it is who. Anyone who opted out
              more than twelve months before the date has to be put back in, and working out who that
              is means going through opt-out notices from three years ago.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 22px', maxWidth: 610 }}>
              The paid version keeps the staff register, works out who needs re-enrolling at your next
              date, and produces the record. Auto enrolment records have to be kept for six years and
              opt-out notices for four, so somewhere better than an inbox is the point.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href={STRIPE_LINK} className="tool-btn"
                style={{ textDecoration: 'none', display: 'inline-block' }}>Unlock for £29</a>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                One payment. Refundable within fourteen days.
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="tool-card" style={{ padding: '24px 26px', marginTop: 24, marginBottom: 18 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Who is in the scheme</div>
              <p style={{ fontSize: 14, color: 'var(--tool-ink-3)', lineHeight: 1.7,
                margin: '0 0 18px', maxWidth: 650 }}>
                Anyone who opted out more than twelve months before your re-enrolment date has to be put
                back in. They can opt out again the same week, and most do, but the duty is to enrol
                them first.
              </p>

              <div className="tool-field" style={{ maxWidth: 340 }}>
                <label className="tool-label">Company name, for the record</label>
                <input aria-label="Company name" className="tool-in" value={company}
                  onChange={e => setCompany(e.target.value)} />
              </div>

              <div className="emp-add" style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))',
                gap: 12, marginTop: 16, marginBottom: 12 }}>
                <div>
                  <label className="tool-label">Name</label>
                  <input aria-label="Staff name" className="tool-in" name="name" placeholder="Surname is enough" />
                </div>
                <div>
                  <label className="tool-label">Started</label>
                  <input aria-label="Start date" className="tool-in" name="started" type="date" />
                </div>
                <div>
                  <label className="tool-label">Enrolled</label>
                  <input aria-label="Date enrolled" className="tool-in" name="enrolled" type="date" />
                </div>
                <div>
                  <label className="tool-label">Opted out</label>
                  <input aria-label="Date opted out" className="tool-in" name="optedOut" type="date" />
                </div>
              </div>
              <button className="tool-btn tool-btn-quiet" onClick={e => {
                const wrap = e.currentTarget.closest('.tool-card')!.querySelector('.emp-add') as HTMLElement
                const get = (n: string) => (wrap.querySelector(`[name=${n}]`) as HTMLInputElement)?.value || ''
                const name = get('name').trim()
                if (!name) return
                setStaff(s => [...s, { id: uid(), name, started: get('started'),
                  enrolled: get('enrolled'), optedOut: get('optedOut'), note: '' }])
                wrap.querySelectorAll('input').forEach((x: any) => { x.value = '' })
              }}>Add someone</button>

              {staff.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  {staff.map(s => {
                    const due = toReenrol.some(x => x.id === s.id)
                    return (
                      <div key={s.id} style={{ display: 'grid',
                        gridTemplateColumns: 'minmax(0, 1fr) 120px 120px minmax(0, 1fr) 70px', gap: 12,
                        padding: '10px 0', borderBottom: '1px solid var(--tool-hairline)',
                        fontSize: 14, alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 500 }}>{s.name}</div>
                        <div style={{ color: 'var(--tool-ink-3)', fontSize: 13 }}>
                          {s.enrolled ? fmt(new Date(s.enrolled + 'T00:00:00')) : ''}
                        </div>
                        <div style={{ color: 'var(--tool-ink-3)', fontSize: 13 }}>
                          {s.optedOut ? fmt(new Date(s.optedOut + 'T00:00:00')) : 'In'}
                        </div>
                        <div style={{ fontSize: 13.5, color: due ? '#A13B2A' : 'var(--tool-ink-3)' }}>
                          {due ? 'Put back in at the next re-enrolment' : s.optedOut ? 'Opted out too recently to re-enrol' : ''}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <button className="tool-link" style={{ fontSize: 13, color: 'var(--tool-ink-3)' }}
                            onClick={() => setStaff(l => l.filter(x => x.id !== s.id))}>Remove</button>
                        </div>
                      </div>
                    )
                  })}
                  {toReenrol.length > 0 && reenrolDate && (
                    <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 6,
                      background: STATUS.soon.bg, border: `1px solid ${STATUS.soon.border}`,
                      fontSize: 14.5, color: 'var(--tool-ink-2)', lineHeight: 1.75 }}>
                      <strong>{toReenrol.length} {toReenrol.length === 1 ? 'person needs' : 'people need'} putting
                      back in</strong> at your re-enrolment date. You must also write to them within six
                      weeks of that date, whether or not they stay in.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="tool-dark">
              <div className="tool-serif" style={{ fontSize: 20, marginBottom: 12 }}>The record</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 20px', maxWidth: 580 }}>
                Every duty with its next date and what it was worked out from, plus the pension position
                per person. Records have to be kept six years and opt-out notices four.
              </p>
              <button className="tool-btn" onClick={openRecord}>Open the record</button>
            </div>
          </>
        ))}

        <p className="tool-foot">
          Built by <a href="/">Lexalytic</a>. See our other <a href="/tools">free tools</a>.
        </p>

        <p className="tool-disclaimer">
          This applies published deadlines to the dates you enter. It does not decide whether a
          particular duty applies to your circumstances, and it is not advice. Thresholds and rates
          change, and some of these have exceptions that depend on facts a calculator cannot see, so
          the position for an unusual case is worth checking. The Pensions Regulator, ACAS and gov.uk
          all publish the underlying guidance free of charge, and your payroll provider will know your
          duties start date if you do not.
        </p>
      </div>
    </div>
  )
}
