import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/excel-strips-leading-zeros-company-numbers' },
  title: 'Why Excel Deletes the First Digit of Your Company Numbers | Lexalytic',
  description: 'Excel strips leading zeros from anything it reads as a number, which quietly corrupts UK company registration numbers, sort codes and phone numbers. Here is why it happens and how to stop it.',
  openGraph: {
    title: 'Why Excel Deletes the First Digit of Your Company Numbers',
    description: 'Excel strips leading zeros from anything it reads as a number, which quietly corrupts UK company registration numbers, sort codes and phone numbers. Here is why it happens and how to stop it.',
    url: 'https://www.lexalytic.com/blog/excel-strips-leading-zeros-company-numbers',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Why Excel Deletes the First Digit of Your Company Numbers",
  "description": "Excel strips leading zeros from anything it reads as a number, which quietly corrupts UK company registration numbers, sort codes and phone numbers. Here is why it happens and how to stop it.",
  "datePublished": "2026-08-15",
  "dateModified": "2026-08-15",
  "author": {
    "@type": "Person",
    "name": "Mihir Hindocha",
    "url": "https://www.lexalytic.com/about",
    "jobTitle": "Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Lexalytic",
      "url": "https://www.lexalytic.com"
    },
    "knowsAbout": [
      "Business intelligence",
      "Data automation",
      "Custom software development",
      "Power BI",
      "Web development"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "BSc Financial Computing"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "Lexalytic",
    "url": "https://www.lexalytic.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.lexalytic.com/linkedin-banner.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.lexalytic.com/blog/excel-strips-leading-zeros-company-numbers"
  },
  "inLanguage": "en-GB",
  "wordCount": 1417,
  "articleSection": "Data Quality"
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Lexalytic",
      "item": "https://www.lexalytic.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.lexalytic.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Why Excel Deletes the First Digit of Your Company Numbers",
      "item": "https://www.lexalytic.com/blog/excel-strips-leading-zeros-company-numbers"
    }
  ]
}

export default function BlogPost() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Free Tools</Link>
            <Link href="/blog" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Blog</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data Quality</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 6 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>Why Excel Deletes the First Digit of Your Company Numbers</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A UK company number is eight digits. Open a supplier list in Excel and a fair proportion of them will be seven. Nobody deleted anything. Excel read 01234567, decided it was the number one million two hundred and thirty four thousand five hundred and sixty seven, and dropped the zero because numbers do not start with zero. The cell now reads 1234567 and every Companies House lookup you run against it will fail.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What is actually happening</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>When Excel opens a CSV it guesses the type of every column. A column containing only digits gets typed as a number, and numeric types have no concept of a leading zero because it carries no mathematical value. The zero is not hidden or formatted away, it is gone from the stored value. Reformatting the cell as text afterwards does not bring it back, because there is nothing left to reformat. This is not a bug and Microsoft will not fix it, because for genuine numbers the behaviour is correct.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Which UK fields this destroys</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Company registration numbers are the most damaging, because roughly a tenth of active UK companies have a number starting with zero and every one of them breaks. Sort codes lose their leading zero the same way, which matters a great deal more when you are running a payment file. Phone numbers stored without a country code lose the 0 that makes them dialable. Some postcodes survive because they contain letters, which is the only reason the column is typed as text and left alone.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why you often do not notice</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A seven digit company number still looks plausible. It is only wrong when something tries to use it, and the failure is usually silent. A Companies House API call returns a 404 rather than an error you would investigate. A credit check comes back with no match and gets recorded as a company with no filed accounts. A bank rejects a payment file and the finance team assumes the account details were wrong rather than the sort code. The problem surfaces weeks later as an unexplained data quality issue rather than as a formatting mistake made when a file was opened.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>How to stop it happening</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The reliable method is to never open the CSV in Excel by double clicking it. Instead open Excel first, then use Data, Get Data, From Text/CSV. That opens the Power Query import dialogue, which lets you set the column type to Text before anything is parsed. Once the file is imported correctly, save it as .xlsx rather than .csv, because a CSV has no type information and the next person to open it will hit exactly the same problem. If you are handed a file that has already lost its zeros, padding back to eight digits is usually safe for company numbers because the format is fixed, but it is guesswork for phone numbers and should not be done blind for sort codes.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Checking a file you have been given</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>If you have received a list from a client, a broker or a previous system, it is worth checking before you import it anywhere. Our free data health check reads a CSV in your browser and flags company numbers with fewer than eight digits as a critical finding, along with the other things that break quietly: VAT numbers that pass a format check but fail the HMRC checksum, columns holding both day-first and month-first dates, and postcodes in a format no lookup will match. Nothing is uploaded and it takes about a minute.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Check a file before you import it</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Our free data health check reads a CSV in your browser and reports the UK specific problems that break business systems. No signup, and the file never leaves your machine.</p>
            <Link href="/tools/data-health-check" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Run a free data health check</Link>
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
