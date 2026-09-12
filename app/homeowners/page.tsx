import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/homeowners' },
  title: 'Free Tools for UK Homeowners | Renovation, Moving and Running Costs | Lexalytic',
  description: 'Free tools for people who own a home. What a renovation really costs beyond the builder quote, and whether a leasehold service charge bill is one you actually owe.',
  keywords: 'free tools for homeowners UK, renovation cost calculator, hidden costs of building work, home improvement budget UK, builder quote comparison',
  openGraph: {
    title: 'Free tools for UK homeowners',
    description: 'The costs nobody puts in the quote, and the records that settle the argument afterwards.',
    url: 'https://www.lexalytic.com/homeowners',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const live = [
  {
    href: '/tools/renovation-planner',
    name: 'Renovation cost planner',
    line: 'A builder quotes the building work. VAT, contingency, the structural engineer, Building Control, the party wall surveyor and somewhere to live while it happens are all yours, and together they add thirty to fifty per cent.',
    detail: 'Produces a scope document to send to three builders so the quotes come back answering the same questions.',
  },
  {
    href: '/tools/service-charge-check',
    name: 'Service charge and Section 20 checker',
    line: 'If you own a leasehold flat and a major works bill has arrived, the landlord had to consult properly before starting. Where they did not, and the tribunal does not excuse it, they can recover £250 from each leaseholder and no more, whatever the work cost.',
    detail: 'Checks the consultation stages, the eighteen month demand deadline, and what you are entitled to demand from them.',
  },
]

const coming = [
  ['Move or extend',
   'The honest comparison. Stamp duty, estate agent, legal fees and moving costs on one side, build cost and six months of disruption on the other.'],
  ['What buying actually costs',
   'Beyond the deposit. Stamp duty, survey, searches, legal fees, removals and the things that land in the first month of owning it.'],
  ['Running cost check',
   'What a property costs to keep, by age and construction type, so a survey finding is something you can put a number against.'],
  ['Maintenance schedule',
   'What needs doing and when, from gutters to the boiler service, so the expensive failures are the ones you saw coming.'],
]

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
      "name": "Free Tools for UK Homeowners",
      "item": "https://www.lexalytic.com/homeowners"
    }
  ]
}

export default function HomeownersPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px',
            color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>All Tools</Link>
            <Link href="/blog" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Blog</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
              Book free call
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '150px', paddingBottom: '70px', background: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--amber)', fontWeight: 500,
            letterSpacing: '0.04em', marginBottom: '20px' }}>
            FOR HOMEOWNERS
          </div>
          <h1 style={{ color: 'var(--white)', maxWidth: '760px', marginBottom: '24px',
            lineHeight: '1.1', letterSpacing: '-0.03em' }}>
            The costs nobody mentions until<br />
            <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>it is too late to plan for them.</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: '1.8',
            maxWidth: '660px', margin: 0 }}>
            We build software for businesses, mostly about money that leaves in ways nobody wrote down
            at the start. It turns out owning a house is the same problem in a different costume, so
            some of these ended up pointed at that instead. They are free and nothing is uploaded.
          </p>
        </div>
      </section>

      {/* Live tools */}
      <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <h2 style={{ marginBottom: '36px' }}>What is here now</h2>
          {live.map(t => (
            <Link key={t.href} href={t.href} style={{ display: 'block', padding: '32px 34px',
              borderRadius: 'var(--radius-lg)', background: 'var(--bg-2)',
              border: '1px solid var(--border)', textDecoration: 'none', marginBottom: '20px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)',
                letterSpacing: '-0.01em', marginBottom: '12px' }}>{t.name}</div>
              <p style={{ fontSize: '15.5px', color: 'var(--ink-2)', lineHeight: '1.8',
                margin: '0 0 12px', maxWidth: '680px' }}>{t.line}</p>
              <p style={{ fontSize: '14.5px', color: 'var(--ink-3)', lineHeight: '1.75',
                margin: '0 0 18px', maxWidth: '680px' }}>{t.detail}</p>
              <span style={{ fontSize: '14px', color: 'var(--amber)' }}>Open it</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming */}
      <section style={{ padding: 'clamp(50px, 7vw, 80px) 0', background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <h2 style={{ marginBottom: '16px' }}>What is coming</h2>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8',
            maxWidth: '640px', marginBottom: '40px' }}>
            Built in the order people ask for them. If one of these would be useful, say so and it moves
            up the list.
          </p>
          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '28px' }}>
            {coming.map(([name, line]) => (
              <div key={name}>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{name}</div>
                <p style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.8', margin: 0 }}>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honest note */}
      <section style={{ padding: 'clamp(50px, 7vw, 80px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <h2 style={{ marginBottom: '16px', maxWidth: '560px' }}>
            Why a business software studio has these
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85',
            maxWidth: '680px', marginBottom: '16px' }}>
            Most of what we do is for companies. Tracking money that is owed and has been forgotten
            about, working out which parts of a business quietly lose money, keeping the records that
            settle an argument months later.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85',
            maxWidth: '680px', marginBottom: '16px' }}>
            A renovation is all three of those at once, run by someone who has never done it before
            against somebody who does it every week. The tools transferred more or less directly.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85',
            maxWidth: '680px', marginBottom: '26px' }}>
            They are free because they cost us nothing to run and because a fair number of the people
            using them will turn out to run a business with a similar problem in it.
          </p>
          <Link href="/tools" style={{ fontSize: '15px', color: 'var(--amber)' }}>
            The business tools are here
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
