import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductInterest from '@/components/ProductInterest'
import { INDUSTRIES, getIndustry } from '@/lib/industries'

export function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const ind = getIndustry(slug)
  if (!ind) return {}
  return {
    alternates: { canonical: `https://www.lexalytic.com/industries/${ind.slug}` },
    title: `${ind.name} | Software and Free Tools for UK ${ind.name} Businesses | Lexalytic`,
    description: ind.metaDescription,
    keywords: ind.keywords,
    openGraph: {
      title: `${ind.name} | Lexalytic`,
      description: ind.metaDescription,
      url: `https://www.lexalytic.com/industries/${ind.slug}`,
      siteName: 'Lexalytic',
      locale: 'en_GB',
      type: 'website',
    },
  }
}

const STATUS = {
  live: { label: 'Available now', color: '#3F6B4C', bg: 'rgba(63,107,76,0.08)', border: 'rgba(63,107,76,0.25)' },
  building: { label: 'In development', color: '#8F6318', bg: 'rgba(176,122,30,0.08)', border: 'rgba(176,122,30,0.25)' },
  considering: { label: 'Being scoped', color: '#57514A', bg: 'rgba(87,81,74,0.06)', border: 'rgba(87,81,74,0.18)' },
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const ind = getIndustry(slug)
  if (!ind) notFound()

  const others = INDUSTRIES.filter(i => i.slug !== ind.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${ind.name} software and tools`,
    description: ind.metaDescription,
    url: `https://www.lexalytic.com/industries/${ind.slug}`,
    isPartOf: { '@id': 'https://www.lexalytic.com/#website' },
    about: { '@type': 'Thing', name: ind.name },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ind.tools.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.name,
        url: `https://www.lexalytic.com${t.href}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
        <Navbar />

        {/* Hero */}
        <section style={{ paddingTop: '150px', paddingBottom: '70px', background: 'var(--bg-dark)',
          position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px', pointerEvents: 'none' }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <Link href="/industries" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)',
              marginBottom: '20px', display: 'inline-block' }}>
              Industries
            </Link>
            <h1 style={{ color: 'var(--white)', maxWidth: '740px', marginBottom: '22px',
              lineHeight: '1.1', letterSpacing: '-0.03em' }}>
              {ind.headline}
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)',
              maxWidth: '660px', fontWeight: '300', lineHeight: '1.75', margin: '0 0 8px' }}>
              {ind.intro}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
              {ind.who}
            </p>
          </div>
        </section>

        {/* Problems */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <h2 style={{ marginBottom: '40px' }}>What goes wrong</h2>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '34px' }}>
              {ind.problems.map(([h, p]) => (
                <div key={h}>
                  <h3 style={{ fontSize: '1.02rem', marginBottom: '10px', fontWeight: '600' }}>{h}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8', margin: 0 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free tools */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg-2)',
          borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <span className="section-label">Free tools</span>
            <h2 style={{ marginBottom: '14px', maxWidth: '520px' }}>Start with something free</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-3)', lineHeight: '1.8',
              maxWidth: '560px', marginBottom: '36px' }}>
              No signup and no email wall. Nothing you enter is sent anywhere.
            </p>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
              gap: '2px', background: 'var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {ind.tools.map(t => (
                <Link key={t.href} href={t.href} className="ind-tool"
                  style={{ background: 'var(--bg-2)', padding: '26px 28px', textDecoration: 'none', display: 'block' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '10px', fontWeight: '600', color: 'var(--ink)' }}>
                    {t.name} →
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', margin: 0 }}>
                    {t.line}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Product */}
        {ind.product && (
          <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg-dark)' }}>
            <div className="container" style={{ maxWidth: '840px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center',
                flexWrap: 'wrap', marginBottom: '16px' }}>
                <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  Product
                </span>
                <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.03em',
                  color: STATUS[ind.product.status].color,
                  background: STATUS[ind.product.status].bg,
                  border: `1px solid ${STATUS[ind.product.status].border}`,
                  borderRadius: '3px', padding: '3px 9px' }}>
                  {STATUS[ind.product.status].label}
                </span>
              </div>

              <h2 style={{ color: 'var(--white)', marginBottom: '22px' }}>{ind.product.name}</h2>

              <ul style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: '2',
                paddingLeft: '20px', margin: '0 0 32px', maxWidth: '620px' }}>
                {ind.product.does.map(d => <li key={d}>{d}</li>)}
              </ul>

              {ind.product.status === 'live' && ind.product.href ? (
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Link href={ind.product.href} className="btn-amber" style={{ fontSize: '15px' }}>
                    See {ind.product.name}
                  </Link>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
                    {ind.product.price}, 14 days free, no card needed
                  </span>
                </div>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-lg)', padding: '26px 28px' }}>
                  <ProductInterest
                    product={ind.product.name}
                    industry={ind.name}
                    status={ind.product.status === 'building' ? 'building' : 'considering'}
                    dark
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Services */}
        <section style={{ padding: 'clamp(60px, 8vw, 90px) 0', background: 'var(--bg)' }}>
          <div className="container">
            <span className="section-label">Bespoke work</span>
            <h2 style={{ marginBottom: '14px', maxWidth: '560px' }}>Or something built around your business</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-3)', lineHeight: '1.8',
              maxWidth: '580px', marginBottom: '36px' }}>
              Products solve the problem every {ind.name.toLowerCase()} business has. When the problem is
              yours specifically, that is a build.
            </p>
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {ind.services.map((s, i) => (
                <Link key={s.href} href={s.href} className="ind-service"
                  style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 220px) minmax(0, 1fr)',
                    gap: '24px', padding: '20px 26px', background: 'var(--white)',
                    borderBottom: i < ind.services.length - 1 ? '1px solid var(--border)' : 'none',
                    textDecoration: 'none', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--ink)' }}>{s.name}</span>
                  <span style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{s.line}</span>
                </Link>
              ))}
            </div>
            <div style={{ marginTop: '26px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-primary" style={{ fontSize: '15px' }}>
                Book a free scoping call
              </Link>
              <Link href="/tools/build-estimator" style={{ fontSize: '15px', color: 'var(--amber)' }}>
                Or price it yourself first
              </Link>
            </div>
          </div>
        </section>

        {/* Reading */}
        {ind.reading.length > 0 && (
          <section style={{ padding: 'clamp(50px, 7vw, 70px) 0', background: 'var(--bg-2)',
            borderTop: '1px solid var(--border)' }}>
            <div className="container" style={{ maxWidth: '760px' }}>
              <h2 style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', marginBottom: '20px' }}>
                Worth reading
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ind.reading.map(([title, href]) => (
                  <Link key={href} href={href} style={{ fontSize: '16px', color: 'var(--ink-2)' }}>
                    {title} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other industries */}
        <section style={{ padding: 'clamp(40px, 6vw, 60px) 0', background: 'var(--bg)',
          borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ fontSize: '13px', color: 'var(--ink-4)', marginBottom: '14px' }}>
              Other industries
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {others.map(o => (
                <Link key={o.slug} href={`/industries/${o.slug}`} style={{
                  fontSize: '14px', color: 'var(--ink-3)', textDecoration: 'none',
                  border: '1px solid var(--border)', borderRadius: '100px', padding: '7px 16px',
                }} className="ind-pill">
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        <style>{`
          .ind-tool:hover { background: var(--white) !important; }
          .ind-service:hover { background: var(--bg-2) !important; }
          .ind-pill:hover { border-color: var(--amber) !important; color: var(--amber) !important; }
          @media (max-width: 640px) {
            .ind-service { grid-template-columns: 1fr !important; gap: 6px !important; }
          }
        `}</style>
      </div>
    </>
  )
}
