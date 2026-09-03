'use client'

const projects = [
  {
    name: 'Lexalytic',
    url: 'https://www.lexalytic.com',
    type: 'Website · Digital Studio',
    desc: 'This site. A bespoke Next.js website with automated blog publishing, GitHub Actions scheduling, structured data, and full SEO optimisation — built and maintained entirely in-house.',
    tags: ['Next.js', 'GitHub Actions', 'SEO', 'Vercel'],
    stat: { num: '3.7K', label: 'Monthly impressions' },
    color: 'var(--amber)',
  },
  {
    name: 'CVCraft AI',
    url: 'https://cvcraft-ai.co.uk',
    type: 'AI-Powered Product · SaaS',
    desc: 'An AI-powered CV rewriting service. Customers submit their CV and target role, Claude rewrites it to beat ATS systems, Stripe handles payment, and the finished document is delivered within 24 hours.',
    tags: ['AI', 'Stripe payments', 'Claude', 'Automated delivery'],
    stat: { num: 'AI', label: 'Powered by Claude' },
    color: '#6366f1',
  },
  {
    name: 'FamilyEntitled',
    url: 'https://www.familyentitled.co.uk',
    type: 'Public Tool · Content Site',
    desc: 'A UK government entitlements calculator for families. Complex eligibility logic across 8+ benefit schemes, fully client-side with no data stored, built with a content strategy targeting high-value financial keywords.',
    tags: ['Calculator tool', 'SEO content', 'Privacy-first', 'No backend'],
    stat: { num: '£4,700', label: 'Average family finding' },
    color: '#10b981',
  },
  {
    name: 'Kismet',
    url: 'https://kismetplans.com',
    type: 'Platform · In Development',
    desc: 'A UK wedding planning platform — guest management, smart seating planner, budget tracker, vendor tools, and AI vow and speech generator. Built with waitlist, GDPR compliance, and Vercel deployment.',
    tags: ['Platform', 'SaaS', 'AI features', 'In development'],
    stat: { num: 'Live', label: 'Waitlist active' },
    color: '#ec4899',
  },
]

export default function Work() {
  return (
    <section id="work" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Our work</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ color: 'var(--white)', maxWidth: '560px' }}>Things we have actually built.</h2>
          <a href="#contact" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)', flexShrink: 0 }}>Start your project →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '24px' }}>
          {projects.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              textDecoration: 'none',
              display: 'block',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.18)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{p.type}</div>
                  <h3 style={{ color: 'var(--white)', fontFamily: 'var(--serif)', fontSize: '1.4rem', margin: 0 }}>{p.name}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: p.color, lineHeight: '1' }}>{p.stat.num}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{p.stat.label}</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.75', marginBottom: '20px' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '100px' }}>{t}</span>
                ))}
              </div>
              <div style={{ fontSize: '13px', color: p.color }}>View project →</div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: '48px', padding: '28px 32px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.15)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: 'var(--white)', fontWeight: '500', marginBottom: '4px' }}>Want to see something specific?</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>Tell us what you are trying to build and we will show you relevant examples from our work.</div>
          </div>
          <a href="#contact" className="btn-amber" style={{ flexShrink: 0 }}>Get in touch →</a>
        </div>
      </div>
    </section>
  )
}
