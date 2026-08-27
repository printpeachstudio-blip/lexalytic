import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/services/power-bi' },
  title: 'Power BI Dashboard Consultant UK | Fixed Price | Lexalytic',
  description: 'Expert Power BI dashboard development for UK businesses. Live KPI tracking, automated reporting, and real-time business intelligence. Free 30-minute scoping call.',
  keywords: 'Power BI consultant UK, Power BI dashboard service UK, Power BI developer UK, business intelligence consultant UK, Power BI small business UK, dashboard excel UK, excel reporting dashboard, create dashboard in excel, excel dashboard design UK, building dashboards in excel',
  openGraph: {
    title: 'Power BI Dashboard Consultant UK | Fixed Price | Lexalytic',
    description: 'Bespoke Power BI dashboards built for your business. Live data, automated reporting, fixed price scoped before work begins.',
    url: 'https://www.lexalytic.com/services/power-bi',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '📊', title: 'Financial Reporting Dashboards', desc: 'Replace monthly manual reporting with a live P&L, cashflow, and budget vs actuals dashboard your Finance Director can open in one click — updated in real time, no spreadsheet required.' },
  { icon: '⚙️', title: 'Operations & Production', desc: 'Real-time visibility into output, capacity, quality, and efficiency across one site or many. Stop waiting for yesterday\'s numbers.' },
  { icon: '🎯', title: 'Sales & Pipeline Tracking', desc: 'Connect your CRM and show revenue, conversion rates, pipeline health, and individual team performance in a single live view.' },
  { icon: '👥', title: 'HR & Workforce Analytics', desc: 'Headcount, absence, turnover, and cost — presented clearly for board-level decisions without manual compilation.' },
  { icon: '📦', title: 'Supply Chain & Inventory', desc: 'Track stock levels, supplier performance, and fulfilment in real time. No more manual spreadsheet updates before the morning meeting.' },
  { icon: '🏗️', title: 'Project Profitability', desc: 'See which projects, clients, and teams are actually profitable. Make resourcing decisions with real data, not instinct.' },
]

const faqs = [
  { q: 'How long does a Power BI dashboard take to build?', a: 'Most dashboards are delivered within 5-10 working days from the scoping call. Simple single-source dashboards can be faster; multi-system builds with complex data modelling take a little longer. You will always get a clear timeline before any work begins.' },
  { q: 'Do we need Power BI Pro licences?', a: 'To share dashboards across your organisation, you will need Power BI Pro licences at around £8.40 per user per month from Microsoft. We will advise on the most cost-effective setup for your team during the scoping call.' },
  { q: 'Can you connect Power BI to our existing systems?', a: 'Yes. Power BI connects to hundreds of data sources — Excel, SQL, Salesforce, Xero, QuickBooks, SharePoint, Google Sheets, and many more. We confirm compatibility during the scoping call so there are no surprises.' },
  { q: 'Will our team be able to use it without training?', a: 'That is the goal. We design dashboards for the people who will use them daily, not just the person who commissioned them. Every project includes a full handover walkthrough and documentation.' },
  { q: 'What if our data is messy?', a: 'Most clients come to us with imperfect data — that is normal, not a blocker. Data cleaning and transformation is built into the process. We will flag any structural issues during scoping that need addressing first.' },
  { q: 'Do you work with businesses outside London?', a: 'Yes — we work with businesses across the UK and internationally. Everything is delivered remotely. Location has never been an issue for any of our clients.' },
]

