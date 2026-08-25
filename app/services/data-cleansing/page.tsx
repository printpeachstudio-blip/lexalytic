import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  title: 'Data Cleansing Service UK | Fix Bad Data Fast | Lexalytic',
  description: 'Professional data cleansing for UK businesses. We clean, structure and standardise your data so your reports are accurate and your automation actually works. Fixed price, fast delivery.',
  keywords: 'data cleansing UK, data cleaning service UK, fix bad data UK, data quality UK, data cleansing consultant UK, Excel data cleaning UK, database cleansing UK',
  openGraph: {
    title: 'Data Cleansing Service UK | Fix Bad Data Fast | Lexalytic',
    description: 'Professional data cleansing for UK businesses. Fix bad data fast so your reports are accurate and your automation works.',
    url: 'https://lexalytic.com/services/data-cleansing',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const useCases = [
  { icon: '🗂️', title: 'Duplicate Removal', desc: 'Identify and merge duplicate records across your datasets — customers entered twice, products with multiple codes, contacts duplicated across systems. Clean once, reliable forever.' },
  { icon: '📅', title: 'Date & Format Standardisation', desc: 'Dates in six different formats, phone numbers with and without country codes, postcodes in inconsistent cases. We standardise everything so your data behaves predictably.' },
  { icon: '🔗', title: 'Cross-System Reconciliation', desc: 'Data that lives in multiple systems and does not match up. We identify the discrepancies, resolve the conflicts, and set up processes to keep them in sync going forward.' },
  { icon: '🧹', title: 'Missing Data Handling', desc: 'Blank fields that break your reports and formulas. We identify what is missing, fill what can be inferred, flag what needs manual input, and validate what remains.' },
  { icon: '✅', title: 'Validation & Rules', desc: 'Build validation logic into your data entry process so bad data cannot enter the system in the first place. The right fix for recurring data quality problems.' },
  { icon: '📊', title: 'Pre-Automation Cleansing', desc: 'Before any automation project, we audit and clean the source data. Automation built on bad data produces wrong outputs fast. We fix the foundation first.' },
]

const faqs = [
  { q: 'How do I know if my data needs cleansing?', a: 'The most common signs are reports that produce different results depending on who runs them, formulas that break when data is updated, duplicate customers or records in your system, figures that do not reconcile between systems, and automation projects that fail because the data is inconsistent. If any of these sound familiar, a data audit will tell you exactly what needs fixing.' },
  { q: 'What tools do you use for data cleansing?', a: 'We use Power Query for Excel and Power BI data, Python with Pandas for large datasets and complex logic, and SQL for database-level cleansing. The right tool depends on where your data lives and the scale of the problem. We will tell you which approach makes sense for your situation during the scoping call.' },
  { q: 'Can you clean data in any format?', a: 'Yes — Excel, CSV, SQL databases, Google Sheets, and exports from most common business software including Xero, Sage, Salesforce, and HubSpot. If the data is accessible digitally, it can be cleaned.' },
  { q: 'Will the data stay clean after the project?', a: 'A one-time clean without fixing the process that created the bad data will accumulate problems again over time. We always recommend addressing the root cause — whether that is validation rules at the point of entry, integration between systems, or a structured data entry process — alongside the cleansing work itself.' },
  { q: 'How long does data cleansing take?', a: 'A single dataset with straightforward issues is typically delivered in 2-5 working days. Larger, more complex cleansing projects involving multiple systems or significant reconciliation work take longer. We scope every project and give a fixed price before any work begins.' },
  { q: 'Do you work remotely?', a: 'Yes — all work is delivered remotely. We work with businesses across the UK and internationally.' },
]

export default function DataCleansingPage() {
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
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>Data Cleansing Service UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              Bad data is costing you more<br /><em style={{ color: 'var(--amber)' }}>than you realise.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '600px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              Duplicate records. Inconsistent formats. Figures that do not reconcile. Bad data breaks reports, undermines automation, and costs UK businesses an average of 20% of their annual revenue. We fix it — fast, properly, and with a process to keep it clean.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
              <Link href="/#pricing" className="btn-secondary" style={{ color: 'rgba(255,255,255,0.65)', borderColor: 'rgba(255,255,255,0.15)' }}>See pricing →</Link>
            </div>
            <div style={{ marginTop: '60px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {[{ num: '2-5', label: 'Days to delivery' }, { num: 'Free', label: 'Scoping call' }, { num: '48h', label: 'Quote turnaround' }].map((s, i) => (
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
            <span className="section-label">Why it matters</span>
            <h2 style={{ marginBottom: '20px' }}>Automation built on bad data fails. Every time.</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '40px' }}>
              The most common reason an automation or reporting project underdelivers is not the tool — it is the data feeding into it. A Power BI dashboard connected to inconsistent data shows inconsistent numbers. An Excel automation built on duplicated records produces duplicated outputs. The fix is not a better tool. It is cleaner data.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
              {[
                'Reports that show different numbers depending on who runs them',
                'Duplicate customers, contacts, or records across systems',
                'Dates, postcodes, or values in inconsistent formats',
                'Figures that do not reconcile between your systems',
                'Automation that breaks because the source data changed format',
                'Decisions made on data nobody quite trusts',
              ].map((item, i) => (
                <div key={i} style={{ padding: '16px 20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '14px', color: 'var(--ink-2)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#ef4444', fontWeight: '600', flexShrink: 0 }}>✗</span>{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">What we fix</span>
            <h2>Data cleansing for every type of problem</h2>
            <p style={{ color: 'var(--ink-3)', marginTop: '16px', maxWidth: '520px', margin: '16px auto 0' }}>From a single messy spreadsheet to a full multi-system data quality project — scoped and priced before any work begins.</p>
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
              <span className="section-label">How we approach it</span>
              <h2 style={{ marginBottom: '24px' }}>Data cleansing is not glamorous. It is foundational.</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                Every automation project we build starts with a data audit. Before writing a single line of code or building a single query, we look at the source data and ask: is this clean enough to build on? In around half of all projects, the answer is no — and the cleansing work happens first.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '20px' }}>
                This is not a problem. It is just part of the process. A business that has been running for several years on manual data entry will almost always have inconsistencies that have built up over time. Cleaning them properly — once, with a structured approach — gives you a foundation that everything else can be built on reliably.
              </p>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85' }}>
                We use Power Query for Excel and Power BI data, Python for large datasets and complex logic, and SQL for database-level work. In every case the cleaning steps are documented so they can be reapplied automatically when new data arrives — not just done once and forgotten.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '36px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--ink)' }}>Our data cleansing process</h3>
                {[
                  { step: '1', text: 'Data audit — we assess the scale of the problem and identify exactly what needs fixing.' },
                  { step: '2', text: 'Fixed price quote — you know the full cost before any work begins.' },
                  { step: '3', text: 'Cleansing — we clean the data using the right tool for the job.' },
                  { step: '4', text: 'Validation — we check the output against your business rules to confirm it is correct.' },
                  { step: '5', text: 'Documentation and handover — we explain what was done and how to keep the data clean.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < 4 ? '16px' : '0', alignItems: 'flex-start' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: 'white', flexShrink: 0 }}>{item.step}</div>
                    <span style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.6', paddingTop: '4px' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', padding: '24px' }}>
                <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0, fontStyle: 'italic' }}>
                  Read our guide to <Link href="/blog/what-is-data-cleansing-uk" style={{ color: 'var(--amber)', textDecoration: 'none' }}>what data cleansing is and why it matters</Link> for UK businesses — including the real cost of bad data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <span className="section-label">Client result</span>
            <h2 style={{ marginBottom: '8px' }}>Hairdressing group: scattered data consolidated and working</h2>
            <p style={{ color: 'var(--ink-3)', marginBottom: '36px', fontSize: '15px' }}>Health & Beauty · Owner-managed business</p>
            <div style={{ background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>The situation</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>Financial data scattered across multiple disconnected spreadsheets. Inherited macros from a previous consultant that either failed entirely or took so long to run nobody used them. The owner had no reliable view of business performance.</p>
              </div>
              <div style={{ padding: '36px', borderBottom: '1px solid var(--border)', background: 'rgba(193,125,46,0.04)' }}>
                <h3 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>What we did</h3>
                <p style={{ color: 'var(--ink-2)', lineHeight: '1.8' }}>Full data cleanse and restructure across all spreadsheets — standardising formats, removing inconsistencies, and connecting the data properly. Then rebuilt every macro from scratch: faster, reliable, and documented so the team could understand and maintain it.</p>
              </div>
              <div style={{ padding: '36px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {[{ num: '100%', label: 'Macros rebuilt and working' }, { num: '1 file', label: 'Single source of truth' }, { num: '0', label: 'Manual reconciliation required' }].map((s, i) => (
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
            <h2 style={{ marginBottom: '8px' }}>Questions about data cleansing</h2>
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
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Not sure how clean<br /><em style={{ color: 'var(--amber)' }}>your data actually is?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. We will look at your data, tell you exactly what the quality issues are, and give you a fixed price to fix them before any work begins.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '16px' }}>Delivered in 2-5 days · Full documentation included</p>
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
