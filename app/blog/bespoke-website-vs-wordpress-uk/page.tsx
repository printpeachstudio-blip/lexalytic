import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/bespoke-website-vs-wordpress-uk' },
  title: 'Bespoke Website vs WordPress for UK Businesses in 2027 - The Honest Comparison | Lexalytic',
  description: 'An honest comparison of bespoke website development versus WordPress for UK businesses in 2027. Which is right for your situation and why.',
  openGraph: {
    title: 'Bespoke Website vs WordPress for UK Businesses in 2027 - The Honest Comparison',
    description: 'An honest comparison of bespoke website development versus WordPress for UK businesses in 2027. Which is right for your situation and why.',
    url: 'https://www.lexalytic.com/blog/bespoke-website-vs-wordpress-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  return (
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>April 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Bespoke Website vs WordPress for UK Businesses in 2027 - The Honest Comparison</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The WordPress versus bespoke website debate has been running for fifteen years and the answer has not changed: it depends on what you are trying to do and what you are willing to pay and maintain. What has changed is the gap in performance between a well-built bespoke site and a well-built WordPress site, and the gap in ongoing maintenance burden. Both are wider than they were five years ago.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What WordPress actually is in 2027</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>WordPress is a content management system that powers around 43% of websites on the internet. The core software is free. The cost comes from hosting, premium themes, premium plugins, and developer time to put it together and maintain it. A professional WordPress site built by a competent developer costs £3,000 to £10,000 upfront and £100 to £300 per month ongoing in hosting, plugin licences, and maintenance. The ongoing cost is the part most people underestimate when getting quotes.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What bespoke actually means</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A bespoke website is built from scratch in a modern framework - Next.js, Astro, or similar - without a CMS layer. The design is original. The code is clean and purposeful. There are no plugins adding weight and security vulnerabilities. The result loads faster, scores higher on Core Web Vitals, and requires less ongoing maintenance. A bespoke site costs more upfront - typically £5,000 to £15,000 - but has lower ongoing costs because there is no hosting bill or plugin licences on a modern serverless platform.</p>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>The performance difference and why it matters for SEO</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Google uses Core Web Vitals as a direct ranking factor. A well-built bespoke site typically scores in the 90-100 range on PageSpeed Insights. A well-built WordPress site with optimisation plugins typically scores 60-80. A poorly built WordPress site scores under 50. The difference between 60 and 95 translates directly into search ranking differences for competitive terms. If organic search traffic matters to your business, this is not an abstract technical difference.</p>
            </div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>When WordPress is the right choice</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>WordPress makes the most sense when you have a large content team that needs to publish without developer involvement, when you need a complex plugin integration, or when budget is genuinely constrained and you need something professional live quickly. It also makes sense for e-commerce where WooCommerce has thousands of integrations that would each require custom development in a bespoke build.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>When bespoke is worth the investment</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Bespoke is the right choice when SEO performance is a business priority, when the site needs custom functionality that no plugin handles properly, when you want to own the asset outright without platform dependency, or when the brand requires a distinctive visual identity. The total cost of ownership calculation almost always favours bespoke over a three to five year horizon, once ongoing maintenance, hosting, and plugin costs are included.</p>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
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
