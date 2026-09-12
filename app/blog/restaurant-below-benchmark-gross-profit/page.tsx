import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/restaurant-below-benchmark-gross-profit' },
  title: 'Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong. | Lexalytic',
  description: 'HMRC compares filed restaurant returns against expected profit benchmarks automatically. Delivery commission, discounting and waste all depress margin legitimately. The difficulty is evidencing that after the fact rather than before.',
  openGraph: {
    title: 'Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong.',
    description: 'HMRC compares filed restaurant returns against expected profit benchmarks automatically. Delivery commission, discounting and waste all depress margin legitimately. The difficulty is evidencing that after the fact rather than before.',
    url: 'https://www.lexalytic.com/blog/restaurant-below-benchmark-gross-profit',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong.",
  "description": "HMRC compares filed restaurant returns against expected profit benchmarks automatically. Delivery commission, discounting and waste all depress margin legitimately. The difficulty is evidencing that after the fact rather than before.",
  "datePublished": "2026-11-19",
  "dateModified": "2026-11-19",
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
    "@id": "https://www.lexalytic.com/blog/restaurant-below-benchmark-gross-profit"
  },
  "inLanguage": "en-GB",
  "articleSection": "Hospitality"
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
      "name": "Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong.",
      "item": "https://www.lexalytic.com/blog/restaurant-below-benchmark-gross-profit"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Hospitality</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong.</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>An accountant once posted about a client whose Indian restaurant filed accounts showing fifty six per cent gross profit. The inspector said it should be at least sixty, based on other restaurants. The client was not doing anything wrong. Explaining that, after the year had closed and without the records to hand, turned out to be the hard part.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>How the comparison happens</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>HMRC publishes expected profit figures for restaurants and compares filed returns against them through the Connect system. It is automatic rather than something an inspector decides to look at. Full service and casual dining is generally expected at sixty five to seventy per cent gross and three to six per cent net, quick service and takeaways at sixty five to seventy per cent gross and six to nine per cent net, and pubs higher again because drink carries better margin. Sitting consistently below the band for your format is one of the most common triggers for a compliance check, because from the outside it can indicate either sales that were not recorded or purchases that were.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The reasons a straight business sits low</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Delivery platform commission is the biggest and the least visible, because it does not appear in cost of sales at all. A quarter of turnover going through a platform at thirty per cent takes several points off net margin while gross profit looks untouched. Discounting and set menus pull gross profit down directly. Waste and spoilage do the same, and hospitality runs three to five per cent as a matter of course. Staff meals, comps for unhappy tables, and a tied supply agreement if you are a pub tenant all push the same way. Each is entirely legitimate and none of them shows up anywhere obvious in a set of accounts.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why the explanation has to be evidenced</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Saying delivery commission cost you three points is an assertion. The same claim with platform statements attached is a fact. That distinction decides whether a conversation is short or long, and it is almost entirely determined by what you kept at the time. A waste log written as it happened, with dates and sign-off, is worth a great deal. A waste figure estimated eighteen months later is worth very little, however honest it is, because there is no way to distinguish it from a number chosen to fit.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What is worth keeping, and when</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Platform statements showing commission deducted, and the split between platform and direct sales in your till reports. Till reports showing discount codes applied by period, with copies of the offers that ran and the dates. A dated waste log, kept contemporaneously, with supervisor sign-off on anything significant. A written staff meal policy and a record of meals taken. If you are tied, the tenancy agreement plus pubco price lists against open market quotes for the same products. None of this is difficult while it is happening. All of it is close to impossible to recreate afterwards.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The platform reporting nobody mentioned</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Digital platforms now report seller income directly to HMRC. Deliveroo, Uber Eats and Just Eat all do it. So your platform turnover is already known, regardless of what your own records show. For the overwhelming majority of operators this changes nothing, because the figures agree. It does mean that any discrepancy surfaces automatically rather than only if somebody chooses to look, and it means the reconciliation between your till, your platform statements and your return matters more than it used to.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>When the gap is not explained</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Sometimes you work through all of it and the numbers still do not account for the variance. That is worth knowing for its own sake, not because of HMRC. An unexplained gap between what you should be making and what you are making usually means stock going out without being rung through, portioning that has drifted, or a supplier price rise that nobody caught. All three cost you money whether anyone ever asks about them or not.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Seeing it before somebody else does</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free benchmark check shows where your figures sit against the published ranges for your format, how much of any gap delivery mix, discounting, waste and a tie would account for, and what records would evidence each one. It takes a few minutes and runs entirely in your browser. If you have already had a letter, speak to an accountant or a tax investigation specialist rather than relying on a tool.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>How do your numbers look from the outside?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free check against the published benchmarks, with what would explain a gap and what records would evidence it. Nothing is uploaded.</p>
            <Link href="/tools/restaurant-benchmark-check" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check where your numbers sit</Link>
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
