import type { Metadata } from 'next'
import ReportingCost from './ReportingCost'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/reporting-cost' },
  title: 'What Is Manual Reporting Costing You? Free UK Calculator | Lexalytic',
  description: 'Work out the real annual cost of manual reporting, using true employment cost rather than salary. Breaks it down by role, shows the hours in working weeks, and calculates how quickly automation would pay for itself.',
  keywords: 'cost of manual reporting, manual reporting calculator UK, true cost of an employee hour, reporting automation ROI, how much does manual data work cost, automation payback calculator',
  openGraph: {
    title: 'What Is Manual Reporting Actually Costing You?',
    description: 'Most calculators multiply hours by salary, which understates it by roughly a third. This one does not.',
    url: 'https://www.lexalytic.com/tools/reporting-cost',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Manual Reporting Cost Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free calculator that works out the annual cost of manual reporting using true employment cost including employer National Insurance and pension, broken down by role, with an automation payback calculation.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you work out the true hourly cost of an employee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Take the salary, add employer National Insurance at fifteen per cent on earnings above five thousand pounds, add pension contributions at three per cent, then divide by the hours actually worked in a year. That is around 46.4 weeks after statutory holiday rather than 52, at 37.5 hours a week. The result is typically about thirty per cent higher than dividing salary by annual hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much of manual reporting can realistically be automated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Around eighty per cent for most reporting work. Extraction, joining data between systems and formatting can be removed almost entirely. Review, judgement calls and chasing colleagues who have not submitted their figures cannot. Claims of ninety five per cent or more usually ignore the exception handling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a reasonable payback period for automating a report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under six months makes the decision straightforward. Under eighteen months is still a clear case, because the build cost is one off while the saving recurs every year. Beyond eighteen months it is worth questioning whether the build is scoped larger than it needs to be, or whether reporting is really the expensive problem.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <ReportingCost />
    </>
  )
}
