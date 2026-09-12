import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Page not found | Lexalytic',
  robots: { index: false, follow: true },
}

const useful = [
  ['Free tools', '/tools', 'Fifteen of them, all free, nothing uploaded'],
  ['What we build', '/#services', 'Websites, custom software, data systems'],
  ['Blog', '/blog', 'A hundred or so posts, mostly about spreadsheets'],
  ['For homeowners', '/homeowners', 'Renovation costs and leasehold service charges'],
  ['For new businesses', '/startups', 'Including when not to build anything'],
  ['Get in touch', '/#contact', 'A free half hour call, no commitment'],
]

export default function NotFound() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center',
          height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px',
            color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
        </div>
      </nav>

      <section style={{ padding: 'clamp(60px, 10vw, 110px) 0' }}>
        <div className="container">
          <div style={{ fontSize: '13px', color: 'var(--amber)', fontWeight: 500,
            letterSpacing: '0.04em', marginBottom: '18px' }}>
            404
          </div>
          <h1 style={{ maxWidth: '620px', marginBottom: '20px', lineHeight: '1.12',
            letterSpacing: '-0.02em' }}>
            That page is not here
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8',
            maxWidth: '600px', marginBottom: '12px' }}>
            Either it moved, or it never existed, or we broke a link. The rest of the site is fine,
            it is just this address that is not.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8',
            maxWidth: '600px', marginBottom: '48px' }}>
            If you followed a link from somewhere on this site, we would rather know about it than
            not. <a href="/#contact" style={{ color: 'var(--amber)' }}>Tell us</a> and we will fix it.
          </p>

          <div style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '18px',
            maxWidth: '880px' }}>
            {useful.map(([label, href, line]) => (
              <Link key={href} href={href} style={{ display: 'block', padding: '22px 24px',
                borderRadius: 'var(--radius)', background: 'var(--bg-2)',
                border: '1px solid var(--border)', textDecoration: 'none' }}>
                <div style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--ink)',
                  marginBottom: '6px' }}>{label}</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: '1.7' }}>{line}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
