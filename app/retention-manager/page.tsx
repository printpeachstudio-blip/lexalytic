import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/retention-manager' },
  title: 'Retention Manager | Track and Recover Construction Retention | Lexalytic',
  description: 'Software for UK subcontractors that tracks retention across every job, emails you before each release falls due, and generates a formal application for release when it does not arrive. From £19 a month, 14 days free.',
  keywords: 'retention management software UK, construction retention tracking, retention release reminders, subcontractor retention software, application for release of retention, retention chasing software',
  openGraph: {
    title: 'Retention Manager | Track and Recover Construction Retention',
    description: 'Retention is rarely disputed. It is forgotten. This makes sure it is not.',
    url: 'https://www.lexalytic.com/retention-manager',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lexalytic Retention Manager',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Retention tracking for UK construction subcontractors. Calculates both release dates, sends reminders before each falls due, and generates formal applications for release with statutory interest.',
  offers: [
    { '@type': 'Offer', name: 'Solo', price: '19', priceCurrency: 'GBP',
      description: 'One user, unlimited jobs' },
    { '@type': 'Offer', name: 'Team', price: '39', priceCurrency: 'GBP',
      description: 'Up to ten users on one account' },
  ],
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does Retention Manager do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It records every job where retention is held, works out both release dates from the practical completion date, and emails you at 90, 30 and 7 days before each one falls due. When something is overdue it calculates the statutory interest and generates a formal application for release citing the Construction Act.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nineteen pounds a month for one user with unlimited jobs, or thirty nine pounds a month for up to ten people on one account. There is a fourteen day free trial and no card is needed to start. Cancel any time with no notice period.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my data if I cancel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nothing is deleted. You keep access until the end of the period you have paid for and can export everything to CSV before then. If you resubscribe later it picks up where it left off.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a free version?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free retention tracker calculates release dates and exports them to your calendar, with everything stored in your browser. The paid version adds email reminders, application letters generated from your data, part payment tracking, certification history and multi-user access.',
      },
    },
  ],
}

