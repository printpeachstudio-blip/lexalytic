import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/hmo-licence-compliance-uk' },
  title: 'HMO Licence Compliance for UK Landlords - What You Need to Track and When | Lexalytic',
  description: 'HMO licence compliance in the UK involves more ongoing obligations than most landlords realise. Here is what needs tracking and how to avoid the costly surprises.',
  openGraph: {
    title: 'HMO Licence Compliance for UK Landlords - What You Need to Track and When',
    description: 'HMO licence compliance in the UK involves more ongoing obligations than most landlords realise. Here is what needs tracking and how to avoid the costly surprises.',
    url: 'https://www.lexalytic.com/blog/hmo-licence-compliance-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  return (
    <div style={background: 'var(--bg)', minHeight: '100vh'}>
      <nav style={position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)'}>
        <div className="container" style={display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px'}>
          <Link href="/" style={fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em'}>Lex<span style={color: 'var(--amber)'}>alytic</span></Link>
          <div style={display: 'flex', gap: '24px', alignItems: 'center'} className="desktop-nav">
            <Link href="/" style={fontSize: '14px', color: 'var(--ink-3)'}>Home</Link>
            <Link href="/#services" style={fontSize: '14px', color: 'var(--ink-3)'}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={padding: '10px 20px', fontSize: '14px'}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)'}>
        <div className="container" style={maxWidth: '780px'}>
          <div style={display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap'}>
            <span style={fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px'}>Property</span>
            <span style={fontSize: '12px', color: 'var(--ink-4)'}>March 2027 · 8 min read</span>
          </div>
          <h1 style={fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em'}>HMO Licence Compliance for UK Landlords - What You Need to Track and When</h1>
          <div style={display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)'}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0} />
            <div>
              <a href="/about" style={fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none'}>Mihir Hindocha</a>
              <div style={fontSize: '13px', color: 'var(--ink-4)'}>Digital Studio Founder · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>
      <article style={padding: 'clamp(40px, 6vw, 80px) 0'}>
        <div className="container" style={maxWidth: '780px'}>
          <p style={fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px'}>Getting an HMO licence is the beginning, not the end. The licence comes with conditions - specific requirements about fire safety, gas and electrical certificates, maximum occupancy, room sizes, and facilities. These conditions need to be met continuously, not just at the point of application. Most HMO landlords who face enforcement action are not deliberately non-compliant. They simply lost track of which certificate expired when.</p>
          
          <div style={background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px'}>
            <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px'}>The certificates that expire</h2>
            <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0}>Every HMO needs an annual Gas Safety Certificate - it expires exactly 12 months after the last one and must be renewed before expiry, not after. The Electrical Installation Condition Report runs for five years for HMOs. Fire alarm service certificates are typically annual. Emergency lighting tests need recording monthly for self-testing systems. Each has a different expiry rhythm and a different consequence for missing it. A lapsed gas certificate is a criminal offence.</p>
          </div>
          <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px'}>What your specific licence conditions actually say</h2>
          <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px'}>Every HMO licence is issued with a schedule of conditions specific to that property. These are not generic requirements - they reflect the specific layout, occupancy, and risk profile of your property as assessed by the council. The starting point for compliance tracking is reading the conditions for each licence and listing every ongoing obligation explicitly, not assuming they are all the same.</p>
          <div style={display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start'}>
            <div style={flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px'}>
              <span style={color: 'var(--white)', fontWeight: '700', fontSize: '13px'}>3</span>
            </div>
            <div>
              <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px'}>Occupancy and room size compliance</h2>
              <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0}>HMO licences specify maximum occupancy per room and for the property as a whole. Since October 2018 the national minimum for a single adult is 6.51 square metres. Some councils have higher minimums. When a room changes occupant you need to verify the new arrangement still complies with the licence conditions. A room taken by two people instead of one may breach both the room size condition and the overall occupancy condition.</p>
            </div>
          </div>
          <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px'}>The practical tracking system</h2>
          <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px'}>A compliance tracker for an HMO licence needs to show every certificate and condition with its renewal date, a status showing current, due soon, or expired, and a record of the last inspection or renewal. The most useful version sends automatic reminders at 90 days, 30 days, and 7 days before expiry. A spreadsheet can do this with conditional formatting. A purpose-built tool does it automatically without anyone having to remember to look.</p>
          <div style={borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px'}>
            <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px'}>What happens when you breach a condition</h2>
            <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0}>The council can issue a financial penalty of up to £30,000 for breaches of HMO licence conditions. They can also revoke the licence. The Rent Repayment Order regime allows tenants to claim back up to 12 months of rent if the property was operating without a valid licence. The financial exposure from non-compliance is significantly larger than the cost of maintaining a proper tracking system.</p>
          </div>
          <div style={padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px'}>
            <h3 style={color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px'}>Want to talk through your situation?</h3>
            <p style={color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px'}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={fontSize: '15px', padding: '14px 28px'}>Book a free scoping call</Link>
          </div>
        </div>
      </article>
      <footer style={padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '40px'}>
        <div className="container" style={display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'}>
          <Link href="/" style={fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em'}>Lex<span style={color: 'var(--amber)'}>alytic</span></Link>
          <p style={fontSize: '13px', color: 'var(--ink-4)', margin: 0}>2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={fontSize: '13px', color: 'var(--ink-3)'}>Back to blog</Link>
        </div>
      </footer>
    </div>
  )
}
