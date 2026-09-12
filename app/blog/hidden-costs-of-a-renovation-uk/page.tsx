import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/hidden-costs-of-a-renovation-uk' },
  title: 'The Renovation Costs That Are Not in the Builder Quote | Lexalytic',
  description: 'VAT, contingency, the structural engineer, Building Control, the party wall surveyor and somewhere to live. Together they add thirty to fifty per cent to the figure a builder gives you.',
  openGraph: {
    title: 'The Renovation Costs That Are Not in the Builder Quote',
    description: 'VAT, contingency, the structural engineer, Building Control, the party wall surveyor and somewhere to live. Together they add thirty to fifty per cent to the figure a builder gives you.',
    url: 'https://www.lexalytic.com/blog/hidden-costs-of-a-renovation-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Renovation Costs That Are Not in the Builder Quote",
  "description": "VAT, contingency, the structural engineer, Building Control, the party wall surveyor and somewhere to live. Together they add thirty to fifty per cent to the figure a builder gives you.",
  "datePublished": "2026-11-24",
  "dateModified": "2026-11-24",
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
    "@id": "https://www.lexalytic.com/blog/hidden-costs-of-a-renovation-uk"
  },
  "inLanguage": "en-GB",
  "articleSection": "Homeowners"
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Homeowners</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Renovation Costs That Are Not in the Builder Quote</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Cost overrun is the thing homeowners regret most about building work. It is rarely because the builder was dishonest. It is because the quote covers the building work and nobody mentioned the eleven other things that arrive alongside it.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>VAT is the one that catches most people</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A quote from a VAT registered builder may be presented excluding VAT, particularly if it is itemised like a trade document. On a sixty thousand pound job that is twelve thousand pounds you had not counted, and finding out at the invoice stage is a bad way to find out. Ask explicitly whether the figure includes it and get the answer in writing. There are reduced rates in narrow circumstances, five per cent on a property empty for more than two years for instance, but an ordinary renovation of an occupied house is not one of them.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Contingency is not optional spending</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>It is spending you have not identified yet. Ten per cent on a house built after 2000, rising toward twenty per cent on anything pre-1919, because older properties hide more: joists that have gone, wiring that predates earth bonding, damp behind plaster, drainage in the wrong place. The commonest budgeting mistake is leaving it out entirely, which does not remove the cost. If you finish without using it you have a kitchen island. If you never had it you have a half finished job and a difficult conversation.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The professionals nobody budgets for</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A structural engineer for calculations on steels or a loft floor, typically five hundred to fifteen hundred pounds, and Building Control will want them before work starts rather than after. Building Control itself, another five hundred to twelve hundred, and separate from planning permission despite being constantly confused with it. An architect or designer at five to twelve per cent of build cost depending on how far they take it. None of these appear on a builder quote because none of them is the builder.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Party wall is the one that can double</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Work on or near a shared wall means serving notice. If your neighbour consents, you pay for nothing. If they dissent, you generally pay for their surveyor as well as your own, so budget for two at one to three thousand pounds each. Serving notice properly and early is the cheapest way to stop this escalating, because a neighbour who feels ambushed dissents and a neighbour who was told in good time often does not. The schedule of condition that comes with it protects you as much as them.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The costs that only appear once work starts</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Asbestos in anything built before 2000, where a survey is a few hundred pounds and removal is licensed work costing considerably more. Damp and timber treatment found once the plaster comes off, anywhere from two and a half to fifteen thousand. Drainage diversion if you are building over or near a public sewer, which needs water company agreement and takes time as well as money. Scaffold quoted for a fixed period that keeps charging if the programme slips. Skip permits and suspended parking bays, which in some boroughs are startling.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>And the two people always forget</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Somewhere to live, if the property will not be habitable. Rent, storage and the cost of running two homes at once for the duration, which on a three month job is not trivial. Then everything that goes into the finished result: blinds, curtains, light fittings, furniture, white goods. The build ends and the spending does not. This is regularly a five figure sum that appeared in nobody’s budget because it is not building work.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why this causes arguments as well as overruns</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Forty eight per cent of contractors who have payment disputes name unforeseen cost and scope change as the cause, ahead of clients who will not pay. Both sides remember the conversation about the extra work differently six weeks later, and whoever wrote it down at the time is the one who is believed. Agree in advance that every variation will be confirmed in writing with its cost before the work is done, and then actually do it.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Getting the real number before you commit</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free renovation planner works out the full figure rather than the building work figure, triggers the hidden costs that apply to what you are actually doing and the age of your property, and recommends a contingency on that basis. It also produces a scope document to send to three builders, so the quotes come back answering the same questions instead of three different ones. It runs in your browser and nothing is uploaded.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>What is the job actually going to cost?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free planner covering everything outside the builder quote, plus a scope document for comparable quotes.</p>
            <Link href="/tools/renovation-planner" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Work out the real number</Link>
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
