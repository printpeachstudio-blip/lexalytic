'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'

/** A realistic example, so somebody can see what this does before trusting it with real figures. */
const SAMPLE_PLACEMENTS: Placement[] = [
    { id: 'ex1', candidate: 'J Okafor', client: 'Tandem Logistics', salary: '48000', feePct: '20', startDate: '2026-08-20', scale: 'taper', windowWeeks: '12', invoicePaid: true, leftDate: '' },
    { id: 'ex2', candidate: 'M Patel', client: 'Brightside Care', salary: '34500', feePct: '18', startDate: '2026-07-23', scale: 'taper', windowWeeks: '8', invoicePaid: true, leftDate: '' },
    { id: 'ex3', candidate: 'R Kowalski', client: 'Ashworth Engineering', salary: '62000', feePct: '22', startDate: '2026-09-03', scale: 'flat', windowWeeks: '12', invoicePaid: false, leftDate: '' },
    { id: 'ex4', candidate: 'L Chen', client: 'Tandem Logistics', salary: '41000', feePct: '20', startDate: '2026-08-05', scale: 'taper', windowWeeks: '12', invoicePaid: true, leftDate: '2026-09-06' },
    { id: 'ex5', candidate: 'A Hussain', client: 'Meadowbank Solicitors', salary: '55000', feePct: '25', startDate: '2026-06-30', scale: 'taper', windowWeeks: '12', invoicePaid: true, leftDate: '' },
    { id: 'ex6', candidate: 'T Morrison', client: 'Brightside Care', salary: '29800', feePct: '15', startDate: '2026-05-23', scale: 'flat', windowWeeks: '4', invoicePaid: true, leftDate: '' },
  ]


// Stripe Payment Link for the desk exposure report.
// Success URL must be: https://www.lexalytic.com/tools/rebate-exposure?ref=der-4m7xp2
const STRIPE_LINK = 'https://buy.stripe.com/5kQ5kwep3aeC5fCgkk3AY08'
const REPORT_PRICE = '£29'
const UNLOCK_PARAM = 'der-4m7xp2'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STORAGE_KEY = 'lexalytic.rebate.v1'
const AGENCY_KEY = 'lexalytic.rebate.agency'
const PAID_KEY = 'lexalytic.rebate.paid'

const AMBER = '#C17D2E'
const INK = '#1A1815'

type ScaleKey = 'taper' | 'stepped8' | 'stepped12' | 'flat'

interface ScaleDef {
  key: ScaleKey
  label: string
  note: string
  weeks: number
  factor: (weeksServed: number, windowWeeks: number) => number
}

const SCALES: ScaleDef[] = [
  {
    key: 'taper', label: 'Straight line taper', weeks: 12,
    note: 'Rebate reduces evenly each week across the window. A 12 week window on a £9,000 fee sheds £750 a week.',
    factor: (w, win) => Math.max(0, 1 - w / win),
  },
  {
    key: 'stepped8', label: 'Stepped, 8 weeks', weeks: 8,
    note: '100% to week 2, then 75%, 50%, 25% in pairs of weeks. Common contingency shape.',
    factor: (w) => (w < 2 ? 1 : w < 4 ? 0.75 : w < 6 ? 0.5 : w < 8 ? 0.25 : 0),
  },
  {
    key: 'stepped12', label: 'Stepped, 12 weeks', weeks: 12,
    note: '75% to week 4, 50% to week 8, 25% to week 12. Common on longer guarantees.',
    factor: (w) => (w < 4 ? 0.75 : w < 8 ? 0.5 : w < 12 ? 0.25 : 0),
  },
  {
    key: 'flat', label: 'Full refund then nothing', weeks: 8,
    note: '100% of the fee until the window closes, then zero. Rare but it exists.',
    factor: (w, win) => (w < win ? 1 : 0),
  },
]

interface Placement {
  id: string
  candidate: string
  client: string
  salary: string
  feePct: string
  startDate: string
  scale: ScaleKey
  windowWeeks: string
  invoicePaid: boolean
  leftDate: string
}

