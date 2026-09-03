import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/when-your-business-has-outgrown-excel' },
  title: 'When Your Business Has Outgrown Excel — And What To Do Next | Lexalytic',
  description: 'Excel is brilliant for what it was designed for. But most growing UK businesses reach a point where their spreadsheets become a liability. Here is how to know when you have hit that wall — and what to do about it.',
  keywords: 'business outgrown Excel UK, when to stop using spreadsheets, Excel too complicated business, replace Excel with automation UK, spreadsheet problems growing business UK',
  openGraph: {
    title: 'When Your Business Has Outgrown Excel — And What To Do Next',
    description: 'Excel is brilliant for what it was designed for. Most growing businesses eventually hit the wall where their spreadsheets become a liability.',
    url: 'https://www.lexalytic.com/blog/when-your-business-has-outgrown-excel',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"When Your Business Has Outgrown Excel — And What To Do Next","description":"Excel is brilliant for what it was designed for. But most growing UK businesses reach a point where their spreadsheets become a liability.","datePublished":"2026-05-19","dateModified":"2026-05-19","url":"https://www.lexalytic.com/blog/when-your-business-has-outgrown-excel","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Growth</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>May 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            When Your Business Has Outgrown Excel — And What To Do Next
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Excel is not the problem. Excel doing a job it was never designed to do — that is the problem. Here is how to tell the difference, and what actually needs to change.
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
              You have not outgrown Excel. You have outgrown the way you are using it. The answer is almost never to replace Excel entirely — it is to stop using it for things it was not designed for, and automate the parts that are slowing you down.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            Excel was designed in 1987 to help individuals organise and analyse data. It was not designed to be a shared database, a business process management tool, a multi-user reporting platform, or the backbone of an entire company. And yet that is exactly what most growing businesses end up using it for — because it was there, it was familiar, and at the time it was the most practical option available.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The problem is not Excel. The problem is a mismatch between what the tool was built to do and what the business is now asking it to do. Recognising that mismatch — and knowing what to do about it — is what this guide is for.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=780&q=80"
              alt="Business team realising their spreadsheets have outgrown Excel UK"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The signs your spreadsheets are holding you back</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            These are the patterns I see most often when a business is using Excel in ways that are costing them more than they realise:
          </p>

          {[
            {
              num: '01',
              title: 'One person owns the spreadsheet — and everyone else is afraid to touch it',
              body: 'There is a file that only one person truly understands. They know which cells not to edit, why the formula in column F breaks when you add a new row, and what the colour coding actually means. When that person is on holiday, nobody can produce the report. When they eventually leave, there is a minor crisis. This is not a people problem — it is a process problem. A system that depends on one person knowing undocumented logic is not a system, it is a liability.',
            },
            {
              num: '02',
              title: 'There are multiple versions of the same spreadsheet floating around',
              body: 'Budget_v3_FINAL.xlsx. Budget_v3_FINAL_revised.xlsx. Budget_v3_FINAL_revised_MH.xlsx. Version control in spreadsheets is a myth. The moment a file gets emailed, you have two different versions in two different inboxes. Someone updates theirs. Someone else updates their copy. By the end of the week, nobody knows which numbers are correct. This is one of the most common and costly sources of data errors in growing businesses.',
            },
            {
              num: '03',
              title: 'Building a report takes a significant chunk of your week',
              body: 'If a Finance Manager is spending two days every month-end pulling together a report that answers the same questions every single month, that is a process problem. The questions do not change. The data format does not change. The only thing that changes is the numbers — and those come from sources that could feed the report automatically. Any report that takes more than a few minutes to produce and is produced more than occasionally is a candidate for automation.',
            },
            {
              num: '04',
              title: 'The spreadsheet is being used as a database',
              body: 'Client records. Supplier information. Employee data. Inventory. Order history. When a business starts using Excel to store records that need to be searched, filtered, updated, and kept accurate over time, it has moved beyond what spreadsheets handle well. Spreadsheets do not enforce data entry rules, do not maintain audit trails, do not prevent duplicate entries, and do not handle concurrent editing without creating conflicts. Using Excel as a database works fine at small scale — and starts causing serious problems as the business grows.',
            },
            {
              num: '05',
              title: 'A data error has caused a real business problem',
              body: 'An invoice went out with the wrong figures. A report showed numbers that did not match the actual position. A decision was made based on data that turned out to be wrong. These are not rare events — they are the predictable outcome of any manual process run at sufficient scale. Every step where a human copies data, enters a figure, or applies a formula is a point where an error can enter the system. The more manual steps, the more errors. And in growing businesses, the volume increases faster than the error rate drops.',
            },
            {
              num: '06',
              title: 'Your data lives in too many places',
              body: 'The accounting figures are in Xero. The sales data is in a CRM. The ops team has their own spreadsheet. HR has another one. Nobody has a single joined-up view of the business without someone spending hours every week pulling it all together manually. This is not an Excel problem specifically — it is a data architecture problem. But it usually manifests through spreadsheets because that is where the manual consolidation happens.',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '40px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>{item.num}</div>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '12px', color: 'var(--ink)', fontWeight: '600' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8', margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Moving from spreadsheets to automated dashboards UK business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What to do — and what not to do</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The most common mistake businesses make when they realise their spreadsheets are causing problems is to try to replace everything at once. A big new system. An ERP. A digital transformation project. These projects are expensive, disruptive, and often fail because the business was not ready for the complexity they introduce.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The right approach is almost always the opposite — fix the specific problems, one at a time, using the simplest solution that works. In most cases, that does not mean replacing Excel at all. It means automating the manual steps that are causing the problems, and connecting the systems that should be talking to each other.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px', marginBottom: '48px' }}>
            {[
              {
                problem: 'One person owns the report',
                fix: 'Automate the report so it builds itself. The output is the same every time, produced by a system rather than a person. Anyone can run it.',
                tool: 'Excel automation or Power BI',
                href: '/services/excel-automation',
              },
              {
                problem: 'Multiple versions causing confusion',
                fix: 'Move the report to a live dashboard that everyone accesses from one place. No files, no versions, no conflicts.',
                tool: 'Power BI',
                href: '/services/power-bi',
              },
              {
                problem: 'Reports taking too long to produce',
                fix: 'Automate the data collection and transformation steps. The report should refresh automatically when new data is available.',
                tool: 'Power Query or Python',
                href: '/blog/how-to-automate-excel-reports',
              },
              {
                problem: 'Excel being used as a database',
                fix: 'Keep Excel for analysis and reporting. Move the record-keeping to a proper database or a structured tool built for that purpose.',
                tool: 'SQL or structured data store',
                href: '/services/python-automation',
              },
              {
                problem: 'Data errors causing real problems',
                fix: 'Remove the manual steps where errors enter. Automate the data flow so it goes directly from source to output without human intervention.',
                tool: 'Excel automation, Power Automate or Python',
                href: '/blog/how-to-reduce-manual-data-entry-uk',
              },
              {
                problem: 'Data in too many places',
                fix: 'Connect the sources into a single automated reporting layer. One dashboard pulling from all systems, updated automatically.',
                tool: 'Power BI or Python pipeline',
                href: '/services/power-bi',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>The problem</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px' }}>{item.problem}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>The fix</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6', marginBottom: '12px' }}>{item.fix}</div>
                <Link href={item.href} style={{ fontSize: '12px', color: 'var(--amber)', textDecoration: 'none', fontWeight: '500' }}>
                  {item.tool} →
                </Link>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Excel is still brilliant for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            None of this means Excel should be abandoned. It should not. After 15 years of building data systems for UK businesses, I still use Excel regularly — because for the right jobs, nothing comes close.
          </p>

          <div style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '48px' }}>
            {[
              'Financial modelling — budgets, forecasts, scenario analysis. The cell-level control Excel gives you cannot be replicated elsewhere.',
              'Ad-hoc analysis — quick calculations, one-off data exploration, checking a figure. Excel is faster than any other tool for this.',
              'Data entry — when a human needs to input information, Excel and Google Sheets are still the most practical environments.',
              'Presentations to small audiences — a well-formatted Excel report sent to one or two people is perfectly fine. The problems start when you try to distribute it at scale.',
              'Prototyping — before building a proper automated system, modelling the logic in Excel first is often the fastest way to validate the approach.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 4 ? '14px' : '0', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                <span style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Excel still useful for financial modelling alongside automated reporting UK"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>A real example from a hairdressing group</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            A hairdressing business came to us with a spreadsheet problem that is probably familiar to a lot of growing businesses. The financial data for the whole company was spread across multiple spreadsheets with no links between them. They had inherited a set of macros from a previous consultant — some did not work at all, and some took so long to run that nobody used them. The owner had no reliable view of how the business was performing without spending hours manually piecing things together.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The answer was not to replace Excel. The answer was to fix what was broken. We cleaned and restructured the data, rebuilt every macro properly — faster, documented, and tested — and connected the spreadsheets so the picture came together automatically.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The owner can now open one file and see accurate figures across the whole business. The macros that used to take minutes now run in seconds. Nothing changed about the tools — everything changed about how they were built and connected.
          </p>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Related:</strong> If the underlying data is the problem — inconsistent formats, duplicates, blank fields — fixing the spreadsheet structure will not help until the data itself is clean. Read our guide to{' '}
              <Link href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing for UK businesses</Link>{' '}
              before rebuilding anything.
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'Should I replace Excel with specialist software?',
              a: 'Rarely, and not as a first step. Specialist software introduces new complexity, requires training, and costs significantly more than fixing your existing processes. In most cases, the right approach is to automate the manual steps in your current setup before considering a platform change. If you genuinely need a dedicated database or CRM, that conversation should come after the immediate process problems are solved.',
            },
            {
              q: 'How do I know which problems are worth fixing first?',
              a: 'Start with the process that takes the most time or causes the most errors — whichever is costing you more. A report that takes two days every month is 24 days a year. A data entry process that generates regular errors might be costing you less in time but more in consequences. Map the problems, assign rough costs to each, and fix the most expensive one first.',
            },
            {
              q: 'Can Excel handle large datasets or does it need to be replaced?',
              a: 'Excel can handle larger datasets than most people realise when set up correctly. Power Query, Power Pivot, and the Data Model allow Excel to work with millions of rows without the file slowing down. The limits people hit are usually caused by how the data is stored and processed, not by Excel itself. That said, for genuinely large-scale, scheduled data processing, Python is a better fit.',
            },
            {
              q: 'What is the difference between automating Excel and replacing it with Power BI?',
              a: 'Excel automation fixes the process inside Excel — removing manual steps, automating report generation, connecting data sources. Power BI replaces the Excel report entirely with a live dashboard that anyone can access. The right choice depends on what the output needs to do. If people need to edit it or it needs to stay in Excel format, automate Excel. If people just need to view it and it should update automatically, Power BI is usually better. Read our full comparison in our guide to Power BI vs Excel.',
            },
            {
              q: 'How long does it take to fix a spreadsheet problem?',
              a: 'Simple fixes — rebuilding broken macros, automating a single report, cleaning and restructuring a spreadsheet — are typically delivered in 3-5 working days. More complex builds involving multiple data sources take longer. We scope every project and give a fixed price before any work begins.',
            },
            {
              q: 'If we outgrow Excel, do we have to buy expensive software?',
              a: 'Not necessarily. For many businesses a custom-built tool is a better answer than off-the-shelf software. A bespoke CRM, job tracker, or business application built around your exact processes costs once, fits perfectly, and has no monthly licence fees. We build these as well as Excel automation — the right answer depends on your specific situation.',
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
              { label: 'Microsoft — Getting started with Power Query in Excel', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
              { label: 'Microsoft — Power BI vs Excel: when to use each', url: 'https://powerbi.microsoft.com/en-gb/excel-vs-power-bi/' },
              { label: 'HMRC — Making Tax Digital: digital record keeping requirements', url: 'https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax' },
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
              { title: 'Power BI vs Excel: Which Should Your Business Use in 2026?', href: '/blog/power-bi-vs-excel', tag: 'Power BI' },
              { title: 'What Is Data Cleansing — and Why Does Bad Data Cost UK Businesses So Much?', href: '/blog/what-is-data-cleansing-uk', tag: 'Data Quality' },
              { title: '5 Signs Manual Reporting Is Costing Your Business Money', href: '/blog/5-signs-manual-reporting-is-costing-your-business', tag: 'Data Automation' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Recognise any of these problems in your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. We will look at your current setup, identify exactly what is causing the problem, and tell you what a fix would look like — and what it would cost.
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
