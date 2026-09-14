import type { Metadata } from 'next'
import BuildEstimator from './BuildEstimator'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/build-estimator' },
  title: 'What Does Custom Software Cost? Free UK Build Estimator | Lexalytic',
  description: 'Work out what a custom business system would cost to build, with every cost driver shown and explained. Covers custom CRMs, client portals, job management and integrations. Download the brief and take it to any developer.',
  keywords: 'custom software cost UK, bespoke software price, how much does a custom CRM cost, custom business system cost, software development cost calculator UK, bespoke CRM cost, custom app cost UK',
  openGraph: {
    title: 'What Does Custom Software Actually Cost?',
    description: 'Everyone answers this with it depends. Here is what it depends on, what each thing adds, and why.',
    url: 'https://www.lexalytic.com/tools/build-estimator',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Custom Build Cost Estimator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free estimator for UK businesses considering custom software, showing indicative cost and timeline with every cost driver itemised and explained, and a downloadable brief.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a custom CRM cost in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A custom CRM covering several linked processes with more than one type of user typically costs between four and twelve thousand pounds, depending on how many systems it must connect to and whether existing data needs migrating. A simpler single process tool replacing one spreadsheet is usually between two and four thousand.',
      },
    },
    {
      '@type': 'Question',
      name: 'What drives the cost of custom software most?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The number of distinct user groups who need to see different things, because each one is a separate interface plus the permissions logic behind it. After that, integrations with existing systems and migrating messy historic data are the two most commonly underestimated costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there ongoing costs after a custom build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hosting, typically ten to thirty pounds a month for a simple tool and forty to a hundred and twenty for a platform with external users. There is no per user licence fee because you own the software outright. Ongoing changes are quoted separately or covered by a retainer.',
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
      "name": "What Does Custom Software Cost? Free UK Build Estimator",
      "item": "https://www.lexalytic.com/tools/build-estimator"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <BuildEstimator />

      <section className="faq-visible" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(48px, 7vw, 72px) 0' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 32 }}>
            Questions
          </h2>
          {faqData.mainEntity.map((q: any) => (
            <div key={q.name} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 11 }}>{q.name}</h3>
              <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.85, margin: 0 }}>
                {q.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
