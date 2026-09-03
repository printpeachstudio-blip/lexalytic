import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/custom-software-cost-uk-small-business' },
  title: 'What Does Custom Software Actually Cost for a UK Small Business? | Lexalytic',
  description: 'Transparent guide to UK custom software costs in 2027 — what drives the price, what to expect at different budget levels, and how to get a fair quote.',
  openGraph: {
    title: 'What Does Custom Software Actually Cost for a UK Small Business?',
    description: 'Transparent guide to UK custom software costs in 2027 — what drives the price, what to expect at different budget levels, and how to get a fair quote.',
    url: 'https://www.lexalytic.com/blog/custom-software-cost-uk-small-business',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"What Does Custom Software Actually Cost for a UK Small Business?","description":"Transparent guide to UK custom software costs in 2027 — what drives the price, what to expect at different budget levels, and how to get a fair quote.","datePublished":"2027-01-19","dateModified":"2027-01-19","url":"https://www.lexalytic.com/blog/custom-software-cost-uk-small-business","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Custom Software</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>January 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>What Does Custom Software Actually Cost for a UK Small Business?</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio Founder · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Custom software pricing is opaque. Most agencies either refuse to give ballpark figures or quote numbers that vary so widely they are useless for planning. This guide is an honest attempt to give UK small businesses a realistic picture of what bespoke software costs and what drives the price.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What drives the cost of custom software</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Custom software cost is primarily driven by three factors: complexity, integration requirements, and the number of user types the system needs to serve. A simple tool that one person uses to replace a manual spreadsheet process costs significantly less than a multi-user platform with customer-facing and admin-facing interfaces, integration with accounting software, and role-based access control. The scope of the problem determines the cost more than any other factor.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Realistic price ranges by project type</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A focused single-process tool — replacing a specific spreadsheet, automating one workflow, building a simple calculator or tracker — typically costs between £1,500 and £4,000. A medium-complexity system — a custom CRM, staff management tool, or client portal with multiple user types — typically costs between £4,000 and £12,000. A full platform with customer-facing interfaces, complex business logic, and multiple integrations typically costs between £12,000 and £40,000. These are ranges for competent UK developers working at reasonable market rates.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why agency quotes are often higher</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Agencies carry significant overhead: office space, account managers, project managers, sales teams, and the margin required to cover staff who are not billable. A project that costs £8,000 with a specialist studio often costs £20,000-£30,000 at a mid-sized agency — not because the work is different but because the overhead structure is different. For UK small businesses, working directly with a specialist or small studio almost always delivers better value than working with a larger agency.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The ongoing cost question</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Custom software has no licence fee, but it has maintenance costs. Hosting typically costs £20-100 per month depending on complexity. Updates and improvements as your business evolves are additional. Security patches and dependency updates should be factored in — roughly 5-10% of the initial build cost per year for a well-built system. When comparing custom software to SaaS alternatives, include both the build cost and ongoing maintenance in the 3-year calculation.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>How to get a fair quote</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Write down exactly what the system needs to do before speaking to any developer. List every feature, every user type, every system it needs to connect to. The more specific your brief, the more accurate the quote. A developer who quotes from a vague brief is guessing — and the guess will almost always be wrong in one direction or the other. Ask for the quote to be broken down by feature or phase so you can understand where the cost sits and make informed decisions about what to include.</p>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2027 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
