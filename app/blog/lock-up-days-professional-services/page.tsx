import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/lock-up-days-professional-services' },
  title: 'The Cash Flow Number Most Firms Cannot Produce | Lexalytic',
  description: 'Lock-up is work in progress plus debtors divided by daily fee income. Debtor days get managed because they are visible. WIP does not, so half the problem never gets looked at.',
  openGraph: {
    title: 'The Cash Flow Number Most Firms Cannot Produce',
    description: 'Lock-up is work in progress plus debtors divided by daily fee income. Debtor days get managed because they are visible. WIP does not, so half the problem never gets looked at.',
    url: 'https://www.lexalytic.com/blog/lock-up-days-professional-services',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Cash Flow Number Most Firms Cannot Produce",
  "description": "Lock-up is work in progress plus debtors divided by daily fee income. Debtor days get managed because they are visible. WIP does not, so half the problem never gets looked at.",
  "datePublished": "2026-09-15",
  "dateModified": "2026-09-15",
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
    "@id": "https://www.lexalytic.com/blog/lock-up-days-professional-services"
  },
  "inLanguage": "en-GB",
  "articleSection": "Professional Services"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Professional Services</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 7 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Cash Flow Number Most Firms Cannot Produce</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Every firm knows its debtor days, because an aged debtors report arrives from the accounting system without anybody asking. Almost none knows its lock-up, because half of it is work that has been done and not yet invoiced, and nothing produces that figure.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What lock-up actually measures</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Work in progress plus debtors, divided by daily fee income. It is how many days of revenue are sitting somewhere other than your bank account. A firm running at sixty days of lock-up on two million of fees has around three hundred and twenty thousand pounds tied up at any moment, which is roughly what it would need to borrow to cover the same gap.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why the second half is invisible</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Debtors are a number in a ledger. Work in progress is unbilled hours sitting in a time recording system, and the two do not meet. A partner knows which of their jobs are ready to bill, approximately, and nobody has the total. So the firm measures what it can see, manages what it measures, and the other half drifts.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The consequence of measuring only half</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>When cash gets tight the instinct is credit control. Chase harder, ring earlier, send statements. That works if the problem is collection. If the problem is that work was delivered in January and invoiced in March, chasing clients does nothing at all, because there is nothing to chase. A firm can run an excellent credit control function and still have terrible lock-up, and the two facts look unrelated until somebody measures both.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The number that usually surprises people</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Days between the work finishing and the invoice going out. Most firms guess at a week or two. The actual figure, once someone measures it, is frequently over thirty. That is a month of revenue delayed by nothing more than nobody having raised the bill, and it is entirely within the firm’s control in a way that a client’s payment behaviour is not.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What a healthy figure looks like</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Forty five to sixty five days of total lock-up is the range generally considered reasonable for a UK professional services firm, though it varies considerably by discipline and billing model. What matters more than the absolute number is the split. If your work in progress days exceed your debtor days, the problem is billing and no amount of chasing will fix it. If debtors dominate, the work is going out on time and the cash is not coming back.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>And the awkward internal part</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Billing promptly is often unpopular. A partner who has had a difficult month with a client does not want to send an invoice that might restart the argument. Someone who has overrun on a fixed fee would rather delay the conversation. Those are understandable and they are also the thing costing the firm money, and neither shows up as anybody’s fault in any report.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Getting the figure without the figure</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free lock-up tracker builds it from job level rather than asking for a work in progress balance you probably cannot produce. Enter what has been delivered, invoiced and collected against each job and it derives the rest. It also names which jobs to bill this week and which invoices to chase, ranked by what each releases, because the useful output is not a number but a short list of things to do on Monday.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>How much is sitting somewhere other than your bank account?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free tracker that derives WIP and lock-up days from your live jobs. Nothing uploaded.</p>
            <Link href="/tools/lockup-tracker" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Work out your lock-up</Link>
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
