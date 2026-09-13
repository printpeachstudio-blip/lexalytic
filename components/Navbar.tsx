'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * Pages whose hero is dark, where the navbar can sit transparently over it
 * until the reader scrolls. Everywhere else the page starts light and the
 * navbar has to be solid from the outset or the links are invisible.
 */
const DARK_HERO = ['/', '/startups', '/homeowners']
const DARK_HERO_PREFIXES = ['/industries']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname() || '/'

  const overDarkHero =
    DARK_HERO.includes(pathname) ||
    DARK_HERO_PREFIXES.some(p => pathname.startsWith(p))

  // On a light page the navbar is solid from the start, otherwise the
  // links are white on cream and nobody can read them.
  const solid = scrolled || !overDarkHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    // Check on mount too. Landing on an anchor like /#products jumps past
    // the hero without firing a scroll event, which would otherwise leave
    // the navbar transparent over a light section.
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/#services', label: 'Services' },
    { href: '/#work', label: 'Work' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/tools', label: 'Free Tools' },
    { href: '/industries', label: 'Industries' },
  { href: '/#products', label: 'Products' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: solid ? 'rgba(250,250,248,0.95)' : 'transparent',
      backdropFilter: solid ? 'blur(12px)' : 'none',
      borderBottom: solid ? '1px solid rgba(15,15,15,0.08)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: solid ? 'var(--ink)' : 'var(--white)', letterSpacing: '-0.03em' }}>
          Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
        </Link>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{ fontSize: '14px', color: solid ? 'var(--ink-3)' : 'rgba(255,255,255,0.8)', fontWeight: '400', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = solid ? 'var(--ink)' : 'var(--white)'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = solid ? 'var(--ink-3)' : 'rgba(255,255,255,0.8)'}
            >{l.label}</Link>
          ))}
          <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Book free call →
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close the menu' : 'Open the menu'} aria-expanded={open} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }} className="hamburger">
          <div style={{ width: '22px', height: '2px', background: solid ? 'var(--ink)' : 'var(--white)', marginBottom: '5px', transition: 'all 0.3s' }} />
          <div style={{ width: '22px', height: '2px', background: solid ? 'var(--ink)' : 'var(--white)', marginBottom: '5px', transition: 'all 0.3s' }} />
          <div style={{ width: '22px', height: '2px', background: solid ? 'var(--ink)' : 'var(--white)', transition: 'all 0.3s' }} />
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
