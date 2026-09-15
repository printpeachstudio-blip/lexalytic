import type { Metadata } from 'next'
import HmrcBenchmark from './HmrcBenchmark'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/restaurant-benchmark-check' },
  title: 'Restaurant Margin Benchmark Check | Free UK Tool | Lexalytic',
  description: 'See where your restaurant sits against the published UK profit benchmarks, how much of any gap delivery commission, discounting and waste account for, and what records would evidence it. Free, nothing uploaded.',
  keywords: 'restaurant gross profit benchmark UK, HMRC restaurant profit margin, restaurant enquiry benchmark, low gross profit restaurant explanation, takeaway profit margin HMRC, restaurant net margin benchmark 2026',
  openGraph: {
    title: 'How do your restaurant numbers look from the outside?',
    description: 'A restaurant can be entirely straight and still sit below benchmark. This shows where you sit and what explains it.',
    url: 'https://www.lexalytic.com/tools/restaurant-benchmark-check',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Restaurant Margin Benchmark Check',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK restaurants and takeaways to compare gross and net margin against published sector benchmarks, model how much of any variance is explained by delivery commission, discounting, waste and tied supply, and identify what records would evidence it.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What gross profit does HMRC expect from a restaurant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Commonly published UK figures for 2026 put full service and casual dining at sixty five to seventy per cent gross with three to six per cent net, quick service and takeaways at sixty five to seventy per cent gross with six to nine per cent net, and pubs at seventy to eighty per cent gross. Sitting consistently below the range for your format is one of the most common triggers for a compliance check.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my restaurant gross profit below benchmark when I am doing nothing wrong?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The usual causes are delivery platform commission of twenty five to thirty five per cent, which reduces net margin without appearing in cost of sales, discounting and set menus, waste and spoilage, staff meals, and a tied supply agreement if you are a pub tenant. Each of these legitimately depresses margin, and each needs records behind it to be accepted as an explanation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does HMRC see my Deliveroo and Uber Eats income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under the digital platform reporting rules, platforms including Deliveroo, Uber Eats and Just Eat report seller income directly to HMRC. Your own records need to reconcile with what the platforms have reported, and a mismatch is visible without anyone having to look for it.',
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
      "name": "Restaurant Margin Benchmark Check",
      "item": "https://www.lexalytic.com/tools/restaurant-benchmark-check"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <HmrcBenchmark />

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
            <Link href="/blog/restaurant-below-benchmark-gross-profit" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              Your Gross Profit Is Below Benchmark. That Is Not The Same As Being Wrong.
            </Link>
          </li>
          </ul>
        </div>
      </section>
    </>
  )
}
