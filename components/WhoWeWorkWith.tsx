'use client'

// Sectors that have a page behind them become links. The rest stay as
// plain chips rather than sending people somewhere that does not exist.
const HREFS: Record<string, string> = {
  'Construction': '/industries/construction',
  'Recruitment': '/industries/recruitment',
  'Professional Services': '/industries/professional-services',
  'Healthcare': '/industries/healthcare',
  'Hospitality': '/industries/hospitality',
  'Property': '/industries/property',
  'Technology Startups': '/startups',
}

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
            {sectors.map((s, i) => {
            const href = HREFS[s]
            const chipStyle = {
                fontSize: '13px', color: 'var(--ink-3)',
                background: 'var(--bg)', border: '1px solid var(--border)',
                padding: '5px 14px', borderRadius: '100px',
              }
            return href ? (
              <a key={i} href={href} style={{ ...chipStyle, textDecoration: 'none' }}>{s}</a>
            ) : (
              <span key={i} style={chipStyle}>{s}</span>
            )
          })}
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
