import type { Metadata } from 'next'
import DepositCheck from './DepositCheck'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/deposit-protection-check' },
  title: 'Deposit Protection Checker | 30 Day Deadline and Prescribed Information | Lexalytic',
  description: 'Check every tenancy deposit against the 30 day deadline, including the prescribed information most landlords forget and the renewals that quietly restart the clock. A tenant has six years to claim, so old tenancies count. Free, nothing uploaded.',
  keywords: 'deposit protection 30 day deadline, prescribed information deadline, tenancy deposit penalty 3 times, deposit not protected in time, deposit re-protection on renewal, tenancy deposit compliance check, deposit cap five weeks rent',
  openGraph: {
    title: 'The deposit was protected. The prescribed information is the bit people miss.',
    description: 'Two duties, one deadline, the same penalty. Check every tenancy including the renewals.',
    url: 'https://www.lexalytic.com/tools/deposit-protection-check',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tenancy Deposit Protection Checker',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool for UK landlords to check tenancy deposits against the thirty day protection and prescribed information deadlines under the Housing Act 2004, including renewals and the Tenant Fees Act deposit cap.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the prescribed information and why does it matter so much?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It is a set of details about the scheme holding the deposit that must be given to the tenant within the same thirty days as the protection itself. It is a separate duty under section 213(6), and failing it carries the same penalty as never protecting the money at all. Protecting a deposit properly and never serving the information is the commonest breach there is, and it is one of the commonest failures there is.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does the 30 days start?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'From the day the money is received, not from the tenancy start and not from when the tenant moves in. A deposit paid on 1 March for a tenancy starting on 15 March must be protected by 31 March. This catches people out where a holding deposit converts to a tenancy deposit, because the clock started earlier than they think.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does renewing a tenancy affect deposit protection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It can. Where a renewal creates a new fixed term the deposit may be treated as received again, which restarts both the protection and the prescribed information clocks. A deposit protected perfectly in 2022 can be non compliant because of a 2024 renewal that nobody did anything about. Whether it applies depends on how the renewal was documented, so it is worth checking with your scheme and taking advice rather than assuming either way.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long can a tenant claim for a deposit breach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Six years from the end of the tenancy. That means tenancies that ended years ago still matter, and it also means the landlord has to be able to prove compliance long after the scheme emails have been deleted. The burden of showing the deposit was protected in time and the information served in time sits with the landlord rather than the tenant.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much is the penalty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A court can order between one and three times the deposit, and the amount is at its discretion. A first breach that was put right promptly tends toward the lower end and a deliberate or repeated failure toward the upper. The deposit itself is usually ordered to be returned or protected as well, so the penalty is on top of the money.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <DepositCheck />

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
            <Link href="/blog/prescribed-information-deposit-deadline" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              You Protected The Deposit. That Is Only Half The Duty.
            </Link>
          </li>
          <li style={{ marginBottom: 14 }}>
            <Link href="/blog/rent-repayment-orders-doubled-2026" style={{ fontSize: 16, color: 'var(--ink)', textDecoration: 'none', fontWeight: 500 }}>
              Rent Repayment Orders Doubled in May 2026. What Landlords Need to Know
            </Link>
          </li>
          </ul>
        </div>
      </section>
    </>
  )
}
