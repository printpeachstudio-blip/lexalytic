import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/connect-xero-to-excel-automate-reports' },
  title: 'How to Get Xero Reports into Excel Automatically (UK Guide 2026) | Lexalytic',
  description: 'Stop manually exporting from Xero every week. Here is exactly how to connect Xero to Excel automatically — three methods, step by step, with real UK business examples.',
  keywords: 'connect Xero to Excel UK, Xero Excel integration, automate Xero reports Excel, Xero Power Query UK, Xero reporting automation UK, export Xero to Excel automatically',
  openGraph: {
    title: 'How to Get Xero Reports into Excel Automatically (UK Guide 2026)',
    description: 'Stop manually exporting from Xero every week. Three methods to connect Xero to Excel automatically so your reports update themselves.',
    url: 'https://www.lexalytic.com/blog/connect-xero-to-excel-automate-reports',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How to Connect Xero to Excel and Automate Your Reports (UK Guide 2026)","description":"A practical guide to connecting Xero to Excel for UK businesses. How to pull your Xero data into Excel automatically and build reports that update themselves.","datePublished":"2026-06-17","dateModified":"2026-06-17","url":"https://www.lexalytic.com/blog/connect-xero-to-excel-automate-reports","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Excel Automation</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Xero</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>June 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            How to Connect Xero to Excel and Automate Your Reports
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Most Xero users spend more time than they should manually exporting data and reformatting it in Excel. Here is how to connect them properly — so the data flows automatically and your reports build themselves.
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
              There are three main ways to connect Xero to Excel: the Xero native export (manual, limited), the Xero API via Power Query (automatic, flexible), and third-party connectors. For most UK businesses, Power Query is the right approach — it pulls your Xero data directly into Excel on a schedule, with no manual steps required.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            Xero is excellent accounting software. Excel is excellent for analysis and reporting. The problem is the gap between them — the manual export, the reformatting, the copy-paste into a template, the cleaning of dates and categories before the numbers make sense. For most businesses using both tools, this gap exists because nobody has ever set up a proper connection between them.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            This guide covers how to close that gap. By the end you will understand the options available, which approach suits your situation, and what automated Xero reporting actually looks like in practice.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Connecting Xero accounting software to Excel for automated reporting UK"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why the manual export process breaks down</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The standard Xero to Excel workflow for most businesses goes something like this. Log into Xero. Navigate to the report you need. Export to Excel or CSV. Open the file. Reformat the dates because Xero exports them in a format Excel does not automatically recognise. Clean the category names. Copy the data into your reporting template. Update the charts. Send the report.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            This process works fine when you are doing it occasionally. It becomes a significant time drain when it happens weekly or monthly, across multiple reports, with data that needs to be combined with information from other sources. And every manual step is a point where an error can enter — wrong date range selected, wrong category mapped, figures copied from the wrong column.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The businesses that have solved this problem have replaced the manual process with a direct connection. Getting Xero data into Excel automatically — rather than exporting Xero reports to Excel by hand — means the data flows already formatted correctly, ready to feed into the report without anyone touching it.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>The three ways to get Xero reports into Excel</h2>

          {[
            {
              num: '01',
              title: 'Xero native export — simple but manual',
              body: 'Xero allows you to export most reports directly to Excel or CSV from within the platform. This is the most straightforward option and requires no technical setup. The limitation is that it is entirely manual — someone has to log in, navigate to the right report, select the right date range, and export. There is no way to schedule this automatically or have it feed directly into a live Excel template. For occasional one-off reporting, this is fine. For regular automated reporting, it is not a real solution.',
              verdict: 'Best for: occasional exports where automation is not needed',
              verdictColor: 'var(--ink-3)',
            },
            {
              num: '02',
              title: 'Power Query via the Xero API — the recommended approach',
              body: 'Power Query, built into Excel, can connect directly to the Xero API and pull your financial data automatically. Once set up, the connection refreshes with a single click or on a schedule — pulling the latest data from Xero directly into your Excel model, already formatted and ready to use. This approach gives you full control over exactly which data you pull, how it is structured, and how often it updates. It works for P&L data, balance sheet data, cash flow, invoices, contacts, and more. The setup requires some technical knowledge — you need to create a Xero API connection, handle authentication, and build the Power Query transformation steps. For businesses without that capability in-house, this is where a consultant adds real value.',
              verdict: 'Best for: businesses that want automated, flexible Xero reporting in Excel',
              verdictColor: 'var(--amber)',
            },
            {
              num: '03',
              title: 'Third-party connectors — paid but faster to set up',
              body: 'Several third-party tools — including Acterys, Syft Analytics, and various Power BI connectors — offer pre-built Xero integrations that do not require API configuration from scratch. These tools typically cost between £20 and £100 per month and provide a more polished connection with less technical setup. They are worth considering if you want to move quickly and the monthly cost is manageable. The downside is the ongoing cost and the fact that you are dependent on a third party maintaining their Xero integration as the API changes.',
              verdict: 'Best for: businesses that want a faster setup and are comfortable with a monthly tool cost',
              verdictColor: 'var(--ink-3)',
            },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '32px', padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1' }}>{item.num}</div>
                <h3 style={{ fontSize: '17px', color: 'var(--ink)', fontWeight: '600', marginBottom: '0', marginTop: '4px' }}>{item.title}</h3>
              </div>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8', marginBottom: '16px' }}>{item.body}</p>
              <div style={{ fontSize: '13px', color: item.verdictColor, fontWeight: '500', fontStyle: 'italic' }}>{item.verdict}</div>
            </div>
          ))}

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Power Query connecting Xero data to Excel dashboard UK business reporting"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What automated Xero reporting actually looks like</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            When a Xero to Excel connection is built properly, the experience for the user is straightforward. Open Excel. Click refresh. The data pulls directly from Xero — P&L for the current period, prior period, and year to date. Cash position. Outstanding invoices. Aged debtors. Whatever the business needs. The report builds itself from that data. Charts update. Variances calculate automatically. The whole thing is ready in under a minute.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            For businesses that want to go further, the Xero data can be combined in the same Excel model with data from other sources — a CRM, an operations spreadsheet, a payroll export — to give a complete picture of the business that no single system provides on its own.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            For businesses that want live dashboards rather than Excel files, the same Xero connection can feed a <Link href="/services/power-bi" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Power BI dashboard</Link> — giving leadership a browser-based view of the financials that updates automatically without anyone opening a file. We cover when to use Power BI versus Excel in our comparison guide <Link href="/blog/power-bi-vs-excel" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>here</Link>.
          </p>

          <div style={{ padding: '20px 24px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}><p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}><strong style={{ color: 'var(--ink)' }}>Before you build:</strong> If your Xero data has inconsistencies — customers named differently, dates in mixed formats, duplicate entries — the automated connection will reproduce those problems in your reports. Read our guide to <a href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing</a> before connecting.</p></div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What to consider before building the connection</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {[
              {
                title: 'Xero API authentication',
                body: 'Connecting to Xero via the API requires setting up OAuth authentication — you register an application in the Xero developer portal, obtain credentials, and handle token refresh. This is manageable but requires technical knowledge. It is not something most accountants or finance managers would set up themselves without guidance.',
              },
              {
                title: 'Data structure and transformation',
                body: 'Xero returns data in JSON format via the API. Power Query can handle this, but the transformation steps — unpacking nested data, handling null values, formatting dates, categorising transaction types — require experience to build correctly. A poorly built transformation will produce data that looks right but contains errors.',
              },
              {
                title: 'Handling chart of accounts differences',
                body: 'Every Xero account has a different chart of accounts structure. The connection needs to be mapped to your specific account codes and categories — which means a generic template will not work without customisation. This is one of the main reasons businesses end up coming to a consultant rather than using an off-the-shelf tool.',
              },
              {
                title: 'Refresh scheduling',
                body: 'Power Query refreshes on demand or when the file is opened. For fully automatic scheduled refreshes without anyone opening the file, you need either Power Automate or a Python script to trigger the refresh on a schedule. This is worth building if the report needs to be current every morning without manual intervention.',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '22px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px', fontWeight: '600' }}>→</span>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginBottom: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '16px' }}>What a typical Xero to Excel automation project includes</h3>
            {[
              'Xero API connection configured and authenticated',
              'Power Query transformation built to your specific chart of accounts',
              'Data pulled for the reports your business actually needs — P&L, cash flow, aged debtors, invoices',
              'Excel reporting template built on top of the live data connection',
              'Refresh configured — either on-demand or scheduled automatically',
              'Full documentation and handover so your team can use it independently',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 5 ? '12px' : '0', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Automated financial reporting from Xero to Excel UK small business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'Can I connect Xero to Excel without any technical knowledge?',
              a: 'The native Xero export to CSV or Excel requires no technical knowledge at all — but it is manual. Automating the connection via Power Query or the Xero API requires technical knowledge to set up correctly. Once built, however, the system is simple for anyone to use — typically a single click to refresh.',
            },
            {
              q: 'Does Xero have a built-in Excel integration?',
              a: 'Xero does not have a direct built-in Power Query connector in the same way that some tools do. You can export reports manually from Xero to Excel or CSV, and you can connect to the Xero API via Power Query — but this requires setting up the API connection yourself or having someone build it for you.',
            },
            {
              q: 'How often can the data refresh from Xero?',
              a: 'With a Power Query connection, you can refresh on demand (a single click) or configure it to refresh automatically when the file opens. For fully scheduled refreshes — for example, every morning at 7am without anyone opening the file — you need Power Automate or a Python script to trigger the refresh on a schedule.',
            },
            {
              q: 'Can I combine Xero data with data from other sources in the same Excel report?',
              a: 'Yes — this is one of the most valuable things a properly built connection enables. You can pull Xero financial data alongside data from a CRM, operations spreadsheets, payroll exports, or any other source that Power Query can connect to. The result is a single report that gives a complete picture of the business that no individual system provides.',
            },
            {
              q: 'What if I use Sage or QuickBooks instead of Xero?',
              a: 'The same approach applies. Sage and QuickBooks both have APIs that Power Query or Python can connect to, and the process for building an automated reporting connection is similar. The specific technical steps differ but the outcome — data flowing automatically into Excel without manual exports — is the same.',
            },
            {
              q: 'How long does it take to build a Xero to Excel automation?',
              a: 'A typical Xero to Excel automation project is delivered in 3-5 working days. This includes the API connection, the Power Query transformation, the reporting template, and the handover. We scope every project and give a fixed price before any work begins.',
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
              { label: 'Xero — API documentation for developers', url: 'https://developer.xero.com/documentation/getting-started-guide/' },
              { label: 'Microsoft — Introduction to Power Query', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
              { label: 'HMRC — Making Tax Digital: using compatible software', url: 'https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax' },
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
              { title: 'How to Automate Excel Reports (Without Knowing How to Code)', href: '/blog/how-to-automate-excel-reports', tag: 'Excel Automation' },
              { title: 'How Much Does Excel Automation Cost in the UK?', href: '/blog/excel-automation-cost-uk', tag: 'Excel Automation' },
              { title: 'Power BI vs Excel: Which Should Your Business Use in 2026?', href: '/blog/power-bi-vs-excel', tag: 'Power BI' },
              { title: 'How to Reduce Manual Data Entry in Your Business', href: '/blog/how-to-reduce-manual-data-entry-uk', tag: 'Data Automation' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Still manually exporting from Xero every month?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. We will look at your current Xero reporting process and tell you exactly what an automated connection would look like — and what it would cost to build it.
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
