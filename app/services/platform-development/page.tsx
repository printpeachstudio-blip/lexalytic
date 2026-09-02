import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/services/platform-development' },
  title: 'Platform & SaaS Development UK | Web App Development | Lexalytic',
  description: 'Full web applications, SaaS products, booking systems, and member platforms for UK businesses. From waitlist to live product — we design, build, and ship. Fixed price.',
  keywords: 'platform development UK, SaaS development UK, web application development UK, booking system development UK, member platform UK, MVP development UK',
  openGraph: {
    title: 'Platform & SaaS Development UK | Web App Development | Lexalytic',
    description: 'Full web applications, SaaS products, booking systems, and member platforms. From waitlist to live product.',
    url: 'https://www.lexalytic.com/services/platform-development',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function PlatformDevelopmentPage() {
  const structuredData = {"@context":"https://schema.org","@type":"Service","name":"Platform & SaaS Development","description":"Full web applications, SaaS products, booking systems, and member platforms for UK businesses.","url":"https://www.lexalytic.com/services/platform-development","provider":{"@type":"LocalBusiness","name":"Lexalytic","url":"https://www.lexalytic.com","address":{"@type":"PostalAddress","addressLocality":"Bushey","addressRegion":"Hertfordshire","addressCountry":"GB"}},"areaServed":"GB","serviceType":"Platform Development"}

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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Platform & SaaS Development UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              From idea to live product.<br /><em style={{ color: 'var(--amber)' }}>Built properly from the start.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              Full web applications, SaaS products, booking systems, marketplace platforms, and member tools — for businesses that have an idea that needs to become a real working product. We design, build, and ship. Fixed price where possible, clear milestones always.
            </p>
            <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">What we build</span>
            <h2 style={{ marginBottom: '48px' }}>Platforms for real problems</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
              {[
                { icon: '🚀', title: 'SaaS products', desc: 'Subscription-based tools built for a specific industry or problem. Multi-tenant architecture, user authentication, billing integration.' },
                { icon: '📅', title: 'Booking and scheduling platforms', desc: 'Online booking with availability management, payment processing, automated confirmations, and admin dashboards.' },
                { icon: '👥', title: 'Member platforms', desc: 'Gated communities, subscription content sites, online courses, and member directories — with payment, access control, and communication built in.' },
                { icon: '🛒', title: 'Marketplaces', desc: 'Two-sided platforms connecting buyers and sellers, with listing management, search, messaging, and payment processing.' },
                { icon: '📊', title: 'Internal platforms', desc: 'Tools your team uses every day — dashboards, project management, workflow tools built around exactly how your team works.' },
                { icon: '🤖', title: 'AI-powered platforms', desc: 'Platforms with intelligence built in — AI-assisted content creation, smart search, automated processing, or Claude-powered features.' },
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
            <span className="section-label">Live example</span>
            <h2 style={{ marginBottom: '16px' }}>Kismet — a wedding planning platform in development</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '32px' }}>
              Kismet is a UK wedding planning platform we are building — guest management, smart seating planner with conflict detection, budget tracker, vendor tools, and an AI vow and speech generator. The waitlist is live and the platform is in active development. This is what platform development looks like in practice.
            </p>
            <a href="https://kismetplans.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', background: 'var(--ink)', borderRadius: 'var(--radius)', color: 'var(--white)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              See Kismet →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Have a platform idea<br /><em style={{ color: 'var(--amber)' }}>you want to bring to life?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us what you are trying to build and we will tell you how we would approach it — and what it would cost.</p>
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
