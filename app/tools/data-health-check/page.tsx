import type { Metadata } from 'next'
import DataHealthChecker from './DataHealthChecker'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/data-health-check' },
  title: 'UK Business Data Checker | VAT, Company Numbers, Companies House | Lexalytic',
  description: 'Check a customer or supplier list against the things that break UK systems. VAT numbers against the HMRC checksum, company numbers that lost their leading zero, and which companies have dissolved, straight from the Companies House register. Plus fuzzy duplicates and a clean file back. Nothing uploaded except company numbers.',
  keywords: 'check VAT numbers bulk, validate company numbers UK, companies house bulk check dissolved, UK customer data validation, check supplier list companies house, VAT checksum validator, free data cleansing tool UK, find duplicate customers',
  openGraph: {
    title: 'Free UK Data Health Check | Lexalytic',
    description: 'Check a spreadsheet for the errors that break UK business systems. Free, runs in your browser, nothing uploaded.',
    url: 'https://www.lexalytic.com/tools/data-health-check',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UK Data Health Check',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool that checks a CSV of customer or supplier records for UK specific data quality problems including invalid postcodes, VAT numbers failing the HMRC mod-97 checksum, company numbers with stripped leading zeros, mixed date formats and duplicate records.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: {
    '@type': 'Organization',
    name: 'Lexalytic',
    url: 'https://www.lexalytic.com',
  },
  featureList: [
    'UK postcode format validation',
    'VAT number mod-97 checksum verification',
    'Company number leading zero detection',
    'Mixed date format detection',
    'Duplicate record and repeated email detection',
    'Runs entirely in the browser with no file upload',
  ],
}

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the data health check look for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "VAT numbers that fail the HMRC mod-97 checksum, company numbers where the leading zero has been stripped, mixed date formats in the same column, invalid UK postcodes, duplicate records, duplicate and disposable email addresses, stray whitespace and inconsistent phone formats."
      }
    },
    {
      "@type": "Question",
      "name": "Is my file uploaded anywhere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The entire check runs in your browser using JavaScript. The file never leaves your machine and we never see it, which is also why it works on a client list you would not be comfortable emailing."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Excel remove leading zeros from company numbers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because a UK company number like 01234567 looks like a number to Excel, so it drops the leading zero and stores 1234567. That fails validation against Companies House and breaks any lookup relying on an exact match. It happens silently on import and is one of the most common causes of a failed data migration."
      }
    }
  ]
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
      "name": "Free Tools",
      "item": "https://www.lexalytic.com/tools"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Free UK Data Health Check - Scan a Spreadsheet for Errors",
      "item": "https://www.lexalytic.com/tools/data-health-check"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DataHealthChecker />

      <section className="faq-visible" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(48px, 7vw, 72px) 0' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 32 }}>
            Questions
          </h2>
          {faqData.mainEntity.map((q: any) => (
            <div key={q.name} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 11 }}>{q.name}</h3>
              <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                {q.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="related-reading" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(40px, 6vw, 60px) 0' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 22 }}>
            Worth reading alongside this
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/excel-strips-leading-zeros-company-numbers" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              Why Excel Deletes the First Digit of Your Company Numbers
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/how-to-reduce-manual-data-entry-uk" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              How to Reduce Manual Data Entry in Your Business (UK Guide 2026)
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/find-duplicate-records-spreadsheet" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              How to Find Duplicate Records When They Are Spelled Differently
            </Link>
          </li>
          </ul>
        </div>
      </section>
    </>
  )
}
