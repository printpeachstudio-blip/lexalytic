import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  title: 'Python Automation Consultant UK | Data Pipelines & Processing | Lexalytic',
  description: 'Expert Python automation for UK businesses. Data pipelines, scheduled scripts, API integrations, and large-scale data processing. Free scoping call.',
  keywords: 'Python automation consultant UK, Python data pipeline UK, Python developer London, automate data processing UK, Python scripting service UK',
  openGraph: {
    title: 'Python Automation Consultant UK | Data Pipelines & Processing | Lexalytic',
    description: 'Python automation for complex data tasks. Pipelines, scheduling, API integration.',
    url: 'https://lexalytic.com/services/python-automation',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '🔄', title: 'Automated Data Pipelines', desc: 'Extract, transform, and load data from any source to any destination — on a schedule, without anyone needing to trigger it. Built to run reliably in the background.' },
  { icon: '⏱️', title: 'Scheduled Processing', desc: 'Scripts that run automatically at set times — processing data, generating outputs, updating systems — with no one needing to open a file or press a button.' },
  { icon: '🌐', title: 'API Integration', desc: 'Pull data from any third-party API directly into your reporting layer, database, or storage — automatically, on whatever schedule makes sense for your business.' },
  { icon: '🧹', title: 'Large-Scale Data Cleaning', desc: 'Handle hundreds of thousands of records — standardising formats, removing duplicates, validating against rules, flagging anomalies — at a scale that Excel simply cannot manage.' },
  { icon: '📊', title: 'Automated Report Generation', desc: 'Python scripts that produce formatted Excel reports, PDFs, or data exports automatically and distribute them — so reports arrive without anyone having to run them.' },
  { icon: '🤖', title: 'Process & Task Automation', desc: 'Automate repetitive computer tasks — file management, data extraction, form processing, email handling — reliably and at any volume.' },
]

const faqs = [
  { q: 'When does Python make more sense than Excel or VBA?', a: 'Python is the right choice when you are working with large data volumes, when you need to connect to external APIs, when you want tasks to run automatically on a schedule without anyone opening a file, or when the logic is complex enough that VBA becomes hard to maintain. We will give you an honest recommendation during the scoping call.' },
  { q: 'Do we need any technical setup to run Python scripts?', a: 'Usually not much. Many scripts run on a standard Windows PC or server you already have. For scheduled automation, we can configure Windows Task Scheduler or recommend a simple cloud option depending on your setup. We will design the solution around what is practical for your team.' },
  { q: 'How long do Python automation projects take?', a: 'Typically 5-10 working days depending on complexity. Straightforward data processing scripts are at the faster end; full pipeline builds with multiple API integrations and error handling take longer. You will get a clear timeline in your quote.' },
  { q: 'Will our team be able to understand and maintain it?', a: 'Yes. We write clean, well-documented Python — not clever code for its own sake. The documentation explains what each part does in plain English, and the handover includes a walkthrough so your team knows how to make simple adjustments.' },
  { q: 'What support is included after delivery?', a: 'Every Python project includes two weeks of post-delivery support. For ongoing maintenance as your data or systems evolve, our retainer plan gives you a monthly allocation of hours at a predictable cost.' },
  { q: 'Do you work with businesses outside London?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function PythonAutomationPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Python Automation Consultant UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              When Excel is not enough —<br /><em style={{ color: 'var(--amber)' }}>Python handles the rest.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              Some data problems are too big, too complex, or too frequent for Excel to handle reliably. We build Python automation that processes data at any scale, connects to any system, and runs on a schedule — without anyone needing to be involved.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '5-10', label: 'Days to delivery' }, { num: 'Free', label: 'Scoping call' }, { num: '48h', label: 'Quote turnaround' }].map((s, i) => (
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
            <span className="section-label">What we build</span>
            <h2>Python automation for data challenges Excel cannot solve</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0' }}>From simple scheduled scripts to full multi-source data pipelines — built to run reliably without manual intervention.</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '80px', alignItems: 'start' }}>
            <div>
              <span className="section-label">When Python is the right answer</span>
              <h2 style={{ marginBottom: '24px' }}>Excel is the right tool for most things. Python is the right tool when it is not</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                The honest answer on when to use Python is straightforward. If your data fits in Excel and your team needs to interact with it directly, Excel automation is almost always the better choice — it is simpler to maintain and your team can see what is happening. Python becomes the right tool when the problem outgrows what Excel can do reliably.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                That usually means data volumes above 100,000 rows where Excel slows down or crashes; processes that need to run automatically on a schedule without anyone opening a file; connections to external APIs or systems that do not export to spreadsheets; or data processing logic complex enough that maintaining it in VBA becomes genuinely painful.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85' }}>
                I have built Python automation for businesses with monthly data volumes in the millions of rows, connecting dozens of source systems, running silently in the background every night. The output is always the same — a clean, formatted report or updated system ready when the team arrives in the morning, without anyone having to do anything.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '36px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--ink)' }}>Use Python when:</h3>
                {[
                  'Your data volume is too large for Excel to handle without slowing down',
                  'You need the process to run automatically on a schedule with no manual trigger',
                  'You are connecting to external APIs or systems Excel cannot reach',
                  'The logic is complex enough that VBA would become unmaintainable',
                  'You need to process hundreds of files in a single run',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 4 ? '14px' : '0', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '36px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--ink)' }}>Stick with Excel when:</h3>
                {[
                  'Your data fits comfortably in a spreadsheet',
                  'Your team needs to interact with the output directly',
                  'The process is straightforward enough that VBA handles it cleanly',
                  'Simplicity and maintainability matter more than scale',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 3 ? '14px' : '0', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--ink-3)', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <span style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Client result</span>
            <h2 style={{ marginBottom: '8px' }}>Month-end reconciliation: 2 days to 20 minutes</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '36px', fontSize: '15px' }}>Finance and Accounting · Finance Director</p>
            <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The situation</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A finance team was spending two full days every month manually reconciling data across three separate systems. The process was slow, inconsistent, and meant the Finance Director was doing data work instead of financial analysis.</p>
              </div>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'var(--amber-bg)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A Python script connecting to all three systems — pulling the data, running the reconciliation logic, flagging discrepancies automatically, and producing a formatted report. Run with a single click, completed in under 20 minutes.</p>
              </div>
              <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: '20 min', label: 'Down from 2 full days' }, { num: '0', label: 'Manual data handling' }, { num: '100%', label: 'Discrepancies auto-flagged' }].map((s, i) => (
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

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginBottom: '8px' }}>Questions about Python automation</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '40px', fontSize: '15px' }}>Anything not covered here — just ask us directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg)', border: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' : i === faqs.length - 1 ? '0 0 var(--radius) var(--radius)' : '0' }}>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready to process your data<br /><em style={{ color: 'var(--amber)' }}>without lifting a finger?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. We will tell you whether Python is the right tool for your situation — and give you a fixed price before you commit to anything.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Delivered in 5-10 days · Full documentation included</p>
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
