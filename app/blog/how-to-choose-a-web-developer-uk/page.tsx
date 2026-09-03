import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/how-to-choose-a-web-developer-uk' },
  title: 'How to Choose a Web Developer in the UK (Without Getting Burned) | Lexalytic',
  description: 'Choosing the wrong web developer is expensive. Here is what to look for, what to ask, and the red flags to avoid when hiring a UK web developer.',
  openGraph: {
    title: 'How to Choose a Web Developer in the UK (Without Getting Burned)',
    description: 'Choosing the wrong web developer is expensive. Here is what to look for, what to ask, and the red flags to avoid when hiring a UK web developer.',
    url: 'https://www.lexalytic.com/blog/how-to-choose-a-web-developer-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How to Choose a Web Developer in the UK (Without Getting Burned)","description":"Choosing the wrong web developer is expensive. Here is what to look for, what to ask, and the red flags to avoid when hiring a UK web developer.","datePublished":"2027-01-05","dateModified":"2027-01-05","url":"https://www.lexalytic.com/blog/how-to-choose-a-web-developer-uk","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Website Development</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>January 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>How to Choose a Web Developer in the UK (Without Getting Burned)</h1>
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
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most businesses that have had a bad experience with a web developer say the same thing afterwards: the warning signs were there. Unclear pricing. Vague timelines. Promises about results that were never put in writing. This guide covers what to look for, what to ask, and how to avoid the most common mistakes.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The most important question to ask upfront</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>What is included in the price — and what is not? A quote that says &quot;website build&quot; tells you almost nothing. A quote that specifies exactly how many pages, what functionality, whether copywriting and images are included, what the hosting arrangement is, and what happens after launch tells you everything you need to know about how seriously the developer takes scoping. Vague quotes lead to scope creep. Scope creep leads to invoices that do not match what was agreed.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What to look for in their portfolio</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Live sites, not screenshots. Anyone can show a Figma mockup or a static screenshot. Ask for the URL of three sites they have built that are currently live. Visit them on mobile. Check the load speed using PageSpeed Insights. Look at whether the sites are actually ranking on Google by searching for the business name plus a relevant service. A developer who builds sites that work will have no hesitation giving you live URLs.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Day rates versus fixed price</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Day rates transfer all risk to you. If the build takes longer than estimated — which it almost always does — you pay more. Fixed price transfers the risk to the developer to scope accurately. For most small business website projects, fixed price is significantly better for the client. The developer who quotes fixed price is the one who has scoped enough projects to know what they are taking on. The developer who insists on day rates may not.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The red flags that predict a bad experience</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>No contract or a very short one. No clear process for how changes and revisions are handled. Reluctance to give references from past clients. A portfolio that shows lots of similar template-based sites. Promises about Google rankings that are specific and guaranteed — no honest developer guarantees rankings. Pressure to sign quickly. Any of these individually is worth pausing on. Several together is a clear signal to walk away.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What a good handover looks like</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>At the end of the project you should receive: full ownership of the domain and hosting accounts in your name, access to the code repository, documentation covering how the site works and how to make basic updates, and a walkthrough call where someone explains everything. If the developer retains ownership of any of these — particularly the domain or hosting — that is a dependency that limits your options significantly going forward.</p>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2027 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
