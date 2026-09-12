import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/service-charge-18-month-rule' },
  title: 'The Service Charge Rule Almost No Leaseholder Knows About | Lexalytic',
  description: 'Costs incurred more than eighteen months before the demand arrives are generally not recoverable, unless you were notified in writing within that window. A bill for work done two years ago is frequently unenforceable in full.',
  openGraph: {
    title: 'The Service Charge Rule Almost No Leaseholder Knows About',
    description: 'Costs incurred more than eighteen months before the demand arrives are generally not recoverable, unless you were notified in writing within that window. A bill for work done two years ago is frequently unenforceable in full.',
    url: 'https://www.lexalytic.com/blog/service-charge-18-month-rule',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Service Charge Rule Almost No Leaseholder Knows About",
  "description": "Costs incurred more than eighteen months before the demand arrives are generally not recoverable, unless you were notified in writing within that window. A bill for work done two years ago is frequently unenforceable in full.",
  "datePublished": "2026-10-20",
  "dateModified": "2026-10-20",
  "author": {
    "@type": "Person",
    "name": "Mihir Hindocha",
    "url": "https://www.lexalytic.com/about",
    "jobTitle": "Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Lexalytic",
      "url": "https://www.lexalytic.com"
    }
  },
  "publisher": {
    "@id": "https://www.lexalytic.com/#organisation"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.lexalytic.com/blog/service-charge-18-month-rule"
  },
  "inLanguage": "en-GB",
  "articleSection": "Leasehold"
}

export default function BlogPost() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Free Tools</Link>
            <Link href="/blog" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Blog</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Leasehold</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>October 2026 · 7 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Service Charge Rule Almost No Leaseholder Knows About</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio Founder · Lexalytic</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A demand lands for major works carried out two years ago. Nobody mentioned it at the time, nothing arrived in between, and now there is a five figure sum with a payment date on it. Most people assume they have no choice. Section 20B of the Landlord and Tenant Act 1985 says otherwise, and it is the provision leaseholders are least likely to have heard of.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What the rule actually says</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A service charge is not recoverable if the costs were incurred more than eighteen months before the demand, unless within that eighteen months the leaseholder was notified in writing that the costs had been incurred and that they would subsequently be required to contribute. Two conditions, and both matter. The clock runs from when the cost was incurred rather than from when the work finished or when the invoice was paid. And the notification has to be in writing, has to say the costs have been incurred, and has to say a demand is coming. A newsletter mentioning that works are planned does not do it.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why this happens so often</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Major works are frequently paid for by the freeholder or managing agent and recharged later, sometimes considerably later. The accounts are prepared, then audited, then a demand is raised, and a year can disappear into that process without anyone intending it. Add a change of managing agent partway through, which is common, and the paperwork trail breaks entirely. The leaseholder who receives the demand has no idea when the money actually left the freeholder, and nobody volunteers it.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What you can ask for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Under section 21 you can require a written summary of the relevant costs for the last accounting period, and failing to provide it without reasonable excuse is a summary offence. Under section 22 you can then require facilities to inspect the actual receipts and invoices, and take copies. Those invoices carry dates. That is how you establish when the cost was incurred rather than when somebody got round to billing you for it. Ask for both in the same letter and say plainly that you are exercising statutory rights rather than making a complaint.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What it does not do</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>It does not cancel the works or mean the freeholder acted improperly, and it does not apply where they did notify you in time. It also does not help with ongoing charges billed in the normal annual cycle, because those are demanded within months rather than years. It is specifically a defence against a stale demand for historic expenditure, and it exists because Parliament decided leaseholders should not face open ended liability for costs they were never told about.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The other thing to ask for at the same time</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>If this ends up at the First-tier Tribunal, apply for an order under section 20C as part of the same application. Without one, the freeholder can add their legal costs of defending your challenge to next year’s service charge, which means you can win the argument and still pay for it. It is one line in the application form and omitting it is the commonest mistake leaseholders make. Ask for it whether or not you expect to need it.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Before you withhold anything</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Not paying a service charge you dispute carries real risk, including forfeiture proceedings in serious cases. The safer route is to pay under protest, or to apply to the tribunal for a determination, rather than simply refusing. Paying does not mean accepting: having paid a charge is not the same as having agreed it was payable, so paying while you investigate does not lose you the argument. LEASE, the government funded Leasehold Advisory Service, advise leaseholders free of charge and are the right first call before deciding anything.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Working out where you stand</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free service charge checker takes the date the work was done and the date the demand arrived and tells you whether the eighteen month window has passed. It also walks through the Section 20 consultation stages, which is a separate and often stronger argument, and sets out what you are entitled to demand. It runs in your browser and nothing is uploaded.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Is the bill one you actually owe?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free checker for the eighteen month rule and the Section 20 consultation stages. Nothing is uploaded.</p>
            <Link href="/tools/service-charge-check" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check your service charge</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '40px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>2026 Lexalytic. All rights reserved.</p>
          <Link href="/tools" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Free tools</Link>
        </div>
      </footer>
    </div>
  )
}
