'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
import {
  assess, deadlineFor, money, fmt, SCHEMES,
  PROTECT_DAYS, CLAIM_WINDOW_YEARS,
  type Tenancy, type Severity,
} from '@/lib/deposit-protection'

const STRIPE_LINK = 'https://buy.stripe.com/6oUdR25Sx5YmcI4c443AY0g'
const UNLOCK_PARAM = 'tdp-6h2nc4'
const PAID_KEY = 'lexalytic.tdp.paid.v1'
const STATE_KEY = 'lexalytic.tdp.v1'

const SEV: Record<Severity, { label: string; color: string; bg: string; border: string }> = {
  breach: { label: 'Breach', color: '#A13B2A', bg: 'rgba(161,59,42,0.06)', border: 'rgba(161,59,42,0.22)' },
  risk:   { label: 'At risk', color: '#B07A1E', bg: 'rgba(176,122,30,0.06)', border: 'rgba(176,122,30,0.22)' },
  check:  { label: 'Check', color: '#5A6B57', bg: 'rgba(90,107,87,0.06)', border: 'rgba(90,107,87,0.2)' },
  clear:  { label: 'Clear', color: '#3F6B4C', bg: 'rgba(63,107,76,0.05)', border: 'rgba(63,107,76,0.2)' },
}

const BLANK: Omit<Tenancy, 'id'> = {
  property: '', tenant: '', deposit: '', annualRent: '',
  received: '', tenancyStart: '', protectedOn: '', scheme: 'dps',
  piServed: '', renewedOn: '', reprotectedOn: '', piReserved: '', ended: '',
}

const SAMPLE: Tenancy[] = [
  { id: 's1', property: '14 Beech Avenue', tenant: 'Okonkwo', deposit: '1150', annualRent: '13800',
    received: '2024-08-12', tenancyStart: '2024-09-01', protectedOn: '2024-08-19', scheme: 'dps',
    piServed: '2024-08-19', renewedOn: '2025-09-01', reprotectedOn: '', piReserved: '', ended: '' },
  { id: 's2', property: '7 Mill Lane', tenant: 'Whitaker', deposit: '1400', annualRent: '15600',
    received: '2023-06-02', tenancyStart: '2023-06-15', protectedOn: '2023-07-21', scheme: 'tds',
    piServed: '2023-07-21', renewedOn: '', reprotectedOn: '', piReserved: '', ended: '2025-06-14' },
  { id: 's3', property: '22 Carlton Street', tenant: 'Bhatt', deposit: '2100', annualRent: '16200',
    received: '2026-02-10', tenancyStart: '2026-03-01', protectedOn: '2026-02-14', scheme: 'mydeposits',
    piServed: '', renewedOn: '', reprotectedOn: '', piReserved: '', ended: '' },
  { id: 's4', property: '5 Oakfield Road', tenant: 'Sallis', deposit: '975', annualRent: '11700',
    received: '2025-11-03', tenancyStart: '2025-11-15', protectedOn: '2025-11-10', scheme: 'dps',
    piServed: '2025-11-10', renewedOn: '', reprotectedOn: '', piReserved: '', ended: '' },
]

/**
 * How the prescribed information was actually served.
 *
 * This is what the argument turns on. The scheme record proves the deposit
 * was protected. Nothing proves the information reached the tenant unless
 * somebody wrote down how it was sent, and six years later the landlord is
 * the one who has to show it.
 */
interface ServiceRecord {
  id: string
  tenancyId: string
  what: string      // prescribed information, deposit certificate, both
  method: string    // handed over, email, post, recorded delivery
  sentOn: string
  sentTo: string
  proof: string     // what evidence exists
}

const SERVED_WHAT = [
  'Prescribed information',
  'Scheme certificate',
  'Both together',
  'Re-served after renewal',
]

