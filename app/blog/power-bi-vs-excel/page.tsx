import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/power-bi-vs-excel' },
  title: 'Power BI vs Excel: Which Should Your Business Use? (2026 Guide) | Lexalytic',
  description: 'Power BI vs Excel for UK businesses in 2026. When to stick with Excel, when to move to Power BI, and what most companies actually need. From a UK data automation consultant.',
  keywords: 'Power BI vs Excel UK, Power BI vs Excel for business, when to use Power BI, Excel vs Power BI reporting, Power BI consultant UK',
  openGraph: {
    title: 'Power BI vs Excel: Which Should Your Business Use? (2026 Guide)',
    description: 'When to stick with Excel, when to move to Power BI, and what most businesses actually need.',
    url: 'https://www.lexalytic.com/blog/power-bi-vs-excel',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context": "https://schema.org", "@type": "Article", "headline": "Power BI vs Excel: Which Should Your Business Use in 2026?", "description": "When to stick with Excel, when to move to Power BI, and what most UK businesses actually need.", "datePublished": "2026-04-28", "dateModified": "2026-04-28", "url": "https://www.lexalytic.com/blog/power-bi-vs-excel", "author": {"@type": "Person", "name": "Mihir Hindocha", "url": "https://www.lexalytic.com/about"}, "publisher": {"@type": "Organization", "name": "Lexalytic", "url": "https://www.lexalytic.com"}, "mainEntityOfPage": {"@type": "WebPage", "@id": "https://www.lexalytic.com/blog/power-bi-vs-excel"}}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Power BI</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Excel</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>April 2026 · 9 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Power BI vs Excel: Which Should Your Business Use in 2026?
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            The honest answer — when Excel is still the right tool, when Power BI is genuinely worth it, and what most UK businesses actually need.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(193,125,46,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--amber)', flexShrink: 0 }}>M</div>
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Power BI & Data Automation Consultant · Lexalytic · 10 years experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>

          {/* TL;DR */}
          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>The short answer</p>
            <p style={{ color: 'var(--ink-2)', lineHeight: '1.75', margin: 0 }}>
              Excel is still the right tool for financial modelling, data entry, and ad-hoc analysis. Power BI is better when multiple people need the same data, reports need to update automatically, or leadership wants interactive dashboards rather than static spreadsheets. Most businesses need <strong>both</strong> — not one or the other.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            I get asked this question almost every week. A Finance Manager is spending hours every month rebuilding the same report in Excel, someone mentions Power BI, and suddenly the business is wondering whether to make a switch.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The answer is almost never "replace Excel with Power BI." It is almost always "use both — but use each one for what it is actually good at." Here is how to work out which is which for your business.
          </p>

          {/* Image 1 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Data dashboard on a screen showing charts and analytics"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Excel is actually for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Excel has been the default business tool for 40 years for good reason. It is extraordinarily flexible. You can build a financial model, clean a dataset, run a quick calculation, or prototype a process all in the same file without any setup or licensing.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Excel is the right choice when:
          </p>

          {/* Excel list */}
          <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '40px', border: '1px solid var(--border)' }}>
            {[
              { icon: '✓', text: 'You are building financial models that require precise cell referencing and formula logic' },
              { icon: '✓', text: 'Data entry is part of the workflow — Power BI is read-only by design' },
              { icon: '✓', text: 'Your dataset is under 100,000 rows and only one or two people need it' },
              { icon: '✓', text: 'You need a quick answer to a specific question without building a full data model' },
              { icon: '✓', text: 'Your audience wants a formatted, printable spreadsheet rather than an interactive dashboard' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 4 ? '14px' : '0' }}>
                <span style={{ color: 'var(--amber)', fontWeight: '600', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{item.text}</span>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The problem is not Excel. The problem is when businesses use Excel for things it was never designed to do — specifically, as a shared reporting platform that multiple people update, distribute by email, and try to maintain version control on. That is where things break down.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Power BI is actually for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Power BI is a business intelligence platform, not a spreadsheet. It is designed to connect to your data sources — whether that is an Excel file, a SQL database, a CRM, or an accounting system — and turn that data into interactive dashboards that update automatically on a schedule you set.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The key difference is that Power BI reports live in the cloud. Everyone accesses the same version of the truth through a browser or the mobile app. When the data updates, the dashboard updates. No one needs to email a file. No one needs to rebuild anything.
          </p>

          {/* Image 2 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '40px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Business analytics and reporting on laptop screen"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Power BI is the right choice when:
          </p>

          {/* Power BI list */}
          <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '40px', border: '1px solid var(--border)' }}>
            {[
              { icon: '✓', text: 'Multiple people need access to the same data without creating conflicting versions' },
              { icon: '✓', text: 'You need reports to refresh automatically from live data sources rather than being rebuilt manually' },
              { icon: '✓', text: 'Leadership wants interactive dashboards they can filter and explore, not static spreadsheets' },
              { icon: '✓', text: 'Your data spans multiple systems — accounting, CRM, operations — and you want it in one place' },
              { icon: '✓', text: 'You need to control who sees which data without creating separate files for different audiences' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 4 ? '14px' : '0' }}>
                <span style={{ color: 'var(--amber)', fontWeight: '600', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Side by side: the key differences</h2>
          <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--white)' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Factor</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Excel</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Power BI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { factor: 'Data volume', excel: 'Up to ~1M rows', bi: 'Millions of rows' },
                  { factor: 'Data entry', excel: '✓ Yes', bi: '✗ Read-only' },
                  { factor: 'Auto-refresh', excel: 'Manual only', bi: '✓ Scheduled refresh' },
                  { factor: 'Sharing', excel: 'Email file', bi: 'Cloud link, always current' },
                  { factor: 'Multiple users', excel: 'Version conflict risk', bi: '✓ Single source of truth' },
                  { factor: 'Financial modelling', excel: '✓ Best in class', bi: 'Limited' },
                  { factor: 'Interactive dashboards', excel: 'Basic only', bi: '✓ Purpose-built' },
                  { factor: 'Cost', excel: 'Included in M365', bi: '£8/user/month (Pro)' },
                  { factor: 'Learning curve', excel: 'Low — widely known', bi: 'Medium — DAX required' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: '500', color: 'var(--ink)' }}>{row.factor}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{row.excel}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{row.bi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The scenario most UK businesses are actually in</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Here is the situation I see most often when a business contacts Lexalytic:
          </p>

          {/* Scenario box */}
          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
            <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0, fontStyle: 'italic' }}>
              A Finance Manager is pulling data from three or four different systems every month — the accounting package, the CRM, maybe an operations spreadsheet — copying it into a master Excel file, cleaning it up, rebuilding the charts, and sending a report to the MD. It takes two days. The MD then asks a question the report does not answer, and the whole process starts again.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            This is not an Excel problem. It is a process problem. The fix is not necessarily Power BI — it might be automating the Excel process so the data pulls and cleans itself automatically. Or it might be a Power BI dashboard that connects directly to the source systems. Or both.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The right answer depends on what your team actually needs, what systems you are working with, and how many people need access to the output. There is no universal answer — but there is a right answer for your specific situation.
          </p>

          {/* Image 3 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Team working with data and analytics tools"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>5 signs you are ready for Power BI</h2>

          {[
            { num: '01', title: 'Your reports take more than a day to produce', body: 'If someone is spending significant time every week or month rebuilding a report that answers the same questions, that time is being wasted. Power BI can automate the build entirely.' },
            { num: '02', title: 'More than two people need the same data', body: 'Once you are emailing Excel files around, you have a version control problem. Someone is always working off last week\'s numbers. Power BI gives everyone the same live view.' },
            { num: '03', title: 'Leadership keeps asking questions your report does not answer', body: 'A static Excel report can only show what was built into it. A Power BI dashboard lets the MD filter by region, product, or time period without asking someone to rebuild the report.' },
            { num: '04', title: 'Your data lives in multiple systems', body: 'If you are copying data from Xero, Salesforce, or an ops system into Excel manually, Power BI can connect to all of those sources directly and pull them together automatically.' },
            { num: '05', title: 'You have had a data error cause a real problem', body: 'Manual copying and formula-heavy spreadsheets are prone to human error. When a mistake in a report affects a business decision, that is the moment to automate the process.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '36px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>{item.num}</div>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '10px', color: 'var(--ink)' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>5 signs Excel is still the right tool</h2>

          {[
            { num: '01', title: 'You are building financial models', body: 'Budgets, forecasts, three-way financial models — Excel is still the best tool for this. The cell-level control and formula logic in Excel cannot be replicated in Power BI.' },
            { num: '02', title: 'You need to enter and edit data directly', body: 'Power BI is read-only. If the workflow involves people typing data into the tool, Excel is the only option.' },
            { num: '03', title: 'Only one or two people use the output', body: 'If a single analyst produces a report for one person, the overhead of building a Power BI solution probably outweighs the benefit. Automate the Excel process instead.' },
            { num: '04', title: 'Your dataset is small and rarely changes', body: 'Power BI adds most value when data is live, large, or coming from multiple sources. For a small, stable dataset, a well-built Excel model is perfectly adequate.' },
            { num: '05', title: 'Your team knows Excel and not much else', body: 'Power BI requires learning DAX — Microsoft\'s formula language — to get real value out of it. If your team has no appetite for that, automating your existing Excel processes is a better first step.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '36px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>{item.num}</div>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '10px', color: 'var(--ink)' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}

          {/* External links section */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>Further reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {[
              { label: 'Microsoft — Power BI vs Excel official comparison', url: 'https://powerbi.microsoft.com/en-gb/excel-vs-power-bi/' },
              { label: 'Microsoft — Power BI pricing for UK businesses', url: 'https://powerbi.microsoft.com/en-gb/pricing/' },
              { label: 'HMRC — Making Tax Digital for Income Tax', url: 'https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax' },
            ].map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px',
                background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                textDecoration: 'none', color: 'var(--ink-2)', fontSize: '14px',
                transition: 'border-color 0.2s',
              }}
                
                
              >
                <span style={{ color: 'var(--amber)' }}>→</span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Internal links */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { title: 'How Much Does a Power BI Consultant Cost in the UK?', href: '/blog/power-bi-consultant-cost-uk', tag: 'Power BI' },
              { title: 'How to Automate Excel Reports: A Step-by-Step Guide', href: '/blog/how-to-automate-excel-reports', tag: 'Excel' },
            ].map((post, i) => (
              <Link key={i} href={post.href} style={{
                display: 'block', padding: '20px 24px',
                background: 'var(--bg-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
                
                
              >
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.tag}</span>
                <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>{post.title}</p>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Not sure which is right for your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '28px', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call and we will look at your current reporting process and tell you exactly what needs to change — whether that is automating your Excel, building a Power BI dashboard, or something in between.
            </p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free scoping call →
            </Link>
          </div>

        </div>
      </article>

      {/* Footer */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>← Back to blog</Link>
        </div>
      </footer>

    </div>
  )
}
