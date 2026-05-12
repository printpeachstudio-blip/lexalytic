'use client'
const results = [
  {
    industry: 'Health & Beauty',
    role: 'Hairdressing Group',
    problem: 'The business had grown over the years but the data hadn\'t kept up. Financials were scattered across multiple spreadsheets with nothing linking together. They\'d inherited a set of macros from a previous consultant that either didn\'t work at all or took so long to run that nobody used them. The owner had no clear picture of how the business was actually performing.',
    solution: 'Started with a full data cleanse — restructuring everything so it was consistent and connected. Then rebuilt all the macros from scratch. Faster, reliable, properly documented so the team could understand what everything did.',
    outcome: 'For the first time, the owner could open one file and see accurate figures across the whole business. Macros that used to take minutes — or fail entirely — now run in seconds. The data finally reflects the business.',
    metric: '100%',
    metricLabel: 'macros rebuilt & working',
  },
  {
    industry: 'Healthcare',
    role: 'Independent Pharmacy',
    problem: 'Managing 20+ locum pharmacists meant keeping track of who was working when, what each person\'s rate was, and when payments were due. It was all spread across separate spreadsheets — which meant payments were frequently late or wrong, scheduling clashes went unnoticed, and the admin overhead was significant.',
    solution: 'Built a fully automated locum tracker with a simple input form for logging shifts and rates. The system calculates pay automatically, highlights in red when a payment is coming due, flags any scheduling conflicts, and keeps a clean record of every shift worked and every payment made.',
    outcome: 'The pharmacy team now spends minutes on locum admin instead of hours. Nothing gets missed. Payments go out on time. And if there\'s a conflict in the rota, the system catches it before it becomes a problem.',
    metric: '0',
    metricLabel: 'missed payments since launch',
  },
  {
    industry: 'Professional Services',
    role: 'Managing Director',
    problem: 'No central view of project profitability. Directors were making resourcing decisions without reliable data — guessing which clients and projects were actually profitable and which were draining the business.',
    solution: 'Power BI dashboard connected to their project management and finance systems. Live P&L by project, client, and team member — updated automatically, no manual input required.',
    outcome: 'Full visibility within 48 hours of the build completing. The MD now opens one dashboard for the weekly leadership meeting instead of waiting for someone to compile a report.',
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
