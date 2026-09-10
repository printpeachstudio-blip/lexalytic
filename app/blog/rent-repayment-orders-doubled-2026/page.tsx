import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/rent-repayment-orders-doubled-2026' },
  title: 'Rent Repayment Orders Doubled in May 2026. What Landlords Need to Know | Lexalytic',
  description: 'The Renters Rights Act doubled the maximum rent repayment order from 12 to 24 months for offences committed on or after 1 May 2026, and gave tenants two years to bring a claim. Here is what changed and who is exposed.',
  openGraph: {
    title: 'Rent Repayment Orders Doubled in May 2026. What Landlords Need to Know',
    description: 'The Renters Rights Act doubled the maximum rent repayment order from 12 to 24 months for offences committed on or after 1 May 2026, and gave tenants two years to bring a claim. Here is what changed and who is exposed.',
    url: 'https://www.lexalytic.com/blog/rent-repayment-orders-doubled-2026',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Rent Repayment Orders Doubled in May 2026. What Landlords Need to Know",
  "description": "The Renters Rights Act doubled the maximum rent repayment order from 12 to 24 months for offences committed on or after 1 May 2026, and gave tenants two years to bring a claim. Here is what changed and who is exposed.",
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
    "@id": "https://www.lexalytic.com/blog/rent-repayment-orders-doubled-2026"
  },
  "inLanguage": "en-GB",
  "wordCount": 1341,
  "articleSection": "Property"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Property</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 6 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Rent Repayment Orders Doubled in May 2026. What Landlords Need to Know</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>For offences committed on or after 1 May 2026, the maximum rent repayment order is two years of rent rather than one. The window for bringing a claim doubled as well, from twelve months to two years. Six new offences were added to the list that triggers one. For a landlord letting five rooms at 700 a month, the theoretical maximum moved from around 42,000 to around 84,000, before any separate civil penalty from the council.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What a rent repayment order actually is</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>It is an order from the First-tier Tribunal requiring a landlord to hand back rent already paid, because they committed one of a defined list of housing offences during the period that rent covered. Operating an unlicensed HMO is the most common trigger. It is not a fine paid to the state, it goes to the tenant who paid it, or to the council where the rent was paid through housing benefit or universal credit. That distinction matters, because it gives tenants a direct financial reason to bring a claim.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What the Renters Rights Act changed</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Three things. The maximum award doubled from twelve months to twenty four. The application window doubled from twelve months to two years, so claims that would previously have been time-barred can now proceed. And six new offences were added, including breach of a letting restriction, failure to comply with the landlord redress scheme, and providing false information to the private rented sector database. There is also a provision that a landlord who has already been penalised for an offence and commits it again must be ordered to pay the maximum rather than an amount at the tribunal discretion.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Who is newly exposed</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The change that catches most people is the extension to superior landlords. Before the Act, following the Supreme Court decision in Rakusen v Jepsen, an order could only be made against the immediate landlord. In a rent-to-rent arrangement that meant the company holding the lease was liable and the actual property owner was not. The Act reverses that. A property owner who has let to an operating company and assumed the arrangement insulates them from licensing failures no longer has that protection.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The practical exposure</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Councils are also issuing civil penalties of up to 30,000 for the same underlying offence, and the two run in parallel rather than one replacing the other. Industry commentary has put the combined figure above 80,000 for a single property in the worst case. The point is not that every unlicensed HMO attracts the maximum, because tribunals reduce awards for mitigating factors and most cases settle lower. The point is that the ceiling moved a long way, and the people most likely to be caught are landlords who did not realise they needed a licence rather than those deliberately avoiding one.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Checking where you stand</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The licensing rules themselves have not changed. In England a mandatory licence is required where five or more people from two or more households share facilities, with no minimum number of storeys since October 2018. What changed is the cost of getting it wrong. If you are not certain whether a property is caught, our free HMO licence checker asks four questions and gives you a definitive answer on the mandatory rules, along with what a licence costs and what the council will ask for.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Not sure whether a property is caught?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Four questions and you will know whether a mandatory licence applies, what it typically costs, and what the council will want to see. Free, no signup.</p>
            <Link href="/tools/hmo-licence-checker" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check whether you need a licence</Link>
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
