import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  title: 'Excel Automation Consultant UK | Spreadsheet Automation | Lexalytic',
  description: 'Expert Excel automation for UK businesses. Turn hours of manual reporting into a one-click process. Fixed price from £495. Free 30-minute scoping call.',
  keywords: 'Excel automation consultant UK, automate Excel spreadsheets, Excel automation service London, spreadsheet automation UK, Excel reporting automation',
  openGraph: {
    title: 'Excel Automation Consultant UK | Lexalytic',
    description: 'Automate your Excel reporting and data processes. Fixed price from £495. Free scoping call.',
    url: 'https://lexalytic.com/services/excel-automation',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '📈', title: 'Automated Weekly & Monthly Reports', desc: 'Reports that compile themselves — pulling from multiple source files, applying your formatting, and producing the final output without anyone touching it.' },
  { icon: '🔄', title: 'Data Processing & Transformation', desc: 'Raw exports from your systems turned into clean, structured data automatically. No more manual reformatting, no more copy-paste between sheets.' },
  { icon: '✅', title: 'Reconciliation & Variance Checking', desc: 'Automatically compare two datasets, flag differences, and produce a reconciliation report — in seconds rather than hours.' },
  { icon: '📊', title: 'Self-Updating Dashboards', desc: 'Excel dashboards that refresh when new data lands. No manual pivot table updates, no formula errors, no stale numbers.' },
  { icon: '📧', title: 'Scheduled Report Distribution', desc: 'Reports that generate and email themselves to the right people on the right day — without anyone having to remember to run them.' },
  { icon: '🔗', title: 'System & Data Source Integration', desc: 'Pull data from your ERP, CRM, or accounting software directly into Excel — removing manual re-entry and the errors that come with it.' },
]

const faqs = [
  { q: 'How long does Excel automation take to build?', a: 'Most projects are delivered in 3–5 working days. Simple single-process automations can be faster; more complex builds involving multiple data sources take a little longer. You\'ll get a clear timeline in your fixed-price quote — not a vague estimate.' },
  { q: 'Will it work with our existing spreadsheets?', a: 'Yes. We work with your existing files and processes wherever possible so your team doesn\'t have to change how they work. If we need to restructure anything, we\'ll tell you upfront and explain why.' },
  { q: 'What version of Excel do we need?', a: 'We work with Excel 2016 and above, including all Microsoft 365 plans. We\'ll confirm compatibility during the scoping call.' },
  { q: 'Will we be able to maintain it ourselves?', a: 'Yes — that\'s a priority for us. We don\'t build things designed to create dependency. Every project includes full documentation and a handover walkthrough so your team can make minor changes independently.' },
  { q: 'What if our requirements change after delivery?', a: 'Every project includes at least one round of revisions. For ongoing changes as your business evolves, our retainer plan gives you a monthly allocation of hours at a predictable cost.' },
  { q: 'Do you work with businesses outside London?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally. Most of our clients have never met us in person.' },
]

export default function ExcelAutomationPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ServiceNav />

      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Excel Automation Consultant UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Your Excel reports should run<br /><em style={{ color: 'var(--amber)' }}>without your team running them.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              If someone on your team spends hours every week copying data, reformatting spreadsheets, or compiling reports — that's time and money leaving your business. We automate the process so the output is there when they need it, without the manual work.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '3–5', label: 'Days to delivery' }, { num: '£495', label: 'Starting price' }, { num: '48h', label: 'Quote turnaround' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', lineHeight: '1' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What we automate</span>
            <h2>Every Excel process that's costing your team time</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0' }}>If it involves opening a spreadsheet, copying something, and reformatting it — we can almost certainly automate it.</p>
          </div>
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
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Client result</span>
            <h2 style={{ marginBottom: '8px' }}>Weekly production report: 4 hours → 8 minutes</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '36px', fontSize: '15px' }}>Manufacturing · Operations Manager</p>
            <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The situation</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>Every week, the operations team spent four hours compiling a production report from six separate spreadsheets. The data was always a day old by the time it was ready, and errors crept in regularly during the manual process.</p>
              </div>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'var(--amber-bg)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>An automated Excel system that pulls from all six source files, consolidates and formats the data, and produces the final report automatically — triggered by a single button press. The whole thing takes 8 minutes.</p>
              </div>
              <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: '8 min', label: 'Down from 4 hours' }, { num: '0', label: 'Manual errors' }, { num: '97%', label: 'Time saved weekly' }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', lineHeight: '1' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginBottom: '8px' }}>Questions about Excel automation</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '40px', fontSize: '15px' }}>Anything not covered here — just ask us directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' : i === faqs.length - 1 ? '0 0 var(--radius) var(--radius)' : '0' }}>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'var(--sans)', fontWeight: '500', marginBottom: '10px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Stop doing manually what<br /><em style={{ color: 'var(--amber)' }}>Excel can do for you.</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Show us the process that's eating your team's time and we'll tell you exactly what automation would cost — and how long it would take.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Fixed price from £495 · Delivered in 3–5 days · Full documentation included</p>
        </div>
      </section>

      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/#services" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Services</Link>
            <Link href="/#pricing" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Pricing</Link>
            <Link href="/#contact" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Contact</Link>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
