import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/what-deliveroo-commission-really-costs' },
  title: 'What Deliveroo Actually Costs You Per Dish | Lexalytic',
  description: 'A twelve pound dish returns around eight pounds forty after commission, before VAT and packaging. Most kitchens price delivery identically to dine-in, which means the thinnest dishes lose money on every order.',
  openGraph: {
    title: 'What Deliveroo Actually Costs You Per Dish',
    description: 'A twelve pound dish returns around eight pounds forty after commission, before VAT and packaging. Most kitchens price delivery identically to dine-in, which means the thinnest dishes lose money on every order.',
    url: 'https://www.lexalytic.com/blog/what-deliveroo-commission-really-costs',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "What Deliveroo Actually Costs You Per Dish",
  "description": "A twelve pound dish returns around eight pounds forty after commission, before VAT and packaging. Most kitchens price delivery identically to dine-in, which means the thinnest dishes lose money on every order.",
  "datePublished": "2026-10-13",
  "dateModified": "2026-10-13",
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
    "@id": "https://www.lexalytic.com/blog/what-deliveroo-commission-really-costs"
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
      "name": "What Deliveroo Actually Costs You Per Dish",
      "item": "https://www.lexalytic.com/blog/what-deliveroo-commission-really-costs"
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>October 2026 · 7 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>What Deliveroo Actually Costs You Per Dish</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A twelve pound dish on Deliveroo returns roughly eight pounds forty. That is before you take the VAT off, before the box, and before anyone in the kitchen has touched it. Most independents price their delivery menu identically to the restaurant menu, which means the platform commission comes entirely out of margin that was already thin.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The order the maths happens in</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>This is where most operators go wrong, and it costs more than the commission rate itself. The customer pays twelve pounds including VAT. If you are VAT registered, two pounds of that was never yours. You are working from ten pounds. The platform then takes its cut of the sale, so at thirty per cent you receive seven pounds. Out of that comes the food cost and the packaging. On a dish costing four pounds twenty with forty five pence of packaging, you are left with about two pounds thirty five against the four pounds seventy you would have made in the restaurant. Work the percentages the other way round and you will convince yourself you are making nearly twice what you are.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What the rates actually are</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Deliveroo and Uber Eats typically sit between twenty five and thirty five per cent where they provide the rider, with the exact figure depending on your contract and how long you have been on the platform. Just Eat runs considerably lower on its order-only tier, often around fourteen per cent, because you are doing the delivery yourself. That difference is enormous on a dish with a thin margin, and it is worth knowing which tier you are actually on rather than which one you signed up to. Rates get renegotiated, promotional periods end, and the statement is the only reliable source.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why the thin dishes are the dangerous ones</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A dish running at seventy per cent margin in the restaurant survives a thirty per cent commission, badly but survives. A dish at fifty five per cent does not. The problem is that the low margin dishes are frequently the popular ones, because they are cheap and people order them. So the volume is concentrated in exactly the items that lose money, and every marketing push, every promotion, every bit of platform visibility makes the position worse rather than better. Selling more of a loss-making dish is not a growth problem, it is an acceleration of the same mistake.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Pricing the delivery menu separately</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Delivery menus generally need eight to twelve percentage points more margin than dine-in to end up in the same place, which in practice means pricing fifteen to twenty five per cent higher. Every major platform permits this and most chains do it, which is why a Big Mac costs more on Uber Eats than in the restaurant. Customers are used to it and the platforms do not penalise it. The reluctance is almost always the operator worrying about looking expensive, which is a reasonable instinct applied to the wrong problem.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The dishes that should not be on there at all</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Some dishes do not work on delivery whatever you charge. Anything that goes soggy, anything that needs to arrive hot and does not, anything where the portion looks mean in a box. Those damage the review score as well as the margin, which then hurts your visibility on the platform. Taking them off the delivery menu is not a loss, it is removing a thing that was costing you twice.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>One more reason to know your platform numbers</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Under the digital platform reporting rules, Deliveroo, Uber Eats and Just Eat report seller income directly to HMRC. Whatever your own records say, the platform turnover is visible. That is not a problem if the two agree, which for most operators they do, but it is worth knowing that the reconciliation happens automatically rather than only if somebody goes looking.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Working out where you actually stand</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>It takes about ten minutes with your top ten dishes and a recent platform statement. Our free delivery margin calculator handles the VAT and commission in the right order, shows the margin per dish against what the same dish earns dine-in, and gives you two prices: what you would need to charge to stop losing money, and what you would need to charge to earn the same margin percentage as the restaurant. Nothing is uploaded and it runs in your browser.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Which of your dishes lose money on delivery?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>
            There is more on what we build for <Link href="/industries/hospitality" style={{ color: 'var(--amber)' }}>hospitality businesses</Link>. Free calculator that handles the VAT and commission in the right order, and tells you what to charge instead. Nothing is uploaded.
          </p>
            <Link href="/tools/delivery-margin" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Work out your delivery margin</Link>
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
