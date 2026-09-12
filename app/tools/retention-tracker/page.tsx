import type { Metadata } from 'next'
import RetentionTracker from './RetentionTracker'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/retention-tracker' },
  title: 'Construction Retention Tracker | Free Tool for UK Subcontractors | Lexalytic',
  description: 'Free retention tracker built around JCT contracts. Tiered retention where the rate steps down, the cap on deduction, both release dates, and statutory interest on anything late. Plus the application letters, written from your figures. Nothing uploaded.',
  keywords: 'construction retention tracker UK, JCT retention release dates, stepped retention calculator, retention over-deduction cap, statutory interest late retention, retention application letter template, construction retention tracker, retention release dates, retention calculator UK, subcontractor retention, defects liability period tracker, retention not released, chase retention payment, construction retention cap',
  openGraph: {
    title: 'Construction Retention Tracker for UK Subcontractors',
    description: 'Retention is rarely disputed. It is forgotten. Track what is held across every job and when each half falls due.',
    url: 'https://www.lexalytic.com/tools/retention-tracker',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Construction Retention Tracker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK construction subcontractors to track retention held across multiple jobs, calculate first and final release dates, identify over-deduction beyond the retention cap, and calculate statutory interest on overdue releases.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
  featureList: [
    'Retention held calculated across multiple jobs',
    'Retention cap check to identify over-deduction',
    'First and final release dates from practical completion',
    'Statutory interest calculation on overdue releases',
    'Calendar export with reminders',
  ],
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is construction retention released?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the common JCT pattern, half the retention is released at practical completion and the remaining half at the end of the rectification or defects liability period, which is typically twelve months after practical completion. NEC contracts only apply retention where Option X16 has been incorporated, in which case the second half falls due at the Defects Date, usually 52 weeks after Completion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a main contractor refuse to release retention because they have not been paid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Section 113 of the Housing Grants, Construction and Regeneration Act 1996 renders pay when paid clauses ineffective, except where a third party has become insolvent. The release of retention cannot be made conditional on payment under a separate contract.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I charge interest on retention that has not been released?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Late Payment of Commercial Debts (Interest) Act 1998 provides for simple interest at eight percentage points above the Bank of England base rate on overdue commercial debts, which includes retention that has passed its release date. Fixed compensation may also be recoverable in addition to the interest.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a retention cap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most contracts set a limit on the total retention that can be held, commonly five per cent of the contract price. Once cumulative deductions reach that figure, no further retention should be deducted from subsequent payment certificates. Over-deduction past the cap is common because nobody checks the running total against the ceiling.',
      },
    },
  ],
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
      "name": "Construction Retention Tracker",
      "item": "https://www.lexalytic.com/tools/retention-tracker"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <RetentionTracker />
    </>
  )
}
