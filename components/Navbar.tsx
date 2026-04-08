'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services', label: 'Services' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#results', label: 'Results' },
    { href: '#tool', label: 'Free tool' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(15,15,15,0.08)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        
        {/* Logo */}
        <a href="#" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>
          Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: '14px', color: 'var(--ink-3)', fontWeight: '400', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--ink)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--ink-3)'}
            >{l.label}</a>
          ))}
          <a href="#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Book free call →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="hamburger" style={{
          display: 'none', flexDirection: 'column', gap: '5px',
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
        }}>
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--ink)', transition: 'all 0.2s',
            transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--ink)', transition: 'all 0.2s',
            opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--ink)', transition: 'all 0.2s',
            transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: 'var(--bg)', borderTop: '1px solid var(--border)',
          padding: '20px 24px 28px',
        }} className="mobile-menu">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0', fontSize: '16px', color: 'var(--ink)',
              borderBottom: '1px solid var(--border)',
            }}>{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
            Book free call →
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
