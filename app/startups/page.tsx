import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/startups' },
  title: 'Software for UK Startups | What to Build and When | Lexalytic',
  description: 'Most new businesses do not need custom software yet. Here is how to tell when you do, what it costs, and what to use in the meantime. Honest advice from a UK studio that would rather tell you to wait than sell you something early.',
  keywords: 'software for startups UK, custom CRM startup, startup website development UK, when to build custom software, MVP development UK, software cost for new business',
  openGraph: {
    title: 'Most startups do not need custom software yet',
    description: 'How to tell when you do, what it costs, and what to use until then.',
    url: 'https://www.lexalytic.com/startups',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When should a startup build custom software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When an off the shelf tool genuinely cannot do the thing your business is built on, or when you are paying for several tools and stitching them together by hand every week. Before that, building is usually slower and more expensive than subscribing. The exception is where the software is the product rather than something that supports it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a website cost for a new business in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A well built marketing site is typically two to five thousand pounds. Add booking, accounts or payments and it moves to five to nine. The cost is driven by how many distinct things it has to do rather than by how many pages it has, and a five page site that takes bookings costs more than a twenty page site that does not.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should a startup buy a CRM or build one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Buy one, almost always. HubSpot has a free tier and Pipedrive starts at a few pounds a month per user. Building a CRM makes sense only once an off the shelf one is actively getting in the way, which usually means your sales process does something unusual that the software cannot represent. That is a real situation but it is not a first year situation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to the code if we stop working together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You own it. The code, the repository, the domain, the hosting account and the documentation. Nothing sits behind a licence you have to keep paying for and nothing depends on us being reachable in two years. That matters more for a young business than for an established one, because you are more likely to change direction.',
      },
    },
  ],
}

