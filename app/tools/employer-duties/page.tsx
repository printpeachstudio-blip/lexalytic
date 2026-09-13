import type { Metadata } from 'next'
import EmployerDuties from './EmployerDuties'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/employer-duties' },
  title: 'Employer Duty Dates | Pension Re-enrolment, P60, P11D and the Rest | Lexalytic',
  description: 'Auto enrolment re-enrolment comes back every three years and the re-declaration is due even when you have nobody to re-enrol. Work out your dates for that and six other employer duties, then put them in a calendar. Free, nothing uploaded.',
  keywords: 'pension re-enrolment date, re-declaration of compliance deadline, auto enrolment three year cycle, employer deadlines calendar UK, P60 deadline 31 May, P11D deadline 6 July, written statement of particulars day one',
  openGraph: {
    title: 'Auto enrolment was not a one-off. It comes back every three years.',
    description: 'The re-declaration is due even when you have nobody to re-enrol. Work out your dates.',
    url: 'https://www.lexalytic.com/tools/employer-duties',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Employer Duty Dates',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool that works out when pension re-enrolment, the re-declaration of compliance, P60, P11D, Class 1A National Insurance, holiday year end and employers liability renewal fall due, from the employer\u2019s own dates, and exports them to a calendar.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often do I have to do pension re-enrolment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every three years. You choose a date inside a six month window running three months either side of the third anniversary of your duties start date, and you must put back into the scheme anyone who opted out more than twelve months before that date. Postponement cannot be used for re-enrolment. This is the duty small employers miss most often, because three years is long enough to forget it exists.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to re-declare if I had nobody to re-enrol?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, and this catches people out. The re-declaration of compliance is a duty in its own right, due within five months of the third anniversary of your duties start date, whether or not anyone needed putting back in. Employers who correctly worked out they had nobody to re-enrol still get penalised for not saying so.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I miss the re-enrolment deadline?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Pensions Regulator can issue a fixed penalty of four hundred pounds, followed by escalating daily penalties that start at fifty pounds a day for the smallest employers and rise with headcount. The penalty for the re-declaration is separate from the penalty for the re-enrolment itself.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is a written statement of employment particulars due?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On or before the first day of work, for every employee and worker. It used to be within two months, which changed in April 2020, and a lot of template contracts and onboarding checklists still say the old rule. Where a worker brings another successful tribunal claim, the tribunal can award two or four weeks pay on top for a missing statement.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <EmployerDuties />
    </>
  )
}
