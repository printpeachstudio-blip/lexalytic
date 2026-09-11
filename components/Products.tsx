import Link from 'next/link'

const products = [
  {
    href: '/retention-manager',
    name: 'Retention Manager',
    who: 'Subcontractors',
    price: 'From £19 a month',
    line: 'Retention is held for years and released in two halves, and the dates are buried in a contract nobody reads twice. This works out what is held across every job, when each half falls due, and whether deduction has passed the cap it should have stopped at.',
    detail: 'Reminders before each date, applications for release with the wording already written, and statutory interest calculated on anything late.',
  },
  {
    href: '/margin-manager',
    name: 'Margin Manager',
    who: 'Restaurants and pubs',
    price: 'From £49 a month',
    line: 'Photograph a delivery note and every dish using those ingredients recosts itself. See which dishes lose money once a platform has taken its third, and which sessions are carrying the week.',
    detail: 'Plus the waste and comp records that explain a gross profit below benchmark, because you cannot reconstruct last year\u2019s log once somebody asks.',
  },
]

export default function Products() {
  return (
    <section id="products" style={{
      padding: 'clamp(60px, 8vw, 100px) 0',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container">
        <h2 style={{ marginBottom: '16px', maxWidth: '620px' }}>
          Two we built and kept
        </h2>
        <p style={{
          fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8',
          maxWidth: '660px', marginBottom: '48px',
        }}>
          Most of what we build belongs to the client. Twice now we have hit a problem common enough
          across a whole industry that it made more sense to build it once and charge for it monthly.
          Both started as something a client needed.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '28px',
        }}>
          {products.map(p => (
            <Link key={p.href} href={p.href} style={{
              display: 'block',
              padding: '32px 34px',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              textDecoration: 'none',
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '12px',
                flexWrap: 'wrap', marginBottom: '14px',
              }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: '22px',
                  color: 'var(--ink)', letterSpacing: '-0.01em',
                }}>{p.name}</span>
                <span style={{
                  fontSize: '12px', fontWeight: 600, color: 'var(--amber)',
                  background: 'rgba(193,125,46,0.1)',
                  border: '1px solid rgba(193,125,46,0.2)',
                  borderRadius: '100px', padding: '3px 11px',
                }}>{p.who}</span>
              </div>

              <p style={{
                fontSize: '15.5px', color: 'var(--ink-2)',
                lineHeight: '1.8', margin: '0 0 14px',
              }}>{p.line}</p>

              <p style={{
                fontSize: '14.5px', color: 'var(--ink-3)',
                lineHeight: '1.75', margin: '0 0 22px',
              }}>{p.detail}</p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                flexWrap: 'wrap', paddingTop: '18px',
                borderTop: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: '14px', color: 'var(--ink)', fontWeight: 500 }}>
                  {p.price}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--amber)', marginLeft: 'auto' }}>
                  Have a look
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p style={{
          fontSize: '15px', color: 'var(--ink-3)',
          lineHeight: '1.8', maxWidth: '620px', marginTop: '32px',
        }}>
          Both have a free version that does the calculation once, in your browser, with nothing
          uploaded. <Link href="/tools" style={{ color: 'var(--amber)' }}>All eleven free tools</Link> are
          worth a look whether or not you ever pay us anything.
        </p>
      </div>
    </section>
  )
}
