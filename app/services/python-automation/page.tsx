import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Python Automation Consultant UK | Data Processing & Pipelines | Lexalytic',
  description: 'Python automation for UK businesses. Data pipelines, scheduled scripts, and large-scale processing that goes beyond Excel. Fixed price from £750. Free scoping call.',
  keywords: 'Python automation UK, Python data consultant London, data pipeline UK, Python scripting service, automate data processing UK',
  openGraph: { title: 'Python Automation Consultant UK | Lexalytic', description: 'Python automation for complex data tasks. Pipelines, scheduling, and processing at scale. Fixed price from £750.', url: 'https://lexalytic.com/services/python-automation', siteName: 'Lexalytic', locale: 'en_GB', type: 'website' },
}

const useCases = [
  { icon: '🔄', title: 'Data Pipelines', desc: 'Automated pipelines that extract, transform, and load data from any source to any destination — on a schedule, without manual intervention.' },
  { icon: '⏱️', title: 'Scheduled Processing', desc: 'Scripts that run automatically — daily, weekly, or triggered by events — processing data, generating reports, or updating systems.' },
  { icon: '🌐', title: 'API Integration', desc: 'Connect to any third-party API and pull data automatically into your reporting or storage layer.' },
  { icon: '🧹', title: 'Data Cleaning at Scale', desc: 'Handle thousands or millions of records — standardising, deduplicating, validating, and transforming data too large for Excel.' },
  { icon: '📊', title: 'Automated Reporting', desc: 'Python scripts that generate formatted Excel, PDF, or web reports automatically and distribute them to the right people.' },
  { icon: '🤖', title: 'Process Automation', desc: 'Automate repetitive computer tasks — file management, web scraping, form submission, email processing — reliably and at scale.' },
]

const faqs = [
  { q: 'When should I use Python instead of Excel/VBA?', a: 'Python is better when you\'re dealing with large data volumes (Excel struggles above ~100k rows), need to connect to external APIs, want scheduled automation without someone opening a file, or need more complex data transformation logic.' },
  { q: 'Do we need any technical infrastructure to run Python scripts?', a: 'Not necessarily. Many scripts run on a Windows PC or server you already have. For scheduled automation, we can set up Task Scheduler on Windows or recommend simple cloud options. We\'ll advise on the most practical setup for you.' },
  { q: 'How long do Python projects take?', a: 'Typically 5–10 working days depending on complexity. Simple data processing scripts are faster; full pipeline builds with multiple integrations take longer.' },
  { q: 'Will we be able to maintain it ourselves?', a: 'Yes. We write clean, well-commented Python with full documentation. We\'ll also provide a handover walkthrough so your team understands what it does and how to make simple changes.' },
  { q: 'What if something breaks after delivery?', a: 'Every project includes 2 weeks of post-delivery support. For ongoing maintenance, our retainer plan gives you a monthly allocation of hours.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function PythonAutomationPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Python Automation Service</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>Python automation for<br /><em style={{ color: 'var(--amber)' }}>data at any scale.</em></h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>When your data challenges go beyond what Excel can handle, Python is the answer. We build reliable automation scripts and data pipelines that process any volume of data, connect to any system, and run automatically — with no one needing to press a button.</p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '5–10', label: 'Days to delivery' }, { num: '£750', label: 'Starting price' }, { num: '48h', label: 'Scoping turnaround' }].map((s, i) => (
                <div key={i}><div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', lineHeight: '1' }}>{s.num}</div><div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}><span className="section-label">What we build</span><h2>Python automation for complex data challenges</h2></div>
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
          <h2 style={{ marginBottom: '40px' }}>2-day reconciliation down to 20 minutes</h2>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}><h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The problem</h3><p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A finance team was spending 2 days every month manually reconciling data across 3 separate systems. The process was error-prone and left the Finance Director doing data work instead of financial analysis.</p></div>
            <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'var(--amber-bg)' }}><h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3><p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A Python automation script that connects to all three systems, pulls the data, reconciles it automatically, flags discrepancies, and produces a formatted report — run with a single click.</p></div>
            <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '20 min', label: 'Down from 2 full days' }, { num: '0', label: 'Manual errors' }, { num: '100%', label: 'Discrepancies auto-flagged' }].map((s, i) => (
                <div key={i}><div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', lineHeight: '1' }}>{s.num}</div><div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>{s.label}</div></div>
              ))}
            </div>
          </div>
        </div></div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container"><div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span className="section-label">FAQ</span>
          <h2 style={{ marginBottom: '40px' }}>Common questions about Python automation</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready to handle your data<br /><em style={{ color: 'var(--amber)' }}>at any scale?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute scoping call. We'll tell you whether Python is the right tool for your situation — and exactly what it would cost.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Fixed price from £750 · Delivered in 5–10 days · Full documentation included</p>
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
