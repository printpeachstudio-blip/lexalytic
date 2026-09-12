'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'

/** A realistic example, so somebody can see what this does before trusting it with real figures. */
const SAMPLE_JOBS = [
    { id: 'ex1', ref: 'BE-0417', contractor: 'Kier Construction', contractValue: '184000', certified: '184000', retentionPct: '5', capPct: '', pcDate: '2025-07-29', defectsMonths: '12', firstReleased: true, finalReleased: false },
    { id: 'ex2', ref: 'BE-0432', contractor: 'Morgan Sindall', contractValue: '96500', certified: '82000', retentionPct: '3', capPct: '', pcDate: '', defectsMonths: '12', firstReleased: false, finalReleased: false },
    { id: 'ex3', ref: 'BE-0398', contractor: 'Willmott Dixon', contractValue: '142000', certified: '142000', retentionPct: '5', capPct: '', pcDate: '2026-06-09', defectsMonths: '6', firstReleased: false, finalReleased: false },
    { id: 'ex4', ref: 'BE-0441', contractor: 'Galliford Try', contractValue: '58200', certified: '58200', retentionPct: '5', capPct: '', pcDate: '2025-04-10', defectsMonths: '12', firstReleased: true, finalReleased: true },
  ]


// Stripe Payment Link. Its success URL must match UNLOCK_PARAM below:
// https://www.lexalytic.com/tools/retention-tracker?ref=rrp-8k2vq9
const STRIPE_LINK = 'https://buy.stripe.com/7sY28k4OtfyW37u7NO3AY07'
const PACK_PRICE = '£19'
const UNLOCK_PARAM = 'rrp-8k2vq9'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STORAGE_KEY = 'lexalytic.retention.v1'
const SENDER_KEY = 'lexalytic.retention.sender'
const PAID_KEY = 'lexalytic.retention.paid'

// Statutory interest = Bank of England base rate + 8%
// Rate lives in lib/rates.ts so there is one place to change it
const BOE_BASE = 3.75  // keep in step with lib/rates.ts
const STAT_RATE = BOE_BASE + 8

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Sender {
  company: string
  address: string
  contact: string
  email: string
  phone: string
}

interface Job {
  id: string
  ref: string
  contractor: string
  contractValue: string
  certified: string
  retentionPct: string
  capPct: string
  // Optional stepped retention. Empty means the flat rate applies.
  tiers?: { upTo: string; pct: string }[]
  pcDate: string
  defectsMonths: string
  firstReleased: boolean
  finalReleased: boolean
}

function money(n: number): string {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function addMonths(dateStr: string, months: number): Date | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return null
  const out = new Date(d)
  out.setMonth(out.getMonth() + months)
  return out
}

function daysUntil(d: Date): number {
  const t = new Date()
  t.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - t.getTime()) / 86400000)
}

