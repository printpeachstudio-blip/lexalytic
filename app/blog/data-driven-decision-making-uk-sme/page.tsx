import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/data-driven-decision-making-uk-sme' },
  title: 'Data-Driven Decision Making for UK Small Businesses — Where to Start | Lexalytic',
  description: 'Data-driven decision making is not just for large businesses. Here is a practical starting point for UK SMEs that want better information without a data team.',
  openGraph: {
    title: 'Data-Driven Decision Making for UK Small Businesses — Where to Start',
    description: 'Data-driven decision making is not just for large businesses. Here is a practical starting point for UK SMEs that want better information without a data team.',
    url: 'https://www.lexalytic.com/blog/data-driven-decision-making-uk-sme',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Data-Driven Decision Making for UK Small Businesses — Where to Start","description":"Data-driven decision making is not just for large businesses. Here is a practical starting point for UK SMEs that want better information without a data team.","datePublished":"2027-01-30","dateModified":"2027-01-30","url":"https://www.lexalytic.com/blog/data-driven-decision-making-uk-sme","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Intelligence</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>January 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Data-Driven Decision Making for UK Small Businesses — Where to Start</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Data-driven decision making sounds like something that requires a data team, a business intelligence platform, and a significant budget. For most UK small businesses, it actually requires three things: knowing which questions matter most, identifying where the answers live, and connecting them in a way that does not require someone to compile them manually every week.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The three questions that drive most business decisions</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most operational decisions in a small business come back to three questions: how is revenue tracking against expectation, what is the current cash position, and which clients, products, or services are generating the best margin. Every business has variations on these — recruitment agencies care about placements per consultant, construction businesses care about job cost versus estimate, professional services firms care about utilisation rates. But the underlying structure is the same: how are we doing, what do we have, and what is most profitable.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Where small businesses lose decisions to guesswork</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The most common place guesswork replaces data in small businesses is in the profitability question. Revenue is usually visible. Total costs are usually available at month end. But cost by client, by project, or by service line — the information that tells you which parts of your business are actually worth having — is almost never automatically available. This means pricing decisions, resourcing decisions, and which clients to pursue are made on instinct rather than evidence.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The minimum viable data setup</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A small business can get significant decision-making improvement from three things. First, a properly configured accounting system with a chart of accounts that matches your reporting needs — so you can see margin by business area without manual reclassification. Second, a time recording habit for service businesses — even basic hour logging by client creates the cost allocation data that margin analysis requires. Third, a simple dashboard that pulls the three key questions from your accounting system and displays them automatically. This does not require a data team. It requires a day of setup.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Starting with one question</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The fastest path from guesswork to data is picking one decision that you currently make on instinct and building the minimum system to inform it with data. Not a comprehensive business intelligence strategy — one question. Which clients generate the best margin? Is revenue tracking above or below target for the month? What does cash look like in six weeks? Build the smallest possible tool that answers that question automatically and accurately. Use it for six months. Then pick the next question.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>When to invest in proper business intelligence</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Power BI, Tableau, and similar platforms make most sense when you have multiple data sources that need connecting, when the same information needs to be shared with multiple people regularly, and when the data changes frequently enough that manual updates become a meaningful burden. For a business with clean accounting data and straightforward reporting needs, a well-structured Excel model with Power Query refreshing automatically often delivers 80% of the value at 20% of the cost. Match the tool to the problem, not to what sounds most impressive.</p>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2027 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
