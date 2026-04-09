import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'VBA Development Consultant UK | Lexalytic',
  description: 'Custom VBA macros and Excel tools for UK businesses. Bespoke automation built around your exact business logic. Fixed price from £495. Free scoping call.',
  keywords: 'VBA developer UK, Excel VBA consultant, custom VBA macros, Excel automation London, VBA development service',
  openGraph: { title: 'VBA Development Consultant UK | Lexalytic', description: 'Custom VBA macros and tools built around your exact business logic. Fixed price from £495.', url: 'https://lexalytic.com/services/vba-development', siteName: 'Lexalytic', locale: 'en_GB', type: 'website' },
}

const useCases = [
  { icon: '🖱️', title: 'One-Click Tools', desc: 'Replace multi-step manual processes with a single button. Your team gets a tool that works exactly the way your business works.' },
  { icon: '📤', title: 'Automated Exports', desc: 'Generate formatted reports, PDFs, or data exports at the click of a button — ready to send, no editing required.' },
  { icon: '🔍', title: 'Data Validation', desc: 'Catch errors before they cause problems. Custom validation rules that check your data against your business logic, not just Excel defaults.' },
  { icon: '📋', title: 'Form & Input Tools', desc: 'Custom UserForms that make data entry faster, cleaner, and error-proof — even for non-Excel users.' },
  { icon: '🔗', title: 'System Connectors', desc: 'VBA tools that pull data from external sources — databases, APIs, other Office applications — automatically.' },
  { icon: '📦', title: 'Batch Processing', desc: 'Process hundreds of files, sheets, or records automatically. What takes a human a day takes VBA seconds.' },
]

const faqs = [
  { q: 'What\'s the difference between VBA and general Excel automation?', a: 'VBA (Visual Basic for Applications) is the programming language built into Excel that enables complex, custom automation beyond what formulas alone can do. It\'s ideal for multi-step processes, custom tools, and anything requiring logic or decision-making.' },
  { q: 'Will VBA work on Mac?', a: 'VBA works on Mac but with some limitations compared to Windows. We\'ll flag any compatibility issues during scoping and recommend the best approach for your setup.' },
  { q: 'Is VBA still relevant or should we use Python instead?', a: 'VBA is ideal when the work stays inside Excel and your team doesn\'t need external infrastructure. For larger data volumes, cross-system automation, or scheduled tasks, Python is often better. We\'ll recommend the right tool for your situation.' },
  { q: 'Will we be able to modify it ourselves?', a: 'Yes. We write clean, commented code with full documentation. We can also build in locked sections if you\'d prefer certain logic to be protected.' },
  { q: 'How long does VBA development take?', a: 'Most projects are delivered in 3–7 working days depending on complexity. You\'ll get a clear timeline in your fixed-price quote.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function VBAPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>VBA Development Service</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>Custom VBA tools built<br /><em style={{ color: 'var(--amber)' }}>around your business.</em></h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '580px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>Off-the-shelf Excel doesn't know how your business works. We build bespoke VBA tools that do — eliminating repetitive tasks, reducing human error, and giving your team tools they actually want to use.</p>
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
          <div style={{ textAlign: 'center', marginBottom: '56px' }}><span className="section-label">What we build</span><h2>VBA tools for every business process</h2></div>
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
          <h2 style={{ marginBottom: '40px' }}>Common questions about VBA development</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready for a tool that works<br /><em style={{ color: 'var(--amber)' }}>exactly how you do?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute scoping call. Show us your process and we'll tell you exactly what we can build — and what it'll cost.</p>
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
