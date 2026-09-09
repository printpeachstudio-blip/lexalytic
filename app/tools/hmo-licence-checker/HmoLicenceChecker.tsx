'use client'

import React, { useState, useMemo } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Nation = 'england' | 'wales' | 'scotland' | 'ni' | ''

interface Room {
  id: number
  size: string
  occupants: string
}

const AMBER = '#C17D2E'
const INK = '#1A1815'

function nationRules(nation: Nation) {
  switch (nation) {
    case 'england':
      return {
        label: 'England',
        threshold: 5,
        rule: 'Five or more occupants forming two or more households, sharing facilities.',
        law: 'Housing Act 2004, as amended by the 2018 Licensing Order',
        additional: true,
      }
    case 'wales':
      return {
        label: 'Wales',
        threshold: 5,
        rule: 'Five or more occupants forming two or more households, sharing facilities. All landlords must also register with Rent Smart Wales regardless of size.',
        law: 'Housing Act 2004 and Housing (Wales) Act 2014',
        additional: true,
      }
    case 'scotland':
      return {
        label: 'Scotland',
        threshold: 3,
        rule: 'Three or more unrelated occupants sharing facilities. The threshold is lower than England.',
        law: 'Housing (Scotland) Act 2006',
        additional: false,
      }
    case 'ni':
      return {
        label: 'Northern Ireland',
        threshold: 3,
        rule: 'Three or more occupants from two or more households. Licensing is administered centrally by the NIHE, not by individual councils.',
        law: 'Houses in Multiple Occupation Act (Northern Ireland) 2016',
        additional: false,
      }
    default:
      return null
  }
}

// Room size rules (England mandatory licence conditions, 2018 Regulations)
function roomVerdict(sqm: number) {
  if (!isFinite(sqm) || sqm <= 0) return null
  if (sqm < 4.64) return { max: 0, note: 'Cannot be used as sleeping accommodation at all.', severity: 'critical' as const }
  if (sqm < 6.51) return { max: 0, note: 'Too small for anyone aged 10 or over. Usable only by one child under 10.', severity: 'critical' as const }
  if (sqm < 10.22) return { max: 1, note: 'Large enough for one adult. Below the 10.22 m² needed for two.', severity: 'ok' as const }
  return { max: 2, note: 'Large enough for two adults sharing.', severity: 'ok' as const }
}

