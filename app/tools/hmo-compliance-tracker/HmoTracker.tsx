'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STORAGE_KEY = 'lexalytic.hmo.tracker.v1'

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface CertType {
  key: string
  label: string
  months: number
  note: string
  criminal?: boolean
}

const CERT_TYPES: CertType[] = [
  { key: 'gas', label: 'Gas safety certificate (CP12)', months: 12, note: 'Annual. Letting without a valid certificate is a criminal offence, not a civil penalty.', criminal: true },
  { key: 'eicr', label: 'Electrical installation report (EICR)', months: 60, note: 'Every five years, and at change of tenancy in some council areas.' },
  { key: 'fire_alarm', label: 'Fire alarm service', months: 12, note: 'Annual service by a competent person. Weekly testing should also be logged.' },
  { key: 'emergency_lighting', label: 'Emergency lighting test', months: 12, note: 'Annual full duration test. Monthly function tests also required.' },
  { key: 'fire_risk', label: 'Fire risk assessment', months: 12, note: 'Review annually or whenever the property or occupancy changes.' },
  { key: 'licence', label: 'HMO licence', months: 60, note: 'Usually five years. Apply for renewal well before expiry, councils can take 12 weeks.' },
  { key: 'epc', label: 'EPC', months: 120, note: 'Ten years. Must be band E or above to let, unless a valid exemption is registered.' },
  { key: 'pat', label: 'PAT testing', months: 12, note: 'Not statutory, but expected by most councils for landlord-supplied appliances.' },
  { key: 'insurance', label: 'Landlord insurance', months: 12, note: 'Check it explicitly covers HMO use. Standard buy-to-let cover often does not.' },
]

interface Cert {
  type: string
  lastDone: string
}

interface Property {
  id: string
  name: string
  postcode: string
  certs: Cert[]
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
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((d.getTime() - today.getTime()) / 86400000)
}

