import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/main-contractor-not-released-retention' },
  title: 'The Main Contractor Has Not Released Your Retention. What You Can Actually Do. | Lexalytic',
  description: 'Retention that has passed its release date is a debt, not a favour. Your rights under the Construction Act, the interest you can charge, and the adjudication route that gets a decision in 28 days.',
  openGraph: {
    title: 'The Main Contractor Has Not Released Your Retention. What You Can Actually Do.',
    description: 'Retention that has passed its release date is a debt, not a favour. Your rights under the Construction Act, the interest you can charge, and the adjudication route that gets a decision in 28 days.',
    url: 'https://www.lexalytic.com/blog/main-contractor-not-released-retention',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Main Contractor Has Not Released Your Retention. What You Can Actually Do.",
  "description": "Retention that has passed its release date is a debt, not a favour. Your rights under the Construction Act, the interest you can charge, and the adjudication route that gets a decision in 28 days.",
  "datePublished": "2026-10-15",
  "dateModified": "2026-10-15",
  "author": {
    "@type": "Person",
    "name": "Mihir Hindocha",
    "url": "https://www.lexalytic.com/about",
    "jobTitle": "Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Lexalytic",
      "url": "https://www.lexalytic.com"
    },
    "knowsAbout": [
      "Business intelligence",
      "Data automation",
      "Custom software development",
      "Power BI",
      "Web development"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "BSc Financial Computing"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Lexalytic",
    "url": "https://www.lexalytic.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.lexalytic.com/linkedin-banner.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.lexalytic.com/blog/main-contractor-not-released-retention"
  },
  "inLanguage": "en-GB",
  "wordCount": 1872,
  "articleSection": "Construction"
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Lexalytic",
      "item": "https://www.lexalytic.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.lexalytic.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "The Main Contractor Has Not Released Your Retention. What You Can Actually Do.",
      "item": "https://www.lexalytic.com/blog/main-contractor-not-released-retention"
    }
  ]
}

export default function BlogPost() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Construction</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>October 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Main Contractor Has Not Released Your Retention. What You Can Actually Do.</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Almost nobody disputes retention. That is what makes it different from the rest of construction debt. The main contractor is not arguing the work was defective or the valuation was wrong. The date passed, nobody applied, and the money stayed where it was. One survey line puts it well: retention is rarely disputed, it is simply forgotten. Which also means it is usually recoverable, if you ask properly.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Work out whether it has actually fallen due</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Under the standard JCT arrangement, half the retention falls due at practical completion and the balance at the end of the rectification period, commonly twelve months later. NEC contracts only hold retention where Option X16 was incorporated into the contract data, and a surprising number of NEC jobs run with no retention at all because that option was never selected. Check your contract particulars rather than assuming the default, because the release mechanism and the length of the defects period are both variable. Then find the date of practical completion of your works specifically, which is not always the same as completion of the main contract.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Check whether you have been over-deducted</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most contracts cap total retention at a percentage of the contract price, usually five per cent. Deductions accumulate from each interim certificate until they hit that ceiling, at which point no further retention should be taken. In practice deduction often continues past the cap, because it is a running total nobody checks against a limit. Add up every deduction across all your certificates and compare it against the cap in your contract. Anything above it was never contractually due and is recoverable now, not at practical completion.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Apply in writing, and apply properly</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A message asking whether there is any chance of the retention is not an application. Put it in writing, name the contract, state the practical completion date and the end of the defects period, set out the sum claimed, and give a date for payment. This matters because of how the payment mechanism works. Under the Housing Grants, Construction and Regeneration Act 1996, if the paying party does not serve a valid payment notice, and does not serve a pay less notice before the final date for payment, the sum in your application becomes the notified sum and must be paid in full. A vague enquiry does not start that clock. A properly formed application does.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Know what they cannot say</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>They cannot make release conditional on being paid by the employer. Section 113 of the Act renders pay when paid provisions ineffective except where a third party has actually become insolvent, and the release of retention cannot be made conditional on matters arising under a separate contract. If the response is that the client has not released it yet, that is not a defence unless the client is insolvent. They also cannot deduct for alleged defects without serving a pay less notice setting out the basis of the deduction and the amount.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Charge the interest</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The Late Payment of Commercial Debts (Interest) Act 1998 provides for simple interest at eight percentage points above the Bank of England base rate on overdue commercial debts, which includes retention past its release date. At a base rate of 3.75 per cent that is 11.75 per cent a year. On five thousand pounds held twelve months beyond its due date that is around five hundred and eighty pounds, and fixed compensation may be recoverable on top. Most subcontractors never claim it, which is precisely why late release costs a main contractor nothing.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Adjudication is faster than people think</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>If a properly formed application is ignored and no pay less notice arrives, you can refer the matter to adjudication under section 108 of the Act at any time. An adjudicator is appointed within seven days of the notice and reaches a decision within twenty eight days, extendable by fourteen with your consent. The decision binds on an interim basis, meaning it must be complied with while any further proceedings run. For a straightforward unpaid notified sum, adjudication is a strong position, and the mere fact of a referral often produces payment before the adjudicator reaches a view. The barrier is almost never the merits. It is that most subcontractors do not know the route exists.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The part that actually costs money</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>None of the above helps if you do not know what is outstanding. The second tranche falls due a year after practical completion, by which time the job is closed, the paperwork is filed and nobody is watching. Our free retention tracker holds every job in one place, works out both release dates from practical completion, flags what has passed its date and calculates the interest accruing on it. It exports to your calendar so the dates surface when they matter rather than when someone happens to remember.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Know what is outstanding before you chase it</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Add your jobs and the tracker works out what is held, whether deduction passed the cap, and when each half fell due. Free, and nothing is uploaded.</p>
            <Link href="/tools/retention-tracker" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Open the retention tracker</Link>
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
