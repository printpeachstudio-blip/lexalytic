import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Excel Automation Consultant UK | Lexalytic',
  description: 'Bespoke Excel automation for UK businesses. Turn hours of manual reporting into a one-click process. Fixed price from £495. Free scoping call.',
  keywords: 'Excel automation UK, Excel consultant London, automate Excel reports, Excel VBA automation, spreadsheet automation UK',
  openGraph: { title: 'Excel Automation Consultant UK | Lexalytic', description: 'Automate your Excel reporting and data processes. Fixed price from £495.', url: 'https://lexalytic.com/services/excel-automation', siteName: 'Lexalytic', locale: 'en_GB', type: 'website' },
}

const useCases = [
  { icon: '📈', title: 'Automated Reporting', desc: 'Weekly, monthly, and quarterly reports that run themselves — pulling from multiple sources and formatting to your exact template.' },
  { icon: '🔄', title: 'Data Processing', desc: 'Transform raw data exports into clean, structured outputs automatically. No more manual formatting or copy-paste between sheets.' },
  { icon: '✅', title: 'Reconciliation', desc: 'Automatically compare datasets, flag discrepancies, and produce reconciliation reports — in seconds, not hours.' },
  { icon: '📊', title: 'Dashboard Automation', desc: 'Excel dashboards that update automatically when new data is added — no manual refresh, no pivot table errors.' },
  { icon: '📧', title: 'Automated Distribution', desc: 'Schedule reports to generate and email automatically to the right people at the right time.' },
  { icon: '🔗', title: 'System Integration', desc: 'Connect Excel to your other systems — ERP, CRM, accounting software — and eliminate manual data re-entry.' },
]

const faqs = [
  { q: 'How long does Excel automation take to build?', a: 'Most projects are delivered in 3–5 working days. Simple automations can be faster; complex multi-source builds take longer. You\'ll get a clear timeline in your quote.' },
  { q: 'Will it work with our existing spreadsheets?', a: 'Yes. We work with your existing files and workflows wherever possible, so your team doesn\'t need to change how they work.' },
  { q: 'What version of Excel do we need?', a: 'We work with Excel 2016 and above, including Microsoft 365. We\'ll confirm compatibility during the scoping call.' },
  { q: 'Can we maintain it ourselves afterwards?', a: 'Yes. Every project includes full documentation and a walkthrough. We build things to be maintainable, not to create dependency on us.' },
  { q: 'What if our requirements change after delivery?', a: 'Every project includes a revision round. For ongoing changes, our retainer plan gives you a monthly allocation of hours.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function ExcelAutomationPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Excel Automation Service</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>Excel automation that<br /><em style={{ color: 'var(--amber)' }}>runs itself.</em></h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>Your team shouldn't be spending hours every week copying, pasting, and reformatting data. We automate your most time-consuming Excel processes so reports run at the click of a button — or automatically, on a schedule.</p>
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
          <div style={{ textAlign: 'center', marginBottom: '56px' }}><span className="section-label">What we automate</span><h2>Every Excel process that's costing your team time</h2></div>
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
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container"><div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="section-label">Real result</span>
          <h2 style={{ marginBottom: '40px' }}>4 hours of reporting down to 8 minutes</h2>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}><h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The problem</h3><p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A manufacturing operations team spent 4 hours every week compiling a production report from 6 separate spreadsheets. Errors were common and the data was always a day old by the time it was ready.</p></div>
            <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'var(--amber-bg)' }}><h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3><p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>An automated Excel system that pulls from all six source files, consolidates the data, and produces the formatted report automatically — triggered by a single button.</p></div>
            <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '8 min', label: 'Down from 4 hours' }, { num: '0', label: 'Manual errors' }, { num: '97%', label: 'Time saved' }].map((s, i) => (
                <div key={i}><div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', lineHeight: '1' }}>{s.num}</div><div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>{s.label}</div></div>
              ))}
            </div>
          </div>
        </div></div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container"><div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span className="section-label">FAQ</span>
          <h2 style={{ marginBottom: '40px' }}>Common questions about Excel automation</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Stop doing manually<br /><em style={{ color: 'var(--amber)' }}>what Excel can do for you.</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute scoping call. We'll look at your process and tell you exactly what's possible — and what it would cost to automate it.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Fixed price from £495 · Delivered in 3–5 days · Full documentation included</p>
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
