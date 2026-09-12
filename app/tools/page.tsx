import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools' },
  title: 'Free Tools for UK Businesses and Homeowners | Lexalytic',
  description: 'Free browser based tools for UK businesses. Check a spreadsheet for the errors that break UK systems, track construction retention across every job, see how much placement revenue is still refundable, and work out whether a property needs an HMO licence. No signup, nothing uploaded.',
  keywords: 'free business tools UK, custom software cost UK, bespoke software price, free data quality checker, spreadsheet error checker UK, construction retention tracker, pub GP calculator, delivery margin calculator, restaurant profit benchmark, renovation cost calculator UK, hidden renovation costs, lock-up days calculator, WIP days, recruitment rebate calculator, rebate exposure tracker, HMO licence checker, HMO compliance tracker, free landlord tools UK, UK compliance tools',
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
      {
        href: '/tools/service-charge-check',
        name: 'Service charge and Section 20 checker',
        forWho: 'Leaseholders',
        summary:
          'Where major works cost any leaseholder more than £250, the landlord has to consult properly first. If they did not, and the tribunal does not excuse it, recovery is capped at £250 each whatever the work cost. On a £20,000 bill that is most of the argument in one question.',
        detail:
          'It also checks the eighteen month rule under section 20B, which is the one almost nobody knows about and the one that does not require anybody to agree about what the work should have cost.',
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
        href: '/tools/spreadsheet-audit',
        name: 'Spreadsheet audit',
        forWho: 'Anyone with a spreadsheet that matters',
        summary:
          'A formula overwritten with a typed number still shows a number. A link to a file on somebody else\u2019s drive still shows the last value it saw. A column where one cell was edited by hand looks exactly like a column where none was. This reads the formulas rather than the values, which is the only way to see any of it.',
        detail:
          'The paid version traces what depends on what, names the cells everything else is built on, and writes the handover document that should have existed from the start.',
        related: { label: 'Excel automation', href: '/services/excel-automation' },
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
    heading: 'Hospitality',
    intro:
      'Margins in single digits, a third of a delivery order gone before you start, and benchmarks you get judged against.',
    tools: [
      {
        href: '/tools/restaurant-benchmark-check',
        name: 'Restaurant benchmark check',
        forWho: 'Restaurants, takeaways and pubs',
        summary:
          'HMRC publishes expected profit figures for restaurants and compares filed returns against them automatically. A business can be entirely straight and still sit below the range, because delivery commission, discounting and waste all depress margin without appearing anywhere obvious. This shows where you sit, how much of any gap your own circumstances account for, and what records would evidence it.',
        detail:
          'It also flags that Deliveroo, Uber Eats and Just Eat report your income to HMRC directly, which a lot of independents do not know.',
        related: { label: 'Power BI', href: '/services/power-bi' },
      },
      {
        href: '/tools/delivery-margin',
        name: 'Delivery margin calculator',
        forWho: 'Anyone on a delivery platform',
        summary:
          'A twelve pound dish returns about eight pounds forty after commission, before the VAT comes off or the box is paid for. Most kitchens price delivery identically to dine-in, which means the thinnest dishes lose money on every single order. This works out the real margin per dish, what you would need to charge to break even, and what to charge to earn the same margin you make in the restaurant.',
        detail:
          'Handles VAT in the right order, which is the bit most people get wrong. Commission comes off the net price, not the menu price.',
        related: { label: 'Custom business tools', href: '/services/custom-business-tools' },
      },
      {
        href: '/tools/pub-gp-calculator',
        name: 'GP calculator with wastage',
        forWho: 'Pubs, bars and kitchens',
        summary:
          'Most GP calculators do one product at a time and ignore wastage, which makes every number flattering. Line cleaning, ullage and over-pouring mean you buy more than you sell, so a pint costing a pound forty really costs a pound fifty. This does the whole range at once with wastage applied by category and shows both figures side by side.',
        detail:
          'Puts an annual cash figure on wastage, which is usually the thing that prompts someone to tighten cellar discipline.',
        related: { label: 'Excel automation', href: '/services/excel-automation' },
      },
      {
        href: '/tools/labour-by-session',
        name: 'Labour by session',
        forWho: 'Anyone writing a rota',
        summary:
          'The week looks profitable while two sessions carry the rest. This works out contribution per session using what an hour actually costs, which is around 26 per cent above the rate once holiday accrual, employer National Insurance and pension are added. An hour at thirteen pounds twenty costs sixteen pounds sixty eight.',
        detail:
          'It also argues against the obvious conclusion, since rent runs whether you open or not and most weak sessions are overstaffed at the edges rather than unviable.',
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
  {
    heading: 'Homeowners',
    intro:
      'Not business tools, but the same problem: money leaving in ways nobody wrote down at the start. There are more of these at /homeowners.',
    tools: [
      {
        href: '/tools/renovation-planner',
        name: 'Renovation cost planner',
        forWho: 'Anyone having building work done',
        summary:
          'Cost overrun is what homeowners regret most, and the commonest cause of a fight with a builder is not late payment but work nobody agreed to in writing. A builder quotes the building work. VAT, contingency, the structural engineer, Building Control, the party wall surveyor and somewhere to live while it happens are all yours, and together they add thirty to fifty per cent.',
        detail:
          'It also produces a scope document to send to three builders, so the quotes come back answering the same questions rather than three different ones.',
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
      "name": "Free Tools for UK Businesses and Homeowners",
      "item": "https://www.lexalytic.com/tools"
    }
  ]
}

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
