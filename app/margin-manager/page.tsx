import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/margin-manager' },
  title: 'Margin Manager | Recipe Costing and Margin Evidence for UK Restaurants | Lexalytic',
  description: 'Photograph an invoice and every dish recosts. See which dishes lose money on delivery. Keep the waste and comp records that explain a margin below benchmark. From £49 a month.',
  keywords: 'restaurant recipe costing software UK, dish costing software, delivery margin software, pub GP software, restaurant margin software UK, food cost software small restaurant',
  openGraph: {
    title: 'Margin Manager, for restaurants that need to know where the margin went',
    description: 'Invoice scanning, dish costing, delivery margin and the records that explain a low gross profit.',
    url: 'https://www.lexalytic.com/margin-manager',
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
      name: 'How does the invoice scanning work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Photograph a delivery note on your phone or upload a PDF. The line items come back read and matched against your ingredients, with the old price and the new one side by side. Nothing is applied until you confirm it, because a wrong price would move every dish containing that ingredient. Once you confirm a match it is remembered, so the next invoice from that supplier is mostly a glance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does it cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Forty nine pounds a month for one site, eighty nine for as many as you run. Fourteen days free with no card needed. Comparable products start around a hundred and thirty pounds per site per month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can it handle a base sauce used across several dishes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, and this is the part most recipe software does badly. Cost a base gravy, a stock or a dough once and use it inside other dishes. When an onion price moves, every dish containing the base recosts automatically rather than needing thirty separate edits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does it keep a waste and comp log?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Two reasons. Operationally it tells you where stock is going. The other reason is that HMRC compares filed restaurant returns against expected profit figures automatically, and a business can sit below the range for entirely legitimate causes such as delivery commission, discounting and waste. A dated record kept at the time carries far more weight than the same figures estimated a year later.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to connect my till or accounting system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Nothing needs integrating, which is deliberate, because integration projects are where this kind of software usually stalls. Sales volumes are entered periodically and invoices are photographed. You can be costing dishes within an hour of signing up.',
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
      "name": "Margin Manager",
      "item": "https://www.lexalytic.com/margin-manager"
    }
  ]
}

