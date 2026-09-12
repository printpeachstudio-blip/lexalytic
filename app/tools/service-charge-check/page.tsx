import type { Metadata } from 'next'
import ServiceCharge from './ServiceCharge'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/service-charge-check' },
  title: 'Service Charge and Section 20 Checker | Free UK Leasehold Tool | Lexalytic',
  description: 'Check whether your landlord consulted properly before major works. Where consultation was defective, recovery can be capped at £250 per leaseholder whatever the work cost. Free, nothing uploaded.',
  keywords: 'section 20 consultation, challenge service charge, major works bill leasehold, service charge too high, section 20 notice not received, leasehold service charge tribunal, section 20B 18 month rule',
  openGraph: {
    title: 'A big service charge bill is not automatically a bill you owe',
    description: 'Where consultation was defective, recovery can be capped at £250 per leaseholder whatever the work cost.',
    url: 'https://www.lexalytic.com/tools/service-charge-check',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Service Charge and Section 20 Checker',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK leaseholders to check whether a landlord followed the Section 20 consultation process before major works, whether the eighteen month demand deadline was met, and what information they are entitled to request.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What happens if my landlord did not follow Section 20?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Where qualifying works will cost any leaseholder more than two hundred and fifty pounds, consultation is required. If it did not happen or was defective, and the First-tier Tribunal does not grant dispensation, recovery is limited to two hundred and fifty pounds from each leaseholder regardless of what the works actually cost. On a twenty thousand pound bill that is the difference between most of it and almost none of it. The landlord has to prove they complied.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a service charge be too old to demand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, and it is the rule leaseholders most often do not know about. Under section 20B of the Landlord and Tenant Act 1985, costs incurred more than eighteen months before the demand arrives are not recoverable, unless within that eighteen months the leaseholder was notified in writing that the costs had been incurred and would be demanded. A bill arriving two years after the work, with nothing in between, is frequently unrecoverable in full.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does paying a service charge mean I have accepted it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Paying a service charge does not by itself amount to agreement or admission that it was payable. A leaseholder cannot challenge a charge they have expressly agreed, but simply having paid it is not that. This matters because many people assume paying closes the question and stop looking.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my lease stop me going to the tribunal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A term in a lease that tries to remove the tribunal jurisdiction over service charge disputes is void, with a narrow exception for arbitration agreed after a dispute has already arisen. The right to apply under section 27A cannot be signed away in advance, whatever the lease says.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Section 20C order and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Without one, a freeholder can add the legal costs of defending your challenge to the following year service charge, which means you can win and still pay. Asking for a section 20C order is one line in a tribunal application and leaving it out is the commonest mistake leaseholders make.',
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
      "name": "Service Charge and Section 20 Checker",
      "item": "https://www.lexalytic.com/tools/service-charge-check"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <ServiceCharge />
    </>
  )
}
