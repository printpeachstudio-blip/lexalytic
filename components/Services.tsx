'use client'
import Link from 'next/link'

const services = [
  {
    icon: '⚡',
    title: 'Excel Automation',
    slug: 'excel-automation',
    desc: 'Turn hours of manual copy-paste into a one-click process. We automate your most time-consuming spreadsheet workflows so reports run themselves.',
    time: '3–5 days',
    from: 'From £495',
    tags: ['Reporting', 'Data processing', 'Reconciliation'],
  },
  {
    icon: '🔧',
    title: 'VBA Development',
    slug: 'vba-development',
    desc: 'Custom macros and tools built around your exact business logic. Eliminate repetitive tasks and reduce human error with bespoke automation.',
    time: '3–7 days',
    from: 'From £495',
    tags: ['Custom tools', 'Macros', 'Workflows'],
  },
  {
    icon: '📊',
    title: 'Power BI Dashboards',
    slug: 'power-bi',
    desc: 'Live, interactive dashboards that give decision-makers instant visibility into KPIs — connected to your data, refreshed automatically.',
    time: '5–10 days',
    from: 'From £750',
    tags: ['KPI tracking', 'Live data', 'Visualisation'],
  },
  {
    icon: '🔄',
    title: 'Power Automate',
    slug: 'power-automate',
    desc: 'Automate repetitive business workflows across Microsoft 365 — from approvals and notifications to data collection and system updates.',
    time: '3–7 days',
    from: 'From £495',
    tags: ['Microsoft 365', 'Workflows', 'Approvals'],
  },
  {
    icon: '🐍',
    title: 'Python Automation',
    slug: 'python-automation',
    desc: 'For complex, large-scale data tasks that go beyond spreadsheets. We build reliable Python scripts that handle data processing at any volume.',
    time: '5–10 days',
    from: 'From £750',
    tags: ['Data pipelines', 'Large datasets', 'Scheduling'],
  },
  {
    icon: '📋',
    title: 'Google Sheets',
    slug: 'google-sheets',
    desc: 'Automated reporting, dashboards, and data workflows built in Google Sheets — ideal for teams already working in Google Workspace.',
    time: '3–5 days',
    from: 'From £495',
    tags: ['Google Workspace', 'Automation', 'Dashboards'],
  },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
      <div className="container">
        <span className="section-label">What we do</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ maxWidth: '480px' }}>Every service. Clear scope. Fixed price.</h2>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>Get a free quote →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {services.map((s, i) => (
            <Link key={i} href={`/services/${s.slug}`} style={{
              background: 'var(--white)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '28px',
              transition: 'all 0.2s', display: 'block', textDecoration: 'none',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--amber)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{s.icon}</div>
              <h3 style={{ marginBottom: '10px', fontFamily: 'var(--serif)' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', color: 'var(--ink-3)' }}>{s.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontSize: '11px', fontWeight: '500', color: 'var(--ink-3)', background: 'var(--bg-2)', padding: '4px 10px', borderRadius: '100px' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--ink-3)' }}>⏱ {s.time}</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--amber)' }}>{s.from} →</span>
              </div>
            </Link>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--ink-4)' }}>
          Complex or multi-system projects are scoped individually — you'll always get a clear number before any work begins.
        </p>
      </div>
    </section>
  )
}
