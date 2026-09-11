import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductInterest from '@/components/ProductInterest'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/products' },
  title: 'Products for UK Businesses by Industry | Lexalytic',
  description: 'Software built for specific UK industries. Retention Manager for construction subcontractors is live. Products for landlords, recruitment agencies and professional services firms are in development, each growing out of a free tool people already use.',
  keywords: 'construction software UK, landlord software UK, recruitment agency software, professional services software UK, industry specific business software UK',
  openGraph: {
    title: 'Products for UK Businesses by Industry | Lexalytic',
    description: 'Software built for specific industries rather than for everyone. Each one grew out of a free tool people were already using.',
    url: 'https://www.lexalytic.com/products',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

interface Product {
  industry: string
  who: string
  problem: string
  name: string
  status: 'live' | 'building' | 'considering'
  href?: string
  price?: string
  does: string[]
  freeTool: { name: string; href: string; line: string }
}

const products: Product[] = [
  {
    industry: 'Construction',
    who: 'Subcontractors and trades',
    problem: 'Retention is rarely disputed. It is forgotten, because the second half falls due twelve months after practical completion when the job is closed and nobody is watching the contract.',
    name: 'Retention Manager',
    status: 'live',
    href: '/retention-manager',
    price: 'From £19 a month',
    does: [
      'Both release dates worked out from practical completion',
      'Emails at 90, 30 and 7 days before each one, then when overdue',
      'Formal applications for release, with follow up wording',
      'Statutory interest calculated on anything late',
      'Flags deduction past the contractual cap',
      'Part payments and certificate history',
    ],
    freeTool: {
      name: 'Retention tracker',
      href: '/tools/retention-tracker',
      line: 'Calculates the dates and exports them to your calendar. Everything stays in your browser.',
    },
  },
  {
    industry: 'Property and lettings',
    who: 'HMO landlords and letting agents',
    problem: 'A licence lasts five years but the certificates underneath it renew on their own cycles. A lapsed gas certificate is a criminal offence rather than a licence breach, and most landlords who fall foul of it have simply lost track of which date falls when.',
    name: 'HMO Portfolio Manager',
    status: 'building',
    does: [
      'Every certificate date across the whole portfolio',
      'Email reminders before each renewal',
      'Room by room rent and arrears',
      'Licence conditions per council',
      'Tenant records and compliance documents in one place',
    ],
    freeTool: {
      name: 'HMO compliance tracker',
      href: '/tools/hmo-compliance-tracker',
      line: 'Works out every renewal date and exports them to your calendar. Nothing is uploaded.',
    },
  },
  {
    industry: 'Recruitment',
    who: 'Perm desks and agency owners',
    problem: 'Every placement inside its rebate window is revenue you have billed and could still be asked to return. Individually nobody worries about it. Across a desk it is a number worth knowing, and it clusters, because a strong month produces a batch of start dates that move through the window together.',
    name: 'Desk Exposure Manager',
    status: 'considering',
    does: [
      'Live rebate exposure across the whole desk',
      'When each placement falls out of its window',
      'Alerts before a cluster reaches the same milestone',
      'Unpaid invoices flagged, since they often void the rebate entitlement',
      'Reporting a funder or board will accept',
    ],
    freeTool: {
      name: 'Rebate exposure tracker',
      href: '/tools/rebate-exposure',
      line: 'Shows what is refundable today and when each placement becomes safe.',
    },
  },
  {
    industry: 'Professional services',
    who: 'Agencies, consultancies, accountancy and law firms',
    problem: 'Lock-up is work delivered but not billed plus work billed but not collected. Most firms measure the second half and never the first, because unbilled time sits in a time recording system rather than on a balance sheet.',
    name: 'Practice Cash Manager',
    status: 'considering',
    does: [
      'Lock-up days split into work in progress and debtors',
      'Which jobs to bill this week, ranked by what each releases',
      'Which invoices to chase, with statutory interest',
      'Client concentration in the locked up cash',
      'Connected to your time recording rather than typed in twice',
    ],
    freeTool: {
      name: 'Lock-up and cash release tracker',
      href: '/tools/lockup-tracker',
      line: 'Builds the lock-up figure from job level, so you get the number without needing a WIP balance you do not have.',
    },
  },
]

const STATUS = {
  live: { label: 'Available now', color: '#3F6B4C', bg: 'rgba(63,107,76,0.08)', border: 'rgba(63,107,76,0.25)' },
  building: { label: 'In development', color: '#8F6318', bg: 'rgba(176,122,30,0.08)', border: 'rgba(176,122,30,0.25)' },
  considering: { label: 'Being scoped', color: '#57514A', bg: 'rgba(87,81,74,0.06)', border: 'rgba(87,81,74,0.18)' },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Products by industry',
  description: 'Software products built by Lexalytic for specific UK industries.',
  url: 'https://www.lexalytic.com/products',
  isPartOf: { '@id': 'https://www.lexalytic.com/#website' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: products
      .filter(p => p.status === 'live' && p.href)
      .map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.name,
        url: `https://www.lexalytic.com${p.href}`,
      })),
  },
}

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />

        <section style={{ paddingTop: '150px', paddingBottom: '70px', background: 'var(--bg-dark)',
          position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px', pointerEvents: 'none' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Products</span>
            <h1 style={{ color: 'var(--white)', maxWidth: '720px', marginBottom: '24px',
              lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              Built for one industry, not for everyone
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
              maxWidth: '640px', fontWeight: '300', lineHeight: '1.75', margin: 0 }}>
              Each of these started as a free tool. When enough people used one and asked for the version
              with an account behind it, we built that. Which is a better way to decide what to build than
              guessing.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(50px, 7vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            {products.map((p, i) => {
              const s = STATUS[p.status]
              return (
                <article key={p.name} style={{
                  paddingBottom: '52px',
                  marginBottom: '52px',
                  borderBottom: i < products.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center',
                    flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '600',
                      letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {p.industry}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.03em',
                      color: s.color, background: s.bg, border: `1px solid ${s.border}`,
                      borderRadius: '3px', padding: '3px 9px' }}>
                      {s.label}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--ink-4)' }}>{p.who}</span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginBottom: '16px' }}>
                    {p.href ? (
                      <Link href={p.href} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                        {p.name}
                      </Link>
                    ) : p.name}
                  </h2>

                  <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)',
                    marginBottom: '26px', maxWidth: '720px' }}>
                    {p.problem}
                  </p>

                  <div style={{ display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '28px', marginBottom: '26px' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px',
                        paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                        What it does
                      </div>
                      <ul style={{ fontSize: '14.5px', color: 'var(--ink-3)', lineHeight: '1.8',
                        paddingLeft: '18px', margin: 0 }}>
                        {p.does.map(d => <li key={d}>{d}</li>)}
                      </ul>
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px',
                        paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                        Try it free first
                      </div>
                      <Link href={p.freeTool.href} style={{
                        fontSize: '15px', fontWeight: '500', color: 'var(--ink)',
                        textDecoration: 'none', display: 'block', marginBottom: '6px',
                      }}>
                        {p.freeTool.name} →
                      </Link>
                      <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>
                        {p.freeTool.line}
                      </p>
                    </div>
                  </div>

                  {p.status === 'live' && p.href ? (
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Link href={p.href} className="btn-primary" style={{ fontSize: '15px' }}>
                        See {p.name}
                      </Link>
                      <span style={{ fontSize: '14px', color: 'var(--ink-3)' }}>
                        {p.price}, 14 days free, no card needed
                      </span>
                    </div>
                  ) : (
                    <ProductInterest
                      product={p.name}
                      industry={p.industry}
                      status={p.status === 'building' ? 'building' : 'considering'}
                    />
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section style={{ padding: 'clamp(50px, 7vw, 80px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <h2 style={{ marginBottom: '18px' }}>Not your industry?</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)', marginBottom: '16px' }}>
              These exist because somebody kept doing the same calculation by hand and we got tired of
              watching it. If there is something your sector does that way, tell us. We have built four
              products from exactly that conversation.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--ink-3)', marginBottom: '28px' }}>
              If it is specific to your business rather than your industry, that is a bespoke build
              rather than a product, and our estimator will tell you roughly what it would cost.
            </p>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-primary" style={{ fontSize: '15px' }}>
                Tell us what you keep doing by hand
              </Link>
              <Link href="/tools/build-estimator" style={{ fontSize: '15px', color: 'var(--amber)' }}>
                Price a bespoke build
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
