import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  title: 'VBA Developer UK | Custom Excel Macros & Tools | Lexalytic',
  description: 'Bespoke VBA development for UK businesses. Custom Excel macros, automation tools, and UserForms built around your exact business logic. Fixed price . Free scoping call.',
  keywords: 'VBA developer UK, Excel VBA consultant, custom VBA macros UK, Excel macro developer London, bespoke VBA automation',
  openGraph: {
    title: 'VBA Developer UK | Custom Excel Macros & Tools | Lexalytic',
    description: 'Custom VBA macros and Excel tools built around your exact business logic. Fixed price .',
    url: 'https://lexalytic.com/services/vba-development',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '🖱️', title: 'One-Click Business Tools', desc: 'Replace a 12-step manual process with a single button. We build tools that work exactly the way your business works — not a generic solution you have to adapt to.' },
  { icon: '📤', title: 'Automated Report Generation', desc: 'Generate formatted reports, PDFs, or data exports at the click of a button — ready to send, no editing, no reformatting.' },
  { icon: '🔍', title: 'Custom Data Validation', desc: 'Validation logic that checks your data against your actual business rules — not just Excel\'s built-in defaults. Catch errors at the point of entry, not weeks later.' },
  { icon: '📋', title: 'UserForms & Data Entry Tools', desc: 'Custom input forms that make data entry faster, cleaner, and error-proof — even for team members who aren\'t confident in Excel.' },
  { icon: '🔗', title: 'External Data Connections', desc: 'VBA tools that pull data automatically from databases, other Office applications, or external files — eliminating manual imports and the errors they bring.' },
  { icon: '📦', title: 'Batch File Processing', desc: 'Process dozens or hundreds of files, sheets, or records in one run. What takes a person a full day takes a well-written macro a few minutes.' },
]

const faqs = [
  { q: 'What\'s the difference between VBA automation and general Excel automation?', a: 'VBA (Visual Basic for Applications) is the programming language inside Excel that makes genuinely custom automation possible — beyond what formulas can do. It\'s the right choice when you need multi-step logic, custom tools, or processes that need to work exactly your way.' },
  { q: 'Will VBA work on Mac?', a: 'VBA works on Mac with some limitations compared to Windows — certain features aren\'t available, and performance can differ. We\'ll flag any compatibility issues during the scoping call and find the best approach for your setup.' },
  { q: 'Is VBA still the right tool or should we be looking at Python?', a: 'VBA is the right choice when the work lives inside Excel, your team doesn\'t want external tooling, and you need something they can trigger themselves. For larger data volumes, cross-system automation, or scheduled tasks that run without anyone opening a file, Python is usually better. We\'ll give you an honest recommendation during scoping.' },
  { q: 'Can we modify the code ourselves after delivery?', a: 'Yes. We write clean, well-commented VBA code with full documentation. If you\'d prefer certain logic to be protected, we can lock specific modules — just let us know during scoping.' },
  { q: 'How long does VBA development take?', a: 'Most projects are delivered in 3–7 working days. Simple tools are faster; complex multi-step builds with external data connections take longer. You\'ll get a clear timeline — not a rough estimate — in your fixed-price quote.' },
  { q: 'Do you work remotely?', a: 'Yes — everything is delivered remotely. We work with businesses across the UK and internationally, and have done for years.' },
]

export default function VBAPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>VBA Developer UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Custom VBA tools built<br /><em style={{ color: 'var(--amber)' }}>around how you actually work.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              Generic Excel doesn't know your business processes. We build bespoke VBA tools that do — cutting out the repetitive manual steps, reducing errors, and giving your team something that actually fits the way they work.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '3–7', label: 'Days to delivery' }, { num: 'Free', label: 'Scoping call' }, { num: '48h', label: 'Quote turnaround' }].map((s, i) => (
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
            <h2>VBA tools for every process that's slowing your team down</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0' }}>10 years of VBA development across finance, operations, logistics, professional services, and more.</p>
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
            <h2 style={{ marginBottom: '8px' }}>Aircraft technical reports: manual process eliminated entirely</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '36px', fontSize: '15px' }}>Aviation · Operations</p>
            <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The situation</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>An aviation client needed custom aircraft technical reports generated from multiple data sources. The manual process was time-consuming, error-prone, and required significant Excel expertise every time a report was needed.</p>
              </div>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'var(--amber-bg)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A VBA automation tool that pulls from the relevant data sources and generates fully formatted technical reports automatically — using Visual Basic to handle the logic and data assembly that previously required manual intervention.</p>
              </div>
              <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: '1 click', label: 'To generate any report' }, { num: '0', label: 'Manual data assembly' }, { num: '100%', label: 'Process consistency' }].map((s, i) => (
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
            <h2 style={{ marginBottom: '8px' }}>Questions about VBA development</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready for a tool that works<br /><em style={{ color: 'var(--amber)' }}>exactly the way you do?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Show us your process and we'll tell you exactly what we can build — and what it'll cost.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Fixed price  · Delivered in 3–7 days · Full documentation included</p>
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
