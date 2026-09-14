import type { Metadata } from 'next'
import LabourDaypart from './LabourDaypart'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/labour-by-session' },
  title: 'Which Sessions Make Money? Labour Cost Calculator for UK Pubs | Lexalytic',
  description: 'Work out which trading sessions actually contribute, using true employment cost including the 15 per cent employer National Insurance, pension and holiday accrual. Free, nothing uploaded.',
  keywords: 'pub labour cost calculator, restaurant labour percentage UK, daypart profitability, true cost of an employee hour UK, hospitality staff cost calculator, session profitability pub',
  openGraph: {
    title: 'Which sessions actually make you money?',
    description: 'The week looks profitable. Two of the sessions in it are carrying the rest.',
    url: 'https://www.lexalytic.com/tools/labour-by-session',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Labour Cost by Session Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK pubs and restaurants to calculate contribution by trading session using true employment cost, identifying which dayparts carry the week and which lose money.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an hour of staff time really cost a UK pub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Around twenty six per cent more than the hourly rate. On top of the rate you pay holiday accrual at 12.07 per cent, employer National Insurance at fifteen per cent above the threshold, and pension at three per cent. An employee on the National Living Wage of twelve pounds seventy one costs the business closer to sixteen pounds an hour.',
      },
    },
    {
      '@type': 'Question',
      name: 'What labour percentage should a pub or restaurant run at?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wages typically account for around thirty one per cent of revenue across UK hospitality. Above thirty five per cent is a warning sign at site level. Individual sessions vary widely, and a session running above forty per cent will usually tip into losing money on a quiet week.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I close a session that loses money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Fixed costs such as rent run whether you open or not, so a session making any contribution is usually better than closing. The more common fix is trimming hours at the edges of the session rather than closing it, and checking whether the same customers also come at busier times before removing a reason for them to visit.',
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
      "name": "Which Sessions Make Money? Labour Cost Calculator for UK Pubs",
      "item": "https://www.lexalytic.com/tools/labour-by-session"
    }
  ]
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <LabourDaypart />

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
