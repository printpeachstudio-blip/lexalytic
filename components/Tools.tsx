import Link from 'next/link'

const tools = [
  {
    href: '/tools/data-health-check',
    name: 'Data health check',
    line: 'Finds the errors that break UK business systems. VAT numbers that fail the HMRC checksum, company numbers Excel has stripped the leading zero from, columns holding two different date formats.',
    who: 'Anyone importing a list',
  },
  {
    href: '/tools/retention-tracker',
    name: 'Retention tracker',
    line: 'Works out what is held across every job, whether deduction has passed the cap, and when each half falls due.',
    who: 'Construction',
  },
  {
    href: '/tools/build-estimator',
    name: 'Build cost estimator',
    line: 'What a custom system would cost, itemised, with a reason against every line. Download the brief and take it anywhere.',
    who: 'Weighing up a build',
  },
  {
    href: '/tools/reporting-cost',
    name: 'Reporting cost calculator',
    line: 'What manual reporting actually costs, by role, using true employment cost rather than salary. Then how quickly automating it would pay for itself.',
    who: 'Every business',
  },
]

export default function Tools() {
  return (
    <section
      id="tools"
      style={{
        padding: 'clamp(60px, 8vw, 100px) 0',
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <span className="section-label">Free tools</span>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '48px',
          alignItems: 'end',
          marginBottom: '44px',
        }} className="tools-head">
          <h2 style={{ margin: 0, maxWidth: '440px' }}>
            Try something before you talk to anyone
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--ink-3)',
            lineHeight: '1.8',
            margin: 0,
            maxWidth: '460px',
          }}>
            Seven tools we needed and could not find a decent UK version of, so we built them. No signup,
            no email wall, and nothing you enter is sent anywhere. They are also a fair test of whether
            we know what we are doing.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2px',
          background: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '36px',
        }}>
          {tools.map(t => (
            <Link
              key={t.href}
              href={t.href}
              style={{
                background: 'var(--bg-2)',
                padding: '28px 30px',
                textDecoration: 'none',
                display: 'block',
              }}
              className="tool-card"
            >
              <div style={{
                fontSize: '11px',
                color: 'var(--amber)',
                fontWeight: '600',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}>
                {t.who}
              </div>
              <h3 style={{
                fontSize: '1.05rem',
                marginBottom: '10px',
                fontWeight: '600',
                color: 'var(--ink)',
              }}>
                {t.name}
              </h3>
              <p style={{
                fontSize: '14px',
                color: 'var(--ink-3)',
                lineHeight: '1.7',
                margin: 0,
              }}>
                {t.line}
              </p>
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/tools" className="btn-primary" style={{ fontSize: '15px' }}>
            See all seven tools
          </Link>
          <span style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>
            One of them grew into a product.{' '}
            <Link href="/retention-manager" style={{ color: 'var(--amber)' }}>
              Retention Manager
            </Link>{' '}
            tracks it properly and chases it for you, from £19 a month.
          </span>
        </div>
      </div>

      <style>{`
        .tool-card:hover { background: var(--white) !important; }
        @media (max-width: 800px) {
          .tools-head { grid-template-columns: 1fr !important; gap: 18px !important; align-items: start !important; }
        }
      `}</style>
    </section>
  )
}
