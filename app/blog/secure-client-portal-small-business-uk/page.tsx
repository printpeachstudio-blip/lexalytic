import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/secure-client-portal-small-business-uk' },
  title: 'Secure Client Portal for UK Small Businesses - Do You Need One and What Should It Do | Lexalytic',
  description: 'A practical guide for UK small businesses on whether a client portal is worth building, what it should include, and what the alternatives cost over time.',
  openGraph: {
    title: 'Secure Client Portal for UK Small Businesses - Do You Need One and What Should It Do',
    description: 'Practical guide to client portals for UK small businesses. What to include, what it costs, and when to build versus buy.',
    url: 'https://www.lexalytic.com/blog/secure-client-portal-small-business-uk',
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Client Portals</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Secure Client Portal for UK Small Businesses - Do You Need One and What Should It Do</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most small businesses manage their client relationships through email. Documents arrive as attachments that get lost in threads. Requests go unanswered because they are buried three screens down. Signed agreements sit in sent folders with no clear record. A client portal fixes all of this - but whether you need one and what it should include depends on how your business actually works.</p>

          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What a client portal actually is</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A client portal is a secure, private online space where your clients log in to interact with your business. They can upload documents you have requested, download documents you have shared, see what is outstanding, sign agreements, receive invoices, and communicate with your team - all in one place, under your brand. Think of it as the client-facing layer of your business that replaces the email back-and-forth for anything document or approval related.</p>
          </div>

          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The businesses that need one most</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A client portal adds the most value when your client relationships involve a repeating pattern of document exchange. Accountants collecting self-assessment information. Mortgage brokers collecting payslips and bank statements. Solicitors sharing case updates and collecting verification documents. Financial advisers sharing suitability reports. Letting agents managing tenant references and signed agreements. If the same types of documents flow back and forth with clients on a regular basis, a portal makes that process faster, more reliable, and more professional. If your client interactions are primarily conversational with occasional document exchange, a portal is probably not worth the investment yet.</p>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>What it should and should not include</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The mistake most businesses make when specifying a client portal is including everything they might ever want rather than what clients will actually use. A portal with twenty features that clients ignore is worse than a portal with five features they use daily. The core four that almost every professional services firm needs: secure document upload and download, a clear outstanding items list that shows clients exactly what you need from them, e-signature for agreements, and invoice and payment. Secure messaging is worth adding if email communication with clients is a significant source of friction. Everything beyond these should be justified by a specific client behaviour you want to change.</p>
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The security question</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Security is the primary reason to move client document exchange off email. Unencrypted email is not an appropriate channel for sensitive financial or personal information. GDPR requires that personal data is handled securely, and a well-built client portal with encryption in transit and at rest, role-based access controls, and audit logging meets that requirement in a way that email does not. For businesses in regulated sectors - financial services, legal, healthcare - having a documented, auditable channel for client data exchange is not just good practice, it is increasingly an expectation from regulators and professional bodies.</p>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>5</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>Buy versus build</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Off-the-shelf portal platforms exist for most professional services sectors. The trade-off is always the same: the platform fits your needs approximately rather than exactly, clients see the platform branding rather than yours, and you pay ongoing licence fees indefinitely. A bespoke portal built around your specific workflow and branded to your firm costs more upfront but has no ongoing licence fee and does exactly what your business needs. For most businesses the crossover point - where a bespoke build becomes cheaper than cumulative licence fees - is somewhere between 18 and 30 months. Beyond that the bespoke option is almost always more cost-effective, and the fit is always better.</p>
            </div>
          </div>

          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>How to get the client adoption right</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The most common reason client portals fail is low adoption - clients continue using email because the portal feels like extra effort. The solution is making the portal the default and email the exception. When a new client is onboarded, the portal is introduced as how your firm works, not as an optional extra. Document requests go through the portal rather than email. Invoices are issued through the portal. The clients who resist initially usually come round once they experience the portal being easier than email for the things they do repeatedly. Keep the interface simple enough that a non-technical client can use it without calling your office.</p>
          </div>

          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through what a portal would look like for your business?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. We will tell you what makes sense for your specific client journey and what it would cost to build it properly.</p>
            <Link href="/services/client-portals" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>See our client portal service →</Link>
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
