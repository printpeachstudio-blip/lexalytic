import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/locations/london' },
  title: 'Digital Studio London | Websites, Software & AI Tools | Lexalytic',
  description: 'Lexalytic is a UK digital studio serving London businesses. Bespoke websites, custom software, AI-powered tools and data systems. Fixed price, delivered remotely.',
  keywords: 'digital studio London, bespoke website developer London, custom software London, AI tools London small business, website development London SME, web developer London UK',
  openGraph: {
    title: 'Digital Studio London | Websites, Software & AI Tools | Lexalytic',
    description: 'Lexalytic is a UK digital studio serving London businesses. Bespoke websites, custom software, AI-powered tools and data systems. Fixed price.',
    url: 'https://www.lexalytic.com/locations/london',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function LondonNOSPACEPage() {
  const structuredData = '{"@context":"https://schema.org","@type":"Service","name":"Digital Studio London","description":"UK digital studio serving London businesses.","url":"https://www.lexalytic.com/locations/london","provider":{"@type":"LocalBusiness","name":"Lexalytic","url":"https://www.lexalytic.com","address":{"@type":"PostalAddress","addressLocality":"Bushey","addressRegion":"Hertfordshire","addressCountry":"GB"}},"areaServed":[{"@type":"City","name":"London"}],"serviceType":"Digital Studio"}'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Digital Studio serving London businesses</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Digital studio for<br /><em style={{ color: 'var(--amber)' }}>London businesses.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '24px', fontWeight: '300', lineHeight: '1.75' }}>
              Websites, custom business software, AI-powered tools, and data systems — built around how your business works. Fixed price. Fast delivery. One team, directly involved from first call to final handover.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '620px', marginBottom: '40px', lineHeight: '1.75' }}>
              We are based in Hertfordshire — 30 minutes from central London — and work with London businesses entirely remotely, which means you get senior-level work without London agency prices.
            </p>
            <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <span className="section-label">What we build</span>
          <h2 style={{ marginBottom: '48px', maxWidth: '560px' }}>Every service. Clear scope. Fixed price.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px' }}>
            <Link href="/services/website-development" style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🌐</div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Website Development</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>Fast, bespoke Next.js websites. No WordPress, no templates, no monthly platform fees. Built to rank on Google.</p>
              <span style={{ fontSize: '13px', color: 'var(--amber)' }}>Find out more →</span>
            </Link>
            <Link href="/services/custom-business-tools" style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🛠️</div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Custom Business Tools</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>Bespoke web apps built around your exact processes — custom CRMs, staff rotas, job trackers, client portals.</p>
              <span style={{ fontSize: '13px', color: 'var(--amber)' }}>Find out more →</span>
            </Link>
            <Link href="/services/ai-tools" style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🤖</div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>AI-Powered Tools</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>Business tools with Claude AI built in — proposal generators, document processors, intelligent workflows.</p>
              <span style={{ fontSize: '13px', color: 'var(--amber)' }}>Find out more →</span>
            </Link>
            <Link href="/services/platform-development" style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>🚀</div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Platform Development</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>Full web applications, SaaS products, booking systems, and member platforms. From idea to live product.</p>
              <span style={{ fontSize: '13px', color: 'var(--amber)' }}>Find out more →</span>
            </Link>
            <Link href="/services/power-bi" style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>📊</div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Power BI Dashboards</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>Live, interactive dashboards connected to your data. KPIs updated automatically, no manual reporting.</p>
              <span style={{ fontSize: '13px', color: 'var(--amber)' }}>Find out more →</span>
            </Link>
            <Link href="/services/excel-automation" style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>⚡</div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Excel and Data Automation</h3>
              <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>Turn hours of manual reporting into a one-click process. Power Query, VBA, Python.</p>
              <span style={{ fontSize: '13px', color: 'var(--amber)' }}>Find out more →</span>
            </Link>
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
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>You work directly with the founder</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Mihir has 15 years experience across Shell, NHS, Warner Bros, and Citi. Every project is handled directly — not passed to a junior.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Fixed price before we start</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>Every project is scoped and priced in writing before any work begins. No day rates, no surprises, no scope creep.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Live products as proof</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>CVCraft AI, FamilyEntitled, Kismet — real products we built ourselves. You can see the quality before committing.</p>
              </div>
              <div style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', color: 'var(--ink)' }}>Delivered entirely remotely</h3>
                <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>We work with London businesses entirely online. No commute costs, no office overhead — just the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Working with a London business?<br /><em style={{ color: 'var(--amber)' }}>Let us build something properly.</em></h2>
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
