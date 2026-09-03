import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/what-data-does-your-business-need-to-grow-2027' },
  title: 'What Data Does Your Business Need to Grow in 2027? | Lexalytic',
  description: 'Growth without data is possible — many businesses have done it. But growth with data is faster, more efficient, and more resilient. The question is not whe',
  openGraph: {
    title: 'What Data Does Your Business Need to Grow in 2027?',
    description: 'Growth without data is possible — many businesses have done it. But growth with data is faster, more efficient, and more resilient. The question is not whe',
    url: 'https://www.lexalytic.com/blog/what-data-does-your-business-need-to-grow-2027',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"What Data Does Your Business Need to Grow in 2027?","description":"Growth without data is possible — many businesses have done it. But growth with data is faster, more efficient, and more","datePublished":"2026-11-01","dateModified":"2026-11-01","url":"https://www.lexalytic.com/blog/what-data-does-your-business-need-to-grow-2027","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Intelligence</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>December 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>What Data Does Your Business Need to Grow in 2027?</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Growth without data is possible — many businesses have done it. But growth with data is faster, more efficient, and more resilient. The question is not whether data matters but which data matters for your specific business at its current stage.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The data that drives growth decisions</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The data most useful for growth is the data that answers the questions you are currently guessing at. Which marketing channel brings in the highest-value clients? What is the average lifetime value of a customer? Which products or services have the most headroom to scale? Which parts of the business could handle more volume without proportionate cost increases? These questions have specific answers that data can provide — but only if the data is being collected and organised in a way that makes the answers accessible.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The foundation data every growing business needs</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Three categories of data underpin most growth decisions. Customer data — who buys, how often, how much, and what the retention pattern looks like over time. Revenue data — broken down by product, service, channel, and geography at minimum. Cost data — true cost by revenue stream, not just aggregate cost by category. Without these three, growth decisions are based on assumptions that may or may not be accurate. With them, the highest-return opportunities become visible and the lowest-return ones can be deprioritised.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The data infrastructure that scales with the business</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The data infrastructure that serves a business well at £500k revenue often breaks at £2m. Spreadsheets maintained by one person become bottlenecks. Accounting software that was adequate for simple transactions struggles with complexity. CRM data that was clean when the team was small becomes inconsistent as more people contribute to it. Planning the data infrastructure for where the business is going, not just where it is, prevents the painful rebuilds that growing businesses typically go through when they hit these thresholds.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Starting with one question rather than a whole strategy</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The most practical approach to data for growth is not a comprehensive data strategy — it is identifying the one question that, if answered reliably, would most improve the quality of growth decisions. Is it customer acquisition cost by channel? Is it margin by product line? Is it customer lifetime value? Pick one, build the smallest possible system that answers it accurately, and use that answer to make better decisions for six months. Then pick the next question. This approach delivers value immediately rather than after a long implementation, and builds data capability in a way that matches the business's ability to act on what it learns.</p>
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
