import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/case-studies/power-bi-dashboard-professional-services' },
  title: 'Live P&L Dashboard for a Professional Services Firm | Lexalytic',
  description: 'Full visibility within 48 hours of launch. How we built a Power BI dashboard that replaced a manual weekly management pack for a professional services firm.',
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Power BI</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Professional Services</span>
          </div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.02em' }}>Live P&L Dashboard for a Professional Services Firm</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>Full visibility within 48 hours of launch. The manual management pack was discontinued the first week.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[['48hrs', 'From build to full visibility'], ['Live', 'P&L by project and client'], ['0', 'Manual reports compiled']].map(([m, l], i) => (
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
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>A professional services firm had no central view of project profitability. Revenue was in the accounting system, time in a project management tool, costs scattered across expense records and payroll. Nobody had connected these three data sources. Directors were making resourcing decisions without knowing which of their current projects were actually profitable.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The management pack was produced manually each month — pulling data from multiple exports, reconciling figures that did not quite match, and formatting everything into a presentation. It took the best part of a day to compile. By the time it was ready, the data was already two to three weeks old. The team was making decisions based on last month&#x27;s picture of a business that had moved on.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '40px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>What we built</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>A Power BI dashboard connected directly to their project management system and accounting software. Live P&L by project, by client, and by team member — updated automatically as time is logged and invoices are raised. No manual input. No exports. No reconciliation.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The build took one week. We started with a clear brief: what are the three questions the MD needs answered every week? From that brief we scoped the data connections, agreed the dashboard structure, and built it to exactly that specification. The first week after launch, the MD opened the dashboard rather than waiting for the pack. The management pack process was discontinued.</p>
          </div>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The outcome</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>Full visibility within 48 hours of the build completing. The MD now opens one dashboard for the weekly leadership meeting instead of waiting for someone to compile a report. Resourcing decisions are made on current data. The finance team member who previously spent a day each month on the management pack now does something more valuable with that time.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>Six months after launch the firm identified two client relationships that were significantly less profitable than assumed — a discovery that led directly to a repricing conversation and a meaningful improvement in overall margin. That insight was not visible before the dashboard existed.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Services</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Power BI', 'Data & Reporting', 'Fixed Price'].map(s => (
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
