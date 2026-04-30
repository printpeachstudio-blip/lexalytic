import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/5-signs-manual-reporting-is-costing-your-business' },
  title: '5 Signs Manual Reporting Is Costing Your Business (2026) | Lexalytic',
  description: 'Is your team spending too much time on manual Excel reports? Here are 5 clear signs your business needs data automation — and what to do about it. From a UK data consultant.',
  keywords: 'manual reporting costing business, signs you need data automation UK, too much time on Excel reports, business reporting problems UK, automate business reports UK, data automation consultant UK',
  openGraph: {
    title: '5 Signs Manual Reporting Is Costing Your Business Money in 2026',
    description: 'Is your team wasting hours on manual Excel reports? Here are 5 signs it\'s time to automate — and what to do about it.',
    url: 'https://www.lexalytic.com/blog/5-signs-manual-reporting-is-costing-your-business',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  return (
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Automation</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Reporting</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>April 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            5 Signs Manual Reporting Is Costing Your Business Money
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Most businesses know their reporting process is painful. What they don't realise is exactly how much it's costing them — in time, in errors, and in decisions made on data that's already out of date.
          </p>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(193,125,46,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--amber)', flexShrink: 0 }}>M</div>
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Data Automation Consultant · Lexalytic · 10 years experience</div>
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
              If your team spends more than a few hours a month compiling reports manually, you are almost certainly losing money. The five signs below are the most common indicators — and each one is fixable with the right automation approach.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            After 10 years of working with UK businesses on data and reporting systems, I have seen the same problems come up time and again. A Finance Manager spending two days a month rebuilding the same report. A Managing Director making decisions based on last month's numbers because nobody has had time to update the dashboard. An Operations team copying data between spreadsheets every Monday morning.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            These problems all have names. They are all measurable. And they are all fixable. Here are the five clearest signs that your manual reporting process is costing your business more than you realise.
          </p>

          {/* Image 1 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=780&q=80"
              alt="Business team looking at manual reporting spreadsheets costing time and money"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Sign 1 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'rgba(193,125,46,0.25)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>01</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Someone in your team owns "the report"</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                You know the one. There is a specific person — usually in finance or operations — whose job it is to pull together the monthly numbers. They know where everything lives, how to clean the data, which cells to update, and why the formula in column G breaks when someone adds a new row.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                This is a single point of failure disguised as a competent employee. When that person is on holiday, sick, or eventually leaves, everything stops. The business cannot see its own numbers.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                More practically, that person is spending time every week or month doing a job that a well-built automated system could do in seconds. According to <a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-social-economy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>McKinsey research</a>, knowledge workers spend nearly 20% of their working week on data collection and reporting tasks that could be automated. At an average UK salary of £35,000, that is £7,000 per year per person spent on work a system could do for free.
              </p>
              <div style={{ padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', margin: 0, lineHeight: '1.7' }}>
                  <strong>What to do about it:</strong> The report should belong to a system, not a person. If the data exists in your business — in your accounting software, your CRM, your operations spreadsheets — it can be automated into a dashboard that updates itself. See our guide to <Link href="/blog/how-to-automate-excel-reports" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>automating Excel reports</Link> for a practical starting point.
                </p>
              </div>
            </div>
          </div>

          {/* Sign 2 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'rgba(193,125,46,0.25)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>02</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Your leadership team is making decisions on last month's data</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                In most businesses, the board pack or management report covers the previous month. By the time it lands in front of the people who need to act on it, the data is already 4-6 weeks old. In a fast-moving business, that is an enormous lag.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                The reason this happens is almost always the same: the data has to be pulled manually from multiple systems, cleaned, combined, and formatted before it can be presented. That process takes days, which means the report is always looking backwards.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                The consequences are real. Sales trends spotted six weeks late mean missed opportunities. Cost overruns identified a month after they started mean overspending that could have been caught earlier. Cash flow problems flagged at month-end rather than in real time mean avoidable stress on the business.
              </p>
              <div style={{ padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', margin: 0, lineHeight: '1.7' }}>
                  <strong>What to do about it:</strong> A <Link href="/services/power-bi" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Power BI dashboard</Link> connected directly to your data sources gives leadership a live view of the business — updated automatically, no manual work required. Decisions get made on today's numbers, not last month's.
                </p>
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Live data dashboard replacing manual reporting for UK business decision making"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Sign 3 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'rgba(193,125,46,0.25)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>03</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>You have had at least one data error cause a real problem</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                A mistyped figure in a formula. A row accidentally deleted. A filter left applied to a dataset that nobody noticed. Manual processes are inherently prone to human error — not because the people doing them are careless, but because copying and pasting data between systems is the kind of repetitive task that humans are simply not designed to do accurately at high volume.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                The famous <a href="https://www.bbc.co.uk/news/magazine-22223190" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Reinhart-Rogoff spreadsheet error</a> — a simple Excel mistake that influenced economic policy across multiple governments — is an extreme example, but the same class of error happens in businesses every day. Incorrect invoices sent to clients. Wrong stock figures leading to over-ordering. Payroll errors that take months to discover.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                Every manual step in a reporting process is a point where an error can enter the data. Automation removes those steps entirely. The data flows from its source to the output without any human intervention — and therefore without any opportunity for human error.
              </p>
              <div style={{ padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', margin: 0, lineHeight: '1.7' }}>
                  <strong>What to do about it:</strong> <Link href="/services/excel-automation" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Excel automation</Link> and Power Query can connect directly to your source data, removing the copy-paste steps where errors enter. Once the data flows automatically, the output is only as wrong as the source — which is a much smaller problem to manage.
                </p>
              </div>
            </div>
          </div>

          {/* Sign 4 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'rgba(193,125,46,0.25)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>04</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Your data lives in more than two places</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                Most growing businesses end up with data fragmented across multiple systems. The accounting package holds the financials. The CRM holds the sales pipeline. Operations runs on a mix of spreadsheets and project management tools. HR has its own system. Nobody has a joined-up view of the business without manually pulling everything together.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                This is not a technology problem — it is a data architecture problem. Each of those systems is doing its job correctly. The problem is that there is no layer sitting above them that consolidates the picture automatically.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                The practical result is that someone spends hours every week or month being a human data pipeline — extracting from system A, cleaning in Excel, combining with system B, formatting for a report. That person could be doing something far more valuable.
              </p>
              <div style={{ padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', margin: 0, lineHeight: '1.7' }}>
                  <strong>What to do about it:</strong> This is exactly the problem that Power BI and <Link href="/services/python-automation" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>Python automation</Link> are built to solve. Both can connect to multiple data sources simultaneously and consolidate them into a single live view — without any manual intervention once the system is built.
                </p>
              </div>
            </div>
          </div>

          {/* Image 3 */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=780&q=80"
              alt="Multiple data sources being consolidated into one automated reporting system UK business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Sign 5 */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '56px', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'rgba(193,125,46,0.25)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>05</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>You are hiring people partly to manage your data</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                This one is subtle but it is the most expensive sign of all. When a business grows, reporting complexity grows with it. The natural response is to hire someone to manage it — a data analyst, an additional finance team member, an operations coordinator whose job description quietly includes "maintaining the weekly reports."
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                There is nothing wrong with hiring talented people. The problem is when a meaningful portion of their time is spent on work that a well-built system could handle automatically. A skilled analyst spending 40% of their week compiling reports is being paid £15,000+ per year to do a job that automation could do for a fraction of that cost.
              </p>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '16px' }}>
                The same hire with their reporting automated becomes dramatically more valuable — they can spend that 40% on analysis, insight, and decisions rather than on data wrangling. You get more from the same headcount.
              </p>
              <div style={{ padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', borderLeft: '3px solid var(--amber)' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink-2)', margin: 0, lineHeight: '1.7' }}>
                  <strong>What to do about it:</strong> Before your next data or finance hire, run the numbers on what automation would cost versus what a headcount costs annually. In most cases, a one-off automation project pays for itself within the first few months of employment — and continues saving money indefinitely. Use our <Link href="/#tool" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>free reporting cost calculator</Link> to see the numbers for your business.
                </p>
              </div>
            </div>
          </div>

          {/* Cost summary box */}
          <div style={{ padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginBottom: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', marginBottom: '20px' }}>What does manual reporting actually cost?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px', marginBottom: '20px' }}>
              {[
                { label: 'Average time wasted on manual reporting', value: '20%', sub: 'of a knowledge worker\'s week (McKinsey)' },
                { label: 'Cost per employee at £35k salary', value: '£7,000', sub: 'per year on reportable tasks' },
                { label: 'Typical automation ROI', value: '3-6x', sub: 'return in first year alone' },
              ].map((stat, i) => (
                <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', marginBottom: '8px' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5' }}>{stat.label}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '4px', fontStyle: 'italic' }}>{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What to do now */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What to do if you recognise these signs</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The good news is that every one of these problems is solvable. You do not need to replace your existing systems, hire a development team, or commit to an expensive enterprise software rollout. In most cases, the data you need already exists in your business — it just needs to be connected and automated.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The right starting point depends on what your specific situation looks like. Some businesses need a Power BI dashboard that consolidates multiple data sources. Others need their existing Excel processes automated so the data flows without anyone touching it. Some need both.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The fastest way to find out what your business needs is a short scoping conversation — which we offer free, with no obligation. In 30 minutes, we can look at your current reporting process and tell you exactly what would need to change, what it would cost, and how long it would take.
          </p>

          {/* FAQ */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'How do I know if my business is ready for data automation?',
              a: 'If any of the five signs above apply to your business, you are ready. You do not need a large team, a big budget, or a complex data setup. The only requirement is that your data exists somewhere — in a spreadsheet, an accounting package, a CRM — and that you want it to be more accessible and accurate.'
            },
            {
              q: 'How much does it cost to automate business reporting in the UK?',
              a: 'Costs vary depending on complexity, but most SME reporting automation projects are fixed-price one-off builds. A single automated report or dashboard typically costs less than one month of the time currently being spent building it manually. We scope every project individually and give you a fixed price before any work begins.'
            },
            {
              q: 'How long does it take to automate an Excel report?',
              a: 'Simple automation projects are typically delivered in 3-5 working days. More complex builds involving multiple data sources or full Power BI dashboards take 7-14 days. We give you a clear timeline at the scoping stage so there are no surprises.'
            },
            {
              q: 'Will automation work with the systems we already use?',
              a: 'In most cases, yes. Power BI, Excel automation and Python scripts can connect to almost any business system — Xero, Sage, Salesforce, HubSpot, QuickBooks, Dynamics, and hundreds of others. If your data is accessible digitally, it can almost certainly be automated.'
            },
            {
              q: 'Do we need to replace our existing software?',
              a: 'No. The whole point of data automation is to work with the systems you already have. We connect to your existing tools and build a reporting layer on top — so your team keeps working the way they always have, but the reporting happens automatically in the background.'
            },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '24px', padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '12px', fontWeight: '600' }}>{item.q}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.a}</p>
            </div>
          ))}

          {/* External links */}
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>Further reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
            {[
              { label: 'McKinsey — The social economy: Unlocking value through social technologies', url: 'https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-social-economy' },
              { label: 'HMRC — Making Tax Digital for Income Tax: what you need to know', url: 'https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax' },
              { label: 'Microsoft — Introduction to Power Query', url: 'https://support.microsoft.com/en-us/office/introduction-to-power-query-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Recognise any of these signs in your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call and we will look at your current reporting process, tell you exactly what needs to change, and give you a fixed price before any work begins.
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
