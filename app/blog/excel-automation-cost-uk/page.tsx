import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/excel-automation-cost-uk' },
  title: 'How Much Does Excel Automation Cost in the UK? (2026 Guide) | Lexalytic',
  description: 'Honest UK pricing for Excel automation projects in 2026. What affects the cost, what you get for your money, and how quickly it pays for itself. From a UK-based Excel automation consultant.',
  keywords: 'Excel automation cost UK, Excel automation price UK, how much does Excel automation cost, hire Excel automation consultant UK, VBA automation cost UK, Excel consultant cost UK',
  openGraph: {
    title: 'How Much Does Excel Automation Cost in the UK? (2026 Guide)',
    description: 'Honest UK pricing for Excel automation in 2026. What affects cost, what you get, and how quickly it pays for itself.',
    url: 'https://www.lexalytic.com/blog/excel-automation-cost-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How Much Does Excel Automation Cost in the UK? (2026 Guide)","description":"Honest UK pricing for Excel automation projects in 2026. What affects the cost, what you get for your money, and how quickly it pays for itself.","datePublished":"2026-05-05","dateModified":"2026-05-05","url":"https://www.lexalytic.com/blog/excel-automation-cost-uk","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"},"mainEntityOfPage":{"@type":"WebPage","@id":"https://www.lexalytic.com/blog/excel-automation-cost-uk"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Excel Automation</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>May 2026 · 9 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            How Much Does Excel Automation Cost in the UK?
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            A straight answer — with real UK project costs, what drives the price up or down, and how to work out whether automation will actually pay for itself in your business.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Excel & Digital Studio Founder · Lexalytic · 15 years experience</div>
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
              Excel automation projects in the UK typically cost <strong>£300–£2,500</strong> for SMEs, depending on complexity. Simple macro or formula fixes start at the lower end. Full automated reporting systems with multiple data sources sit at the higher end. Most projects pay for themselves within one to three months of the time they save.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            The first question almost every business asks before automating their Excel processes is: what is this going to cost? It is a completely reasonable question — and one that most consultants are frustratingly vague about.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            This guide gives you honest UK market pricing for Excel automation in 2026, a clear breakdown of what drives costs up or down, and a straightforward way to work out whether the investment makes financial sense for your specific situation.
          </p>

          {/* Image 1 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Excel automation project cost UK - business reporting on laptop"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Pricing table */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>UK Excel automation pricing in 2026</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Excel automation projects vary enormously in scope — which is why most consultants refuse to give a straight answer on price. Here is a breakdown of typical UK project costs by type of work:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--ink)', color: 'var(--white)' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Project type</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Typical cost</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: '500' }}>Turnaround</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: 'Simple macro or formula fix', cost: '£150–£400', time: '1–2 days' },
                  { type: 'Single automated report (one data source)', cost: '£400–£700', time: '2–4 days' },
                  { type: 'Automated report with data cleaning', cost: '£600–£1,000', time: '3–5 days' },
                  { type: 'Multi-source automated reporting system', cost: '£900–£1,800', time: '5–10 days' },
                  { type: 'Full dashboard with VBA + Power Query', cost: '£1,200–£2,500', time: '7–14 days' },
                  { type: 'Ongoing retainer (monthly updates)', cost: 'From £400/mo', time: 'Ongoing' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-2)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--ink)', fontWeight: '500' }}>{row.type}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--amber)', fontWeight: '600' }}>{row.cost}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink-3)' }}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            These are fixed-price ranges — not hourly rates. The advantage of fixed pricing is that you know exactly what you are committing to before any work begins. If a consultant quotes you an hourly rate for Excel automation without scoping the project first, that is a red flag. Good consultants scope first, then price.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What affects the cost of Excel automation?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            Five factors determine where your project lands in the pricing ranges above:
          </p>

          {[
            {
              title: '1. Number of data sources',
              body: 'The single biggest cost driver. An automated report that pulls from one clean Excel file is straightforward. A system that pulls from three different sources — say, an accounting package, a CRM export, and a manual spreadsheet — requires significantly more work to build reliable connections, handle inconsistencies, and ensure the data merges correctly every time.',
            },
            {
              title: '2. Data quality and consistency',
              body: 'If your source data is clean, structured, and consistent, automation is straightforward. If it contains irregular formatting, merged cells, inconsistent date formats, or data entered differently by different people, significant cleaning logic needs to be built before the automation can work reliably. This is not unusual — it is simply a cost driver worth being aware of.',
            },
            {
              title: '3. Complexity of the output',
              body: 'A simple automated summary table costs less than a formatted, chart-heavy report that needs to look board-ready every time it runs. If the output requires conditional formatting, dynamic charts, automatic email distribution, or password protection, each of these adds to the build time.',
            },
            {
              title: '4. Frequency of changes',
              body: 'A report that runs on a fixed schedule with consistent data is simpler than one that needs to handle new product lines, new team members, or changing business logic. If your underlying data structure changes regularly, the automation needs to be built with more flexibility — which adds cost upfront but saves far more over time.',
            },
            {
              title: '5. Level of documentation and handover',
              body: 'A fully documented system with a walkthrough for your team costs more than one delivered without explanation. However, the documentation is almost always worth paying for — without it, you are dependent on the consultant every time something needs adjusting.',
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
            </div>
          ))}

          {/* Image 2 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Excel automation consultant UK working on automated reporting system"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Hourly rates vs fixed price — which is better?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Most Excel automation consultants in the UK charge either an hourly or day rate, or a fixed project price. Here is how the two approaches compare:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              {
                title: 'Hourly / day rate',
                rate: '£60–£120/hour · £400–£800/day',
                pros: ['Flexible for undefined scope', 'Easier to start quickly', 'Suits small ad-hoc fixes'],
                cons: ['No cost certainty', 'Incentivises slow work', 'Easy to overspend on simple tasks'],
                highlight: false,
              },
              {
                title: 'Fixed price',
                rate: 'Scoped upfront, agreed before work begins',
                pros: ['Total cost known before you commit', 'Incentivises efficient delivery', 'No invoice surprises'],
                cons: ['Requires upfront scoping conversation', 'Less flexible mid-project'],
                highlight: true,
              },
            ].map((option, i) => (
              <div key={i} style={{
                padding: '28px', borderRadius: 'var(--radius-lg)',
                background: option.highlight ? 'var(--ink)' : 'var(--bg-2)',
                border: option.highlight ? '2px solid var(--amber)' : '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{option.title}</div>
                <div style={{ fontSize: '14px', color: option.highlight ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)', marginBottom: '20px', fontStyle: 'italic' }}>{option.rate}</div>
                <div style={{ marginBottom: '16px' }}>
                  {option.pros.map((p, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--amber)', flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: '14px', color: option.highlight ? 'rgba(255,255,255,0.7)' : 'var(--ink-2)' }}>{p}</span>
                    </div>
                  ))}
                </div>
                <div>
                  {option.cons.map((c, j) => (
                    <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                      <span style={{ fontSize: '14px', color: option.highlight ? 'rgba(255,255,255,0.5)' : 'var(--ink-3)' }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            For most Excel automation projects, fixed pricing is better for the client. It removes cost uncertainty, prevents scope creep, and means the consultant has to be efficient with their time rather than extending the project unnecessarily. At Lexalytic, all projects are fixed price — scoped and agreed before any work begins.
          </p>

          <div style={{ padding: '20px 24px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}><p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}><strong style={{ color: 'var(--ink)' }}>Important:</strong> If your source data is messy — inconsistent formats, duplicates, blanks — the automation project will cost more and deliver less. Cleaning the data first is often the most cost-effective step. See our guide to <a href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing for UK businesses</a>.</p></div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Does Excel automation actually pay for itself?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            In almost every case, yes — and usually faster than people expect. Here is a straightforward way to work it out for your situation.
          </p>

          <div style={{ padding: '32px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '20px' }}>The ROI calculation</h3>
            {[
              { step: '1', label: 'Hours saved per month', example: 'e.g. 8 hours (2 hours per week)' },
              { step: '2', label: 'Hourly cost of the person doing it', example: 'e.g. £20/hour (£40k salary ÷ 2,000 hours)' },
              { step: '3', label: 'Monthly saving', example: '8 × £20 = £160/month' },
              { step: '4', label: 'Project cost', example: 'e.g. £600 fixed price' },
              { step: '5', label: 'Payback period', example: '£600 ÷ £160 = 3.75 months' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: i < 4 ? '16px' : '0', paddingBottom: i < 4 ? '16px' : '0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: 'white', flexShrink: 0 }}>{row.step}</div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>{row.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>{row.example}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            In this example, a £600 automation project pays for itself in under four months — and then saves £160 every month indefinitely after that. That is £1,920 saved in the first year alone, for a £600 investment.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The calculation changes significantly when you factor in that manual processes also carry a cost in errors, delayed decisions, and the risk of a key person leaving. Book a free scoping call and we will run the numbers for your specific situation.
          </p>

          {/* Image 3 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Excel automation ROI calculation UK business cost saving"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What does a typical Excel automation project include?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            A well-scoped Excel automation project should include all of the following — not just the code:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {[
              { title: 'Scoping call', desc: 'A free conversation to understand your current process, what needs to change, and what the automated version will do. No obligation.' },
              { title: 'Fixed price quote', desc: 'A clear total cost agreed before any work begins. No surprises, no scope creep without your approval.' },
              { title: 'Build and testing', desc: 'The automation is built and tested against your actual data — not dummy data — before handover.' },
              { title: 'Documentation', desc: 'Written instructions explaining how the system works, what each part does, and how to use it.' },
              { title: 'Walkthrough', desc: 'A live session walking your team through the system so they can use it confidently without needing to call anyone.' },
              { title: 'Post-delivery support', desc: 'A support window after delivery for questions, minor adjustments, and anything that needs tweaking once it is in use.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--amber)', fontWeight: '600', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Excel automation vs Power BI — which do you need?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            A common question when businesses start looking at automation is whether they need Excel automation or a <Link href="/services/power-bi" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Power BI dashboard</Link>. The answer depends on what the output needs to do.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Excel automation is the right choice when the output needs to remain in Excel — for example, a formatted report that gets emailed to clients, a financial model that people need to interact with directly, or a process that involves data entry as well as output.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            Power BI is better when multiple people need to access the same live data, leadership wants interactive dashboards, or data is coming from several different systems. See our full guide to <Link href="/blog/power-bi-vs-excel" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Power BI vs Excel</Link> for a detailed comparison.
          </p>

          {/* FAQ */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'How much does a simple Excel macro cost in the UK?',
              a: 'A simple macro — for example, a button that reformats a spreadsheet, moves data between sheets, or runs a standard process — typically costs £150–£400 in the UK. The exact price depends on the complexity of the logic and how much testing is required with your actual data.',
            },
            {
              q: 'How long does Excel automation take to build?',
              a: 'Most Excel automation projects are delivered within 3–7 working days. Simpler fixes can be done in 1–2 days. More complex multi-source reporting systems typically take 7–14 days. A clear scope agreed upfront means you know the delivery timeline before work begins.',
            },
            {
              q: 'Can Excel automation connect to my accounting software?',
              a: 'In most cases, yes. Excel automation using Power Query can connect directly to exports from Xero, Sage, QuickBooks, and most other accounting packages. It can also connect to CSV exports, SharePoint, SQL databases, and web data sources. The connection method depends on your specific software.',
            },
            {
              q: 'Do I need to know VBA to use an automated Excel system?',
              a: 'No. A well-built automation system is designed to be used by anyone on your team — no technical knowledge required. The system runs when you need it, produces the output you need, and requires no understanding of the code underneath.',
            },
            {
              q: 'What is the difference between Excel automation and a Power BI dashboard?',
              a: 'Excel automation keeps your output in Excel — useful when you need to edit the output, share a formatted file, or maintain a financial model. Power BI creates interactive dashboards in a browser that update automatically from live data. Most businesses benefit from both — automated Excel for detailed analysis and Power BI for high-level visibility.',
            },
            {
              q: 'Is Excel automation worth it for a small business?',
              a: 'Yes — often more so than for larger businesses. Small businesses typically have fewer people, which means manual reporting takes up a higher proportion of the team\'s time. Automating even a few hours of manual work per week can free up meaningful capacity in a small team. The return on investment is usually fast and significant.',
            },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px', padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '12px', fontWeight: '600' }}>{item.q}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.a}</p>
            </div>
          ))}

          {/* External links */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>Further reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {[
              { label: 'Microsoft — Introduction to Power Query for Excel', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
              { label: 'Microsoft — Getting started with VBA in Excel', url: 'https://learn.microsoft.com/en-us/office/vba/library-reference/concepts/getting-started-with-vba-in-office' },
              { label: 'ONS — Business Insights and Conditions Survey May 2026', url: 'https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/bulletins/businessinsightsandimpactontheukeconomy/latest' },
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

          {/* Related posts */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { title: 'How to Automate Excel Reports (Without Knowing How to Code)', href: '/blog/how-to-automate-excel-reports', tag: 'Excel Automation' },
              { title: 'Power BI vs Excel: Which Should Your Business Use in 2026?', href: '/blog/power-bi-vs-excel', tag: 'Power BI' },
              { title: '5 Signs Manual Reporting Is Costing Your Business Money', href: '/blog/5-signs-manual-reporting-is-costing-your-business', tag: 'Data Automation' },
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

          {/* CTA */}
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to know what your project would cost?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call and we will scope your project, tell you exactly what we would build, and give you a fixed price before you commit to anything.
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
    </>
  )
}
