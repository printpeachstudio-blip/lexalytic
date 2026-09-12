import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/hmo-licence-inspection-what-to-expect' },
  title: 'What Actually Happens at an HMO Licence Inspection | Lexalytic',
  description: 'What a council officer looks at during an HMO licence inspection, the failures that come up most often, and how to prepare so the visit does not turn into a schedule of works.',
  openGraph: {
    title: 'What Actually Happens at an HMO Licence Inspection',
    description: 'What a council officer looks at during an HMO licence inspection, the failures that come up most often, and how to prepare so the visit does not turn into a schedule of works.',
    url: 'https://www.lexalytic.com/blog/hmo-licence-inspection-what-to-expect',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Actually Happens at an HMO Licence Inspection",
  "description": "What a council officer looks at during an HMO licence inspection, the failures that come up most often, and how to prepare so the visit does not turn into a schedule of works.",
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
    "@id": "https://www.lexalytic.com/blog/hmo-licence-inspection-what-to-expect"
  },
  "inLanguage": "en-GB",
  "wordCount": 1199,
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
      "name": "What Actually Happens at an HMO Licence Inspection",
      "item": "https://www.lexalytic.com/blog/hmo-licence-inspection-what-to-expect"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Property</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 5 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>What Actually Happens at an HMO Licence Inspection</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most councils inspect within six weeks of a licence application and decide within twelve. The inspection is not adversarial and the officer is not looking for reasons to refuse, but they are working through a list, and a property that has not been prepared usually produces a schedule of works with a deadline attached. Knowing what is on the list is most of the preparation.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Room sizes get measured</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Not estimated, measured. Any room used for sleeping by one person aged ten or over must be at least 6.51 square metres, and 10.22 square metres if two people share it. A room below 4.64 square metres cannot be used for sleeping at all. Space under a ceiling lower than 1.5 metres does not count toward the total, which catches out attic rooms that look adequate on a floor plan. If a room fails, it cannot count toward your licensed occupancy, and the licence will be issued for fewer people than you are currently housing.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Fire safety is the largest section</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The officer will check for interlinked mains-powered smoke alarms with battery backup, fire doors on rooms opening onto the escape route, self-closing devices that actually work rather than ones that have been wedged or unscrewed, emergency lighting where the escape route has no natural light, and a clear route from every room to a final exit. Intumescent strips and cold smoke seals on fire doors get looked at closely. A door that has been painted over so many times the strip is buried is a common failure.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Amenity ratios</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>These vary by council but the common baseline is one bathroom per five occupants and a kitchen sized for the number of people using it, assessed on worktop length, number of hobs, and fridge capacity rather than a general impression. A five bed property with one bathroom and a galley kitchen will usually be licensed for fewer occupants than it has bedrooms.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The paperwork they will ask for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A valid gas safety certificate, an EICR no more than five years old, a fire risk assessment, an EPC of band E or above, a floor plan with room measurements marked, and evidence of your management arrangements. Missing paperwork is the most avoidable cause of delay, because the application simply sits until it arrives. If a certificate expires between application and inspection, that is treated as missing rather than late.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Keeping on top of it afterwards</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A licence lasts up to five years, but the certificates underneath it renew on their own cycles, and a lapsed gas certificate is a criminal offence rather than a licence breach. Most landlords who fall foul of this are not ignoring it, they have simply lost track of which date falls when across several properties. Our free HMO compliance tracker works out every renewal date from the last completion date and exports them to your calendar with reminders at 90, 30 and 7 days.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Keep the dates somewhere you will see them</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Add your properties and the tracker works out every renewal date, flags what is overdue, and exports the lot to your calendar. Free, and nothing is uploaded.</p>
            <Link href="/tools/hmo-compliance-tracker" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Open the compliance tracker</Link>
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
