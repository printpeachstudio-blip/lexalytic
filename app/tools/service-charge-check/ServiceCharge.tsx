'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import {
  STAGES, GROUNDS, RIGHTS, QUALIFYING_WORKS_CAP, QLTA_CAP,
  DEMAND_DEADLINE_MONTHS, money, monthsBetween, daysBetween,
} from '@/lib/service-charge'

const STRIPE_LINK = 'https://buy.stripe.com/6oUdR22Gl0E2gYk1pq3AY0e'
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


        {/* PAID SECTION */}
        {!paid ? (
          <div className="sc-card" style={{ padding: '28px 30px', marginBottom: 20,
            background: INK, color: '#fff', borderColor: INK }}>
            <div className="sc-serif" style={{ fontSize: 21, marginBottom: 12 }}>
              Then actually do something about it
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
              margin: '0 0 8px', maxWidth: 620 }}>
              Knowing you have a point and being able to press it are different things. These
              challenges run for months, across letters, meetings and eventually a tribunal
              application, and the leaseholder who kept a dated record is the one who is believed.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
              margin: '0 0 22px', maxWidth: 620 }}>
              It also works considerably better as a block than as one flat, and most people have no
              idea how to get their neighbours involved.
            </p>

            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
              gap: 18, marginBottom: 26 }}>
              {[
                ['The opening letter', 'Requests the statement of costs under section 21 and notes that refusing it without reasonable excuse is an offence. Lists your specific points.'],
                ['A consultation timeline', 'What should have happened against what did, with the dates side by side. This is the document that makes a defect obvious.'],
                ['An evidence log', 'Every letter, call and meeting, dated. Printable as one record at the end.'],
                ['Year on year tracking', 'Your service charge across several years. A pattern is often a stronger argument than one bill.'],
                ['A summary for neighbours', 'One page to put through doors. A block acting together carries far more weight and shares the cost.'],
                ['Tribunal preparation', 'What a section 27A application needs, what it costs, and the section 20C order people forget to ask for.'],
              ].map(([h, p2]) => (
                <div key={h}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 5 }}>{h}</div>
                  <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
                    {p2}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href={STRIPE_LINK} className="sc-btn"
                style={{ textDecoration: 'none', display: 'inline-block' }}>
                Unlock for £29
              </a>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                One payment. Refundable within fourteen days.
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Your details */}
            <div className="sc-card sc-me" style={{ padding: '24px 26px', marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Your details</div>
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 14 }}>
                <div>
                  <label className="sc-label">Your name</label>
                  <input className="sc-in" value={me.name}
                    onChange={e => setMe({ ...me, name: e.target.value })} />
                </div>
                <div>
                  <label className="sc-label">Your address</label>
                  <input className="sc-in" value={me.address}
                    onChange={e => setMe({ ...me, address: e.target.value })}
                    placeholder="Flat 4, 12 Example Road, London" />
                </div>
                <div>
                  <label className="sc-label">Landlord or freeholder</label>
                  <input className="sc-in" value={me.landlord}
                    onChange={e => setMe({ ...me, landlord: e.target.value })} />
                </div>
                <div>
                  <label className="sc-label">Managing agent, if any</label>
                  <input className="sc-in" value={me.agent}
                    onChange={e => setMe({ ...me, agent: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Consultation timeline */}
            <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                The consultation timeline
              </div>
              <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7,
                margin: '0 0 20px', maxWidth: 650 }}>
                Put in the dates you have. Where a stage never happened, leave it blank, because a gap
                in this table is itself the point. Thirty days runs from when the notice was served on
                you rather than from the date printed on it.
              </p>

              {STAGES.map((st: any) => (
                <div key={st.id} style={{ marginBottom: 18, paddingBottom: 18,
                  borderBottom: '1px solid #F4F0E8' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline',
                    flexWrap: 'wrap', marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{st.label}</span>
                    <span style={{ fontSize: 12, color: '#8A8279' }}>{st.statutory}</span>
                    {st.days > 0 && (
                      <span style={{ fontSize: 12, color: '#8A8279' }}>
                        · at least {st.days} days
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#57514A', lineHeight: 1.7, marginBottom: 12 }}>
                    {st.what}
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ width: 170 }}>
                      <label className="sc-label">Date you received it</label>
                      <input className="sc-in" type="date" max={todayStr()}
                        value={stageDates[st.id]?.served || ''}
                        onChange={e => setStageDates(d => ({ ...d,
                          [st.id]: { ...(d[st.id] || { served: '', deadline: '' }), served: e.target.value } }))} />
                    </div>
                    {st.days > 0 && (
                      <div style={{ width: 170 }}>
                        <label className="sc-label">Deadline it gave you</label>
                        <input className="sc-in" type="date"
                          value={stageDates[st.id]?.deadline || ''}
                          onChange={e => setStageDates(d => ({ ...d,
                            [st.id]: { ...(d[st.id] || { served: '', deadline: '' }), deadline: e.target.value } }))} />
                      </div>
                    )}
                  </div>
                  {(() => {
                    const d = stageDates[st.id]
                    if (!d?.served) {
                      return (
                        <div style={{ fontSize: 13.5, color: '#8F6318', marginTop: 10, lineHeight: 1.7 }}>
                          Nothing recorded. If this stage never happened, that is one of the strongest
                          things you can say. {st.commonFailure}
                        </div>
                      )
                    }
                    if (st.days > 0 && d.deadline) {
                      const days = daysBetween(d.served, d.deadline)
                      if (days !== null && days < st.days) {
                        return (
                          <div style={{ fontSize: 14, color: '#3F6B4C', marginTop: 10,
                            lineHeight: 1.7, fontWeight: 500 }}>
                            That is {days} days rather than the {st.days} required. A short consultation
                            period is defective in the same way as no consultation at all.
                          </div>
                        )
                      }
                      return (
                        <div style={{ fontSize: 13.5, color: '#8A8279', marginTop: 10 }}>
                          {days} days, which meets the requirement.
                        </div>
                      )
                    }
                    return null
                  })()}
                </div>
              ))}
            </div>

            {/* Evidence log */}
            <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>Keep a record</div>
              <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7,
                margin: '0 0 18px', maxWidth: 650 }}>
                Every letter, email, call and meeting, written down when it happens. These run for
                months and memories diverge. Note who you spoke to, because managing agents change
                staff and the person who promised something in March may have gone by September.
              </p>

              <div className="sc-log" style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: 12, marginBottom: 12 }}>
                <div>
                  <label className="sc-label">Date</label>
                  <input className="sc-in" name="date" type="date" max={todayStr()}
                    defaultValue={todayStr()} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label className="sc-label">What happened</label>
                  <input className="sc-in" name="what"
                    placeholder="Phoned the agent, asked for the invoices, told they would call back" />
                </div>
                <div>
                  <label className="sc-label">Who with</label>
                  <input className="sc-in" name="who" placeholder="Name" />
                </div>
              </div>
              <button className="sc-btn sc-quiet" onClick={e => {
                const wrap = e.currentTarget.closest('.sc-card')!.querySelector('.sc-log') as HTMLElement
                const get = (n: string) =>
                  (wrap.querySelector(`[name=${n}]`) as HTMLInputElement)?.value || ''
                const what = get('what').trim()
                if (!what) return
                setLog(l => [...l, { id: uid(), date: get('date') || todayStr(), what, who: get('who') }])
                ;(wrap.querySelector('[name=what]') as HTMLInputElement).value = ''
              }}>Add to the record</button>

              {log.length > 0 && (
                <div style={{ marginTop: 18 }}>
                  {log.map(e2 => (
                    <div key={e2.id} style={{ display: 'grid',
                      gridTemplateColumns: '130px minmax(0, 1fr) 130px 70px', gap: 12,
                      padding: '9px 0', borderBottom: '1px solid #F7F4EF',
                      fontSize: 14, alignItems: 'baseline' }}>
                      <div style={{ color: '#8A8279' }}>{fmt(e2.date)}</div>
                      <div>{e2.what}</div>
                      <div style={{ fontSize: 13, color: '#8A8279' }}>{e2.who || ''}</div>
                      <div style={{ textAlign: 'right' }}>
                        <button className="sc-link" style={{ fontSize: 13, color: '#8A8279' }}
                          onClick={() => setLog(l => l.filter(x => x.id !== e2.id))}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button className="sc-link" style={{ marginTop: 14 }} onClick={() => {
                    const rows = log.map(e2 =>
                      `<tr><td>${fmt(e2.date)}</td><td>${e2.what}</td><td>${e2.who || ''}</td></tr>`).join('')
                    const w = window.open('', '_blank')
                    if (w) {
                      w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Record of contact</title><style>body{font-family:Georgia,serif;max-width:760px;margin:0 auto;padding:28px;font-size:13.5px;line-height:1.65}table{width:100%;border-collapse:collapse;margin:14px 0}th,td{text-align:left;padding:8px 6px;border-bottom:1px solid #ddd;vertical-align:top}th{border-bottom:2px solid #333}</style></head><body><h1>Record of contact</h1><p>${me.address || ''}</p><table><thead><tr><th>Date</th><th>What happened</th><th>Who with</th></tr></thead><tbody>${rows}</tbody></table></body></html>`)
                      w.document.close()
                    }
                  }}>Print the record</button>
                </div>
              )}
            </div>

            {/* Year on year */}
            <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                What you have paid over the years
              </div>
              <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7,
                margin: '0 0 18px', maxWidth: 650 }}>
                One high bill is arguable. A charge that has doubled in four years while the block
                visibly deteriorated is a different conversation, and the pattern is frequently the
                stronger point.
              </p>

              <div className="sc-yr" style={{ display: 'flex', gap: 12, flexWrap: 'wrap',
                alignItems: 'flex-end', marginBottom: 12 }}>
                <div style={{ width: 110 }}>
                  <label className="sc-label">Year</label>
                  <input className="sc-in" name="year" placeholder="2024" />
                </div>
                <div style={{ width: 140 }}>
                  <label className="sc-label">Total for the year</label>
                  <input className="sc-in" name="amount" type="number" min={0} />
                </div>
                <div style={{ flex: '1 1 200px' }}>
                  <label className="sc-label">Anything notable</label>
                  <input className="sc-in" name="note" placeholder="New managing agent took over" />
                </div>
                <button className="sc-btn sc-quiet" onClick={e => {
                  const wrap = e.currentTarget.closest('.sc-yr') as HTMLElement
                  const get = (n: string) =>
                    (wrap.querySelector(`[name=${n}]`) as HTMLInputElement)?.value || ''
                  if (!get('year') || !get('amount')) return
                  setYears(y => [...y, { id: uid(), year: get('year'), amount: get('amount'), note: get('note') }]
                    .sort((a, b) => a.year.localeCompare(b.year)))
                  wrap.querySelectorAll('input').forEach((x: any) => { x.value = '' })
                }}>Add</button>
              </div>

              {years.length > 1 && (
                <div style={{ marginTop: 14 }}>
                  {years.map((y, i) => {
                    const prev = i > 0 ? parseFloat(years[i - 1].amount) : null
                    const cur = parseFloat(y.amount)
                    const change = prev && prev > 0 ? ((cur - prev) / prev) * 100 : null
                    return (
                      <div key={y.id} style={{ display: 'grid',
                        gridTemplateColumns: '90px 130px 100px minmax(0, 1fr) 70px', gap: 12,
                        padding: '9px 0', borderBottom: '1px solid #F7F4EF',
                        fontSize: 14, alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 500 }}>{y.year}</div>
                        <div>{money(cur)}</div>
                        <div style={{ color: change === null ? '#C4BDB2'
                          : change > 15 ? '#A13B2A' : change > 0 ? '#8F6318' : '#3F6B4C' }}>
                          {change === null ? '' : `${change > 0 ? '+' : ''}${change.toFixed(0)}%`}
                        </div>
                        <div style={{ fontSize: 13, color: '#8A8279' }}>{y.note}</div>
                        <div style={{ textAlign: 'right' }}>
                          <button className="sc-link" style={{ fontSize: 13, color: '#8A8279' }}
                            onClick={() => setYears(l => l.filter(x => x.id !== y.id))}>Remove</button>
                        </div>
                      </div>
                    )
                  })}
                  {(() => {
                    const first = parseFloat(years[0].amount)
                    const last = parseFloat(years[years.length - 1].amount)
                    if (!first || !last) return null
                    const total = ((last - first) / first) * 100
                    return (
                      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '2px solid ' + INK,
                        fontSize: 14.5, color: '#57514A', lineHeight: 1.75 }}>
                        {total > 0 ? 'Up' : 'Down'} {Math.abs(total).toFixed(0)}% between {years[0].year} and{' '}
                        {years[years.length - 1].year}.
                        {total > 40 && ' An increase on that scale is worth asking about directly, and is a reasonable thing to raise alongside a specific bill.'}
                      </div>
                    )
                  })()}
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 18 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Documents to send</div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 16 }}>
                <button className="sc-btn" onClick={openLetter}>The opening letter</button>
                <button className="sc-btn sc-quiet" onClick={() => {
                  const rows = analysis.liveGrounds.map((g: any) =>
                    `<li><strong>${g.label}</strong> (${g.section}). ${g.detail}</li>`).join('')
                  const w = window.open('', '_blank')
                  if (w) {
                    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>For your neighbours</title><style>body{font-family:Georgia,serif;max-width:700px;margin:0 auto;padding:30px;font-size:14px;line-height:1.8}h1{font-size:22px}li{margin-bottom:14px}.box{background:#f6f4f0;padding:16px 20px;border-radius:8px;margin:20px 0}</style></head><body>
<h1>The major works bill</h1>
<p>You will have received the same demand I have${analysis.total > 0 && analysis.n > 0 ? `, of around ${money(analysis.perLeaseholder)} each` : ''}. Before anyone pays it, there are some things worth knowing.</p>
<div class="box"><p><strong>Where works cost any leaseholder more than £250, the landlord must consult properly before starting.</strong> If they did not, and the tribunal does not excuse it, they can recover £250 from each of us and no more, whatever the work cost.</p></div>
${rows ? `<p>On what I have been able to check, these look worth asking about:</p><ul>${rows}</ul>` : ''}
<p><strong>Paying does not mean accepting.</strong> Having paid a service charge is not the same as having agreed it was payable, so nobody has lost anything by having paid already.</p>
<p><strong>This works far better together.</strong> A challenge brought by the block carries more weight than one flat, the cost is shared, and the tribunal takes a collective application seriously. If enough of us are interested it is worth meeting.</p>
<p>LEASE, the government funded Leasehold Advisory Service, advise leaseholders free of charge at lease-advice.org. They are the right first call and they cost nothing.</p>
<p>&nbsp;</p>
<p>${me.name || ''}<br/>${me.address || ''}</p>
</body></html>`)
                    w.document.close()
                  }
                }}>A page for your neighbours</button>
              </div>
              <div style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, maxWidth: 640 }}>
                Send the letter by something you can prove. Put the neighbour page through doors or in
                the block WhatsApp group. Getting three or four other leaseholders interested changes
                the position considerably more than anything you can do alone.
              </div>
            </div>

            {/* Tribunal */}
            <div className="sc-card" style={{ padding: '24px 26px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
                If it gets to the tribunal
              </div>
              <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7,
                margin: '0 0 18px', maxWidth: 650 }}>
                The First-tier Tribunal (Property Chamber) decides whether a service charge is payable
                and how much. You do not need a solicitor, the fees are modest, and it is designed for
                people representing themselves.
              </p>
              {[
                ['Apply under section 27A', 'This is the application that asks the tribunal to determine whether the charge is payable and in what amount. A term in your lease trying to prevent this is void.'],
                ['Ask for a section 20C order in the same application', 'Without it the freeholder can put their legal costs of defending your challenge into next year\u2019s service charge, so you can win and still pay. One line. Leaving it out is the commonest mistake.'],
                ['Take the timeline and the record', 'Dates carry more weight than adjectives. The consultation timeline and the contact record you have built here are the documents that show what happened.'],
                ['Get your own quotes where the argument is about price', 'A challenge that the cost was unreasonable needs something to compare it against. Two quotes for comparable work are worth more than any amount of complaining.'],
                ['Speak to LEASE first', 'The government funded Leasehold Advisory Service advise leaseholders free at lease-advice.org, including on whether an application is worth making. Do this before paying anybody.'],
              ].map(([h, p2]) => (
                <div key={h} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>{h}</div>
                  <div style={{ fontSize: 14, color: '#57514A', lineHeight: 1.75 }}>{p2}</div>
                </div>
              ))}
            </div>
          </>
        )}

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
