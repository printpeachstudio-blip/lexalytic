import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Google Sheets Automation Consultant UK | Lexalytic',
  description: 'Google Sheets automation and dashboard development for UK businesses. Automated reporting and data workflows for Google Workspace teams. Fixed price .',
  keywords: 'Google Sheets consultant UK, Google Sheets automation, Google Workspace automation, Apps Script developer UK, Google Sheets dashboard',
  openGraph: { title: 'Google Sheets Automation Consultant UK | Lexalytic', description: 'Automated reporting and dashboards built in Google Sheets. Fixed price .', url: 'https://lexalytic.com/services/google-sheets', siteName: 'Lexalytic', locale: 'en_GB', type: 'website' },
}

const useCases = [
  { icon: '📊', title: 'Automated Dashboards', desc: 'Live dashboards built in Google Sheets that update automatically — connected to your data sources, no manual refresh needed.' },
  { icon: '🔄', title: 'Workflow Automation', desc: 'Google Apps Script automation that handles repetitive tasks — data processing, report generation, email sending — automatically.' },
  { icon: '📧', title: 'Automated Reporting', desc: 'Reports that generate and distribute themselves on a schedule — the right data to the right people, without anyone having to run them.' },
  { icon: '🔗', title: 'Data Integration', desc: 'Connect Google Sheets to other tools in your stack — CRMs, databases, other Google Workspace apps — and keep data in sync.' },
  { icon: '✅', title: 'Data Validation', desc: 'Custom validation rules and input forms that ensure data quality from the moment it\'s entered.' },
  { icon: '👥', title: 'Collaborative Tools', desc: 'Shared tools your whole team can use — from data entry forms to project trackers — built to work the way your team works.' },
]

const faqs = [
  { q: 'What\'s Google Apps Script and do we need it?', a: 'Apps Script is the programming layer built into Google Workspace that enables complex automation beyond formulas. Most advanced Google Sheets projects use it. You don\'t need to know it — we handle all the code.' },
  { q: 'Can Google Sheets connect to our other tools?', a: 'Yes. Google Sheets connects natively to other Google Workspace apps and, via Apps Script or Zapier, to hundreds of third-party tools. We\'ll confirm what\'s possible with your setup during scoping.' },
  { q: 'Is Google Sheets suitable for business use or should we use Excel?', a: 'Google Sheets is ideal for collaborative, cloud-first teams. For complex data modelling, large datasets, or deep Microsoft 365 integration, Excel may be better. We\'ll advise on the right choice for your situation.' },
  { q: 'How long do Google Sheets projects take?', a: 'Most projects are delivered in 3–5 working days. Complex automations with multiple integrations take longer.' },
  { q: 'Will we be able to maintain it ourselves?', a: 'Yes. Google Sheets is designed to be accessible, and we\'ll document everything clearly. For the Apps Script elements, we provide full documentation and a walkthrough.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function GoogleSheetsPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Google Sheets Service</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>Google Sheets that work<br /><em style={{ color: 'var(--amber)' }}>as hard as you do.</em></h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>Already working in Google Workspace? We build automated reporting, live dashboards, and custom tools directly in Google Sheets — so your team gets powerful automation without leaving the tools they already use.</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '3–5', label: 'Days to delivery' }, { num: '£495', label: 'Starting price' }, { num: '48h', label: 'Scoping turnaround' }].map((s, i) => (
                <div key={i}><div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', lineHeight: '1' }}>{s.num}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}><span className="section-label">What we build</span><h2>Google Sheets automation for your whole team</h2></div>
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
          <h2 style={{ marginBottom: '40px' }}>Common questions about Google Sheets automation</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Make Google Sheets work<br /><em style={{ color: 'var(--amber)' }}>properly for your business.</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute scoping call. Tell us what you're trying to do and we'll show you what's possible in Google Sheets.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Fixed price  · Delivered in 3–5 days · Full documentation included</p>
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
