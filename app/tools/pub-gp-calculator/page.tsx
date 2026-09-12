import type { Metadata } from 'next'
import GpCalculator from './GpCalculator'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/pub-gp-calculator' },
  title: 'Pub and Restaurant GP Calculator with Wastage | Free UK Tool | Lexalytic',
  description: 'Work out gross profit across your whole range at once, with wastage applied properly by product type and VAT handled correctly. Shows which lines sit below the usual range and what you would need to charge.',
  keywords: 'pub GP calculator, gross profit calculator pub UK, draught wastage calculator, bar GP percentage, restaurant gross profit wastage, pour cost calculator UK',
  openGraph: {
    title: 'Gross profit across the whole range, with wastage in it',
    description: 'Most GP calculators do one product at a time and ignore wastage, which makes every number flattering.',
    url: 'https://www.lexalytic.com/tools/pub-gp-calculator',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pub and Restaurant GP Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK pubs and restaurants to calculate gross profit across an entire product range with wastage applied by category, VAT handled correctly, and comparison against typical GP ranges.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much draught beer wastage is normal in a UK pub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most pubs lose between two and five per cent of draught stock to spillage, spoilage, line cleaning and unrecorded pours, with five to six per cent common once ullage is included. Anything above five per cent suggests a cellar management, staff training or till discipline problem. Below two per cent requires tight systems across all three.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate GP with wastage included?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wastage means you buy more than you sell, so it inflates the effective cost rather than reducing the price. Divide the unit cost by one minus the wastage rate to get the adjusted cost, then calculate gross profit against the VAT exclusive selling price. A pint costing one pound forty with five per cent wastage effectively costs one pound forty seven.',
      },
    },
    {
      '@type': 'Question',
      name: 'What GP should a pub make on spirits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Seventy five to eighty per cent is the usual range for spirits in 2026, which is the highest on the bar. Draught beer runs sixty five to seventy two, wine by the glass seventy to seventy five, and bottled beer sixty to sixty eight. Tied tenants should expect to sit below these because the tie costs eight to twelve points against open market buying.',
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
      "name": "Pub and Restaurant GP Calculator with Wastage",
      "item": "https://www.lexalytic.com/tools/pub-gp-calculator"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <GpCalculator />
    </>
  )
}
