import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/bespoke-software-vs-off-the-shelf-uk-small-business' },
  title: 'Bespoke Software vs Off-the-Shelf — The Honest UK Small Business Guide | Lexalytic',
  description: 'Most UK small businesses default to off-the-shelf software. Sometimes that is right. Sometimes it costs more than building something custom. Here is the honest framework for deciding which.',
  keywords: 'bespoke software vs off the shelf UK, custom software small business UK, when to build custom software UK, bespoke vs SaaS UK business, affordable bespoke software UK SME',
  openGraph: {
    title: 'Bespoke Software vs Off-the-Shelf — The Honest UK Small Business Guide',
    description: 'Most UK small businesses default to off-the-shelf software. Sometimes that is right. Sometimes it costs more than building something custom. Here is the honest framework for deciding which.',
    url: 'https://www.lexalytic.com/blog/bespoke-software-vs-off-the-shelf-uk-small-business',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Bespoke Software vs Off-the-Shelf — The Honest UK Small Business Guide","description":"Most UK small businesses default to off-the-shelf software. Sometimes that is right. Sometimes it costs more than building something custom. Here is the honest framework for deciding which.","datePublished":"2026-09-02","dateModified":"2026-09-02","url":"https://www.lexalytic.com/blog/bespoke-software-vs-off-the-shelf-uk-small-business","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Bespoke Software vs Off-the-Shelf — The Honest UK Small Business Guide</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The assumption most UK small businesses make is that off-the-shelf software is cheaper than building something custom. That assumption is correct at the point of purchase. Over three to five years, it is often wrong. Here is the honest framework for deciding which approach makes more sense for a specific business problem — without defaulting to either answer.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why off-the-shelf software dominates — and what that actually costs</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Off-the-shelf software wins on upfront cost and speed. You can sign up for Salesforce, Monday.com, or Xero in an afternoon. There is no build time, no development risk, and no upfront investment beyond the subscription. The ongoing cost is the catch. A £50/month SaaS tool costs £600/year. Over five years that is £3,000 — and SaaS pricing rarely stays flat. Many businesses that signed up for tools in 2020 are now paying two or three times the original price. Add per-user charges, feature tier upgrades, integration costs, and the management overhead of tools that do not quite fit — and the true cost of off-the-shelf software is significantly higher than the monthly subscription suggests.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The hidden cost of fitting your business to the software</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Every business that adopts off-the-shelf software goes through the same process. The software works slightly differently to how the business operates. The team adapts their workflow to fit the tool — not the other way round. Over time, those adaptations accumulate. Workarounds become standard practice. Data ends up in fields it was not designed for. Reports require manual adjustment before they are useful. None of this shows up on the invoice, but it represents real cost in time and operational friction.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>When off-the-shelf is clearly the right answer</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>For standard processes that generic software handles well, off-the-shelf wins. If your sales process looks like a standard pipeline, HubSpot will serve you well. If your accounting needs are standard, Xero or QuickBooks will handle them without modification. The test is simple: can you configure the software to work the way your business works without significant compromise? If yes, use it. The key word is compromise — minor adaptations are normal and acceptable. Significant ones are a signal that you are fitting a square business into a round tool.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>When bespoke is clearly the right answer</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Bespoke wins when your process is specific enough that generic software handles it badly, when you are paying for features you do not use while missing features you need, when monthly fees are significant relative to what the tool delivers, or when you have already tried two or three off-the-shelf options and none of them fit. The calculation is straightforward: estimate the true annual cost of the current approach — subscription fees, time spent on workarounds, manual processes the tool does not handle. Compare that to the one-time cost of a tool built for your exact process. For most businesses with a specific enough problem, the payback period is under two years.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            
            <Link key={0} href="/blog/why-uk-businesses-building-custom-tools" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Why UK Businesses Are Building Custom Tools Instead of Buying Software</p>
            </Link>
            <Link key={1} href="/blog/custom-crm-vs-salesforce-hubspot-uk-small-business" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Custom CRM vs Salesforce vs HubSpot</p>
            </Link>
            <Link key={2} href="/blog/replace-spreadsheet-with-business-tool" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>How to Replace Your Spreadsheet with a Proper Business Tool</p>
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
