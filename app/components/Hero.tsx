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
      {/* Subtle grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Amber glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 24px' }}>
        <div style={{ maxWidth: '820px' }}>

          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>
              Data & Automation Consultancy
            </span>
          </div>

          <h1 className="fade-up-2" style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.1' }}>
            Turn your data<br />
            <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>into decisions.</em>
          </h1>

          <p className="fade-up-3" style={{
            fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.6)',
            maxWidth: '560px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.7',
          }}>
            We build bespoke automation, dashboards, and reporting systems that eliminate manual work — so your team spends time on decisions, not spreadsheets.
          </p>

          <div className="fade-up-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#contact" className="btn-amber">Book a free scoping call →</a>
            <a href="#tool" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.15)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Calculate your time cost →
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px', background: 'rgba(255,255,255,0.06)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            marginTop: '72px', maxWidth: '560px',
          }}>
            {[
              { num: '90%', label: 'Average time saved on reporting' },
              { num: '£495', label: 'Projects start from' },
              { num: '48h', label: 'Typical turnaround on scoping' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '24px 20px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--white)', marginBottom: '4px' }}>{s.num}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: '300', lineHeight: '1.4' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
