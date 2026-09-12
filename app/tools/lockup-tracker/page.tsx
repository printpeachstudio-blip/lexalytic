import type { Metadata } from 'next'
import LockupTracker from './LockupTracker'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/lockup-tracker' },
  title: 'Lock-Up Days Calculator for UK Professional Services | Free | Lexalytic',
  description: 'Work out your lock-up days from job level data rather than a balance sheet figure you do not have. Shows WIP days, debtor days, and exactly which jobs to bill or chase to release the most cash. Free, nothing uploaded.',
  keywords: 'lock-up days calculator, WIP days professional services, debtor days UK, work in progress unbilled, cash release professional services, agency lock-up days, accountancy practice lockup, law firm WIP',
  openGraph: {
    title: 'Lock-Up Days Calculator for UK Professional Services',
    description: 'How much cash could you release this month without winning any new work? Calculated from your live jobs.',
    url: 'https://www.lexalytic.com/tools/lockup-tracker',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lock-Up Days Tracker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK professional services firms to calculate lock-up days from job level data, showing work in progress days, debtor days, and which specific jobs to bill or chase to release cash.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are lock-up days?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lock-up days measure how long cash is tied up between doing work and collecting payment for it. It is the sum of work in progress days, being the delay between delivering work and raising an invoice, and debtor days, being the delay between raising the invoice and being paid.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate lock-up days?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide unbilled work in progress by annual fee income and multiply by 365 to get WIP days. Divide outstanding debtors by annual fee income and multiply by 365 to get debtor days. Add the two together for total lock-up.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good lock-up figure for a professional services firm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Between 45 and 65 days combined is generally considered healthy for a UK professional services firm or agency with a mix of retained and project work. Retainer led firms billing in advance can sit considerably lower. Project led firms often run higher because work accumulates unbilled between milestones.',
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
      "name": "Lock-Up Days Calculator for UK Professional Services",
      "item": "https://www.lexalytic.com/tools/lockup-tracker"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <LockupTracker />
    </>
  )
}
