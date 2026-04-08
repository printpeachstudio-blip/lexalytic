'use client'
const results = [
  {
    industry: 'Manufacturing',
    role: 'Operations Manager',
    problem: 'Weekly production report took 4 hours to compile across 6 spreadsheets. Errors were common and the data was always a day old.',
    solution: 'Automated Excel reporting system pulling from all source files, with a Power BI dashboard for live floor visibility.',
    outcome: '4 hours → 8 minutes. Zero errors. Data visible in real time.',
    metric: '97%',
    metricLabel: 'time saved',
  },
  {
    industry: 'Finance & Accounting',
    role: 'Finance Director',
    problem: 'Month-end reconciliation across 3 systems was a 2-day manual process every single month.',
    solution: 'Python automation to pull, reconcile, and flag discrepancies across all three systems automatically.',
    outcome: '2 days → 20 minutes. Discrepancies flagged automatically. Team redirected to analysis.',
    metric: '2 days',
    metricLabel: 'saved monthly',
  },
  {
    industry: 'Professional Services',
    role: 'Managing Director',
    problem: 'No central view of project profitability. Directors were making resourcing decisions without reliable data.',
    solution: 'Power BI dashboard connected to their project management and finance tools. Live P&L by project, client, and team.',
    outcome: 'Full visibility within 48 hours of build. Board-ready reporting in one click.',
    metric: '48hrs',
    metricLabel: 'to full visibility',
  },
]

export default function Results() {
  return (
    <section id="results" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
      <div className="container">
        <span className="section-label">Results</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ maxWidth: '420px' }}>Real problems.<br />Real outcomes.</h2>
          <p style={{ color: 'var(--ink-3)', maxWidth: '300px', fontSize: '14px' }}>
            Every result below started with a manual process that was costing someone hours every week.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {results.map((r, i) => (
            <div key={i} style={{
              background: 'var(--white)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--ink)' }}>{r.industry}</div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-4)' }}>{r.role}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--amber)' }}>{r.metric}</div>
                  <div style={{ fontSize: '11px', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{r.metricLabel}</div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>The problem</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{r.problem}</p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>What we built</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{r.solution}</p>
                </div>
                <div style={{
                  background: 'var(--amber-bg)', border: '1px solid rgba(193,125,46,0.15)',
                  borderRadius: 'var(--radius)', padding: '14px 16px',
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Outcome</div>
                  <p style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: '400', lineHeight: '1.5' }}>{r.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '48px', textAlign: 'center', padding: '40px',
          background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', marginBottom: '8px' }}>
            These aren't edge cases — they're typical projects.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
            If your team spends time on any manual reporting or data process, there's almost certainly a faster way. Let us show you what's possible.
          </p>
          <a href="#contact" className="btn-primary">Book a free 30-minute call →</a>
        </div>
      </div>
    </section>
  )
}
