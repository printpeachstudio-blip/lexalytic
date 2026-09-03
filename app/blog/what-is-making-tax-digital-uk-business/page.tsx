import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/what-is-making-tax-digital-uk-business' },
  title: 'What Is Making Tax Digital and Is Your Business Ready? | Lexalytic',
  description: 'Making Tax Digital is HMRC's programme to move UK tax administration to a fully digital system. For many UK businesses it is already mandatory; for others ',
  openGraph: {
    title: 'What Is Making Tax Digital and Is Your Business Ready?',
    description: 'Making Tax Digital is HMRC's programme to move UK tax administration to a fully digital system. For many UK businesses it is already mandatory; for others ',
    url: 'https://www.lexalytic.com/blog/what-is-making-tax-digital-uk-business',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"What Is Making Tax Digital and Is Your Business Ready?","description":"Making Tax Digital is HMRC's programme to move UK tax administration to a fully digital system. For many UK businesses i","datePublished":"2026-11-01","dateModified":"2026-11-01","url":"https://www.lexalytic.com/blog/what-is-making-tax-digital-uk-business","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Finance</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>What Is Making Tax Digital and Is Your Business Ready?</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Making Tax Digital is HMRC's programme to move UK tax administration to a fully digital system. For many UK businesses it is already mandatory; for others the deadlines are approaching. Understanding what it requires and whether your current setup is compliant is worth doing before HMRC asks the question.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Making Tax Digital actually requires</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Making Tax Digital for VAT has been mandatory for VAT-registered businesses since 2019 for those above the VAT threshold, and since 2022 for all VAT-registered businesses. It requires keeping digital records and submitting VAT returns using MTD-compatible software. Most businesses using Xero, QuickBooks, Sage, or FreeAgent are already compliant without realising it — these platforms have had MTD functionality built in for years. The businesses most at risk are those still submitting VAT returns manually through the HMRC portal or using software that has not been updated.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Making Tax Digital for Income Tax — the next phase</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Making Tax Digital for Income Tax Self Assessment applies to sole traders and landlords with income above £50,000 from April 2026, and those above £30,000 from April 2027. It requires quarterly submissions of business income and expense data to HMRC, replacing the annual self assessment return. This is a more significant change than MTD for VAT — it affects the frequency of reporting and requires businesses to have their records sufficiently organised to produce quarterly summaries. Businesses that maintain their books monthly are well-positioned; those that reconcile annually will need to change their habits.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What you need to check right now</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Three questions determine your MTD readiness. First, are you using MTD-compatible software for VAT? If you are on Xero, QuickBooks, Sage, or FreeAgent, almost certainly yes — but worth confirming. Second, are your digital records being maintained throughout the year rather than reconstructed at quarter-end? MTD requires contemporaneous digital records, not year-end summaries. Third, if you are a sole trader or landlord above the income threshold, do you know when your MTD for Income Tax obligation begins and what it requires? If the answer to any of these is unclear, your accountant can clarify the specific requirements for your situation.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The practical impact on how you run your books</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>For most businesses already using modern accounting software, MTD is already embedded in their processes without any conscious effort. The practical impact of MTD for Income Tax is primarily on businesses that currently manage their books manually or annually. Moving to monthly reconciliation, using accounting software consistently, and keeping digital copies of receipts and invoices are all practices that MTD encourages — and that make the whole business better managed, not just MTD-compliant. The compliance requirement and the good practice are aligned.</p>
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
