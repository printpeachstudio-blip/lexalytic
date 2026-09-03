'use client'

const results = [
  {
    industry: 'Healthcare',
    type: 'Custom Business Tool',
    client: 'Independent Pharmacy',
    problem: 'Managing 20+ locum pharmacists across shifting rotas with no central system. Payment dates, hours, and rates tracked across separate spreadsheets — payments frequently late or wrong, scheduling clashes went unnoticed, and the admin overhead was significant.',
    solution: 'A fully custom locum management tool with a simple input form. The system calculates pay automatically, highlights payment due dates in red, flags scheduling conflicts, and keeps a complete record of every shift and payment.',
    outcome: 'The pharmacy team now spends minutes on locum admin instead of hours. Nothing gets missed. Payments go out on time. Scheduling conflicts caught before they become problems.',
    metric: '0',
    metricLabel: 'Missed payments since launch',
    tag: 'Custom Tool',
  },
  {
    industry: 'Professional Services',
    type: 'Power BI Dashboard',
    client: 'Managing Director',
    problem: 'No central view of project profitability. Directors making resourcing decisions without reliable data — guessing which clients and projects were actually profitable and which were quietly draining the business.',
    solution: 'Power BI dashboard connected directly to their project management and finance systems. Live P&L by project, client, and team member — updated automatically, no manual input required.',
    outcome: 'Full visibility within 48 hours of the build completing. The MD now opens one dashboard for the weekly leadership meeting instead of waiting for someone to compile a report.',
    metric: '48hrs',
    metricLabel: 'From build to full visibility',
    tag: 'Data & Reporting',
  },
  {
    industry: 'AI Product',
    type: 'AI-Powered SaaS',
    client: 'CVCraft AI',
    problem: 'A gap in the market for fast, affordable, AI-powered CV rewriting that beats ATS systems. Professional CV services take days and cost hundreds. Generic templates do not address the specific requirements of modern hiring systems.',
    solution: 'Built and launched CVCraft AI — a fully automated CV rewriting service. Claude rewrites the CV for the target role, Stripe handles payment, and the finished document is delivered to the customer within 24 hours. No human involvement between submission and delivery.',
    outcome: 'A live, operating AI product with automated end-to-end delivery. Every step from payment to finished document runs without manual intervention. The same architecture we use for client AI tool projects.',
    metric: '24hr',
    metricLabel: 'Automated delivery, zero manual steps',
    tag: 'AI Tool',
  },
  {
    industry: 'Health & Beauty',
    type: 'Data Automation',
    client: 'Hairdressing Group',
    problem: 'Financials scattered across multiple spreadsheets with nothing linking together. Inherited macros from a previous consultant that either did not work at all or took so long to run that nobody used them. No clear picture of how the business was actually performing.',
    solution: 'Full data cleanse — restructuring everything so it was consistent and connected. Rebuilt all macros from scratch: faster, reliable, properly documented so the team could understand what everything did.',
    outcome: 'For the first time, the owner could open one file and see accurate figures across the whole business. Macros that used to take minutes — or fail entirely — now run in seconds.',
    metric: '100%',
    metricLabel: 'Macros rebuilt and working',
    tag: 'Data Automation',
  },
]

export default function Results() {
  return (
    <section id="results" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
      <div className="container">
        <span className="section-label">Results</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ maxWidth: '480px' }}>Real projects.<br />Specific outcomes.</h2>
          <a href="#contact" className="btn-primary" style={{ flexShrink: 0 }}>Start your project →</a>
        </div>
        <p style={{ color: 'var(--ink-3)', fontSize: '15px', marginBottom: '48px', maxWidth: '560px' }}>
          Websites, custom tools, AI products, data systems — a sample of what we have built and what changed as a result.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {results.map((r, i) => (
            <div key={i} style={{
              background: 'var(--white)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '3px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '8px' }}>{r.tag}</span>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink)' }}>{r.client}</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-4)' }}>{r.industry}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--amber)', lineHeight: '1' }}>{r.metric}</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px', maxWidth: '120px' }}>{r.metricLabel}</div>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>The situation</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7' }}>{r.problem}</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>What we built</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7' }}>{r.solution}</p>
                </div>
                <div style={{
                  background: 'var(--amber-bg)', border: '1px solid rgba(193,125,46,0.15)',
                  borderRadius: 'var(--radius)', padding: '14px 16px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Outcome</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '400', lineHeight: '1.6' }}>{r.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: '48px', padding: '40px',
          background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)', textAlign: 'center',
        }}>
          <p style={{ fontSize: '17px', color: 'var(--ink)', fontWeight: '500', marginBottom: '8px' }}>
            Every project starts with a free 30-minute call.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
            Tell us what you are trying to build or fix. We will tell you what makes sense — and what it would cost.
          </p>
          <a href="#contact" className="btn-primary">Book your free scoping call →</a>
        </div>
      </div>
    </section>
  )
}
