import type { Metadata } from 'next'
import HmrcBenchmark from './HmrcBenchmark'

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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <HmrcBenchmark />
    </>
  )
}
