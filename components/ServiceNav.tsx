import Link from 'next/link'

export default function ServiceNav() {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
          Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
        </Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
          <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← Home</Link>
          <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
          <Link href="/#pricing" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Pricing</Link>
          <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call →</Link>
        </div>
        <Link href="/#contact" className="btn-amber hamburger" style={{ display: 'none', padding: '10px 16px', fontSize: '13px' }}>Book free call →</Link>
      </div>
    </nav>
  )
}
