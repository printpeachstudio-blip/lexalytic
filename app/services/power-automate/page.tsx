import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Power Automate Consultant UK | Microsoft 365 Automation | Lexalytic',
  description: 'Power Automate workflows for UK businesses. Automate approvals, notifications, and data collection across Microsoft 365. Fixed price from £495. Free scoping call.',
  keywords: 'Power Automate consultant UK, Microsoft 365 automation, Power Automate developer, workflow automation UK, Microsoft Flow consultant',
  openGraph: { title: 'Power Automate Consultant UK | Lexalytic', description: 'Automate your Microsoft 365 workflows with Power Automate. Fixed price from £495.', url: 'https://lexalytic.com/services/power-automate', siteName: 'Lexalytic', locale: 'en_GB', type: 'website' },
}

const useCases = [
  { icon: '✅', title: 'Approval Workflows', desc: 'Automate sign-off processes across your organisation — purchase approvals, leave requests, document sign-off — with full audit trails.' },
  { icon: '🔔', title: 'Automated Notifications', desc: 'Trigger emails, Teams messages, or SMS alerts based on business events — deadlines, thresholds, status changes.' },
  { icon: '📥', title: 'Data Collection', desc: 'Automate the collection and routing of form submissions, emails, and documents into the right systems without manual handling.' },
  { icon: '🔄', title: 'System Synchronisation', desc: 'Keep data in sync across Microsoft 365 apps — SharePoint, Teams, Outlook, Excel, Dataverse — automatically.' },
  { icon: '📄', title: 'Document Automation', desc: 'Generate, route, and store documents automatically based on triggers. No more manual filing or emailing of paperwork.' },
  { icon: '📊', title: 'Reporting Triggers', desc: 'Schedule automated report generation and distribution — the right data to the right people at the right time.' },
]

const faqs = [
  { q: 'Do we need a specific Microsoft licence for Power Automate?', a: 'Basic Power Automate is included with most Microsoft 365 business plans. Premium connectors require a paid Power Automate licence at around £12/user/month. We\'ll advise on what you need during scoping.' },
  { q: 'Can Power Automate connect to non-Microsoft systems?', a: 'Yes. Power Automate has connectors for hundreds of third-party apps including Salesforce, Google Workspace, Slack, SAP, and many more. We\'ll confirm what\'s possible with your specific systems.' },
  { q: 'How long do Power Automate projects take?', a: 'Most workflows are delivered in 3–7 working days. Complex multi-step workflows with conditional logic take longer. You\'ll get a clear timeline in your quote.' },
  { q: 'Is Power Automate reliable?', a: 'Yes — it\'s an enterprise Microsoft product with high uptime. We build in error handling and notifications so you\'re alerted if anything fails.' },
  { q: 'Can we maintain the workflows ourselves afterwards?', a: 'Yes. Power Automate has a visual interface that\'s manageable without coding. We\'ll provide documentation and a walkthrough so your team can make minor adjustments independently.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function PowerAutomatePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#pricing" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Pricing</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call →</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Power Automate Service</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>Microsoft 365 workflows<br /><em style={{ color: 'var(--amber)' }}>that run themselves.</em></h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>If your team is manually routing emails, chasing approvals, or copying data between Microsoft 365 apps, Power Automate can handle all of it automatically — saving hours every week without anyone lifting a finger.</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '3–7', label: 'Days to delivery' }, { num: '£495', label: 'Starting price' }, { num: '48h', label: 'Scoping turnaround' }].map((s, i) => (
                <div key={i}><div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', lineHeight: '1' }}>{s.num}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}><span className="section-label">What we automate</span><h2>Every repetitive Microsoft 365 workflow</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {useCases.map((item, i) => (
              <div key={i} style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--ink-3)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container"><div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span className="section-label">FAQ</span>
          <h2 style={{ marginBottom: '40px' }}>Common questions about Power Automate</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' : i === faqs.length - 1 ? '0 0 var(--radius) var(--radius)' : '0' }}>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--sans)', fontWeight: '500', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div></div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Let your Microsoft 365<br /><em style={{ color: 'var(--amber)' }}>do the heavy lifting.</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute scoping call. Tell us what your team does manually and we'll show you how to automate it.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Fixed price from £495 · Delivered in 3–7 days · Full documentation included</p>
        </div>
      </section>
      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
