import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/what-is-data-cleansing-uk' },
  title: 'What Is Data Cleansing? UK Guide to Fixing Bad Data (2026) | Lexalytic',
  description: 'What is data cleansing and why does bad data cost UK businesses so much? A practical guide to identifying, cleaning and preventing poor data quality. From a UK data consultant.',
  keywords: 'data cleansing UK, uk data cleansing, what is data cleansing, data cleanse UK, data cleaning UK business, bad data cost UK, data quality UK, cleansing data UK',
  openGraph: {
    title: 'What Is Data Cleansing? UK Guide to Fixing Bad Data (2026)',
    description: 'What is data cleansing and why does it matter for UK businesses? A practical guide to fixing bad data quality.',
    url: 'https://www.lexalytic.com/blog/what-is-data-cleansing-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"What Is Data Cleansing — and Why Does Bad Data Cost UK Businesses So Much?","description":"Bad data costs UK businesses more than most realise. Learn what data cleansing is, what causes poor data quality, and how to fix it.","datePublished":"2026-05-12","dateModified":"2026-05-12","url":"https://www.lexalytic.com/blog/what-is-data-cleansing-uk","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"},"mainEntityOfPage":{"@type":"WebPage","@id":"https://www.lexalytic.com/blog/what-is-data-cleansing-uk"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Quality</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Cleansing</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>May 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            What Is Data Cleansing — and Why Does Bad Data Cost UK Businesses So Much?
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Most businesses know their data is messy. Very few realise how much that messiness is actually costing them — in wasted time, wrong decisions, and automation projects that fail before they start.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Data Automation Consultant · Lexalytic · 15 years experience</div>
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
              Data cleansing is the process of identifying and fixing errors, inconsistencies and gaps in your business data. Bad data costs UK businesses an estimated <strong>20% of their annual revenue</strong> in wasted time, poor decisions and failed automation. Most businesses can fix the majority of their data quality problems without expensive software — but it requires a structured approach.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            In 15 years of working with UK businesses on data and reporting systems, the single most common reason a project takes longer than expected — or fails entirely — is bad data. Not bad software. Not wrong tools. Bad data.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The business has spent months planning an automated reporting system. The tool is ready. The process is designed. Then someone opens the source data and finds dates in four different formats, customer names entered six different ways, blank rows scattered throughout, and figures that simply do not add up. The project stalls. The team loses confidence. The automation never gets built.
          </p>

          {/* Image 1 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1543286386-713bdd548da4?w=780&q=80"
              alt="Messy unstructured data in spreadsheets costing UK businesses money"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What is data cleansing?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Data cleansing — also called data cleaning or data scrubbing — is the process of identifying and correcting problems in a dataset so it can be used reliably. This includes fixing errors, resolving inconsistencies, removing duplicates, filling gaps, and standardising formats so that the data behaves predictably when used in reports, automation, or analysis.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            It is not glamorous work. But it is foundational. Every automated report, every Power BI dashboard, every data pipeline is only as reliable as the data feeding into it. Garbage in, garbage out — as the saying goes — is not a cliché. It is a description of what actually happens when businesses try to build on top of unclean data.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>How much does bad data actually cost?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            The numbers are sobering. Research from The Software Bureau estimates that dirty data costs the UK economy <a href="https://www.thesoftwarebureau.com/cost-of-dirty-data-the-900-billion-annual-burden-on-uk-business/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>£900 billion annually</a> — representing around 20% of revenue for affected organisations. Experian's research found that <a href="https://www.experian.co.uk/blogs/latest-thinking/data-quality/data-cleansing-3-easy-steps-to-maximise-your-roi/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>30% of UK businesses suspect their customer data is inaccurate</a>. And Gartner predicts that through 2026, organisations will abandon 60% of AI and automation projects due to data that is not ready to support them.
          </p>

          {/* Stats box */}
          <div style={{ padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: '16px', marginBottom: '24px', fontWeight: '600' }}>The cost of bad data in numbers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '20px' }}>
              {[
                { stat: '£900bn', label: 'Annual cost of dirty data to the UK economy', source: 'The Software Bureau' },
                { stat: '20%', label: 'Of annual revenue lost to poor data quality', source: 'Industry average' },
                { stat: '30%', label: 'Of UK businesses suspect their data is inaccurate', source: 'Experian' },
                { stat: '60%', label: 'Of AI projects abandoned due to poor data by 2026', source: 'Gartner' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', marginBottom: '8px' }}>{item.stat}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{item.source}</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            For most SMEs, the cost of bad data is not a dramatic figure on a finance report — it is a hidden, ongoing drain. Staff spending time correcting errors. Reports that have to be rebuilt because the source data changed format. Decisions made on figures that were wrong to begin with. It accumulates quietly, and most businesses do not realise how much it is costing until they try to automate something and the whole thing breaks.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What causes bad data in the first place?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Bad data rarely arrives all at once. It accumulates over time through a combination of human error, system limitations, and the natural entropy of business operations. Here are the most common causes I see when working with UK businesses:
          </p>

          {[
            {
              title: 'Manual data entry',
              body: 'The most common source of data problems. When people type data into spreadsheets or systems manually, they make mistakes. Names get spelled differently. Dates get entered in different formats. Figures get transposed. One person writes "United Kingdom", another writes "UK", another writes "England". None of these are wrong in isolation — but they are incompatible when you try to aggregate the data.',
            },
            {
              title: 'Multiple systems not talking to each other',
              body: 'Most businesses use several systems — an accounting package, a CRM, an operations spreadsheet, an HR system. When these do not integrate, data gets copied between them manually. Every manual copy is an opportunity for inconsistency. Over time, the same customer, product, or employee can exist in three different systems with three slightly different records.',
            },
            {
              title: 'No data standards or conventions',
              body: 'Without agreed standards for how data should be entered — date formats, naming conventions, required fields — different people enter data differently. This is not carelessness, it is the natural result of not having a clear standard. The fix is not to discipline people; it is to enforce standards at the point of entry through validation rules and structured input forms.',
            },
            {
              title: 'Legacy systems and old data',
              body: 'Businesses that have been operating for years often carry data that was entered under old conventions, imported from a previous system, or simply never cleaned up. This historical data sits in spreadsheets and databases, gradually becoming less reliable as the business evolves around it.',
            },
            {
              title: 'Lack of data ownership',
              body: 'When nobody is specifically responsible for data quality, it degrades over time. Everyone uses the data but nobody maintains it. Fields get left blank because they are not required. Outdated records are never removed. Duplicates are never merged. Over months and years, the dataset becomes progressively less reliable.',
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
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Data cleansing process fixing unstructured business data UK"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What does data cleansing actually involve?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            A proper data cleansing process works through a structured set of steps. The exact process depends on the data and what it will be used for, but the core stages are consistent:
          </p>

          {[
            { num: '01', title: 'Audit and profile the data', body: 'Before fixing anything, understand what you have. How many records? How many blanks? How many duplicates? What formats are being used? A data audit reveals the scale of the problem and prioritises where to focus.' },
            { num: '02', title: 'Remove duplicates', body: 'Duplicate records are one of the most common data quality problems. The same customer entered twice with slightly different spellings. The same product with two different codes. Duplicates inflate counts, skew analysis, and cause double-reporting. They need to be identified and merged or removed.' },
            { num: '03', title: 'Standardise formats', body: 'Dates, phone numbers, postcodes, currency values — all of these need consistent formatting to be usable. This stage converts everything to a standard format so the data behaves predictably. In Excel, Power Query is extremely effective at this step.' },
            { num: '04', title: 'Fix errors and inconsistencies', body: 'Typos, wrong values, impossible dates, negative quantities where only positives are valid. This stage identifies and corrects values that are factually wrong or logically impossible. Some can be fixed automatically; others require human review.' },
            { num: '05', title: 'Handle missing data', body: 'Blank fields are a universal problem. Some blanks can be filled from other sources. Some can be inferred from context. Some need to be flagged as genuinely unknown. The right approach depends on what the field is and how critical it is.' },
            { num: '06', title: 'Validate and document', body: 'Once cleaned, the data should be validated against expected ranges and business rules. And the cleaning process itself should be documented so it can be repeated — because data quality is not a one-time fix, it is an ongoing process.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '28px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>{item.num}</div>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '10px', color: 'var(--ink)', fontWeight: '600' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '20px' }}>What tools are used for data cleansing?</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            For most UK SMEs, the right tools for data cleansing are already available — they just need to be used correctly:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '48px' }}>
            {[
              {
                tool: 'Power Query (Excel & Power BI)',
                desc: 'The most powerful built-in tool for data cleansing in Microsoft\'s ecosystem. It can standardise formats, remove duplicates, fill blanks, split columns, and apply complex transformations — all without writing a single formula. The steps are recorded and can be reapplied automatically every time the data is refreshed.',
                best: 'Best for: regular automated cleansing of Excel and Power BI data sources',
              },
              {
                tool: 'Python (Pandas)',
                desc: 'For larger datasets or more complex cleansing logic, Python with the Pandas library is extremely powerful. It can process millions of rows, apply sophisticated matching algorithms to identify duplicates, and integrate with multiple data sources simultaneously.',
                best: 'Best for: large datasets, complex logic, or automated pipelines',
              },
              {
                tool: 'Excel (formulas and VBA)',
                desc: 'For smaller datasets, Excel\'s built-in functions — TRIM, CLEAN, PROPER, IFERROR — combined with VBA macros can handle many common cleansing tasks. Less powerful than Power Query but widely understood and often already in use.',
                best: 'Best for: smaller datasets where the team already works in Excel',
              },
              {
                tool: 'SQL',
                desc: 'For data stored in databases, SQL is the natural cleansing tool. UPDATE and DELETE queries can fix systematic errors across millions of records in seconds. Particularly useful when the bad data originates in a database rather than a spreadsheet.',
                best: 'Best for: database-stored data, high-volume cleansing',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--amber)', marginBottom: '10px' }}>{item.tool}</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', marginBottom: '12px' }}>{item.desc}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-4)', fontStyle: 'italic', margin: 0 }}>{item.best}</p>
              </div>
            ))}
          </div>

          {/* Image 3 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Clean structured data after data cleansing process UK business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Data cleansing and automation — why one depends on the other</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            One of the most important things to understand about data cleansing is that it is not separate from automation — it is a prerequisite for it.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            When businesses come to us wanting to <Link href="/blog/how-to-automate-excel-reports" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>automate their Excel reports</Link> or build a <Link href="/services/power-bi" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Power BI dashboard</Link>, the first thing we do is assess the quality of the underlying data. In around half of all projects, data cleansing is required before any automation can be built reliably.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            This is not a problem — it is just part of the process. And in most cases, the cleansing work itself delivers immediate value. Once the data is clean and structured, the automation is faster to build, more reliable in operation, and far less likely to produce outputs that people do not trust.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The businesses that struggle are the ones that skip the cleansing step and try to build automation on top of messy data. The system runs, but the outputs are wrong. Trust in the data collapses. The automation gets abandoned. The team goes back to doing it manually.
          </p>

          {/* Internal link box */}
          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Related:</strong> If your data is clean and you are ready to start automating, read our guide to <Link href="/blog/5-signs-manual-reporting-is-costing-your-business" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>5 signs manual reporting is costing your business</Link> to understand where automation will have the most impact.
            </p>
          </div>

          {/* FAQ */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'What is the difference between data cleansing and data transformation?',
              a: 'Data cleansing fixes problems in the data — errors, duplicates, inconsistencies, blanks. Data transformation changes the structure or format of the data to make it usable in a different context — for example, converting rows into columns, combining two datasets, or calculating new fields. In practice, most data projects involve both.',
            },
            {
              q: 'How long does data cleansing take?',
              a: 'It depends entirely on the volume and condition of the data. A single spreadsheet with a few thousand rows can often be cleaned in a day or two. A legacy database with millions of records across multiple tables may take weeks. The key is to audit the data first to understand the scale of the problem before committing to a timeline.',
            },
            {
              q: 'Can data cleansing be automated?',
              a: 'Yes — and it should be wherever possible. Tools like Power Query and Python can apply cleansing rules automatically every time new data is loaded. This means the data is always clean at the point it enters your reports or dashboards, without anyone having to manually check and fix it each time.',
            },
            {
              q: 'What is unstructured data and how is it different from bad data?',
              a: 'Unstructured data is data that does not have a predefined format or organisation — for example, emails, PDFs, free-text notes, or scanned documents. Bad data is data that should be structured but contains errors or inconsistencies. Unstructured data needs to be extracted and structured before it can be cleaned and used. Both are common problems in UK businesses, and both can be addressed with the right tools and approach.',
            },
            {
              q: 'Do I need specialist software for data cleansing?',
              a: 'For most UK SMEs, no. Power Query within Excel and Power BI handles the majority of common data cleansing tasks without any additional software. For larger or more complex datasets, Python is free and extremely powerful. Specialist data quality tools exist but are usually only justified for enterprise-scale data operations.',
            },
            {
              q: 'How do I prevent bad data from building up again after cleansing?',
              a: 'The only permanent fix for bad data is fixing it at the source — implementing validation rules at the point of entry, standardising how data is captured, and ensuring systems are integrated so data does not have to be copied manually. A one-time clean without process changes will gradually accumulate problems again. The cleansing and the process improvement need to happen together.',
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
              { label: 'Experian — Data cleansing: 3 easy steps to maximise your ROI', url: 'https://www.experian.co.uk/blogs/latest-thinking/data-quality/data-cleansing-3-easy-steps-to-maximise-your-roi/' },
              { label: 'UK Government — Data quality action plan', url: 'https://www.gov.uk/government/publications/data-quality-action-plan' },
              { label: 'Microsoft — Getting started with Power Query', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
              { label: 'ONS — UK Data Quality Framework', url: 'https://www.ons.gov.uk/methodology/methodologytopicsandstatisticalconcepts/qualityinofficialstatistics/qualitytools' },
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
              { title: '5 Signs Manual Reporting Is Costing Your Business Money', href: '/blog/5-signs-manual-reporting-is-costing-your-business', tag: 'Data Automation' },
              { title: 'How to Automate Excel Reports (Without Knowing How to Code)', href: '/blog/how-to-automate-excel-reports', tag: 'Excel Automation' },
              { title: 'How Much Does Excel Automation Cost in the UK?', href: '/blog/excel-automation-cost-uk', tag: 'Excel Automation' },
              { title: 'Power BI vs Excel: Which Should Your Business Use in 2026?', href: '/blog/power-bi-vs-excel', tag: 'Power BI' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Not sure how clean your data actually is?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call and we will look at your current data setup, identify the quality issues that are slowing you down, and tell you exactly what needs to change before automation can work reliably.
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
