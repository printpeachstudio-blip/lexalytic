import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/which-sessions-make-money-hospitality' },
  title: 'The Week Is Profitable. Two Sessions Are Carrying It. | Lexalytic',
  description: 'An hour at £13.20 costs the business £16.68 once holiday, National Insurance and pension are in. Almost nobody uses that number when writing a rota.',
  openGraph: {
    title: 'The Week Is Profitable. Two Sessions Are Carrying It.',
    description: 'An hour at £13.20 costs the business £16.68 once holiday, National Insurance and pension are in. Almost nobody uses that number when writing a rota.',
    url: 'https://www.lexalytic.com/blog/which-sessions-make-money-hospitality',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Week Is Profitable. Two Sessions Are Carrying It.",
  "description": "An hour at £13.20 costs the business £16.68 once holiday, National Insurance and pension are in. Almost nobody uses that number when writing a rota.",
  "datePublished": "2027-02-23",
  "dateModified": "2027-02-23",
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
    "@id": "https://www.lexalytic.com/blog/which-sessions-make-money-hospitality"
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>February 2027 · 7 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Week Is Profitable. Two Sessions Are Carrying It.</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A publican worked out after six months that his afternoon shift covered its costs and contributed nothing. Not because he was careless, but because nobody had put labour spend next to till sales for that one session. The week made money, so the week looked fine.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The number the rota is written with is the wrong one</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>An hour at thirteen pounds twenty costs the business sixteen pounds sixty eight. Holiday accrual at 12.07 per cent, employer National Insurance at fifteen per cent above the threshold, pension at three. That is roughly twenty six per cent on top of the rate, before anyone has poured anything. On the National Living Wage of twelve seventy one the real figure is closer to sixteen pounds. Every rota decision made against the hourly rate is made against a number that is a quarter too low.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why a profitable week hides an unprofitable session</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Because the accounts are monthly and the decisions are hourly. A month shows a number that either works or does not. It cannot show that Friday evening is carrying Tuesday lunch, that Sunday is carrying both, and that one session is actively costing money every week it opens. Averaging is exactly what conceals this, and a monthly P and L is an average.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What to measure instead</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Contribution by session. Take the sales for that trading period, apply your gross profit, subtract what the labour actually cost. What is left is what that session contributed toward rent and everything else. Do it for a fortnight and the pattern is usually obvious, and usually not where people expected it to be.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The conclusion that is normally wrong</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Having found a session that loses money, the instinct is to close it. Usually a mistake. Rent runs whether you open or not, so a session making any contribution at all beats being shut, unless the staff could earn more elsewhere in the week. More importantly, the customers at a quiet session are frequently the same customers who come at a busy one, and closing Tuesday lunch can cost you Friday evening in ways no report will attribute correctly.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What usually works instead</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Trimming the edges. Most weak sessions are overstaffed at the start and the end rather than throughout. Starting one person an hour later, or sending someone home at eight rather than ten, changes the contribution meaningfully and costs almost nothing in trade. It is less satisfying than a decisive closure and it is generally the right answer.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>And the thing that makes this worse every April</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Every rise in the National Living Wage costs around twenty six per cent more than the headline figure suggests, because National Insurance and pension scale with it. A fifty pence increase is closer to sixty three pence. A business that budgets for the headline is short before the year starts, and hospitality runs on margins too thin to absorb that quietly.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Working out which sessions carry your week</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free labour by session tool does this with true employment cost rather than the hourly rate, shows contribution per session and averages by daypart so a pattern separates itself from one bad Tuesday. It also argues against closing things, which is unusual for a calculator.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Which sessions actually make you money?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free tool using what an hour really costs, not the hourly rate. Nothing uploaded.</p>
            <Link href="/tools/labour-by-session" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check your sessions</Link>
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
