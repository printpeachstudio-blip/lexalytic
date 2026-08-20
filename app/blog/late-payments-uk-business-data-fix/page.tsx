import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/late-payments-uk-business-data-fix' },
  title: 'Why UK Businesses Lose £17,000 a Year to Late Payments — And How Better Data Fixes It | Lexalytic',
  description: 'Late payments cost UK businesses £26bn annually. Here is how automated cash flow dashboards and invoice tracking give you the visibility to get paid faster — without chasing manually.',
  keywords: 'late payments UK business, track invoices automatically UK, cash flow visibility UK, aged debtor report Excel, automate invoice tracking UK, payment dashboard UK SME, reduce late payments UK',
  openGraph: {
    title: 'Why UK Businesses Lose £17,000 a Year to Late Payments — And How Better Data Fixes It',
    description: 'Late payments cost UK businesses £26bn annually. Here is how better data and automation give you the visibility to get paid faster.',
    url: 'https://www.lexalytic.com/blog/late-payments-uk-business-data-fix',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Why UK Businesses Lose £17,000 a Year to Late Payments — And How Better Data Fixes It","description":"Late payments cost UK businesses £26bn annually. Here is how automated cash flow dashboards and invoice tracking give you the visibility to get paid faster.","datePublished":"2026-08-14","dateModified":"2026-08-14","url":"https://www.lexalytic.com/blog/late-payments-uk-business-data-fix","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}

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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Cash Flow</span>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Automation</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 11 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Why UK Businesses Lose £17,000 a Year to Late Payments — And How Better Data Fixes It
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.75', marginBottom: '32px', fontWeight: '300' }}>
            Late payments are not just an inconvenience. They are the single biggest threat to cash flow for UK SMEs — and most businesses are making the problem worse by tracking invoices manually. Here is what better data actually looks like, and how to get there.
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
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>The situation in 2026</p>
            <p style={{ color: 'var(--ink-2)', lineHeight: '1.75', margin: 0 }}>
              UK businesses are currently owed around £26bn in unpaid invoices. The average affected SME is sitting on £17,000 in overdue payments at any given time. New government legislation introduced in March 2026 caps large-firm payment terms at 60 days — but enforcement depends on businesses actually knowing what they are owed and when. Most do not have that visibility.
            </p>
          </div>

          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '32px' }}>
            The late payment problem in the UK is not new. What is new in 2026 is the scale. Government estimates suggest late payments are pushing 38 UK businesses into closure every single day — around 14,000 firms a year. Affected businesses spend an average of 86 hours annually just chasing overdue invoices. That is more than two full working weeks, every year, on work that should not exist.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The businesses that manage late payments best are not necessarily the ones who chase hardest. They are the ones who can see, at any moment, exactly what they are owed, from whom, for how long, and what the impact is on their cash position. That visibility is a data problem — and it is one that most SMEs are still trying to solve with a spreadsheet they update manually once a week, if they remember.
          </p>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=780&q=80"
              alt="UK business owner reviewing late payment data and invoice tracking dashboard"
              style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div style={{ padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginBottom: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '20px' }}>The late payment problem by numbers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '16px' }}>
              {[
                { stat: '£26bn', label: 'Owed in unpaid invoices across UK businesses', source: 'UK Government, March 2026' },
                { stat: '£17,000', label: 'Average amount overdue per affected SME', source: 'Government late payment response' },
                { stat: '86 hours', label: 'Spent annually chasing overdue payments', source: 'CICM research' },
                { stat: '38/day', label: 'UK businesses pushed into closure by late payments', source: 'GOV.UK 2026' },
                { stat: '61%', label: 'Of SMEs have invoices overdue by 30+ days', source: 'QuickBooks survey 2026' },
                { stat: '82%', label: 'Of UK SMEs have faced cash flow difficulties', source: 'CICM via Midgley Snelling' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', color: 'var(--amber)', marginBottom: '6px' }}>{item.stat}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{item.source}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why most businesses do not have the visibility they need</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            Ask most business owners what they are currently owed and when it is due, and you will get one of three answers. They pull up a spreadsheet that was last updated three days ago. They log into their accounting software and run an aged debtor report — which takes a few minutes and gives them a static snapshot that is already out of date. Or they are not entirely sure and have to ask someone.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            None of these is the same as having real-time cash flow visibility. And without real-time visibility, the chasing process is reactive rather than systematic. Invoices get missed. Customers who are consistently slow to pay are not identified as a pattern until the damage is done. The business discovers it has a cash flow problem at the same time as it runs out of cash — rather than three weeks earlier when there was still time to act.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The root cause is almost always the same. The data exists — in Xero, Sage, QuickBooks, or wherever the invoicing is managed — but it is not accessible in a form that supports active cash flow management. It requires someone to export it, format it, and interpret it. And that process happens weekly at best, when it should be happening continuously.
          </p>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What good cash flow visibility actually looks like</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            When a business has its invoice and payment data properly connected to a live reporting tool, the picture changes completely. Here is what that looks like in practice:
          </p>

          {[
            {
              title: 'Live aged debtor dashboard',
              body: 'A dashboard connected directly to your accounting software — Xero, Sage, QuickBooks — that shows every outstanding invoice, who owes it, how many days overdue it is, and the total exposure by client and by ageing band. Updated automatically every time you open it. No export, no reformatting, no waiting for someone to run the report.',
            },
            {
              title: 'Automatic overdue alerts',
              body: 'Rather than someone remembering to check who has not paid this week, the system flags overdue invoices automatically — by email, by a highlighted row in a dashboard, or by a notification in whatever communication tool the team uses. The chasing becomes proactive rather than reactive, and nothing slips through because someone forgot to look.',
            },
            {
              title: 'Cash flow forecast connected to real invoice data',
              body: 'A rolling cash flow forecast that pulls from actual invoice data rather than assumptions. When a customer pays, the forecast updates. When a new invoice goes out, the expected receipt appears in the right week. The business owner can see, right now, what their cash position will look like in four weeks — and act on that information while there is still time.',
            },
            {
              title: 'Payment pattern analysis by client',
              body: 'Over time, the data reveals which clients consistently pay late, by how many days, and what the financial impact is. A client who is always 45 days late might look like a good customer on turnover figures — but when you can see the cash flow impact of their payment behaviour, the picture changes. That analysis is almost impossible to do manually but straightforward with properly structured data.',
            },
          ].map((item, i) => (
            <div key={i} style={{ padding: '24px 28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '12px' }}>{item.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.75', margin: 0 }}>{item.body}</p>
            </div>
          ))}

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '48px 0', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=780&q=80"
              alt="Live cash flow dashboard showing aged debtors and invoice tracking UK business"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>How to build it — the practical options</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '28px' }}>
            Most accounting software has some form of aged debtor report built in. The problem is it is static, requires someone to run it, and cannot be combined easily with data from other sources. Here are the practical options for getting to proper live visibility:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px', marginBottom: '48px' }}>
            {[
              {
                option: 'Power BI connected to your accounting software',
                desc: 'A Power BI dashboard connected directly to Xero, Sage, or QuickBooks pulls your invoice and payment data automatically. You get a live aged debtor view, overdue alerts, and cash flow visibility — updated in real time without anyone exporting or formatting anything.',
                best: 'Best for: businesses that want a live dashboard accessible to multiple people',
                link: '/services/power-bi',
                linkText: 'Power BI dashboards',
              },
              {
                option: 'Excel automation with Power Query',
                desc: 'For businesses that prefer to stay in Excel, Power Query can connect directly to your accounting software and pull the aged debtor data automatically on refresh. The report updates with a single click — no manual export, no reformatting.',
                best: 'Best for: businesses already working in Excel that want automated data rather than a new platform',
                link: '/blog/connect-xero-to-excel-automate-reports',
                linkText: 'Connecting Xero to Excel',
              },
              {
                option: 'Automated email alerts via Power Automate',
                desc: 'Power Automate can trigger automatic email reminders to customers when invoices become overdue — based on rules you set once. Day 1 overdue: a polite reminder. Day 14: a firmer follow-up. Day 30: escalation. All sent automatically without anyone having to remember.',
                best: 'Best for: businesses that want to automate the chasing process itself, not just the reporting',
                link: '/services/power-automate',
                linkText: 'Power Automate workflows',
              },
            ].map((item, i) => (
              <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--amber)', marginBottom: '10px' }}>{item.option}</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', marginBottom: '12px' }}>{item.desc}</p>
                <p style={{ fontSize: '12px', color: 'var(--ink-4)', fontStyle: 'italic', marginBottom: '12px' }}>{item.best}</p>
                <Link href={item.link} style={{ fontSize: '13px', color: 'var(--amber)', textDecoration: 'none', fontWeight: '500' }}>
                  {item.linkText} →
                </Link>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The new legislation and what it means for your data</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            The government's March 2026 crackdown on late payments — capping large-firm payment terms at 60 days and introducing mandatory interest on overdue invoices — is the most significant legislative change in this area in 25 years. But it only helps businesses that are actually tracking their payment terms and overdue dates accurately.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
            If you want to apply statutory interest to a late invoice, you need to know exactly when the invoice was due and how many days overdue it is. If you want to report a persistent late payer under the new rules, you need documentary evidence of the payment history. Both of these require structured, accurate invoice data — not a memory, not a rough spreadsheet, not a report you ran last week.
          </p>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>
            The businesses that will benefit most from the new legislation are the ones with clean, automated invoice tracking. The ones who will continue to lose money to late payments are the ones who are still managing it manually.
          </p>

          <div style={{ padding: '24px 28px', background: 'rgba(193,125,46,0.06)', border: '1px solid rgba(193,125,46,0.2)', borderRadius: 'var(--radius-lg)', marginBottom: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7', margin: 0 }}>
              <strong style={{ color: 'var(--ink)' }}>Also relevant:</strong> If your invoice data is inconsistent — customers named differently across invoices, payment terms recorded in different formats, figures that do not reconcile — the reporting will not be reliable however good the dashboard is. Read our guide to{' '}
              <Link href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'underline' }}>data cleansing for UK businesses</Link>{' '}
              before building a cash flow reporting system on top of messy data.
            </p>
          </div>

          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '48px', border: '1px solid var(--border)' }}>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=780&q=80"
              alt="Automated invoice tracking and cash flow reporting UK SME 2026"
              style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '28px', letterSpacing: '-0.02em' }}>Frequently asked questions</h2>
          {[
            {
              q: 'Can I track outstanding invoices automatically without changing my accounting software?',
              a: 'Yes. Whether you are on Xero, Sage, or QuickBooks, the invoice data can be pulled automatically into a Power BI dashboard or an Excel report using Power Query. You keep the accounting software you and your accountant are familiar with — the dashboard sits on top of it, pulling the data automatically without any manual exports.',
            },
            {
              q: 'How much does it cost to build an automated invoice tracking dashboard?',
              a: 'Most invoice tracking and cash flow visibility projects are delivered at a fixed price, scoped before any work begins. A single aged debtor dashboard connected to one accounting system is typically a 3-5 day project. A more comprehensive cash flow reporting system combining invoice data, payment forecasting, and automated alerts takes longer. We scope every project and give a clear price before any work starts.',
            },
            {
              q: 'Can Power Automate send automatic payment reminders to customers?',
              a: 'Yes. Power Automate can be configured to send automatic email reminders to customers based on invoice due dates — a polite reminder on day 1 overdue, a firmer follow-up at day 14, an escalation at day 30. The rules are set once and run automatically without anyone having to remember to chase.',
            },
            {
              q: 'What does the new late payment legislation mean for my business?',
              a: 'The government changes introduced in March 2026 cap large-firm payment terms at 60 days and add mandatory interest on overdue invoices. To benefit from the interest provisions, you need accurate records of when invoices were due and how many days overdue they are. Automated invoice tracking makes this straightforward — manual tracking makes it difficult to enforce in practice.',
            },
            {
              q: 'How long does it take to set up automated cash flow reporting?',
              a: 'A basic aged debtor dashboard connected to your accounting software is typically delivered in 3-5 working days. A more comprehensive setup including cash flow forecasting, payment pattern analysis, and automated overdue alerts takes 5-10 days. You get a fixed price and clear timeline before any work begins.',
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
              { label: 'GOV.UK — Late payment legislation: new rules from March 2026', url: 'https://www.gov.uk/government/publications/tackling-late-payment-in-the-uk-economy' },
              { label: 'CICM — Late payment research and statistics UK', url: 'https://www.cicm.com/late-payment/' },
              { label: 'Xero — Managing cash flow with Xero', url: 'https://www.xero.com/uk/guides/cash-flow-management/' },
              { label: 'Microsoft — Power BI financial dashboard examples', url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/sample-financial-analyst' },
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
              { title: 'How to Connect Xero to Excel and Automate Your Reports', href: '/blog/connect-xero-to-excel-automate-reports', tag: 'Excel Automation' },
              { title: 'My Finance Team Is Spending Hours on Manual Reporting — How Do I Fix It?', href: '/blog/finance-team-manual-reporting-fix', tag: 'Finance' },
              { title: 'What Is Data Cleansing — and Why Does Bad Data Cost UK Businesses So Much?', href: '/blog/what-is-data-cleansing-uk', tag: 'Data Quality' },
              { title: 'How to Reduce Manual Data Entry in Your Business', href: '/blog/how-to-reduce-manual-data-entry-uk', tag: 'Data Automation' },
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
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Do you know exactly what your business is owed right now?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
              Book a free 30-minute call. We will look at your current invoice tracking setup and show you what live cash flow visibility would look like for your business — and what it would cost to build it.
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
