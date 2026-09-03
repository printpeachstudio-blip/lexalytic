'use client'

const sectors = [
  'Construction', 'Recruitment', 'Professional Services', 'Healthcare',
  'Retail', 'Hospitality', 'Financial Services', 'Technology Startups',
  'Creative Agencies', 'Manufacturing', 'Education', 'Property',
]

export default function WhoWeWorkWith() {
  return (
    <section style={{ padding: 'clamp(32px, 4vw, 48px) 0', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-4)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', flexShrink: 0 }}>
            We work with
          </span>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
            {sectors.map((s, i) => (
              <span key={i} style={{
                fontSize: '13px', color: 'var(--ink-3)',
                background: 'var(--bg)', border: '1px solid var(--border)',
                padding: '5px 14px', borderRadius: '100px',
              }}>{s}</span>
            ))}
            <span style={{
              fontSize: '13px', color: 'var(--amber)',
              padding: '5px 14px',
            }}>and any UK business with a problem to solve →</span>
          </div>
        </div>
      </div>
    </section>
  )
}
