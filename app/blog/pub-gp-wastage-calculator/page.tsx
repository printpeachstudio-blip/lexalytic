import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/pub-gp-wastage-calculator' },
  title: 'Your GP Is Not What The Calculator Told You | Lexalytic',
  description: 'A pint costing £1.42 does not cost £1.42. Line cleaning, ullage and over-pouring mean you buy more than you sell, and almost every GP calculator ignores it.',
  openGraph: {
    title: 'Your GP Is Not What The Calculator Told You',
    description: 'A pint costing £1.42 does not cost £1.42. Line cleaning, ullage and over-pouring mean you buy more than you sell, and almost every GP calculator ignores it.',
    url: 'https://www.lexalytic.com/blog/pub-gp-wastage-calculator',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Your GP Is Not What The Calculator Told You",
  "description": "A pint costing £1.42 does not cost £1.42. Line cleaning, ullage and over-pouring mean you buy more than you sell, and almost every GP calculator ignores it.",
  "datePublished": "2026-09-08",
  "dateModified": "2026-09-08",
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
    "@id": "https://www.lexalytic.com/blog/pub-gp-wastage-calculator"
  },
  "inLanguage": "en-GB",
  "articleSection": "Hospitality"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Hospitality</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 7 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Your GP Is Not What The Calculator Told You</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Every gross profit calculator does one product at a time and assumes you sell everything you buy. Neither assumption survives contact with a cellar. The result is a number that looks healthy while the actual margin sits three or four points below it, which on a drink-led business is the difference between a good year and a flat one.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Wastage is not a rounding error</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Most pubs lose between two and five per cent of draught stock to line cleaning, ullage, spillage and the first pull of the session, and five to six per cent is common once everything is counted. That is not waste in the sense of carelessness, it is the cost of selling beer from a cellar. What matters is that it changes the cost per pint: at five and a half per cent, a pint costing a pound forty two effectively costs a pound fifty.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>And it is applied the wrong way round nearly everywhere</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Wastage means you buy more than you sell, so it inflates the cost. Most people who account for it at all subtract it from revenue instead, which produces a different and wrong answer. The correct calculation divides the unit cost by one minus the wastage rate. It sounds like a technicality and it moves the GP by several points.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The VAT mistake that flatters everything</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A five pound sixty pint is four pounds sixty seven to a VAT registered business. Using the till price in a GP calculation overstates the margin by around seventeen per cent, which is enough to make a struggling site look comfortable. This is the commonest error in pub margin calculations and it is entirely invisible, because the number produced is plausible.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why the blended figure matters more than any line</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Knowing that your house lager runs at sixty eight per cent tells you little on its own. Spirits sit at seventy five to eighty, wine by the glass at seventy to seventy five, bottled beer at sixty to sixty eight, and post mix soft drinks are the best margin in the building. The mix decides the outcome, so a site with strong individual GPs and a bottled beer heavy customer base can still be underperforming a site with worse figures and a better mix.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The tie, for anyone it applies to</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A tied tenant buys at pubco prices, which costs eight to twelve points of gross profit against the open market. Every piece of advice about negotiating harder or switching supplier is useless to roughly ten thousand tenants who have no supplier to switch to. If you are tied, benchmark against other tied sites rather than against published averages, because the published averages include free houses and will make your figures look worse than they are.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What duty does to all of this each February</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Alcohol duty rose 3.66 per cent in February, which added around thirty eight pence to a bottle of gin and fourteen to a bottle of red, straight onto supplier invoices. Most sites recost weeks late or not at all, so every measure sold at the old price between the rise and the recost has quietly given away margin. It happens annually and it is entirely predictable, which makes it an odd thing to be surprised by.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Doing it across the range rather than one line at a time</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free GP calculator takes the whole range at once, applies wastage by product type at the rates each actually runs at, handles VAT in the right order, and shows both the real figure and the one a normal calculator would have given you. The gap between the two is the point of it.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>What is your margin actually?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free calculator across the whole range with wastage applied properly. Nothing uploaded.</p>
            <Link href="/tools/pub-gp-calculator" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check your GP</Link>
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
