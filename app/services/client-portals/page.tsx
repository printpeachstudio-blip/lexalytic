import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/services/client-portals' },
  title: 'Client Portal Development UK | Secure Client Portals for Professional Services | Lexalytic',
  description: 'Bespoke client portals for UK accountants, bookkeepers, solicitors, mortgage brokers and financial advisers. Clients upload documents, sign agreements, see what is outstanding and pay invoices - under your brand. Fixed price.',
  keywords: 'client portal UK, client portal for accountants UK, secure client portal UK, document sharing portal UK, client portal small business UK, bespoke client portal UK, client portal financial services UK, accountant client portal UK, solicitor client portal UK',
  openGraph: {
    title: 'Client Portal Development UK | Lexalytic',
    description: 'Secure, branded client portals for UK professional services firms. Fixed price. Built around how your firm works.',
    url: 'https://www.lexalytic.com/services/client-portals',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '📁', title: 'Document Collection', desc: 'Clients upload payslips, bank statements, invoices, ID documents, or whatever your firm needs - directly into their portal. No more email attachments, no more chasing, no more searching your inbox for the right version.' },
  { icon: '✍️', title: 'E-Signatures and Approvals', desc: 'Send engagement letters, terms of business, or any document for electronic signature. Clients sign directly in the portal. You get notified instantly. No printing, scanning, or posting.' },
  { icon: '💳', title: 'Invoice and Payment', desc: 'Issue invoices directly in the portal and collect payment online. Clients see what is outstanding and pay without calling your office. Reduces debtor days and eliminates the awkward payment conversation.' },
  { icon: '📋', title: 'Outstanding Items Tracker', desc: 'Clients see exactly what you need from them and when - a clear list of outstanding documents and actions. Reduces the number of chasing emails you send and makes the client feel informed rather than harassed.' },
  { icon: '💬', title: 'Secure Messaging', desc: 'Communicate with clients through the portal rather than unencrypted email. Message history is attached to the client record. Nothing gets lost in a personal inbox or missed when a team member is on leave.' },
  { icon: '🏷️', title: 'Your Branding Throughout', desc: 'The portal carries your firm name, logo, and colours. Clients see a professional, branded environment that reflects your firm - not a generic third-party platform. Strengthens trust and looks more professional than shared folders.' },
]

const whoFor = [
  { type: 'Accountants and bookkeepers', detail: 'Collect self-assessment documents, payroll information, bank statements, and receipts without email chaos. Issue engagement letters for signature. Send invoices. All in one place your clients actually use.' },
  { type: 'Mortgage brokers and IFAs', detail: 'Collect payslips, bank statements, proof of address, and identification securely. Share illustration documents and suitability letters for review. Collect e-signatures on compliance documents.' },
  { type: 'Solicitors and conveyancers', detail: 'Share matter updates, collect client verification documents, issue invoices for disbursements, and collect e-signatures on key documents without relying on email or physical post.' },
  { type: 'Letting agents', detail: 'Collect tenant references, right to rent documents, and signed tenancy agreements. Share property inspection reports. Manage landlord and tenant communications in separate, organised portals.' },
  { type: 'Consultants and agencies', detail: 'Share deliverables, collect approvals, track outstanding feedback, issue invoices, and maintain a clear record of every client interaction - without relying on email threads that get impossible to follow.' },
]

const faqs = [
  { q: 'How is a bespoke client portal different from using a platform like TaxDome or Clio?', a: 'Platforms like TaxDome and Clio are built for the average firm and require you to adapt your workflow to fit their structure. A bespoke portal is built around exactly how your firm works - your document types, your client journey, your terminology. It also carries your own branding rather than showing a third-party platform name to your clients. And there is no ongoing licence fee - you own it outright.' },
  { q: 'How secure is a bespoke client portal?', a: 'We build client portals with bank-level encryption in transit and at rest, role-based access controls so clients only see their own information, and full audit logs of every action. The security specification is agreed as part of the scoping process and documented before any build begins.' },
  { q: 'Can the portal connect to our existing software?', a: 'In most cases yes. We can connect the portal to your accounting software, CRM, practice management system, or other tools via API. The integrations available depend on what you use - we confirm this during the scoping call.' },
  { q: 'How long does it take to build?', a: 'A standard client portal with document collection, e-signatures, invoicing, and secure messaging typically takes four to eight weeks from brief to delivery. More complex portals with deeper integrations take longer. You get a fixed timeline and price before any work begins.' },
  { q: 'What happens if we need changes after launch?', a: 'Every project includes a post-delivery support period. For ongoing development as your requirements evolve, a monthly retainer gives you a predictable allocation of hours. Because we built it, changes are faster and cheaper than they would be with a third party.' },
  { q: 'How do clients access the portal?', a: 'Clients access the portal via a web browser - no app to download, no software to install. They log in with a secure link sent by email or with credentials you set up for them. The interface is designed to be straightforward enough that clients of any technical level can use it without support from your team.' },
]

