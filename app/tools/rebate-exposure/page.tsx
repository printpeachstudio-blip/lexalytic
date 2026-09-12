import type { Metadata } from 'next'
import RebateExposure from './RebateExposure'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/rebate-exposure' },
  title: 'Rebate Exposure Tracker for UK Recruitment Agencies | Free | Lexalytic',
  description: 'See how much of your billed placement revenue is still refundable. Tracks every placement inside its rebate window across the desk, what each is worth on the sliding scale today, and the month each one falls out of the window. Free, nothing uploaded.',
  keywords: 'recruitment rebate calculator, rebate period tracker, placement fee refund, recruitment agency rebate exposure, sliding scale rebate UK, perm placement guarantee period, recruitment desk reporting',
  openGraph: {
    title: 'Rebate Exposure Tracker for UK Recruitment Agencies',
    description: 'How much of your billed revenue could you still be asked to give back? Track rebate exposure across the whole desk.',
    url: 'https://www.lexalytic.com/tools/rebate-exposure',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Recruitment Rebate Exposure Tracker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK recruitment agencies to track contingent rebate liability across all live permanent placements, showing the refundable amount on each sliding scale today and when each placement leaves its guarantee window.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a rebate period in recruitment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A rebate period is the window after a permanent candidate starts during which the agency will refund part of the placement fee if the candidate leaves. The typical window is eight to twelve weeks from the start date, with the refund reducing on a sliding scale the longer the candidate stays.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a sliding scale rebate work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The refundable proportion of the fee falls as the candidate completes more of the window. A common stepped shape is one hundred per cent for the first two weeks, then seventy five, fifty and twenty five per cent in pairs of weeks, reaching nil by week eight. Some agreements taper evenly across the window instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does an unpaid invoice affect a rebate claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Usually yes. Rebate clauses are commonly conditional on the placement invoice being settled within the agreed payment terms, so a client who has not paid on time may have no contractual entitlement to a rebate at all. The exact position depends on the terms of business.',
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
      "name": "Rebate Exposure Tracker for UK Recruitment Agencies",
      "item": "https://www.lexalytic.com/tools/rebate-exposure"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <RebateExposure />
    </>
  )
}
