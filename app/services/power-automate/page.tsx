import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  title: 'Power Automate Consultant UK | Microsoft 365 Workflow Automation | Lexalytic',
  description: 'Expert Power Automate development for UK businesses. Automate approvals, notifications, and data workflows across Microsoft 365. Free scoping call.',
  keywords: 'Power Automate consultant UK, Microsoft 365 automation, Power Automate developer London, workflow automation UK, Microsoft Flow consultant UK',
  openGraph: {
    title: 'Power Automate Consultant UK | Microsoft 365 Workflow Automation | Lexalytic',
    description: 'Automate your Microsoft 365 workflows with Power Automate.',
    url: 'https://lexalytic.com/services/power-automate',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '✅', title: 'Approval Workflows', desc: 'Automate sign-off processes across your organisation — purchase approvals, leave requests, document authorisation — with full audit trails and automatic escalation.' },
  { icon: '🔔', title: 'Automated Alerts & Notifications', desc: 'Trigger emails, Teams messages, or SMS alerts based on real business events — missed deadlines, threshold breaches, status changes — without anyone monitoring manually.' },
  { icon: '📥', title: 'Data Collection & Routing', desc: 'Automate the handling of form submissions, inbound emails, and documents — captured, categorised, and routed to the right place without manual intervention.' },
  { icon: '🔄', title: 'Cross-App Synchronisation', desc: 'Keep data consistent across Microsoft 365 — SharePoint, Teams, Outlook, Excel, Dataverse — automatically, so nothing falls through the cracks between systems.' },
  { icon: '📄', title: 'Document Generation & Filing', desc: 'Generate documents from templates, route them for signature, and file them automatically. No more manually creating, emailing, and chasing paperwork.' },
  { icon: '📊', title: 'Scheduled Reporting', desc: 'Trigger report generation and distribution automatically on a schedule — the right data lands in the right inboxes without anyone having to run it.' },
]

const faqs = [
  { q: 'Do we need a specific Microsoft licence for Power Automate?', a: 'Basic Power Automate flows are included with most Microsoft 365 business plans. Flows that connect to non-Microsoft systems require a paid Power Automate licence at around £12 per user per month. We will confirm exactly what you need during the scoping call.' },
  { q: 'Can Power Automate connect to systems outside Microsoft 365?', a: 'Yes. Power Automate has pre-built connectors for hundreds of third-party applications — Salesforce, Google Workspace, Slack, SAP, DocuSign, and many more. We will confirm compatibility with your specific systems during scoping.' },
  { q: 'How long do Power Automate projects take?', a: 'Most flows are delivered in 3-7 working days. Simple single-trigger automations are faster; multi-step conditional workflows with approvals and error handling take longer. You will get a clear timeline in your quote.' },
  { q: 'What happens if a workflow fails?', a: 'We build error handling and failure notifications into every workflow — so if something goes wrong, you are alerted immediately rather than finding out days later. Power Automate also has built-in run history so you can see exactly what happened.' },
  { q: 'Can we modify the workflows ourselves afterwards?', a: 'Yes. Power Automate has a visual, no-code interface that is genuinely manageable without technical knowledge. We will provide documentation and a walkthrough so your team can make straightforward changes independently.' },
  { q: 'Do you work with businesses outside London?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function PowerAutomatePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ServiceNav />

      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Power Automate Consultant UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Stop doing manually what<br /><em style={{ color: 'var(--amber)' }}>Microsoft 365 can do itself.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              If your team is manually routing emails, chasing approvals, copying data between apps, or filing documents by hand — Power Automate can handle all of it. We build the workflows, test them against your real processes, and hand them over ready to run.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '3-7', label: 'Days to delivery' }, { num: 'Free', label: 'Scoping call' }, { num: '48h', label: 'Quote turnaround' }].map((s, i) => (
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
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What we automate</span>
            <h2>Every repetitive Microsoft 365 task your team does by hand</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0' }}>If it involves clicking, copying, emailing, or filing inside Microsoft 365 — there is almost certainly a Power Automate flow that handles it.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {useCases.map((item, i) => (
              <div key={i} style={{ padding: '28px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '28px', marginBottom: '14px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--ink-3)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '80px', alignItems: 'start' }}>
            <div>
              <span className="section-label">What Power Automate actually does</span>
              <h2 style={{ marginBottom: '24px' }}>Most Microsoft 365 users are getting about 20% of what they are paying for</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                The vast majority of businesses using Microsoft 365 are still doing things manually that the platform could handle automatically. Emails getting manually forwarded to the right person. Approval requests being chased by hand. Documents being saved to SharePoint by someone who has to remember to do it. Forms being processed by a person who re-enters the data somewhere else.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                Power Automate is built into Microsoft 365. It can trigger actions based on almost any event — an email arriving, a form being submitted, a deadline being missed, a value changing in a spreadsheet — and connect those triggers to actions across hundreds of applications.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85' }}>
                The reason most businesses have not set it up is that building reliable flows requires understanding both the technical side and the business process. Most people in IT do not know the process well enough, while the people who know the process do not know the technical side. We bridge that gap.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '36px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--ink)' }}>Common processes we automate</h3>
                {[
                  'Purchase order approvals routed to the right person automatically',
                  'New client onboarding documents generated and sent without manual input',
                  'Leave requests processed and logged without HR involvement',
                  'Invoice data extracted from emails and entered into accounting software',
                  'Deadline alerts sent to the right people before things slip',
                  'Weekly reports generated and emailed without anyone running them',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: i < 5 ? '14px' : '0', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    <span style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginBottom: '8px' }}>Questions about Power Automate</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '40px', fontSize: '15px' }}>Anything not covered here — just ask us directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' : i === faqs.length - 1 ? '0 0 var(--radius) var(--radius)' : '0' }}>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'var(--sans)', fontWeight: '500', marginBottom: '10px' }}>{faq.q}</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Let Microsoft 365<br /><em style={{ color: 'var(--amber)' }}>do the repetitive work.</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us what your team does manually every day and we will show you what Power Automate can handle — and what it would cost.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Delivered in 3-7 days · Full documentation included</p>
        </div>
      </section>

      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/#services" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Services</Link>
            <Link href="/#pricing" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Pricing</Link>
            <Link href="/#contact" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Contact</Link>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
