import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/industries/recruitment' },
  title: 'Digital Studio for Recruitment UK | Lexalytic',
  description: 'Custom software, websites and data tools for UK recruitment agencies. Automated reporting, consultant performance dashboards, compliance tracking and more. Fixed price.',
  keywords: 'custom software recruitment agency UK, Excel reporting recruitment UK, consultant performance dashboard UK, compliance tracker recruitment UK, bespoke CRM recruitment',
  openGraph: {
    title: 'Digital Studio for Recruitment UK | Lexalytic',
    description: 'Custom software, websites and data tools for UK recruitment agencies. Automated reporting, consultant performance dashboards, compliance tracking and more. Fixed price.',
    url: 'https://www.lexalytic.com/industries/recruitment',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RecruitmentPage() {
  return (
    <>
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Digital Studio for Recruitment</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>Digital tools built for UK recruitment agencies.</h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '24px', fontWeight: '300', lineHeight: '1.75' }}>SUBDigital tools built for UK recruitment agencies.</p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '620px', marginBottom: '40px', lineHeight: '1.75' }}>Recruitment agencies have specific reporting needs — placement margins, consultant performance, contractor compliance, pipeline conversion. We have built tools for recruitment businesses and understand the sector.</p>
            <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <span className="section-label">What we build for Recruitment businesses</span>
          <h2 style={{ marginBottom: '48px', maxWidth: '560px' }}>Specific tools for specific problems.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Consultant performance dashboards</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Live dashboards showing placements, revenue, and margin by consultant, division, and client — updated automatically from your CRM or ATS.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Automated placement reporting</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Weekly management reports that compile from your ATS automatically — placements, revenue, pipeline, and margins — without anyone building them manually.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Contractor compliance tracking</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Automated compliance trackers that flag expiring right-to-work documents, upcoming contract renewals, and missing certifications before they become problems.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Custom CRM for recruitment</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>A CRM built around your specific recruitment process — candidate tracking, client management, job orders — not adapted from a generic sales tool.</p>
            </div>
            <div style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Recruitment agency websites</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Fast, SEO-optimised websites for recruitment agencies. Job board integration, sector-specific landing pages, and candidate and client portals.</p>
            </div>

          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">Why Lexalytic</span>
            <h2 style={{ marginBottom: '32px' }}>Senior experience. Studio prices. Direct access.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>You work directly with the founder</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Mihir has 15 years experience across Shell, NHS, Warner Bros, and Citi. Every project is handled directly — not passed to a junior.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Fixed price before we start</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Every project is scoped and priced in writing before any work begins. No day rates, no surprises, no scope creep.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Sector understanding</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>We have built tools for Recruitment businesses and understand the specific operational challenges of the sector — not just the technology.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>Delivered entirely remotely</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>We work with UK businesses entirely online. No commute costs, no office overhead — just the work, delivered to agreed timelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Have a problem that needs<br /><em style={{ color: 'var(--amber)' }}>a proper digital solution?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us what you need and we will tell you exactly what we would build — and what it would cost.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
        </div>
      </section>

      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', background: 'var(--bg-dark-3)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/#services" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Services</Link>
            <Link href="/#work" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Work</Link>
            <Link href="/#contact" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Contact</Link>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  )
}
