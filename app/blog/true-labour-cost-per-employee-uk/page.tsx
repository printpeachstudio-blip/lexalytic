import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/true-labour-cost-per-employee-uk' },
  title: 'How to Know Your True Labour Cost Per Employee (UK Guide) | Lexalytic',
  description: 'The salary on the contract is not what an employee costs. For most UK businesses the true cost of employment is 25-35% higher than gross pay once employer ',
  openGraph: {
    title: 'How to Know Your True Labour Cost Per Employee (UK Guide)',
    description: 'The salary on the contract is not what an employee costs. For most UK businesses the true cost of employment is 25-35% higher than gross pay once employer ',
    url: 'https://www.lexalytic.com/blog/true-labour-cost-per-employee-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How to Know Your True Labour Cost Per Employee (UK Guide)","description":"The salary on the contract is not what an employee costs. For most UK businesses the true cost of employment is 25-35% h","datePublished":"2026-11-01","dateModified":"2026-11-01","url":"https://www.lexalytic.com/blog/true-labour-cost-per-employee-uk","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>How to Know Your True Labour Cost Per Employee (UK Guide)</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The salary on the contract is not what an employee costs. For most UK businesses the true cost of employment is 25-35% higher than gross pay once employer obligations are added in. Understanding this number changes how you think about hiring, pricing, and profitability.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The components of true employment cost</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Gross salary is the starting point. On top of it sits employer National Insurance — currently 13.8% on earnings above the secondary threshold of £9,100 per year. Auto-enrolment pension contributions add a minimum of 3% of qualifying earnings. Holiday pay represents approximately 12.07% of basic pay for employees on standard 28-day entitlement. Add statutory sick pay exposure, employer liability insurance, any death in service or private medical benefit, and the gap between what the contract says and what the employee actually costs widens further. For a £35,000 salary, the true employer cost typically sits between £43,000 and £47,000 before any overhead allocation.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Why this matters for pricing and profitability</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Service businesses that price based on salary rather than true employment cost systematically underprice their work. If a consultant costs £45,000 to employ but you price their time based on a £35,000 salary assumption, every project they work on is priced at a margin that is lower than you think. Multiply that across a team of ten and the pricing error compounds significantly. The businesses that understand their true labour cost price more accurately, win the right work, and maintain better margins.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Building a true cost model in Excel</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The simplest approach is a one-page Excel model with a row per employee. Columns for gross salary, employer NI calculation, pension contribution, holiday accrual, and any additional benefits. The total gives you true cost per employee. Divide by annual working hours — typically 1,680 after holiday and bank holidays — and you have a true hourly cost that can inform project pricing, capacity planning, and profitability analysis. Updated once a year when salaries change, it takes less than an hour to maintain.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Connecting labour cost to revenue and margin</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The most useful version of this analysis connects true labour cost to revenue attribution — showing not just what each person costs but what they generate. For service businesses this requires some form of time recording or revenue allocation by team member. The gap between cost and contribution is the metric that drives decisions about team structure, performance conversations, and hiring plans. A Power BI dashboard that shows this in real time, updated from payroll and billing data automatically, gives management the visibility that most businesses only get at year-end — when it is too late to act on it.</p>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you are trying to build and we will tell you the best approach — and what it would cost.</p>
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