const SERVED_HOW = [
  { key: 'hand', label: 'Handed over in person', strength: 'weak',
    note: 'Fine at the time and hard to prove later unless the tenant signed for it.' },
  { key: 'email', label: 'Email', strength: 'ok',
    note: 'Keep the sent item. A read receipt is better but rarely available.' },
  { key: 'post', label: 'Ordinary post', strength: 'weak',
    note: 'No proof of receipt. A certificate of posting from the Post Office costs nothing and helps.' },
  { key: 'recorded', label: 'Recorded or signed for', strength: 'strong',
    note: 'The strongest of the four. Keep the tracking number.' },
  { key: 'portal', label: 'Through the scheme or an agent portal', strength: 'strong',
    note: 'The scheme logs it, which means somebody other than you has the record.' },
]

function uid() { return Math.random().toString(36).slice(2, 9) }
function today() { return new Date().toISOString().slice(0, 10) }

export default function DepositCheck() {
  const [tenancies, setTenancies] = useState<Tenancy[]>([])
  const [draft, setDraft] = useState<Omit<Tenancy, 'id'>>(BLANK)
  const [adding, setAdding] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)
  const [landlord, setLandlord] = useState({ name: '', agent: '' })
  const [serviceLog, setServiceLog] = useState<ServiceRecord[]>([])

  useEffect(() => {
    try {
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        if (v.tenancies) setTenancies(v.tenancies)
        if (v.landlord) setLandlord(v.landlord)
        if (v.serviceLog) setServiceLog(v.serviceLog)
      }
      const p = new URLSearchParams(window.location.search)
      if (p.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1'); setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem(STATE_KEY, JSON.stringify({ tenancies, landlord, serviceLog })) }
    catch { /* ignore */ }
  }, [tenancies, landlord, serviceLog])

  const results = useMemo(() => tenancies.map(t => assess(t)), [tenancies])

  const totals = useMemo(() => {
    const breaches = results.filter(r => r.worst === 'breach')
    const live = breaches.filter(r => r.claimLive)
    return {
      count: results.length,
      breaches: breaches.length,
      liveBreaches: live.length,
      low: live.reduce((n, r) => n + r.exposureLow, 0),
      high: live.reduce((n, r) => n + r.exposureHigh, 0),
      held: results.reduce((n, r) => n + r.deposit, 0),
    }
  }, [results])

  const add = () => {
    if (!draft.property.trim()) return
    setTenancies(t => [...t, { ...draft, id: uid() }])
    setDraft(BLANK)
    setAdding(false)
  }

  const set = (k: keyof typeof BLANK, v: string) => setDraft(d => ({ ...d, [k]: v }))

  // live deadline for something not yet protected
  const pending = useMemo(() => {
    if (!draft.received || draft.protectedOn) return null
    return deadlineFor(draft.received)
  }, [draft.received, draft.protectedOn])

  const openRecord = useCallback(() => {
    const now = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const rows = results.map(r => {
      const t = r.tenancy
      const sch = SCHEMES.find(s => s.key === t.scheme)?.label || t.scheme
      return `<tr>
        <td>${t.property}${t.tenant ? '<br><span class="q">' + t.tenant + '</span>' : ''}</td>
        <td class="r">${money(r.deposit)}</td>
        <td>${fmt(t.received) || '&mdash;'}</td>
        <td>${fmt(t.protectedOn) || '&mdash;'}<br><span class="q">${sch}</span></td>
        <td>${fmt(t.piServed) || '&mdash;'}</td>
        <td>${r.daysToProtect !== null ? r.daysToProtect + ' days' : '&mdash;'}</td>
        <td>${r.worst === 'clear' ? 'Compliant' : r.issues[0].title}</td>
      </tr>`
    }).join('')

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Deposit protection record</title>
<style>@page{margin:16mm;size:landscape}body{font-family:Georgia,'Times New Roman',serif;max-width:1040px;margin:0 auto;padding:26px;font-size:12.5px;line-height:1.6;color:#111}
h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:26px 0 9px}.sub{color:#666;font-size:12px;margin:0 0 22px}
table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:11.5px}
th,td{text-align:left;padding:6px 5px;border-bottom:1px solid #ddd;vertical-align:top}
th{border-bottom:2px solid #333}.r{text-align:right}.q{color:#666;font-size:10.5px}
.note{font-size:11px;color:#666;border-top:1px solid #ddd;padding-top:11px;margin-top:24px}
@media print{.noprint{display:none}}</style></head><body>
<div class="noprint" style="background:#1A1815;color:#fff;padding:12px 16px;border-radius:8px;margin-bottom:22px;font-family:sans-serif;font-size:13px">
Print and choose Save as PDF. Keep it with the scheme certificates. A claim can be brought up to ${CLAIM_WINDOW_YEARS} years after a tenancy ends, so this is worth keeping longer than it feels necessary.</div>
<h1>Deposit protection record</h1>
<p class="sub">${landlord.name || ''}${landlord.agent ? ' &middot; managed by ' + landlord.agent : ''}${landlord.name || landlord.agent ? ' &middot; ' : ''}Prepared ${now} &middot; ${results.length} tenanc${results.length === 1 ? 'y' : 'ies'}</p>
<table><thead><tr><th>Property</th><th class="r">Deposit</th><th>Received</th><th>Protected</th><th>Information served</th><th>Days taken</th><th>Position</th></tr></thead>
<tbody>${rows}</tbody></table>
${serviceLog.length ? `<h2>How each one was served</h2>
<table><thead><tr><th>Tenancy</th><th>What</th><th>How</th><th>When</th><th>To</th><th>Proof</th></tr></thead><tbody>${
  serviceLog.map(r => {
    const t = tenancies.find(x => x.id === r.tenancyId)
    const how = SERVED_HOW.find(h => h.key === r.method)
    return `<tr><td>${t ? t.property : ''}</td><td>${r.what}</td><td>${how ? how.label : r.method}</td><td>${fmt(r.sentOn)}</td><td>${r.sentTo}</td><td>${r.proof}</td></tr>`
  }).join('')
}</tbody></table>` : ''}
<h2>What this is for</h2>
<p>The burden of showing a deposit was protected in time, and that the prescribed information was served in time, sits with the landlord. A tenant has ${CLAIM_WINDOW_YEARS} years from the end of the tenancy to bring a claim, by which point the scheme emails and the covering letter are usually long gone. This is the dated record of what happened, made while the detail is still available.</p>
<p class="note">Produced with the free deposit protection checker at lexalytic.com. It applies the ${PROTECT_DAYS} day deadline in sections 213 to 215 of the Housing Act 2004 to the dates entered, and the deposit cap in the Tenant Fees Act 2019. It is a way of checking your own records, not legal advice, and whether a particular renewal restarted the clock depends on how that renewal was documented. Shelter and Citizens Advice both advise on this free of charge, and a housing solicitor should look at anything with real money behind it.</p>
<p class="note" style="margin-top:10px">If you are advising on this rather than holding the deposits, the checker is free and works through a whole portfolio at once.</p>
</body></html>`
    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [results, landlord, serviceLog, tenancies])

  return (
    <div className="tool-page">
      <div className="tool-top">
        <div className="tool-wrap" style={{ padding: 20 }}>
          <a href="/" className="tool-brand">Lex<span>alytic</span></a>
        </div>
      </div>

      <div className="tool-wrap" style={{ paddingTop: 44 }}>
        <h1 className="tool-h1">
          The deposit was protected. The prescribed information is the bit people miss.
        </h1>
        <p className="tool-lede">
          Two duties, both with the same thirty day deadline, both carrying the same penalty of one
          to three times the deposit. Protecting the money and never serving the information is a
          breach, and it is the commonest one there is. Solicitors and the deposit schemes both describe it as one of the commonest failures there is.
        </p>
        <p className="tool-sub">
          Since Section 21 was abolished in May 2026, an unprotected deposit prevents a court making a
          possession order under almost every Section 8 ground, and Section 8 is now the only route.
          Whether a missing prescribed information does the same is less settled, so it is worth
          taking advice rather than assuming either way. Enter what you have for each tenancy and this checks
          the dates against the deadline, including the renewals that quietly restart the clock. A tenant has {CLAIM_WINDOW_YEARS} years to claim,
          so tenancies that ended a while ago still count. Nothing is uploaded.
        </p>

        {tenancies.length === 0 && !adding && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={() => setTenancies(SAMPLE)}>
              Try it with an example
            </button>
            <span style={{ fontSize: 13, color: 'var(--tool-ink-3)' }}>
              A four property portfolio. One renewal nobody did anything about, one protected five
              weeks late, one with no prescribed information recorded, one clean.
            </span>
          </div>
        )}

        {/* Summary */}
        {results.length > 0 && (
          <div className="tool-card" style={{ padding: '26px 30px', marginBottom: 20,
            background: totals.liveBreaches ? SEV.breach.bg : '#fff',
            borderColor: totals.liveBreaches ? SEV.breach.border : 'var(--tool-border)' }}>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {totals.liveBreaches > 0 ? (
                <div>
                  <div className="tool-serif" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)',
                    lineHeight: 1.05, color: SEV.breach.color }}>
                    {money(totals.low)} to {money(totals.high)}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--tool-ink-3)', marginTop: 7, maxWidth: 280 }}>
                    the range a court could order across {totals.liveBreaches} tenanc
                    {totals.liveBreaches === 1 ? 'y' : 'ies'} still inside the claim window
                  </div>
                </div>
              ) : (
                <div>
                  <div className="tool-serif" style={{ fontSize: 26, lineHeight: 1.1, color: SEV.clear.color }}>
                    Nothing flagged
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--tool-ink-3)', marginTop: 6 }}>
                    on what you have entered
                  </div>
                </div>
              )}
              <div>
                <div className="tool-serif" style={{ fontSize: 22, lineHeight: 1.1, color: 'var(--tool-ink-2)' }}>
                  {money(totals.held)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--tool-ink-3)', marginTop: 5 }}>
                  held across {totals.count} tenanc{totals.count === 1 ? 'y' : 'ies'}
                </div>
              </div>
              {totals.breaches > totals.liveBreaches && (
                <div>
                  <div className="tool-serif" style={{ fontSize: 22, lineHeight: 1.1, color: 'var(--tool-ink-3)' }}>
                    {totals.breaches - totals.liveBreaches}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--tool-ink-3)', marginTop: 5, maxWidth: 200 }}>
                    breach{totals.breaches - totals.liveBreaches === 1 ? '' : 'es'} too old to be claimed on
                  </div>
                </div>
              )}
              <button className="tool-link" style={{ marginLeft: 'auto' }}
                onClick={() => { setAdding(true); setExpanded(null) }}>
                Add a tenancy
              </button>
            </div>

            {totals.liveBreaches > 0 && (
              <p style={{ fontSize: 14, color: 'var(--tool-ink-2)', lineHeight: 1.75,
                margin: '18px 0 0', paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)', maxWidth: 690 }}>
                The range is wide because the amount is at the court&#39;s discretion. A first breach that
                was put right tends toward the lower end, a deliberate or repeated one toward the upper.
                What moves it is what you did once you knew, which is the argument for knowing now.
              </p>
            )}
          </div>
        )}

        {/* Add form */}
        {(adding || tenancies.length === 0) && (
          <div className="tool-card" style={{ padding: '24px 26px', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>
              {tenancies.length === 0 ? 'Add your first tenancy' : 'Add a tenancy'}
            </div>

            <div className="tool-g2">
              <div className="tool-field">
                <label className="tool-label">Property</label>
                <input aria-label="Property" className="tool-in" value={draft.property}
                  onChange={e => set('property', e.target.value)} placeholder="14 Beech Avenue" />
              </div>
              <div className="tool-field">
                <label className="tool-label">Tenant</label>
                <input aria-label="Tenant" className="tool-in" value={draft.tenant}
                  onChange={e => set('tenant', e.target.value)} placeholder="Surname is enough" />
              </div>
            </div>

            <div className="tool-g2">
              <div className="tool-field">
                <label className="tool-label">Deposit held</label>
                <input aria-label="Deposit held" className="tool-in" type="number" min={0} value={draft.deposit}
                  onChange={e => set('deposit', e.target.value)} placeholder="£" />
              </div>
              <div className="tool-field">
                <label className="tool-label">Annual rent</label>
                <input aria-label="Annual rent" className="tool-in" type="number" min={0} value={draft.annualRent}
                  onChange={e => set('annualRent', e.target.value)} placeholder="£" />
                <div className="tool-hint">
                  Used to check the cap. Five weeks, or six where annual rent is £50,000 or more.
                </div>
              </div>
            </div>

            <div className="tool-g3">
              <div className="tool-field">
                <label className="tool-label">Deposit received</label>
                <input aria-label="Date the deposit was received" className="tool-in" type="date"
                  max={today()} value={draft.received} onChange={e => set('received', e.target.value)} />
                <div className="tool-hint">
                  When the money arrived. This is what the deadline runs from, not the tenancy start.
                </div>
              </div>
              <div className="tool-field">
                <label className="tool-label">Tenancy started</label>
                <input aria-label="Tenancy start date" className="tool-in" type="date"
                  value={draft.tenancyStart} onChange={e => set('tenancyStart', e.target.value)} />
              </div>
              <div className="tool-field">
                <label className="tool-label">Tenancy ended</label>
                <input aria-label="Tenancy end date" className="tool-in" type="date"
                  value={draft.ended} onChange={e => set('ended', e.target.value)} />
                <div className="tool-hint">Leave blank if it is still running.</div>
              </div>
            </div>

            {pending && pending.daysLeft !== null && (
              <div style={{ margin: '4px 0 16px', padding: '13px 16px', borderRadius: 6,
                background: pending.daysLeft < 0 ? SEV.breach.bg : pending.daysLeft <= 7 ? SEV.risk.bg : SEV.clear.bg,
                border: `1px solid ${pending.daysLeft < 0 ? SEV.breach.border : pending.daysLeft <= 7 ? SEV.risk.border : SEV.clear.border}`,
                fontSize: 14, lineHeight: 1.7,
                color: pending.daysLeft < 0 ? SEV.breach.color : pending.daysLeft <= 7 ? SEV.risk.color : SEV.clear.color }}>
                {pending.daysLeft < 0
                  ? `The deadline was ${pending.due!.toLocaleDateString('en-GB')}, ${Math.abs(pending.daysLeft)} days ago.`
                  : `Deadline ${pending.due!.toLocaleDateString('en-GB')}, ${pending.daysLeft} day${pending.daysLeft === 1 ? '' : 's'} left to protect it and serve the information.`}
              </div>
            )}

            <div className="tool-g3">
              <div className="tool-field">
                <label className="tool-label">Scheme</label>
                <select aria-label="Deposit protection scheme" className="tool-sel" value={draft.scheme}
                  onChange={e => set('scheme', e.target.value)}>
                  {SCHEMES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </div>
              <div className="tool-field">
                <label className="tool-label">Date protected</label>
                <input aria-label="Date protected with the scheme" className="tool-in" type="date"
                  max={today()} value={draft.protectedOn} onChange={e => set('protectedOn', e.target.value)} />
              </div>
              <div className="tool-field">
                <label className="tool-label">Information served</label>
                <input aria-label="Date prescribed information served" className="tool-in" type="date"
                  max={today()} value={draft.piServed} onChange={e => set('piServed', e.target.value)} />
                <div className="tool-hint">The separate duty. Leave blank if you did not, or cannot tell.</div>
              </div>
            </div>

            <div style={{ marginTop: 4, marginBottom: 16, padding: '16px 18px', borderRadius: 8,
              border: '1px solid var(--tool-border)', background: 'var(--tool-bg)' }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>If it has been renewed</div>
              <div style={{ fontSize: 12.5, color: 'var(--tool-ink-3)', marginBottom: 12, lineHeight: 1.6 }}>
                A renewal as a new fixed term can mean the deposit counts as received again, which restarts
                both clocks. Whether it does depends on how the renewal was documented, so this flags it
                rather than deciding it.
              </div>
              <div className="tool-g3">
                <div className="tool-field">
                  <label className="tool-label">Renewed on</label>
                  <input aria-label="Renewal date" className="tool-in" type="date" max={today()}
                    value={draft.renewedOn} onChange={e => set('renewedOn', e.target.value)} />
                </div>
                <div className="tool-field">
                  <label className="tool-label">Re-protected</label>
                  <input aria-label="Date re-protected after renewal" className="tool-in" type="date" max={today()}
                    value={draft.reprotectedOn} onChange={e => set('reprotectedOn', e.target.value)} />
                </div>
                <div className="tool-field">
                  <label className="tool-label">Information re-served</label>
                  <input aria-label="Date prescribed information re-served" className="tool-in" type="date" max={today()}
                    value={draft.piReserved} onChange={e => set('piReserved', e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="tool-btn" onClick={add} disabled={!draft.property.trim()}>
                Check this tenancy
              </button>
              {tenancies.length > 0 && (
                <button className="tool-link" onClick={() => { setAdding(false); setDraft(BLANK) }}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {results.map(r => {
          const s = SEV[r.worst]
          const open = expanded === r.tenancy.id
          return (
            <div key={r.tenancy.id} className="tool-card" style={{ marginBottom: 12, overflow: 'hidden' }}>
              <button onClick={() => setExpanded(open ? null : r.tenancy.id)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                  padding: '15px 20px', cursor: 'pointer', display: 'flex', gap: 14,
                  alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="tool-tag" style={{ color: s.color, borderColor: s.border }}>{s.label}</span>
                <span style={{ flex: '1 1 200px', fontSize: 15 }}>
                  {r.tenancy.property}
                  {r.tenancy.tenant && (
                    <span style={{ color: 'var(--tool-ink-3)' }}> · {r.tenancy.tenant}</span>
                  )}
                </span>
                <span style={{ fontSize: 14, color: 'var(--tool-ink-2)' }}>{money(r.deposit)}</span>
                {r.exposureHigh > 0 && (
                  <span style={{ fontSize: 13.5, color: SEV.breach.color }}>
                    up to {money(r.exposureHigh)} at risk
                  </span>
                )}
                {!r.claimLive && r.worst === 'breach' && (
                  <span style={{ fontSize: 13, color: 'var(--tool-ink-3)' }}>claim window closed</span>
                )}
                <span style={{ fontSize: 13, color: 'var(--tool-amber)' }}>{open ? 'Close' : 'Detail'}</span>
              </button>

              {open && (
                <div style={{ padding: '4px 20px 18px', borderTop: '1px solid var(--tool-hairline)' }}>
                  {r.issues.map(i => {
                    const is = SEV[i.severity]
                    return (
                      <div key={i.id} style={{ padding: '16px 18px', borderRadius: 8, marginTop: 14,
                        background: is.bg, border: `1px solid ${is.border}` }}>
                        <div style={{ display: 'flex', gap: 11, alignItems: 'baseline',
                          flexWrap: 'wrap', marginBottom: 7 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: is.color,
                            letterSpacing: '0.04em' }}>{is.label.toUpperCase()}</span>
                          <span style={{ fontSize: 15, fontWeight: 600 }}>{i.title}</span>
                          {i.section && (
                            <span style={{ fontSize: 12, color: 'var(--tool-ink-3)', marginLeft: 'auto' }}>
                              {i.section}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 14.5, color: 'var(--tool-ink-2)', lineHeight: 1.8, margin: '0 0 10px' }}>
                          {i.detail}
                        </p>
                        <p style={{ fontSize: 14, color: 'var(--tool-ink-2)', lineHeight: 1.75, margin: 0,
                          paddingTop: 10, borderTop: `1px solid ${is.border}` }}>
                          <strong style={{ color: is.color }}>What to do. </strong>{i.action}
                        </p>
                      </div>
                    )
                  })}

                  {r.claimExpires && (
                    <div style={{ fontSize: 13.5, color: 'var(--tool-ink-3)', marginTop: 14, lineHeight: 1.7 }}>
                      {r.claimLive
                        ? `A claim on this tenancy can be brought until ${r.claimExpires.toLocaleDateString('en-GB')}.`
                        : `The ${CLAIM_WINDOW_YEARS} year window closed on ${r.claimExpires.toLocaleDateString('en-GB')}, so this one is history rather than exposure.`}
                    </div>
                  )}

                  <button className="tool-link" style={{ marginTop: 14, color: 'var(--tool-ink-3)' }}
                    onClick={() => setTenancies(list => list.filter(x => x.id !== r.tenancy.id))}>
                    Remove this tenancy
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {/* Paid */}
        {results.length > 0 && (!paid ? (
          <div className="tool-dark" style={{ marginTop: 20 }}>
            <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
              In six years you will not remember any of this
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 8px', maxWidth: 610 }}>
              The burden of proving a deposit was protected in time, and that the information was served
              in time, is on the landlord. A claim can arrive six years after a tenancy ends, by which
              point the scheme email and the covering letter are long gone and the tenant only has to
              say they never received anything.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 22px', maxWidth: 610 }}>
              The paid version keeps a service record alongside the dates: what was sent, how, when,
              to whom, and what proof exists. It flags anything served in a way that leaves no trail,
              because that is the gap a tenant aims at. Then it writes the whole portfolio up as one
              document, made now while you can still find the emails.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href={STRIPE_LINK} className="tool-btn"
                style={{ textDecoration: 'none', display: 'inline-block' }}>Unlock for £29</a>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                One payment, any number of properties. Refundable within fourteen days.
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="tool-card" style={{ padding: '24px 26px', marginTop: 20, marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Whose record is this</div>
              <div className="tool-g2">
                <div className="tool-field">
                  <label className="tool-label">Landlord or company</label>
                  <input aria-label="Landlord or company name" className="tool-in" value={landlord.name}
                    onChange={e => setLandlord({ ...landlord, name: e.target.value })} />
                </div>
                <div className="tool-field">
                  <label className="tool-label">Managing agent, if any</label>
                  <input aria-label="Managing agent" className="tool-in" value={landlord.agent}
                    onChange={e => setLandlord({ ...landlord, agent: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="tool-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                How each one was served
              </div>
              <p style={{ fontSize: 14, color: 'var(--tool-ink-3)', lineHeight: 1.7,
                margin: '0 0 18px', maxWidth: 660 }}>
                A tenant rarely argues the deposit was unprotected, because the scheme record settles
                that. What they say is that they never received the prescribed information, and the
                burden of showing otherwise is yours. Record how it went out while you can still
                remember.
              </p>

              <div className="dep-serve" style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))',
                gap: 12, marginBottom: 12 }}>
                <div>
                  <label className="tool-label">Which tenancy</label>
                  <select aria-label="Which tenancy" className="tool-sel" name="tenancyId">
                    {tenancies.map(t => (
                      <option key={t.id} value={t.id}>{t.property}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="tool-label">What was sent</label>
                  <select aria-label="What was sent" className="tool-sel" name="what">
                    {SERVED_WHAT.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div>
                  <label className="tool-label">How</label>
                  <select aria-label="How it was sent" className="tool-sel" name="method">
                    {SERVED_HOW.map(h => <option key={h.key} value={h.key}>{h.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="tool-label">When</label>
                  <input aria-label="Date sent" className="tool-in" name="sentOn" type="date" max={today()} />
                </div>
                <div>
                  <label className="tool-label">To whom</label>
                  <input aria-label="Sent to" className="tool-in" name="sentTo" placeholder="Name or address" />
                </div>
                <div>
                  <label className="tool-label">What proof exists</label>
                  <input aria-label="What proof exists" className="tool-in" name="proof"
                    placeholder="Tracking number, sent folder, signature" />
                </div>
              </div>
              <button className="tool-btn tool-btn-quiet" onClick={e => {
                const wrap = e.currentTarget.closest('.tool-card')!.querySelector('.dep-serve') as HTMLElement
                const get = (n: string) =>
                  (wrap.querySelector(`[name=${n}]`) as HTMLInputElement | HTMLSelectElement)?.value || ''
                if (!get('sentOn')) return
                setServiceLog(l => [...l, {
                  id: uid(), tenancyId: get('tenancyId'), what: get('what'),
                  method: get('method'), sentOn: get('sentOn'),
                  sentTo: get('sentTo'), proof: get('proof'),
                }])
                ;(wrap.querySelector('[name=sentTo]') as HTMLInputElement).value = ''
                ;(wrap.querySelector('[name=proof]') as HTMLInputElement).value = ''
              }}>Add to the record</button>

              {serviceLog.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  {serviceLog.map(r => {
                    const t = tenancies.find(x => x.id === r.tenancyId)
                    const how = SERVED_HOW.find(h => h.key === r.method)
                    return (
                      <div key={r.id} style={{ padding: '12px 0',
                        borderBottom: '1px solid var(--tool-hairline)' }}>
                        <div style={{ display: 'grid',
                          gridTemplateColumns: 'minmax(0, 1fr) 150px 150px 70px', gap: 12,
                          fontSize: 14, alignItems: 'baseline' }}>
                          <div>
                            <strong>{r.what}</strong>
                            {t && <span style={{ color: 'var(--tool-ink-3)' }}> · {t.property}</span>}
                          </div>
                          <div style={{ fontSize: 13.5 }}>{how?.label}</div>
                          <div style={{ fontSize: 13.5, color: 'var(--tool-ink-3)' }}>{fmt(r.sentOn)}</div>
                          <div style={{ textAlign: 'right' }}>
                            <button className="tool-link" style={{ fontSize: 13, color: 'var(--tool-ink-3)' }}
                              onClick={() => setServiceLog(l => l.filter(x => x.id !== r.id))}>
                              Remove
                            </button>
                          </div>
                        </div>
                        {how && how.strength !== 'strong' && (
                          <div style={{ fontSize: 12.5, color: '#8F6318', marginTop: 5, lineHeight: 1.6 }}>
                            {how.note}
                          </div>
                        )}
                        {r.proof && (
                          <div style={{ fontSize: 12.5, color: 'var(--tool-ink-3)', marginTop: 4 }}>
                            Proof: {r.proof}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {(() => {
                    const weak = serviceLog.filter(r =>
                      SERVED_HOW.find(h => h.key === r.method)?.strength === 'weak')
                    if (!weak.length) return null
                    return (
                      <div style={{ marginTop: 16, padding: '13px 16px', borderRadius: 6,
                        background: SEV.risk.bg, border: `1px solid ${SEV.risk.border}`,
                        fontSize: 14, color: SEV.risk.color, lineHeight: 1.7 }}>
                        {weak.length} {weak.length === 1 ? 'was' : 'were'} served in a way that leaves
                        no proof of receipt. That is not a breach, and it is the gap a tenant would aim
                        at. Where the tenancy is still running, re-serving by a method that leaves a
                        trail costs nothing and closes it.
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            <div className="tool-dark">
              <div className="tool-serif" style={{ fontSize: 20, marginBottom: 12 }}>
                The record
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, margin: '0 0 20px', maxWidth: 580 }}>
                Every tenancy with its dates, how long the protection took, and where each one stands.
                Print it, keep it with the scheme certificates, and add to it as tenancies change.
              </p>
              <button className="tool-btn" onClick={openRecord}>Open the record</button>
            </div>
          </>
        ))}

        <p className="tool-foot">
          Built by <a href="/">Lexalytic</a>. If you let HMOs, the{' '}
          <a href="/tools/hmo-compliance-tracker">compliance tracker</a> handles certificate renewals,
          and the <a href="/tools/hmo-licence-checker">licence checker</a> works out whether a property
          needs one. See all our <a href="/tools">free tools</a>.
        </p>

        <p className="tool-disclaimer">
          This covers England and Wales and applies the thirty day deadline in sections 213 to 215 of the
          Housing Act 2004, together with the deposit cap in the Tenant Fees Act 2019. Scotland and
          Northern Ireland have their own schemes and their own deadlines. It checks the dates you enter
          against a published rule, which is not the same as advice on your position: whether a renewal
          restarted the clock depends on how that renewal was documented, and the penalty a court orders
          is at its discretion within the one to three times range. Shelter and Citizens Advice both
          advise free of charge, and anything with real money behind it is worth putting in front of a
          housing solicitor.
        </p>
      </div>
    </div>
  )
}
