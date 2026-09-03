'use client'

const projects = [
  {
    name: 'CVCraft AI',
    url: 'https://cvcraft-ai.co.uk',
    type: 'AI-Powered Product',
    desc: 'An AI-powered CV rewriting service. Customers submit their CV and target role, Claude rewrites it to beat ATS systems, Stripe handles payment, and the finished document is delivered within 24 hours. Fully automated — no human involvement between submission and delivery.',
    tags: ['Claude AI', 'Stripe', 'Automated delivery', 'SaaS'],
    stat: { num: '24hr', label: 'Automated delivery' },
    color: '#6366f1',
    image: '/work-cvcraft.jpg',
  },
  {
    name: 'FamilyEntitled',
    url: 'https://www.familyentitled.co.uk',
    type: 'Public Tool',
    desc: 'A UK government entitlements calculator for families. Complex eligibility logic across 8+ benefit schemes, fully client-side with no data stored, and a content strategy targeting high-value financial keywords.',
    tags: ['Calculator tool', 'SEO content', 'Privacy-first'],
    stat: { num: '£4,700', label: 'Avg family finding' },
    color: '#10b981',
    image: '/work-familyentitled.jpg',
  },
  {
    name: 'Kismet',
    url: 'https://kismetplans.com',
    type: 'Platform in Development',
    desc: 'A UK wedding planning platform — guest management, smart seating planner with conflict detection, budget tracker, vendor tools, and AI vow and speech generator. Waitlist live, platform in active development.',
    tags: ['Platform', 'SaaS', 'AI features'],
    stat: { num: 'Live', label: 'Waitlist active' },
    color: '#ec4899',
    image: '/work-kismet.jpg',
  },
  {
    name: 'Lexalytic',
    url: 'https://www.lexalytic.com',
    type: 'This site',
    desc: 'The site you are on right now. Bespoke Next.js, automated blog publishing via GitHub Actions, 97 pages, SEO score 100, structured data on every page, llms.txt for AI search visibility. Built and iterated continuously.',
    tags: ['Next.js', 'SEO 100', 'Blog automation'],
    stat: { num: '97', label: 'Pages indexed' },
    color: 'var(--amber)',
    image: '/work-lexalytic.jpg',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: '2px' }}>
          {projects.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
              textDecoration: 'none',
              display: 'block',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: i === 0 ? 'var(--radius-lg) var(--radius-lg) 0 0' : i === projects.length - 1 ? '0 0 var(--radius-lg) var(--radius-lg)' : '0',
              overflow: 'hidden',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '220px' }}>
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{p.type}</div>
                    <h3 style={{ color: 'var(--white)', fontFamily: 'var(--serif)', fontSize: '1.5rem', margin: '0 0 12px', letterSpacing: '-0.02em' }}>{p.name}</h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7', marginBottom: '16px' }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.06)', padding: '3px 10px', borderRadius: '100px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: p.color, lineHeight: '1' }}>{p.stat.num}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>{p.stat.label}</div>
                    </div>
                    <span style={{ fontSize: '13px', color: p.color }}>View live →</span>
                  </div>
                </div>
                <div style={{ position: 'relative', overflow: 'hidden', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', zIndex: 1 }} />
                  <img
                    src={p.image}
                    alt={p.name + ' screenshot'}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: '32px', padding: '28px 32px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.15)', borderRadius: 'var(--radius-lg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ color: 'var(--white)', fontWeight: '500', marginBottom: '4px' }}>Not seeing your type of project?</div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>We have built more than what is shown here. Tell us what you need and we will share relevant examples.</div>
          </div>
          <a href="#contact" className="btn-amber" style={{ flexShrink: 0 }}>Get in touch →</a>
        </div>
      </div>
    </section>
  )
}
