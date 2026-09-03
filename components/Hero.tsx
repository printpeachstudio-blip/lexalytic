'use client'
export default function Hero() {
  return (
    <section style={{
      background: 'var(--bg-dark)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '68px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(193,125,46,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(193,125,46,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px' }}>
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '36px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>
              UK Digital Studio · Fixed Price · Now taking on new projects
            </span>
          </div>
          <h1 className="fade-up-2" style={{ color: 'var(--white)', marginBottom: '28px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
            Your business deserves tools<br />
            <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>built around how it actually works.</em>
          </h1>
          <p className="fade-up-3" style={{
            fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
            maxWidth: '620px', marginBottom: '44px', fontWeight: '300', lineHeight: '1.75',
          }}>
            We build websites, custom business software, AI-powered tools, and data systems for UK businesses. Fixed price. No account managers. You work directly with the person doing the work.
          </p>
          <p className="fade-up-3" style={{
            fontSize: '15px', color: 'rgba(255,255,255,0.35)',
            maxWidth: '560px', marginBottom: '44px', fontWeight: '300', lineHeight: '1.7',
          }}>
            15 years experience across Shell, NHS, Warner Bros, and Citi — now working directly with UK businesses of every size.
          </p>
          <div className="fade-up-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free scoping call →
            </a>
            <a href="#work" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.12)', fontSize: '15px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
            >
              See our work →
            </a>
          </div>
          <div style={{ marginTop: '80px', maxWidth: '700px' }}>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '36px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {[
                { num: '15+', label: 'Years of experience' },
                { num: '50+', label: 'Projects delivered' },
                { num: '4', label: 'Live products built' },
                { num: '★ 5.0', label: 'Client satisfaction' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '4px 0',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  paddingRight: i < 3 ? '24px' : '0',
                  paddingLeft: i > 0 ? '24px' : '0',
                }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--white)', marginBottom: '6px', lineHeight: '1' }}>{s.num}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontWeight: '300', lineHeight: '1.5' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
