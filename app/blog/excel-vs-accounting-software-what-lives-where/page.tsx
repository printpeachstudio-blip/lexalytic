import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/excel-vs-accounting-software-what-lives-where' },
  title: 'Excel vs Accounting Software — What Should Live Where? | Lexalytic',
  description: 'Most UK businesses use both Excel and accounting software but have never explicitly decided what belongs in each. The result is duplicated data, manual tra',
  openGraph: {
    title: 'Excel vs Accounting Software — What Should Live Where?',
    description: 'Most UK businesses use both Excel and accounting software but have never explicitly decided what belongs in each. The result is duplicated data, manual tra',
    url: 'https://www.lexalytic.com/blog/excel-vs-accounting-software-what-lives-where',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Excel vs Accounting Software — What Should Live Where?","description":"Most UK businesses use both Excel and accounting software but have never explicitly decided what belongs in each. The re","datePublished":"2026-11-01","dateModified":"2026-11-01","url":"https://www.lexalytic.com/blog/excel-vs-accounting-software-what-lives-where","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Excel Automation</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Excel vs Accounting Software — What Should Live Where?</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most UK businesses use both Excel and accounting software but have never explicitly decided what belongs in each. The result is duplicated data, manual transfers between systems, and reporting that nobody quite trusts because it is unclear which source is authoritative.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What accounting software is designed for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Accounting software — Xero, QuickBooks, Sage, FreeAgent — is designed to be the authoritative record of financial transactions. Invoices raised, bills received, payments made, bank transactions recorded. It handles VAT, produces statutory accounts, and gives HMRC what it needs. It is not designed for operational analysis, forecasting, or the kind of flexible calculation that business owners actually use to run their businesses day to day. That gap is what Excel fills — legitimately.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Excel is genuinely better at</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Excel is better than accounting software at flexible modelling. A three-year financial forecast, a pricing calculator, a job cost tracker, a commission calculation model — these all suit Excel because they require custom logic that accounting software cannot accommodate. Excel is also better as a working document: somewhere to think through a problem, build a model iteratively, and explore different scenarios. The mistake is using Excel as a record-keeping system — storing transaction data that should live in accounting software, or maintaining parallel records that drift out of sync.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The clear dividing line</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Transaction data — anything that has happened, any money that has moved — belongs in accounting software. It is the authoritative record and it is what your accountant, HMRC, and any future acquirer will want to see. Analysis, forecasting, and operational modelling belong in Excel, drawing on data exported from accounting software rather than duplicating it. The connection should be one-way: accounting software feeds Excel, not the other way round. When data flows in both directions, reconciliation problems are inevitable.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Automating the connection between the two</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The most practical improvement most businesses can make is automating the export from accounting software into their Excel models. Power Query can connect directly to Xero, QuickBooks, or a regular export and refresh the data automatically. This means the Excel models are always working with current accounting data without anyone manually copying figures across. The accounting software remains the authoritative record; Excel remains the analysis and modelling tool; and the connection between them is automatic rather than manual.</p>
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
