import type { Metadata } from 'next'
import HmoLicenceChecker from './HmoLicenceChecker'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/hmo-licence-checker' },
  title: 'Do You Need an HMO Licence? Free UK Checker | Lexalytic',
  description: 'Free HMO licence checker for UK landlords. Answer four questions to find out whether your property needs a mandatory HMO licence, what it costs, and what the penalties are for operating without one. Includes a room size calculator.',
  keywords: 'HMO licence checker, do I need an HMO licence, HMO licensing rules UK, HMO licence cost, mandatory HMO licence, HMO room size calculator, HMO licence requirements England, is my property an HMO',
  openGraph: {
    title: 'Do You Need an HMO Licence? Free UK Checker',
    description: 'Four questions. Find out whether your property needs a mandatory HMO licence, what it costs, and what happens if you do not have one.',
    url: 'https://www.lexalytic.com/tools/hmo-licence-checker',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HMO Licence Checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool that determines whether a UK property requires a mandatory HMO licence based on occupancy, household count and shared facilities, with a room size calculator for licensed occupancy limits.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When do I need an HMO licence in England?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A mandatory HMO licence is required in England where a property is occupied by five or more people forming two or more separate households who share a kitchen, bathroom or toilet. The three storey minimum was removed in October 2018, so a single storey property with five sharers is caught.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does an HMO licence cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no national fee. Each council sets its own, typically between £500 and £1,500 for a five year licence, with most falling between £600 and £1,100. Some London boroughs charge per habitable room and exceed £2,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum bedroom size in a licensed HMO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A room slept in by one person aged 10 or over must be at least 6.51 square metres. A room slept in by two people aged 10 or over must be at least 10.22 square metres. A room used by one child under 10 must be at least 4.64 square metres. Rooms below 4.64 square metres cannot be used for sleeping at all.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I operate an HMO without a licence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Operating an unlicensed HMO is a criminal offence. Councils can issue a civil penalty of up to £30,000 or prosecute for an unlimited fine. Tenants or the local authority can apply for a rent repayment order covering up to 24 months of rent. The Renters Rights Act doubled this from 12 months for offences committed on or after 1 May 2026, and extended the window for bringing a claim from 12 months to two years.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <HmoLicenceChecker />
    </>
  )
}
