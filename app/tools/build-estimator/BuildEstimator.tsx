'use client'

import React, { useState, useMemo, useCallback } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const AMBER = '#C17D2E'
const INK = '#1A1815'

type Shape = 'tool' | 'system' | 'platform' | ''

interface ShapeDef {
  key: Shape
  label: string
  desc: string
  base: number
  weeks: number
}

const SHAPES: ShapeDef[] = [
  {
    key: 'tool', label: 'One process, done properly', base: 2000, weeks: 2,
    desc: 'A single job the business does repeatedly. A rota, a quote builder, a tracker replacing one spreadsheet. One group of people use it, it does one thing well.',
  },
  {
    key: 'system', label: 'Several processes joined up', base: 4500, weeks: 5,
    desc: 'A custom CRM, a job management system, a portfolio tracker. Multiple linked processes, more than one kind of user, and reporting across the lot.',
  },
  {
    key: 'platform', label: 'Something your clients use too', base: 9000, weeks: 10,
    desc: 'A platform with an outside audience. Client portals, booking systems, anything where people beyond your team log in and expect it to be reliable and presentable.',
  },
]

interface Option {
  key: string
  label: string
  cost: number
  weeks: number
  why: string
}

const USER_TYPES: Option[] = [
  { key: 'u1', label: 'One group of people', cost: 0, weeks: 0, why: 'Everyone sees the same thing, so there is one interface to design and build.' },
  { key: 'u2', label: 'Two groups, different views', cost: 1200, weeks: 1, why: 'A second interface, plus the permissions logic that decides who sees what. That logic is where most of the cost sits, not the screens.' },
  { key: 'u3', label: 'Three or more groups', cost: 2600, weeks: 2, why: 'Permissions stop being a rule and become a model. Every new feature after this has to be checked against every role.' },
]

const INTEGRATIONS: Option[] = [
  { key: 'xero', label: 'Xero or QuickBooks', cost: 1200, weeks: 1, why: 'Well documented APIs, but the mapping between your data and theirs always needs deciding rather than assuming.' },
  { key: 'sage', label: 'Sage', cost: 1600, weeks: 1, why: 'More variable than Xero. Which Sage product you run changes the work considerably.' },
  { key: 'email', label: 'Automated email or SMS', cost: 700, weeks: 1, why: 'Sending is easy. Deliverability, opt outs and making sure a bug cannot send four hundred messages is the real work.' },
  { key: 'pay', label: 'Take payments', cost: 1400, weeks: 1, why: 'Stripe or GoCardless, plus reconciliation, failed payment handling and refunds. The unhappy paths are most of it.' },
  { key: 'esign', label: 'Electronic signatures', cost: 1100, weeks: 1, why: 'Usually a third party service with an audit trail requirement attached.' },
  { key: 'other', label: 'Something you already run', cost: 1800, weeks: 2, why: 'Existing systems vary enormously. If it has a modern API this is at the low end. If it does not, it is not.' },
]

const FEATURES: Option[] = [
  { key: 'docs', label: 'Upload and store documents', cost: 800, weeks: 1, why: 'Storage, access control and making sure one client cannot reach another client files.' },
  { key: 'gen', label: 'Generate documents', cost: 1000, weeks: 1, why: 'Contracts, certificates, statements. Templating plus the layout work to make the output look like it came from you.' },
  { key: 'dash', label: 'Reporting dashboard', cost: 1600, weeks: 1, why: 'The build is quick. Agreeing what the numbers mean and where they come from is what takes the time.' },
  { key: 'alerts', label: 'Deadline and renewal alerts', cost: 700, weeks: 1, why: 'Scheduled jobs, plus a rule for what happens when someone ignores three reminders.' },
  { key: 'search', label: 'Search across everything', cost: 900, weeks: 1, why: 'Cheap on hundreds of records. Different work entirely on hundreds of thousands.' },
  { key: 'audit', label: 'Full audit trail', cost: 1100, weeks: 1, why: 'Who changed what and when. Regulated sectors usually need this and it is far cheaper designed in than added later.' },
]

