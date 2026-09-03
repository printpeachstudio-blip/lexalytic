import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/sage-vs-xero-automated-reporting' },
  title: 'Sage vs Xero: Which Is Better for Automated Reporting? (UK 2026) | Lexalytic',
  description: 'Sage vs Xero for UK businesses in 2026 — which connects better to Excel, Power BI, and automated reporting tools. An honest comparison from a UK data automation consultant.',
  keywords: 'Sage vs Xero UK, Xero vs Sage reporting, Sage vs Xero Excel integration, best accounting software automated reporting UK, Sage vs Xero Power BI',
  openGraph: {
    title: 'Sage vs Xero: Which Is Better for Automated Reporting? (UK 2026)',
    description: 'Which accounting software connects better to Excel and automated reporting tools? An honest comparison for UK businesses.',
    url: 'https://www.lexalytic.com/blog/sage-vs-xero-automated-reporting',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Sage vs Xero: Which Is Better for Automated Reporting? (UK 2026)","description":"Sage vs Xero for UK businesses in 2026 — which connects better to Excel, Power BI, and automated reporting tools.","datePublished":"2026-06-19","dateModified":"2026-06-19","url":"https://www.lexalytic.com/blog/sage-vs-xero-automated-reporting","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>

      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Accounting Software</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Reporting</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>June 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Sage vs Xero: Which Is Better for Automated Reporting?
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Both Sage and Xero are excellent accounting tools. But when it comes to connecting your financial data to Excel, Power BI, and automated reporting systems, they are not equal. Here is an honest comparison from the perspective of someone who builds those connections for a living.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio Founder · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>

      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>The short answer</p>
            <p style={{ color: 'var(--ink-2)', lineHeight: '1.75', margin: 0 }}>
              Xero has a more developer-friendly API and connects more easily to Power BI, Power Query, and modern automation tools. Sage — particularly Sage 50 — is more widely used by UK accountants but its data is harder to extract automatically. If automated reporting is a priority, Xero has the edge. If you are already on Sage, switching is rarely worth the disruption — the connection can still be built, it just requires more work.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            This question comes up regularly when I am working with UK businesses on their reporting. They are either choosing between the two for the first time, or they are already on one and wondering whether the other would make their data life easier. The honest answer is that the choice of accounting software matters less than most people think — and what matters far more is how well the connection to your reporting tools is built.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            That said, Xero and Sage are genuinely different when it comes to data accessibility. Here is what those differences look like in practice.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Sage vs Xero accounting software comparison for automated reporting UK businesses"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>How each platform handles data access</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px', marginBottom: '48px' }}>
            {[
              {
                name: 'Xero',
                summary: 'Cloud-first, modern API',
                points: [
                  'RESTful API with comprehensive documentation — well supported and widely used by developers',
                  'Native Power BI connector available through the Power BI marketplace',
                  'Connects directly to Power Query in Excel via the API',
                  'Exports to CSV and Excel from most reports natively',
                  'Webhook support for real-time data triggers',
                  'Large ecosystem of third-party connectors and integrations',
                ],
                verdict: 'Easier to connect to external tools, better for modern automated reporting setups',
                color: 'var(--amber)',
              },
              {
                name: 'Sage',
                summary: 'Established, widely used, more complex data access',
                points: [
                  'Sage 50 (desktop) — data sits in a proprietary database, requires ODBC connection or Sage API for programmatic access',
                  'Sage Business Cloud (online) — more modern API, significantly easier to connect than Sage 50',
                  'Native Power BI connector exists but less polished than Xero',
                  'CSV and Excel exports available from most reports',
                  'Sage Intelligence — built-in reporting tool with Excel integration, useful but limited',
                  'Sage 50 ODBC connection allows direct database queries but requires technical setup',
                ],
                verdict: 'Harder to connect programmatically, especially Sage 50 desktop — but workable with the right approach',
                color: 'var(--ink-3)',
              },
            ].map((platform, i) => (
              <div key={i} style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: `2px solid ${i === 0 ? 'rgba(193,125,46,0.3)' : 'var(--border)'}` }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: platform.color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{platform.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-3)', marginBottom: '20px', fontStyle: 'italic' }}>{platform.summary}</div>
                {platform.points.map((point, j) => (
                  <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: j < platform.points.length - 1 ? '10px' : '20px', alignItems: 'flex-start' }}>
                    <span style={{ color: platform.color, flexShrink: 0, marginTop: '2px', fontSize: '12px' }}>✓</span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{point}</span>
                  </div>
                ))}
                <div style={{ fontSize: '13px', color: platform.color, fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>{platform.verdict}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The practical difference for UK businesses</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            In practice, the difference comes down to how much technical work is required to get your financial data flowing automatically into your reporting tools.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            With Xero, connecting to Power BI or Power Query requires setting up OAuth authentication and building the API queries — but the process is well-documented, widely supported, and relatively straightforward for someone with the right technical knowledge. We covered this in detail in our guide to <Link href="/blog/connect-xero-to-excel-automate-reports" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>connecting Xero to Excel</Link>.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            With Sage 50 desktop, the data sits in a proprietary Pervasive database. You can access it via ODBC — which means writing SQL queries directly against the database — or via the Sage API, which has more limited coverage than Xero. It is workable but requires more technical knowledge and more careful handling of the data structure. Sage Business Cloud is significantly closer to Xero in terms of API accessibility.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Power BI dashboard connected to Xero or Sage accounting data UK"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Connecting to Power BI — the key comparison</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Power BI is the most common destination when businesses want a live financial dashboard. Here is how the two platforms compare specifically for Power BI integration:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--white)' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Factor</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Xero</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Sage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor: 'Native Power BI connector', xero: 'Yes — available in marketplace', sage: 'Yes — but less comprehensive' },
                  { factor: 'API quality', xero: 'Modern REST API, well documented', sage: 'Sage 50: ODBC/legacy. Business Cloud: modern API' },
                  { factor: 'Ease of connection', xero: 'Straightforward with technical knowledge', sage: 'Sage 50: complex. Business Cloud: easier' },
                  { factor: 'Data refresh', xero: 'Scheduled refresh works reliably', sage: 'Works but requires more configuration' },
                  { factor: 'Third-party connectors', xero: 'Large ecosystem, well supported', sage: 'Fewer options, less community support' },
                  { factor: 'MTD compatibility', xero: 'Built-in MTD submission', sage: 'MTD supported across product range' },
                  { factor: 'UK accountant familiarity', xero: 'Very high — widely adopted', sage: 'Very high — long-established in UK' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--ink)' }}>{row.factor}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{row.xero}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{row.sage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Should you switch from Sage to Xero for better reporting?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            This is the question I get asked most often — and my honest answer is almost always no, not primarily for reporting reasons.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Switching accounting software is a significant project. It involves migrating historical data, retraining your team and accountant, potential disruption to your financial processes, and a period of running two systems in parallel. The cost and disruption almost never makes sense just to get a better API connection.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            A properly built Sage connection — via ODBC for Sage 50 or the API for Sage Business Cloud — will give you the same automated reporting outcomes as a Xero connection. It requires more technical work upfront, but the end result is the same: financial data flowing automatically into your Excel models or Power BI dashboards, refreshing on a schedule, without anyone exporting manually.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The exception is if you are choosing for the first time and automated reporting is a key priority from the start. In that case, Xero is the easier path — not because Sage cannot be made to work, but because the initial setup is less complex and the ongoing maintenance is simpler.
          </p>

          <div style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '16px' }}>The honest verdict</h3>
            {[
              { situation: 'Choosing between Xero and Sage for the first time, automated reporting is important', recommendation: 'Choose Xero — easier API, better connector ecosystem, faster to automate' },
              { situation: 'Already on Xero, want to automate reporting', recommendation: 'Good choice — the connection is well-supported and straightforward to build' },
              { situation: 'Already on Sage 50, want to automate reporting', recommendation: 'Stay on Sage — the connection can absolutely be built via ODBC or the API, it just requires more technical setup' },
              { situation: 'Already on Sage Business Cloud, want to automate reporting', recommendation: 'Similar to Xero — the modern API makes this straightforward' },
              { situation: 'Considering switching from Sage to Xero purely for reporting', recommendation: 'Not recommended — the disruption outweighs the benefit. Fix the reporting connection first.' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: i < 4 ? '20px' : '0', paddingBottom: i < 4 ? '20px' : '0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>If you are...</div>
                <div style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '8px', fontWeight: '500' }}>{item.situation}</div>
                <div style={{ fontSize: '14px', color: 'var(--amber)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0 }}>→</span>
                  {item.recommendation}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Automated financial reporting from Sage or Xero to Excel and Power BI UK"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ padding: '20px 24px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}><p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}><strong style={{ color: 'var(--ink)' }}>Worth noting:</strong> Whichever platform you connect, the automated reports will only be as accurate as the underlying data. Inconsistent customer names, mixed date formats, and duplicate entries in Sage or Xero will all show up in your outputs. Our guide to <a href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing</a> covers what to check first.</p></div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'Can Sage connect to Power BI?',
              a: 'Yes. There is a native Sage connector available in the Power BI marketplace. For Sage 50 desktop, you can also connect via ODBC, which allows Power BI to query the Sage database directly. The native connector is more straightforward; the ODBC route gives more flexibility but requires more technical knowledge to set up correctly.',
            },
            {
              q: 'Can Sage data be pulled into Excel automatically?',
              a: 'Yes — via Power Query using either the Sage API or an ODBC connection for Sage 50. Once the connection is set up, Excel can pull your Sage data automatically on refresh, without any manual exports required. The setup is more complex than Xero but the outcome is the same.',
            },
            {
              q: 'Does Xero work with Making Tax Digital?',
              a: 'Yes. Xero is a fully MTD-compatible software and handles quarterly digital submissions directly. Sage is also MTD-compatible across its product range. For MTD specifically, both platforms are equally capable.',
            },
            {
              q: 'Which is better for a small UK business — Sage or Xero?',
              a: 'For most small UK businesses, Xero is the more modern and user-friendly choice, with better app integrations and a cleaner interface. Sage 50 has a long history in UK accounting and many accountants are deeply familiar with it — which has value. The right choice depends on your accountant preferences, the complexity of your accounting needs, and how important direct system integrations are to you.',
            },
            {
              q: 'I use QuickBooks — does the same apply?',
              a: 'QuickBooks Online has a modern API similar to Xero and connects well to Power BI, Power Query, and Excel automation tools. The same general principles apply — the connection can be built to automate your reporting in the same way as Xero or Sage Business Cloud.',
            },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px', padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '12px', fontWeight: '600' }}>{item.q}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.a}</p>
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>Further reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {[
              { label: 'Xero — API documentation and developer resources', url: 'https://developer.xero.com/documentation/getting-started-guide/' },
              { label: 'Sage — Sage 50 ODBC driver documentation', url: 'https://developer.sage.com/accounting/guides/' },
              { label: 'HMRC — Find MTD-compatible software', url: 'https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax' },
              { label: 'Microsoft — Power BI connectors for accounting software', url: 'https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-data-sources' },
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px',
                background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                textDecoration: 'none', color: 'var(--ink-2)', fontSize: '14px',
              }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0 }}>→</span>
                {link.label}
              </a>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { title: 'How to Connect Xero to Excel and Automate Your Reports', href: '/blog/connect-xero-to-excel-automate-reports', tag: 'Excel Automation' },
              { title: 'Power BI vs Excel: Which Should Your Business Use in 2026?', href: '/blog/power-bi-vs-excel', tag: 'Power BI' },
              { title: 'How to Reduce Manual Data Entry in Your Business', href: '/blog/how-to-reduce-manual-data-entry-uk', tag: 'Data Automation' },
              { title: 'How Much Does a Power BI Consultant Cost in the UK?', href: '/blog/power-bi-consultant-cost-uk', tag: 'Power BI' },
            ].map((post, i) => (
              <Link key={i} href={post.href} style={{
                display: 'block', padding: '20px 24px',
                background: 'var(--bg-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', textDecoration: 'none',
              }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.tag}</span>
                <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>{post.title}</p>
              </Link>
            ))}
          </div>

          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Using Sage or Xero and still exporting manually?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. We will look at your current setup and tell you exactly how to get your accounting data flowing automatically into your reporting tools — whichever platform you are on.
            </p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free scoping call →
            </Link>
          </div>

        </div>
      </article>

      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>

    </div>
    </>
  )
}