export default function ClientPortalsPage() {
  const structuredData = {"@context":"https://schema.org","@type":"Service","name":"Client Portal Development UK","description":"Bespoke client portals for UK professional services firms. Document collection, e-signatures, invoicing and secure messaging - under your brand.","url":"https://www.lexalytic.com/services/client-portals","provider":{"@type":"LocalBusiness","name":"Lexalytic","url":"https://www.lexalytic.com","address":{"@type":"PostalAddress","addressLocality":"Bushey","addressRegion":"Hertfordshire","addressCountry":"GB"}},"areaServed":"GB","serviceType":"Custom Software"}

  const faqStructured = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqs.map(f => ({"@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))}

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructured) }} />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <ServiceNav />

        <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '760px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Client Portal Development UK</span>
              </div>
              <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
                Client portals that replace<br /><em style={{ color: 'var(--amber)' }}>the email chain entirely.</em>
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
                We build secure, branded client portals for UK professional services firms. Your clients upload documents, sign agreements, see what is outstanding, and pay invoices - in one place, under your brand. Built once. Owned by you. No monthly licence fees.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
                <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
              </div>
              <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: 'Your Brand', label: 'Not a third-party platform' }, { num: 'Fixed', label: 'Price before we start' }, { num: 'Owned', label: 'By you outright' }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', lineHeight: '1' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <span className="section-label">The problem</span>
            <h2 style={{ maxWidth: '600px', marginBottom: '24px' }}>Email is not a client management system.</h2>
            <p style={{ color: 'var(--ink-3)', fontSize: '17px', maxWidth: '640px', lineHeight: '1.8', marginBottom: '64px' }}>
              Most professional services firms manage client document exchange through email. Documents arrive as attachments. Requests get buried in threads. Signed agreements sit in sent folders. Chasing outstanding items means writing the same email for the hundredth time. The typical UK accounting practice wastes 15 to 20 hours per week per team member on avoidable admin that a proper client portal eliminates.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '2px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {useCases.map((u, i) => (
                <div key={i} style={{ background: 'var(--bg)', padding: '32px', transition: 'background 0.2s' }}>
                  <div style={{ fontSize: '28px', marginBottom: '16px' }}>{u.icon}</div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '10px', fontWeight: '600' }}>{u.title}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <span className="section-label">Who it is for</span>
            <h2 style={{ maxWidth: '520px', marginBottom: '48px' }}>Built for UK professional services firms.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {whoFor.map((w, i) => (
                <div key={i} style={{ padding: '28px 32px', background: 'var(--white)', borderBottom: i < whoFor.length - 1 ? '1px solid var(--border)' : 'none', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px', alignItems: 'start' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', color: 'var(--ink)' }}>{w.type}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{w.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
          <div className="container" style={{ maxWidth: '780px' }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Why bespoke</span>
            <h2 style={{ color: 'var(--white)', marginBottom: '40px' }}>Why not just use TaxDome or Clio?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '64px' }}>
              {[
                { point: 'You adapt to their structure, not yours', detail: 'Platforms like TaxDome and Karbon are built around the average firm. Your document types, your client journey, your approval process - they probably do not match the template exactly, which means workarounds from day one.' },
                { point: 'Your clients see their brand, not yours', detail: 'Most portal platforms show their own name and interface to your clients. A bespoke portal carries your firm name, your logo, your colours throughout. It looks like something you built, because you did.' },
                { point: 'Monthly fees that compound over years', detail: 'TaxDome, Karbon, and Clio all charge per user per month. Over three years, a five-person firm typically pays £8,000 to £20,000 in licence fees. A bespoke portal costs once and is owned outright.' },
                { point: 'Complexity you will never use', detail: 'The all-in-one platforms are full of features built for every possible firm. Setting up only what you need takes weeks and the features you do not need clutter the interface permanently. A bespoke portal has exactly what you need and nothing else.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '28px 32px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--white)', marginBottom: '10px' }}>{item.point}</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7' }}>{item.detail}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '720px' }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginBottom: '48px' }}>Common questions.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {faqs.map((f, i) => (
                <div key={i} style={{ padding: '28px 32px', borderBottom: i < faqs.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--white)' }}>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '10px', color: 'var(--ink)' }}>{f.q}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(60px, 8vw, 80px) 0', background: 'var(--ink)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready to stop managing clients through email?</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '16px', marginBottom: '36px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us how your firm currently handles client document exchange and we will tell you exactly what a bespoke portal would cost and how long it would take.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 32px' }}>Book a free scoping call →</Link>
          </div>
        </section>
      </div>
    </>
  )
}