export default function StartupsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <div style={{ background: 'var(--bg)' }}>
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
              <Link href="/tools/build-estimator" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>
                Cost estimator
              </Link>
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
              FOR NEW BUSINESSES
            </div>
            <h1 style={{ color: 'var(--white)', maxWidth: '740px', marginBottom: '24px',
              lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              You probably do not need<br />
              <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>custom software yet.</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: '1.8',
              maxWidth: '650px', margin: '0 0 32px' }}>
              That is an odd thing for a software studio to lead with, but it is true most of the time
              and you will find out eventually anyway. Here is how to tell when you do need it, what to
              use in the meantime, and what it costs when the day comes.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/tools/build-estimator" className="btn-amber"
                style={{ fontSize: '15px', padding: '14px 28px' }}>
                Price something up
              </Link>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
                Free, and it tells you if the answer is no
              </span>
            </div>
          </div>
        </section>

        {/* Don't build yet */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '16px', maxWidth: '620px' }}>
              What to use instead, for now
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85',
              maxWidth: '660px', marginBottom: '40px' }}>
              A new business changes shape every few months. Software built around what you are doing in
              March is frequently wrong by September, and you will have paid for it either way. Rent
              until the shape settles.
            </p>

            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '32px' }}>
              {[
                ['Customers and sales',
                 'HubSpot has a genuinely usable free tier. Pipedrive is a few pounds a month. Do not build a CRM in year one. The only reason to build one is that your sales process does something an off the shelf tool cannot represent, and almost nobody knows that in year one.'],
                ['Money',
                 'Xero or FreeAgent, and a bookkeeper for a few hours a month. The temptation to run it on a spreadsheet is strong and the cost of unpicking that later is high, because Making Tax Digital now requires software anyway.'],
                ['Getting things done',
                 'Notion, Trello or a shared document. The tool matters far less than everybody using the same one. Most young businesses have three half used systems and a WhatsApp group where the decisions actually happen.'],
                ['Booking and payments',
                 'Calendly, Stripe, SumUp. All of them work out of the box and none needs building. Stripe in particular does more than most people realise before they start writing code.'],
              ].map(([h, p]) => (
                <div key={h}>
                  <h3 style={{ fontSize: '17px', marginBottom: '10px' }}>{h}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.8', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When you do */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '16px', maxWidth: '620px' }}>
              When building actually makes sense
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85',
              maxWidth: '660px', marginBottom: '40px' }}>
              Four situations. If none of these is you, save the money.
            </p>

            {[
              ['The software is the business',
               'You are selling the thing itself rather than using it to run something else. Then it is not an overhead, it is the product, and the conversation is completely different.'],
              ['Off the shelf actively gets in the way',
               'Not that it is imperfect, everything is imperfect. That you are working around it every day, or paying for four tools and copying between them by hand every week. Count the hours before deciding, because the answer is often smaller than it feels.'],
              ['The thing you do is genuinely unusual',
               'If your process is the reason customers choose you, and no product supports it, that is a real case. A recruitment agency with an ordinary process should buy a CRM. One with an unusual model may not be able to.'],
              ['You need to look bigger than you are',
               'A client portal under your own name changes how a small business is perceived by a large one. That is a real commercial reason rather than vanity, and it is usually cheaper than people expect.'],
            ].map(([h, p], i) => (
              <div key={h} style={{ display: 'flex', gap: '22px', marginBottom: '28px',
                maxWidth: '760px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: 'var(--amber)',
                  lineHeight: 1, flexShrink: 0, width: '36px' }}>{i + 1}</div>
                <div>
                  <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>{h}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.8', margin: 0 }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What it costs */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '16px' }}>What it costs</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85',
              maxWidth: '660px', marginBottom: '36px' }}>
              Published, because the alternative is you spending an hour on a call to find out you
              cannot afford it. Every one of these is fixed price agreed before we start.
            </p>

            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px',
              marginBottom: '32px' }}>
              {[
                ['A website that works', '£2,000 to £5,000',
                 'Fast, findable, yours. Add bookings or payments and it moves up.'],
                ['One thing that does one job', '£2,000 to £6,000',
                 'A quoting tool, a booking system, a portal. Narrow and finished rather than broad and ongoing.'],
                ['Something to run the operation', '£6,000 to £12,000',
                 'Where several parts of the business meet. Usually the second build rather than the first.'],
              ].map(([name, price, line]) => (
                <div key={name} style={{ padding: '26px 28px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>{name}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--amber)',
                    marginBottom: '10px' }}>{price}</div>
                  <div style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.75' }}>{line}</div>
                </div>
              ))}
            </div>

            <Link href="/tools/build-estimator" style={{ fontSize: '15px', color: 'var(--amber)' }}>
              Price your own idea with the free estimator
            </Link>
          </div>
        </section>

        {/* Ownership */}
        <section style={{ padding: 'clamp(50px, 7vw, 80px) 0', background: 'var(--ink)' }}>
          <div className="container">
            <h2 style={{ color: 'var(--white)', marginBottom: '18px', maxWidth: '620px' }}>
              You own it, which matters more when you are small
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: '1.85',
              maxWidth: '620px', marginBottom: '16px' }}>
              The code, the repository, the domain, the hosting account, the documentation. Nothing sits
              behind a licence you keep paying for and nothing depends on us being reachable in two
              years.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: '1.85',
              maxWidth: '620px', marginBottom: '30px' }}>
              That matters more for a young business than an established one, because you are far more
              likely to change direction. If the thing we build stops fitting, you can take it to
              somebody else or throw it away, and neither costs you a negotiation.
            </p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Book a free call
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '40px' }}>Questions</h2>
            <div style={{ maxWidth: '740px' }}>
              {faqData.mainEntity.map((q: any) => (
                <div key={q.name} style={{ marginBottom: '32px', paddingBottom: '32px',
                  borderBottom: '1px solid var(--border)' }}>
                  <h3 style={{ fontSize: '17px', marginBottom: '12px' }}>{q.name}</h3>
                  <p style={{ fontSize: '15.5px', color: 'var(--ink-2)', lineHeight: '1.85',
                    margin: 0 }}>{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
