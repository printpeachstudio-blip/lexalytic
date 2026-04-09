'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#services', label: 'Services' },
    { href: '/#how-it-works', label: 'How it works' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#results', label: 'Results' },
    { href: '/blog', label: 'Blog' },
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
        <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: scrolled ? 'var(--ink)' : 'var(--white)', letterSpacing: '-0.03em' }}>
          Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: '14px', color: scrolled ? 'var(--ink-3)' : 'rgba(255,255,255,0.8)', fontWeight: '400', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = scrolled ? 'var(--ink)' : 'var(--white)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = scrolled ? 'var(--ink-3)' : 'rgba(255,255,255,0.8)'}
            >{l.label}</Link>
          ))}
          <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Book free call →
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} className="hamburger">
          <div style={{ width: '22px', height: '2px', background: scrolled ? 'var(--ink)' : 'var(--white)', marginBottom: '5px', transition: 'all 0.3s' }} />
          <div style={{ width: '22px', height: '2px', background: scrolled ? 'var(--ink)' : 'var(--white)', marginBottom: '5px', transition: 'all 0.3s' }} />
          <div style={{ width: '22px', height: '2px', background: scrolled ? 'var(--ink)' : 'var(--white)', transition: 'all 0.3s' }} />
        </button>
      </div>

      {open && (
        <div style={{ background: 'rgba(250,250,248,0.98)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ display: 'block', padding: '12px 0', fontSize: '16px', color: 'var(--ink-2)', borderBottom: '1px solid var(--border)' }}
            >{l.label}</Link>
          ))}
          <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center', display: 'flex' }}>
            Book free call →
          </Link>
        </div>
      )}
    </nav>
  )
}
