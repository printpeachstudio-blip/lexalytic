import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools' },
  title: 'Free Tools for UK Businesses | Data, Spreadsheet & HMO Checkers | Lexalytic',
  description: 'Free browser based tools for UK businesses and landlords. Check a spreadsheet for the errors that break UK systems, work out whether a property needs an HMO licence, and keep certificate renewal dates in one place. No signup, nothing uploaded.',
  keywords: 'free business tools UK, free data quality checker, spreadsheet error checker UK, HMO licence checker, HMO compliance tracker, free landlord tools UK, UK compliance tools, free CSV checker',
  openGraph: {
    title: 'Free Tools for UK Businesses | Lexalytic',
    description: 'Spreadsheet error checking, HMO licensing and certificate tracking. Free, no signup, nothing uploaded.',
    url: 'https://www.lexalytic.com/tools',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const tools = [
  {
    href: '/tools/data-health-check',
    name: 'Data health check',
    forWho: 'Anyone importing a customer or supplier list',
    summary:
      'Drop in a CSV and it checks the things that quietly break UK business systems. VAT numbers are run through the HMRC mod-97 checksum rather than just a length test, so it catches a transposed digit that looks perfectly valid. Company numbers are checked for the leading zero Excel strips off, which is the single most common reason a Companies House lookup fails. It also finds mixed date formats, invalid postcodes, duplicate records and the same email address sitting on two different rows.',
    detail: 'Nothing is uploaded. The file is read in your browser and never leaves it.',
    related: { label: 'Data cleansing', href: '/services/data-cleansing' },
  },
  {
    href: '/tools/hmo-licence-checker',
    name: 'HMO licence checker',
    forWho: 'Landlords and letting agents',
    summary:
      'Four questions tell you whether a property needs a mandatory HMO licence, what a licence typically costs, what documents the council will ask for, and what the penalty is if you let without one. There is also a room size calculator that works out the maximum number of adults who can lawfully sleep in the property, which is often fewer than the number currently living there.',
    detail: 'Covers England, Wales, Scotland and Northern Ireland, each of which uses a different threshold.',
    related: { label: 'Custom business tools', href: '/services/custom-business-tools' },
  },
  {
    href: '/tools/hmo-compliance-tracker',
    name: 'HMO compliance tracker',
    forWho: 'Landlords with certificates to keep on top of',
    summary:
      'Add your properties and the date each certificate was last done. It works out every renewal date from there and shows what is overdue, what is due inside 30 days and what is coming in the next quarter. Nine certificate types are covered, from the annual gas safety check through to the five year licence renewal.',
    detail: 'Exports to a calendar file with reminders at 90, 30 and 7 days, so the dates live somewhere you will actually see them.',
    related: { label: 'Custom business tools', href: '/services/custom-business-tools' },
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Tools for UK Businesses',
  description:
    'A set of free browser based tools for UK businesses and landlords covering spreadsheet data quality, HMO licensing and certificate renewal tracking.',
  url: 'https://www.lexalytic.com/tools',
  isPartOf: { '@type': 'WebSite', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      url: `https://www.lexalytic.com${t.href}`,
    })),
  },
}

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />

        <section
          style={{
            paddingTop: '150px',
            paddingBottom: '60px',
            background: 'var(--bg-dark)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              pointerEvents: 'none',
            }}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h1
              style={{
                color: 'var(--white)',
                maxWidth: '660px',
                marginBottom: '22px',
                lineHeight: '1.1',
                letterSpacing: '-0.03em',
              }}
            >
              Free tools, built properly.
            </h1>
            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '580px',
                fontWeight: '300',
                lineHeight: '1.75',
                margin: 0,
              }}
            >
              Small things we needed and could not find a decent UK version of, so we built them.
              No signup, no email wall, and nothing you enter is sent anywhere.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(50px, 7vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '820px' }}>
            {tools.map((t, i) => (
              <article
                key={t.href}
                style={{
                  paddingBottom: '44px',
                  marginBottom: '44px',
                  borderBottom:
                    i < tools.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--amber)',
                    marginBottom: '10px',
                    fontWeight: '500',
                  }}
                >
                  {t.forWho}
                </div>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', marginBottom: '16px' }}>
                  <Link href={t.href} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                    {t.name}
                  </Link>
                </h2>
                <p
                  style={{
                    fontSize: '17px',
                    lineHeight: '1.8',
                    color: 'var(--ink-2)',
                    marginBottom: '14px',
                    maxWidth: '700px',
                  }}
                >
                  {t.summary}
                </p>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: 'var(--ink-3)',
                    marginBottom: '22px',
                    maxWidth: '700px',
                  }}
                >
                  {t.detail}
                </p>
                <div style={{ display: 'flex', gap: '22px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link href={t.href} className="btn-primary" style={{ fontSize: '15px' }}>
                    Open {t.name.toLowerCase()}
                  </Link>
                  <Link
                    href={t.related.href}
                    style={{ fontSize: '14px', color: 'var(--ink-3)' }}
                  >
                    See our {t.related.label.toLowerCase()} work
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            padding: 'clamp(50px, 7vw, 80px) 0',
            background: 'var(--bg-2)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div className="container" style={{ maxWidth: '680px' }}>
            <h2 style={{ marginBottom: '20px' }}>Why these are free</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)', marginBottom: '18px' }}>
              Because the version we get paid for is the one built around a specific business. A tool
              that works for everyone has to make assumptions, and the assumptions are where the friction
              comes from. The data health check finds problems in a spreadsheet. It cannot stop them
              appearing next month, because that means changing how the data gets entered in the first place.
            </p>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)', marginBottom: '28px' }}>
              That is the work. These are a reasonable demonstration of how we approach it.
            </p>
            <Link href="/#contact" className="btn-primary">
              Book a free scoping call
            </Link>
          </div>
        </section>

        <section style={{ padding: 'clamp(50px, 7vw, 80px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <h2 style={{ marginBottom: '18px' }}>Something missing?</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)', marginBottom: '24px' }}>
              We add to this as we come across problems worth solving. If there is a calculation or a
              check you keep doing by hand and think other UK businesses probably do too, tell us and
              we will look at it. No promises, but the last three came from exactly that.
            </p>
            <Link href="/#contact" style={{ fontSize: '15px', color: 'var(--amber)' }}>
              Suggest a tool
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
