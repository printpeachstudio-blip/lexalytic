import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/case-studies/locum-management-tool-pharmacy' },
  title: 'Custom Locum Management Tool for an Independent Pharmacy | Lexalytic',
  description: 'Zero missed payments since launch. How we built a custom locum management tool for an independent pharmacy managing 20+ locums across spreadsheets.',
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Custom Software</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Healthcare · Independent Pharmacy</span>
          </div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.02em' }}>Custom Locum Management Tool for an Independent Pharmacy</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>Zero missed payments since launch.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[['0', 'Missed payments since launch'], ['20+', 'Locums managed'], ['Hours → Minutes', 'Weekly admin time']].map(([m, l], i) => (
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
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>An independent pharmacy was managing 20+ locum pharmacists across shifting rotas with no central system. Payment dates, hours, and rates were tracked across separate spreadsheets — some maintained by different people, some out of date. Payments were frequently late or calculated incorrectly. Scheduling clashes went unnoticed until someone did not show up. The admin overhead was absorbing several hours every week.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The pharmacy had tried to manage this with a combination of Excel and paper records. The core issue was that the data lived in too many places: one spreadsheet for rota scheduling, another for hours worked, another for pay rates, and emails as the record of any changes. Nothing connected. Every month required someone to reconcile across all of these sources, manually calculate pay for each locum, and chase down any discrepancies before payments could go out.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '40px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>What we built</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>A custom locum management tool — a simple, clean web-based system built around how the pharmacy actually operates. A single input form captures each shift: locum name, date, hours worked, and agreed pay rate. The system calculates pay automatically, highlights payment due dates as they approach, flags scheduling conflicts at the point of booking, and keeps a complete historical record of every shift and payment.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The tool was designed to be used by non-technical staff with no training required. The interface is deliberately simple — the complexity is in the logic underneath. We built it in a single fixed-price project, delivered within two weeks of the brief being agreed.</p>
          </div>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The outcome</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>The pharmacy team now spends minutes on locum admin instead of hours. Every payment goes out accurately and on time. Scheduling conflicts are caught before they become problems rather than discovered when someone does not arrive.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>Since launch there have been zero missed or incorrect payments. The stress of month-end payroll reconciliation has been eliminated. The time saved has been redirected to clinical and operational work that actually requires the team&#x27;s attention.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Services</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Custom Software', 'Web Application', 'Fixed Price'].map(s => (
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
