import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/what-is-power-query-uk-business' },
  title: 'What Is Power Query — and How Can It Save Your Business Time? | Lexalytic',
  description: 'Power Query is built into Excel and Power BI and most UK businesses have never used it. Here is what it does, why it matters, and how it eliminates hours of manual data work every month.',
  keywords: 'what is Power Query UK, Power Query Excel UK business, Power Query tutorial UK, learn Power Query small business, Power Query vs Excel formulas, Power Query data automation',
  openGraph: {
    title: 'What Is Power Query — and How Can It Save Your Business Time?',
    description: 'Power Query is built into Excel and Power BI. Most UK businesses have never used it. Here is what it does and why it matters.',
    url: 'https://www.lexalytic.com/blog/what-is-power-query-uk-business',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"What Is Power Query — and How Can It Save Your Business Time?","description":"Power Query is built into Excel and Power BI. Most UK businesses have never used it. Here is what it does and why it matters.","datePublished":"2026-09-15","dateModified":"2026-09-15","url":"https://www.lexalytic.com/blog/what-is-power-query-uk-business","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Power Query</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 9 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>What Is Power Query — and How Can It Save Your Business Time?</h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Power Query is built into Excel and Power BI and has been since 2016. Most UK businesses have never used it. It is the single most powerful tool for eliminating manual data work — and it requires no coding.
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
              Power Query is a data transformation tool built into Excel and Power BI. It connects to your data sources — spreadsheets, accounting software, databases, CSVs — pulls the data automatically, cleans and formats it according to rules you set once, and delivers it ready to use. Every step is recorded and can be replayed automatically whenever new data arrives. No formulas. No macros. No manual reformatting.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            If you have ever spent time reformatting a CSV export before you could use it, copying data from one spreadsheet to another, cleaning dates that came out in the wrong format, or removing blank rows from a dataset — Power Query can do all of that automatically, every time, without you touching it.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            It is not widely known outside of data teams and specialist Excel users, which means most UK businesses are doing work manually that they could be doing automatically. This guide explains what Power Query actually does and where it saves the most time in a typical business.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80" alt="Power Query Excel automation UK business data transformation" style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Power Query actually does</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Power Query does three things: it connects to data sources, it transforms the data, and it loads the result into Excel or Power BI. The key point is that every transformation step you apply is recorded as a step in a query. When you click refresh, Power Query replays all those steps automatically against the latest data.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            You build the query once. After that, getting updated data is a single click — or happens automatically on a schedule.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What you can connect it to</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Power Query has over 100 built-in data connectors. The most commonly used for UK businesses include:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '12px', marginBottom: '48px' }}>
            {[
              { source: 'Excel files and CSV exports', desc: 'Connect to any Excel file or CSV — including ones that other people update — and pull the data automatically.' },
              { source: 'Xero, Sage, QuickBooks', desc: 'Connect directly to your accounting software via the API and pull financial data without manual exports.' },
              { source: 'SharePoint and OneDrive', desc: 'Connect to files stored in SharePoint or OneDrive — useful when multiple people update a shared spreadsheet.' },
              { source: 'SQL databases', desc: 'Query a database directly and pull exactly the data you need, already filtered and formatted.' },
              { source: 'Web data and APIs', desc: 'Pull data from websites or APIs — exchange rates, market data, or any third-party system with an API.' },
              { source: 'Google Sheets', desc: 'Connect to Google Sheets and pull the data into Excel automatically, keeping the two in sync.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '18px 20px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--amber)', marginBottom: '6px' }}>{item.source}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What transformations it can apply automatically</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Once connected to a data source, Power Query can apply any transformation automatically every time the data refreshes:
          </p>

          {[
            { action: 'Fix date formats', desc: 'Accounting software exports often produce dates in formats Excel does not recognise. Power Query converts them automatically to whatever format you need.' },
            { action: 'Remove blank rows and columns', desc: 'Exports often include blank rows, headers in the wrong place, or summary rows at the bottom. Power Query removes them automatically.' },
            { action: 'Standardise text', desc: 'Customer names entered in different ways, category codes with inconsistent capitalisation, columns with trailing spaces. Power Query standardises all of these according to rules you define.' },
            { action: 'Split and merge columns', desc: 'A full name in one column that needs to be first name and last name separately. A date and time in one column that needs to be split. Power Query handles both.' },
            { action: 'Filter rows', desc: 'Pull only the rows that meet specific criteria — only invoices over a certain amount, only transactions from the current month, only customers in a specific region.' },
            { action: 'Combine multiple sources', desc: 'Pull data from two or more sources and combine them into a single table. An accounting export and a CRM export combined into one view of customer revenue and pipeline.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '18px 20px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--amber)', flexShrink: 0, fontWeight: '600', marginTop: '2px' }}>✓</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>{item.action}</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80" alt="Power Query transformations saving time UK business Excel automation" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Power Query vs Excel formulas — what is the difference?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Excel formulas are applied to specific cells and depend on the data being in the right place at the right time. When the data structure changes — a new row, a new column, a different number of entries — formulas often break and need to be fixed.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Power Query is applied to the data source before it enters the spreadsheet. The transformations are defined once and applied automatically regardless of how many rows or columns the data contains. A query that works for 100 rows works equally well for 10,000 rows. A query that handles January data handles December data without any modification.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            For repetitive data cleaning and transformation tasks — the kind that happen every week or every month — Power Query is almost always more robust than formulas. It does not break when the data structure changes. It does not depend on cells being in specific positions. And it can be refreshed automatically without anyone opening the file.
          </p>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Related:</strong> Power Query is one of the primary tools we use when <Link href="/blog/how-to-automate-excel-reports" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>automating Excel reports</Link> for UK businesses. It also forms the connection layer when <Link href="/blog/connect-xero-to-excel-automate-reports" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>connecting Xero to Excel automatically</Link>.
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            { q: 'Do I need to know how to code to use Power Query?', a: 'No. Power Query has a visual, point-and-click interface where you apply transformations by selecting options from menus. It records those steps as M code in the background, but you do not need to read or write any code to use it effectively. More advanced Power Query work — custom functions, complex conditional logic — does involve writing M code, which is where a consultant adds value.' },
            { q: 'Is Power Query available in all versions of Excel?', a: 'Power Query is available in Excel 2016 and later as a built-in feature, accessed via the Data tab. In Excel 2010 and 2013 it was available as a free add-in. If you are on a current Microsoft 365 subscription, you already have full Power Query capability.' },
            { q: 'Can Power Query refresh automatically without me opening Excel?', a: 'Power Query refreshes when you open the file or when you click refresh manually. For fully automatic scheduled refreshes — where the data updates without anyone opening the file — you need either Power BI (which has built-in scheduled refresh) or Power Automate to trigger the refresh on a schedule.' },
            { q: 'What is the difference between Power Query and Power BI?', a: 'Power Query is a data transformation tool that exists inside both Excel and Power BI. Power BI is a complete business intelligence platform for building dashboards and reports. When you use Power BI, you use Power Query to connect to and transform your data before it goes into the dashboard. They are related but different things.' },
            { q: 'Can Power Query handle large datasets?', a: 'Power Query handles data significantly larger than raw Excel can manage comfortably. It processes transformations efficiently and, when combined with Power Pivot, can work with millions of rows. For very large datasets where performance matters, Python is more powerful — but for most UK SME use cases, Power Query handles the volume without issue.' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px', padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '12px', fontWeight: '600' }}>{item.q}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.a}</p>
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>Further reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {[
              { label: 'Microsoft — Introduction to Power Query in Excel', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
              { label: 'Microsoft — Power Query M language reference', url: 'https://learn.microsoft.com/en-us/powerquery-m/' },
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', textDecoration: 'none', color: 'var(--ink-2)', fontSize: '14px' }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0 }}>→</span>{link.label}
              </a>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { title: 'How to Automate Excel Reports (Without Knowing How to Code)', href: '/blog/how-to-automate-excel-reports', tag: 'Excel Automation' },
              { title: 'How to Connect Xero to Excel and Automate Your Reports', href: '/blog/connect-xero-to-excel-automate-reports', tag: 'Excel Automation' },
              { title: 'How Much Does Excel Automation Cost in the UK?', href: '/blog/excel-automation-cost-uk', tag: 'Excel Automation' },
              { title: 'When Your Business Has Outgrown Excel', href: '/blog/when-your-business-has-outgrown-excel', tag: 'Excel Automation' },
            ].map((post, i) => (
              <Link key={i} href={post.href} style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.tag}</span>
                <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>{post.title}</p>
              </Link>
            ))}
          </div>

          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want Power Query set up for your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what data you are currently processing manually and we will tell you exactly what Power Query can automate — and what it would cost to build it.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>

        </div>
      </article>

      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
