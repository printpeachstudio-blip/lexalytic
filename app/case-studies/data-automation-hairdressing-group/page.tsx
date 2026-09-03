import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/case-studies/data-automation-hairdressing-group' },
  title: 'Data Cleanse and Macro Rebuild for a Hairdressing Group | Lexalytic',
  description: 'From broken spreadsheets and unusable macros to a single accurate view of the whole business. 100% of macros rebuilt and working.',
}

export default function CaseStudy() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/case-studies" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← All case studies</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Automation</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Health & Beauty</span>
          </div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.02em' }}>Data Cleanse and Macro Rebuild for a Hairdressing Group</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>From broken spreadsheets and unusable macros to a single accurate view of the whole business.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[['100%', 'Macros rebuilt and working'], ['Seconds', 'vs minutes before'], ['1 file', 'Full business picture']].map(([m, l], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', lineHeight: '1', marginBottom: '8px' }}>{m}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The situation</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>A hairdressing group was managing its financials across multiple spreadsheets with no consistent structure and nothing linking them together. A previous consultant had built macros to automate some of the reporting — but these either did not work at all or ran so slowly that the team had given up using them. The owner had no reliable way to see the financial position of the whole business without spending hours pulling figures together manually.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The underlying data problems were significant: inconsistent date formats, duplicated records, transactions coded differently across spreadsheets, and formulas referencing ranges that had moved or been deleted. The macros were built on top of this inconsistency and broke whenever the data structure changed — which was often. The result was a system that was technically there but practically unusable.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '40px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>What we built</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>We started with a full data cleanse — going through every spreadsheet, standardising formats, removing duplicates, correcting coding inconsistencies, and restructuring everything so it connected properly. Once the foundation was clean, we rebuilt all the macros from scratch: faster, more robust, and properly documented so the team could understand what each one did.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The rebuild followed a clear principle: simplicity over cleverness. Where the original macros had been complex and fragile, the rebuilt versions were straightforward and resilient. We tested every macro against real data before handover and documented each one with plain-language explanations of what it does and what to do if something looks wrong.</p>
          </div>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The outcome</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>For the first time, the owner could open one file and see accurate figures across the whole business. Macros that used to take minutes to run — or fail entirely — now run in seconds. The finance process that previously required several hours of manual work each month now takes a fraction of that time.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The data cleanse also surfaced several discrepancies that had been invisible in the previous setup — transactions coded incorrectly that were affecting the reported figures. Correcting these gave the owner a more accurate picture of the business than they had ever had. The foundation is now clean enough that any future automation or reporting work can be built on top of it reliably.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Services</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Data Cleansing', 'Excel VBA', 'Data Automation', 'Fixed Price'].map(s => (
                <span key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '100px' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: '48px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '16px' }}>Have a similar problem?</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-3)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us what you are trying to fix. We will scope it and give you a fixed price before any work begins.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-primary">Book a free call →</Link>
              <Link href="/case-studies" className="btn-secondary">See more case studies →</Link>
            </div>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/case-studies" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>← All case studies</Link>
        </div>
      </footer>
    </div>
  )
}