const MIGRATION = [
  { key: 'none', label: 'Starting fresh', cost: 0, weeks: 0, why: 'Nothing to move.' },
  { key: 'clean', label: 'One tidy spreadsheet', cost: 700, weeks: 0, why: 'A single consistent source maps across quickly.' },
  { key: 'messy', label: 'Several spreadsheets, inconsistent', cost: 2200, weeks: 2, why: 'The cleaning is the job, not the loading. Duplicates, formats and gaps all have to be resolved before anything can be imported.' },
  { key: 'system', label: 'Out of an existing system', cost: 2800, weeks: 2, why: 'Export, map, reconcile, then prove the totals match. The reconciliation is what clients care about and it is not quick.' },
]

interface Answers {
  shape: Shape
  users: string
  integrations: string[]
  features: string[]
  migration: string
}

function money(n: number): string {
  const rounded = Math.round(n / 100) * 100
  return '£' + rounded.toLocaleString('en-GB')
}

export default function BuildEstimator() {
  const [a, setA] = useState<Answers>({ shape: '', users: 'u1', integrations: [], features: [], migration: 'none' })
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState('')

  const toggle = (list: string[], key: string) =>
    list.includes(key) ? list.filter(k => k !== key) : [...list, key]

  const result = useMemo(() => {
    if (!a.shape) return null
    const shape = SHAPES.find(s => s.key === a.shape)!
    const lines: { label: string; cost: number; why: string }[] = [
      { label: shape.label, cost: shape.base, why: 'Design, core build, testing, deployment and handover.' },
    ]
    let weeks = shape.weeks

    const u = USER_TYPES.find(x => x.key === a.users)
    if (u && u.cost > 0) { lines.push({ label: u.label, cost: u.cost, why: u.why }); weeks += u.weeks }

    a.integrations.forEach(k => {
      const i = INTEGRATIONS.find(x => x.key === k)
      if (i) { lines.push({ label: i.label, cost: i.cost, why: i.why }); weeks += i.weeks }
    })
    a.features.forEach(k => {
      const f = FEATURES.find(x => x.key === k)
      if (f) { lines.push({ label: f.label, cost: f.cost, why: f.why }); weeks += f.weeks }
    })
    const m = MIGRATION.find(x => x.key === a.migration)
    if (m && m.cost > 0) { lines.push({ label: m.label, cost: m.cost, why: m.why }); weeks += m.weeks }

    const mid = lines.reduce((s, l) => s + l.cost, 0)
    const low = Math.round(mid * 0.85 / 100) * 100
    const high = Math.round(mid * 1.25 / 100) * 100
    const hosting = a.shape === 'platform' ? '£40 to £120' : a.shape === 'system' ? '£25 to £60' : '£10 to £30'

    return { lines, mid, low, high, weeks, hosting, shape }
  }, [a])

  const buildBrief = useCallback(() => {
    if (!result) return ''
    const parts: string[] = []
    parts.push('BRIEF FOR A CUSTOM BUILD')
    parts.push(org ? `Organisation: ${org}` : '')
    parts.push(`Prepared: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`)
    parts.push('')
    parts.push('SHAPE OF THE THING')
    parts.push(result.shape.label)
    parts.push(result.shape.desc)
    parts.push('')
    parts.push('WHO USES IT')
    parts.push(USER_TYPES.find(u => u.key === a.users)?.label || '')
    parts.push('')
    if (a.integrations.length) {
      parts.push('MUST CONNECT TO')
      a.integrations.forEach(k => {
        const i = INTEGRATIONS.find(x => x.key === k)
        if (i) parts.push('- ' + i.label)
      })
      parts.push('')
    }
    if (a.features.length) {
      parts.push('MUST DO')
      a.features.forEach(k => {
        const f = FEATURES.find(x => x.key === k)
        if (f) parts.push('- ' + f.label)
      })
      parts.push('')
    }
    parts.push('EXISTING DATA')
    parts.push(MIGRATION.find(m => m.key === a.migration)?.label || '')
    parts.push('')
    if (notes.trim()) {
      parts.push('NOTES')
      parts.push(notes.trim())
      parts.push('')
    }
    parts.push('INDICATIVE BUDGET')
    parts.push(`${money(result.low)} to ${money(result.high)}, around ${result.weeks} weeks.`)
    parts.push(`Ongoing hosting roughly ${result.hosting} a month.`)
    parts.push('')
    parts.push('Estimated using the Lexalytic build estimator at lexalytic.com/tools/build-estimator.')
    parts.push('Take this to any developer. A fixed quote needs a conversation, but this covers what they will ask.')
    return parts.filter(p => p !== undefined).join('\n')
  }, [result, a, org, notes])

  const downloadBrief = useCallback(() => {
    const text = buildBrief()
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const el = document.createElement('a')
    el.href = url
    el.download = 'build-brief.txt'
    el.click()
    URL.revokeObjectURL(url)
  }, [buildBrief])

  const submit = async () => {
    if (!EMAIL_RE.test(email.trim())) { setSendError('Enter an email address we can reply to.'); return }
    setSending(true); setSendError('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          organisation: org,
          notes,
          _subject: `Build enquiry - ${result ? money(result.low) + ' to ' + money(result.high) : 'no estimate'}`,
          source: 'Build estimator',
          brief: buildBrief(),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setSendError('That did not send. Email hello@lexalytic.com and we will pick it up.')
    } finally { setSending(false) }
  }

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button className="b-chip" aria-pressed={on} onClick={onClick}>{children}</button>
  )

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .b-wrap { max-width: 880px; margin: 0 auto; padding: 0 20px; }
        .b-serif { font-family: Georgia, 'Times New Roman', serif; }
        .b-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .b-q { padding: 26px 0; border-bottom: 1px solid #EDE7DD; }
        .b-q:last-child { border-bottom: 0; }
        .b-qlabel { font-size: 16px; font-weight: 600; margin-bottom: 4px; }
        .b-qhelp { font-size: 14px; color: #8A8279; margin-bottom: 14px; line-height: 1.6; }
        .b-chip { font: inherit; font-size: 14px; padding: 9px 15px; border-radius: 6px; cursor: pointer;
          background: #fff; border: 1px solid #DDD6CC; color: #4A453F; transition: all .12s ease; }
        .b-chip:hover { border-color: #B9AF9F; }
        .b-chip[aria-pressed="true"] { background: ${INK}; border-color: ${INK}; color: #fff; }
        .b-chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .b-shape { text-align: left; width: 100%; background: #fff; border: 1px solid #DDD6CC;
          border-radius: 8px; padding: 18px 20px; cursor: pointer; font: inherit; margin-bottom: 10px;
          transition: all .12s ease; }
        .b-shape:hover { border-color: #B9AF9F; }
        .b-shape[aria-pressed="true"] { border-color: ${AMBER}; background: #FFFDF9; border-width: 2px; padding: 17px 19px; }
        .b-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 12px 22px; border: 1px solid transparent; }
        .b-primary { background: ${AMBER}; color: #fff; }
        .b-primary:hover { background: #A96C25; }
        .b-primary:disabled { opacity: .5; cursor: default; }
        .b-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .b-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .b-in { font: inherit; font-size: 15px; padding: 11px 14px; border-radius: 6px;
          background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.15); width: 100%; }
        .b-in::placeholder { color: rgba(255,255,255,0.35); }
        .b-chip:focus-visible, .b-shape:focus-visible, .b-btn:focus-visible, .b-link:focus-visible, .b-in:focus-visible {
          outline: 2px solid ${AMBER}; outline-offset: 2px; }
        .b-line { display: grid; grid-template-columns: 1fr 90px; gap: 14px; padding: 14px 0;
          border-bottom: 1px solid #F4F0E8; align-items: baseline; }
        .b-line:last-child { border-bottom: 0; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="b-wrap" style={{ padding: 20 }}>
          <a href="/" className="b-serif" style={{ fontSize: 20, letterSpacing: '-0.02em', color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="b-wrap" style={{ paddingTop: 44 }}>
        <h1 className="b-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
          letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 620 }}>
          What would it actually cost to build?
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 620, margin: '0 0 8px' }}>
          Everyone answers this with it depends. Which is true, and useless. Below is what it depends on,
          what each thing adds, and why. The numbers are what we charge, not a lead in figure that grows
          once you are talking to us.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', maxWidth: 620, margin: '0 0 32px' }}>
          You can download the brief at the end and take it to anyone. It covers what any competent
          developer will ask you.
        </p>

        <div className="b-card" style={{ padding: '4px 28px', marginBottom: 26 }}>
          <div className="b-q">
            <div className="b-qlabel">What shape is it?</div>
            <div className="b-qhelp">The single biggest driver. Pick the closest, not the perfect fit.</div>
            {SHAPES.map(s => (
              <button key={s.key} className="b-shape" aria-pressed={a.shape === s.key}
                onClick={() => setA({ ...a, shape: s.key })}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>{s.label}</div>
                <div style={{ fontSize: 14, color: '#6B6459', lineHeight: 1.6 }}>{s.desc}</div>
              </button>
            ))}
          </div>

          {a.shape && (
            <>
              <div className="b-q">
                <div className="b-qlabel">Who uses it?</div>
                <div className="b-qhelp">
                  Not how many people. How many groups who need to see different things.
                </div>
                <div className="b-chips">
                  {USER_TYPES.map(u => (
                    <Chip key={u.key} on={a.users === u.key} onClick={() => setA({ ...a, users: u.key })}>{u.label}</Chip>
                  ))}
                </div>
              </div>

              <div className="b-q">
                <div className="b-qlabel">Does it need to connect to anything?</div>
                <div className="b-qhelp">Pick everything it has to talk to. Leave blank if it stands alone.</div>
                <div className="b-chips">
                  {INTEGRATIONS.map(i => (
                    <Chip key={i.key} on={a.integrations.includes(i.key)}
                      onClick={() => setA({ ...a, integrations: toggle(a.integrations, i.key) })}>{i.label}</Chip>
                  ))}
                </div>
              </div>

              <div className="b-q">
                <div className="b-qlabel">What does it need to do?</div>
                <div className="b-qhelp">Beyond storing and showing your data.</div>
                <div className="b-chips">
                  {FEATURES.map(f => (
                    <Chip key={f.key} on={a.features.includes(f.key)}
                      onClick={() => setA({ ...a, features: toggle(a.features, f.key) })}>{f.label}</Chip>
                  ))}
                </div>
              </div>

              <div className="b-q">
                <div className="b-qlabel">Where is your data now?</div>
                <div className="b-qhelp">
                  Consistently the most underestimated part of any build.
                </div>
                <div className="b-chips">
                  {MIGRATION.map(m => (
                    <Chip key={m.key} on={a.migration === m.key} onClick={() => setA({ ...a, migration: m.key })}>{m.label}</Chip>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {result && (
          <>
            <div className="b-card" style={{ padding: '28px 30px', marginBottom: 22 }}>
              <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 24,
                paddingBottom: 22, borderBottom: '2px solid ' + INK }}>
                <div>
                  <div className="b-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', lineHeight: 1, color: AMBER }}>
                    {money(result.low)} to {money(result.high)}
                  </div>
                  <div style={{ fontSize: 13, color: '#8A8279', marginTop: 8 }}>
                    Fixed price, agreed before anything starts
                  </div>
                </div>
                <div>
                  <div className="b-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>~{result.weeks} weeks</div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>From brief to live</div>
                </div>
                <div>
                  <div className="b-serif" style={{ fontSize: 24, lineHeight: 1.1, color: '#57514A' }}>{result.hosting}</div>
                  <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Hosting per month</div>
                </div>
              </div>

              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>What makes it that</div>
              <div style={{ fontSize: 14, color: '#8A8279', marginBottom: 12, lineHeight: 1.6 }}>
                Every line below moves the number. This is the part nobody shows you.
              </div>

              {result.lines.map((l, i) => (
                <div key={i} className="b-line">
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{l.label}</div>
                    <div style={{ fontSize: 13.5, color: '#6B6459', lineHeight: 1.6, marginTop: 3 }}>{l.why}</div>
                  </div>
                  <div style={{ fontSize: 15, textAlign: 'right', color: '#57514A' }}>{money(l.cost)}</div>
                </div>
              ))}

              <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid #EDE7DD',
                fontSize: 14, color: '#6B6459', lineHeight: 1.7 }}>
                The range exists because scoping properly changes things. Occasionally a requirement turns out
                to be simpler than it sounded and the number comes down. More often something surfaces in the
                scoping call that nobody had thought about. Either way you get a fixed price in writing before
                any work starts, and it does not move afterwards unless you change what you asked for.
              </div>
            </div>

            <div className="b-card" style={{ padding: '24px 28px', marginBottom: 22 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>What is not in the number</div>
              <ul style={{ fontSize: 14, color: '#57514A', lineHeight: 1.85, paddingLeft: 20, margin: 0 }}>
                <li>Content and copy. If the thing needs writing, that is yours or a separate cost.</li>
                <li>Third party licences. Stripe fees, an e-signature service, an SMS provider.</li>
                <li>Ongoing development after handover. Support during the first month is included, changes after that are quoted separately or covered by a retainer.</li>
                <li>Anything you add once we have started, which is quoted before it is built rather than appearing on the invoice.</li>
              </ul>
            </div>

            <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
              {sent ? (
                <>
                  <div className="b-serif" style={{ fontSize: 20, marginBottom: 10 }}>Got it.</div>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: 0, maxWidth: 520 }}>
                    Your brief came through with the enquiry. We will come back within a working day, usually
                    with a couple of questions before quoting rather than a price pulled out of the air.
                  </p>
                </>
              ) : (
                <>
                  <div className="b-serif" style={{ fontSize: 20, marginBottom: 12 }}>Take the brief anywhere</div>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 560 }}>
                    Download it and send it to three developers if you want. It covers what any of them will
                    ask, and a written brief gets you better quotes than a conversation about roughly what you
                    are after. If you would rather we quoted it, send it over.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
                    <input className="b-in" placeholder="Your organisation" value={org} onChange={e => setOrg(e.target.value)} />
                    <input className="b-in" type="email" placeholder="Email address" value={email}
                      onChange={e => setEmail(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') submit() }} />
                  </div>
                  <textarea className="b-in" rows={3} placeholder="Anything the questions above did not cover (optional)"
                    style={{ marginBottom: 14, resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} />
                  {sendError && (
                    <div style={{ fontSize: 13, color: '#E8A08F', marginBottom: 12, padding: '10px 14px',
                      borderRadius: 6, background: 'rgba(161,59,42,0.2)' }}>{sendError}</div>
                  )}
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                    <button className="b-btn b-primary" onClick={submit} disabled={sending}>
                      {sending ? 'Sending…' : 'Send it to us for a fixed quote'}
                    </button>
                    <button className="b-btn b-quiet" onClick={downloadBrief}>Download the brief</button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {!a.shape && (
          <p style={{ fontSize: 14, color: '#8A8279', marginTop: 8 }}>
            Pick a shape to see the rest.
          </p>
        )}

        <div style={{ padding: 30, borderRadius: 10, background: '#1A1815', color: '#fff', marginTop: 8 }}>

          <div style={{ fontFamily: 'Georgia, serif', fontSize: 21, marginBottom: 12, letterSpacing: '-0.01em' }}>

            That figure is the starting point for a conversation, not a quote

          </div>

          <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: 580 }}>

            The brief you can download says what you want built and why. Send it to three developers if you like. If you would rather talk it through, a half hour call costs nothing and we will tell you honestly whether it is worth building at all, which is sometimes no.

          </p>

          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>

            <a href="/#contact" style={{ font: 'inherit', fontSize: 15, fontWeight: 500, borderRadius: 6, padding: '12px 22px', background: '#C17D2E', color: '#fff', textDecoration: 'none', display: 'inline-block' }}>

              Book a free call

            </a>

            <a href="/about" style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Or read how we work</a>

          </div>

        </div>

        

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 30, maxWidth: 640 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our{' '}
          <a href="/tools" style={{ color: AMBER }}>other free tools</a>, several of which started as
          exactly this kind of build for a client.
        </p>

        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 18, maxWidth: 640 }}>
          These are indicative ranges based on projects we have delivered. A firm price needs a
          conversation, because the thing that changes an estimate most is a requirement nobody mentioned
          until it came up.
        </p>
      </div>
    </div>
  )
}
