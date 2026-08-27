import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog' },
  title: 'Blog | Data Automation & Power BI Insights | Lexalytic',
  description: 'Practical guides on Power BI, Excel automation, Python, and business reporting — written from 15 years of real project experience.',
}

const posts = [
  {
    slug: 'what-is-power-query-uk-business',
    title: 'What Is Power Query — and How Can It Save Your Business Time?',
    excerpt: 'Power Query is built into Excel and Power BI and most UK businesses have never used it. Here is what it does and how it eliminates hours of manual data work every month.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'track-business-performance-without-data-team',
    title: 'How to Track Business Performance Without a Data Team',
    excerpt: 'You do not need a data analyst or expensive software to get a clear view of how your business is performing. Here is how small UK businesses are doing it.',
    date: 'September 2026',
    readTime: '10 min read',
    tag: 'Business Intelligence',
  },
  {
    slug: 'how-to-tell-if-your-business-is-profitable',
    title: 'How to Tell If Your Business Is Actually Profitable (Not Just Busy)',
    excerpt: 'Busy does not mean profitable. Many UK business owners discover too late that their busiest months were actually their least profitable. Here is how to see the real picture.',
    date: 'August 2026',
    readTime: '10 min read',
    tag: 'Business Finance',
  },
  {
    slug: 'automate-month-end-reporting-uk',
    title: 'How to Automate Your Month-End Reporting (UK Guide 2026)',
    excerpt: 'Month-end reporting does not have to take days. Here is how UK finance teams are cutting their reporting time by 80% using automation without changing their accounting software.',
    date: 'August 2026',
    readTime: '10 min read',
    tag: 'Finance',
  },
  {
    slug: 'kpi-dashboard-small-business-uk',
    title: 'How to Build a KPI Dashboard for Your Small Business (UK Guide 2026)',
    excerpt: 'Most small business owners are making decisions based on instinct or a report someone compiled last week. A KPI dashboard gives you a live view of the numbers that actually matter.',
    date: 'August 2026',
    readTime: '11 min read',
    tag: 'Power BI',
  },
  {
    slug: 'late-payments-uk-business-data-fix',
    title: 'Why UK Businesses Lose £17,000 a Year to Late Payments — And How Better Data Fixes It',
    excerpt: 'Late payments are pushing 38 UK businesses into closure every day. Most are making the problem worse by tracking invoices manually. Here is what better data actually looks like.',
    date: 'August 2026',
    readTime: '11 min read',
    tag: 'Cash Flow',
  },
  {
    slug: 'finance-team-manual-reporting-fix',
    title: 'My Finance Team Is Spending Hours on Manual Reporting — How Do I Fix It?',
    excerpt: 'If your finance team is rebuilding the same reports every month and spending days on work that should take minutes, here is what is causing it and how to fix it properly.',
    date: 'July 2026',
    readTime: '10 min read',
    tag: 'Finance',
  },
  {
    slug: 'sage-vs-xero-automated-reporting',
    title: 'Sage vs Xero: Which Is Better for Automated Reporting? (UK 2026)',
    excerpt: 'Both Sage and Xero are excellent accounting tools. But when it comes to connecting your financial data to Excel and Power BI, they are not equal. An honest comparison.',
    date: 'June 2026',
    readTime: '10 min read',
    tag: 'Reporting',
  },
  {
    slug: 'connect-xero-to-excel-automate-reports',
    title: 'How to Connect Xero to Excel and Automate Your Reports (UK Guide 2026)',
    excerpt: 'Most Xero users spend more time than they should manually exporting data and reformatting it in Excel. Here is how to connect them properly so the data flows automatically.',
    date: 'June 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'when-your-business-has-outgrown-excel',
    title: 'When Your Business Has Outgrown Excel — And What To Do Next',
    excerpt: 'Excel is not the problem. Excel doing a job it was never designed to do — that is the problem. Here is how to tell the difference, and what actually needs to change.',
    date: 'May 2026',
    readTime: '10 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'how-to-reduce-manual-data-entry-uk',
    title: 'How to Reduce Manual Data Entry in Your Business (UK Guide 2026)',
    excerpt: 'Manual data entry is one of the most expensive habits a business can have. Here is a practical guide to reducing it — without expensive software or a big IT project.',
    date: 'May 2026',
    readTime: '11 min read',
    tag: 'Data Automation',
  },
  {
    slug: 'what-is-data-cleansing-uk',
    title: 'What Is Data Cleansing — and Why Does Bad Data Cost UK Businesses So Much?',
    excerpt: 'Most businesses know their data is messy. Very few realise how much that messiness is actually costing them — in wasted time, wrong decisions, and automation projects that fail before they start.',
    date: 'May 2026',
    readTime: '10 min read',
    tag: 'Data Quality',
  },
  {
    slug: 'excel-automation-cost-uk',
    title: 'How Much Does Excel Automation Cost in the UK? (2026 Guide)',
    excerpt: 'A straight answer — with real UK project costs, what drives the price up or down, and how to work out whether automation will pay for itself in your business.',
    date: 'May 2026',
    readTime: '9 min read',
    tag: 'Excel Automation',
  },
  {
    slug: '5-signs-manual-reporting-is-costing-your-business',
    title: '5 Signs Manual Reporting Is Costing Your Business Money',
    excerpt: 'Most businesses know their reporting process is painful. What they do not realise is exactly how much it is costing them — in time, in errors, and in decisions made on data that is already out of date.',
    date: 'April 2026',
    readTime: '10 min read',
    tag: 'Data Automation',
  },
  {
    slug: 'power-bi-vs-excel',
    title: 'Power BI vs Excel: Which Should Your Business Use in 2026?',
    excerpt: 'The honest answer — when Excel is still the right tool, when Power BI is genuinely worth it, and what most UK businesses actually need.',
    date: 'April 2026',
    readTime: '9 min read',
    tag: 'Power BI',
  },
  {
    slug: 'how-to-automate-excel-reports',
    title: 'How to Automate Excel Reports (Without Knowing How to Code)',
    excerpt: 'If your team is still doing the export-to-report grind every week, this guide is for you. What actually works, what does not, and how to choose the right approach for your business.',
    date: 'April 2026',
    readTime: '9 min read',
    tag: 'Excel Automation',
  },
  {
    slug: 'power-bi-consultant-cost-uk',
    title: 'How Much Does a Power BI Consultant Cost in the UK?',
    excerpt: 'A straight answer — with real UK prices, what affects the cost, and how to make sure you are not overpaying for something simpler than you think.',
    date: 'April 2026',
    readTime: '8 min read',
    tag: 'Power BI',
  },
]

export default function BlogIndex() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← Home</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call →</Link>
          </div>
        </div>
      </nav>

      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-label">Blog</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Data automation insights</h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-3)', fontWeight: '300' }}>Practical guides on Power BI, Excel automation, Python, and business reporting — written from 15 years of real project experience.</p>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none', marginBottom: '20px' }}>
              <div style={{ padding: '32px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '3px 10px', borderRadius: '100px' }}>{post.tag}</span>
                  <span style={{ fontSize: '13px', color: 'var(--ink-4)' }}>{post.date} · {post.readTime}</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--ink)' }}>{post.title}</h2>
                <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
