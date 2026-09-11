import type { Metadata } from 'next'
import DeliveryMargin from './DeliveryMargin'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/delivery-margin' },
  title: 'Which Dishes Lose Money on Deliveroo? Free UK Calculator | Lexalytic',
  description: 'Work out the real margin on every dish after platform commission, VAT and packaging. Shows which dishes lose money on every order, what you would need to charge to break even, and what to charge to match your dine-in margin.',
  keywords: 'Deliveroo commission calculator, delivery margin restaurant, Uber Eats commission cost, Just Eat commission UK, delivery menu pricing, restaurant delivery profitability',
  openGraph: {
    title: 'Which dishes lose you money on delivery?',
    description: 'A £12 dish returns about £8.40 after commission. Most kitchens price delivery the same as dine-in.',
    url: 'https://www.lexalytic.com/tools/delivery-margin',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Delivery Margin Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK restaurants and takeaways to calculate the true margin on each dish after delivery platform commission, VAT and packaging, with break-even pricing and the price needed to match dine-in margin.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much commission do delivery platforms take in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically twenty five to thirty five per cent where the platform provides the rider. Just Eat order-only arrangements are lower, often around fourteen per cent, because you deliver yourself. Rates vary by contract and tier, so check your own statements rather than assuming the headline figure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I price my delivery menu higher than dine-in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Delivery menus generally need eight to twelve percentage points more margin than dine-in to end up in the same place, which usually means pricing fifteen to twenty five per cent higher. Every major platform permits this and most operators do it. Pricing identically means the platform commission comes entirely out of your margin.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is VAT taken off before or after delivery commission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The customer pays a VAT inclusive price, and the VAT is not yours to keep. Commission is then charged on the sale. So on a twelve pound dish for a VAT registered business, you are working from ten pounds net before the platform takes its share, not twelve. This catches a lot of operators out.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <DeliveryMargin />
    </>
  )
}
