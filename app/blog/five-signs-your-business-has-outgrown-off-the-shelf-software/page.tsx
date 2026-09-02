import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/five-signs-your-business-has-outgrown-off-the-shelf-software' },
  title: 'Five Signs Your Business Has Outgrown Off-the-Shelf Software | Lexalytic',
  description: 'Off-the-shelf software works until it does not. Here are the five signs that your business has reached the point where generic tools are costing more than they save.',
  keywords: 'outgrown off the shelf software UK, when to replace SaaS UK, custom software instead of SaaS UK, bespoke software UK small business, signs you need custom software UK',
  openGraph: {
    title: 'Five Signs Your Business Has Outgrown Off-the-Shelf Software',
    description: 'Off-the-shelf software works until it does not. Here are the five signs that your business has reached the point where generic tools are costing more than they save.',
    url: 'https://www.lexalytic.com/blog/five-signs-your-business-has-outgrown-off-the-shelf-software',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Five Signs Your Business Has Outgrown Off-the-Shelf Software","description":"Off-the-shelf software works until it does not. Here are the five signs that your business has reached the point where generic tools are costing more than they save.","datePublished":"2026-11-26","dateModified":"2026-11-26","url":"https://www.lexalytic.com/blog/five-signs-your-business-has-outgrown-off-the-shelf-software","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Custom Business Tools</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Five Signs Your Business Has Outgrown Off-the-Shelf Software</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Off-the-shelf software serves most businesses well when they are starting out. It is accessible, affordable, and good enough. The problem is that businesses grow and change, while software stays the same. At some point, the tool that used to solve the problem starts creating new ones. Here are the five signs that your business has reached that point.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Sign 1 — Your team has built workarounds that everyone accepts as normal</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>When a software tool does not quite fit, teams adapt. They export data into a spreadsheet to do the calculation the tool cannot do. They enter the same information in two places because the systems do not talk to each other. They use a field for something it was not designed for because there is no appropriate field. These workarounds feel like minor inconveniences individually. Collectively they represent significant time and error risk — and they are a clear signal that the tool is no longer serving the business.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Sign 2 — You are paying for features you never use while missing ones you need daily</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most SaaS tools are built for the broadest possible market. That means they include features relevant to many different types of business — most of which are not relevant to yours. Meanwhile, the specific thing your business needs — a particular report, a specific integration, a workflow that matches how you actually operate — is either missing or requires a higher pricing tier. Paying for the wrong features while working around missing ones is a classic signal.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Sign 3 — Onboarding new team members requires significant training on the workarounds</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>When new team members join, they learn the software — and then they learn how your business actually uses it, which is different. The gap between how the software is designed to work and how your business uses it has become significant enough that it requires explicit training. This is often invisible to businesses that have used the same tool for years, because the workarounds have become so embedded they feel natural.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Sign 4 — Data lives in multiple places and nobody is sure which is current</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Off-the-shelf tools rarely cover every aspect of a business process. The gaps get filled with spreadsheets, emails, and other tools. The result is data scattered across multiple systems with no single authoritative source. When you need to answer a business question, the first problem is working out where the relevant data lives and which version is current. This is not a data problem — it is a tool problem. The tools are not covering enough of the process to keep the data in one place.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Sign 5 — The monthly cost is significant but the value feels increasingly unclear</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>SaaS pricing rises. Features move to higher tiers. Per-user charges increase with headcount. The tool that cost £30 a month three years ago now costs £150. If the value has scaled proportionally, that is fine. If you are paying significantly more for essentially the same capability you had at a lower price, while your needs have grown beyond what the tool offers, the economics of the relationship have shifted. This is the moment to do the calculation — what would it actually cost to build something that fits?</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            
            <Link key={0} href="/blog/bespoke-software-vs-off-the-shelf-uk-small-business" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Bespoke Software vs Off-the-Shelf — The Honest UK Guide</p>
            </Link>
            <Link key={1} href="/blog/how-to-know-when-your-business-needs-custom-software" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>How to Know When Your Business Needs Custom Software</p>
            </Link>
            <Link key={2} href="/blog/custom-crm-vs-salesforce-hubspot-uk-small-business" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Custom CRM vs Salesforce vs HubSpot</p>
            </Link>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you are trying to build and we will tell you the best approach — and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