function fmt(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusOf(days: number) {
  if (days < 0) return { key: 'expired', label: 'Expired', color: '#A13B2A', bg: 'rgba(161,59,42,0.07)', border: 'rgba(161,59,42,0.25)' }
  if (days <= 30) return { key: 'urgent', label: 'Due now', color: '#A13B2A', bg: 'rgba(161,59,42,0.05)', border: 'rgba(161,59,42,0.18)' }
  if (days <= 90) return { key: 'soon', label: 'Due soon', color: '#8F6318', bg: 'rgba(176,122,30,0.06)', border: 'rgba(176,122,30,0.2)' }
  return { key: 'ok', label: 'Current', color: '#3F6B4C', bg: 'transparent', border: '#EDE7DD' }
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function icsDate(d: Date): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

export default function HmoTracker() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loaded, setLoaded] = useState(false)
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newPostcode, setNewPostcode] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [enquiryType, setEnquiryType] = useState<'sync' | 'portfolio'>('sync')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProperties(JSON.parse(raw))
    } catch {
      // corrupt or unavailable storage, start clean
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
    } catch {
      // storage full or blocked, nothing we can do silently
    }
  }, [properties, loaded])

  const addProperty = () => {
    if (!newName.trim()) return
    const p: Property = {
      id: uid(),
      name: newName.trim(),
      postcode: newPostcode.trim().toUpperCase(),
      certs: [],
    }
    setProperties(prev => [...prev, p])
    setExpanded(p.id)
    setNewName('')
    setNewPostcode('')
    setAdding(false)
  }

  const removeProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id))
  }

  const setCert = (propId: string, type: string, lastDone: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id !== propId) return p
      const others = p.certs.filter(c => c.type !== type)
      if (!lastDone) return { ...p, certs: others }
      return { ...p, certs: [...others, { type, lastDone }] }
    }))
  }

  const allDue = useMemo(() => {
    const items: {
      propId: string
      propName: string
      postcode: string
      cert: CertType
      due: Date
      days: number
    }[] = []
    properties.forEach(p => {
      p.certs.forEach(c => {
        const def = CERT_TYPES.find(t => t.key === c.type)
        if (!def) return
        const due = addMonths(c.lastDone, def.months)
        if (!due) return
        items.push({
          propId: p.id, propName: p.name, postcode: p.postcode,
          cert: def, due, days: daysUntil(due),
        })
      })
    })
    return items.sort((a, b) => a.days - b.days)
  }, [properties])

  const counts = useMemo(() => ({
    expired: allDue.filter(i => i.days < 0).length,
    urgent: allDue.filter(i => i.days >= 0 && i.days <= 30).length,
    soon: allDue.filter(i => i.days > 30 && i.days <= 90).length,
  }), [allDue])

  const downloadIcs = useCallback(() => {
    if (!allDue.length) return
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lexalytic//HMO Compliance Tracker//EN',
      'CALSCALE:GREGORIAN',
    ]
    allDue.forEach((item, i) => {
      const start = new Date(item.due)
      const end = new Date(item.due)
      end.setDate(end.getDate() + 1)
      const title = `${item.cert.label} due - ${item.propName}`
      const desc = `${item.cert.note}${item.postcode ? ' Property: ' + item.postcode + '.' : ''} Tracked with Lexalytic.`
      lines.push(
        'BEGIN:VEVENT',
        `UID:lexalytic-hmo-${item.propId}-${item.cert.key}-${i}@lexalytic.com`,
        `DTSTAMP:${icsDate(new Date())}T090000Z`,
        `DTSTART;VALUE=DATE:${icsDate(start)}`,
        `DTEND;VALUE=DATE:${icsDate(end)}`,
        `SUMMARY:${title}`,
        `DESCRIPTION:${desc.replace(/\n/g, ' ')}`,
        'BEGIN:VALARM',
        'TRIGGER:-P90D',
        'ACTION:DISPLAY',
        `DESCRIPTION:${title} in 90 days`,
        'END:VALARM',
        'BEGIN:VALARM',
        'TRIGGER:-P30D',
        'ACTION:DISPLAY',
        `DESCRIPTION:${title} in 30 days`,
        'END:VALARM',
        'BEGIN:VALARM',
        'TRIGGER:-P7D',
        'ACTION:DISPLAY',
        `DESCRIPTION:${title} in 7 days`,
        'END:VALARM',
        'END:VEVENT',
      )
    })
    lines.push('END:VCALENDAR')
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hmo-compliance-dates.ics'
    a.click()
    URL.revokeObjectURL(url)
  }, [allDue])

  const submitInterest = async () => {
    if (!EMAIL_RE.test(email.trim())) {
      setSendError('Enter an email address we can reach you on.')
      return
    }
    setSending(true); setSendError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          notes: notes.trim(),
          _subject: enquiryType === 'portfolio'
            ? `HMO portfolio system enquiry - ${properties.length} properties`
            : 'HMO tracker - wants sync and email reminders',
          source: 'HMO compliance tracker',
          enquiry_type: enquiryType,
          properties_tracked: properties.length,
          dates_tracked: allDue.length,
          property_names: properties.map(p => p.name).join(', '),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setSendError('That did not send. Email hello@lexalytic.com and we will add you.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{
      background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    }}>
      <style>{`
        .t-wrap { max-width: 820px; margin: 0 auto; padding: 0 20px; }
        .t-serif { font-family: Georgia, 'Times New Roman', serif; }
        .t-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; transition: background .15s ease; }
        .t-primary { background: ${AMBER}; color: #fff; }
        .t-primary:hover { background: #A96C25; }
        .t-primary:disabled { opacity: .5; cursor: default; }
        .t-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .t-quiet:hover { border-color: #B9AF9F; }
        .t-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .t-link-quiet { color: #8A8279; }
        .t-in { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; }
        .t-dark-in { font: inherit; font-size: 15px; padding: 11px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.15); width: 100%; }
        .t-dark-in::placeholder { color: rgba(255,255,255,0.35); }
        .t-btn:focus-visible, .t-link:focus-visible, .t-in:focus-visible, .t-dark-in:focus-visible {
          outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .t-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .t-certrow { display: grid; grid-template-columns: 1fr 150px 130px; gap: 14px;
          align-items: center; padding: 13px 0; border-bottom: 1px solid #F4F0E8; }
        .t-certrow:last-child { border-bottom: 0; }
        @media (max-width: 620px) {
          .t-certrow { grid-template-columns: 1fr; gap: 6px; }
          .t-duerow { grid-template-columns: 1fr !important; gap: 4px !important; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="t-wrap" style={{ padding: 20 }}>
          <a href="/" className="t-serif" style={{ fontSize: 20, letterSpacing: '-0.02em', color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="t-wrap" style={{ paddingTop: 44 }}>
        <h1 className="t-serif" style={{
          fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.025em',
          fontWeight: 400, margin: '0 0 16px', maxWidth: 560,
        }}>
          HMO compliance dates, in one place.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 590, margin: '0 0 8px' }}>
          Add your properties and the date each certificate was last done. This works out every
          renewal date and shows you what is overdue, what is due within 30 days, and what is
          coming in the next quarter.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 590, margin: '0 0 10px' }}>
          Not sure whether your property needs a licence in the first place?{' '}
          <a href="/tools/hmo-licence-checker" style={{ color: '#C17D2E' }}>Check that first</a>.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 590, margin: '0 0 32px' }}>
          Everything is saved in this browser only. Nothing is uploaded and we cannot see it —
          which also means clearing your browser data will erase it, and it will not appear on
          another device. Export to your calendar to keep the dates somewhere permanent.
        </p>

        {loaded && allDue.length > 0 && (
          <div style={{
            display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'flex-end',
            padding: '22px 26px', marginBottom: 24, borderRadius: 10,
            background: counts.expired > 0 ? 'rgba(161,59,42,0.06)' : '#fff',
            border: `1px solid ${counts.expired > 0 ? 'rgba(161,59,42,0.22)' : '#E8E2D8'}`,
          }}>
            {([
              ['Expired', counts.expired, '#A13B2A'],
              ['Due within 30 days', counts.urgent, '#A13B2A'],
              ['Due within 90 days', counts.soon, '#8F6318'],
              ['Tracked in total', allDue.length, '#57514A'],
            ] as [string, number, string][]).map(([label, n, c]) => (
              <div key={label}>
                <div className="t-serif" style={{ fontSize: 30, lineHeight: 1, color: n > 0 ? c : '#C4BDB2' }}>{n}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>{label}</div>
              </div>
            ))}
            <button className="t-btn t-quiet" style={{ marginLeft: 'auto' }} onClick={downloadIcs}>
              Export to calendar
            </button>
          </div>
        )}

        {loaded && allDue.length > 0 && (
          <div className="t-card" style={{ padding: '6px 24px', marginBottom: 32 }}>
            {allDue.slice(0, 12).map((item, i) => {
              const st = statusOf(item.days)
              return (
                <div key={`${item.propId}-${item.cert.key}`} className="t-duerow" style={{
                  display: 'grid', gridTemplateColumns: '1fr 170px 120px', gap: 14,
                  alignItems: 'center', padding: '14px 0',
                  borderBottom: i < Math.min(allDue.length, 12) - 1 ? '1px solid #F4F0E8' : 'none',
                }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{item.cert.label}</div>
                    <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                      {item.propName}{item.postcode ? ` · ${item.postcode}` : ''}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: '#57514A' }}>{fmt(item.due)}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: st.color }}>
                    {item.days < 0 ? `${Math.abs(item.days)} days overdue` : `${item.days} days`}
                  </div>
                </div>
              )
            })}
            {allDue.length > 12 && (
              <div style={{ fontSize: 13, color: '#8A8279', padding: '12px 0' }}>
                Showing the next 12 of {allDue.length}. All of them are in the calendar export.
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <h2 className="t-serif" style={{ fontSize: 20, fontWeight: 400, margin: 0 }}>
            {properties.length ? `Your properties (${properties.length})` : 'Add your first property'}
          </h2>
          {!adding && properties.length > 0 && (
            <button className="t-link" onClick={() => setAdding(true)}>Add another</button>
          )}
        </div>

        {(adding || properties.length === 0) && (
          <div className="t-card" style={{ padding: 22, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <input
                className="t-in" style={{ flex: '2 1 220px' }} placeholder="Property name or address"
                value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addProperty() }}
              />
              <input
                className="t-in" style={{ flex: '1 1 130px' }} placeholder="Postcode"
                value={newPostcode} onChange={e => setNewPostcode(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addProperty() }}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="t-btn t-primary" onClick={addProperty} disabled={!newName.trim()}>
                Add property
              </button>
              {properties.length > 0 && (
                <button className="t-link t-link-quiet" onClick={() => { setAdding(false); setNewName(''); setNewPostcode('') }}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        )}

        {properties.map(p => {
          const open = expanded === p.id
          const propDue = allDue.filter(d => d.propId === p.id)
          const worst = propDue.length ? Math.min(...propDue.map(d => d.days)) : null
          const st = worst !== null ? statusOf(worst) : null
          return (
            <div key={p.id} className="t-card" style={{ marginBottom: 14, overflow: 'hidden' }}>
              <button
                onClick={() => setExpanded(open ? null : p.id)}
                aria-expanded={open}
                style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                  padding: '18px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  gap: 14, flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                    {p.postcode ? p.postcode + ' · ' : ''}
                    {p.certs.length ? `${p.certs.length} of ${CERT_TYPES.length} dates logged` : 'No dates logged yet'}
                  </div>
                </div>
                {st && (
                  <span style={{
                    fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 4,
                    color: st.color, background: st.bg === 'transparent' ? 'rgba(63,107,76,0.07)' : st.bg,
                    border: `1px solid ${st.border}`,
                  }}>{st.label}</span>
                )}
                <span style={{ fontSize: 13, color: '#8A8279' }}>{open ? 'Close' : 'Open'}</span>
              </button>

              {open && (
                <div style={{ padding: '4px 24px 22px', borderTop: '1px solid #F0EBE2' }}>
                  <p style={{ fontSize: 13, color: '#8A8279', margin: '14px 0 6px', lineHeight: 1.6 }}>
                    Enter the date each was last completed. Leave blank if it does not apply to this property.
                  </p>
                  {CERT_TYPES.map(ct => {
                    const cert = p.certs.find(c => c.type === ct.key)
                    const due = cert ? addMonths(cert.lastDone, ct.months) : null
                    const days = due ? daysUntil(due) : null
                    const st2 = days !== null ? statusOf(days) : null
                    return (
                      <div key={ct.key} className="t-certrow">
                        <div>
                          <div style={{ fontSize: 15 }}>
                            {ct.label}
                            {ct.criminal && (
                              <span style={{
                                fontSize: 11, fontWeight: 600, marginLeft: 8, padding: '2px 7px',
                                borderRadius: 3, color: '#A13B2A', background: 'rgba(161,59,42,0.08)',
                                border: '1px solid rgba(161,59,42,0.2)',
                              }}>Criminal offence</span>
                            )}
                          </div>
                          <div style={{ fontSize: 13, color: '#8A8279', marginTop: 3, lineHeight: 1.55 }}>{ct.note}</div>
                        </div>
                        <input
                          className="t-in" type="date" style={{ width: '100%' }}
                          value={cert?.lastDone || ''}
                          onChange={e => setCert(p.id, ct.key, e.target.value)}
                          aria-label={`${ct.label} last completed`}
                        />
                        <div style={{ fontSize: 13, color: st2 ? st2.color : '#C4BDB2' }}>
                          {due && days !== null
                            ? <>Due {fmt(due)}<br /><span style={{ fontWeight: 600 }}>
                                {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days`}
                              </span></>
                            : 'Not set'}
                        </div>
                      </div>
                    )
                  })}
                  <button
                    className="t-link t-link-quiet" style={{ marginTop: 16 }}
                    onClick={() => { if (confirm(`Remove ${p.name} and all its dates?`)) removeProperty(p.id) }}
                  >
                    Remove this property
                  </button>
                </div>
              )}
            </div>
          )
        })}

        <div style={{ marginTop: 36, padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
          {sent ? (
            <>
              <div className="t-serif" style={{ fontSize: 20, marginBottom: 10 }}>
                {enquiryType === 'portfolio' ? 'Thanks, we will be in touch.' : 'You are on the list.'}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 520 }}>
                {enquiryType === 'portfolio'
                  ? 'We will come back within a working day with some questions about how you currently manage the portfolio, and a fixed price if it looks like something we should build.'
                  : 'We will let you know when sync and email reminders are ready. Your existing dates will carry over, so nothing you have entered here is wasted.'}
              </p>
            </>
          ) : properties.length >= 5 ? (
            <>
              <div className="t-serif" style={{ fontSize: 20, marginBottom: 12, letterSpacing: '-0.01em' }}>
                {properties.length} properties is past what a browser tab should be holding.
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 8px', maxWidth: 540 }}>
                At this size the compliance dates are only part of it. Room-level rent tracking,
                arrears by room rather than by property, licence conditions per council, tenant
                records, and a maintenance history that attributes cost to the right room.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 22px', maxWidth: 540 }}>
                We build that as a single system, priced once and owned by you, rather than a
                monthly licence for software written for single-let landlords.
              </p>
              {!showForm ? (
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="t-btn t-primary" onClick={() => { setEnquiryType('portfolio'); setShowForm(true) }}>
                    Talk about a portfolio system
                  </button>
                  <button
                    onClick={() => { setEnquiryType('sync'); setShowForm(true) }}
                    style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                      color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Just tell me when sync is ready
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
                    <input
                      className="t-dark-in" type="email" placeholder="Email address" autoComplete="email"
                      value={email} onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') submitInterest() }}
                    />
                  </div>
                  {enquiryType === 'portfolio' && (
                    <textarea
                      className="t-dark-in" rows={3} placeholder="What is the most painful part right now? (optional)"
                      style={{ marginBottom: 12, resize: 'vertical' }}
                      value={notes} onChange={e => setNotes(e.target.value)}
                    />
                  )}
                  {sendError && (
                    <div style={{ fontSize: 13, color: '#E8A08F', marginBottom: 12, padding: '10px 14px',
                      borderRadius: 6, background: 'rgba(161,59,42,0.2)', maxWidth: 420 }}>{sendError}</div>
                  )}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="t-btn t-primary" onClick={submitInterest} disabled={sending}>
                      {sending ? 'Sending…' : 'Send'}
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                        color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}
                    >Cancel</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="t-serif" style={{ fontSize: 20, marginBottom: 12, letterSpacing: '-0.01em' }}>
                Want these dates somewhere safer?
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 540 }}>
                This version keeps everything on this device, which is private but fragile. We are
                building a version with a login, so your dates sync across devices and you get an
                email at 90, 30 and 7 days rather than relying on a calendar you might not check.
              </p>
              {!showForm ? (
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button className="t-btn t-primary" onClick={() => { setEnquiryType('sync'); setShowForm(true) }}>
                    Tell me when that is ready
                  </button>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    Managing five or more? Add them above and we will show you something different.
                  </span>
                </div>
              ) : (
                <div>
                  <input
                    className="t-dark-in" type="email" placeholder="Email address" autoComplete="email"
                    style={{ maxWidth: 320, marginBottom: 14 }}
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submitInterest() }}
                  />
                  {sendError && (
                    <div style={{ fontSize: 13, color: '#E8A08F', marginBottom: 12, padding: '10px 14px',
                      borderRadius: 6, background: 'rgba(161,59,42,0.2)', maxWidth: 420 }}>{sendError}</div>
                  )}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="t-btn t-primary" onClick={submitInterest} disabled={sending}>
                      {sending ? 'Sending…' : 'Register interest'}
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                        color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}
                    >Cancel</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 620 }}>
          Built by <a href="/" style={{ color: '#C17D2E' }}>Lexalytic</a>, a UK studio that builds
          websites, custom software and data systems for small businesses. These tools are free
          because the work we are paid for is the bespoke version.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 30, maxWidth: 620 }}>
          Renewal intervals are the national defaults. Your licence conditions may impose shorter
          intervals or additional requirements, so check your own licence schedule. This is a
          reminder tool, not legal or compliance advice.
        </p>
      </div>
    </div>
  )
}
