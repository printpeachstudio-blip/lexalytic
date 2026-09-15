import type { Metadata } from 'next'
import ReportingCost from './ReportingCost'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/reporting-cost' },
  title: 'What Is Manual Reporting Costing You? Free UK Calculator | Lexalytic',
  description: 'Work out the real annual cost of manual reporting, using true employment cost rather than salary. Breaks it down by role, shows the hours in working weeks, and calculates how quickly automation would pay for itself.',
  keywords: 'cost of manual reporting, manual reporting calculator UK, true cost of an employee hour, reporting automation ROI, how much does manual data work cost, automation payback calculator',
  openGraph: {
    title: 'What Is Manual Reporting Actually Costing You?',
    description: 'Most calculators multiply hours by salary, which understates it by roughly a third. This one does not.',
    url: 'https://www.lexalytic.com/tools/reporting-cost',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Manual Reporting Cost Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free calculator that works out the annual cost of manual reporting using true employment cost including employer National Insurance and pension, broken down by role, with an automation payback calculation.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you work out the true hourly cost of an employee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Take the salary, add employer National Insurance at fifteen per cent on earnings above five thousand pounds, add pension contributions at three per cent, then divide by the hours actually worked in a year. That is around 46.4 weeks after statutory holiday rather than 52, at 37.5 hours a week. The result is typically about thirty per cent higher than dividing salary by annual hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much of manual reporting can realistically be automated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Around eighty per cent for most reporting work. Extraction, joining data between systems and formatting can be removed almost entirely. Review, judgement calls and chasing colleagues who have not submitted their figures cannot. Claims of ninety five per cent or more usually ignore the exception handling.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a reasonable payback period for automating a report?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under six months makes the decision straightforward. Under eighteen months is still a clear case, because the build cost is one off while the saving recurs every year. Beyond eighteen months it is worth questioning whether the build is scoped larger than it needs to be, or whether reporting is really the expensive problem.',
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
      "name": "What Is Manual Reporting Costing You? Free UK Calculator",
      "item": "https://www.lexalytic.com/tools/reporting-cost"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <ReportingCost />

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
            <Link href="/blog/automate-month-end-reporting-uk" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              How to Automate Your Month-End Reporting (UK Guide 2026)
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/finance-team-manual-reporting-fix" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              My Finance Team Is Spending Hours on Manual Reporting - How Do I Fix It?
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/excel-automation-cost-uk" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              How Much Does Excel Automation Cost in the UK? (2026 Guide)
            </Link>
          </li>
          </ul>
        </div>
      </section>
    </>
  )
}
