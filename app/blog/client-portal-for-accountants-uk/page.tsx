import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/client-portal-for-accountants-uk' },
  title: 'Client Portal for Accountants UK - What to Look For and What It Should Cost | Lexalytic',
  description: 'A practical guide for UK accountants and bookkeepers on choosing or building a client portal. What the platforms cost, where they fall short, and when a bespoke portal makes more sense.',
  openGraph: {
    title: 'Client Portal for Accountants UK - What to Look For and What It Should Cost',
    description: 'Practical guide to client portals for UK accountants. Platform comparison, costs, and when bespoke makes sense.',
    url: 'https://www.lexalytic.com/blog/client-portal-for-accountants-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Client Portal for Accountants UK - What to Look For and What It Should Cost",
  "description": "A practical guide for UK accountants and bookkeepers on choosing or building a client portal. What the platforms cost, where they fall short, and when a bespoke portal makes more sense.",
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
    "@id": "https://www.lexalytic.com/blog/client-portal-for-accountants-uk"
  },
  "inLanguage": "en-GB",
  "wordCount": 1850,
  "articleSection": "Client Portals"
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
      "name": "Client Portal for Accountants UK - What to Look For and What It Should Cost",
      "item": "https://www.lexalytic.com/blog/client-portal-for-accountants-uk"
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
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Client Portals</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Client Portal for Accountants UK - What to Look For and What It Should Cost</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The typical UK accounting practice wastes 15 to 20 hours per week per team member on avoidable admin. Chasing clients for documents. Searching email threads for the right version of a file. Sending the same reminder for the fifth time. Most of this disappears when clients have a proper portal. The question is which one - and whether to build or buy.</p>

          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What a client portal actually needs to do for an accountancy firm</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The core jobs are simpler than most platforms make them look. Clients need to be able to upload documents you have requested - payslips, bank statements, receipts, ID documents - without emailing them as attachments. You need to be able to send documents for e-signature - engagement letters, authority forms, tax returns for approval. You need to be able to issue invoices and collect payment. And clients need to see what is outstanding so they can act without you having to ask again. Everything else is a nice-to-have.</p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The main platforms and what they actually cost</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>TaxDome is probably the most complete accounting-specific option. It bundles the client portal with broader practice management - documents, e-signatures, invoices, messaging, tasks, and a mobile app. The downside is the setup. Most firms report that full configuration takes two to four weeks, and the interface can feel overwhelming for both staff and clients who are not particularly tech-comfortable. Pricing typically works out at £400 to £600 per year for a small firm. Karbon is the preferred platform for growing practices that want workflow management and client portal combined - it is well designed but the per-user pricing model means costs scale quickly as the team grows. SmartVault is the right choice when document management is the primary concern and you want something simpler than TaxDome. It does the document and portal side well but lacks the invoicing and practice management features. For very small practices - sole traders and two to three person firms - Client Hub is purpose-built for bookkeepers and worth considering. It is focused and easy to use but limited in scope.</p>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>The three-year cost calculation most firms do not do</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The comparison most accountants make is platform monthly fee versus the cost of a bespoke build. The correct comparison is total cost over three years. A five-person firm on TaxDome at a mid-tier plan pays roughly £1,800 to £2,400 per year in licence fees - that is £5,400 to £7,200 over three years before accounting for any add-ons. A bespoke portal built to do exactly what the firm needs typically costs £4,000 to £8,000 once, with no ongoing licence fee. Beyond year two the bespoke option is almost always cheaper. The crossover point for most small firms is somewhere between 18 and 30 months.</p>
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What the platforms get wrong for small UK practices</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The platforms built for accountants have three consistent weaknesses for small UK practices specifically. First, they are predominantly US-designed and the UK compliance context - Making Tax Digital, Companies House integration, HMRC-specific document types - is handled better by some than others. Second, the setup investment required to get full value from platforms like TaxDome or Karbon is significant. Firms that do not complete the configuration end up paying for features they never activated. Third, clients see the platform branding rather than the firm branding. A client logging into TaxDome or Karbon sees that platform name on their portal. A bespoke portal carries the firm name throughout.</p>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>5</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>When to build something bespoke instead</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A bespoke client portal makes the most sense when the off-the-shelf platforms require significant configuration to approximate what you need, when you want the portal to carry your own branding throughout, when you have specific document types or workflows the generic platforms do not handle cleanly, or when the three-year cost calculation favours a one-off build. Bespoke is not for every firm. A sole trader just starting out and needing basic document exchange is better served by a simple platform while the practice is small. But a firm with 50 or more clients, a team of three or more, and a defined client journey is usually better served by something built around how they actually work.</p>
            </div>
          </div>

          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The questions to ask before deciding</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>How many clients do you have and what is your growth trajectory? How technically confident are your clients - will they struggle with a complex portal interface? Do you need the portal to connect to your existing practice management or accounting software? How important is your own branding on the client-facing interface? What does three years of platform licence fees cost versus a one-off build? Answer these honestly and the right choice almost always becomes clear.</p>
          </div>

          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through the options for your firm?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us how your firm currently handles client document exchange and we will tell you the best approach and what it would cost.</p>
            <Link href="/services/client-portals" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>See our client portal service →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '40px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
  )
}
