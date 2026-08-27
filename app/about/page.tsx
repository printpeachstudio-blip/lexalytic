import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/about' },
  title: 'About Mihir Hindocha | Data Automation Consultant UK | Lexalytic',
  description: 'Mihir Hindocha is a UK data automation consultant with 15 years experience across Shell, Citi Private Bank, NHS, Warner Brothers and Foster & Partners. Based in Hertfordshire.',
  keywords: 'Mihir Hindocha, data automation consultant UK, Excel consultant Hertfordshire, Power BI consultant UK, about Lexalytic',
  openGraph: {
    title: 'About Mihir Hindocha | Lexalytic',
    description: 'Data automation consultant with 15 years experience across Shell, Citi Private Bank, NHS, Warner Brothers and Foster & Partners.',
    url: 'https://www.lexalytic.com/about',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'profile',
  },
}


export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mihir Hindocha",
    "jobTitle": "Data Automation Consultant",
    "description": "UK data automation consultant with 15 years experience across Shell, Citi Private Bank, NHS, Warner Brothers Discovery and Foster & Partners. Founder of Lexalytic.",
    "url": "https://www.lexalytic.com/about",
    "worksFor": {
      "@type": "Organization",
      "name": "Lexalytic",
      "url": "https://www.lexalytic.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bushey",
      "addressRegion": "Hertfordshire",
      "addressCountry": "GB"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Financial Computing"
    },
    "knowsAbout": ["Power BI", "Excel Automation", "VBA", "Python", "SQL", "Power Automate", "Data Automation", "Business Intelligence"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Data Automation Consultant",
      "occupationLocation": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '48px', alignItems: 'center' }}>

            {/* Photo placeholder */}
            <img
              src="/mihir.jpg"
              alt="Mihir Hindocha - Data Automation Consultant and Founder of Lexalytic"
              style={{
                width: '160px', height: '160px', borderRadius: '50%',
                border: '3px solid rgba(193,125,46,0.3)',
                objectFit: 'cover', flexShrink: 0,
              }}
            />

            <div>
              <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', letterSpacing: '1px', textTransform: 'uppercase' }}>About</span>
              <h1 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '12px', marginTop: '8px', letterSpacing: '-0.02em' }}>
                Mihir Hindocha
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', marginBottom: '20px', lineHeight: '1.6' }}>
                Data Automation Consultant · Founder of Lexalytic · Based in Bushey, Hertfordshire
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Financial Computing graduate', '15 years experience', 'UK-based'].map((tag, i) => (
                  <span key={i} style={{
                    fontSize: '12px', fontWeight: '500', color: 'var(--amber)',
                    background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)',
                    padding: '4px 12px', borderRadius: '100px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>

          {/* Intro */}
          <p style={{ fontSize: '19px', color: 'var(--ink)', lineHeight: '1.85', marginBottom: '32px', fontWeight: '400' }}>
            I started Lexalytic because I spent 15 years inside some of the UK's most complex organisations watching the same problem play out over and over again — talented people spending hours every week on manual data work that nobody had ever got round to automating.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            At Shell, at Citi Private Bank, at the NHS, at Warner Brothers Discovery — the tools were different, the industries were different, but the problem was always the same. Reports being rebuilt manually every month. Data copied between systems by hand. Decisions being made on information that was already out of date. I built a consultancy around fixing exactly that.
          </p>

          {/* Career section */}
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Where the experience comes from</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '56px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '2px', background: 'var(--border)' }} />
            {[
              {
                company: 'Warner Brothers Discovery',
                role: 'Business Analyst',
                detail: 'Working across content and commercial data at one of the world\'s largest media companies. Complex multi-system reporting across international markets.',
              },
              {
                company: 'NHS',
                role: 'Senior Data Analyst',
                detail: 'Building and automating reporting systems across one of the UK\'s largest and most data-intensive organisations. Performance tracking, resource planning, compliance reporting.',
              },
              {
                company: 'Foster & Partners',
                role: 'Senior HR Reward Analyst',
                detail: 'Data and reporting for the globally renowned architecture practice. Compensation modelling, workforce analytics, automated HR reporting.',
              },
              {
                company: 'Crown Commercial Service',
                role: 'Performance & Reporting Analyst',
                detail: 'Building performance dashboards and automated reporting systems for the UK government\'s central procurement body.',
              },
              {
                company: 'Virgin Media',
                role: 'Technical Analyst',
                detail: 'Technical data analysis and reporting across one of the UK\'s largest telecoms businesses.',
              },
              {
                company: 'Shell Oil Company',
                role: 'Mobility & Reporting Analyst',
                detail: 'Global mobility data and automated reporting for one of the world\'s largest energy companies. Multi-currency, multi-jurisdiction data across international operations.',
              },
              {
                company: 'Citi Private Bank',
                role: 'Business Management Analyst',
                detail: 'Reporting and data automation for Citi\'s private banking division. High-stakes financial data requiring precision and reliability.',
              },
            ].map((job, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', paddingBottom: '28px', position: 'relative' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'var(--amber)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: '600', color: 'var(--white)',
                  position: 'relative', zIndex: 1,
                }}>
                  {job.company[0]}
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '2px' }}>{job.company}</div>
                  <div style={{ fontSize: '13px', color: 'var(--amber)', marginBottom: '8px', fontWeight: '500' }}>{job.role}</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>{job.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Education & tools */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px', marginBottom: '56px' }}>
            <div style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '16px' }}>Education</h3>
              <div style={{ fontSize: '15px', color: 'var(--ink-2)', marginBottom: '8px' }}>BSc Financial Computing</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)', marginBottom: '20px' }}>Combining finance, mathematics and software development — the foundation for everything that followed.</div>
              <div style={{ fontSize: '15px', color: 'var(--ink-2)', marginBottom: '4px' }}>Using Excel & VBA professionally since 2011</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>15 years of hands-on experience across some of the UK's most demanding data environments.</div>
            </div>
            <div style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '16px' }}>Tools & technologies</h3>
              {['Power BI', 'Excel & VBA', 'Python', 'SQL', 'Power Automate', 'Power Query', 'Google Sheets', 'DAX'].map((tool, i) => (
                <span key={i} style={{
                  display: 'inline-block', fontSize: '12px', fontWeight: '500',
                  color: 'var(--ink-2)', background: 'var(--bg)', border: '1px solid var(--border)',
                  padding: '4px 10px', borderRadius: '100px', margin: '0 6px 8px 0',
                }}>{tool}</span>
              ))}
            </div>
          </div>

          {/* Why Lexalytic */}
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why I started Lexalytic</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            In 2017 I started ExcelXLS as a side consultancy — taking on projects for businesses that needed the kind of Excel and VBA work I was doing in my day job. Over time it became clear that the businesses I was helping weren't just Excel problems — they were data problems. The tool was almost always fine. What was broken was the process around it.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            In 2026 I rebranded to Lexalytic to reflect what the work had become — a broader data automation consultancy covering Power BI, Python, SQL and Power Automate alongside Excel. The same years of client work, with a significantly expanded capability.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            I work with UK businesses directly — no account managers, no junior consultants handed your project. When you work with Lexalytic, you work with me. That is the point. The businesses I have built best results for are the ones where I understand the problem properly, not the ones where I execute a brief written by someone else.
          </p>

          {/* Clients */}
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Clients I have worked with</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { name: 'Royal Borough of Kensington & Chelsea', type: 'Local Government' },
              { name: 'Royal Shakespeare Company', type: 'Arts & Culture' },
              { name: 'White Cloud Aviation Services', type: 'Aviation' },
              { name: 'Gunna Drinks', type: 'FMCG' },
              { name: 'Abstract', type: 'Professional Services' },
              { name: 'Sarah Q Nutrition', type: 'Healthcare' },
            ].map((client, i) => (
              <div key={i} style={{ padding: '18px 20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', marginBottom: '4px' }}>{client.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-4)' }}>{client.type}</div>
              </div>
            ))}
          </div>

          {/* Personal */}
          <div style={{ padding: '32px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '56px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '16px' }}>Outside of work</h3>
            <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8', margin: 0 }}>
              I am based in Bushey, Hertfordshire, and part-owner of Blue Ginger and Blue Zenzer restaurants. Running a hospitality business alongside a data consultancy keeps me grounded in what actually matters to business owners — reliable systems, accurate numbers, and time back in your day to focus on the work only you can do.
            </p>
          </div>

          {/* Testimonials */}
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>What clients say</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '56px' }}>
            {[
              {
                quote: "Lexalytic immediately understood what we wanted via a brief phone call. Their personal attention and speed of turnaround was phenomenal. They not only delivered upon their promises, they were also a pleasure to work with. They have now become an additional outsourced member of our team.",
                name: "David Nikolich",
                role: "Founder & MD, Abstract",
              },
              {
                quote: "Without Lexalytic's help, I was working on 3 excel spreadsheets to manage my bookings for trainings, registers, finance on the same project, but they managed to put it all on one database and most of the work is now done by pressing a button instead of copying and pasting.",
                name: "Silvia Z",
                role: "Quality Assurance Officer, Royal Borough of Kensington and Chelsea",
              },
              {
                quote: "Using Lexalytic has saved me a massive amount of work, time and headaches. I was provided with a professional and efficient service at each stage — I also felt that I was properly listened to and my needs and requirements were met.",
                name: "Kate Freethe",
                role: "Workshops Administrator, Royal Shakespeare Company",
              },
            ].map((t, i) => (
              <div key={i} style={{ padding: '24px 28px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, s) => <span key={s} style={{ color: 'var(--amber)', fontSize: '13px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.8', fontStyle: 'italic', marginBottom: '16px' }}>"{t.quote}"</p>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--ink-4)', marginTop: '2px' }}>{t.role}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to work together?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. I will look at your current reporting process and tell you exactly what needs to change — and what it will cost to fix it.
            </p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free scoping call →
            </Link>
          </div>

        </div>
      </article>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>← Back to home</Link>
        </div>
      </footer>

    </div>
    </>
  )
}
