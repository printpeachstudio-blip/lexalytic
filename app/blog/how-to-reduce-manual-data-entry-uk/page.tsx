import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/how-to-reduce-manual-data-entry-uk' },
  title: 'How to Reduce Manual Data Entry in Your Business (UK Guide 2026) | Lexalytic',
  description: 'Manual data entry is costing UK businesses more than they realise. Here is a practical guide to reducing it — without expensive software or a big IT project. From a UK data automation consultant.',
  keywords: 'reduce manual data entry UK, stop manual data entry business, automate data entry UK, manual data entry problems UK, data entry automation UK small business',
  openGraph: {
    title: 'How to Reduce Manual Data Entry in Your Business (UK Guide 2026)',
    description: 'Manual data entry is costing UK businesses more than they realise. A practical guide to reducing it without expensive software.',
    url: 'https://www.lexalytic.com/blog/how-to-reduce-manual-data-entry-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How to Reduce Manual Data Entry in Your Business (UK Guide 2026)","description":"Manual data entry is costing UK businesses more than they realise. A practical guide to reducing it without expensive software.","datePublished":"2026-05-19","dateModified":"2026-05-19","url":"https://www.lexalytic.com/blog/how-to-reduce-manual-data-entry-uk","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Automation</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Efficiency</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>May 2026 · 11 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            How to Reduce Manual Data Entry in Your Business
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Manual data entry is one of the most expensive habits a business can have. Not because the work costs much per hour — but because it never stops, it generates errors, and it keeps your team busy with tasks that a well-built system could handle automatically.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(193,125,46,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--amber)', flexShrink: 0 }}>M</div>
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Data Automation Consultant · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>

      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>The short answer</p>
            <p style={{ color: 'var(--ink-2)', lineHeight: '1.75', margin: 0 }}>
              Most manual data entry in UK businesses happens because systems do not talk to each other, data arrives in the wrong format, or nobody has ever questioned whether the process needs a human in the loop at all. The fix is almost never expensive software — it is identifying the specific steps where data is being re-entered and removing them one by one.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            Research from multiple sources consistently finds that manual data entry costs businesses between five and ten hours per week in staff time — and that is before accounting for the time spent finding and fixing the errors it creates. A study cited by the University of Hawaii found that 88% of spreadsheets contain at least one error. Most of those errors come from manual entry.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The businesses I work with are not careless. Their people are not making mistakes because they are bad at their jobs. They are making mistakes because copying data between systems, reformatting exports, and re-entering figures from one place to another is exactly the kind of repetitive task that humans do poorly at volume. The solution is not to ask people to be more careful — it is to remove the manual step entirely.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=780&q=80"
              alt="Business team reducing manual data entry with automation UK"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why manual data entry keeps happening</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Before you can fix manual data entry, it helps to understand why it exists in the first place. In most businesses, it comes down to one of four root causes:
          </p>

          {[
            {
              title: 'Systems that do not integrate',
              body: 'Your accounting software does not talk to your CRM. Your operations system does not connect to your reporting spreadsheet. Data that should flow automatically between systems instead gets exported, reformatted, and re-entered by a person. Every step in that chain is a manual data entry point — and a potential error.',
            },
            {
              title: 'Data arriving in the wrong format',
              body: 'A supplier sends an invoice as a PDF. A client returns a form as an email. A partner sends a CSV with columns in a different order to yours. Someone then manually re-keys that information into your system rather than it flowing in automatically. The original data was digital — it just arrived in a format that required human translation.',
            },
            {
              title: 'Processes built around what was possible, not what is best',
              body: 'Most manual data entry processes were designed years ago when automation was harder or more expensive. Nobody has revisited them since. The business has grown, the volume has increased, and the manual process that was manageable for ten records a week is now slow and error-prone at two hundred.',
            },
            {
              title: 'No single source of truth',
              body: 'When data lives in multiple places — a CRM, a spreadsheet, an accounting package, an ops tool — someone has to be the human bridge between them, keeping everything in sync. That person is doing work that a well-designed integration would do automatically and instantly.',
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
            </div>
          ))}

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Automated data flow replacing manual data entry in UK business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>How to actually reduce manual data entry — step by step</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            The right approach depends on where your manual entry is coming from, but the process for addressing it is consistent regardless of the tools you use.
          </p>

          {[
            {
              num: '01',
              title: 'Map every manual data entry point in your business',
              body: 'Start by listing every process where a person types data that already exists somewhere else. Invoice details re-entered from a PDF. Customer information copied from a form into a CRM. Sales figures pulled from a system into a spreadsheet. Weekly reports assembled from multiple exports. Most businesses find more manual entry points than they expected when they actually look. Each one is a candidate for automation.',
            },
            {
              num: '02',
              title: 'Prioritise by frequency and error cost',
              body: 'Not every manual entry point is worth fixing immediately. A daily process that takes 20 minutes is 80+ hours a year — that deserves attention. A monthly process that takes 10 minutes is 2 hours a year — that can wait. More importantly, consider the cost of errors at each point. A wrong figure in a client invoice is a real business problem. A mislabelled category in an internal report is inconvenient but survivable. Fix the high-frequency, high-error-cost processes first.',
            },
            {
              num: '03',
              title: 'Check whether your existing tools already connect',
              body: 'Before building anything, check whether your current systems have integrations you have not switched on. Most modern accounting packages, CRMs, and business tools have native connections to each other or through platforms like Power Automate. Xero connects to hundreds of tools natively. Salesforce integrates with most accounting and operations systems. The automation you need may already be available — it just needs to be configured.',
            },
            {
              num: '04',
              title: 'Use Power Query to eliminate spreadsheet re-entry',
              body: 'If your manual entry involves copying data into Excel — from CSV exports, other spreadsheets, or system exports — Power Query is often the fastest fix. It connects directly to your data sources, pulls the data automatically, cleans and transforms it according to rules you set once, and refreshes with a single click. The person who used to spend an hour reformatting a CSV export can now press one button and have a clean, formatted report in seconds. Read our guide to ' + 'automating Excel reports for a practical walkthrough.',
            },
            {
              num: '05',
              title: 'Automate the transfer between systems',
              body: 'When data needs to move between two systems — from a form into a CRM, from an accounting package into a reporting tool, from a project management system into a spreadsheet — Power Automate or a Python script can handle the transfer automatically. The trigger can be an event (a form is submitted, an invoice is approved, a status changes) or a schedule (every morning at 8am, the data is pulled and processed). Either way, the human in the middle is removed.',
            },
            {
              num: '06',
              title: 'Replace paper and email-based data collection with structured forms',
              body: 'A significant source of manual entry in many businesses is data that arrives as paper, PDF, or unstructured email and has to be re-keyed. Replacing these with structured digital forms — Microsoft Forms, Google Forms, or custom-built input forms in Excel or a web application — means the data is captured in the right format from the start, ready to flow into your systems without anyone typing it out again.',
            },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '36px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>{item.num}</div>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '10px', color: 'var(--ink)', fontWeight: '600' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}

          <div style={{ padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginBottom: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', marginBottom: '20px' }}>What manual data entry actually costs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px' }}>
              {[
                { stat: '88%', label: 'Of spreadsheets contain at least one error', source: 'University of Hawaii research' },
                { stat: '5-10hrs', label: 'Lost per week to manual data entry', source: 'Industry average for UK SMEs' },
                { stat: '1 in 5', label: 'Data entry errors go undetected', source: 'Gartner data quality research' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', marginBottom: '8px' }}>{item.stat}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', marginBottom: '6px' }}>{item.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{item.source}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The tools that do the heavy lifting</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            You do not need to buy expensive software to eliminate most manual data entry. The tools that handle the majority of cases are either already available in your Microsoft 365 or Google Workspace subscription, or are free and widely used:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px', marginBottom: '48px' }}>
            {[
              {
                tool: 'Power Query (Excel)',
                when: 'Best for eliminating manual reformatting of spreadsheet data',
                desc: 'Connects directly to your data sources, transforms the data according to rules you set once, and refreshes automatically. No more manual copy-paste between spreadsheets.',
              },
              {
                tool: 'Power Automate',
                when: 'Best for automating data transfers between Microsoft 365 apps',
                desc: 'Triggers flows based on events — a form submitted, an email received, a file uploaded — and moves data between systems automatically without anyone in the loop.',
              },
              {
                tool: 'Python',
                when: 'Best for large volumes, complex logic, or non-Microsoft systems',
                desc: 'For data entry processes involving large datasets, API connections, or logic too complex for Power Query. Runs on a schedule with no manual trigger required.',
              },
              {
                tool: 'VBA (Excel)',
                when: 'Best for automating Excel-based entry processes',
                desc: 'When the data entry process lives inside Excel and involves steps that Power Query cannot handle, VBA macros can automate the full sequence with a single button press.',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--amber)', marginBottom: '6px' }}>{item.tool}</h3>
                <div style={{ fontSize: '12px', color: 'var(--ink-4)', marginBottom: '12px', fontStyle: 'italic' }}>{item.when}</div>
                <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Data automation tools eliminating manual entry UK small business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>A real example: from daily manual entry to zero</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            A pharmacy we worked with was managing 20+ locum pharmacists manually. Shift details came in via phone and email. Someone would then enter the hours, the rate, and the payment date into a spreadsheet by hand. Every week. Across more than 20 people. Payments were frequently late because someone had missed an entry. Scheduling clashes happened because the spreadsheet was not always up to date.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            We replaced the manual entry process with a structured input form. The pharmacy team enters shift details once, in a structured format, directly into the system. The system calculates the pay automatically, flags payment due dates in red, and keeps the rota current. The manual re-entry step was removed entirely.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The time saving was significant. But the bigger win was reliability — payments went out on time, scheduling clashes stopped happening, and the admin burden on the team dropped substantially. That is what removing manual data entry actually delivers in practice.
          </p>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Related:</strong> If your data entry problems are compounded by poor data quality — inconsistent formats, duplicates, blank fields — read our guide to{' '}
              <Link href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing for UK businesses</Link>{' '}
              before automating. Automating a broken process just makes the problems happen faster.
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'How much does it cost to automate manual data entry in the UK?',
              a: 'It depends entirely on the complexity of the process. Simple Power Query automations that eliminate spreadsheet re-entry are often delivered within a few days. More complex multi-system integrations take longer. Most projects pay for themselves within the first few months of staff time saved. We scope every project and give a fixed price before any work begins.',
            },
            {
              q: 'Do I need to replace my existing software to reduce manual data entry?',
              a: 'Almost never. The most effective approach is to connect and automate the systems you already have — not replace them. Most modern business software has APIs or export capabilities that can be used to move data automatically without anyone typing it again.',
            },
            {
              q: 'What is the biggest source of manual data entry for most UK businesses?',
              a: 'In our experience, the most common sources are: data exported from one system and reformatted in Excel before being entered somewhere else; client or supplier information arriving by email or PDF and being manually re-keyed; and reports assembled weekly or monthly by copying figures from multiple sources into a single spreadsheet.',
            },
            {
              q: 'Can manual data entry really be eliminated completely?',
              a: 'For most repeating, rule-based processes, yes. There will always be situations where human judgment is required — unusual cases, exceptions, decisions that need context. But the routine, predictable work that follows the same pattern every time can almost always be fully automated.',
            },
            {
              q: 'How long does it take to automate a manual data entry process?',
              a: 'Simple single-process automations are typically delivered in 3-5 working days. More complex builds involving multiple systems or large data volumes take 7-14 days. You will get a clear timeline at the scoping stage.',
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
              { label: 'AccountsIQ — How to reduce manual data entry in accounting (UK)', url: 'https://www.accountsiq.com/blog/how-to-reduce-manual-data-entry-in-accounting-uk-12-practical-steps-you-can-take-now' },
              { label: 'Microsoft — Introduction to Power Query', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
              { label: 'HMRC — Making Tax Digital: what you need to know', url: 'https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax' },
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
              { title: 'What Is Data Cleansing — and Why Does Bad Data Cost UK Businesses So Much?', href: '/blog/what-is-data-cleansing-uk', tag: 'Data Quality' },
              { title: '5 Signs Manual Reporting Is Costing Your Business Money', href: '/blog/5-signs-manual-reporting-is-costing-your-business', tag: 'Data Automation' },
              { title: 'How to Automate Excel Reports (Without Knowing How to Code)', href: '/blog/how-to-automate-excel-reports', tag: 'Excel Automation' },
              { title: 'How Much Does Excel Automation Cost in the UK?', href: '/blog/excel-automation-cost-uk', tag: 'Excel Automation' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Ready to stop re-entering the same data?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. Tell us where your team spends the most time on manual data work and we will tell you exactly what automation would look like — and what it would cost.
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
