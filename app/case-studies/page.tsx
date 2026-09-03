import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/case-studies' },
  title: 'Case Studies | Lexalytic — UK Digital Studio',
  description: 'Real projects, specific outcomes. How Lexalytic has built websites, custom software, AI tools and data systems for UK businesses.',
}

const cases = [
  {
    slug: 'locum-management-tool-pharmacy',
    tag: 'Custom Software',
    industry: 'Healthcare',
    title: 'Custom Locum Management Tool for an Independent Pharmacy',
    summary: 'A pharmacy managing 20+ locum pharmacists across spreadsheets had persistent payment errors and scheduling clashes. We built a custom management tool. Zero missed payments since launch.',
    metric: '0',
    metricLabel: 'Missed payments since launch',
    color: '#10b981',
  },
  {
    slug: 'power-bi-dashboard-professional-services',
    tag: 'Power BI',
    industry: 'Professional Services',
    title: 'Live P&L Dashboard for a Professional Services Firm',
    summary: 'Directors were guessing which clients and projects were profitable. We built a Power BI dashboard connected to their systems. Full visibility within 48 hours of launch.',
    metric: '48hrs',
    metricLabel: 'From build to full visibility',
    color: '#6366f1',
  },
  {
    slug: 'cvcraft-ai-product',
    tag: 'AI Tool',
    industry: 'Technology',
    title: 'CVCraft AI — Fully Automated CV Rewriting Service',
    summary: 'We identified a gap in the market and built CVCraft AI from scratch. CV submitted, Claude rewrites it, Stripe takes payment, document delivered in 24 hours. No human in the loop.',
    metric: '24hr',
    metricLabel: 'Automated delivery, zero manual steps',
    color: 'var(--amber)',
  },
  {
    slug: 'data-automation-hairdressing-group',
    tag: 'Data Automation',
    industry: 'Health & Beauty',
    title: 'Data Cleanse and Macro Rebuild for a Hairdressing Group',
    summary: 'Financials scattered across broken spreadsheets with inherited macros nobody could use. We cleansed everything and rebuilt the macros from scratch. The owner now sees the whole business in one file.',
    metric: '100%',
    metricLabel: 'Macros rebuilt and working',
    color: '#ec4899',
  },
]

export default function CaseStudiesPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#work" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Work</Link>
            <Link href="/blog" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Blog</Link>
            <Link href="/about" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>About</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(255,255,255,0.4)' }}>Case studies</span>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px', letterSpacing: '-0.02em', maxWidth: '600px' }}>Real projects. Specific outcomes.</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', maxWidth: '560px', lineHeight: '1.7' }}>Every project starts with a specific problem. Here is what we built and what changed as a result.</p>
        </div>
      </section>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))', gap: '24px' }}>
            {cases.map((c, i) => (
              <Link key={i} href={`/case-studies/${c.slug}`} style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.2s' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '3px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '8px' }}>{c.tag}</span>
                    <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>{c.industry}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: c.color, lineHeight: '1' }}>{c.metric}</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-4)', marginTop: '4px', maxWidth: '120px' }}>{c.metricLabel}</div>
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--serif)', marginBottom: '12px', color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: '1.4' }}>{c.title}</h2>
                  <p style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7', marginBottom: '20px' }}>{c.summary}</p>
                  <div style={{ fontSize: '13px', color: 'var(--amber)', fontWeight: '500' }}>Read case study →</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '64px', padding: '48px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--white)', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '16px' }}>Your project could be next.</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>Book a free 30-minute call. Tell us what you need. We will scope it and give you a fixed price before any work begins.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