interface Agency {
  name: string
  contact: string
}

function money(n: number): string {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}
function money2(n: number): string {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function uid() {
  return Math.random().toString(36).slice(2, 10)
}
function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function weeksSince(dateStr: string): number | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return null
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return Math.floor((t.getTime() - d.getTime()) / (7 * 86400000))
}
function addWeeks(dateStr: string, weeks: number): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return null
  d.setDate(d.getDate() + weeks * 7)
  return d
}
function fmt(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface Row {
  p: Placement
  fee: number
  weeks: number | null
  windowWeeks: number
  scale: ScaleDef
  factor: number
  atRisk: number
  safeOn: Date | null
  daysToSafe: number | null
  status: 'live' | 'safe' | 'left' | 'nostart'
}

function build(p: Placement): Row {
  const salary = parseFloat(p.salary) || 0
  const pct = Math.min(100, Math.max(0, parseFloat(p.feePct) || 0))
  const fee = salary * (pct / 100)
  const scale = SCALES.find(s => s.key === p.scale) || SCALES[0]
  const windowWeeks = parseInt(p.windowWeeks, 10) || scale.weeks
  const weeks = weeksSince(p.startDate)
  const safeOn = addWeeks(p.startDate, windowWeeks)

  let status: Row['status'] = 'live'
  if (!p.startDate) status = 'nostart'
  else if (p.leftDate) status = 'left'
  else if (weeks !== null && weeks >= windowWeeks) status = 'safe'

  let factor = 0
  if (status === 'live' && weeks !== null) factor = scale.factor(weeks, windowWeeks)
  if (status === 'left') {
    const w = weeksSince(p.startDate)
    const leftW = p.leftDate && p.startDate
      ? Math.floor((new Date(p.leftDate + 'T00:00:00').getTime() - new Date(p.startDate + 'T00:00:00').getTime()) / (7 * 86400000))
      : (w ?? 0)
    factor = scale.factor(Math.max(0, leftW), windowWeeks)
  }

  const atRisk = status === 'live' ? fee * factor : status === 'left' ? fee * factor : 0
  const daysToSafe = safeOn && status === 'live'
    ? Math.ceil((safeOn.getTime() - new Date().setHours(0, 0, 0, 0)) / 86400000)
    : null

  return { p, fee, weeks, windowWeeks, scale, factor, atRisk, safeOn, daysToSafe, status }
}

export default function RebateExposure() {
  const [placements, setPlacements] = useState<Placement[]>([])

  const [loaded, setLoaded] = useState(false)
  const [adding, setAdding] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)
  const [agency, setAgency] = useState<Agency>({ name: '', contact: '' })
  const [editingAgency, setEditingAgency] = useState(false)

  const [draft, setDraft] = useState<Partial<Placement>>({
    candidate: '', client: '', salary: '', feePct: '20',
    startDate: '', scale: 'taper', windowWeeks: '12', invoicePaid: true, leftDate: '',
  })

  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setPlacements(JSON.parse(raw))
      const a = localStorage.getItem(AGENCY_KEY)
      if (a) setAgency(JSON.parse(a))
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
    } catch {
      // storage unavailable
    }
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1')
        setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(placements)) } catch { /* ignore */ }
  }, [placements, loaded])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(AGENCY_KEY, JSON.stringify(agency)) } catch { /* ignore */ }
  }, [agency, loaded])

  const rows = useMemo(() => placements.map(build), [placements])

  const totals = useMemo(() => {
    let feeTotal = 0, atRisk = 0, live = 0, safe = 0, unpaidInvoiceRisk = 0
    rows.forEach(r => {
      feeTotal += r.fee
      atRisk += r.atRisk
      if (r.status === 'live') live++
      if (r.status === 'safe') safe++
      if (r.status === 'live' && !r.p.invoicePaid) unpaidInvoiceRisk += r.fee
    })
    return { feeTotal, atRisk, live, safe, unpaidInvoiceRisk }
  }, [rows])

  // Exposure falling away by month
  const runoff = useMemo(() => {
    const buckets: Record<string, number> = {}
    rows.filter(r => r.status === 'live' && r.safeOn).forEach(r => {
      const k = r.safeOn!.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
      buckets[k] = (buckets[k] || 0) + r.atRisk
    })
    return Object.entries(buckets)
  }, [rows])

  const agencyComplete = agency.name.trim().length >= 2

  const addPlacement = () => {
    if (!draft.candidate?.trim() || !draft.salary) return
    const p: Placement = {
      id: uid(),
      candidate: draft.candidate.trim(),
      client: (draft.client || '').trim(),
      salary: draft.salary || '0',
      feePct: draft.feePct || '20',
      startDate: draft.startDate || '',
      scale: (draft.scale as ScaleKey) || 'taper',
      windowWeeks: draft.windowWeeks || '12',
      invoicePaid: draft.invoicePaid !== false,
      leftDate: '',
    }
    setPlacements(prev => [...prev, p])
    setDraft({ candidate: '', client: '', salary: '', feePct: draft.feePct || '20',
      startDate: '', scale: draft.scale || 'taper', windowWeeks: draft.windowWeeks || '12', invoicePaid: true, leftDate: '' })
    setAdding(false)
  }

  const update = (id: string, patch: Partial<Placement>) =>
    setPlacements(p => p.map(x => (x.id === id ? { ...x, ...patch } : x)))
  const remove = (id: string) => setPlacements(p => p.filter(x => x.id !== id))

  const openReport = useCallback(() => {
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const live = rows.filter(r => r.status === 'live').sort((a, b) => b.atRisk - a.atRisk)

    const rowsHtml = live.map(r => `
      <tr>
        <td>${r.p.candidate}</td>
        <td>${r.p.client || '—'}</td>
        <td class="r">${money2(r.fee)}</td>
        <td>${r.weeks ?? 0} of ${r.windowWeeks}</td>
        <td class="r">${Math.round(r.factor * 100)}%</td>
        <td class="r">${money2(r.atRisk)}</td>
        <td>${r.safeOn ? fmt(r.safeOn) : '—'}</td>
      </tr>`).join('')

    // Sort runoff chronologically rather than by insertion
    const runoffSorted = [...runoff].sort((a, b) => {
      const pa = new Date(a[0] + ' 1'), pb = new Date(b[0] + ' 1')
      return pa.getTime() - pb.getTime()
    })
    const peak = runoffSorted.reduce<[string, number] | null>((best, cur) => (!best || cur[1] > best[1] ? cur : best), null)
    const peakShare = peak && totals.atRisk > 0 ? Math.round((peak[1] / totals.atRisk) * 100) : 0
    const runoffHtml = runoffSorted.map(([k, v]) => {
      const share = totals.atRisk > 0 ? Math.round((v / totals.atRisk) * 100) : 0
      const isPeak = peak && k === peak[0] && runoffSorted.length > 1
      return `<tr${isPeak ? ' class="peak"' : ''}><td>${k}${isPeak ? ' <span class="tag">largest</span>' : ''}</td><td class="r">${money2(v)}</td><td class="r">${share}%</td></tr>`
    }).join('')

    const biggest = live.length ? live[0] : null
    const biggestShare = biggest && totals.atRisk > 0 ? Math.round((biggest.atRisk / totals.atRisk) * 100) : 0
    const avgWeeks = live.length ? Math.round(live.reduce((a, r) => a + (r.weeks ?? 0), 0) / live.length) : 0
    const clientCounts: Record<string, number> = {}
    live.forEach(r => { const c = r.p.client || 'Unattributed'; clientCounts[c] = (clientCounts[c] || 0) + 1 })
    const topClient = Object.entries(clientCounts).sort((a, b) => b[1] - a[1])[0]
    const concentrated = topClient && topClient[1] > 1 && live.length > 1

    const readHtml = live.length > 1 ? `
      <h2>What this says</h2>
      <ul class="read">
        ${peak && runoffSorted.length > 1 ? `<li><strong>${peak[0]} is the month that matters.</strong> ${money2(peak[1])} of exposure ends then, ${peakShare}% of the total. Until that date passes, that is the concentration to watch.</li>` : ''}
        ${biggest ? `<li><strong>${biggest.p.candidate} carries ${biggestShare}% of the exposure on their own</strong> at ${money2(biggest.atRisk)}. ${biggestShare >= 40 ? 'That is a single point of failure rather than a spread risk.' : 'The book is reasonably spread across placements.'}</li>` : ''}
        ${concentrated ? `<li><strong>${topClient[1]} live placements sit with ${topClient[0]}.</strong> Placements into the same client correlate. A restructure or a change of hiring manager can put several into the window at once rather than one at a time.</li>` : ''}
        <li>Average age across live placements is ${avgWeeks} week${avgWeeks === 1 ? '' : 's'}. ${avgWeeks < 4 ? 'The book is young, so exposure is near its peak and will fall steadily from here.' : 'The book is maturing, so exposure is already well below its peak.'}</li>
        ${totals.unpaidInvoiceRisk > 0 ? `<li>${money2(totals.unpaidInvoiceRisk)} of the above sits behind an unpaid invoice, so the entitlement to a rebate may not have arisen at all.</li>` : ''}
      </ul>` : ''

    const unpaidHtml = totals.unpaidInvoiceRisk > 0 ? `
      <div class="warn">
        <strong>${money2(totals.unpaidInvoiceRisk)} of live placements have an unpaid invoice.</strong>
        Rebate clauses are commonly conditional on the invoice being settled within agreed terms. Where the
        invoice is outstanding, the client may have no contractual entitlement to a rebate at all, but the
        cash is also not yet collected. Both sides of that need watching.
      </div>` : ''

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Desk exposure report</title>
<style>
  @page { margin: 20mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; line-height: 1.55; max-width: 780px; margin: 0 auto; padding: 26px; font-size: 13.5px; }
  h1 { font-size: 23px; margin: 0 0 4px; }
  h2 { font-size: 17px; margin: 30px 0 10px; }
  .sub { color: #666; font-size: 13px; margin: 0 0 26px; }
  .headline { border: 2px solid #111; padding: 20px 24px; margin-bottom: 26px; }
  .big { font-size: 34px; line-height: 1.1; }
  .biglabel { color: #555; font-size: 13px; margin-top: 6px; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0 18px; font-size: 12.5px; }
  th, td { text-align: left; padding: 7px 6px; border-bottom: 1px solid #ddd; }
  th { border-bottom: 2px solid #333; font-weight: 600; }
  .r { text-align: right; }
  .warn { border-left: 3px solid #A13B2A; padding: 12px 16px; margin: 18px 0; background: #faf4f3; }
  .peak td { background: #fdf6ec; font-weight: 600; }
  .tag { font-size: 10.5px; font-weight: 600; color: #8F6318; background: #f5e9d4; padding: 2px 6px; border-radius: 3px; margin-left: 6px; vertical-align: middle; }
  ul.read { padding-left: 20px; margin: 12px 0 18px; }
  ul.read li { margin-bottom: 10px; line-height: 1.6; }
  .note { font-size: 11.5px; color: #666; border-top: 1px solid #ddd; padding-top: 13px; margin-top: 28px; }
  @media print { .noprint { display: none; } }
</style></head>
<body>
  <div class="noprint" style="background:#1A1815;color:#fff;padding:13px 17px;border-radius:8px;margin-bottom:24px;font-family:-apple-system,sans-serif;font-size:13px;">
    Use your browser print dialogue and choose Save as PDF.
  </div>
  <h1>Desk exposure report</h1>

  <p class="sub">${agency.name}${agency.contact ? ' · ' + agency.contact : ''} · Prepared ${today}</p>

  <div class="headline">
    <div class="big">${money2(totals.atRisk)}</div>
    <div class="biglabel">Placement fees currently refundable if every live candidate left today</div>
  </div>

  <p>${totals.live} placement${totals.live === 1 ? ' is' : 's are'} still inside a rebate window, against
  ${money2(totals.feeTotal)} of billed fees on the desk. The figure above is the worst case on today's date
  and falls as each placement ages through its window.</p>

  ${unpaidHtml}

  <h2>Live placements by exposure</h2>
  <table>
    <thead><tr><th>Candidate</th><th>Client</th><th class="r">Fee</th><th>Weeks</th><th class="r">Rebate</th><th class="r">At risk</th><th>Safe from</th></tr></thead>
    <tbody>${rowsHtml || '<tr><td colspan="7">No live placements.</td></tr>'}</tbody>
  </table>

  <h2>When exposure falls away</h2>
  <table>
    <thead><tr><th>Month</th><th class="r">Exposure ending</th><th class="r">Share</th></tr></thead>
    <tbody>${runoffHtml || '<tr><td colspan="3">Nothing scheduled.</td></tr>'}</tbody>
  </table>
  <p>Each figure is the amount that stops being refundable in that month, assuming the placement holds.</p>

  ${readHtml}

  <p class="note">Prepared using the Lexalytic rebate exposure tracker from the placements, fees, start dates
  and rebate structures entered. Rebate terms vary by agreement and some contracts offer replacement rather
  than refund, which changes the commercial effect. Check your own terms of business. This is a management
  estimate, not an accounting provision.</p>
</body></html>`

    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [rows, runoff, totals, agency])

  const loadSample = () => {
    setPlacements(SAMPLE_PLACEMENTS)
  setAgency({ name: 'Fenwick Recruitment', contact: 'Sarah Fenwick' })
  }

  const submitInterest = async () => {
    if (!EMAIL_RE.test(email.trim())) { setSendError('Enter an email address we can reach you on.'); return }
    setSending(true); setSendError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          _subject: `Rebate tracker enquiry - ${placements.length} placements, ${money(totals.atRisk)} at risk`,
          source: 'Rebate exposure tracker',
          placements: placements.length,
          at_risk: money(totals.atRisk),
          billed: money(totals.feeTotal),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setSendError('That did not send. Email hello@lexalytic.com and we will pick it up.')
    } finally { setSending(false) }
  }

  const selectedScale = SCALES.find(s => s.key === (draft.scale as ScaleKey)) || SCALES[0]

  return (
    <div className="tool-page">
      <style>{`
        .e-prow { display: grid; grid-template-columns: 1fr 110px 120px 130px 90px; gap: 14px; align-items: center; }
        @media (max-width: 700px) { .tool-g2, .tool-g3, .e-prow { grid-template-columns: 1fr; gap: 8px; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="tool-wrap" style={{ padding: 20 }}>
          <a href="/" className="tool-serif" style={{ fontSize: 20, letterSpacing: '-0.02em', color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="tool-wrap" style={{ paddingTop: 44 }}>
        <h1 className="tool-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 640 }}>
          How much of your billed revenue could you still be asked to give back?
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 620, margin: '0 0 8px' }}>
          Every permanent placement inside its rebate window is a contingent liability. Individually
          nobody worries about it. Across a desk carrying fifteen live placements it is a number worth
          knowing, particularly if three go at once in the same month.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 620, margin: '0 0 32px' }}>
          Saved in this browser only. Nothing is uploaded and no candidate or client data leaves your machine.
        </p>
        {placements.length === 0 && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={loadSample}>Try it with an example</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>A six placement desk. One candidate has just left inside the rebate window, one started last week and is fully exposed, and two are safely past the window.</span>
          </div>
        )}


        {loaded && placements.length > 0 && (
          <div className="tool-card" style={{ padding: '24px 26px', marginBottom: 22 }}>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <div className="tool-serif" style={{ fontSize: 34, lineHeight: 1, color: totals.atRisk > 0 ? '#A13B2A' : '#3F6B4C' }}>
                  {money(totals.atRisk)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6, maxWidth: 200 }}>
                  Refundable today if every live candidate left
                </div>
              </div>
              <div>
                <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>{money(totals.feeTotal)}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Fees billed</div>
              </div>
              <div>
                <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>{totals.live}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Still in window</div>
              </div>
              <div>
                <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#3F6B4C' }}>{totals.safe}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Now safe</div>
              </div>
            </div>

            {totals.unpaidInvoiceRisk > 0 && (
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F0EBE2', fontSize: 14, lineHeight: 1.7, color: '#8F6318' }}>
                <strong>{money(totals.unpaidInvoiceRisk)}</strong> of live placements have an unpaid invoice.
                Rebate clauses are usually conditional on the invoice being settled within terms, so the client
                may have no entitlement at all while it is outstanding. It also means the cash is not in.
              </div>
            )}

            {runoff.length > 0 && (
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F0EBE2' }}>
                <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 10 }}>Exposure ending by month</div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {runoff.map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{money(v)}</div>
                      <div style={{ fontSize: 12, color: '#8A8279' }}>{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <h2 className="tool-serif" style={{ fontSize: 20, fontWeight: 400, margin: 0 }}>
            {placements.length ? `Placements (${placements.length})` : 'Add your first placement'}
          </h2>
          {!adding && placements.length > 0 && <button className="tool-link" onClick={() => setAdding(true)}>Add another</button>}
        </div>

        {(adding || placements.length === 0) && (
          <div className="tool-card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="tool-g2">
              <div className="tool-field">
                <label className="tool-label">Candidate</label>
                <input className="tool-in" value={draft.candidate || ''} onChange={e => setDraft({ ...draft, candidate: e.target.value })} placeholder="Name or reference" />
              </div>
              <div className="tool-field">
                <label className="tool-label">Client</label>
                <input className="tool-in" value={draft.client || ''} onChange={e => setDraft({ ...draft, client: e.target.value })} placeholder="Hiring company" />
              </div>
            </div>
            <div className="tool-g3">
              <div className="tool-field">
                <label className="tool-label">Salary</label>
                <input className="tool-in" type="number" min={0} inputMode="decimal" value={draft.salary || ''} onChange={e => setDraft({ ...draft, salary: e.target.value })} placeholder="£" />
              </div>
              <div className="tool-field">
                <label className="tool-label">Fee</label>
                <input className="tool-in" type="number" min={0} step="0.5" value={draft.feePct || ''} onChange={e => setDraft({ ...draft, feePct: e.target.value })} placeholder="20" />
                <div className="tool-hint">% of first year base.</div>
              </div>
              <div className="tool-field">
                <label className="tool-label">Start date</label>
                <input className="tool-in" type="date" max={todayStr()} value={draft.startDate || ''}
                  onChange={e => { const v = e.target.value; if (v && v > todayStr()) return; setDraft({ ...draft, startDate: v }) }} />
                <div className="tool-hint">When they actually started.</div>
              </div>
            </div>
            <div className="tool-g2">
              <div className="tool-field">
                <label className="tool-label">Rebate structure</label>
                <select className="tool-sel" value={draft.scale || 'taper'}
                  onChange={e => {
                    const k = e.target.value as ScaleKey
                    const def = SCALES.find(s => s.key === k)!
                    setDraft({ ...draft, scale: k, windowWeeks: String(def.weeks) })
                  }}>
                  {SCALES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
                <div className="tool-hint">{selectedScale.note}</div>
              </div>
              <div className="tool-field">
                <label className="tool-label">Window length</label>
                <input className="tool-in" type="number" min={0} value={draft.windowWeeks || ''} onChange={e => setDraft({ ...draft, windowWeeks: e.target.value })} placeholder="12" />
                <div className="tool-hint">Weeks. Check your terms of business.</div>
              </div>
            </div>
            <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', marginBottom: 16 }}>
              <input type="checkbox" checked={draft.invoicePaid !== false}
                onChange={e => setDraft({ ...draft, invoicePaid: e.target.checked })} />
              Invoice settled within terms
            </label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="tool-btn" onClick={addPlacement} disabled={!draft.candidate?.trim() || !draft.salary}>Add placement</button>
              {placements.length > 0 && <button className="tool-link" style={{ color: '#8A8279' }} onClick={() => setAdding(false)}>Cancel</button>}
            </div>
          </div>
        )}

        {rows.length > 0 && (
          <div className="tool-card" style={{ padding: '8px 24px', marginBottom: 22 }}>
            {rows.map((r, i) => {
              const open = expanded === r.p.id
              return (
                <div key={r.p.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F4F0E8' : 'none' }}>
                  <div className="e-prow" style={{ padding: '15px 0' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{r.p.candidate}</div>
                      <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                        {r.p.client || 'No client set'}
                        {!r.p.invoicePaid && r.status === 'live' && (
                          <span style={{ color: '#8F6318' }}> · invoice unpaid</span>
                        )}
                      </div>
                    </div>
                    <div style={{ fontSize: 14 }}>{money(r.fee)}</div>
                    <div style={{ fontSize: 13, color: '#57514A' }}>
                      {r.status === 'nostart' ? 'No start date'
                        : r.status === 'left' ? 'Left'
                        : `${r.weeks ?? 0} of ${r.windowWeeks} wks`}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600,
                      color: r.status === 'safe' ? '#3F6B4C' : r.atRisk > 0 ? '#A13B2A' : '#8A8279' }}>
                      {r.status === 'safe' ? 'Safe' : r.atRisk > 0 ? money(r.atRisk) + ' at risk' : '—'}
                    </div>
                    <button className="tool-link" style={{ fontSize: 13, textAlign: 'right' }}
                      onClick={() => setExpanded(open ? null : r.p.id)}>
                      {open ? 'Close' : 'Detail'}
                    </button>
                  </div>

                  {open && (
                    <div style={{ padding: '4px 0 18px', fontSize: 14, color: '#57514A', lineHeight: 1.75 }}>
                      <div style={{ marginBottom: 10 }}>
                        {r.scale.label}. {r.scale.note}
                      </div>
                      {r.status === 'live' && r.safeOn && (
                        <div style={{ marginBottom: 10 }}>
                          Currently at {Math.round(r.factor * 100)}% of the {money(r.fee)} fee.
                          Falls out of the window on <strong>{fmt(r.safeOn)}</strong>
                          {r.daysToSafe !== null && r.daysToSafe > 0 ? `, ${r.daysToSafe} days away.` : '.'}
                        </div>
                      )}
                      {r.status === 'safe' && (
                        <div style={{ marginBottom: 10, color: '#3F6B4C' }}>
                          Past the window. No rebate is due on this placement.
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', marginTop: 12 }}>
                        <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                          <input type="checkbox" checked={r.p.invoicePaid}
                            onChange={e => update(r.p.id, { invoicePaid: e.target.checked })} />
                          Invoice settled
                        </label>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <span style={{ fontSize: 14 }}>Left on</span>
                          <input aria-label="Date the candidate left" className="tool-in" type="date" max={todayStr()} style={{ width: 160 }}
                            value={r.p.leftDate}
                            onChange={e => { const v = e.target.value; if (v && v > todayStr()) return; update(r.p.id, { leftDate: v }) }} />
                        </div>
                        <button className="tool-link" style={{ color: '#8A8279', marginLeft: 'auto' }}
                          onClick={() => { if (confirm(`Remove ${r.p.candidate}?`)) remove(r.p.id) }}>Remove</button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Paid report */}
        {placements.length > 0 && (
          <div style={{ marginTop: 26, padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
            <div className="tool-serif" style={{ fontSize: 20, marginBottom: 12, letterSpacing: '-0.01em' }}>
              A number your funder will ask for
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 18px', maxWidth: 560 }}>
              The desk exposure report puts this into a document you can take to a board meeting, an
              accountant, or an invoice finance provider. Total at risk, every live placement ranked by
              exposure, the month each one falls out of its window, and the placements where an unpaid
              invoice complicates the position.
            </p>

            {paid ? (
              (!agencyComplete || editingAgency) ? (
                <div style={{ padding: '20px 22px', borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Your details</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 14 }}>
                    <input aria-label="Agency name" className="tool-in-dark" placeholder="Agency name" value={agency.name}
                      onChange={e => setAgency({ ...agency, name: e.target.value })} />
                    <input aria-label="Prepared by (optional)" className="tool-in-dark" placeholder="Prepared by (optional)" value={agency.contact}
                      onChange={e => setAgency({ ...agency, contact: e.target.value })} />
                  </div>
                  <button className="tool-btn" disabled={!agencyComplete}
                    onClick={() => { setEditingAgency(false); if (agencyComplete) openReport() }}>
                    Save and generate report
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="tool-btn" onClick={openReport}>Generate exposure report</button>
                  <button onClick={() => setEditingAgency(true)}
                    style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                      color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}>
                    Edit agency details
                  </button>
                </div>
              )
            ) : (
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href={STRIPE_LINK} className="tool-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Unlock the report, {REPORT_PRICE}
                </a>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  One payment. Regenerate whenever the desk changes.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Custom build */}
        <div style={{ marginTop: 22, padding: 30, borderRadius: 10, background: '#fff', border: '1px solid #E8E2D8' }}>
          {sent ? (
            <>
              <div className="tool-serif" style={{ fontSize: 19, marginBottom: 8 }}>Thanks, we will be in touch.</div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: 0, maxWidth: 520 }}>
                We will come back within a working day.
              </p>
            </>
          ) : (
            <>
              <div className="tool-serif" style={{ fontSize: 19, marginBottom: 10 }}>
                {placements.length >= 10
                  ? 'This should be coming out of your CRM, not typed in twice.'
                  : 'Typing placements in twice is the wrong answer'}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: '0 0 18px', maxWidth: 560 }}>
                Every placement here already exists in Bullhorn, Vincere, JobAdder or wherever you work.
                We connect to it and build the reporting layer on top: rebate exposure, consultant margin,
                placement to cash, and a forecast that accounts for what might come back. Priced once,
                owned by you, no per seat licence.
              </p>
              {!showForm ? (
                <button className="tool-btn" onClick={() => setShowForm(true)}>Talk about reporting on your CRM</button>
              ) : (
                <div>
                  <input aria-label="Email address" className="tool-in" type="email" placeholder="Email address" style={{ maxWidth: 320, marginBottom: 12 }}
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submitInterest() }} />
                  {sendError && <div style={{ fontSize: 13, color: '#A13B2A', marginBottom: 12 }}>{sendError}</div>}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="tool-btn" onClick={submitInterest} disabled={sending}>
                      {sending ? 'Sending…' : 'Send'}
                    </button>
                    <button className="tool-link" style={{ color: '#8A8279' }} onClick={() => setShowForm(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ padding: 30, borderRadius: 10, background: '#1A1815', color: '#fff', marginTop: 8 }}>

          <div style={{ fontFamily: 'Georgia, serif', fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>

            Every placement carries this for months

          </div>

          <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 580 }}>

            A desk with forty live placements has forty rebate clocks running and no system tracking any of them. There is more on what we build for recruitment agencies, and on turning this from a spreadsheet somebody maintains into something the business owns.

          </p>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>

            <a href="/industries/recruitment" style={{ font: 'inherit', fontSize: 15, fontWeight: 500, borderRadius: 6, padding: '12px 22px', background: '#C17D2E', color: '#fff', textDecoration: 'none', display: 'inline-block' }}>

              What we do for recruitment

            </a>

            <a href="/tools/build-estimator" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Or price up a build</a>

          </div>

        </div>

        

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 640 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>, a UK studio that builds websites,
          custom software and data systems for small businesses. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        

        <p className="tool-disclaimer">

        

          Rebate terms depend entirely on what your terms of business say. The scales here are common patterns, not a description of your contract. Where the client disputes a rebate, the contract wording decides it, so check yours before relying on any figure here.

        

        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 640 }}>
          Rebate terms vary between agencies and between clients. Many agreements offer a replacement
          candidate before any refund is due, which changes the commercial effect considerably. Check your
          own terms of business. This is a management estimate, not an accounting provision.
        </p>
      </div>
    </div>
  )
}
