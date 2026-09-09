import type { Metadata } from 'next'
import HmoTracker from './HmoTracker'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/hmo-compliance-tracker' },
  title: 'Free HMO Compliance Tracker for UK Landlords | Lexalytic',
  description: 'Track gas safety, EICR, fire alarm, emergency lighting and HMO licence renewal dates across your properties. Works out every due date, shows what is overdue, and exports to your calendar. Free, nothing uploaded.',
  keywords: 'HMO compliance tracker, HMO certificate renewal dates, gas safety certificate reminder, EICR renewal tracker, HMO licence expiry, landlord compliance calendar UK, HMO safety certificate tracker',
  openGraph: {
    title: 'Free HMO Compliance Tracker for UK Landlords',
    description: 'Every certificate renewal date across your HMO portfolio in one place. Exports straight to your calendar.',
    url: 'https://www.lexalytic.com/tools/hmo-compliance-tracker',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HMO Compliance Tracker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK HMO landlords to track gas safety certificates, EICRs, fire alarm servicing, emergency lighting tests, fire risk assessments and HMO licence renewals across a property portfolio, with calendar export.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
  featureList: [
    'Automatic renewal date calculation for nine certificate types',
    'Overdue and due-soon flagging at 30 and 90 days',
    'Multiple properties in one view',
    'Calendar export with 90, 30 and 7 day reminders',
    'Runs entirely in the browser with nothing uploaded',
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HmoTracker />
    </>
  )
}
