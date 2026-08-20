'use client'
export default function MTD() {
  return (
    <section id="mtd" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark-2)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.3)',
              borderRadius: '100px', padding: '5px 14px', marginBottom: '24px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#e05c2a', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Regulatory Update · August 2026</span>
            </div>
            <h2 style={{ color: 'var(--white)', marginBottom: '20px', lineHeight: '1.15' }}>
              Is your business ready for<br />
              <em style={{ color: 'var(--amber)' }}>Making Tax Digital?</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: '1.8', marginBottom: '28px', fontWeight: '300' }}>
              Making Tax Digital is now live for UK businesses with income over £50,000. The second quarterly deadline is 7 November 2026 — less than 12 weeks away. Businesses still relying on manual Excel processes are running out of time.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '17px', lineHeight: '1.8', marginBottom: '36px', fontWeight: '300' }}>
              We can audit your current reporting setup, identify what needs to change, and have you MTD-ready before the November deadline — in days, not months.
            </p>
            <a href="#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free MTD readiness call →
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { issue: 'Still exporting from Xero or Sage into Excel manually?', risk: 'High risk — manual exports are not MTD-compliant' },
              { issue: 'Monthly reporting cycle taking days?', risk: 'MTD requires quarterly submissions — monthly is too slow' },
              { issue: 'No single source of truth for your financial data?', risk: 'HMRC requires consistent, structured digital records' },
              { issue: 'Reporting locked in one person\'s spreadsheet?', risk: 'Business continuity risk — what if they leave?' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '20px 24px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid var(--amber)',
                borderRadius: '0 8px 8px 0',
              }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--white)', marginBottom: '6px' }}>{item.issue}</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{item.risk}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
