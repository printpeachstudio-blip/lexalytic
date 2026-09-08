import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/data-cleansing-services-uk-businesses' },
  title: 'Data Cleansing Services for UK Businesses - What Is Involved and What It Costs | Lexalytic',
  description: 'What data cleansing actually involves for UK businesses, what it costs, and how to know whether you need a service or can do it yourself.',
  openGraph: {
    title: 'Data Cleansing Services for UK Businesses - What Is Involved and What It Costs',
    description: 'What data cleansing actually involves for UK businesses, what it costs, and how to know whether you need a service or can do it yourself.',
    url: 'https://www.lexalytic.com/blog/data-cleansing-services-uk-businesses',
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
            <span style={fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px'}>Data Cleansing</span>
            <span style={fontSize: '12px', color: 'var(--ink-4)'}>February 2027 · 8 min read</span>
          </div>
          <h1 style={fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em'}>Data Cleansing Services for UK Businesses - What Is Involved and What It Costs</h1>
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
          <p style={fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px'}>Bad data is expensive in ways that are hard to see until something goes wrong. A marketing campaign sending to outdated email addresses. A financial report that does not reconcile because the underlying records are inconsistent. A customer service team working from records where the same customer appears three times with different spellings. Data cleansing is the process of fixing this - and the cost of not doing it is almost always higher than the cost of doing it properly.</p>
          
          <div style={background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px'}>
            <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px'}>What data cleansing actually involves</h2>
            <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0}>Data cleansing is not a single process. It is a collection of specific tasks applied to specific problems in your data. Deduplication - identifying and merging records for the same entity that appear multiple times. Standardisation - ensuring the same information is formatted consistently across all records. Validation - checking that data values are plausible and complete. Enrichment - filling gaps in existing records from secondary sources. The right combination depends on what problems your data actually has.</p>
          </div>
          <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px'}>How to diagnose your data problems</h2>
          <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px'}>Before commissioning a data cleanse, you need to understand what is wrong. The quickest diagnostic is to pull a sample of 100 records and review them manually. How many duplicates do you find? What proportion have missing fields? How many email addresses bounce when you test them? How many phone numbers are in different formats? This gives you a realistic picture of the scale of the problem and informs a much better brief for any external work.</p>
          <div style={display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start'}>
            <div style={flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px'}>
              <span style={color: 'var(--white)', fontWeight: '700', fontSize: '13px'}>3</span>
            </div>
            <div>
              <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px'}>What it costs to get it done professionally</h2>
              <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0}>Data cleansing costs depend on the size of the dataset, the complexity of the problems, and whether it involves manual review or can be automated. For a contact database of 5,000 records with standard deduplication and validation, expect to pay between £500 and £2,000 depending on the provider. For complex financial data requiring manual reconciliation across multiple systems, the cost scales with the time involved.</p>
            </div>
          </div>
          <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px'}>When to do it yourself</h2>
          <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px'}>Simple deduplication and standardisation of a well-structured dataset is something most businesses can do themselves with Power Query in Excel. Power Query has built-in functions for removing duplicates, standardising text case and formatting, and identifying missing values. For a dataset of up to 50,000 records with straightforward problems, a Power Query model built once can process the data in minutes and be rerun whenever new records are imported.</p>
          <div style={borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px'}>
            <h2 style={fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px'}>Making it stick after the cleanse</h2>
            <p style={fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0}>A data cleanse that is not followed by better data entry processes produces the same problems again within six months. The cleansing work is the correction. The process change is the prevention. Mandatory fields in your CRM. Dropdown selections instead of free text for standardised values. Import validation that checks new records against existing ones before they are added. These changes are the difference between a one-off fix and a sustained improvement.</p>
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
