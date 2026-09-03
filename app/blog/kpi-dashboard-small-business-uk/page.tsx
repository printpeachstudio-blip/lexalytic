import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/kpi-dashboard-small-business-uk' },
  title: 'How to Build a KPI Dashboard for Your Small Business (UK Guide 2026) | Lexalytic',
  description: 'What KPIs should your small business track? Which tool should you use? How much does it cost? A practical UK guide with sector-specific metrics and real examples.',
  keywords: 'KPI dashboard small business UK, business KPI dashboard UK, how to build KPI dashboard, small business dashboard UK, business performance dashboard UK, KPI tracking small business',
  openGraph: {
    title: 'How to Build a KPI Dashboard for Your Small Business (UK Guide 2026)',
    description: 'What to measure, which tool to use, and how much it costs. A practical UK guide with sector-specific metrics.',
    url: 'https://www.lexalytic.com/blog/kpi-dashboard-small-business-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How to Build a KPI Dashboard for Your Small Business (UK Guide 2026)","description":"A practical guide to building a KPI dashboard for UK small businesses. What to measure, which tools to use, and how to get a live view of your business.","datePublished":"2026-08-20","dateModified":"2026-08-20","url":"https://www.lexalytic.com/blog/kpi-dashboard-small-business-uk","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Power BI</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Intelligence</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 11 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            How to Build a KPI Dashboard for Your Small Business
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Most small business owners are making decisions based on instinct, memory, or a report someone compiled last week. A KPI dashboard gives you a live view of the numbers that actually matter — without expensive software or a data team.
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
              A KPI dashboard for a small business does not need to be complicated. It needs to show the five to ten numbers that tell you whether the business is healthy right now — revenue, margin, cash position, outstanding invoices, and whatever operational metric matters most in your sector. Built in Power BI or Excel, connected to your existing systems, it can be ready in days.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            I have built dashboards for businesses across a wide range of sectors — construction, recruitment, professional services, retail, healthcare — and the starting question is always the same. What do you actually need to know to run this business well? Not what data do you have. Not what your accounting software can export. What do you need to know, right now, to make good decisions?
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The answer to that question is your KPI dashboard. Everything else is a report.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="KPI dashboard for small business UK showing live business performance metrics"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What is a KPI dashboard and why does your business need one?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            A KPI dashboard is a single screen that shows your most important business metrics, updated automatically from your actual data. KPI stands for Key Performance Indicator — the specific numbers that tell you whether your business is moving in the right direction.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The difference between a KPI dashboard and a report is that a dashboard is live. It updates automatically when new data arrives — from your accounting software, your CRM, your operations systems — without anyone exporting, formatting, or compiling anything. You open it, you see the current picture, you act on it.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            Most small businesses do not have this. They have reports — produced weekly or monthly by someone who spends hours pulling the data together. By the time the report lands, it is already out of date. A dashboard fixes that problem permanently.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Step 1: Decide what to measure</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            This is the most important step and the one most businesses get wrong. They try to put everything on the dashboard, end up with 40 metrics, and nobody knows what to look at. A good KPI dashboard for a small business has between five and ten metrics — no more.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Here is a framework for choosing. Ask yourself: if I could only look at one number to know whether this business is healthy right now, what would it be? Then ask the same question again. And again. Stop when you have five to ten numbers that together give a complete picture of financial health, operational performance, and leading indicators of future performance.
          </p>

          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '600', color: 'var(--ink)', marginBottom: '20px' }}>Common KPIs by business type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
              {[
                {
                  type: 'Service businesses (agencies, consultancies, professional services)',
                  kpis: ['Revenue this month vs last month and vs target', 'Gross margin by client or project', 'Utilisation rate (billable hours as % of available hours)', 'Outstanding invoices and average days to payment', 'Pipeline value and conversion rate'],
                },
                {
                  type: 'Retail and e-commerce',
                  kpis: ['Revenue by day, week, and month', 'Average order value', 'Gross margin by product line', 'Stock levels and stock turn', 'Return rate'],
                },
                {
                  type: 'Construction and trades',
                  kpis: ['Job profitability by project', 'Labour cost as % of revenue', 'Materials cost vs estimate', 'Outstanding invoices and cash position', 'Pipeline of quoted work'],
                },
                {
                  type: 'Recruitment and staffing',
                  kpis: ['Placements and revenue by consultant', 'Gross margin by division or client', 'Contractor compliance status', 'Time to fill by role type', 'Pipeline and conversion rate'],
                },
              ].map((item, i) => (
                <div key={i} style={{ padding: '22px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '12px' }}>{item.type}</div>
                  {item.kpis.map((kpi, j) => (
                    <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: j < item.kpis.length - 1 ? '8px' : '0', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--amber)', flexShrink: 0, fontSize: '12px', marginTop: '3px' }}>→</span>
                      <span style={{ fontSize: '13px', color: 'var(--ink-2)', lineHeight: '1.5' }}>{kpi}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Step 2: Identify where your data lives</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Once you know what you want to measure, the next question is where that data actually lives. For most small businesses, the answer involves at least two or three systems — and that is where the challenge begins.
          </p>

          {[
            { source: 'Accounting software (Xero, Sage, QuickBooks)', data: 'Revenue, invoices, expenses, cash position, aged debtors. This is usually the primary financial data source.' },
            { source: 'CRM or sales tool', data: 'Pipeline, deals, conversion rates, customer data. Often separate from the accounting system.' },
            { source: 'Spreadsheets', data: 'Operational data, project tracking, anything that has not found its way into a proper system yet. Very common in small businesses.' },
            { source: 'Industry-specific software', data: 'Job management tools, PMS systems, practice management software. Varies by sector.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--amber)', flexShrink: 0, fontWeight: '600', marginTop: '2px' }}>→</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '6px' }}>{item.source}</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.data}</div>
              </div>
            </div>
          ))}

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px', marginTop: '24px' }}>
            The goal of a KPI dashboard is to bring data from all of these sources into one place automatically. The more of your data that flows in without manual intervention, the more valuable the dashboard becomes.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Small business KPI dashboard connecting multiple data sources automatically UK"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Step 3: Choose the right tool</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            The tool you use for your KPI dashboard depends on who needs to see it, how your data is structured, and how technical your team is. Here are the main options for UK small businesses:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px', marginBottom: '48px' }}>
            {[
              {
                tool: 'Power BI',
                cost: 'Free desktop app · £8.40/user/month to share',
                best: 'Best for: businesses that want a professional live dashboard accessible to multiple people',
                pros: ['Connects to almost any data source', 'Live refresh from Xero, Sage, SQL, Excel and more', 'Interactive — filter by date, region, team', 'Shareable via browser without sending files'],
                cons: ['Requires technical knowledge to build properly', 'Requires Pro licence to share (£8.40/user/month)'],
                highlight: true,
              },
              {
                tool: 'Excel with Power Query',
                cost: 'Included in Microsoft 365',
                best: 'Best for: businesses already in Excel that want automated data without a new platform',
                pros: ['No new software required', 'Team already knows how to use it', 'Connects to Xero, Sage, databases', 'Refreshes automatically on open or on demand'],
                cons: ['Not truly live — requires someone to open and refresh', 'Version control issues if multiple people use it'],
                highlight: false,
              },
              {
                tool: 'Google Looker Studio (free)',
                cost: 'Free',
                best: 'Best for: Google Workspace businesses that want a free live dashboard',
                pros: ['Completely free', 'Connects to Google Sheets, Google Analytics, some third-party tools', 'Shareable via link', 'Live updates'],
                cons: ['Fewer data connectors than Power BI', 'Less powerful for complex data modelling'],
                highlight: false,
              },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '24px', background: item.highlight ? 'var(--ink)' : 'var(--bg-2)',
                borderRadius: 'var(--radius-lg)', border: item.highlight ? '2px solid var(--amber)' : '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.tool}</div>
                <div style={{ fontSize: '12px', color: item.highlight ? 'rgba(255,255,255,0.4)' : 'var(--ink-4)', marginBottom: '12px', fontStyle: 'italic' }}>{item.cost}</div>
                <div style={{ fontSize: '12px', color: item.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', marginBottom: '16px' }}>{item.best}</div>
                {item.pros.map((pro, j) => (
                  <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0, fontSize: '12px' }}>✓</span>
                    <span style={{ fontSize: '13px', color: item.highlight ? 'rgba(255,255,255,0.7)' : 'var(--ink-2)', lineHeight: '1.5' }}>{pro}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${item.highlight ? 'rgba(255,255,255,0.1)' : 'var(--border)'}`, marginTop: '12px', paddingTop: '12px' }}>
                  {item.cons.map((con, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ef4444', flexShrink: 0, fontSize: '12px' }}>✗</span>
                      <span style={{ fontSize: '13px', color: item.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)', lineHeight: '1.5' }}>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Step 4: Build it — or have someone build it for you</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            If you are technically confident and have the time, Power BI and Excel with Power Query can both be learned to a functional level. Microsoft has extensive free training resources, and for straightforward single-source dashboards the learning curve is manageable.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The point at which most business owners find it worth bringing in help is when the data comes from more than one source, when the data needs significant transformation before it makes sense in a dashboard, or when they have tried to build it themselves and hit a wall.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            A properly built KPI dashboard — connected to your real data, designed around the decisions you actually need to make, with documentation so your team can use it independently — typically costs less than one month of the time currently being spent on manual reporting. And unlike the manual reporting, it keeps running indefinitely without anyone rebuilding it.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Building a KPI dashboard for UK small business with Power BI"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The most common mistakes small businesses make with KPI dashboards</h2>

          {[
            {
              mistake: 'Measuring too many things',
              fix: 'A dashboard with 40 metrics is not a dashboard — it is a spreadsheet with a different name. If everything is a priority, nothing is. Start with five metrics and add more only when you have genuinely outgrown them.',
            },
            {
              mistake: 'Measuring outputs instead of leading indicators',
              fix: 'Revenue last month is an output. Pipeline value this month is a leading indicator. Outputs tell you what happened. Leading indicators tell you what is likely to happen. A good KPI dashboard has both.',
            },
            {
              mistake: 'Building the dashboard before cleaning the data',
              fix: 'A dashboard connected to messy data produces confident-looking wrong numbers. Before building anything, check that your source data is consistent, complete, and accurate. Our guide to data cleansing covers what to check.',
            },
            {
              mistake: 'Not connecting it to live data',
              fix: 'A dashboard that someone has to manually update is not a dashboard — it is a formatted report with extra steps. The whole point is that it updates automatically. If yours requires manual data entry, fix the connection.',
            },
            {
              mistake: 'Building it for the person who asked, not the person who will use it',
              fix: 'The MD might commission the dashboard but the Finance Manager uses it daily. Design for the daily user. Make the main view answer their most common questions without any clicks.',
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Common mistake</div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px' }}>{item.mistake}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>The fix</div>
              <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{item.fix}</div>
            </div>
          ))}

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px', marginTop: '32px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Related:</strong> If your source data has quality issues — inconsistent formats, duplicates, blanks — fix those before building a dashboard. A KPI dashboard built on bad data produces wrong numbers with high confidence. Read our guide to{' '}
              <Link href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing for UK businesses</Link>{' '}
              before you start.
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'How much does it cost to build a KPI dashboard for a small business?',
              a: 'A properly built KPI dashboard for a UK small business — connected to your actual data, designed around your specific metrics, with documentation — typically costs between £750 and £2,500 depending on the number of data sources and the complexity of the metrics. We scope every project and give a fixed price before any work begins.',
            },
            {
              q: 'Can I build a KPI dashboard myself without technical knowledge?',
              a: 'For simple single-source dashboards, yes — Microsoft Power BI desktop is free and has extensive training resources. The difficulty increases significantly when you need to connect multiple data sources, handle data that needs cleaning or transformation, or build custom calculations. Most business owners find it more cost-effective to have a consultant build it correctly the first time.',
            },
            {
              q: 'How long does it take to build a KPI dashboard?',
              a: 'A straightforward KPI dashboard connected to one data source is typically delivered in 3-5 working days. A more complex multi-source dashboard with custom metrics and automated refresh takes 5-10 days. You get a clear timeline and fixed price before any work starts.',
            },
            {
              q: 'What is the difference between a KPI dashboard and a report?',
              a: 'A report is produced periodically by someone pulling data together — it is a snapshot of a moment in time, produced after that moment has passed. A KPI dashboard is live — it updates automatically from your data sources and always shows the current picture. Reports look backwards. Dashboards show you where you are right now.',
            },
            {
              q: 'Do I need Power BI Pro to share a KPI dashboard with my team?',
              a: 'Yes — to share a Power BI dashboard with others via the Power BI service, everyone who views it needs a Power BI Pro licence at £8.40 per user per month. There is also Power BI Premium Per User at a higher price point with additional features. For small teams sharing with two or three people, the Pro licence cost is usually negligible compared to the time saved.',
            },
            {
              q: 'Could a custom business tool replace our dashboard?',
              a: 'A KPI dashboard and a custom business tool serve different purposes — a dashboard surfaces data for decisions, while a custom tool manages a process. Many businesses benefit from both: a custom tool to run the operation and a dashboard to track performance. We build both and can advise on which combination makes sense for your specific situation.',
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
              { label: 'Microsoft — Getting started with Power BI', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/power-bi-overview' },
              { label: 'Microsoft — Power BI pricing for UK businesses', url: 'https://powerbi.microsoft.com/en-gb/pricing/' },
              { label: 'Google — Looker Studio overview', url: 'https://lookerstudio.google.com/' },
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
              { title: 'Power BI vs Excel: Which Should Your Business Use in 2026?', href: '/blog/power-bi-vs-excel', tag: 'Power BI' },
              { title: 'Power BI Consultant Cost UK: Hourly Rate & Day Rate Guide', href: '/blog/power-bi-consultant-cost-uk', tag: 'Power BI' },
              { title: '5 Signs Manual Reporting Is Costing Your Business Money', href: '/blog/5-signs-manual-reporting-is-costing-your-business', tag: 'Data Automation' },
              { title: 'My Finance Team Is Spending Hours on Manual Reporting', href: '/blog/finance-team-manual-reporting-fix', tag: 'Finance' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want a KPI dashboard built for your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. Tell us what decisions you need to make and what data you have. We will tell you exactly what a dashboard would look like and what it would cost to build it.
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
