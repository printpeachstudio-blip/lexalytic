'use client'
const tiers = [
  {
    name: 'Essential',
    price: 'Quick win',
    description: 'Perfect for a single automation, report, or process — scoped and priced before any work begins.',
    features: [
      'Single process or workflow',
      'Delivered within 5 working days',
      'Full documentation included',
      '1 round of revisions',
      '2 weeks post-delivery support',
    ],
    cta: 'Get a quote',
    highlight: false,
  },
  {
    name: 'Professional',
    price: 'Full build',
    description: 'For more complex builds — full dashboards, multi-process automation, or integrated systems.',
    features: [
      'Multiple processes or full dashboard',
      'Delivered within 10 working days',
      'Full documentation + walkthrough',
      '2 rounds of revisions',
      '4 weeks post-delivery support',
      'Priority response',
    ],
    cta: 'Most popular',
    highlight: true,
  },
  {
    name: 'Retainer',
    price: 'Ongoing',
    description: 'Ongoing support, updates, and new builds as your business evolves. A data partner, not just a one-off consultant.',
    features: [
      'Monthly hours for new builds & updates',
      'Priority turnaround on all requests',
      'Proactive improvement suggestions',
      'Quarterly data process review',
      'Direct line — no ticketing system',
    ],
    cta: 'Let\'s talk',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <span className="section-label">Pricing</span>
        <div style={{ marginBottom: '16px' }}>
          <h2>Fixed price.<br />No surprises.</h2>
        </div>
        <p style={{ fontSize: '16px', color: 'var(--ink-3)', marginBottom: '48px', maxWidth: '520px' }}>
          Every project is scoped individually and priced upfront — before any work begins. Tell us your problem, and we'll tell you exactly what it will cost to fix it.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '20px',
          alignItems: 'start',
        }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              background: t.highlight ? 'var(--ink)' : 'var(--white)',
              border: t.highlight ? '2px solid var(--amber)' : '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              position: 'relative',
            }}>
              {t.highlight && (
                <div style={{
                  position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--amber)', color: 'var(--white)',
                  fontSize: '11px', fontWeight: '600', padding: '4px 16px',
                  borderRadius: '100px', letterSpacing: '0.5px', whiteSpace: 'nowrap',
                }}>MOST POPULAR</div>
              )}

              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: t.highlight ? 'var(--amber)' : 'var(--ink-3)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t.name}</span>
              </div>

              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: t.highlight ? 'var(--white)' : 'var(--ink)', marginBottom: '8px' }}>
                {t.price}
              </div>

              <p style={{ fontSize: '14px', color: t.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', marginBottom: '24px', lineHeight: '1.6' }}>{t.description}</p>

              <div style={{ borderTop: `1px solid ${t.highlight ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`, paddingTop: '20px', marginBottom: '28px' }}>
                {t.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: t.highlight ? 'rgba(255,255,255,0.7)' : 'var(--ink-2)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className={t.highlight ? 'btn-amber' : 'btn-primary'} style={{ width: '100%', justifyContent: 'center' }}>
                {t.cta} →
              </a>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '40px', padding: '24px 28px',
          background: 'var(--amber-bg)', border: '1px solid rgba(193,125,46,0.2)',
          borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '20px' }}>💡</span>
          <p style={{ fontSize: '14px', color: 'var(--ink-2)', flex: 1, minWidth: '200px' }}>
            <strong style={{ color: 'var(--ink)' }}>Not sure where to start?</strong> Book a free 30-minute call and we'll scope your project and give you a clear fixed price — before you commit to anything.
          </p>
          <a href="#contact" className="btn-amber" style={{ flexShrink: 0, fontSize: '14px', padding: '11px 22px' }}>Book free call →</a>
        </div>
      </div>
    </section>
  )
}
