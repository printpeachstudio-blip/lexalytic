import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/wedding-supplier-crm-uk' },
  title: 'Wedding Supplier CRM UK - What Small Businesses Actually Need to Track | Lexalytic',
  description: 'Client management for UK wedding suppliers. What to track, what tools exist, and when a simple custom solution beats an off-the-shelf CRM.',
  openGraph: {
    title: 'Wedding Supplier CRM UK - What Small Businesses Actually Need to Track',
    description: 'Client management for UK wedding suppliers. What to track, what tools exist, and when a simple custom solution beats an off-the-shelf CRM.',
    url: 'https://www.lexalytic.com/blog/wedding-supplier-crm-uk',
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Wedding Business</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>June 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Wedding Supplier CRM UK - What Small Businesses Actually Need to Track</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A wedding florist, photographer, or cake maker manages a surprisingly complex client lifecycle. Initial enquiry, quote, booking with deposit, design consultation, final details, delivery on the day, balance collection, review request. Each couple moves through these stages over 12 to 18 months. Losing track of what was agreed or what was paid is the kind of mistake that shows up on the day and cannot be recovered from.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The wedding supplier client lifecycle</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Unlike a service business with ongoing clients, a wedding supplier has a defined end point for each client relationship. The enquiry-to-booking conversion is the most important metric. The booking-to-delivery period is where most relationship management happens. The post-delivery period is where reviews and referrals come from. Pre-booking you need quick access to enquiry status. Post-booking you need a complete history of what was discussed and agreed.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What to track per client</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Every wedding supplier client record needs the event date prominently displayed - this is the hard deadline everything else is organised around. The venue. The contact details for both partners. The package agreed. The total amount, deposit paid, balance due date, and balance paid. Key decisions made in consultations. Any special requirements or sensitivities mentioned.</p>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>Why generic CRMs do not fit</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Salesforce and HubSpot are built around a sales pipeline where leads move forward or drop out. A wedding business does not work like this. Couples book and then stay as active clients for a year or more. The pipeline metaphor is wrong. What you need is more like a project management system with a timeline built around the event date, not a sales funnel. Repurposing a sales CRM for this creates friction because the system fights you every time.</p>
            </div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Simple tools that work</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Airtable is the tool most small wedding suppliers graduate to from spreadsheets. It is flexible enough to model the wedding supplier workflow without imposing a sales pipeline structure. You can build a view filtered by event date showing everything happening in the next 90 days. A view showing outstanding balances. A view for enquiry stage conversion tracking. It costs around £10 per month for a solo supplier.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The case for something custom</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A custom client management tool built specifically for your business handles your workflow without compromise. Your consultation questions captured in a form that populates the client record automatically. Automated reminder emails at the right points in the client timeline. Balance payment reminders sent 30 days before the event. Review request emails sent two weeks after. For a wedding supplier doing 40 or more events per year, the time saving justifies a bespoke build.</p>
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
