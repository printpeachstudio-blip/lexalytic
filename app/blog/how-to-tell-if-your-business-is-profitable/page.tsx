import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/how-to-tell-if-your-business-is-profitable' },
  title: 'How to Tell If Your Business Is Actually Profitable (Not Just Busy) | Lexalytic',
  description: 'Busy does not mean profitable. Many UK business owners discover too late that their busiest months were actually their least profitable. Here is how to see the real picture.',
  keywords: 'how to tell if business is profitable UK, is my business profitable, business profitability tracking UK, how to know if business making money UK, profitable business tracking small business',
  openGraph: {
    title: 'How to Tell If Your Business Is Actually Profitable (Not Just Busy)',
    description: 'Busy does not mean profitable. Here is how to see the real picture of your business performance.',
    url: 'https://www.lexalytic.com/blog/how-to-tell-if-your-business-is-profitable',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How to Tell If Your Business Is Actually Profitable (Not Just Busy)","description":"Busy does not mean profitable. Many UK business owners discover too late that their busiest months were actually their least profitable.","datePublished":"2026-08-27","dateModified":"2026-08-27","url":"https://www.lexalytic.com/blog/how-to-tell-if-your-business-is-profitable","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Finance</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>How to Tell If Your Business Is Actually Profitable (Not Just Busy)</h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Busy does not mean profitable. The two feel the same from the inside — full diary, constant work, money coming in — but they can tell very different stories when you look at the actual numbers. Here is how to tell which one you are in.
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

      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>The short answer</p>
            <p style={{ color: 'var(--ink-2)', lineHeight: '1.75', margin: 0 }}>
              A business is profitable when the revenue from its work consistently exceeds the true cost of delivering that work — including staff time, overheads, and owner salary. Most UK business owners know their turnover. Far fewer know their gross margin by client, job, or service line. That is the gap where profit disappears.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            I have worked with a lot of business owners who were shocked to find out what was actually happening in their numbers. A recruitment agency with a full team, great revenue, and almost no margin because consultant salaries were too high relative to placement fees. A construction contractor with a full order book where three of the five active jobs were losing money. A professional services firm where two clients were subsidising everyone else without anyone realising.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            Being busy masks these problems. The money coming in feels like success. But if the costs of generating that revenue are high enough — or hidden enough — the profit simply is not there. The diagnostic question is not "are we busy?" It is "what is our margin on the work we are doing, and where is it going?"
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=780&q=80" alt="UK business owner checking if business is profitable not just busy" style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The difference between revenue, profit, and cash</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Before diagnosing whether your business is profitable, it helps to be clear about what these three numbers actually mean — because they are not the same thing, and confusing them is extremely common.
          </p>

          {[
            { term: 'Revenue (turnover)', desc: 'Everything your business invoices or sells. This is the number most business owners are most familiar with and most proud of. It tells you how much work you are doing. It does not tell you how much money you are making.' },
            { term: 'Gross profit', desc: 'Revenue minus the direct costs of delivering the work — materials, subcontractors, cost of goods sold, direct labour. This is the first real measure of whether the work itself is profitable. A business can have high revenue and negative gross profit — it costs them more to do the work than they charge for it.' },
            { term: 'Net profit', desc: 'Gross profit minus overheads — rent, utilities, administration, software, indirect staff costs, finance charges. This is what is left after everything is paid. It is what the business actually made.' },
            { term: 'Cash', desc: 'What is in the bank account right now. A business can be highly profitable and have no cash — because profit is recorded when you invoice, but cash only arrives when customers pay. A business with a lot of slow-paying clients can be profitable on paper and unable to make payroll in practice.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '20px 24px', background: 'var(--bg-2)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--amber)', marginBottom: '8px' }}>{item.term}</div>
              <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7' }}>{item.desc}</div>
            </div>
          ))}

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80" alt="Business profitability tracking dashboard UK showing revenue margin and cash" style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }} />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The five questions that tell you whether your business is actually profitable</h2>

          {[
            { num: '01', q: 'Do you know your gross margin percentage?', body: 'Gross margin — gross profit as a percentage of revenue — is the single most important number for most service businesses. If you charge £100 for a job and it costs you £70 to deliver it (including all direct costs), your gross margin is 30%. Whether 30% is good or bad depends on your sector and overhead structure. But if you cannot answer this question for your business overall, and ideally by client or service line, you are flying blind.' },
            { num: '02', q: 'Do you know which clients or jobs are most profitable?', body: 'Overall profitability hides a lot. In almost every business I have worked with, the client or job breakdown reveals a significant spread — some clients are very profitable, some are marginal, and some are actually loss-making once all costs are allocated properly. The business owner almost never knows which is which without running the analysis.' },
            { num: '03', q: 'Is your owner salary included in your costs?', body: 'Many small business owners do not pay themselves a proper market-rate salary. They draw dividends or take money informally. This means their profit figures are inflated — the business looks more profitable than it actually is because the owner is working effectively for free or below market rate. A true profitability assessment includes what it would cost to replace the owner\'s labour.' },
            { num: '04', q: 'Are your overheads allocated to the work that generates them?', body: 'Overheads — rent, insurance, software, admin staff — exist to support the revenue-generating work. If you have one high-revenue client who also requires enormous amounts of management time and admin, your net margin on that client is much lower than the gross margin suggests. Allocating overheads properly to clients or service lines reveals this.' },
            { num: '05', q: 'Are you looking at trailing data or real-time data?', body: 'If your profitability picture comes from your accountant\'s year-end accounts, it is describing a business that existed twelve months ago. By the time the accounts land, the market has moved, costs have changed, and several decisions have been made without the right information. Monthly management accounts — or better, a live dashboard — give you the picture you can actually act on.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '36px', alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'rgba(193,125,46,0.3)', flexShrink: 0, lineHeight: '1', marginTop: '4px' }}>{item.num}</div>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '10px', color: 'var(--ink)', fontWeight: '600' }}>{item.q}</h3>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
              </div>
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>How to get the visibility you need</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The data you need to answer all five questions already exists in your business. Revenue is in your accounting software. Job costs are in your invoices, timesheets, and purchase orders. Overheads are in your bank statements. The problem is that nobody has connected them in a way that makes the picture visible without significant manual work.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            A properly connected profitability dashboard — pulling from your accounting software, your job management system, or your spreadsheets — gives you gross margin by client, job, or service line, updated automatically. No month-end manual assembly. No waiting for the accountant. The picture is always current.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            This is one of the most common things we build for UK service businesses. The data is almost always already there — it just needs to be connected and surfaced in a form that answers the right questions. Read our guide to <Link href="/blog/kpi-dashboard-small-business-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>building a KPI dashboard for your small business</Link> for a practical overview of how to approach this.
          </p>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Related:</strong> If your profitability analysis reveals a cash flow gap — you are profitable but cash is tight — read our guide to <Link href="/blog/late-payments-uk-business-data-fix" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>late payments and cash flow visibility</Link> for UK businesses.
            </p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            { q: 'How do I calculate gross margin for my service business?', a: 'Gross margin percentage = (Revenue minus direct costs) divided by Revenue, multiplied by 100. Direct costs are the costs directly attributable to delivering the work — direct labour, materials, subcontractors, cost of goods. For a service business with no physical product, the main direct cost is usually the staff time spent delivering the service.' },
            { q: 'What is a good gross margin for a UK service business?', a: 'It varies significantly by sector. Professional services (consulting, law, accountancy) typically target 40-60% gross margin. Recruitment agencies are often 15-30%. Construction typically 10-20%. The key is not hitting a specific percentage but understanding your own margin trend over time and by client or job type.' },
            { q: 'Why does my business show a profit but I have no cash?', a: 'This is the most common financial confusion for UK small business owners. Profit is recorded when you invoice your clients — cash only arrives when they pay. If your clients pay slowly, you can be highly profitable on paper while being genuinely short of cash. This is a cash flow timing problem, not a profitability problem, and the solutions are different.' },
            { q: 'How often should I review my business profitability?', a: 'Monthly is the practical standard for a growing business. Annual accounts are too infrequent to catch problems while there is still time to act. Monthly management accounts — or a live dashboard that shows the current position — give you the visibility to make decisions based on what is happening now rather than what happened last year.' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: '16px', padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--ink)', marginBottom: '12px', fontWeight: '600' }}>{item.q}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.a}</p>
            </div>
          ))}

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em', marginTop: '16px' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            {[
              { title: 'How to Build a KPI Dashboard for Your Small Business', href: '/blog/kpi-dashboard-small-business-uk', tag: 'Power BI' },
              { title: 'Why UK Businesses Lose £17,000 a Year to Late Payments', href: '/blog/late-payments-uk-business-data-fix', tag: 'Cash Flow' },
              { title: 'How to Track Business Performance Without a Data Team', href: '/blog/track-business-performance-without-data-team', tag: 'Business Intelligence' },
              { title: '5 Signs Manual Reporting Is Costing Your Business Money', href: '/blog/5-signs-manual-reporting-is-costing-your-business', tag: 'Data Automation' },
            ].map((post, i) => (
              <Link key={i} href={post.href} style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
                <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.tag}</span>
                <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>{post.title}</p>
              </Link>
            ))}
          </div>

          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to see the real picture of your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. We will look at your current data setup and show you what a live profitability dashboard would look like for your business.</p>
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
