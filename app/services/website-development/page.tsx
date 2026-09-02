import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/services/website-development' },
  title: 'Bespoke Website Development UK | Next.js Websites | Lexalytic',
  description: 'Fast, bespoke websites built in Next.js. No WordPress, no templates, no monthly platform fees. Built to rank on Google and built to convert. UK-based, fixed price.',
  keywords: 'bespoke website development UK, Next.js website UK, custom website small business UK, fast website development UK, no WordPress website UK, website developer Hertfordshire',
  openGraph: {
    title: 'Bespoke Website Development UK | Next.js Websites | Lexalytic',
    description: 'Fast, bespoke Next.js websites. No WordPress, no templates, no monthly platform fees.',
    url: 'https://www.lexalytic.com/services/website-development',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function WebsiteDevelopmentPage() {
  const structuredData = {"@context":"https://schema.org","@type":"Service","name":"Bespoke Website Development","description":"Fast, bespoke websites built in Next.js. No WordPress, no templates, no monthly platform fees.","url":"https://www.lexalytic.com/services/website-development","provider":{"@type":"LocalBusiness","name":"Lexalytic","url":"https://www.lexalytic.com","address":{"@type":"PostalAddress","addressLocality":"Bushey","addressRegion":"Hertfordshire","addressCountry":"GB"}},"areaServed":"GB","serviceType":"Website Development"}

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ServiceNav />
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Bespoke Website Development UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              A website that actually<br /><em style={{ color: 'var(--amber)' }}>works hard for your business.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              No WordPress. No templates. No monthly platform fees. We build fast, bespoke websites in Next.js — designed around what you need your site to do, built to rank on Google, and delivered as something you own outright. The site you are on right now is a live example.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <a href="https://www.lexalytic.com" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See this site as an example →</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">Why bespoke</span>
            <h2 style={{ marginBottom: '20px' }}>The problem with WordPress and templates</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '48px' }}>
              Most websites are built on platforms that carry the overhead of features you do not need, load more slowly than they should, and look like every other site built on the same template. A bespoke Next.js site carries none of that overhead.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', textAlign: 'left' }}>
              {[
                { icon: '⚡', title: 'Significantly faster', desc: 'Next.js generates static pages that load in milliseconds. No database queries, no plugin overhead. Google rewards fast sites with higher rankings.' },
                { icon: '🎯', title: 'Built for your specific goal', desc: 'A lead generation site, a portfolio, a tool, a content site — each needs different structure. We build for the specific outcome you need.' },
                { icon: '💰', title: 'No ongoing platform fees', desc: 'No WordPress hosting, theme licences, or plugin subscriptions. A bespoke site has none of those ongoing costs. You own it outright.' },
                { icon: '🔍', title: 'SEO from the ground up', desc: 'Structured data, canonical URLs, metadata, sitemap, Core Web Vitals — all built in from the start. The Lexalytic site scores 100 on Google SEO.' },
                { icon: '🛡️', title: 'More secure', desc: 'Static sites have no database to attack, no login page to brute-force, and no plugin vulnerabilities. Inherently more secure than WordPress.' },
                { icon: '📱', title: 'Mobile-first', desc: 'Built responsive from the first line of code — designed for the device most of your visitors are using.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">Our work</span>
            <h2 style={{ marginBottom: '32px' }}>Live websites we have built</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Lexalytic', url: 'https://www.lexalytic.com', desc: 'This site. Digital studio marketing site with automated blog publishing, GitHub Actions scheduling, structured data, and full SEO — scoring 100 on Google SEO.', tags: ['Next.js', 'SEO 100', 'Blog automation'] },
                { name: 'FamilyEntitled', url: 'https://www.familyentitled.co.uk', desc: 'UK government entitlements calculator. Complex eligibility logic, privacy-first architecture, content strategy targeting high-value financial search terms.', tags: ['Next.js', 'Calculator tool', 'SEO content'] },
                { name: 'CVCraft AI', url: 'https://cvcraft-ai.co.uk', desc: 'AI-powered CV rewriting service. Stripe payments, order processing, AI delivery pipeline, and full marketing site.', tags: ['Next.js', 'Stripe', 'AI integration'] },
              ].map((site, i) => (
                <a key={i} href={site.url} target="_blank" rel="noopener noreferrer" style={{ padding: '24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', margin: 0 }}>{site.name}</h3>
                    <span style={{ fontSize: '13px', color: 'var(--amber)' }}>View live site →</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.6', marginBottom: '12px' }}>{site.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {site.tags.map(t => <span key={t} style={{ fontSize: '11px', color: 'var(--ink-3)', background: 'var(--bg)', padding: '3px 10px', borderRadius: '100px', border: '1px solid var(--border)' }}>{t}</span>)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready for a website that<br /><em style={{ color: 'var(--amber)' }}>actually works for your business?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us what your site needs to do and we will tell you exactly what we would build — and what it would cost.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
        </div>
      </section>

      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
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
