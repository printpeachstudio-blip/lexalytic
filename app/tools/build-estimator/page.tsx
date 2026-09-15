import type { Metadata } from 'next'
import BuildEstimator from './BuildEstimator'
import Link from 'next/link'

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
      name: 'What if I do not know exactly what I want yet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'That is the normal starting point rather than a problem. Most people know what is taking too long or what keeps going wrong, and not what the software should look like. The questions here are deliberately about the shape of the thing rather than the features, because the shape is what decides the cost. If you are unsure on any of them, pick the closest and say so when you send the brief over.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the price change once you start building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The price is agreed in writing before anything starts and it does not move, which means getting the scope right is our problem rather than your invoice. If we underestimate something, that is a cost we carry. The only thing that changes the price is you asking for something that was not in the brief, and we would agree that separately before doing it rather than adding it to the bill.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I do not like what you build?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You will have seen it before paying for it. When the build is finished we go through it with you on a video call, with your own data in it, and you use it. Changes get made at that point. Only when you are happy does any money change hands, so if it does not do what you asked for you have lost nothing but the time on two calls. There is no deposit and nothing up front.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to use you to get a price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The brief this produces is yours and it covers what any developer will ask: who uses it, what it connects to, what it has to do and where the data is now. Take it to three of them if you like. A written brief gets better quotes than a conversation about roughly what you are after, whoever ends up building it.',
      },
    },
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

      <section className="related-reading" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(40px, 6vw, 60px) 0' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 22 }}>
            Worth reading alongside this
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/custom-crm-for-uk-small-business" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              Custom CRM for UK Small Businesses - When to Build Instead of Buy
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/what-makes-a-good-brief-for-a-developer" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              What Makes a Good Brief for a Developer? (UK Business Guide)
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/five-signs-your-business-has-outgrown-off-the-shelf-software" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              Five Signs Your Business Has Outgrown Off-the-Shelf Software
            </Link>
          </li>
          </ul>
        </div>
      </section>
    </>
  )
}
