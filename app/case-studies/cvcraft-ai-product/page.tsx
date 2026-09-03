import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/case-studies/cvcraft-ai-product' },
  title: 'CVCraft AI — Fully Automated CV Rewriting Service | Lexalytic',
  description: 'Built from scratch and operating. CV submitted, Claude rewrites it, Stripe takes payment, document delivered in 24 hours. Zero humans in the loop.',
}

export default function CaseStudy() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/case-studies" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← All case studies</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-dark)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>AI Tool</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Technology · AI Product</span>
          </div>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: '1.15', marginBottom: '20px', letterSpacing: '-0.02em' }}>CVCraft AI — Fully Automated CV Rewriting Service</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>Built from scratch and operating. 24-hour delivery, zero human involvement between submission and delivery.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[['24hr', 'Automated delivery'], ['0', 'Human steps in process'], ['Live', 'Operating product']].map(([m, l], i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: 'var(--amber)', lineHeight: '1', marginBottom: '8px' }}>{m}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The opportunity</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>There is a clear gap in the market for fast, affordable, AI-powered CV rewriting. Professional services charge £150-£300 and take several days. Generic templates and ChatGPT prompts produce inconsistent results that do not account for ATS systems. Most job seekers know their CV is not as strong as it could be but have no affordable, reliable option to improve it quickly.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>The specific opportunity: a service that takes a CV and a target job description, rewrites the CV to maximise ATS compatibility, takes payment automatically, and delivers within 24 hours — with no human involvement in any step of the process.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '40px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>What we built</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>CVCraft AI from scratch: a web application where customers upload their CV and target job description, Claude rewrites the CV to beat ATS systems, Stripe handles payment, and the finished document is automatically emailed to the customer. Every step is automated.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>Claude is specifically tuned to understand ATS requirements and keyword optimisation. Stripe webhooks trigger the rewriting process on successful payment. The finished document is generated and delivered automatically. There is no queue, no waiting, no human reviewing anything. The system handles every step from submission to delivery.</p>
          </div>
          <div style={{ marginBottom: '64px' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The outcome</div>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '24px' }}>CVCraft AI is a live, operating product. Every step from payment to finished document runs without manual intervention. It demonstrates exactly what an AI-powered business tool looks like when built properly — not AI as a productivity aid, but AI embedded in a specific workflow, doing a specific job, reliably, at scale.</p>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85' }}>CVCraft AI serves as both a live product and a proof of concept for the AI architecture we build for clients. When we describe AI-powered business automation, we point to CVCraft AI as a live example — fully automated, end-to-end, operating without any human in the loop.</p>
          </div>
          <div style={{ marginBottom: '64px', padding: '32px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Services</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['AI Tool', 'SaaS Product', 'Claude API', 'Stripe Integration', 'Fixed Price'].map(s => (
                <span key={s} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '100px' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ padding: '48px', background: 'var(--bg-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '16px' }}>Want to build something similar?</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-3)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>If you have a process that is repetitive, well-defined, and currently costs someone time for every instance — it is worth a conversation about automating it properly.</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-primary">Book a free call →</Link>
              <Link href="/case-studies" className="btn-secondary">See more case studies →</Link>
            </div>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/case-studies" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>← All case studies</Link>
        </div>
      </footer>
    </div>
  )
}
