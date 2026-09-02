'use client'
import Link from 'next/link'

const services = [
  {
    icon: '🤖',
    title: 'AI-Powered Tools',
    slug: 'ai-tools',
    desc: 'Business tools with Claude AI built in. Proposal generators, document processors, intelligent workflows — AI that works inside your processes, not just alongside them. CVCraft AI is a live example we built and operate.',
    time: 'Scoped individually',
    tags: ['Claude AI', 'Automation', 'Intelligent tools'],
    highlight: true,
  },
  {
    icon: '🛠️',
    title: 'Custom Business Tools',
    slug: 'custom-business-tools',
    desc: 'Bespoke web apps built around your exact processes. Custom CRMs, staff rotas, job trackers, client portals, quoting systems. Built once, owned by you. No monthly licence fees. No adapting your business to fit generic software.',
    time: 'Scoped individually',
    tags: ['Custom CRM', 'Web apps', 'No licence fees'],
    highlight: true,
  },
  {
    icon: '🌐',
    title: 'Website Development',
    slug: 'website-development',
    desc: 'Fast, bespoke Next.js websites. No WordPress, no templates, no monthly platform fees. SEO-optimised from the ground up. The site you are on right now scores 100 on Google SEO — we built it the same way we build yours.',
    time: '1–3 weeks',
    tags: ['Next.js', 'SEO 100', 'No platform fees'],
    highlight: true,
  },
  {
    icon: '🚀',
    title: 'Platform Development',
    slug: 'platform-development',
    desc: 'Full web applications, SaaS products, booking systems, and member platforms. From idea to live product. We are building Kismet — a UK wedding planning platform — right now, as a live example of what this looks like in practice.',
    time: 'Scoped individually',
    tags: ['SaaS', 'Full-stack', 'From idea to launch'],
    highlight: false,
  },
  {
    icon: '📊',
    title: 'Power BI Dashboards',
    slug: 'power-bi',
    desc: 'Live, interactive dashboards connected directly to your data. KPIs updated automatically, no manual reporting required. Built for decision-makers who want answers without asking someone to run a report first.',
    time: '5–10 days',
    tags: ['KPI tracking', 'Live data', 'No manual reports'],
    highlight: false,
  },
  {
    icon: '⚡',
    title: 'Excel & Data Automation',
    slug: 'excel-automation',
    desc: 'Turn hours of manual copy-paste into a one-click process. Power Query, VBA, Python — whatever gets the job done cleanly. If you are rebuilding the same spreadsheet every week, that stops here.',
    time: '3–7 days',
    tags: ['Power Query', 'VBA', 'Python'],
    highlight: false,
  },
  {
    icon: '🔄',
    title: 'Workflow Automation',
    slug: 'power-automate',
    desc: 'Automate the repetitive work that should not require a human. Approvals, notifications, data flows, system updates — across Microsoft 365, Google Workspace, or custom systems.',
    time: '3–7 days',
    tags: ['Power Automate', 'Microsoft 365', 'Workflows'],
    highlight: false,
  },
  {
    icon: '🧹',
    title: 'Data Cleansing',
    slug: 'data-cleansing',
    desc: 'Bad data breaks reports and undermines automation. Before we build anything on top of your data, we make sure the foundation is clean, consistent, and reliable.',
    time: '2–5 days',
    tags: ['Duplicates', 'Standardisation', 'Data quality'],
    highlight: false,
  },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
      <div className="container">
        <span className="section-label">What we build</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ maxWidth: '560px' }}>Websites. Software. AI tools. Data systems.</h2>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>Talk to us →</a>
        </div>
        <p style={{ fontSize: '16px', color: 'var(--ink-3)', marginBottom: '48px', maxWidth: '620px' }}>
          Every project is scoped individually. You get a clear fixed price before any work begins — no day rates, no surprises, no minimum spend.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {services.map((s, i) => (
            <Link key={i} href={`/services/${s.slug}`} style={{
              background: s.highlight ? 'var(--ink)' : 'var(--white)',
              border: s.highlight ? '1px solid rgba(193,125,46,0.3)' : '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '28px',
              transition: 'all 0.2s', display: 'block', textDecoration: 'none',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--amber)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = s.highlight ? 'rgba(193,125,46,0.3)' : 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{s.icon}</div>
              <h3 style={{ marginBottom: '10px', fontFamily: 'var(--serif)', color: s.highlight ? 'var(--white)' : 'var(--ink)' }}>{s.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.7', marginBottom: '20px', color: s.highlight ? 'rgba(255,255,255,0.55)' : 'var(--ink-3)' }}>{s.desc}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {s.tags.map(t => (
                  <span key={t} style={{ fontSize: '11px', fontWeight: '500', color: s.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', background: s.highlight ? 'rgba(255,255,255,0.08)' : 'var(--bg-2)', padding: '4px 10px', borderRadius: '100px' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${s.highlight ? 'rgba(255,255,255,0.08)' : 'var(--border)'}`, paddingTop: '16px' }}>
                <span style={{ fontSize: '13px', color: s.highlight ? 'rgba(255,255,255,0.35)' : 'var(--ink-3)' }}>⏱ {s.time}</span>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--amber)' }}>Find out more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
