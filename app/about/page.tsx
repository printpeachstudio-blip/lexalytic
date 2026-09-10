import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/about' },
  title: 'About Lexalytic | UK Digital Studio | Websites, Software, AI & Data',
  description: 'Lexalytic is a UK digital studio building websites, custom software, AI tools and data systems for small businesses. Founded by Mihir Hindocha, with 15 years across Shell, Citi, NHS, Warner Bros and Foster and Partners behind it.',
  keywords: 'Lexalytic, UK digital studio, custom software UK, website development Hertfordshire, AI tools UK business, data automation consultant, Mihir Hindocha',
  openGraph: {
    title: 'About Lexalytic | UK Digital Studio',
    description: 'We build websites, custom software, AI tools and data systems for UK businesses. Fixed price, senior experience, no handoffs.',
    url: 'https://www.lexalytic.com/about',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lexalytic',
  url: 'https://www.lexalytic.com',
  description: 'UK digital studio building websites, custom software, AI tools and data systems for small businesses.',
  founder: {
    '@type': 'Person',
    name: 'Mihir Hindocha',
    jobTitle: 'Founder',
    alumniOf: 'BSc Financial Computing',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bushey',
    addressRegion: 'Hertfordshire',
    addressCountry: 'GB',
  },
  areaServed: 'GB',
  knowsAbout: [
    'Custom software development',
    'Website development',
    'AI powered business tools',
    'Business intelligence and reporting',
    'Data cleansing and automation',
  ],
}

const built = [
  {
    name: 'CVCraft AI',
    what: 'A CV rewriting service that runs without anyone touching it. The customer submits their CV and a target role, it is rewritten for ATS compatibility, Stripe takes payment, and the document is delivered inside 24 hours. No human between submission and delivery.',
    tag: 'AI product',
  },
  {
    name: 'FamilyEntitled',
    what: 'A calculator that tells UK families what they are entitled to across eight government schemes based on their circumstances. No account, no data stored. The average household using it finds several thousand pounds a year they did not know they could claim.',
    tag: 'Public tool',
  },
  {
    name: 'Kismet',
    what: 'A wedding planning platform built for couples rather than planners. Guest management with seating conflict detection, budget tracked against real vendor quotes, and an AI generator for vows and speeches.',
    tag: 'Platform',
  },
  {
    name: 'The free tools',
    what: 'Six tools covering spreadsheet data quality, construction retention, recruitment rebate exposure, professional services lock-up and HMO licensing. Built because we needed them and could not find a decent UK version.',
    tag: 'In-house',
  },
]