export default function PowerBIPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Power BI Consultant UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Power BI dashboards that show you<br /><em style={{ color: 'var(--amber)' }}>what is actually happening.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              Most businesses are making decisions from data that is days old, manually compiled, and nobody fully trusts. We build live Power BI dashboards connected to your real data — so you see what is happening now, not what happened last Tuesday.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '5-10', label: 'Days to delivery' }, { num: 'Free', label: 'Scoping call' }, { num: '48h', label: 'Quote turnaround' }].map((s, i) => (
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
            <span className="section-label">The problem we solve</span>
            <h2 style={{ marginBottom: '20px' }}>Your data exists. You just cannot see it when you need it.</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '48px' }}>
              The data is there — in your accounting software, your CRM, your spreadsheets. The problem is that pulling it together takes hours, it is out of date by the time it is ready, and the numbers change depending on who runs the report. Power BI fixes all three.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
              {[
                'Monthly reports that take a full day to compile',
                'Numbers that differ depending on who runs them',
                'No live view of sales, ops, or cashflow',
                'Board packs put together the night before',
                'Decisions based on instinct rather than data',
                'Spreadsheets that do not talk to each other',
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px 20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '14px', color: 'var(--ink-2)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--amber)', fontWeight: '600', flexShrink: 0 }}>✗</span>{item}
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
            <h2>Power BI dashboards for every part of your business</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '560px', margin: '16px auto 0' }}>Every dashboard is built to your data, your terminology, and your decisions — not a generic template.</p>
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
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <span className="section-label">What good looks like</span>
            <h2 style={{ marginBottom: '24px' }}>A Power BI dashboard should answer questions, not create new ones</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
              The most common complaint I hear about Power BI dashboards is that they look impressive but nobody uses them. Usually the reason is the same: the dashboard was built around the data that was available, not the decisions that actually needed to be made. Charts for the sake of charts. Numbers without context. Filters that nobody knows how to use.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>
              Before writing a single line of DAX, the most important conversation is about what decisions the dashboard needs to support. Who opens it and what question are they trying to answer? What does a good week look like versus a bad one? What do they need to see to know whether to act?
            </p>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '40px' }}>
              That conversation shapes everything — what data we connect, how we model it, what we surface on the main view, and what we put behind a filter. The result is a dashboard your team actually opens because it tells them something useful, not one that gets forgotten after the first week.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
              {[
                { label: 'Built around your decisions', desc: 'We start with what you need to know, then work backwards to the data — not the other way round.' },
                { label: 'Designed for daily use', desc: 'Dashboards your team opens every morning because they are genuinely useful, not because someone said they should.' },
                { label: 'Connected to live data', desc: 'Updated automatically from your actual systems — not a static screenshot of last month.' },
                { label: 'Handed over properly', desc: 'With training, documentation, and the confidence to use it independently from day one.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '20px 24px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--ink)', marginBottom: '8px' }}>{item.label}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">How it works</span>
            <h2 style={{ color: 'var(--white)' }}>From scoping call to live dashboard in under two weeks</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { num: '01', title: 'Free scoping call', desc: 'Tell us what decisions you need to make and what data you have. 30 minutes, no commitment, no sales pitch.' },
              { num: '02', title: 'Fixed quote in 48 hours', desc: 'We come back with a clear scope, exact price, and delivery timeline. You decide whether to proceed — no pressure.' },
              { num: '03', title: 'We build it', desc: 'We connect your data, build the model, and design the dashboard against your real data — not dummy data.' },
              { num: '04', title: 'Handover and training', desc: 'Full walkthrough so your team can use it from day one. Documentation included. Ongoing support available.' },
            ].map((step, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '36px 28px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2.5rem', color: 'rgba(193,125,46,0.4)', marginBottom: '16px', lineHeight: '1' }}>{step.num}</div>
                <h3 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.7' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Client result</span>
            <h2 style={{ marginBottom: '8px' }}>Month-end reconciliation: 2 days to 20 minutes</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '36px', fontSize: '15px' }}>Finance and Accounting · Finance Director</p>
            <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The situation</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>Every month-end, the Finance Director spent two full days manually reconciling data across three separate systems. The process was slow, error-prone, and meant the team was always behind on the analysis that actually mattered.</p>
              </div>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'var(--amber-bg)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we built</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>A Power BI dashboard connected to all three systems — pulling data automatically, reconciling it, and flagging any discrepancies. The Finance Director now opens one screen and sees everything, live.</p>
              </div>
              <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: '20 min', label: 'Down from 2 full days' }, { num: '0', label: 'Manual data entry' }, { num: '100%', label: 'Discrepancies auto-flagged' }].map((s, i) => (
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
            <h2 style={{ marginBottom: '8px' }}>Questions about our Power BI service</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>
            See your business clearly.<br /><em style={{ color: 'var(--amber)' }}>In real time.</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>
            Book a free 30-minute call. We will look at your data, tell you exactly what is possible, and give you a fixed price before you commit to anything.
          </p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Delivered in 5-10 days · Full documentation included</p>
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
