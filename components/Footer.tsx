'use client'
export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--white)', marginBottom: '6px' }}>
              Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: '300' }}>
              Websites, software, AI tools, and data systems — built properly.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { href: '/#services', label: 'Services' },
              { href: '/#work', label: 'Work' },
              { href: '/#results', label: 'Results' },
              { href: '/blog', label: 'Blog' },
              { href: '/about', label: 'About' },
              { href: '/#contact', label: 'Contact' },
            ].map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.8)'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
              >{l.label}</a>
            ))}
          </div>

          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Locations</div>
            {[['London', '/locations/london'], ['Manchester', '/locations/manchester'], ['Birmingham', '/locations/birmingham'], ['Leeds', '/locations/leeds'], ['Bristol', '/locations/bristol'], ['Edinburgh', '/locations/edinburgh'], ['Hertfordshire', '/locations/hertfordshire']].map(([label, href]) => (
              <a key={href} href={href} style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Industries</div>
            {[['Construction', '/industries/construction'], ['Recruitment', '/industries/recruitment'], ['Professional Services', '/industries/professional-services'], ['Healthcare', '/industries/healthcare']].map(([label, href]) => (
              <a key={href} href={href} style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Lexalytic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