export default function HmoLicenceChecker() {
  const [nation, setNation] = useState<Nation>('')
  const [occupants, setOccupants] = useState('')
  const [households, setHouseholds] = useState('')
  const [shared, setShared] = useState<string>('')
  const [showRooms, setShowRooms] = useState(false)
  const [rooms, setRooms] = useState<Room[]>([{ id: 1, size: '', occupants: '1' }])

  const [showForm, setShowForm] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')
  const [email, setEmail] = useState('')
  const [propCount, setPropCount] = useState('')

  const rules = nationRules(nation)
  const occ = parseInt(occupants, 10)
  const hh = parseInt(households, 10)

  const ready = Boolean(nation && occupants && households && shared)

  const verdict = useMemo(() => {
    if (!ready || !rules) return null
    const sharesFacilities = shared === 'yes'
    if (!sharesFacilities) {
      return {
        needed: false,
        headline: 'Probably not an HMO',
        body: 'If every unit is fully self-contained with its own kitchen and bathroom, the property is not an HMO in the normal sense. Converted blocks of flats can still fall under section 257 if the conversion did not meet 1991 Building Regulations and fewer than two thirds are owner-occupied. That is a specific test worth checking with your council.',
        tone: 'neutral' as const,
      }
    }
    if (hh < 2) {
      return {
        needed: false,
        headline: 'Not an HMO',
        body: 'A single household — one family or one group related by blood, marriage or civil partnership — is not an HMO however many people live there. If any occupant is unrelated to the others, count them as a separate household and check again.',
        tone: 'neutral' as const,
      }
    }
    if (occ >= rules.threshold) {
      return {
        needed: true,
        headline: 'A mandatory licence is required',
        body: `${occ} occupants from ${hh} households sharing facilities meets the mandatory licensing threshold in ${rules.label}. This is not discretionary and does not depend on the number of storeys. Operating without a licence is a criminal offence.`,
        tone: 'required' as const,
      }
    }
    return {
      needed: false,
      headline: 'No mandatory licence — but check your council',
      body: `${occ} occupants is below the mandatory threshold of ${rules.threshold} in ${rules.label}. However, more than 70 councils operate additional licensing schemes covering smaller HMOs of three or four occupants, and selective licensing schemes that cover every private rental in a designated area. Your council may require a licence regardless of the national threshold.`,
      tone: 'check' as const,
    }
  }, [ready, rules, occ, hh, shared])

  const roomAnalysis = useMemo(() => {
    const parsed = rooms
      .map(r => ({ ...r, sqm: parseFloat(r.size) }))
      .filter(r => isFinite(r.sqm) && r.sqm > 0)
    if (!parsed.length) return null
    let lawfulMax = 0
    let unusable = 0
    let childOnly = 0
    parsed.forEach(r => {
      const v = roomVerdict(r.sqm)
      if (!v) return
      if (r.sqm < 4.64) unusable++
      else if (r.sqm < 6.51) childOnly++
      lawfulMax += v.max
    })
    return { parsed, lawfulMax, unusable, childOnly, count: parsed.length }
  }, [rooms])

  const addRoom = () => setRooms(r => [...r, { id: Date.now(), size: '', occupants: '1' }])
  const removeRoom = (id: number) => setRooms(r => r.filter(x => x.id !== id))
  const updateRoom = (id: number, size: string) =>
    setRooms(r => r.map(x => (x.id === id ? { ...x, size } : x)))

  const submitInterest = async () => {
    if (!EMAIL_RE.test(email.trim())) {
      setSendError('Enter an email address we can reach you on.')
      return
    }
    setSending(true)
    setSendError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          properties: propCount,
          _subject: 'HMO compliance tracker - register interest',
          source: 'HMO licence checker',
          checker_result: verdict
            ? `${verdict.headline} | ${rules?.label} | ${occupants} occupants, ${households} households`
            : 'not completed',
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

  const reset = () => {
    setNation(''); setOccupants(''); setHouseholds(''); setShared('')
    setShowRooms(false); setRooms([{ id: 1, size: '', occupants: '1' }])
    setShowForm(false); setSent(false); setSendError(''); setEmail(''); setPropCount('')
  }

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .hmo-wrap { max-width: 760px; margin: 0 auto; padding: 0 20px; }
        .hmo-serif { font-family: Georgia, 'Times New Roman', serif; }
        .hmo-q { padding: 26px 0; border-bottom: 1px solid #EDE7DD; }
        .hmo-q:last-of-type { border-bottom: 0; }
        .hmo-qlabel { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
        .hmo-qhelp { font-size: 14px; color: #8A8279; margin-bottom: 14px; line-height: 1.6; }
        .hmo-opts { display: flex; gap: 8px; flex-wrap: wrap; }
        .hmo-opt {
          font: inherit; font-size: 15px; padding: 9px 16px; border-radius: 6px; cursor: pointer;
          background: #fff; border: 1px solid #DDD6CC; color: #4A453F; transition: all .12s ease;
        }
        .hmo-opt:hover { border-color: #B9AF9F; }
        .hmo-opt[aria-pressed="true"] { background: ${INK}; border-color: ${INK}; color: #fff; }
        .hmo-num {
          font: inherit; font-size: 15px; padding: 10px 14px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 110px;
        }
        .hmo-input {
          font: inherit; font-size: 15px; padding: 11px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.06); color: #fff;
          border: 1px solid rgba(255,255,255,0.15); width: 100%;
        }
        .hmo-input::placeholder { color: rgba(255,255,255,0.35); }
        .hmo-btn {
          font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 12px 22px; border: 1px solid transparent; transition: background .15s ease;
        }
        .hmo-primary { background: ${AMBER}; color: #fff; }
        .hmo-primary:hover { background: #A96C25; }
        .hmo-primary:disabled { opacity: .55; cursor: default; }
        .hmo-quiet { background: transparent; color: #55504A; border-color: #DDD6CC; }
        .hmo-link {
          background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px;
        }
        .hmo-opt:focus-visible, .hmo-btn:focus-visible, .hmo-link:focus-visible,
        .hmo-num:focus-visible, .hmo-input:focus-visible {
          outline: 2px solid ${AMBER}; outline-offset: 2px;
        }
        .hmo-fact { display: grid; grid-template-columns: 150px 1fr; gap: 16px; padding: 14px 0;
          border-bottom: 1px solid #F0EBE2; font-size: 14px; line-height: 1.65; }
        .hmo-fact:last-child { border-bottom: 0; }
        .hmo-factkey { color: #8A8279; }
        @media (max-width: 560px) {
          .hmo-fact { grid-template-columns: 1fr; gap: 4px; }
        }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="hmo-wrap" style={{ padding: '20px' }}>
          <a href="/" className="hmo-serif" style={{ fontSize: 20, letterSpacing: '-0.02em', color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="hmo-wrap" style={{ paddingTop: 48 }}>
        <h1 className="hmo-serif" style={{
          fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.025em',
          fontWeight: 400, margin: '0 0 16px', maxWidth: 560,
        }}>
          Do you need an HMO licence?
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 580, margin: '0 0 6px' }}>
          Four questions. The answer depends on how many people live there, how many
          separate households they form, and whether they share a kitchen or bathroom.
          Not on how many floors the building has.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 580, margin: '0 0 32px' }}>
          Operating an unlicensed HMO carries a civil penalty of up to £30,000, a rent repayment
          order of up to 12 months, and makes any section 21 notice invalid.
        </p>

        <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10, padding: '4px 28px' }}>
          <div className="hmo-q">
            <div className="hmo-qlabel">Where is the property?</div>
            <div className="hmo-qhelp">The threshold is lower in Scotland and Northern Ireland.</div>
            <div className="hmo-opts">
              {([['england', 'England'], ['wales', 'Wales'], ['scotland', 'Scotland'], ['ni', 'Northern Ireland']] as [Nation, string][]).map(([v, l]) => (
                <button key={v} className="hmo-opt" aria-pressed={nation === v} onClick={() => setNation(v)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="hmo-q">
            <div className="hmo-qlabel">How many people live there in total?</div>
            <div className="hmo-qhelp">Count everyone who occupies the property as their main residence, including children.</div>
            <input
              className="hmo-num" type="number" min={1} max={30} inputMode="numeric"
              value={occupants} onChange={e => setOccupants(e.target.value)} placeholder="e.g. 5"
            />
          </div>

          <div className="hmo-q">
            <div className="hmo-qlabel">How many separate households is that?</div>
            <div className="hmo-qhelp">
              A household is one person, or a group related by blood, marriage or civil partnership.
              Five unrelated sharers are five households. A couple plus three friends is four.
            </div>
            <input
              className="hmo-num" type="number" min={1} max={30} inputMode="numeric"
              value={households} onChange={e => setHouseholds(e.target.value)} placeholder="e.g. 5"
            />
          </div>

          <div className="hmo-q">
            <div className="hmo-qlabel">Do they share a kitchen, bathroom or toilet?</div>
            <div className="hmo-qhelp">If every unit is fully self-contained, different rules apply.</div>
            <div className="hmo-opts">
              <button className="hmo-opt" aria-pressed={shared === 'yes'} onClick={() => setShared('yes')}>Yes, shared</button>
              <button className="hmo-opt" aria-pressed={shared === 'no'} onClick={() => setShared('no')}>No, self-contained</button>
            </div>
          </div>
        </div>

        {verdict && rules && (
          <>
            <div style={{
              marginTop: 32, padding: '32px 28px', borderRadius: 10,
              background: verdict.tone === 'required' ? 'rgba(161,59,42,0.06)' : verdict.tone === 'check' ? 'rgba(176,122,30,0.07)' : 'rgba(74,124,89,0.06)',
              border: `1px solid ${verdict.tone === 'required' ? 'rgba(161,59,42,0.25)' : verdict.tone === 'check' ? 'rgba(176,122,30,0.25)' : 'rgba(74,124,89,0.22)'}`,
            }}>
              <div className="hmo-serif" style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', lineHeight: 1.2, marginBottom: 14,
                color: verdict.tone === 'required' ? '#A13B2A' : verdict.tone === 'check' ? '#8F6318' : '#3F6B4C',
              }}>
                {verdict.headline}
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#3E3934', margin: 0 }}>
                {verdict.body}
              </p>
              <div style={{ fontSize: 13, color: '#8A8279', marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                {rules.rule} Under the {rules.law}.
              </div>
            </div>

            {verdict.needed && (
              <div style={{ marginTop: 36 }}>
                <h2 className="hmo-serif" style={{ fontSize: 20, fontWeight: 400, margin: '0 0 4px' }}>What that means in practice</h2>
                <p style={{ fontSize: 14, color: '#8A8279', margin: '0 0 18px' }}>
                  Figures vary by council. These are the typical ranges across England.
                </p>
                <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10, padding: '6px 24px' }}>
                  {[
                    ['Licence fee', '£500 to £1,500 for a five-year licence. Most councils sit between £600 and £1,100. Several London boroughs charge per habitable room and exceed £2,000.'],
                    ['Licence term', 'Up to five years. Councils can issue shorter licences where they have concerns about management or condition.'],
                    ['Per property', 'One licence per property. A portfolio of six HMOs needs six licences, each with its own renewal date.'],
                    ['Documents needed', 'Gas safety certificate, EICR, floor plan with room measurements, fire risk assessment, EPC, and evidence of management arrangements.'],
                    ['Timeline', 'Councils typically inspect within six weeks and decide within twelve. Apply well before you intend to let.'],
                    ['If you do not', 'Civil penalty up to £30,000, or unlimited fine on prosecution. Tenants can claim a rent repayment order of up to 12 months. Any section 21 notice you serve is invalid.'],
                  ].map(([k, v]) => (
                    <div key={k} className="hmo-fact">
                      <div className="hmo-factkey">{k}</div>
                      <div>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rules.additional && !verdict.needed && verdict.tone === 'check' && (
              <div style={{
                marginTop: 20, padding: '20px 22px', borderRadius: 8,
                background: '#fff', border: '1px solid #E8E2D8',
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>How to check your council</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: '#57514A' }}>
                  Search for your council name plus &ldquo;additional licensing&rdquo; and &ldquo;selective licensing&rdquo;.
                  Both are area-designated, so a scheme may cover one street and not the next.
                  Also check for an Article 4 direction, which removes permitted development rights
                  for converting a house into a small HMO and means you would need planning permission.
                </div>
              </div>
            )}

            <div style={{ marginTop: 36 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
                <h2 className="hmo-serif" style={{ fontSize: 20, fontWeight: 400, margin: 0 }}>
                  Check your room sizes
                </h2>
                {!showRooms && (
                  <button className="hmo-link" onClick={() => setShowRooms(true)}>Open the calculator</button>
                )}
              </div>
              <p style={{ fontSize: 14, color: '#8A8279', margin: '0 0 18px', maxWidth: 580, lineHeight: 1.65 }}>
                Licence conditions set a minimum size for any room used for sleeping. A room that fails
                cannot count toward your licensed occupancy, which directly reduces the rent the property can lawfully produce.
              </p>

              {showRooms && (
                <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10, padding: 24 }}>
                  <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 14 }}>
                    Enter the floor area of each bedroom in square metres.
                  </div>
                  {rooms.map((r, i) => {
                    const sqm = parseFloat(r.size)
                    const v = roomVerdict(sqm)
                    return (
                      <div key={r.id} style={{
                        display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
                        padding: '10px 0', borderBottom: i < rooms.length - 1 ? '1px solid #F4F0E8' : 'none',
                      }}>
                        <span style={{ fontSize: 14, color: '#8A8279', width: 60 }}>Room {i + 1}</span>
                        <input
                          className="hmo-num" type="number" step="0.01" min={0} inputMode="decimal"
                          style={{ width: 100 }} placeholder="m²"
                          value={r.size} onChange={e => updateRoom(r.id, e.target.value)}
                        />
                        {v && (
                          <span style={{
                            fontSize: 13, flex: 1, minWidth: 200,
                            color: v.severity === 'critical' ? '#A13B2A' : '#57514A',
                          }}>
                            {v.note}
                          </span>
                        )}
                        {rooms.length > 1 && (
                          <button className="hmo-link" onClick={() => removeRoom(r.id)} aria-label={`Remove room ${i + 1}`}>Remove</button>
                        )}
                      </div>
                    )
                  })}
                  <button className="hmo-link" style={{ marginTop: 14 }} onClick={addRoom}>Add another room</button>

                  {roomAnalysis && roomAnalysis.lawfulMax > 0 && (
                    <div style={{
                      marginTop: 20, paddingTop: 18, borderTop: '2px solid ' + INK,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                        <span className="hmo-serif" style={{ fontSize: 30, color: AMBER, lineHeight: 1 }}>
                          {roomAnalysis.lawfulMax}
                        </span>
                        <span style={{ fontSize: 15, color: '#3E3934' }}>
                          adults can lawfully sleep across {roomAnalysis.count} room{roomAnalysis.count > 1 ? 's' : ''}
                        </span>
                      </div>
                      {(roomAnalysis.unusable > 0 || roomAnalysis.childOnly > 0) && (
                        <div style={{ fontSize: 14, color: '#A13B2A', marginTop: 10, lineHeight: 1.65 }}>
                          {roomAnalysis.unusable > 0 && `${roomAnalysis.unusable} room${roomAnalysis.unusable > 1 ? 's are' : ' is'} below 4.64 m² and cannot be slept in at all. `}
                          {roomAnalysis.childOnly > 0 && `${roomAnalysis.childOnly} room${roomAnalysis.childOnly > 1 ? 's are' : ' is'} usable only by a child under 10.`}
                        </div>
                      )}
                      {isFinite(occ) && roomAnalysis.lawfulMax < occ && (
                        <div style={{
                          marginTop: 14, padding: '14px 16px', borderRadius: 6,
                          background: 'rgba(161,59,42,0.07)', border: '1px solid rgba(161,59,42,0.2)',
                          fontSize: 14, lineHeight: 1.65, color: '#8C3427',
                        }}>
                          You told us {occ} people live there, but these rooms lawfully accommodate {roomAnalysis.lawfulMax}.
                          A council inspection would find the property overcrowded against its licence conditions.
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ marginTop: 18, fontSize: 13, color: '#8A8279', lineHeight: 1.6 }}>
                    National minimums: 6.51 m² for one person aged 10 or over, 10.22 m² for two,
                    4.64 m² for one child under 10. Many councils set higher standards than these.
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 36, padding: 32, borderRadius: 10, background: INK, color: '#fff' }}>
              {sent ? (
                <>
                  <div className="hmo-serif" style={{ fontSize: 21, marginBottom: 10 }}>You are on the list.</div>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 520 }}>
                    We will email you when the compliance tracker is ready. If you would rather talk about
                    something built around your specific portfolio, reply to that email and say so.
                  </p>
                </>
              ) : (
                <>
                  <div className="hmo-serif" style={{ fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>
                    Knowing you need a licence is the easy part.
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 8px', maxWidth: 540 }}>
                    Keeping it is the work. Gas certificate every year. EICR every five. Fire alarm
                    service annually, emergency lighting monthly, licence renewal on a five-year cycle,
                    plus whatever conditions your specific licence schedule adds.
                  </p>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 22px', maxWidth: 540 }}>
                    Miss the gas certificate and it is a criminal offence, not a fine. We are building a
                    tracker that holds every date across a portfolio and warns you at 90, 30 and 7 days.
                  </p>

                  {!showForm ? (
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                      <button className="hmo-btn hmo-primary" onClick={() => setShowForm(true)}>
                        Tell me when it is ready
                      </button>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                        No cost to register interest.
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 14 }}>
                        <input
                          className="hmo-input" type="email" placeholder="Email address" autoComplete="email"
                          value={email} onChange={e => setEmail(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') submitInterest() }}
                        />
                        <input
                          className="hmo-input" type="text" placeholder="How many properties?"
                          value={propCount} onChange={e => setPropCount(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') submitInterest() }}
                        />
                      </div>
                      {sendError && (
                        <div style={{
                          fontSize: 13, color: '#E8A08F', marginBottom: 12, padding: '10px 14px',
                          borderRadius: 6, background: 'rgba(161,59,42,0.2)',
                        }}>{sendError}</div>
                      )}
                      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                        <button className="hmo-btn hmo-primary" onClick={submitInterest} disabled={sending}>
                          {sending ? 'Sending…' : 'Register interest'}
                        </button>
                        <button
                          onClick={() => setShowForm(false)}
                          style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
                            color: 'rgba(255,255,255,0.45)', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="hmo-btn hmo-quiet" onClick={reset}>Check another property</button>
            </div>

            <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 32, maxWidth: 620 }}>
              This tool covers the national mandatory licensing rules. Additional and selective licensing
              schemes are set locally and change regularly, so always confirm with your own council before
              relying on this. It is guidance, not legal advice.
            </p>
          </>
        )}

        {!verdict && (
          <p style={{ fontSize: 14, color: '#8A8279', marginTop: 24 }}>
            Answer all four to see the result.
          </p>
        )}
      </div>
    </div>
  )
}