function fmt(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function icsDate(d: Date): string {
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(d.getUTCDate()).padStart(2, '0')}`
}

interface Computed {
  job: Job
  contract: number
  certified: number
  retPct: number
  capPct: number
  held: number
  capAmount: number
  capReached: boolean
  overDeducted: number
  firstAmount: number
  finalAmount: number
  firstDue: Date | null
  finalDue: Date | null
  firstDays: number | null
  finalDays: number | null
  outstanding: number
}


/**
 * Retention under a stepped structure. Each tier applies its rate only to
 * the slice of certified value inside it, the way tax bands work. A blank
 * threshold on the last tier means it runs to the top.
 */
function tieredRetention(
  certified: number,
  tiers: { upTo: string; pct: string }[]
): { held: number; breakdown: { from: number; to: number; pct: number; amount: number }[] } {
  const clean = tiers
    .map(t => ({
      upTo: String(t.upTo).trim() === '' ? Infinity : (parseFloat(t.upTo) || 0),
      pct: Math.min(100, Math.max(0, parseFloat(t.pct) || 0)),
    }))
    .sort((a, b) => a.upTo - b.upTo)

  let held = 0
  let floor = 0
  const breakdown: { from: number; to: number; pct: number; amount: number }[] = []

  for (const tier of clean) {
    if (certified <= floor) break
    const ceiling = Math.min(certified, tier.upTo)
    const slice = Math.max(0, ceiling - floor)
    if (slice > 0) {
      const amount = slice * (tier.pct / 100)
      held += amount
      breakdown.push({ from: floor, to: ceiling, pct: tier.pct, amount })
    }
    if (tier.upTo === Infinity) break
    floor = tier.upTo
  }

  return { held, breakdown }
}


function compute(job: Job): Computed {
  const contract = parseFloat(job.contractValue) || 0
  const certified = parseFloat(job.certified) || 0
  const retPct = Math.min(100, Math.max(0, parseFloat(job.retentionPct) || 0))
  const capPct = Math.min(100, Math.max(0, parseFloat(job.capPct) || 0))
  const defects = parseInt(job.defectsMonths, 10) || 12

  const activeTiers = (job.tiers || []).filter(t => String(t.pct).trim() !== '')
  const rawHeld = activeTiers.length
    ? tieredRetention(certified, activeTiers).held
    : certified * (retPct / 100)
  const capAmount = capPct > 0 ? contract * (capPct / 100) : Infinity
  const held = Math.min(rawHeld, capAmount)
  const capReached = capPct > 0 && rawHeld >= capAmount
  const overDeducted = capPct > 0 && rawHeld > capAmount ? rawHeld - capAmount : 0

  const firstAmount = held / 2
  const finalAmount = held / 2

  const firstDue = job.pcDate ? new Date(job.pcDate + 'T00:00:00') : null
  const finalDue = job.pcDate ? addMonths(job.pcDate, defects) : null

  let outstanding = 0
  if (!job.firstReleased) outstanding += firstAmount
  if (!job.finalReleased) outstanding += finalAmount

  return {
    job, contract, certified, retPct, capPct, held, capAmount, capReached, overDeducted,
    firstAmount, finalAmount, firstDue, finalDue,
    firstDays: firstDue ? daysUntil(firstDue) : null,
    finalDays: finalDue ? daysUntil(finalDue) : null,
    outstanding,
  }
}

function interestOn(amount: number, daysOverdue: number): number {
  if (daysOverdue <= 0) return 0
  return amount * (STAT_RATE / 100) * (daysOverdue / 365)
}

export default function RetentionTracker() {
  const [jobs, setJobs] = useState<Job[]>([])

  const [loaded, setLoaded] = useState(false)
  const [adding, setAdding] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)
  const [sender, setSender] = useState<Sender>({ company: '', address: '', contact: '', email: '', phone: '' })
  const [editingSender, setEditingSender] = useState(false)

  const [draft, setDraft] = useState<Partial<Job>>({
    ref: '', contractor: '', contractValue: '', certified: '',
    retentionPct: '5', capPct: '5', tiers: [], pcDate: '', defectsMonths: '12',
  })

  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setJobs(JSON.parse(raw))
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const sraw = localStorage.getItem(SENDER_KEY)
      if (sraw) setSender(JSON.parse(sraw))
    } catch {
      // storage blocked, continue clean
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
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch {
      // ignore
    }
  }, [jobs, loaded])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(SENDER_KEY, JSON.stringify(sender))
    } catch {
      // ignore
    }
  }, [sender, loaded])

  const senderComplete = Boolean(sender.company.trim() && sender.address.trim())

  const computed = useMemo(() => jobs.map(compute), [jobs])

  const totals = useMemo(() => {
    let held = 0, outstanding = 0, releasableNow = 0, overdue = 0, overdueInterest = 0
    computed.forEach(c => {
      held += c.held
      outstanding += c.outstanding
      if (!c.job.firstReleased && c.firstDays !== null && c.firstDays <= 0) {
        releasableNow += c.firstAmount
        if (c.firstDays < 0) {
          overdue += c.firstAmount
          overdueInterest += interestOn(c.firstAmount, Math.abs(c.firstDays))
        }
      }
      if (!c.job.finalReleased && c.finalDays !== null && c.finalDays <= 0) {
        releasableNow += c.finalAmount
        if (c.finalDays < 0) {
          overdue += c.finalAmount
          overdueInterest += interestOn(c.finalAmount, Math.abs(c.finalDays))
        }
      }
    })
    return { held, outstanding, releasableNow, overdue, overdueInterest }
  }, [computed])

  const overdueItems = useMemo(() => {
    const items: { c: Computed; stage: string; amount: number; due: Date; days: number; interest: number }[] = []
    computed.forEach(c => {
      if (!c.job.firstReleased && c.firstDue && c.firstDays !== null && c.firstDays < 0) {
        items.push({ c, stage: 'First release (practical completion)', amount: c.firstAmount, due: c.firstDue, days: Math.abs(c.firstDays), interest: interestOn(c.firstAmount, Math.abs(c.firstDays)) })
      }
      if (!c.job.finalReleased && c.finalDue && c.finalDays !== null && c.finalDays < 0) {
        items.push({ c, stage: 'Final release (end of defects period)', amount: c.finalAmount, due: c.finalDue, days: Math.abs(c.finalDays), interest: interestOn(c.finalAmount, Math.abs(c.finalDays)) })
      }
    })
    return items.sort((a, b) => b.days - a.days)
  }, [computed])

  const addJob = () => {
    if (!draft.ref?.trim() || !draft.contractValue) return
    const j: Job = {
      id: uid(),
      ref: draft.ref.trim(),
      contractor: (draft.contractor || '').trim(),
      contractValue: draft.contractValue || '0',
      certified: draft.certified || '0',
      retentionPct: draft.retentionPct || '5',
      capPct: draft.capPct || '5',
      tiers: draft.tiers && draft.tiers.length ? draft.tiers : [],
      pcDate: draft.pcDate || '',
      defectsMonths: draft.defectsMonths || '12',
      firstReleased: false,
      finalReleased: false,
    }
    setJobs(p => [...p, j])
    setExpanded(j.id)
    setDraft({ ref: '', contractor: '', contractValue: '', certified: '', retentionPct: '5', capPct: '5', tiers: [], pcDate: '', defectsMonths: '12' })
    setAdding(false)
  }

  const updateJob = (id: string, patch: Partial<Job>) =>
    setJobs(p => p.map(j => (j.id === id ? { ...j, ...patch } : j)))

  const removeJob = (id: string) => setJobs(p => p.filter(j => j.id !== id))

  const downloadIcs = useCallback(() => {
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lexalytic//Retention Tracker//EN', 'CALSCALE:GREGORIAN']
    let n = 0
    computed.forEach(c => {
      const events: [string, Date, number][] = []
      if (!c.job.firstReleased && c.firstDue) events.push(['First retention release due', c.firstDue, c.firstAmount])
      if (!c.job.finalReleased && c.finalDue) events.push(['Final retention release due', c.finalDue, c.finalAmount])
      events.forEach(([label, d, amt]) => {
        n++
        const end = new Date(d); end.setDate(end.getDate() + 1)
        const title = `${label} - ${c.job.ref} (${money(amt)})`
        lines.push(
          'BEGIN:VEVENT',
          `UID:lexalytic-ret-${c.job.id}-${n}@lexalytic.com`,
          `DTSTAMP:${icsDate(new Date())}T090000Z`,
          `DTSTART;VALUE=DATE:${icsDate(d)}`,
          `DTEND;VALUE=DATE:${icsDate(end)}`,
          `SUMMARY:${title}`,
          `DESCRIPTION:${c.job.contractor ? 'Contractor: ' + c.job.contractor + '. ' : ''}Apply in writing for release. Tracked with Lexalytic.`,
          'BEGIN:VALARM', 'TRIGGER:-P30D', 'ACTION:DISPLAY', `DESCRIPTION:${title} in 30 days`, 'END:VALARM',
          'BEGIN:VALARM', 'TRIGGER:-P7D', 'ACTION:DISPLAY', `DESCRIPTION:${title} in 7 days`, 'END:VALARM',
          'END:VEVENT',
        )
      })
    })
    lines.push('END:VCALENDAR')
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'retention-release-dates.ics'; a.click()
    URL.revokeObjectURL(url)
  }, [computed])

  const openPack = useCallback(() => {
    if (!overdueItems.length) return
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    const byContractor: Record<string, typeof overdueItems> = {}
    overdueItems.forEach(i => {
      const k = i.c.job.contractor || 'the paying party'
      ;(byContractor[k] = byContractor[k] || []).push(i)
    })

    // Portfolio level analysis for the covering page
    const totalOverdue = overdueItems.reduce((a, i) => a + Math.round(i.amount * 100) / 100, 0)
    const totalInterest = overdueItems.reduce((a, i) => a + Math.round(i.interest * 100) / 100, 0)
    const oldest = overdueItems[0]
    const contractorTotals = Object.entries(byContractor)
      .map(([name, items]) => [name, items.reduce((a, i) => a + i.amount, 0), items.length] as [string, number, number])
      .sort((a, b) => b[1] - a[1])
    const worstContractor = contractorTotals[0]
    const worstShare = worstContractor && totalOverdue > 0 ? Math.round((worstContractor[1] / totalOverdue) * 100) : 0
    const finalStageCount = overdueItems.filter(i => i.stage.startsWith('Final')).length
    const stillHeld = computed.reduce((a, c) => a + c.outstanding, 0)
    const capIssues = computed.filter(c => c.overDeducted > 0)
    const overDeductedTotal = capIssues.reduce((a, c) => a + c.overDeducted, 0)

    const analysisHtml = overdueItems.length > 1 ? `
      <section class="analysis">
        <h2>Where the money is</h2>
        <div class="headline">
          <div class="big">${money(totalOverdue + totalInterest)}</div>
          <div class="biglabel">Past its release date across ${contractorTotals.length} paying part${contractorTotals.length === 1 ? 'y' : 'ies'}, including ${money(totalInterest)} of statutory interest</div>
        </div>
        <ul class="read">
          ${worstContractor && contractorTotals.length > 1 ? `<li><strong>${worstContractor[0]} holds ${worstShare}% of it</strong>, ${money(worstContractor[1])} across ${worstContractor[2]} release${worstContractor[2] === 1 ? '' : 's'}. If you chase one, chase that one.</li>` : ''}
          ${oldest ? `<li><strong>The oldest is ${oldest.days} days past due</strong> on ${oldest.c.job.ref}. Interest on that one alone stands at ${money(oldest.interest)} and is still running.</li>` : ''}
          ${finalStageCount > 0 ? `<li>${finalStageCount} of these ${finalStageCount === 1 ? 'is' : 'are'} the final release at the end of the defects period. That is the tranche most often written off, because by then the job is closed and nobody is watching the contract.</li>` : ''}
          ${overDeductedTotal > 0 ? `<li><strong>${money(overDeductedTotal)} has been deducted beyond the contractual cap</strong> across ${capIssues.length} job${capIssues.length === 1 ? '' : 's'}. That was never due at all and is recoverable now, separately from anything below.</li>` : ''}
          ${stillHeld > totalOverdue ? `<li>A further ${money(stillHeld - totalOverdue)} is held but has not yet reached its release date. It is not chaseable today, but it is on the same book.</li>` : ''}
        </ul>
        <p class="small">The applications that follow are one per paying party. Send each to the relevant contractor.</p>
      </section>` : ''

    const sections = Object.entries(byContractor).map(([contractor, items]) => {
      const r2 = (n: number) => Math.round(n * 100) / 100
      const total = items.reduce((s, i) => s + r2(i.amount), 0)
      const interest = items.reduce((s, i) => s + r2(i.interest), 0)
      const rows = items.map(i => `
        <tr>
          <td>${i.c.job.ref}</td>
          <td>${i.stage}</td>
          <td>${fmt(i.due)}</td>
          <td>${i.days} days</td>
          <td class="r">${money(i.amount)}</td>
          <td class="r">${money(i.interest)}</td>
        </tr>`).join('')

      return `
      <section class="letter">
        <p class="from">${sender.company}${sender.address ? '<br/>' + sender.address.replace(/\n/g, '<br/>') : ''}${sender.email ? '<br/>' + sender.email : ''}${sender.phone ? '<br/>' + sender.phone : ''}</p>
        <h2>Application for release of retention</h2>
        <p class="meta">To: ${contractor}<br/>Date: ${today}</p>

        <p>We write to apply for the release of retention monies currently held in respect of the works listed below. In each case the contractual milestone triggering release has passed.</p>

        <table>
          <thead><tr><th>Contract</th><th>Release stage</th><th>Fell due</th><th>Overdue</th><th class="r">Retention</th><th class="r">Interest</th></tr></thead>
          <tbody>${rows}</tbody>
          <tfoot><tr><td colspan="4"><strong>Total</strong></td><td class="r"><strong>${money(total)}</strong></td><td class="r"><strong>${money(interest)}</strong></td></tr></tfoot>
        </table>

        <p><strong>Total now due, including statutory interest: ${money(total + interest)}</strong></p>

        <h3>Basis of this application</h3>
        <p>Under the Housing Grants, Construction and Regeneration Act 1996 as amended, where the paying party does not serve a valid payment notice, and does not serve a pay less notice before the final date for payment, the sum stated in the payee's application becomes the notified sum and is payable in full.</p>
        <p>Section 113 of the same Act renders pay when paid provisions ineffective except on the insolvency of a third party, and the release of retention cannot be made conditional on matters arising under a separate contract.</p>
        <p>Interest is calculated under the Late Payment of Commercial Debts (Interest) Act 1998 at ${STAT_RATE.toFixed(2)}% per annum, being the Bank of England base rate of ${BOE_BASE}% plus eight percentage points, accruing on a simple basis from the date each sum fell due. Fixed compensation may also be recoverable in addition to interest.</p>

        <h3>Requested action</h3>
        <p>We request payment of ${money(total + interest)} within 14 days of the date of this letter. If a pay less notice is to be served, please provide it within the period allowed under the contract, stating the basis of any deduction.</p>
        <p>In the absence of payment or a valid notice, we reserve the right to refer the matter to adjudication under section 108 of the Act. An adjudicator is appointed within seven days of a notice of adjudication and reaches a decision within twenty eight days, binding on an interim basis. We also reserve the right to suspend performance on any live contract following the required notice period.</p>

        <p class="sign">Yours faithfully<br/><br/><br/>_______________________<br/>${sender.contact || ''}${sender.contact ? '<br/>' : ''}For and on behalf of ${sender.company}</p>
      </section>`
    }).join('')

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Retention recovery pack</title>
<style>
  @page { margin: 22mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; line-height: 1.6; max-width: 720px; margin: 0 auto; padding: 28px; font-size: 14px; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  h2 { font-size: 18px; margin: 0 0 14px; }
  h3 { font-size: 15px; margin: 22px 0 8px; }
  .sub { color: #666; font-size: 13px; margin: 0 0 32px; }
  .meta { color: #444; margin-bottom: 22px; }
  .from { text-align: right; color: #444; margin: 0 0 26px; white-space: normal; }
  table { width: 100%; border-collapse: collapse; margin: 16px 0 20px; font-size: 13px; }
  th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid #ddd; }
  th { border-bottom: 2px solid #333; font-weight: 600; }
  .r { text-align: right; }
  tfoot td { border-bottom: 0; border-top: 2px solid #333; }
  .analysis { page-break-after: always; }
  .headline { border: 2px solid #111; padding: 18px 22px; margin: 16px 0 20px; }
  .big { font-size: 32px; line-height: 1.1; }
  .biglabel { color: #555; font-size: 13px; margin-top: 6px; }
  ul.read { padding-left: 20px; margin: 14px 0 16px; }
  ul.read li { margin-bottom: 10px; line-height: 1.6; }
  .small { font-size: 12.5px; color: #666; }
  .letter { page-break-after: always; }
  .letter:last-of-type { page-break-after: auto; }
  .sign { margin-top: 34px; }
  .note { font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 14px; margin-top: 30px; }
  @media print { .noprint { display: none; } }
</style></head>
<body>
  <div class="noprint" style="background:#1A1815;color:#fff;padding:14px 18px;border-radius:8px;margin-bottom:26px;font-family:-apple-system,sans-serif;font-size:13px;">
    Use your browser print dialogue and choose Save as PDF. Check the figures and the contractor details before sending.
  </div>
  <h1>Retention recovery pack</h1>

  <p class="sub">${sender.company} · Prepared ${today}</p>
  ${analysisHtml}
  ${sections}
  <p class="note">Prepared using the Lexalytic retention tracker. Figures are calculated from the contract values, certified sums and dates you entered. This is a template application based on the statutory framework and is not legal advice. Check your contract particulars, which may vary the release mechanism, before sending.</p>
</body></html>`

    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [overdueItems])

  const loadSample = () => {
    setJobs(SAMPLE_JOBS)
  setSender({ company: 'Brindley Electrical Ltd', address: '14 Foundry Lane, Walsall WS2 8QT', contact: 'Dave Brindley', email: 'dave@brindleyelectrical.co.uk', phone: '01922 445 118' })
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
          _subject: `Retention tracker enquiry - ${jobs.length} jobs, ${money(totals.outstanding)} outstanding`,
          source: 'Retention tracker',
          jobs_tracked: jobs.length,
          retention_outstanding: money(totals.outstanding),
          overdue: money(totals.overdue),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setSendError('That did not send. Email hello@lexalytic.com and we will pick it up.')
    } finally { setSending(false) }
  }

  return (
    <div className="tool-page">
      <style>{`
        .r-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .r-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        @media (max-width: 620px) { .r-grid2, .r-grid3 { grid-template-columns: 1fr; } }
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
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 620 }}>
          The second half of your retention has a date on it. Nobody is watching it.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 620, margin: '0 0 8px' }}>
          The second half falls due twelve months after practical completion, long after everyone has
          stopped watching the contract. Add your jobs here and this works out what is held, whether
          deduction has passed the cap, and the date each half falls due.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 620, margin: '0 0 32px' }}>
          Saved in this browser only. Nothing is uploaded, which also means clearing your browser data
          erases it. Export to your calendar to keep the dates somewhere permanent.
        </p>
        {jobs.length === 0 && (
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
            marginBottom: 28, padding: '14px 18px', borderRadius: 8,
            background: 'rgba(193,125,46,0.05)', border: '1px solid rgba(193,125,46,0.2)' }}>
            <button className="tool-link" onClick={loadSample}>Try it with an example</button>
            <span style={{ fontSize: 13, color: '#8A8279' }}>An electrical subcontractor with four jobs. One finished over a year ago with the second half of retention still unclaimed, one where practical completion has not been certified, and one fully released.</span>
          </div>
        )}


        {loaded && jobs.length > 0 && (
          <div className="tool-card" style={{ padding: '22px 26px', marginBottom: 22,
            background: totals.overdue > 0 ? 'rgba(161,59,42,0.05)' : '#fff',
            borderColor: totals.overdue > 0 ? 'rgba(161,59,42,0.22)' : '#E8E2D8' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              {([
                ['Retention held', money(totals.held), '#57514A'],
                ['Still outstanding', money(totals.outstanding), '#57514A'],
                ['Releasable now', money(totals.releasableNow), totals.releasableNow > 0 ? '#3F6B4C' : '#C4BDB2'],
                ['Overdue', money(totals.overdue), totals.overdue > 0 ? '#A13B2A' : '#C4BDB2'],
              ] as [string, string, string][]).map(([l, v, c]) => (
                <div key={l}>
                  <div className="tool-serif" style={{ fontSize: 24, lineHeight: 1.1, color: c }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>{l}</div>
                </div>
              ))}
              <button className="tool-btn tool-btn-quiet" style={{ marginLeft: 'auto' }} onClick={downloadIcs}>
                Export to calendar
              </button>
            </div>
            {totals.overdueInterest > 0 && (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.07)', fontSize: 14, color: '#57514A', lineHeight: 1.65 }}>
                Statutory interest on the overdue amount is running at {STAT_RATE.toFixed(2)}% and currently
                stands at <strong style={{ color: '#A13B2A' }}>{money(totals.overdueInterest)}</strong>.
                That is recoverable in addition to the retention itself.
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <h2 className="tool-serif" style={{ fontSize: 20, fontWeight: 400, margin: 0 }}>
            {jobs.length ? `Jobs (${jobs.length})` : 'Add your first job'}
          </h2>
          {!adding && jobs.length > 0 && <button className="tool-link" onClick={() => setAdding(true)}>Add another</button>}
        </div>

        {(adding || jobs.length === 0) && (
          <div className="tool-card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="r-grid2">
              <div className="tool-field">
                <label className="tool-label">Job reference or site</label>
                <input className="tool-in" value={draft.ref || ''} onChange={e => setDraft({ ...draft, ref: e.target.value })} placeholder="Riverside Phase 2" />
              </div>
              <div className="tool-field">
                <label className="tool-label">Main contractor</label>
                <input className="tool-in" value={draft.contractor || ''} onChange={e => setDraft({ ...draft, contractor: e.target.value })} placeholder="Who is holding the money" />
              </div>
            </div>
            <div className="r-grid2">
              <div className="tool-field">
                <label className="tool-label">Contract value</label>
                <input className="tool-in" type="number" min={0} inputMode="decimal" value={draft.contractValue || ''} onChange={e => setDraft({ ...draft, contractValue: e.target.value })} placeholder="£" />
              </div>
              <div className="tool-field">
                <label className="tool-label">Value certified to date</label>
                <input className="tool-in" type="number" min={0} inputMode="decimal" value={draft.certified || ''} onChange={e => setDraft({ ...draft, certified: e.target.value })} placeholder="£" />
                <div className="tool-hint">Gross value certified across all interim applications.</div>
              </div>
            </div>
            <div className="r-grid3">
              <div className="tool-field">
                <label className="tool-label">Retention rate</label>
                <input className="tool-in" type="number" min={0} step="0.1" value={draft.retentionPct || ''} onChange={e => setDraft({ ...draft, retentionPct: e.target.value })} placeholder="5" />
                <div className="tool-hint">Usually 5%.</div>
              </div>
              <div className="tool-field">
                <label className="tool-label">Cap on retention</label>
                <input className="tool-in" type="number" min={0} step="0.1" value={draft.capPct || ''} onChange={e => setDraft({ ...draft, capPct: e.target.value })} placeholder="5" />
                <div className="tool-hint">% of contract value. Deduction should stop here.</div>
              </div>
              <div className="tool-field">
                <label className="tool-label">Defects period</label>
                <input className="tool-in" type="number" min={0} value={draft.defectsMonths || ''} onChange={e => setDraft({ ...draft, defectsMonths: e.target.value })} placeholder="12" />
                <div className="tool-hint">Months. Usually 12.</div>
              </div>
            </div>
            <div style={{ marginTop: 4, marginBottom: 16, padding: '16px 18px',
              borderRadius: 8, border: '1px solid #E8E2D8', background: '#FDFCFA' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 320px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Stepped retention</div>
                  <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 3, lineHeight: 1.6 }}>
                    Only if your contract steps the rate down as certified value rises. Leave it empty
                    and the flat rate above applies.
                  </div>
                </div>
                <button className="tool-link"
                  onClick={() => setDraft({ ...draft,
                    tiers: [...(draft.tiers || []), { upTo: '', pct: '' }] })}>
                  Add a tier
                </button>
              </div>

              {(draft.tiers || []).map((t: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-end',
                  flexWrap: 'wrap', marginTop: 12, paddingTop: 12,
                  borderTop: '1px solid #F0EBE2' }}>
                  <div className="tool-field" style={{ width: 150 }}>
                    <label className="tool-label">Up to</label>
                    <input className="tool-in" type="number" min={0} inputMode="decimal"
                      value={t.upTo} placeholder="No limit"
                      onChange={e => {
                        const next = [...(draft.tiers || [])]
                        next[i] = { ...next[i], upTo: e.target.value }
                        setDraft({ ...draft, tiers: next })
                      }} />
                  </div>
                  <div className="tool-field" style={{ width: 110 }}>
                    <label className="tool-label">At</label>
                    <input className="tool-in" type="number" min={0} step="0.1"
                      value={t.pct} placeholder="%"
                      onChange={e => {
                        const next = [...(draft.tiers || [])]
                        next[i] = { ...next[i], pct: e.target.value }
                        setDraft({ ...draft, tiers: next })
                      }} />
                  </div>
                  <button className="tool-link" style={{ color: '#8A8279', paddingBottom: 12 }}
                    onClick={() => setDraft({ ...draft,
                      tiers: (draft.tiers || []).filter((_: any, j: number) => j !== i) })}>
                    Remove
                  </button>
                </div>
              ))}

              {(draft.tiers || []).filter((t: any) => String(t.pct).trim() !== '').length > 0 &&
                parseFloat(draft.certified || '0') > 0 && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #F0EBE2' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                    On {money(parseFloat(draft.certified || '0'))} certified, that holds
                  </div>
                  {tieredRetention(
                    parseFloat(draft.certified || '0'),
                    (draft.tiers || []).filter((t: any) => String(t.pct).trim() !== '')
                  ).breakdown.map((b: any, i: number) => (
                    <div key={i} style={{ fontSize: 13, color: '#57514A', padding: '2px 0' }}>
                      {money(b.from)} to {money(b.to)} at {b.pct}% is {money(b.amount)}
                    </div>
                  ))}
                  <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8, paddingTop: 8,
                    borderTop: '1px solid #F0EBE2' }}>
                    {money(tieredRetention(
                      parseFloat(draft.certified || '0'),
                      (draft.tiers || []).filter((t: any) => String(t.pct).trim() !== '')
                    ).held)} in total
                  </div>
                  <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 8, lineHeight: 1.6 }}>
                    Each rate applies only to the slice inside its tier, the way tax bands work. Leave
                    the last threshold blank so it runs to the top.
                  </div>
                </div>
              )}
            </div>

            <div className="tool-field" style={{ maxWidth: 260 }}>
              <label className="tool-label">Practical completion date</label>
              <input className="tool-in" type="date" max={todayStr()} value={draft.pcDate || ''}
                onChange={e => { const v = e.target.value; if (v && v > todayStr()) return; setDraft({ ...draft, pcDate: v }) }} />
              <div className="tool-hint">The date works were actually completed, not a future target. Leave blank if the job is still live. Both release dates run from this.</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
              <button className="tool-btn" onClick={addJob} disabled={!draft.ref?.trim() || !draft.contractValue}>Add job</button>
              {jobs.length > 0 && <button className="tool-link" style={{ color: '#8A8279' }} onClick={() => setAdding(false)}>Cancel</button>}
            </div>
          </div>
        )}

        {computed.map(c => {
          const open = expanded === c.job.id
          const anyOverdue = (!c.job.firstReleased && c.firstDays !== null && c.firstDays < 0) ||
                             (!c.job.finalReleased && c.finalDays !== null && c.finalDays < 0)
          return (
            <div key={c.job.id} className="tool-card" style={{ marginBottom: 14, overflow: 'hidden',
              borderColor: anyOverdue ? 'rgba(161,59,42,0.25)' : '#E8E2D8' }}>
              <button onClick={() => setExpanded(open ? null : c.job.id)} aria-expanded={open}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                  padding: '18px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{c.job.ref}</div>
                  <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                    {c.job.contractor || 'No contractor set'} · {money(c.held)} held
                  </div>
                </div>
                {anyOverdue && (
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 4,
                    color: '#A13B2A', background: 'rgba(161,59,42,0.07)', border: '1px solid rgba(161,59,42,0.22)' }}>
                    Overdue
                  </span>
                )}
                <span style={{ fontSize: 13, color: '#8A8279' }}>{open ? 'Close' : 'Open'}</span>
              </button>

              {open && (
                <div style={{ padding: '4px 24px 22px', borderTop: '1px solid #F0EBE2' }}>
                  {c.capReached && (
                    <div style={{ marginTop: 16, marginBottom: 6, padding: '14px 16px', borderRadius: 6,
                      background: 'rgba(176,122,30,0.07)', border: '1px solid rgba(176,122,30,0.22)',
                      fontSize: 14, lineHeight: 1.65, color: '#8F6318' }}>
                      Retention has reached the {c.capPct}% cap. No further deduction should be made from
                      subsequent certificates.
                      {c.overDeducted > 0 && (
                        <> On the figures entered, <strong>{money(c.overDeducted)}</strong> has been deducted
                        beyond the cap and is recoverable.</>
                      )}
                    </div>
                  )}

                  {[
                    { key: 'first' as const, label: 'First release', sub: 'At practical completion',
                      amount: c.firstAmount, due: c.firstDue, days: c.firstDays, released: c.job.firstReleased },
                    { key: 'final' as const, label: 'Final release', sub: `End of ${c.job.defectsMonths} month defects period`,
                      amount: c.finalAmount, due: c.finalDue, days: c.finalDays, released: c.job.finalReleased },
                  ].map(r => (
                    <div className="tool-scroll"><div key={r.key} style={{ display: 'grid', minWidth: 560, gridTemplateColumns: '1fr 130px 150px 110px',
                      gap: 14, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F4F0E8' }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 500 }}>{r.label}</div>
                        <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>{r.sub}</div>
                      </div>
                      <div style={{ fontSize: 15 }}>{money(r.amount)}</div>
                      <div style={{ fontSize: 13, color: '#57514A' }}>
                        {r.due ? fmt(r.due) : 'Set completion date'}
                      </div>
                      <div style={{ fontSize: 13 }}>
                        {r.released ? (
                          <span style={{ color: '#3F6B4C' }}>Received</span>
                        ) : r.days !== null && r.days < 0 ? (
                          <span style={{ color: '#A13B2A', fontWeight: 600 }}>{Math.abs(r.days)}d overdue</span>
                        ) : r.days !== null ? (
                          <span style={{ color: '#8A8279' }}>{r.days} days</span>
                        ) : <span style={{ color: '#C4BDB2' }}>—</span>}
                      </div>
                    </div></div>
                  ))}

                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 16, alignItems: 'center' }}>
                    <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" checked={c.job.firstReleased}
                        onChange={e => updateJob(c.job.id, { firstReleased: e.target.checked })} />
                      First half received
                    </label>
                    <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" checked={c.job.finalReleased}
                        onChange={e => updateJob(c.job.id, { finalReleased: e.target.checked })} />
                      Final half received
                    </label>
                    <button className="tool-link" style={{ color: '#8A8279', marginLeft: 'auto' }}
                      onClick={() => { if (confirm(`Remove ${c.job.ref}?`)) removeJob(c.job.id) }}>
                      Remove job
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Recovery pack */}
        {overdueItems.length > 0 && (
          <div style={{ marginTop: 32, padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
            <div className="tool-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
              {money(totals.overdue)} is past its release date.
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 18px', maxWidth: 560 }}>
              The recovery pack turns that into a formal application for release, one per contractor,
              setting out the sums, the dates each fell due, the statutory interest, and the basis under
              the Construction Act. Ready to print or save as PDF and send.
            </p>
            <ul style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)', margin: '0 0 22px', paddingLeft: 20, maxWidth: 560 }}>
              <li>Correctly worded application citing the notified sum provisions</li>
              <li>Schedule of every overdue release with dates and amounts</li>
              <li>Interest at {STAT_RATE.toFixed(2)}% under the Late Payment of Commercial Debts Act</li>
              <li>The adjudication route if it is ignored, and the timescales</li>
            </ul>

            {paid ? (
              <>
                {(!senderComplete || editingSender) ? (
                  <div style={{ padding: '20px 22px', borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)', marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Your details</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 16px', lineHeight: 1.6 }}>
                      These go at the top of the letter so the contractor knows who is applying and where
                      to send payment. Saved on this device for next time.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
                      <input aria-label="Your company name" className="tool-in-dark" placeholder="Your company name" value={sender.company}
                        onChange={e => setSender({ ...sender, company: e.target.value })} />
                      <input aria-label="Your name" className="tool-in-dark" placeholder="Your name" value={sender.contact}
                        onChange={e => setSender({ ...sender, contact: e.target.value })} />
                    </div>
                    <textarea aria-label="Your address" className="tool-in-dark" rows={3} placeholder="Your address" style={{ marginBottom: 12, resize: 'vertical' }}
                      value={sender.address} onChange={e => setSender({ ...sender, address: e.target.value })} />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
                      <input aria-label="Email" className="tool-in-dark" placeholder="Email" value={sender.email}
                        onChange={e => setSender({ ...sender, email: e.target.value })} />
                      <input aria-label="Phone" className="tool-in-dark" placeholder="Phone" value={sender.phone}
                        onChange={e => setSender({ ...sender, phone: e.target.value })} />
                    </div>
                    <button className="tool-btn" disabled={!senderComplete}
                      onClick={() => { setEditingSender(false); if (senderComplete) openPack() }}>
                      Save and generate pack
                    </button>
                    {!senderComplete && (
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginLeft: 14 }}>
                        Company name and address are needed.
                      </span>
                    )}
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="tool-btn" onClick={openPack}>Generate recovery pack</button>
                    <button onClick={() => setEditingSender(true)}
                      style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                        color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}>
                      Edit your details
                    </button>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                      Opens in a new tab. Print or save as PDF from there.
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href={STRIPE_LINK} className="tool-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Unlock the recovery pack, {PACK_PRICE}
                </a>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  One payment. Generate as many as you need, whenever retention falls due.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Portfolio / sync */}
        <div style={{ marginTop: 22, padding: 30, borderRadius: 10, background: '#fff', border: '1px solid #E8E2D8' }}>
          <div className="tool-serif" style={{ fontSize: 19, marginBottom: 10 }}>
            Want it to remember for you?
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: '0 0 8px', maxWidth: 570 }}>
            This page forgets everything if you clear your browser, and it cannot email you. Retention
            Manager is the same thing with an account behind it: reminders at 90, 30 and 7 days before
            each release, application letters generated from your data, part payments logged, and
            everything on any device.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: '0 0 18px', maxWidth: 570 }}>
            From £19 a month. Fourteen days free and no card needed.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="/retention-manager" className="tool-btn"
              style={{ textDecoration: 'none', display: 'inline-block' }}>
              See what it does
            </a>
            <a href="/signup" style={{ fontSize: 14, color: '#8A8279' }}>Or start a trial now</a>
          </div>
        </div>

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
                {jobs.length >= 8
                  ? `${jobs.length} jobs is more than a browser tab should be holding.`
                  : 'Rather it did the remembering?'}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: '0 0 18px', maxWidth: 560 }}>
                {jobs.length >= 8
                  ? 'At this size retention is one line in a bigger problem. Applications for payment, CIS deductions, job costing against estimate and a cash flow forecast that accounts for money you have earned but cannot access yet. We build that as one system, priced once and owned by you.'
                  : 'Retention Manager is this with an account behind it: reminders before each release, application letters generated from your data, and everything on any device. Or if retention is one line in a bigger problem, we can talk about that instead.'}
              </p>
              {!showForm ? (
                <button className="tool-btn" onClick={() => setShowForm(true)}>
                  {jobs.length >= 8 ? 'Talk about a proper system' : 'Talk to us'}
                </button>
              ) : (
                <div>
                  <input aria-label="Email address" className="tool-in" type="email" placeholder="Email address" style={{ maxWidth: 320, marginBottom: 12 }}
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submitInterest() }} />
                  {sendError && (
                    <div style={{ fontSize: 13, color: '#A13B2A', marginBottom: 12 }}>{sendError}</div>
                  )}
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

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 640 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>, a UK studio that builds websites,
          custom software and data systems for small businesses. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 640 }}>
          Release timings follow the common JCT pattern of half at practical completion and half at the
          end of the rectification period. NEC contracts only apply retention where Option X16 is
          incorporated, and some contracts vary the mechanism entirely, so check your contract
          particulars. This is a tracking tool, not legal advice.
        </p>
      </div>
    </div>
  )
}
