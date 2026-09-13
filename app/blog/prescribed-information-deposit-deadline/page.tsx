import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/prescribed-information-deposit-deadline' },
  title: 'You Protected The Deposit. That Is Only Half The Duty. | Lexalytic',
  description: 'Protecting the deposit and never serving the prescribed information is a breach carrying the same penalty as never protecting it at all. Around two in five landlords are caught by it.',
  openGraph: {
    title: 'You Protected The Deposit. That Is Only Half The Duty.',
    description: 'Protecting the deposit and never serving the prescribed information is a breach carrying the same penalty as never protecting it at all. Around two in five landlords are caught by it.',
    url: 'https://www.lexalytic.com/blog/prescribed-information-deposit-deadline',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "You Protected The Deposit. That Is Only Half The Duty.",
  "description": "Protecting the deposit and never serving the prescribed information is a breach carrying the same penalty as never protecting it at all. Around two in five landlords are caught by it.",
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
    "@id": "https://www.lexalytic.com/blog/prescribed-information-deposit-deadline"
  },
  "inLanguage": "en-GB",
  "articleSection": "Property"
}

export default function BlogPost() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber-text)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Property</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 7 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>You Protected The Deposit. That Is Only Half The Duty.</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most landlords know about the thirty days. Money arrives, it goes into a scheme, the certificate comes back, job done. The second duty, which has the same deadline and the same penalty, is the one that gets missed, and it gets missed because protecting the deposit feels like the whole task.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The two duties, and why only one of them feels like a duty</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Section 213 of the Housing Act 2004 requires the deposit to be protected in one of three approved schemes within thirty days of receipt. Section 213(6) separately requires the prescribed information to be given to the tenant within the same thirty days. Protecting the money produces a certificate and a confirmation email, so it feels complete. Serving the information produces nothing unless you keep a copy yourself, so it feels optional. It is not, and a landlord who did the first and not the second is in the same position as one who did neither.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The clock starts earlier than people think</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Thirty days from receipt of the money. Not from the tenancy start, not from when the tenant moved in, not from when the agreement was signed. A deposit paid on the first of March for a tenancy starting on the fifteenth must be protected by the thirty first of March. Where a holding deposit converts into a tenancy deposit, the clock generally started when the holding deposit arrived, which is often weeks before anybody was thinking about protection.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Renewals are the trap almost nobody sees</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A deposit protected properly in 2022 can be non compliant because of a renewal in 2024. Where a renewal creates a new fixed term, the deposit may be treated as received again, restarting both clocks. Some schemes handle this automatically and some do not, and whether it applies at all depends on how the renewal was documented. The point is not that every renewal creates a breach. It is that a landlord who renewed without thinking about it has no idea either way, and that is a poor position to be in when somebody asks.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Six years is a long time to keep an email</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A tenant has six years from the end of the tenancy to bring a claim. The burden of proving the deposit was protected in time, and that the information was served in time, sits with the landlord. Six years later the scheme confirmation has gone from an old inbox, the covering letter was never saved, and the tenant only has to say they do not recall receiving anything. The evidence problem is often worse than the compliance problem.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What a breach actually costs</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A court can order between one and three times the deposit, at its discretion, on top of returning or protecting the deposit itself. First breaches that were put right promptly tend toward the lower end and deliberate or repeated failures toward the upper. On a typical deposit of around twelve hundred pounds that is somewhere between twelve hundred and thirty six hundred per tenancy. A landlord with six properties who never served the information on any of them is looking at a five figure number.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>And the cap, which is a separate rule entirely</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Under the Tenant Fees Act 2019 a deposit cannot exceed five weeks rent, or six weeks where annual rent is fifty thousand pounds or more. Anything above that is a prohibited payment and has to be returned. It is easy to breach by accident where rent was agreed monthly and the deposit was set at a round number, because five weeks is not the same as a month and a bit.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Checking what you actually have</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free deposit protection checker takes the dates for each tenancy and works out whether each duty was met inside the window, including renewals and the cap. It also shows which historic tenancies are still inside the six year claim window and which are not, because a breach nobody can claim on is history rather than exposure. It runs in your browser and nothing is uploaded.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Two duties, one deadline, the same penalty</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free checker for the thirty day rule, the prescribed information and the renewals that restart the clock.</p>
            <Link href="/tools/deposit-protection-check" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check your tenancies</Link>
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
