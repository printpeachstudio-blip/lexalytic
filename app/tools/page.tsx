import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools' },
  title: 'Free Tools for UK Businesses | Data, Construction, Recruitment, Property | Lexalytic',
  description: 'Free browser based tools for UK businesses. Check a spreadsheet for the errors that break UK systems, track construction retention across every job, see how much placement revenue is still refundable, and work out whether a property needs an HMO licence. No signup, nothing uploaded.',
  keywords: 'free business tools UK, custom software cost UK, bespoke software price, free data quality checker, spreadsheet error checker UK, construction retention tracker, lock-up days calculator, WIP days, recruitment rebate calculator, rebate exposure tracker, HMO licence checker, HMO compliance tracker, free landlord tools UK, UK compliance tools',
  openGraph: {
    title: 'Free Tools for UK Businesses | Lexalytic',
    description: 'Spreadsheet data quality, construction retention, recruitment rebate exposure, HMO licensing and certificates. Free, no signup, nothing uploaded.',
    url: 'https://www.lexalytic.com/tools',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const groups = [
  {
    heading: 'Thinking about building something',
    intro:
      'The question everyone answers with it depends, answered properly.',
    tools: [
      {
        href: '/tools/build-estimator',
        name: 'Build cost estimator',
        forWho: 'Anyone weighing up a custom system',
        summary:
          'Answer five questions about the shape of what you need and get an indicative price and timeline, with every line itemised and explained. Not a headline figure that grows once you are talking to someone. It shows what a second user group actually adds and why, what a Xero connection costs, and why migrating four inconsistent spreadsheets costs more than starting fresh.',
        detail:
          'It produces a written brief you can download and take to any developer. It covers what any of them will ask you.',
        related: { label: 'Custom business tools', href: '/services/custom-business-tools' },
      },
    ],
  },
  {
    heading: 'Spreadsheets and data',
    intro:
      'Most business data problems are invisible until something downstream fails. These find them first.',
    tools: [
      {
        href: '/tools/reporting-cost',
        name: 'Manual reporting cost calculator',
        forWho: 'Anyone rebuilding the same report every month',
        summary:
          'Works out what manual reporting actually costs, by role, using true employment cost rather than salary. Most calculators multiply hours by salary and understate it by roughly a third, because an hour of someone\u2019s time costs their salary plus employer National Insurance plus pension, spread across the weeks they actually work rather than all fifty two.',
        detail:
          'It also shows the hours in working weeks, flags where an expensive person is doing cheap work, and calculates how quickly automating it would pay for itself.',
        related: { label: 'Custom business tools', href: '/services/custom-business-tools' },
      },
      {
        href: '/tools/data-health-check',
        name: 'Data health check',
        forWho: 'Anyone importing a customer or supplier list',
        summary:
          'Drop in a CSV and it checks the things that quietly break UK business systems. VAT numbers are run through the HMRC mod-97 checksum rather than just a length test, so it catches a transposed digit that looks perfectly valid. Company numbers are checked for the leading zero Excel strips off, which is the single most common reason a Companies House lookup fails. It also finds mixed date formats, invalid postcodes, duplicate records and the same email address sitting on two different rows.',
        detail: 'Nothing is uploaded. The file is read in your browser and never leaves it.',
        related: { label: 'Data cleansing', href: '/services/data-cleansing' },
      },
    ],
  },
  {
    heading: 'Construction',
    intro:
      'Money you have already earned but cannot yet access, and the dates that decide when you get it.',
    tools: [
      {
        href: '/tools/retention-tracker',
        name: 'Retention tracker',
        forWho: 'Subcontractors and trades',
        summary:
          'Retention is rarely disputed. It is forgotten, because the second half falls due twelve months after practical completion when nobody is watching the contract any more. Add your jobs and this works out what is held, whether deduction has passed the cap it should have stopped at, and the date each half falls due. Overdue releases are flagged with the statutory interest accruing on them at eight points over base.',
        detail:
          'There is also Retention Manager, a subscription version with an account behind it, email reminders before each release falls due, and application letters generated from your data. From £19 a month.',
        related: { label: 'Retention Manager', href: '/retention-manager' },
      },
    ],
  },
  {
    heading: 'Professional services',
    intro:
      'The gap between doing the work and having the money, and which jobs are causing most of it.',
    tools: [
      {
        href: '/tools/lockup-tracker',
        name: 'Lock-up and cash release tracker',
        forWho: 'Agencies, consultancies, accountancy and law firms',
        summary:
          'Lock-up is work delivered but not billed, plus work billed but not collected. Most firms measure the second half and never the first, because unbilled time sits in a time recording system rather than on a balance sheet. This builds both from job level, so you get the number without having to find a work in progress figure that does not exist anywhere. It then names the jobs to bill and the invoices to chase, ranked by what each releases.',
        detail:
          'A paid cash release plan turns that into something you can put in front of partners, with the priority order and what ten days off your lock-up would be worth.',
        related: { label: 'Power BI', href: '/services/power-bi' },
      },
    ],
  },
  {
    heading: 'Recruitment',
    intro:
      'Revenue you have already billed, and the part of it a client can still ask for back.',
    tools: [
      {
        href: '/tools/rebate-exposure',
        name: 'Rebate exposure tracker',
        forWho: 'Perm desks and agency owners',
        summary:
          'Every permanent placement inside its rebate window is a contingent liability, and individually nobody worries about it. Across a desk carrying fifteen live placements it becomes a number worth knowing, particularly if three go in the same month. This tracks what each placement is worth on its sliding scale today, when it falls out of the window, and where an unpaid invoice complicates the position.',
        detail:
          'A paid desk exposure report puts the figure into something you can take to a board meeting or an invoice finance provider.',
        related: { label: 'Custom business tools', href: '/services/custom-business-tools' },
      },
    ],
  },
  {
    heading: 'Property and lettings',
    intro:
      'The licensing rules did not change in 2026. What it costs to get them wrong did.',
    tools: [
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
    ],
  },
]

const allTools = groups.flatMap(g => g.tools)


const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free Tools for UK Businesses',
  description:
    'A set of free browser based tools for UK businesses covering spreadsheet data quality, construction retention, recruitment rebate exposure, HMO licensing and certificate renewal.',
  url: 'https://www.lexalytic.com/tools',
  isPartOf: { '@type': 'WebSite', name: 'Lexalytic', url: 'https://www.lexalytic.com' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: allTools.map((t, i) => ({
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
            {groups.map((g, gi) => (
              <div key={g.heading} style={{ marginBottom: gi < groups.length - 1 ? '68px' : '0' }}>
                <div style={{ marginBottom: '32px', paddingBottom: '18px', borderBottom: '2px solid var(--ink)' }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 1.9rem)', marginBottom: '10px' }}>{g.heading}</h2>
                  <p style={{ fontSize: '16px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0, maxWidth: '620px' }}>
                    {g.intro}
                  </p>
                </div>

                {g.tools.map((t, i) => (
                  <article
                    key={t.href}
                    style={{
                      paddingBottom: '38px',
                      marginBottom: '38px',
                      borderBottom: i < g.tools.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: 'var(--amber)', marginBottom: '10px', fontWeight: '500' }}>
                      {t.forWho}
                    </div>
                    <h3 style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', marginBottom: '14px', fontFamily: 'var(--serif)', fontWeight: '400' }}>
                      <Link href={t.href} style={{ color: 'var(--ink)', textDecoration: 'none' }}>{t.name}</Link>
                    </h3>
                    <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)', marginBottom: '14px', maxWidth: '700px' }}>
                      {t.summary}
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--ink-3)', marginBottom: '22px', maxWidth: '700px' }}>
                      {t.detail}
                    </p>
                    <div style={{ display: 'flex', gap: '22px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <Link href={t.href} className="btn-primary" style={{ fontSize: '15px' }}>
                        Open {t.name.toLowerCase()}
                      </Link>
                      <Link href={t.related.href} style={{ fontSize: '14px', color: 'var(--ink-3)' }}>
                        See our {t.related.label.toLowerCase()} work
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
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