export default function RetentionManagerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />

      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', height: '68px' }}>
            <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px',
              color: 'var(--ink)', letterSpacing: '-0.03em' }}>
              Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
            </Link>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
              <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Free Tools</Link>
              <Link href="/signin" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Sign in</Link>
              <Link href="/signup" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                Start free trial
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ paddingTop: '150px', paddingBottom: '80px', background: 'var(--bg-dark)',
          position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px', pointerEvents: 'none' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)',
              borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>
                Retention Manager · From £19 a month
              </span>
            </div>

            <h1 style={{ color: 'var(--white)', maxWidth: '760px', marginBottom: '24px',
              lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Retention is rarely disputed.<br />
              <em style={{ color: 'var(--amber)' }}>It is forgotten.</em>
            </h1>

            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
              maxWidth: '620px', marginBottom: '36px', fontWeight: '300', lineHeight: '1.75' }}>
              The second half falls due twelve months after practical completion, by which point the job
              is closed, the file is archived and nobody is watching the contract. This makes sure
              somebody is.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link href="/signup" className="btn-amber">Start a 14 day trial →</Link>
              <Link href="/tools/retention-tracker" className="btn-secondary"
                style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>
                Try the free version first
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[
                ['No card', 'needed to start'],
                ['Cancel', 'any time, no notice'],
                ['Your data', 'exportable, always'],
              ].map(([a, b]) => (
                <div key={a}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--white)', lineHeight: '1' }}>{a}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '5px' }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The problem */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <h2 style={{ marginBottom: '24px' }}>What actually goes wrong</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
              Nobody sets out to lose retention. The main contractor is not claiming the work was
              defective and is not disputing the valuation. The date passed, nobody applied for it, and
              the money stayed where it was.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
              On a single job you would probably remember. Across eight jobs at different stages, with
              two release dates each and defects periods that vary by contract, you will not. That is
              sixteen dates to hold in your head, most of which are more than a year out.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>
              The other half of it is deduction past the cap. Retention accumulates from each certificate
              until it hits the ceiling in your contract, usually five per cent, at which point it should
              stop. In practice it often does not, because it is a running total nobody checks against a
              limit.
            </p>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ maxWidth: '560px', marginBottom: '48px' }}>What it does</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2px',
              background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {[
                ['Emails you before it falls due',
                 'At 90, 30 and 7 days before each release date, then again at 7 and 30 days overdue. One email covering everything across all your jobs, not one per job. Sent to whoever chases payments, which is often not you.'],
                ['Generates the application',
                 'When something is overdue, one click produces a formal application for release. Your details at the top, a schedule of what is owed and when it fell due, statutory interest at eight points over base, and the basis under the Construction Act. Send the next one and it refers back to the last.'],
                ['Flags deduction past the cap',
                 'Works out whether cumulative retention has exceeded the ceiling in your contract. Anything above it was never contractually due and is recoverable now, separately from the release dates.'],
                ['Tracks part payments',
                 'Retention rarely arrives in one clean payment. Log what has come in against each stage and the outstanding figure stays honest, so the next application claims the balance rather than the original amount.'],
                ['Keeps the certificate trail',
                 'Record each interim certificate with its date and reference. If a contractor ever disputes how much retention is held, that is the record that settles it.'],
                ['Everyone who needs it can see it',
                 'On the team plan, invite up to ten people. Useful when the person doing the work is not the person chasing the money, which is most of the time.'],
              ].map(([h, p]) => (
                <div key={h} style={{ background: 'var(--bg-2)', padding: '32px' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '12px', fontWeight: '600' }}>{h}</h3>
                  <p style={{ fontSize: '14.5px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free vs paid */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '820px' }}>
            <h2 style={{ marginBottom: '16px' }}>There is a free version</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '36px', maxWidth: '640px' }}>
              If you want to see whether this is a problem you actually have, start there. It calculates
              the same dates and exports them to your calendar, with everything kept in your browser.
            </p>

            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr',
                background: 'var(--bg-2)', borderBottom: '2px solid var(--ink)' }} className="rm-row">
                <div style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600' }}></div>
                <div style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600' }}>Free tool</div>
                <div style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: 'var(--amber)' }}>Retention Manager</div>
              </div>
              {[
                ['Release dates worked out', 'Yes', 'Yes'],
                ['Cap and over-deduction check', 'Yes', 'Yes'],
                ['Calendar export', 'Yes', 'Yes'],
                ['Where your data lives', 'This browser only', 'Your account, on any device'],
                ['Email reminders', 'No', 'Yes'],
                ['Application letters', 'One-off purchase', 'Included, unlimited'],
                ['Part payments logged', 'No', 'Yes'],
                ['Certificate history', 'No', 'Yes'],
                ['More than one person', 'No', 'On the team plan'],
              ].map(([label, free, paid], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr',
                  borderBottom: i < 8 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}
                  className="rm-row">
                  <div style={{ padding: '14px 20px', fontSize: '14.5px', fontWeight: '500' }}>{label}</div>
                  <div style={{ padding: '14px 20px', fontSize: '14px', color: free === 'No' ? 'var(--ink-4)' : 'var(--ink-3)' }}>{free}</div>
                  <div style={{ padding: '14px 20px', fontSize: '14px', color: 'var(--ink-2)' }}>{paid}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
          <div className="container">
            <h2 style={{ color: 'var(--white)', marginBottom: '12px' }}>Pricing</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.8',
              maxWidth: '540px', marginBottom: '44px' }}>
              Fourteen days free, no card needed. If one release you would otherwise have forgotten comes
              back, it has paid for a couple of years.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px', maxWidth: '760px' }}>
              {[
                ['Solo', '19', 'One person, unlimited jobs.',
                 ['Unlimited jobs and contractors', 'Email reminders', 'Application letters', 'Part payments and certificates', 'CSV export']],
                ['Team', '39', 'Everything in Solo, shared.',
                 ['Everything in Solo', 'Up to ten people', 'Everyone sees the same figures', 'For when the person building is not the person chasing']],
              ].map(([name, price, blurb, features]) => (
                <div key={name as string} style={{ background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)',
                  padding: '30px 32px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', color: 'var(--white)', marginBottom: '6px' }}>
                    {name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'var(--serif)', fontSize: '2.4rem', color: 'var(--amber)', lineHeight: '1' }}>
                      £{price}
                    </span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>a month</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', marginBottom: '20px' }}>
                    {blurb}
                  </p>
                  <ul style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.9',
                    paddingLeft: '18px', margin: '0 0 26px', flex: 1 }}>
                    {(features as string[]).map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <Link href="/signup" className="btn-amber" style={{ textAlign: 'center', fontSize: '15px' }}>
                    Start free trial
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <h2 style={{ marginBottom: '40px' }}>Questions</h2>
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {[
                ['What happens when the trial ends?',
                 'Nothing is deleted. The app locks until you pick a plan, and everything comes straight back when you do. Your jobs, payments, certificates and application history are all still there.'],
                ['Can I cancel whenever I want?',
                 'Yes. No notice period, no minimum term. You keep access until the end of the period you have paid for, and you can export everything to CSV before then.'],
                ['Does it work with JCT and NEC?',
                 'The default assumes the common JCT pattern of half at practical completion and half at the end of the rectification period. Both the retention rate, the cap and the length of the defects period are editable per job, so an NEC contract with Option X16 or anything bespoke works too.'],
                ['Who should the reminders go to?',
                 'You choose the address. Often it is better going to whoever does the chasing rather than to the person who ran the job, since those are usually different people.'],
                ['Is the application letter legally reliable?',
                 'It sets out the statutory framework accurately, including the notified sum provisions and the adjudication route. It is a template rather than legal advice, and your contract particulars may vary the release mechanism, so it is worth reading before sending.'],
              ].map(([q, a], i, arr) => (
                <div key={q} style={{ padding: '26px 30px', background: 'var(--white)',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '10px' }}>{q}</div>
                  <div style={{ fontSize: '14.5px', color: 'var(--ink-3)', lineHeight: '1.75' }}>{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(60px, 8vw, 80px) 0', background: 'var(--ink)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '580px' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '18px' }}>
              How much retention are you owed right now?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', marginBottom: '34px', lineHeight: '1.75' }}>
              Most subcontractors cannot answer that without going through a folder of certificates.
              Fourteen days free and no card needed.
            </p>
            <Link href="/signup" className="btn-amber" style={{ fontSize: '15px', padding: '14px 32px' }}>
              Start a free trial →
            </Link>
          </div>
        </section>

        <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px',
              color: 'var(--ink)', letterSpacing: '-0.03em' }}>
              Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic</p>
            <div style={{ display: 'flex', gap: '18px' }}>
              <Link href="/tools" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Free tools</Link>
              <Link href="/signin" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Sign in</Link>
            </div>
          </div>
        </footer>

        <style>{`
          @media (max-width: 700px) {
            .rm-row { grid-template-columns: 1fr 1fr !important; }
            .rm-row > div:first-child { grid-column: 1 / -1; padding-bottom: 4px !important; }
          }
        `}</style>
      </div>
    </>
  )
}
