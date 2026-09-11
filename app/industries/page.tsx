import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { INDUSTRIES } from '@/lib/industries'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/industries' },
  title: 'Software and Tools by Industry | UK Businesses | Lexalytic',
  description: 'Free tools and software built for specific UK industries. Construction, property and lettings, recruitment, professional services and healthcare. Each one built around a problem that sector actually has.',
  keywords: 'industry specific software UK, construction software, HMO landlord software, recruitment agency software, professional services software UK, healthcare practice software',
  openGraph: {
    title: 'Software and Tools by Industry | Lexalytic',
    description: 'Built for one industry rather than for everyone. Pick yours.',
    url: 'https://www.lexalytic.com/industries',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Industries',
  description: 'Software and free tools built for specific UK industries.',
  url: 'https://www.lexalytic.com/industries',
  isPartOf: { '@id': 'https://www.lexalytic.com/#website' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: INDUSTRIES.map((ind, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ind.name,
      url: `https://www.lexalytic.com/industries/${ind.slug}`,
    })),
  },
}

export default function IndustriesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />

        <section style={{ paddingTop: '150px', paddingBottom: '70px', background: 'var(--bg-dark)',
          position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px', pointerEvents: 'none' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Industries</span>
            <h1 style={{ color: 'var(--white)', maxWidth: '720px', marginBottom: '24px',
              lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              Built for one industry,<br />
              <em style={{ color: 'var(--amber)' }}>not for everyone</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
              maxWidth: '640px', fontWeight: '300', lineHeight: '1.75', margin: 0 }}>
              Software that works for every business tends to fit none of them properly. Each of these
              started with a problem one sector kept solving by hand, and grew from a free tool into
              something more once enough people asked.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(50px, 7vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
              gap: '2px', background: 'var(--border)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {INDUSTRIES.map(ind => {
                const live = ind.product?.status === 'live'
                return (
                  <Link key={ind.slug} href={`/industries/${ind.slug}`} className="ind-tile"
                    style={{ background: 'var(--bg)', padding: '32px 34px',
                      textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center',
                      marginBottom: '12px', flexWrap: 'wrap' }}>
                      <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--ink)',
                        fontFamily: 'var(--serif)', fontWeight: '400' }}>
                        {ind.name}
                      </h2>
                      {live && (
                        <span style={{ fontSize: '10.5px', fontWeight: '600', letterSpacing: '0.04em',
                          color: '#3F6B4C', background: 'rgba(63,107,76,0.08)',
                          border: '1px solid rgba(63,107,76,0.22)', borderRadius: '3px',
                          padding: '2px 8px', textTransform: 'uppercase' }}>
                          Product live
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: '1.75',
                      margin: '0 0 16px', flex: 1 }}>
                      {ind.tileLine}
                    </p>

                    <div style={{ fontSize: '13px', color: 'var(--ink-4)', marginBottom: '14px' }}>
                      {ind.who}
                    </div>

                    <div style={{ fontSize: '13.5px', color: 'var(--ink-3)',
                      paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                      {ind.tools.length} free tool{ind.tools.length === 1 ? '' : 's'}
                      {ind.product ? `, ${ind.product.name}` : ''}
                      <span style={{ color: 'var(--amber)', marginLeft: '8px' }}>→</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section style={{ padding: 'clamp(50px, 7vw, 80px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)' }}>
          <div className="container" style={{ maxWidth: '680px' }}>
            <h2 style={{ marginBottom: '18px' }}>Not listed?</h2>
            <p style={{ fontSize: '17px', lineHeight: '1.8', color: 'var(--ink-2)', marginBottom: '16px' }}>
              These exist because somebody kept doing the same calculation by hand and we got tired of
              watching it. If there is something your sector does that way, tell us. Every one of these
              started as exactly that conversation.
            </p>
            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--ink-3)', marginBottom: '28px' }}>
              If the problem is specific to your business rather than your industry, that is a bespoke
              build, and our estimator will give you a range before you speak to anyone.
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

        <style>{`
          .ind-tile:hover { background: var(--bg-2) !important; }
        `}</style>
      </div>
    </>
  )
}
