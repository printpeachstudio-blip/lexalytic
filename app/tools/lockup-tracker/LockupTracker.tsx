'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'

// Stripe Payment Link for the cash release plan.
// Success URL: https://www.lexalytic.com/tools/lockup-tracker?ref=crp-9j4tn6
const STRIPE_LINK = 'https://buy.stripe.com/9B66oA5Sx1I65fCfgg3AY09'
const PLAN_PRICE = '£29'
const UNLOCK_PARAM = 'crp-9j4tn6'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STORAGE_KEY = 'lexalytic.lockup.v1'
const FIRM_KEY = 'lexalytic.lockup.firm'
const PAID_KEY = 'lexalytic.lockup.paid'

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Job {
  id: string
  ref: string
  client: string
  workDone: string      // value of work delivered to date
  invoiced: string      // value invoiced to date
  paid: string          // value collected to date
  lastWorkDate: string  // when work was last delivered
  lastInvoiceDate: string
  terms: string         // payment terms in days
}

interface Firm {
  name: string
  revenue: string       // annualised fee income
}

function money(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}
function money2(n: number): string {
  return '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function uid() { return Math.random().toString(36).slice(2, 10) }
function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function daysSince(dateStr: string): number | null {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return null
  const t = new Date(); t.setHours(0, 0, 0, 0)
  return Math.max(0, Math.round((t.getTime() - d.getTime()) / 86400000))
}

interface Row {
  job: Job
  wip: number           // delivered but not invoiced
  debt: number          // invoiced but not collected
  locked: number        // wip + debt
  wipAge: number | null
  debtAge: number | null
  overdueBy: number     // days past terms
  flag: 'bill' | 'chase' | 'overdue' | 'clean'
}

function build(job: Job): Row {
  const done = parseFloat(job.workDone) || 0
  const inv = parseFloat(job.invoiced) || 0
  const paid = parseFloat(job.paid) || 0
  const terms = parseInt(job.terms, 10) || 30

  const wip = Math.max(0, done - inv)
  const debt = Math.max(0, inv - paid)
  const wipAge = wip > 0 ? daysSince(job.lastWorkDate) : null
  const debtAge = debt > 0 ? daysSince(job.lastInvoiceDate) : null
  const overdueBy = debtAge !== null ? Math.max(0, debtAge - terms) : 0

  let flag: Row['flag'] = 'clean'
  if (overdueBy > 0) flag = 'overdue'
  else if (wip > 0 && (wipAge ?? 0) > 14) flag = 'bill'
  else if (debt > 0) flag = 'chase'

  return { job, wip, debt, locked: wip + debt, wipAge, debtAge, overdueBy, flag }
}

export default function LockupTracker() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [firm, setFirm] = useState<Firm>({ name: '', revenue: '' })
  const [loaded, setLoaded] = useState(false)
  const [adding, setAdding] = useState(false)
  const [paid, setPaid] = useState(false)
  const [editingFirm, setEditingFirm] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const [draft, setDraft] = useState<Partial<Job>>({
    ref: '', client: '', workDone: '', invoiced: '', paid: '',
    lastWorkDate: '', lastInvoiceDate: '', terms: '30',
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
      const f = localStorage.getItem(FIRM_KEY)
      if (f) setFirm(JSON.parse(f))
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
    } catch { /* storage unavailable */ }
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1'); setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* ignore */ }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs)) } catch { /* ignore */ }
  }, [jobs, loaded])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(FIRM_KEY, JSON.stringify(firm)) } catch { /* ignore */ }
  }, [firm, loaded])

  const rows = useMemo(() => jobs.map(build), [jobs])

  const totals = useMemo(() => {
    let wip = 0, debt = 0, overdue = 0
    rows.forEach(r => { wip += r.wip; debt += r.debt; if (r.overdueBy > 0) overdue += r.debt })
    const revenue = parseFloat(firm.revenue) || 0
    const dailyRevenue = revenue > 0 ? revenue / 365 : 0
    const wipDays = dailyRevenue > 0 ? wip / dailyRevenue : 0
    const debtDays = dailyRevenue > 0 ? debt / dailyRevenue : 0
    return {
      wip, debt, overdue, locked: wip + debt,
      revenue, dailyRevenue,
      wipDays, debtDays, lockup: wipDays + debtDays,
    }
  }, [rows, firm])

  // What a week of focused billing and chasing would release
  const quickWins = useMemo(() => {
    const toBill = rows.filter(r => r.wip > 0 && (r.wipAge ?? 0) > 14).sort((a, b) => b.wip - a.wip)
    const toChase = rows.filter(r => r.overdueBy > 0).sort((a, b) => b.debt - a.debt)
    const billValue = toBill.reduce((a, r) => a + r.wip, 0)
    const chaseValue = toChase.reduce((a, r) => a + r.debt, 0)
    return { toBill, toChase, billValue, chaseValue, total: billValue + chaseValue }
  }, [rows])

  const firmComplete = firm.name.trim().length >= 2 && (parseFloat(firm.revenue) || 0) > 0

  const addJob = () => {
    if (!draft.ref?.trim() || !draft.workDone) return
    const j: Job = {
      id: uid(),
      ref: draft.ref.trim(),
      client: (draft.client || '').trim(),
      workDone: draft.workDone || '0',
      invoiced: draft.invoiced || '0',
      paid: draft.paid || '0',
      lastWorkDate: draft.lastWorkDate || '',
      lastInvoiceDate: draft.lastInvoiceDate || '',
      terms: draft.terms || '30',
    }
    setJobs(p => [...p, j])
    setDraft({ ref: '', client: '', workDone: '', invoiced: '', paid: '',
      lastWorkDate: '', lastInvoiceDate: '', terms: draft.terms || '30' })
    setAdding(false)
  }

  const update = (id: string, patch: Partial<Job>) =>
    setJobs(p => p.map(j => (j.id === id ? { ...j, ...patch } : j)))
  const remove = (id: string) => setJobs(p => p.filter(j => j.id !== id))

  const openPlan = useCallback(() => {
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    const worstWip = [...rows].filter(r => r.wip > 0).sort((a, b) => (b.wipAge ?? 0) - (a.wipAge ?? 0))[0]
    const worstDebt = [...rows].filter(r => r.overdueBy > 0).sort((a, b) => b.overdueBy - a.overdueBy)[0]

    const clientLock: Record<string, number> = {}
    rows.forEach(r => { const c = r.job.client || 'Unattributed'; clientLock[c] = (clientLock[c] || 0) + r.locked })
    const topClients = Object.entries(clientLock).sort((a, b) => b[1] - a[1]).slice(0, 5)
    const topClientShare = topClients.length && totals.locked > 0
      ? Math.round((topClients[0][1] / totals.locked) * 100) : 0

    const billRows = quickWins.toBill.map(r => `
      <tr><td>${r.job.ref}</td><td>${r.job.client || '—'}</td><td class="r">${money2(r.wip)}</td>
      <td>${r.wipAge ?? 0} days unbilled</td></tr>`).join('')
    const chaseRows = quickWins.toChase.map(r => `
      <tr><td>${r.job.ref}</td><td>${r.job.client || '—'}</td><td class="r">${money2(r.debt)}</td>
      <td>${r.overdueBy} days past terms</td></tr>`).join('')
    const clientRows = topClients.map(([c, v]) => `
      <tr><td>${c}</td><td class="r">${money2(v)}</td>
      <td class="r">${totals.locked > 0 ? Math.round((v / totals.locked) * 100) : 0}%</td></tr>`).join('')

    const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Cash release plan</title>
<style>
  @page { margin: 20mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; line-height: 1.55; max-width: 780px; margin: 0 auto; padding: 26px; font-size: 13.5px; }
  h1 { font-size: 23px; margin: 0 0 4px; }
  h2 { font-size: 17px; margin: 28px 0 10px; }
  .sub { color: #666; font-size: 13px; margin: 0 0 24px; }
  .headline { border: 2px solid #111; padding: 20px 24px; margin-bottom: 22px; }
  .big { font-size: 34px; line-height: 1.1; }
  .biglabel { color: #555; font-size: 13px; margin-top: 6px; }
  .stats { display: flex; gap: 34px; flex-wrap: wrap; margin: 18px 0 24px; }
  .stat b { display: block; font-size: 22px; font-weight: normal; }
  .stat span { font-size: 12px; color: #666; }
  table { width: 100%; border-collapse: collapse; margin: 10px 0 18px; font-size: 12.5px; }
  th, td { text-align: left; padding: 7px 6px; border-bottom: 1px solid #ddd; }
  th { border-bottom: 2px solid #333; font-weight: 600; }
  .r { text-align: right; }
  ul.read { padding-left: 20px; margin: 12px 0 18px; }
  ul.read li { margin-bottom: 10px; line-height: 1.6; }
  .note { font-size: 11.5px; color: #666; border-top: 1px solid #ddd; padding-top: 13px; margin-top: 26px; }
  @media print { .noprint { display: none; } }
</style></head>
<body>
  <div class="noprint" style="background:#1A1815;color:#fff;padding:13px 17px;border-radius:8px;margin-bottom:24px;font-family:-apple-system,sans-serif;font-size:13px;">
    Use your browser print dialogue and choose Save as PDF.
  </div>
  <h1>Cash release plan</h1>
  <p class="sub">${firm.name} · Prepared ${today}</p>

  <div class="headline">
    <div class="big">${money(quickWins.total)}</div>
    <div class="biglabel">Available to release without winning a single new instruction, by billing what is already delivered and collecting what is already overdue</div>
  </div>

  <div class="stats">
    <div class="stat"><b>${totals.lockup.toFixed(0)} days</b><span>Total lock-up</span></div>
    <div class="stat"><b>${totals.wipDays.toFixed(0)} days</b><span>Sitting unbilled</span></div>
    <div class="stat"><b>${totals.debtDays.toFixed(0)} days</b><span>Billed, not collected</span></div>
    <div class="stat"><b>${money(totals.dailyRevenue)}</b><span>Each day of lock-up</span></div>
  </div>

  <ul class="read">
    <li>Lock-up of ${totals.lockup.toFixed(0)} days sits ${totals.lockup > 65 ? 'above' : totals.lockup < 45 ? 'below' : 'within'} the 45 to 65 day range generally considered healthy for a UK professional services firm. ${totals.lockup > 65 ? 'Every day above that range is cash earned and not available.' : totals.lockup < 45 ? 'That is a strong position and worth protecting as the firm grows.' : ''}</li>
    ${totals.wipDays > totals.debtDays ? `<li><strong>The larger problem is billing, not collection.</strong> ${totals.wipDays.toFixed(0)} days of revenue sit delivered but uninvoiced against ${totals.debtDays.toFixed(0)} days awaiting payment. Chasing clients harder will not fix a billing lag.</li>` : `<li><strong>The larger problem is collection, not billing.</strong> ${totals.debtDays.toFixed(0)} days are billed and unpaid against ${totals.wipDays.toFixed(0)} days unbilled. The work is going out on time; the cash is not coming back.</li>`}
    ${worstWip && (worstWip.wipAge ?? 0) > 30 ? `<li><strong>${worstWip.job.ref} has been unbilled for ${worstWip.wipAge} days</strong> at ${money2(worstWip.wip)}. Work that old is harder to bill without a conversation, and harder still to defend if queried.</li>` : ''}
    ${worstDebt ? `<li><strong>${worstDebt.job.ref} is ${worstDebt.overdueBy} days past terms</strong> at ${money2(worstDebt.debt)}. Recovery rates fall steadily the longer an invoice ages.</li>` : ''}
    ${topClientShare >= 35 ? `<li><strong>${topClients[0][0]} accounts for ${topClientShare}% of everything locked up.</strong> That is concentration risk as well as a cash issue. One client dispute would affect a third of the position.</li>` : ''}
    <li>At ${money(totals.dailyRevenue)} of fee income a day, cutting lock-up by ten days would release ${money(totals.dailyRevenue * 10)} of cash on a permanent basis.</li>
  </ul>

  <h2>Bill these first</h2>
  ${billRows ? `<table><thead><tr><th>Job</th><th>Client</th><th class="r">Value</th><th>Age</th></tr></thead><tbody>${billRows}</tbody></table>
  <p>Delivered work more than a fortnight old. Total ${money2(quickWins.billValue)}. Invoicing these does not require anyone to agree to anything.</p>`
  : '<p>No delivered work is sitting unbilled beyond a fortnight. Billing discipline is holding.</p>'}

  <h2>Chase these next</h2>
  ${chaseRows ? `<table><thead><tr><th>Job</th><th>Client</th><th class="r">Value</th><th>Overdue</th></tr></thead><tbody>${chaseRows}</tbody></table>
  <p>Invoices past their agreed terms. Total ${money2(quickWins.chaseValue)}. Statutory interest at eight points over base is available on all of these under the Late Payment of Commercial Debts (Interest) Act 1998.</p>`
  : '<p>Nothing is past terms. Collection is holding.</p>'}

  <h2>Where the cash is concentrated</h2>
  <table><thead><tr><th>Client</th><th class="r">Locked up</th><th class="r">Share</th></tr></thead><tbody>${clientRows || '<tr><td colspan="3">No data.</td></tr>'}</tbody></table>

  <p class="note">Prepared using the Lexalytic lock-up tracker from the job values, invoice positions and dates
  entered. Lock-up is calculated as work in progress plus debtors, divided by daily fee income. It is a
  management measure and will not tie exactly to a statutory WIP valuation, which applies different
  recognition rules.</p>
</body></html>`
    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [rows, totals, quickWins, firm])

  const submitInterest = async () => {
    if (!EMAIL_RE.test(email.trim())) { setSendError('Enter an email address we can reach you on.'); return }
    setSending(true); setSendError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          _subject: `Lock-up tracker enquiry - ${jobs.length} jobs, ${money(totals.locked)} locked up`,
          source: 'Lock-up tracker',
          jobs: jobs.length,
          locked_up: money(totals.locked),
          lockup_days: totals.lockup.toFixed(0),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setSendError('That did not send. Email hello@lexalytic.com and we will pick it up.')
    } finally { setSending(false) }
  }

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .l-wrap { max-width: 900px; margin: 0 auto; padding: 0 20px; }
        .l-serif { font-family: Georgia, 'Times New Roman', serif; }
        .l-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .l-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; transition: background .15s ease; }
        .l-primary { background: ${AMBER}; color: #fff; }
        .l-primary:hover { background: #A96C25; }
        .l-primary:disabled { opacity: .5; cursor: default; }
        .l-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .l-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .l-in { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .l-dark-in { font: inherit; font-size: 15px; padding: 11px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.15); width: 100%; }
        .l-dark-in::placeholder { color: rgba(255,255,255,0.35); }
        .l-btn:focus-visible, .l-link:focus-visible, .l-in:focus-visible, .l-dark-in:focus-visible {
          outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .l-label { display: block; font-size: 13px; color: #57514A; margin-bottom: 5px; }
        .l-hint { font-size: 12px; color: #8A8279; margin-top: 4px; line-height: 1.5; }
        .l-field { margin-bottom: 14px; }
        .l-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .l-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        .l-row { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr 90px; gap: 12px; align-items: center; }
        @media (max-width: 760px) { .l-g2, .l-g3, .l-row { grid-template-columns: 1fr; gap: 8px; } }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="l-wrap" style={{ padding: 20 }}>
          <a href="/" className="l-serif" style={{ fontSize: 20, letterSpacing: '-0.02em', color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="l-wrap" style={{ paddingTop: 44 }}>
        <h1 className="l-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 660 }}>
          How much cash could you release this month without winning any new work?
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 640, margin: '0 0 8px' }}>
          Lock-up is work you have delivered but not billed, plus work you have billed but not collected.
          Most firms measure the second half and not the first, because unbilled time sits in a time
          recording system rather than on a balance sheet. Enter your live jobs and this works out both.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 640, margin: '0 0 32px' }}>
          Saved in this browser only. No client or financial data is uploaded anywhere.
        </p>

        {/* Firm details */}
        <div className="l-card" style={{ padding: 22, marginBottom: 22 }}>
          <div className="l-g2">
            <div className="l-field" style={{ margin: 0 }}>
              <label className="l-label">Firm name</label>
              <input className="l-in" value={firm.name} onChange={e => setFirm({ ...firm, name: e.target.value })} placeholder="For the report header" />
            </div>
            <div className="l-field" style={{ margin: 0 }}>
              <label className="l-label">Annual fee income</label>
              <input className="l-in" type="number" inputMode="decimal" value={firm.revenue}
                onChange={e => setFirm({ ...firm, revenue: e.target.value })} placeholder="£" />
              <div className="l-hint">Last twelve months. Needed to convert amounts into days.</div>
            </div>
          </div>
        </div>

        {loaded && rows.length > 0 && totals.revenue > 0 && (
          <div className="l-card" style={{ padding: '24px 26px', marginBottom: 22 }}>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 18 }}>
              <div>
                <div className="l-serif" style={{ fontSize: 34, lineHeight: 1, color: AMBER }}>
                  {money(quickWins.total)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6, maxWidth: 230 }}>
                  Releasable now by billing delivered work and collecting overdue invoices
                </div>
              </div>
              <div>
                <div className="l-serif" style={{ fontSize: 26, lineHeight: 1.1,
                  color: totals.lockup > 65 ? '#A13B2A' : totals.lockup < 45 ? '#3F6B4C' : '#57514A' }}>
                  {totals.lockup.toFixed(0)} days
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Total lock-up</div>
              </div>
              <div>
                <div className="l-serif" style={{ fontSize: 26, lineHeight: 1.1, color: '#57514A' }}>{totals.wipDays.toFixed(0)}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Unbilled days</div>
              </div>
              <div>
                <div className="l-serif" style={{ fontSize: 26, lineHeight: 1.1, color: '#57514A' }}>{totals.debtDays.toFixed(0)}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Debtor days</div>
              </div>
            </div>
            <div style={{ paddingTop: 16, borderTop: '1px solid #F0EBE2', fontSize: 14, lineHeight: 1.7, color: '#57514A' }}>
              {totals.lockup > 65
                ? `Above the 45 to 65 day range usually considered healthy. Each day costs ${money(totals.dailyRevenue)} of cash you have earned but cannot use.`
                : totals.lockup < 45
                ? `Below the typical 45 to 65 day range, which is a strong position. Each day still represents ${money(totals.dailyRevenue)}.`
                : `Within the 45 to 65 day range typical for UK professional services. Each day represents ${money(totals.dailyRevenue)}.`}
              {' '}
              {totals.wipDays > totals.debtDays
                ? 'More is stuck before invoicing than after it, so the fix is billing discipline rather than credit control.'
                : 'More is stuck after invoicing than before it, so the fix is credit control rather than billing.'}
            </div>
          </div>
        )}

        {loaded && rows.length > 0 && totals.revenue === 0 && (
          <div style={{ padding: '16px 20px', borderRadius: 8, marginBottom: 22,
            background: 'rgba(176,122,30,0.07)', border: '1px solid rgba(176,122,30,0.22)',
            fontSize: 14, color: '#8F6318', lineHeight: 1.65 }}>
            Add your annual fee income above to see lock-up in days. Without it the tool can only show cash amounts.
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <h2 className="l-serif" style={{ fontSize: 20, fontWeight: 400, margin: 0 }}>
            {jobs.length ? `Live jobs (${jobs.length})` : 'Add your first job'}
          </h2>
          {!adding && jobs.length > 0 && <button className="l-link" onClick={() => setAdding(true)}>Add another</button>}
        </div>

        {(adding || jobs.length === 0) && (
          <div className="l-card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="l-g2">
              <div className="l-field">
                <label className="l-label">Job or matter reference</label>
                <input className="l-in" value={draft.ref || ''} onChange={e => setDraft({ ...draft, ref: e.target.value })} placeholder="Project name" />
              </div>
              <div className="l-field">
                <label className="l-label">Client</label>
                <input className="l-in" value={draft.client || ''} onChange={e => setDraft({ ...draft, client: e.target.value })} placeholder="Client name" />
              </div>
            </div>
            <div className="l-g3">
              <div className="l-field">
                <label className="l-label">Work delivered to date</label>
                <input className="l-in" type="number" inputMode="decimal" value={draft.workDone || ''} onChange={e => setDraft({ ...draft, workDone: e.target.value })} placeholder="£" />
                <div className="l-hint">Value of work done, whether billed or not.</div>
              </div>
              <div className="l-field">
                <label className="l-label">Invoiced to date</label>
                <input className="l-in" type="number" inputMode="decimal" value={draft.invoiced || ''} onChange={e => setDraft({ ...draft, invoiced: e.target.value })} placeholder="£" />
              </div>
              <div className="l-field">
                <label className="l-label">Collected to date</label>
                <input className="l-in" type="number" inputMode="decimal" value={draft.paid || ''} onChange={e => setDraft({ ...draft, paid: e.target.value })} placeholder="£" />
              </div>
            </div>
            <div className="l-g3">
              <div className="l-field">
                <label className="l-label">Work last delivered</label>
                <input className="l-in" type="date" max={todayStr()} value={draft.lastWorkDate || ''}
                  onChange={e => { const v = e.target.value; if (v && v > todayStr()) return; setDraft({ ...draft, lastWorkDate: v }) }} />
              </div>
              <div className="l-field">
                <label className="l-label">Last invoice raised</label>
                <input className="l-in" type="date" max={todayStr()} value={draft.lastInvoiceDate || ''}
                  onChange={e => { const v = e.target.value; if (v && v > todayStr()) return; setDraft({ ...draft, lastInvoiceDate: v }) }} />
              </div>
              <div className="l-field">
                <label className="l-label">Payment terms</label>
                <input className="l-in" type="number" value={draft.terms || ''} onChange={e => setDraft({ ...draft, terms: e.target.value })} placeholder="30" />
                <div className="l-hint">Days.</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="l-btn l-primary" onClick={addJob} disabled={!draft.ref?.trim() || !draft.workDone}>Add job</button>
              {jobs.length > 0 && <button className="l-link" style={{ color: '#8A8279' }} onClick={() => setAdding(false)}>Cancel</button>}
            </div>
          </div>
        )}

        {rows.length > 0 && (
          <div className="l-card" style={{ padding: '8px 24px', marginBottom: 22 }}>
            <div className="l-row" style={{ padding: '12px 0', borderBottom: '2px solid #EDE7DD', fontSize: 12, color: '#8A8279' }}>
              <div>Job</div><div>Unbilled</div><div>Uncollected</div><div>Status</div><div></div>
            </div>
            {rows.map((r, i) => {
              const open = expanded === r.job.id
              return (
                <div key={r.job.id} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F4F0E8' : 'none' }}>
                  <div className="l-row" style={{ padding: '14px 0' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{r.job.ref}</div>
                      <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>{r.job.client || 'No client set'}</div>
                    </div>
                    <div style={{ fontSize: 14, color: r.wip > 0 ? '#8F6318' : '#C4BDB2' }}>
                      {r.wip > 0 ? money(r.wip) : '—'}
                      {r.wip > 0 && r.wipAge !== null && (
                        <div style={{ fontSize: 12, color: '#8A8279' }}>{r.wipAge}d old</div>
                      )}
                    </div>
                    <div style={{ fontSize: 14, color: r.debt > 0 ? '#57514A' : '#C4BDB2' }}>
                      {r.debt > 0 ? money(r.debt) : '—'}
                      {r.overdueBy > 0 && (
                        <div style={{ fontSize: 12, color: '#A13B2A' }}>{r.overdueBy}d past terms</div>
                      )}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600,
                      color: r.flag === 'overdue' ? '#A13B2A' : r.flag === 'bill' ? '#8F6318' : r.flag === 'chase' ? '#57514A' : '#3F6B4C' }}>
                      {r.flag === 'overdue' ? 'Chase' : r.flag === 'bill' ? 'Bill now' : r.flag === 'chase' ? 'Awaiting payment' : 'Clean'}
                    </div>
                    <button className="l-link" style={{ fontSize: 13, textAlign: 'right' }}
                      onClick={() => setExpanded(open ? null : r.job.id)}>{open ? 'Close' : 'Edit'}</button>
                  </div>
                  {open && (
                    <div style={{ padding: '4px 0 18px' }}>
                      <div className="l-g3">
                        <div className="l-field">
                          <label className="l-label">Work delivered</label>
                          <input className="l-in" type="number" value={r.job.workDone} onChange={e => update(r.job.id, { workDone: e.target.value })} />
                        </div>
                        <div className="l-field">
                          <label className="l-label">Invoiced</label>
                          <input className="l-in" type="number" value={r.job.invoiced} onChange={e => update(r.job.id, { invoiced: e.target.value })} />
                        </div>
                        <div className="l-field">
                          <label className="l-label">Collected</label>
                          <input className="l-in" type="number" value={r.job.paid} onChange={e => update(r.job.id, { paid: e.target.value })} />
                        </div>
                      </div>
                      <button className="l-link" style={{ color: '#8A8279' }}
                        onClick={() => { if (confirm(`Remove ${r.job.ref}?`)) remove(r.job.id) }}>Remove job</button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Paid plan */}
        {rows.length > 0 && totals.revenue > 0 && (
          <div style={{ marginTop: 26, padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
            <div className="l-serif" style={{ fontSize: 20, marginBottom: 12, letterSpacing: '-0.01em' }}>
              The plan, not just the number
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 18px', maxWidth: 570 }}>
              The cash release plan names the specific jobs to bill this week and the specific invoices to
              chase, ranked by what each releases. It also shows whether your problem is billing or
              collection, which client holds the most locked up cash, and what ten days off your lock-up
              would be worth. Written to be put in front of partners.
            </p>

            {paid ? (
              (!firmComplete || editingFirm) ? (
                <div style={{ padding: '18px 20px', borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)' }}>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: '0 0 12px' }}>
                    Add your firm name and annual fee income above to generate the plan.
                  </p>
                  <button className="l-btn l-primary" disabled={!firmComplete}
                    onClick={() => { setEditingFirm(false); if (firmComplete) openPlan() }}>
                    Generate plan
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="l-btn l-primary" onClick={openPlan}>Generate cash release plan</button>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    Opens in a new tab. Print or save as PDF.
                  </span>
                </div>
              )
            ) : (
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href={STRIPE_LINK} className="l-btn l-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Unlock the plan, {PLAN_PRICE}
                </a>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  One payment. Regenerate every month as the position changes.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Custom build */}
        <div style={{ marginTop: 22, padding: 30, borderRadius: 10, background: '#fff', border: '1px solid #E8E2D8' }}>
          {sent ? (
            <>
              <div className="l-serif" style={{ fontSize: 19, marginBottom: 8 }}>Thanks, we will be in touch.</div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: 0, maxWidth: 520 }}>
                We will come back within a working day.
              </p>
            </>
          ) : (
            <>
              <div className="l-serif" style={{ fontSize: 19, marginBottom: 10 }}>
                {jobs.length >= 10
                  ? 'This should update itself every morning'
                  : 'Typing this in monthly is not the answer'}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: '#57514A', margin: '0 0 18px', maxWidth: 570 }}>
                Every figure here already exists in your time recording and accounting systems. We connect
                to them and build the reporting layer on top, so lock-up, WIP ageing and client
                concentration are on a dashboard that refreshes itself rather than a spreadsheet somebody
                rebuilds before each partner meeting.
              </p>
              {!showForm ? (
                <button className="l-btn l-primary" onClick={() => setShowForm(true)}>Talk about automating this</button>
              ) : (
                <div>
                  <input className="l-in" type="email" placeholder="Email address" style={{ maxWidth: 320, marginBottom: 12 }}
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submitInterest() }} />
                  {sendError && <div style={{ fontSize: 13, color: '#A13B2A', marginBottom: 12 }}>{sendError}</div>}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="l-btn l-primary" onClick={submitInterest} disabled={sending}>
                      {sending ? 'Sending…' : 'Send'}
                    </button>
                    <button className="l-link" style={{ color: '#8A8279' }} onClick={() => setShowForm(false)}>Cancel</button>
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
          Lock-up here is work in progress plus debtors divided by daily fee income. It is a management
          measure and will not tie exactly to a statutory WIP valuation, which applies different
          recognition rules. Benchmarks vary by firm type and billing model.
        </p>
      </div>
    </div>
  )
}
