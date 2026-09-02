import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/services/custom-business-tools' },
  title: 'Custom Business Tools UK | Bespoke CRM & Business App Development | Lexalytic',
  description: 'Bespoke business tools built around your exact processes. Custom CRMs, staff rotas, job trackers, client portals and more. Built once, owned by you. Fixed price, UK-based.',
  keywords: 'custom business tools UK, bespoke CRM UK, custom CRM small business UK, custom business software UK, bespoke business application UK, custom staff rota app UK, affordable custom software UK, spreadsheet consultant UK, excel spreadsheet services UK, excel specialists UK, excel spreadsheet for small business UK',
  openGraph: {
    title: 'Custom Business Tools UK | Bespoke CRM & Business App Development | Lexalytic',
    description: 'Bespoke business tools built around your exact processes — not adapted from generic software.',
    url: 'https://www.lexalytic.com/services/custom-business-tools',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '👥', title: 'Custom CRM Systems', desc: 'A CRM built around how your sales team actually works — not how Salesforce thinks they should work. Track clients, jobs, follow-ups, and revenue your way, with no monthly licence fees.' },
  { icon: '📅', title: 'Staff Rota & Scheduling Tools', desc: 'Custom shift rota applications that handle your specific staffing rules — covering requirements, availability tracking, automatic conflict detection, and instant visibility across the whole team.' },
  { icon: '📋', title: 'Job & Project Trackers', desc: 'Track every job from enquiry to completion — costs, milestones, documents, communications, and profitability — in a single tool built around your workflow.' },
  { icon: '🤝', title: 'Client Portals', desc: 'Give your clients a branded portal to view their projects, submit requests, access documents, and communicate with your team — without the complexity of enterprise software.' },
  { icon: '💰', title: 'Quoting & Estimating Tools', desc: 'Custom quoting systems that calculate correctly every time — applying your pricing logic, margin rules, and discount structures automatically, producing formatted quotes ready to send.' },
  { icon: '📦', title: 'Inventory & Stock Management', desc: 'Track stock levels, supplier orders, and fulfilment in a tool built around your product range and processes — not a generic inventory system you have to adapt to.' },
  { icon: '📊', title: 'Internal Dashboards & Reporting', desc: 'Management dashboards that show exactly the metrics your business needs — connected to your live data, updated automatically, accessible to the right people.' },
  { icon: '⚙️', title: 'Process Automation Tools', desc: 'Custom tools that automate your specific business processes — onboarding workflows, approval systems, document generation, notification triggers, and more.' },
]

const faqs = [
  { q: 'What kind of businesses do you build custom tools for?', a: 'Any UK business that has outgrown generic software or is managing critical processes in spreadsheets. We have built tools for businesses in healthcare, recruitment, construction, professional services, hospitality, and retail. If you have a process that needs a better system, we can build it.' },
  { q: 'How is this different from buying off-the-shelf software?', a: 'Off-the-shelf software is built for every business in your sector — which means it fits nobody perfectly. You pay ongoing licence fees, adapt your processes to fit the software, and live with features you do not need and missing features you do. A custom tool is built around exactly how your business works, costs once, and you own it outright.' },
  { q: 'How long does a custom business tool take to build?', a: 'It depends on the complexity. A straightforward single-process tool — a custom rota app, a simple CRM, a quoting system — can be delivered in 2-4 weeks. More complex multi-process applications take longer. Every project is scoped individually and you get a clear timeline and fixed price before any work begins.' },
  { q: 'Do we need any technical knowledge to use the tool?', a: 'No. We design every tool for the people who will use it daily — not for technical users. The interface is built around your team\'s existing workflow and language. Every tool comes with full documentation and a walkthrough so your team can use it confidently from day one.' },
  { q: 'What happens if we need changes after delivery?', a: 'We include a post-delivery support period with every project. For ongoing changes as your business evolves, our retainer plan gives you a monthly allocation of hours at a predictable cost. Because we built the tool, changes are faster and cheaper than they would be with a third party.' },
  { q: 'Can the tool connect to our existing systems?', a: 'In most cases yes. Custom tools can connect to your accounting software, CRM, existing spreadsheets, or other business systems via APIs. We confirm integration possibilities during the scoping call so there are no surprises.' },
]

