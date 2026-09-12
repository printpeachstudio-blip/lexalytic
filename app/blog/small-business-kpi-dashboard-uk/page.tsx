import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/small-business-kpi-dashboard-uk' },
  title: 'KPI Dashboard for Small UK Businesses - What to Track and How to Build It | Lexalytic',
  description: 'A practical guide to building a KPI dashboard for a small UK business. What metrics actually matter, what tools to use, and how to make it something you actually look at.',
  openGraph: {
    title: 'KPI Dashboard for Small UK Businesses - What to Track and How to Build It',
    description: 'A practical guide to building a KPI dashboard for a small UK business. What metrics actually matter, what tools to use, and how to make it something you actually look at.',
    url: 'https://www.lexalytic.com/blog/small-business-kpi-dashboard-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "KPI Dashboard for Small UK Businesses - What to Track and How to Build It",
  "description": "A practical guide to building a KPI dashboard for a small UK business. What metrics actually matter, what tools to use, and how to make it something you actually look at.",
  "datePublished": "2026-07-15",
  "dateModified": "2026-07-15",
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
    "@id": "https://www.lexalytic.com/blog/small-business-kpi-dashboard-uk"
  },
  "inLanguage": "en-GB",
  "wordCount": 1168,
  "articleSection": "Business Intelligence"
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
      "name": "KPI Dashboard for Small UK Businesses - What to Track and How to Build It",
      "item": "https://www.lexalytic.com/blog/small-business-kpi-dashboard-uk"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Business Intelligence</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>July 2026 · 5 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>KPI Dashboard for Small UK Businesses - What to Track and How to Build It</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most KPI dashboards built for small businesses are either too simple to be useful or too complex to be used. The too-simple version tracks revenue and not much else. The too-complex version has 40 metrics and gets opened once a month by nobody. The useful version answers the three or four questions that actually drive decisions in your business, updates automatically, and gets checked every week.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Starting with the decisions, not the metrics</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The mistake in most dashboard projects is starting with data availability - what metrics can we easily pull from the systems we have - rather than decision utility - what information would make our weekly decisions better. The right approach is to list the decisions your leadership team makes regularly and work backwards to identify what information would make each decision better. That list of information needs is your dashboard spec.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The metrics that matter in most small businesses</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Revenue versus target is the first metric almost every business needs. Not just total revenue - revenue against what you expected to generate this period. Without the target comparison, the revenue figure tells you what happened but not whether it was good or bad. Gross margin comes second for any business selling products or delivering services with variable costs. Net cash position third. Debtor days fourth for any business that invoices clients.</p>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>Sector-specific metrics worth adding</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Service businesses with staff need utilisation rate - what percentage of available hours are being billed. Businesses with recurring revenue need churn rate and lifetime value. Businesses dependent on lead generation need cost per lead and conversion rate. Businesses with inventory need stock turn and stock value. Adding these to the core four gives you a dashboard of six to eight metrics covering most small business models.</p>
            </div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Building it in Power BI versus Excel</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Power BI is the right tool when multiple people need to access the dashboard, when you want it to update automatically from connected data sources, or when you want mobile access. Excel is the right tool when the output format matters for distribution or when your finance team is more comfortable in Excel. Both can produce a good KPI dashboard. The choice depends on how it will be used and who will maintain it.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Making it something people actually use</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A dashboard that gets checked weekly becomes embedded in how decisions are made. A dashboard that gets checked monthly has almost no impact on behaviour. Sending the dashboard automatically to the leadership team every Monday morning, before the weekly meeting, means it gets reviewed as part of an existing habit. A Power Automate flow that emails the current dashboard screenshot on Monday at 8am costs an afternoon to set up and changes how the dashboard is used fundamentally.</p>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>
            If you want it built rather than described, that is our <Link href="/services/power-bi" style={{ color: 'var(--amber)' }}>Power BI work</Link>. Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.
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
