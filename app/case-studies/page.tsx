import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/case-studies' },
  title: 'Case Studies | Lexalytic - UK Digital Studio',
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
    color: '#0b7a5a',
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
    title: 'CVCraft AI - Fully Automated CV Rewriting Service',
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Lexalytic",
      "item": "https://www.lexalytic.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Case Studies",
      "item": "https://www.lexalytic.com/case-studies"
    }
  ]
}

export default function CaseStudiesPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
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
                    <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber-text)', background: 'rgba(193,125,46,0.1)', padding: '3px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '8px' }}>{c.tag}</span>
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
                  <div style={{ fontSize: '13px', color: 'var(--amber-text)', fontWeight: '500' }}>Read case study →</div>
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
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(50px, 7vw, 80px) 0' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <h2 style={{ marginBottom: 18 }}>What these had in common</h2>

        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 18 }}>
          None of them started as a software project. Each one started as somebody spending several hours
          a week on something a computer should have been doing, or a spreadsheet that one person
          understood and everybody else was frightened of. The software was the answer rather than the
          ambition.
        </p>

        <h3 style={{ fontSize: 17, marginTop: 30, marginBottom: 10 }}>How long they took</h3>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 18 }}>
          Most of these were live inside a fortnight from the first call. The build is rarely the slow
          part. What takes the time is agreeing what the thing actually needs to do, which is why we ask
          the awkward questions early rather than halfway through.
        </p>

        <h3 style={{ fontSize: 17, marginTop: 30, marginBottom: 10 }}>What they cost</h3>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 18 }}>
          Less than people expect, and always a fixed price agreed before anything starts rather than a
          day rate that grows. If you want a figure without speaking to anybody, the 
          <Link href="/tools/build-estimator" style={{ color: 'var(--amber)' }}>free estimator</Link> 
          prices up an idea in a couple of minutes and produces a brief you can take to three other
          developers if you would rather.
        </p>

        <h3 style={{ fontSize: 17, marginTop: 30, marginBottom: 10 }}>Nobody paid before they saw it working</h3>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 18 }}>
          Every one of these was built, demonstrated on a video call with the client&#39;s own data in it,
          and used by them before any money changed hands. No deposit, nothing up front, no staged
          payments. If it had not done what they asked for, they would have lost nothing.
        </p>

        <h3 style={{ fontSize: 17, marginTop: 30, marginBottom: 10 }}>And they own them</h3>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.85, marginBottom: 0 }}>
          The code, the hosting account, the documentation. Not a licence that stops working if we stop
          answering the phone. Every one of these could be handed to another developer tomorrow, which is
          worth more to a small business than it sounds until the day it matters.
        </p>
      </div>
    </section>

    </div>
  )
}