export default function MarginManagerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
              <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Free Tools</Link>
              <Link href="/industries/hospitality" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Hospitality</Link>
              <Link href="/signup" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                Start free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ paddingTop: '150px', paddingBottom: '80px', background: 'var(--bg-dark)' }}>
          <div className="container">
            <div style={{ fontSize: '13px', color: 'var(--amber)', fontWeight: 500,
              letterSpacing: '0.04em', marginBottom: '20px' }}>
              MARGIN MANAGER
            </div>
            <h1 style={{ color: 'var(--white)', maxWidth: '780px', marginBottom: '24px',
              lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              Recipe costing for restaurants that need to know<br />
              <em style={{ color: 'var(--amber)', fontStyle: 'italic' }}>where the margin actually went.</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: '1.8',
              maxWidth: '640px', marginBottom: '36px' }}>
              Photograph a delivery note and every dish using those ingredients recosts itself. See which
              dishes lose money once a platform has taken its third. And keep the records that explain a
              gross profit below benchmark, because you cannot reconstruct last year's waste log once a
              letter arrives.
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Start the 14 day trial
              </Link>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
                No card needed. £49 a month after that.
              </span>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '24px' }}>What actually goes wrong</h2>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px',
              maxWidth: '980px' }}>
              {[
                ['Costing by hand cannot keep up',
                 'Costing a dish manually takes around 28 minutes and prices move weekly. A dish costed at 30 per cent food cost in January can be running at 36 by March with nobody aware, because nobody has the hours to redo it.'],
                ['Delivery commission is invisible in the accounts',
                 'Platforms take 25 to 35 per cent, so a £12 dish returns about £8.40. It does not appear in cost of sales, so gross profit looks fine while net quietly disappears. Most kitchens price delivery identically to dine-in.'],
                ['A supplier rise runs for six weeks before anyone notices',
                 'Nobody checks every line on every invoice. The increase goes through, margin drops, and the cause is only found later if at all. Meanwhile every dish containing that ingredient is quietly earning less.'],
                ['You get benchmarked whether you like it or not',
                 'HMRC publishes expected profit figures for restaurants and compares filed returns against them automatically. A business can be entirely straight and still sit below the range. The difficulty is evidencing that afterwards.'],
              ].map(([h, p]) => (
                <div key={h}>
                  <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{h}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.8', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What it does */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ maxWidth: '560px', marginBottom: '16px' }}>What it does</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8',
              maxWidth: '640px', marginBottom: '48px' }}>
              Two halves. One keeps your margin where it should be. The other proves why it is where it is.
            </p>

            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '40px' }}>
              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '18px', color: 'var(--amber)' }}>
                  Keeping the margin
                </h3>
                {[
                  ['Invoice scanning', 'Photograph a delivery note. Line items come back read and matched, with the old price against the new. You confirm before anything changes.'],
                  ['Recipe costing that cascades', 'Cost a base sauce once and use it in thirty dishes. Move the onion price and all thirty recost. Most recipe software handles this badly.'],
                  ['Delivery margin by dish', 'What each dish returns on each platform after VAT and commission, in the right order. Plus what you would need to charge to match your dine-in margin.'],
                  ['Menu engineering', 'Every dish sorted by what it earns and how well it sells. Stars, plough horses, puzzles and dogs, from sales figures you enter rather than a till integration.'],
                  ['Labour by session', 'Contribution per trading session using what an hour actually costs, which is around 26 per cent above the rate once holiday, National Insurance and pension are in.'],
                ].map(([h, p]) => (
                  <div key={h} style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '5px' }}>{h}</div>
                    <div style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.75' }}>{p}</div>
                  </div>
                ))}
              </div>

              <div>
                <h3 style={{ fontSize: '17px', marginBottom: '18px', color: 'var(--amber)' }}>
                  Proving why it is what it is
                </h3>
                {[
                  ['The evidence log', 'Waste, comps, discounts and staff meals recorded as they happen, dated and signed off. It tracks how many days actually have an entry, because a log with gaps is much weaker than one that runs continuously.'],
                  ['Benchmark tracking', 'Where your gross and net margin sit against the published range for your format, period by period, so a drift shows while you can still do something about it.'],
                  ['Stock variance over time', 'The gap between what should have gone and what did, tracked rather than counted and filed. Under two per cent is normal, above three is worth investigating.'],
                  ['Platform reconciliation', 'Delivery platforms report your income to HMRC directly. Record the statement alongside your own figure and a mismatch surfaces here rather than somewhere less comfortable.'],
                  ['Ingredient price history', 'Every price change dated and sourced to its invoice, so when somebody asks why margin moved in March the answer is in the system rather than in a memory.'],
                ].map(([h, p]) => (
                  <div key={h} style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '5px' }}>{h}</div>
                    <div style={{ fontSize: '14.5px', color: 'var(--ink-2)', lineHeight: '1.75' }}>{p}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Free version */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <h2 style={{ marginBottom: '16px' }}>There are free versions</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8',
              maxWidth: '640px', marginBottom: '36px' }}>
              Four of them, and they are genuinely useful on their own. They work out where you stand
              once. The paid version is for keeping it that way, and for having the records when it
              matters.
            </p>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '20px' }}>
              {[
                ['Delivery margin calculator', '/tools/delivery-margin', 'Which dishes lose money on each platform, and what to charge instead.'],
                ['GP calculator with wastage', '/tools/pub-gp-calculator', 'Gross profit across the whole range with wastage applied by product type.'],
                ['Labour by session', '/tools/labour-by-session', 'Which trading sessions contribute and which merely cover themselves.'],
                ['Benchmark check', '/tools/restaurant-benchmark-check', 'Where you sit against the published profit figures, and what explains a gap.'],
              ].map(([name, href, line]) => (
                <Link key={href} href={href} style={{ display: 'block', padding: '22px 24px',
                  borderRadius: 'var(--radius)', border: '1px solid var(--border)',
                  background: 'var(--bg-2)', textDecoration: 'none' }}>
                  <div style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--ink)',
                    marginBottom: '6px' }}>{name}</div>
                  <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7' }}>{line}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
          <div className="container">
            <h2 style={{ color: 'var(--white)', marginBottom: '12px' }}>Pricing</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: '1.8',
              maxWidth: '620px', marginBottom: '44px' }}>
              Fourteen days free, no card. Comparable products start around £129 per site per month.
            </p>

            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px', maxWidth: '820px' }}>
              {[
                ['Solo', 49, 'One site, everything in it.', [
                  'Invoice scanning',
                  'Recipe costing with components',
                  'Delivery margin on every channel',
                  'Menu engineering and stock variance',
                  'Labour by session',
                  'The evidence log and benchmark tracking',
                ]],
                ['Multi-site', 89, 'As many sites as you run.', [
                  'Everything in Solo',
                  'Unlimited sites under one login',
                  'Compare margin and labour between them',
                  'Useful when the same dish costs different money in different kitchens',
                ]],
              ].map(([name, price, blurb, features]: any) => (
                <div key={name} style={{ padding: '30px 28px', borderRadius: 'var(--radius-lg)',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '15px', color: 'var(--amber)', fontWeight: 600,
                    marginBottom: '10px' }}>{name}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '38px', color: 'var(--white)',
                    lineHeight: 1, marginBottom: '6px' }}>
                    £{price}<span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)' }}> a month</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)',
                    marginBottom: '20px' }}>{blurb}</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {features.map((f: string) => (
                      <li key={f} style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.7)',
                        lineHeight: '1.7', paddingLeft: '18px', position: 'relative',
                        marginBottom: '9px' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--amber)' }}>·</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '36px' }}>
              <Link href="/signup" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Start the trial
              </Link>
            </div>
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

        {/* Close */}
        <section style={{ padding: 'clamp(60px, 8vw, 80px) 0', background: 'var(--ink)' }}>
          <div className="container">
            <h2 style={{ color: 'var(--white)', marginBottom: '18px', maxWidth: '620px' }}>
              You cannot reconstruct last year's waste log
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: '1.8',
              maxWidth: '580px', marginBottom: '30px' }}>
              The operational half of this pays for itself on the first supplier increase you catch. The
              other half only matters once, and by then it is too late to start.
            </p>
            <Link href="/signup" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>
              Start free for 14 days
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