const stack = [
  { group: 'Websites and platforms', items: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Tailwind'] },
  { group: 'Data and back end', items: ['Supabase', 'PostgreSQL', 'Python', 'SQL', 'REST and GraphQL APIs'] },
  { group: 'AI', items: ['Claude API', 'OpenAI API', 'Document processing', 'Structured extraction'] },
  { group: 'Reporting', items: ['Power BI', 'DAX', 'Power Query', 'Excel and VBA', 'Power Automate'] },
  { group: 'Commerce and integration', items: ['Stripe', 'GoCardless', 'Xero', 'Companies House', 'Google Workspace'] },
]

const history = [
  ['Warner Bros Discovery', 'Business Analyst', 'Content and commercial data across international markets'],
  ['NHS', 'Senior Data Analyst', 'Reporting and automation in one of the UK\u2019s most data-intensive organisations'],
  ['Citi Private Bank', 'Business Management Analyst', 'High-stakes financial data where precision was not optional'],
  ['Shell', 'Mobility and Reporting Analyst', 'Multi-currency, multi-jurisdiction data across global operations'],
  ['Foster and Partners', 'Senior HR Reward Analyst', 'Compensation modelling and workforce analytics'],
  ['Crown Commercial Service', 'Performance and Reporting Analyst', 'Dashboards for central government procurement'],
  ['Virgin Media', 'Technical Analyst', 'Data analysis across a major UK telecoms business'],
]

const clients = [
  ['Royal Borough of Kensington & Chelsea', 'Local government'],
  ['Royal Shakespeare Company', 'Arts and culture'],
  ['White Cloud Aviation Services', 'Aviation'],
  ['Gunna Drinks', 'FMCG'],
  ['Abstract', 'Professional services'],
  ['Sarah Q Nutrition', 'Healthcare'],
]

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

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
              <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
              <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Free Tools</Link>
              <Link href="/case-studies" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Case Studies</Link>
              <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                Book free call
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ paddingTop: '150px', paddingBottom: '70px', background: 'var(--bg-dark)',
          position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px', pointerEvents: 'none' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>About</span>
            <h1 style={{ color: 'var(--white)', maxWidth: '740px', marginBottom: '24px',
              lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              A studio that builds things, and uses them.
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
              maxWidth: '640px', fontWeight: '300', lineHeight: '1.75', margin: 0 }}>
              Lexalytic designs and builds websites, custom software, AI tools and data systems for UK
              businesses. Fixed price, agreed before anything starts. Based in Hertfordshire, working
              across the country.
            </p>
          </div>
        </section>

        {/* What we've built */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <div style={{ maxWidth: '660px', marginBottom: '48px' }}>
              <h2 style={{ marginBottom: '20px' }}>We build our own products too</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8' }}>
                Most studios show you client work. That is fine, but it only tells you what someone else
                asked for. These are things we decided were worth building, scoped ourselves, and now
                run. It is a more honest test of whether we know what we are doing.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {built.map(b => (
                <div key={b.name} style={{ background: 'var(--bg)', padding: '30px 32px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--amber)', fontWeight: '600',
                    letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {b.tag}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', fontFamily: 'var(--serif)', fontWeight: '400' }}>
                    {b.name}
                  </h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>
                    {b.what}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How we work */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ maxWidth: '540px', marginBottom: '48px' }}>How we work</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '40px' }}>
              {[
                ['Scoped before it is priced',
                 'We ask enough questions to understand what actually needs building, then quote a fixed price and write down what is included. If the scope changes we have that conversation before any work happens, not on the invoice at the end.'],
                ['You talk to the people building it',
                 'No account manager relaying your requirements to someone who was not in the room. Where a project needs a specialist we bring one in, but the person who scoped it stays on it throughout.'],
                ['Built to be handed over',
                 'You own the code, the domain, the hosting and the documentation. Nothing sits behind a licence you have to keep paying for, and nothing depends on us being reachable in two years.'],
                ['We say when not to build',
                 'Sometimes the honest answer is that an off-the-shelf tool does the job and a bespoke one would be an expensive way to get the same result. We would rather say so than take the work.'],
              ].map(([h, p]) => (
                <div key={h}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '12px', fontWeight: '600' }}>{h}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stack */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <div style={{ maxWidth: '620px', marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '18px' }}>What we build with</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-3)', lineHeight: '1.8' }}>
                Chosen because they are the right tools, not because they are the ones we happen to know.
                The reporting stack is where the studio started and it still earns its place.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '32px' }}>
              {stack.map(s => (
                <div key={s.group}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink)',
                    marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                    {s.group}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {s.items.map(i => (
                      <span key={i} style={{ fontSize: '13px', color: 'var(--ink-3)',
                        background: 'var(--bg-2)', border: '1px solid var(--border)',
                        borderRadius: '4px', padding: '4px 10px' }}>{i}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 300px) minmax(0, 1fr)',
              gap: '56px', alignItems: 'start' }} className="about-founder">
              <div>
                <img src="/mihir.jpg" alt="Mihir Hindocha, founder of Lexalytic"
                  style={{ width: '100%', maxWidth: '260px', borderRadius: 'var(--radius-lg)',
                    display: 'block', marginBottom: '20px' }} />
                <div style={{ color: 'var(--white)', fontSize: '17px', fontWeight: '600' }}>Mihir Hindocha</div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginTop: '4px' }}>
                  Founder · BSc Financial Computing
                </div>
              </div>

              <div>
                <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Who is behind it</span>
                <h2 style={{ color: 'var(--white)', marginBottom: '22px' }}>Fifteen years of watching the same problem</h2>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', marginBottom: '20px' }}>
                  Lexalytic was started by Mihir Hindocha after fifteen years inside large organisations,
                  where the same thing kept happening. Talented people spending a day a week on manual
                  work nobody had got round to automating. Reports rebuilt by hand every month. Decisions
                  made on numbers that were already three weeks old.
                </p>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', marginBottom: '20px' }}>
                  The tools changed between Shell and the NHS and Citi. The problem never did. What started
                  in 2017 as a side consultancy doing Excel and VBA work became a studio building complete
                  systems, because the Excel was almost never the actual problem.
                </p>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.85', margin: 0 }}>
                  He is also part-owner of two restaurants, which is a useful corrective. Running a
                  hospitality business alongside a studio is a reminder that most business owners do not
                  want software. They want the hour back.
                </p>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '18px',
                    letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: '600' }}>
                    Where the experience comes from
                  </div>
                  <div style={{ display: 'grid', gap: '14px' }}>
                    {history.map(([org, role, what]) => (
                      <div key={org} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 200px) minmax(0, 1fr)',
                        gap: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                        className="about-history-row">
                        <div>
                          <div style={{ fontSize: '14px', color: 'var(--white)', fontWeight: '500' }}>{org}</div>
                          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{role}</div>
                        </div>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.65' }}>{what}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '10px' }}>Who we have worked with</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-3)', lineHeight: '1.8', maxWidth: '580px', marginBottom: '36px' }}>
              From government departments to drinks brands. The common thread is not the sector, it is
              having outgrown whatever they were using.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '2px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {clients.map(([name, sector]) => (
                <div key={name} style={{ background: 'var(--bg)', padding: '22px 26px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '500', marginBottom: '4px' }}>{name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>{sector}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '28px' }}>
              <Link href="/case-studies" style={{ fontSize: '15px', color: 'var(--amber)' }}>
                Read the case studies →
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '40px' }}>What clients say</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
              {[
                ['Lexalytic immediately understood what we wanted via a brief phone call. Their personal attention and speed of turnaround was phenomenal. They not only delivered upon their promises, they were also a pleasure to work with. They have now become an additional outsourced member of our team.',
                 'David Nikolich', 'Founder & MD, Abstract'],
                ['Without Lexalytic\u2019s help, I was working on 3 excel spreadsheets to manage my bookings for trainings, registers, finance on the same project, but they managed to put it all on one database and most of the work is now done by pressing a button instead of copying and pasting.',
                 'Silvia Z', 'Quality Assurance Officer, Royal Borough of Kensington and Chelsea'],
                ['Using Lexalytic has saved me a massive amount of work, time and headaches. I was provided with a professional and efficient service at each stage. I also felt that I was properly listened to and my needs and requirements were met.',
                 'Kate Freethe', 'Workshops Administrator, Royal Shakespeare Company'],
              ].map(([quote, name, role]) => (
                <div key={name} style={{ background: 'var(--white)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)', padding: '28px 30px' }}>
                  <div style={{ color: 'var(--amber)', fontSize: '13px', marginBottom: '14px' }}>★★★★★</div>
                  <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '20px' }}>
                    {quote}
                  </p>
                  <div style={{ fontSize: '14px', fontWeight: '600' }}>{name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-4)', marginTop: '2px' }}>{role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: 'clamp(60px, 8vw, 80px) 0', background: 'var(--ink)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '580px' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '18px' }}>Tell us what is not working</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', marginBottom: '34px', lineHeight: '1.75' }}>
              Book a free thirty minute call. We will tell you what we would build, what it would cost,
              and whether it is worth building at all.
            </p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 32px' }}>
              Book a free scoping call →
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
            <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>
              © 2026 Lexalytic. All rights reserved.
            </p>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to home</Link>
          </div>
        </footer>

        <style>{`
          @media (max-width: 860px) {
            .about-founder { grid-template-columns: 1fr !important; gap: 36px !important; }
            .about-history-row { grid-template-columns: 1fr !important; gap: 4px !important; }
          }
        `}</style>
      </div>
    </>
  )
}
