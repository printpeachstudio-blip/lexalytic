import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/hmo-management-software-uk' },
  title: 'HMO Management Software UK - What Actually Exists and What It Costs | Lexalytic',
  description: 'A practical guide to HMO management software for UK landlords in 2027. What the tools actually do, what they cost, and when to build something bespoke instead.',
  openGraph: {
    title: 'HMO Management Software UK - What Actually Exists and What It Costs',
    description: 'A practical guide to HMO management software for UK landlords in 2027. What the tools actually do, what they cost, and when to build something bespoke instead.',
    url: 'https://www.lexalytic.com/blog/hmo-management-software-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "HMO Management Software UK - What Actually Exists and What It Costs",
  "description": "A practical guide to HMO management software for UK landlords in 2027. What the tools actually do, what they cost, and when to build something bespoke instead.",
  "datePublished": "2027-02-15",
  "dateModified": "2027-02-15",
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
    "@id": "https://www.lexalytic.com/blog/hmo-management-software-uk"
  },
  "inLanguage": "en-GB",
  "wordCount": 1079,
  "articleSection": "Property"
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
      "name": "HMO Management Software UK - What Actually Exists and What It Costs",
      "item": "https://www.lexalytic.com/blog/hmo-management-software-uk"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Property</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>February 2027 · 5 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>HMO Management Software UK - What Actually Exists and What It Costs</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Managing an HMO is a different job to managing a standard buy-to-let. Multiple tenants, room-by-room rent, shared utilities, HMO licences with conditions attached, and a constant rotation of people moving in and out. The software built for landlords was almost entirely designed for single-let properties. This guide covers what is actually available for HMO landlords in the UK, what each option does well, and where the gaps are.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What makes HMO management different</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A standard landlord portal handles one tenancy agreement per property, one rent figure, one set of utilities. An HMO has one property with potentially six separate tenancies, six separate rent amounts, shared bills that need splitting, licence conditions that need tracking, and a maintenance history that needs attributing to the right room. Most landlord software treats an HMO as a single tenancy with awkward workarounds built on top.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What Arthur Online does</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Arthur Online is probably the most HMO-aware of the mainstream property management platforms. It handles room-level tenancies, individual rent tracking, and has reasonable document management. It costs around £1 per unit per month with a minimum spend, working out at £30-50 per month for a small portfolio. The weakness is the reporting - pulling a clear picture of income per property versus expenditure requires more manual work than it should.</p>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>What Landlord Vision does</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Landlord Vision has an HMO module that tracks room-level occupancy and individual tenancies. The interface is functional rather than slick. It handles the financial side reasonably well - income tracking, expense allocation, tax year summaries. It costs around £8 per month for a small portfolio. For landlords who primarily want a financial record and are comfortable with a basic interface, it is adequate.</p>
            </div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The spreadsheet reality</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The honest truth is that most HMO landlords with fewer than 10 properties manage on a combination of spreadsheets, a basic tenancy agreement template, and a WhatsApp group for maintenance reports. This works until it does not - usually when a compliance issue arises, a deposit dispute goes to the tenancy deposit scheme, or HMRC asks for a detailed income breakdown.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>When to build something bespoke</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The case for a custom HMO management tool is strongest when you have specific requirements that the generic platforms handle badly. Rent review processes tied to licence conditions. Utility bills split by occupancy period rather than equally. Maintenance costs allocated to specific rooms for insurance purposes. If you find yourself maintaining a separate spreadsheet to plug the gaps in your property management software, that spreadsheet is the brief for a bespoke tool.</p>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
            Our <Link href="/tools/hmo-compliance-tracker" style={{ color: 'var(--amber)' }}>free HMO compliance tracker</Link> works out every certificate renewal date across a portfolio and exports them to your calendar. Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.
          </p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call</Link>
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
