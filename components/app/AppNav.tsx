import Link from 'next/link'

export default function AppNav({ current }: { current?: string }) {
  const links = [
    { href: '/app', label: 'Jobs' },
    { href: '/app/applications', label: 'Applications' },
    { href: '/app/archive', label: 'Archive' },
    { href: '/app/team', label: 'Team' },
    { href: '/app/billing', label: 'Billing' },
    { href: '/app/settings', label: 'Settings' },
  ]
  return (
    <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '18px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
          <Link href="/app" style={{ fontFamily: 'Georgia, serif', fontSize: 20,
            letterSpacing: '-0.02em', color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: '#C17D2E' }}>alytic</span>
            <span style={{ fontFamily: 'inherit', fontSize: 13, color: '#8A8279', marginLeft: 12 }}>
              Retention Manager
            </span>
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" style={{ background: 'none', border: 0, font: 'inherit',
              fontSize: 14, color: '#8A8279', cursor: 'pointer' }}>Sign out</button>
          </form>
        </div>
        <nav style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {links.map(l => {
            const on = current === l.href
            return (
              <Link key={l.href} href={l.href} style={{
                fontSize: 14, padding: '9px 14px', textDecoration: 'none',
                color: on ? '#1A1815' : '#8A8279',
                fontWeight: on ? 600 : 400,
                borderBottom: on ? '2px solid #C17D2E' : '2px solid transparent',
                marginBottom: -1,
              }}>{l.label}</Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
