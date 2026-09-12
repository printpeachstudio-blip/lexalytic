'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  STAGES, GROUNDS, RIGHTS, QUALIFYING_WORKS_CAP, QLTA_CAP,
  DEMAND_DEADLINE_MONTHS, money, monthsBetween, daysBetween,
} from '@/lib/service-charge'

const STRIPE_LINK = 'https://buy.stripe.com/YOUR_SC_LINK'
const UNLOCK_PARAM = 'scp-3w9hd7'
const PAID_KEY = 'lexalytic.sc.paid.v1'
const STATE_KEY = 'lexalytic.sc.v1'

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Entry { id: string; date: string; what: string; who: string }
interface Year { id: string; year: string; amount: string; note: string }

function uid() { return Math.random().toString(36).slice(2, 9) }
function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function fmt(iso: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  return isNaN(d.getTime()) ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ServiceCharge() {
  const [bill, setBill] = useState('')
  const [leaseholders, setLeaseholders] = useState('')
  const [demandDate, setDemandDate] = useState('')
  const [workDate, setWorkDate] = useState('')
  const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | 'unsure'>>({})
  const [stageDates, setStageDates] = useState<Record<string, { served: string; deadline: string }>>({})

  const [paid, setPaid] = useState(false)
  const [me, setMe] = useState({ name: '', address: '', landlord: '', agent: '' })
  const [log, setLog] = useState<Entry[]>([])
  const [years, setYears] = useState<Year[]>([])

  useEffect(() => {
    try {
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const raw = localStorage.getItem(STATE_KEY)
      if (raw) {
        const v = JSON.parse(raw)
        setBill(v.bill || ''); setLeaseholders(v.leaseholders || '')
        setDemandDate(v.demandDate || ''); setWorkDate(v.workDate || '')
        setAnswers(v.answers || {}); setStageDates(v.stageDates || {})
        setMe(v.me || { name: '', address: '', landlord: '', agent: '' })
        setLog(v.log || []); setYears(v.years || [])
      }
      const p = new URLSearchParams(window.location.search)
      if (p.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1'); setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({
        bill, leaseholders, demandDate, workDate, answers, stageDates, me, log, years,
      }))
    } catch { /* ignore */ }
  }, [bill, leaseholders, demandDate, workDate, answers, stageDates, me, log, years])

  const analysis = useMemo(() => {
    const total = parseFloat(bill) || 0
    const n = parseInt(leaseholders, 10) || 0
    const perLeaseholder = n > 0 ? total / n : total
    const consultationRequired = perLeaseholder > QUALIFYING_WORKS_CAP

    // The 18 month rule
    const monthsLate = monthsBetween(workDate, demandDate)
    const tooLate = monthsLate !== null && monthsLate > DEMAND_DEADLINE_MONTHS

    // Notice periods
    const shortNotice: string[] = []
    STAGES.filter(s => s.days > 0).forEach(s => {
      const d = stageDates[s.id]
      if (d?.served && d?.deadline) {
        const days = daysBetween(d.served, d.deadline)
        if (days !== null && days < s.days) shortNotice.push(`${s.label} gave ${days} days rather than ${s.days}`)
      }
    })

    // Which grounds are live
    const live = GROUNDS.filter(g => answers[g.id] === 'no' || answers[g.id] === 'yes'
      ? (g.id === 'eighteen_months' ? tooLate : answers[g.id] === 'no')
      : false)

    // eighteen_months is answered by the dates rather than a question
    const liveGrounds = GROUNDS.filter(g => {
      if (g.id === 'eighteen_months') return tooLate
      if (g.id === 'short_notice') return shortNotice.length > 0 || answers[g.id] === 'no'
      return answers[g.id] === 'no'
    })

    const strong = liveGrounds.filter(g => g.strength === 'strong')

    // Capped exposure if consultation failed
    const capped = consultationRequired && strong.some(g =>
      ['no_consultation', 'short_notice', 'ignored_observations', 'estimates'].includes(g.id))
    const saving = capped && n > 0
      ? Math.max(0, perLeaseholder - QUALIFYING_WORKS_CAP)
      : 0

    return {
      total, n, perLeaseholder, consultationRequired,
      monthsLate, tooLate, shortNotice, liveGrounds, strong, capped, saving,
      answered: Object.keys(answers).length,
    }
  }, [bill, leaseholders, demandDate, workDate, answers, stageDates])

  const setAnswer = (id: string, v: 'yes' | 'no' | 'unsure') =>
    setAnswers(a => ({ ...a, [id]: v }))

  // ---- the paid letter ----
  const openLetter = useCallback(() => {
    const today = new Date().toLocaleDateString('en-GB',
      { day: 'numeric', month: 'long', year: 'numeric' })
    const groundsList = analysis.liveGrounds.map(g =>
      `<li><strong>${g.section}.</strong> ${g.label}.</li>`).join('')

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Request for information</title>
<style>@page{margin:22mm}body{font-family:Georgia,'Times New Roman',serif;max-width:700px;margin:0 auto;padding:30px;font-size:14px;line-height:1.75;color:#111}
.head{margin-bottom:30px}.right{text-align:right}p{margin:0 0 14px}ul{margin:0 0 14px;padding-left:22px}li{margin-bottom:8px}
.note{font-size:11.5px;color:#666;border-top:1px solid #ddd;padding-top:12px;margin-top:30px}
@media print{.noprint{display:none}}</style></head><body>
<div class="noprint" style="background:#1A1815;color:#fff;padding:13px 17px;border-radius:8px;margin-bottom:24px;font-family:sans-serif;font-size:13px">
  Print and choose Save as PDF, or copy the text into an email. Send it by a method you can prove, and keep a copy.
</div>

<div class="head">
<p class="right">${me.name || '[Your name]'}<br/>${(me.address || '[Your address]').replace(/\n/g, '<br/>')}</p>
<p>${me.agent || me.landlord || '[Landlord or managing agent]'}</p>
<p>${today}</p>
</div>

<p>Dear Sir or Madam</p>

<p><strong>Service charge demand${demandDate ? ` dated ${fmt(demandDate)}` : ''}${analysis.total > 0 ? ` in the sum of ${money(analysis.total)}` : ''}</strong></p>

<p>I write in connection with the above demand. I am not refusing to pay and this letter is not a dispute of the sum as such. I am exercising rights given to me by statute, and I would be grateful for your co-operation in the following.</p>

<p><strong>1. A written summary of costs, under section 21 of the Landlord and Tenant Act 1985.</strong> Please provide a written summary of the relevant costs for the last accounting period, in the form required by that section. I note that failure to provide this within the statutory period, without reasonable excuse, is a summary offence.</p>

<p><strong>2. Facilities to inspect, under section 22.</strong> Following receipt of the summary I intend to exercise my right to inspect the receipts, invoices and other documents supporting it, and to take copies. Please confirm arrangements.</p>

${analysis.liveGrounds.length ? `<p><strong>3. Matters I would like addressed.</strong> Having reviewed the demand and the correspondence, the following appear to me to require explanation:</p><ul>${groundsList}</ul><p>I may be mistaken on any of these and would welcome an explanation if so.</p>` : ''}

<p>I would be grateful for a reply within 21 days. If the matters above cannot be resolved between us, I reserve the right to apply to the First-tier Tribunal (Property Chamber) under section 27A for a determination as to whether the charge is payable and in what amount, together with an application under section 20C.</p>

<p>Yours faithfully</p>
<p>&nbsp;</p>
<p>${me.name || '[Your name]'}</p>

<p class="note">Prepared using the free service charge checker at lexalytic.com. This is a template based on rights given by the Landlord and Tenant Act 1985 and is not legal advice. Whether any of these grounds applies to your particular lease and circumstances is a question for a solicitor or for LEASE, the government funded Leasehold Advisory Service, who advise leaseholders free of charge.</p>
</body></html>`

    const w = window.open('', '_blank')
    if (w) { w.document.write(html); w.document.close() }
  }, [me, demandDate, analysis])

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .sc-wrap { max-width: 980px; margin: 0 auto; padding: 0 20px; }
        .sc-serif { font-family: Georgia, 'Times New Roman', serif; }
        .sc-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .sc-in { font: inherit; font-size: 14.5px; padding: 9px 11px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .sc-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .sc-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; background: ${AMBER}; color: #fff; }
        .sc-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .sc-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .sc-ans { font: inherit; font-size: 13.5px; padding: 7px 15px; border-radius: 6px;
          cursor: pointer; background: #fff; border: 1px solid #DDD6CC; color: #4A453F; }
        .sc-ans[aria-pressed="true"] { background: ${INK}; border-color: ${INK}; color: #fff; }
        .sc-label { display: block; font-size: 12px; color: #8A8279; margin-bottom: 4px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="sc-wrap" style={{ padding: 20 }}>
          <a href="/" className="sc-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="sc-wrap" style={{ paddingTop: 44 }}>
        <h1 className="sc-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 700 }}>
          A big service charge bill is not automatically a bill you owe
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 670, margin: '0 0 8px' }}>
          Where major works will cost any leaseholder more than {money(QUALIFYING_WORKS_CAP)}, the
          landlord has to consult properly first. If they did not, and the tribunal does not excuse it,
          they can recover {money(QUALIFYING_WORKS_CAP)} from each leaseholder and no more, whatever
          the work actually cost.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8A8279', maxWidth: 670, margin: '0 0 32px' }}>
          These are hard rules with dates attached rather than matters of opinion. This walks through
          them. Nothing is uploaded and it runs in your browser.
        </p>

        {/* The bill */}
        <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>The demand</div>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 16 }}>
            <div>
              <label className="sc-label">Total cost of the works</label>
              <input className="sc-in" type="number" min={0} value={bill}
                onChange={e => setBill(e.target.value)} placeholder="£" />
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
                For the whole block, not just your share
              </div>
            </div>
            <div>
              <label className="sc-label">How many flats share it</label>
              <input className="sc-in" type="number" min={1} value={leaseholders}
                onChange={e => setLeaseholders(e.target.value)} />
            </div>
            <div>
              <label className="sc-label">Date of the demand</label>
              <input className="sc-in" type="date" max={todayStr()} value={demandDate}
                onChange={e => setDemandDate(e.target.value)} />
            </div>
            <div>
              <label className="sc-label">When the work was done</label>
              <input className="sc-in" type="date" max={todayStr()} value={workDate}
                onChange={e => setWorkDate(e.target.value)} />
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
                Or when the cost was incurred
              </div>
            </div>
          </div>

          {analysis.total > 0 && analysis.n > 0 && (
            <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F0EBE2',
              fontSize: 15, color: '#57514A', lineHeight: 1.75 }}>
              That is <strong>{money(analysis.perLeaseholder)} each</strong>.{' '}
              {analysis.consultationRequired ? (
                <>Above the {money(QUALIFYING_WORKS_CAP)} threshold, so full consultation was required
                before the work started.</>
              ) : (
                <>Below the {money(QUALIFYING_WORKS_CAP)} threshold, so the consultation requirement
                does not apply. The charge still has to be reasonable and permitted by your lease.</>
              )}
            </div>
          )}
        </div>

        {/* The 18 month rule */}
        {analysis.monthsLate !== null && (
          <div className="sc-card" style={{ padding: '22px 26px', marginBottom: 18,
            background: analysis.tooLate ? 'rgba(63,107,76,0.05)' : '#fff',
            borderColor: analysis.tooLate ? 'rgba(63,107,76,0.25)' : '#E8E2D8' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
              The eighteen month rule
            </div>
            {analysis.tooLate ? (
              <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: 0 }}>
                <strong style={{ color: '#3F6B4C' }}>
                  The demand came {analysis.monthsLate} months after the cost was incurred.
                </strong>{' '}
                Under section 20B, costs incurred more than {DEMAND_DEADLINE_MONTHS} months before the
                demand are not recoverable, unless within that period you were notified in writing that
                the costs had been incurred and would be demanded. If no such notice was given, this is
                the strongest point available to you and it does not depend on anybody agreeing about
                what the work should have cost.
              </p>
            ) : (
              <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: 0 }}>
                {analysis.monthsLate} months between the cost being incurred and the demand, which is
                inside the {DEMAND_DEADLINE_MONTHS} month limit under section 20B. Nothing to raise here.
              </p>
            )}
          </div>
        )}

        {/* Questions */}
        <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>What happened</div>
          <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 20, maxWidth: 640, lineHeight: 1.6 }}>
            Answer what you can. Unsure is a useful answer, because it tells you what to go and look for
            rather than what to argue about.
          </div>

          {GROUNDS.filter(g => g.id !== 'eighteen_months').map(g => (
            <div key={g.id} style={{ marginBottom: 20, paddingBottom: 20,
              borderBottom: '1px solid #F4F0E8' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline',
                flexWrap: 'wrap', marginBottom: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 500, flex: '1 1 300px' }}>{g.question}</span>
                <span style={{ fontSize: 11.5, color: '#8A8279', letterSpacing: '0.03em' }}>
                  {g.section}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 7, marginBottom: 10 }}>
                {(['yes', 'no', 'unsure'] as const).map(v => (
                  <button key={v} className="sc-ans" aria-pressed={answers[g.id] === v}
                    style={{ textTransform: 'capitalize' }}
                    onClick={() => setAnswer(g.id, v)}>{v}</button>
                ))}
              </div>
              {(answers[g.id] === 'no' || answers[g.id] === 'unsure') && (
                <div style={{ fontSize: 14, color: '#57514A', lineHeight: 1.75,
                  padding: '12px 14px', borderRadius: 6, background: '#FDFCFA',
                  border: '1px solid #EDE7DD' }}>
                  {g.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Where you stand */}
        {(analysis.liveGrounds.length > 0 || analysis.answered > 2) && (
          <div className="sc-card" style={{ padding: '28px 30px', marginBottom: 20,
            background: analysis.strong.length ? 'rgba(63,107,76,0.04)' : '#fff',
            borderColor: analysis.strong.length ? 'rgba(63,107,76,0.25)' : '#E8E2D8' }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Where you stand</div>

            {analysis.capped && analysis.saving > 0 ? (
              <>
                <div className="sc-serif" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)',
                  lineHeight: 1.1, color: '#3F6B4C', marginBottom: 10 }}>
                  {money(analysis.saving)} may not be recoverable from you
                </div>
                <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 680 }}>
                  Consultation was required and appears to have been defective. Where that is the case
                  and the tribunal does not grant dispensation, recovery is capped at{' '}
                  {money(QUALIFYING_WORKS_CAP)} per leaseholder. Your share is{' '}
                  {money(analysis.perLeaseholder)}, so the difference is the figure above.
                </p>
                <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.75, margin: '0 0 16px', maxWidth: 680 }}>
                  Dispensation is frequently granted where the failure caused no real prejudice, so
                  treat this as the best case rather than the expected one. What matters is that it is
                  a genuine argument with a number attached, and it is the landlord who has to prove
                  they complied.
                </p>
              </>
            ) : analysis.strong.length > 0 ? (
              <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 680 }}>
                You have {analysis.strong.length} point{analysis.strong.length === 1 ? '' : 's'} that
                turn{analysis.strong.length === 1 ? 's' : ''} on a rule rather than an opinion. Those
                are worth raising first, because they do not require anyone to agree about what the
                work should have cost.
              </p>
            ) : (
              <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: '0 0 16px', maxWidth: 680 }}>
                Nothing here points at a procedural failure on what you have entered so far. That does
                not mean the charge is reasonable, only that the argument would be about the amount
                rather than the process, which is harder and needs evidence.
              </p>
            )}

            {analysis.liveGrounds.length > 0 && (
              <div style={{ marginTop: 8 }}>
                {analysis.liveGrounds.map(g => (
                  <div key={g.id} style={{ display: 'flex', gap: 12, alignItems: 'baseline',
                    padding: '8px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600,
                      color: g.strength === 'strong' ? '#3F6B4C' : '#8F6318',
                      border: `1px solid ${g.strength === 'strong' ? 'rgba(63,107,76,0.25)' : 'rgba(176,122,30,0.25)'}`,
                      borderRadius: 3, padding: '2px 8px', whiteSpace: 'nowrap' }}>
                      {g.strength === 'strong' ? 'Hard rule' : 'Argument'}
                    </span>
                    <span style={{ fontSize: 14.5 }}>
                      {g.label} <span style={{ color: '#8A8279' }}>· {g.section}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rights */}
        <div className="sc-card" style={{ padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
            What you can ask for, whatever happened
          </div>
          <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 660 }}>
            These do not depend on anything having gone wrong. They are rights every leaseholder has and
            most never use.
          </p>
          {RIGHTS.map(r => (
            <div key={r.id} style={{ marginBottom: 18, paddingBottom: 18,
              borderBottom: '1px solid #F7F4EF' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline',
                flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontSize: 12, color: '#8A8279' }}>{r.section}</span>
              </div>
              <div style={{ fontSize: 14.5, color: '#57514A', lineHeight: 1.8 }}>{r.detail}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 670 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 670 }}>
          This covers England and Wales and applies the Landlord and Tenant Act 1985 as amended.
          Scotland and Northern Ireland work differently. It is a way of working through published
          rules against your own dates, not legal advice, and whether any of it applies to your
          particular lease is a question for somebody who has read it. LEASE, the government funded
          Leasehold Advisory Service, advise leaseholders free of charge at lease-advice.org and are
          the right first call. Withholding payment without applying to the tribunal carries risk,
          including forfeiture in serious cases, so take advice before deciding not to pay.
        </p>
      </div>
    </div>
  )
}