export default function CustomBusinessToolsPage() {
  const structuredData = {"@context":"https://schema.org","@type":"Service","name":"Custom Business Tools","description":"Bespoke business tools built around your exact processes. Custom CRMs, staff rotas, job trackers, client portals and more. Built once, owned by you.","url":"https://www.lexalytic.com/services/custom-business-tools","provider":{"@type":"LocalBusiness","name":"Lexalytic","url":"https://www.lexalytic.com","address":{"@type":"PostalAddress","addressLocality":"Bushey","addressRegion":"Hertfordshire","addressCountry":"GB"}},"areaServed":"GB","serviceType":"Data Automation"}

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What kind of businesses do you build custom tools for?","acceptedAnswer":{"@type":"Answer","text":"Any UK business that has outgrown generic software or is managing critical processes in spreadsheets. We have built tools for businesses in healthcare, recruitment, construction, professional services, hospitality, and retail."}},{"@type":"Question","name":"How is this different from buying off-the-shelf software?","acceptedAnswer":{"@type":"Answer","text":"Off-the-shelf software is built for every business in your sector. A custom tool is built around exactly how your business works, costs once, and you own it outright with no monthly licence fees."}},{"@type":"Question","name":"How long does a custom business tool take to build?","acceptedAnswer":{"@type":"Answer","text":"A straightforward single-process tool can be delivered in 2-4 weeks. More complex multi-process applications take longer. Every project is scoped individually with a clear timeline and fixed price before any work begins."}},{"@type":"Question","name":"Can you build a custom CRM instead of using Salesforce or HubSpot?","acceptedAnswer":{"@type":"Answer","text":"Yes. A custom CRM built around your exact sales process typically costs less over three years than a Salesforce or HubSpot subscription, and works better from day one because it fits your workflow exactly."}}]}' }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ServiceNav />

      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Custom Business Tools UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Generic software does not fit your business.<br /><em style={{ color: 'var(--amber)' }}>A custom tool does.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              Every business has processes that do not quite fit the software available. Instead of adapting your business to generic tools — or running everything in spreadsheets — we build bespoke tools that work exactly the way you do. Built once. Owned by you. No monthly licence fees.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: 'Bespoke', label: 'Built around your processes' }, { num: 'Free', label: 'Scoping call' }, { num: 'Fixed', label: 'Price before we start' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--white)', lineHeight: '1' }}>{s.num}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">Why custom?</span>
            <h2 style={{ marginBottom: '20px' }}>Off-the-shelf software is built for everyone. That means it fits nobody perfectly.</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '40px' }}>
              Every generic CRM, rota tool, or job management system was built for the average business in your sector — not your specific business. You end up paying monthly fees, adapting your processes to fit the software, and working around the features it does not have. A custom tool flips this entirely. Your processes. Your terminology. Your rules. Built once and owned outright.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
              {[
                { label: 'Off-the-shelf', points: ['Monthly licence fees forever', 'Built for average businesses', 'Adapt your processes to fit the tool', 'Pay for features you never use', 'Missing features you actually need', 'Dependent on vendor decisions'], bad: true },
                { label: 'Custom built', points: ['One-time cost, you own it', 'Built around your exact processes', 'Works the way your business works', 'Only the features you actually need', 'Add anything you need later', 'You control the roadmap'], bad: false },
              ].map((col, i) => (
                <div key={i} style={{ padding: '24px', background: col.bad ? 'var(--bg)' : 'var(--ink)', borderRadius: 'var(--radius-lg)', border: col.bad ? '1px solid var(--border)' : '2px solid var(--amber)' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: col.bad ? 'var(--ink-3)' : 'var(--amber)', marginBottom: '16px' }}>{col.label}</div>
                  {col.points.map((point, j) => (
                    <div key={j} style={{ display: 'flex', gap: '10px', marginBottom: j < col.points.length - 1 ? '10px' : '0', alignItems: 'flex-start' }}>
                      <span style={{ color: col.bad ? '#ef4444' : 'var(--amber)', flexShrink: 0, fontSize: '12px', marginTop: '2px' }}>{col.bad ? '✗' : '✓'}</span>
                      <span style={{ fontSize: '13px', color: col.bad ? 'var(--ink-3)' : 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>{point}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What we build</span>
            <h2>Custom tools for every business process</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0' }}>If you can describe the process, we can build the tool. Here are the most common types of custom business tools we deliver.</p>
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
              <span className="section-label">How it works</span>
              <h2 style={{ marginBottom: '24px' }}>You describe the process. We build the tool.</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                The starting point is always the same — a conversation about how your business actually works. Not what software you use today, but what process you are trying to run, what information you need to track, and what the output needs to look like.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                From that conversation we scope exactly what needs to be built — the data structure, the user interface, the logic, the inputs and outputs — and give you a fixed price and timeline before any work begins.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85' }}>
                The build happens iteratively — you see progress as it develops and can give feedback before the final handover. Every tool comes with full documentation and a walkthrough so your team can use it from day one without needing us to be involved.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '36px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '20px', color: 'var(--ink)' }}>Our process</h3>
                {[
                  { step: '1', title: 'Free scoping call', desc: 'Tell us your process — what you track, what decisions you make, what the output needs to look like. 30 minutes, no commitment.' },
                  { step: '2', title: 'Scope and fixed price', desc: 'We come back with a clear scope, exact price, and delivery timeline. You decide whether to proceed.' },
                  { step: '3', title: 'Build and review', desc: 'We build iteratively — you see progress and give feedback before final delivery.' },
                  { step: '4', title: 'Handover and training', desc: 'Full handover with documentation. Your team can use it independently from day one.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < 3 ? '20px' : '0', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: 'white', flexShrink: 0 }}>{item.step}</div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Client result</span>
            <h2 style={{ marginBottom: '8px' }}>Independent Pharmacy: locum management from chaos to clarity</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '36px', fontSize: '15px' }}>Healthcare · Independent Pharmacy</p>
            <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The situation</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>Managing 20+ locum pharmacists across shifting rotas with no central system. Payment dates, hours worked, and rates were tracked across separate spreadsheets — payments were frequently late or incorrect, and scheduling clashes went unnoticed.</p>
              </div>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'rgba(193,125,46,0.04)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A fully custom locum management tool with a simple input form for logging shifts and rates. The system calculates pay automatically, highlights payment due dates in red, flags scheduling conflicts, and keeps a complete record of every shift and payment.</p>
              </div>
              <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: '0', label: 'Missed payments since launch' }, { num: '100%', label: 'Scheduling conflicts caught automatically' }, { num: 'Minutes', label: 'Admin per week instead of hours' }].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', lineHeight: '1' }}>{s.num}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ink-3)', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginBottom: '8px' }}>Questions about custom business tools</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '40px', fontSize: '15px' }}>Anything not covered here — just ask us directly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg)', border: '1px solid var(--border)', borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' : i === faqs.length - 1 ? '0 0 var(--radius) var(--radius)' : '0' }}>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Have a process that needs<br /><em style={{ color: 'var(--amber)' }}>a proper tool?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Describe your process and we will tell you exactly what a custom tool would look like — and what it would cost to build it.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
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
    </>
  )
}
