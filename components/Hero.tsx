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
        <div style={{ maxWidth: '860px' }}>
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '36px',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
            <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>
              Data, Automation & Custom Tools · UK-Based · Fixed Price
            </span>
          </div>
          <h1 className="fade-up-2" style={{ color: 'var(--white)', marginBottom: '28px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
            Stop doing manually what<br />
            <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>a custom tool could do for you.</em>
          </h1>
          <p className="fade-up-3" style={{
            fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
            maxWidth: '580px', marginBottom: '44px', fontWeight: '300', lineHeight: '1.75',
          }}>
            We build bespoke Power BI dashboards, Excel automation, custom business tools, and reporting systems that give your business one source of truth — updated automatically, no manual work required.
          </p>
          <div className="fade-up-4" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free scoping call →
            </a>
            <a href="#tool" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.12)', fontSize: '15px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'; }}
            >
              Calculate your time cost →
            </a>
          </div>
          <div style={{ marginTop: '80px', maxWidth: '600px' }}>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '36px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {[
                { num: '90%', label: 'Average time saved on reporting' },
                { num: "Fixed price", label: "Scoped within 48 hours" },
                { num: '48h', label: 'Typical turnaround on scoping' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '4px 0',
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  paddingRight: i < 2 ? '32px' : '0',
                  paddingLeft: i > 0 ? '32px' : '0',
                }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: 'var(--white)', marginBottom: '6px', lineHeight: '1' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', fontWeight: '300', lineHeight: '1.5' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
