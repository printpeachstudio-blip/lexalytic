import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/recruitment-rebate-liability-nobody-measures' },
  title: 'The Recruitment Liability Almost Nobody Measures | Lexalytic',
  description: 'Every permanent placement inside its rebate window is money you have billed and could still be asked to return. Most agencies have never put a number on it. Here is how to, and why it matters more in some months than others.',
  openGraph: {
    title: 'The Recruitment Liability Almost Nobody Measures',
    description: 'Every permanent placement inside its rebate window is money you have billed and could still be asked to return. Most agencies have never put a number on it. Here is how to, and why it matters more in some months than others.',
    url: 'https://www.lexalytic.com/blog/recruitment-rebate-liability-nobody-measures',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Recruitment Liability Almost Nobody Measures",
  "description": "Every permanent placement inside its rebate window is money you have billed and could still be asked to return. Most agencies have never put a number on it. Here is how to, and why it matters more in some months than others.",
  "datePublished": "2026-08-15",
  "dateModified": "2026-08-15",
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
    "@id": "https://www.lexalytic.com/blog/recruitment-rebate-liability-nobody-measures"
  },
  "inLanguage": "en-GB",
  "wordCount": 1708,
  "articleSection": "Recruitment"
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
      "name": "The Recruitment Liability Almost Nobody Measures",
      "item": "https://www.lexalytic.com/blog/recruitment-rebate-liability-nobody-measures"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Recruitment</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Recruitment Liability Almost Nobody Measures</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Ask a recruitment agency owner what their revenue was last month and they will tell you immediately. Ask how much of it is still refundable and you usually get a pause. Every permanent placement inside its rebate window is a contingent liability. Individually it is not worth worrying about. Across a desk carrying fifteen live placements it is a real number, and it is concentrated in exactly the wrong way.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What the exposure actually is</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A rebate clause means that if a candidate leaves within an agreed window, usually eight to twelve weeks from their start date, you refund part of the fee on a sliding scale. A common stepped shape is one hundred per cent for the first fortnight, then seventy five, fifty and twenty five per cent in pairs of weeks, reaching nil by week eight. Others taper evenly across the window. Take a desk with twelve live placements averaging a nine thousand pound fee. If they are spread evenly through their windows, the average refundable proportion is somewhere near forty per cent, which puts roughly forty three thousand pounds of already billed revenue in a position where a client could ask for it back.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why it clusters</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Exposure is not evenly distributed through the year, because placements are not evenly distributed. A strong month produces a cluster of start dates, and that cluster moves through its rebate window together. Six placements that started in the same fortnight are six placements that reach week four together, and if the market turns or a client restructures, they can go together too. That is the scenario worth modelling. Not one candidate leaving, which every agency absorbs, but a correlated group leaving in the same month because they were all placed into the same client or the same sector at the same time.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The condition most agencies forget works in their favour</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Rebate clauses are almost always conditional on the placement invoice having been settled within the agreed payment terms. A client who paid sixty days late on thirty day terms may have no contractual entitlement to a rebate at all. This cuts both ways and it is worth being clear eyed about it. On one hand it is a genuine defence, and one that agencies frequently fail to raise because nobody checks the payment date against the terms before processing a refund. On the other, an unpaid invoice means the cash was never collected, so the exposure is theoretical anyway and the real problem is credit control. Either way, knowing which of your live placements have an outstanding invoice changes how you would respond to a rebate claim.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Replacement before refund</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Many terms of business give the agency the right to offer a replacement candidate before any money changes hands. Where that right exists, the commercial effect is completely different: the cost is the resourcing time to fill the role again, not the cash. Agencies with a replacement clause and a decent candidate pool carry far less real exposure than the headline number suggests. Agencies that agreed a straight refund clause to win a client carry all of it. That is worth knowing when you are deciding which terms to concede in a negotiation, because a refund clause is priced very differently from a replacement clause and most agencies treat them as interchangeable.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why anyone outside the business asks for this</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Invoice finance providers discount recruitment invoices and they care about this directly, because a rebate reduces the value of the receivable they have advanced against. If you are raising finance or renewing a facility, being able to produce a clear statement of rebate exposure by month is the difference between a straightforward conversation and a nervous one. The same applies to an accountant preparing year end accounts, where material contingent liabilities may need considering, and to any buyer running diligence on the business.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Working it out</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>It is not complicated maths, it is just maths nobody does. For each live placement you need the fee, the start date, the rebate structure, and the window length from your terms of business. From that you get the refundable proportion today and the date it reaches zero. Our free rebate exposure tracker does it across the whole desk, shows the total refundable today, and breaks down how much falls out of the window in each coming month. It also flags the placements where an invoice is still outstanding, since that changes the position on both sides.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Put a number on it</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Add your live placements and see the total refundable today, when each one becomes safe, and how much exposure falls away each month. Free, and nothing leaves your browser.</p>
            <Link href="/tools/rebate-exposure" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Open the rebate exposure tracker</Link>
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
