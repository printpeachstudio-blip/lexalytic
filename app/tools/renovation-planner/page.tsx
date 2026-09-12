import type { Metadata } from 'next'
import RenovationPlanner from './RenovationPlanner'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/renovation-planner' },
  title: 'Renovation Cost Planner UK 2026 | The Costs Not in the Quote | Lexalytic',
  description: 'Free UK renovation cost planner. Work out the full budget including VAT, contingency, party wall, building control and the other costs that sit outside a builder quote. Produces a scope document to send to three builders.',
  keywords: 'renovation cost calculator UK, extension cost calculator, hidden renovation costs, renovation budget planner UK, how much does a renovation cost 2026, loft conversion cost, kitchen renovation cost UK',
  openGraph: {
    title: 'The costs nobody puts in the renovation quote',
    description: 'VAT, contingency, party wall, building control, scaffold overruns. Work out the real number before you start.',
    url: 'https://www.lexalytic.com/tools/renovation-planner',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Renovation Cost Planner',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK homeowners to plan a renovation budget, including the costs that sit outside a builder quote such as VAT, contingency, party wall surveyors, building control and scaffold, and to produce a written scope for comparable quotes.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What costs are not included in a builder quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VAT is the biggest and the most commonly missed, since a quote may be shown excluding it. Then contingency, architect or designer fees at five to twelve per cent of build cost, structural engineer calculations, Building Control fees, planning application fees, a party wall surveyor where work affects a shared wall, asbestos survey on anything built before 2000, scaffold, skip and parking permits, and somewhere to live if the property is uninhabitable. Furnishing the finished result is regularly a five figure sum that nobody budgets for.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much contingency should a renovation have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ten per cent on a property built after 2000, rising to around twenty per cent on anything from before 1919. Older properties hide more: joists, wiring, damp, drainage and lath and plaster that cannot simply be skimmed over. The commonest budgeting mistake is leaving contingency out entirely, which does not remove the cost, only the plan for meeting it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are renovation cost estimates so different between websites?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because they count different things. A kitchen is quoted anywhere between five and eighty five thousand pounds across published UK guides, depending on whether the figure includes appliances, worktops, electrics behind the units, flooring, plastering and fitting, and on the specification assumed. Any single number is meaningless without knowing what sits inside it, which is why comparing quotes on inclusions rather than totals matters more than comparing calculators.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a party wall surveyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Potentially, where work affects a shared wall, involves excavation near a neighbouring property, or cuts into a party structure. You serve notice and the neighbour may consent or dissent. If they dissent, you generally pay for their surveyor as well as your own, so budget for two at one to three thousand pounds each. Serving notice early and properly is the cheapest way to stop this escalating. Whether it applies to your specific job should be confirmed with a surveyor.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <RenovationPlanner />
    </>
  )
}
