import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/why-we-build-websites-in-nextjs-not-wordpress' },
  title: 'Why We Build Websites in Next.js Not WordPress (And Why It Matters) | Lexalytic',
  description: 'Most UK web agencies build in WordPress. We build in Next.js. Here is why that decision affects your site speed, SEO rankings, security, and long-term cost — and when each approach makes sense.',
  keywords: 'Next.js website UK, bespoke website development UK, why not WordPress UK, fast website small business UK, website developer Hertfordshire, custom website no platform fees',
  openGraph: {
    title: 'Why We Build Websites in Next.js Not WordPress (And Why It Matters)',
    description: 'Most UK web agencies build in WordPress. We build in Next.js. Here is why that decision affects your site speed, SEO rankings, security, and long-term cost — and when each approach makes sense.',
    url: 'https://www.lexalytic.com/blog/why-we-build-websites-in-nextjs-not-wordpress',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"Why We Build Websites in Next.js Not WordPress (And Why It Matters)","description":"Most UK web agencies build in WordPress. We build in Next.js. Here is why that decision affects your site speed, SEO rankings, security, and long-term cost — and when each approach makes sense.","datePublished":"2026-09-02","dateModified":"2026-09-02","url":"https://www.lexalytic.com/blog/why-we-build-websites-in-nextjs-not-wordpress","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Why We Build Websites in Next.js Not WordPress (And Why It Matters)</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>When a business asks us to build their website, the first question is almost never about design. It is about the platform. Most UK web agencies default to WordPress — and for many businesses, WordPress is perfectly adequate. But for the businesses we work with, the conversation usually goes a different way. Here is why we build in Next.js, what the practical difference is, and when it actually matters for your business.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What WordPress actually is — and why most agencies use it</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>WordPress powers around 43% of all websites globally. It is open-source, has thousands of themes and plugins, and almost every web developer knows how to use it. That is the primary reason most agencies default to it — it is the easiest tool for them to work with, not necessarily the best tool for your specific needs. WordPress is a content management system built in 2003. It has been extended enormously over the years, but at its core it still uses PHP and MySQL in the way websites were built twenty years ago.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What Next.js actually is</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Next.js is a modern React framework built for performance. It was created by Vercel in 2016 and is used by companies including Netflix, TikTok, Twitch, and GitHub. Unlike WordPress, Next.js generates static HTML pages at build time — meaning when someone visits your site, the server does not need to query a database, run PHP, or load plugins. The page is already built and delivered instantly. The Lexalytic site you are reading right now is built in Next.js. It scores 100 on Google SEO and loads in under a second.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The practical differences that actually matter for your business</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Speed is the most immediately obvious difference. A Next.js site typically loads 3-5 times faster than a comparable WordPress site, because there is no database query, no PHP execution, and no plugin overhead on each page load. Google uses page speed as a ranking factor — a faster site ranks higher, all else being equal. Security is the second major difference. WordPress sites are the most frequently hacked websites on the internet because they are everywhere, they have plugin vulnerabilities, and they have a login page that can be brute-forced. A static Next.js site has no database to attack, no login page, and almost no attack surface. The third difference is cost. WordPress sites require hosting, theme licences, plugin licences, security plugins, backup plugins, and often a maintenance retainer. A Next.js site on Vercel has none of those ongoing costs — hosting is free at most traffic levels, and there are no licences to renew.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>When WordPress is the right choice</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>WordPress makes sense when you need a site you can update yourself without any technical knowledge, when you need a large content management system that non-technical staff will manage daily, or when you need e-commerce and WooCommerce is specifically required. If your business publishes dozens of articles per week and needs editorial workflows, user roles, and scheduled publishing built in — WordPress handles all of that out of the box. We are not anti-WordPress. We just do not use it for sites where performance, security, and long-term cost matter more than ease of content editing for non-technical users.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            
            <Link key={0} href="/blog/why-uk-businesses-building-custom-tools" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Why UK Businesses Are Building Custom Tools Instead of Buying Software</p>
            </Link>
            <Link key={1} href="/blog/replace-spreadsheet-with-business-tool" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>How to Replace Your Spreadsheet with a Proper Business Tool</p>
            </Link>
            <Link key={2} href="/blog/how-to-tell-if-your-business-is-profitable" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Business Finance</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>How to Tell If Your Business Is Actually Profitable</p>
            </Link>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you are trying to build and we will tell you the best approach — and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
