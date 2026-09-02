import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/how-we-built-cvcraft-ai-from-scratch' },
  title: 'How We Built CVCraft AI — An AI Product From Idea to Launch | Lexalytic',
  description: 'CVCraft AI is an AI-powered CV rewriting service we built and operate. Here is exactly how we built it — the decisions, the tools, the process, and what it cost.',
  keywords: 'how to build AI product UK, build AI tool from scratch UK, CVCraft AI case study, AI powered SaaS UK, build AI business tool UK, Claude AI product development',
  openGraph: {
    title: 'How We Built CVCraft AI — An AI Product From Idea to Launch',
    description: 'CVCraft AI is an AI-powered CV rewriting service we built and operate. Here is exactly how we built it — the decisions, the tools, the process, and what it cost.',
    url: 'https://www.lexalytic.com/blog/how-we-built-cvcraft-ai-from-scratch',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"How We Built CVCraft AI — An AI Product From Idea to Launch","description":"CVCraft AI is an AI-powered CV rewriting service we built and operate. Here is exactly how we built it — the decisions, the tools, the process, and what it cost.","datePublished":"2026-11-17","dateModified":"2026-11-17","url":"https://www.lexalytic.com/blog/how-we-built-cvcraft-ai-from-scratch","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Home</Link>
            <Link href="/#services" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Services</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>AI-Powered Tools</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>November 2026 · 10 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>How We Built CVCraft AI — An AI Product From Idea to Launch</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>CVCraft AI is an AI-powered CV rewriting service we built ourselves — not for a client, but as a product we operate. A customer submits their current CV and the job they are applying for. Claude rewrites the CV to beat ATS systems and appeal to hiring managers. Stripe handles payment. The finished document arrives in their inbox within 24 hours. No human involvement between submission and delivery. Here is exactly how we built it and what we learned.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The problem we were solving</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most people applying for jobs know their CV is not optimised — but they do not know how to fix it. Professional CV writers charge £100-300 and take days. Generic templates do not address ATS optimisation. The gap was a fast, affordable, AI-powered service that could rewrite a CV specifically for the role being applied for, in a format that performs well in automated screening systems and reads well to a human recruiter.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The technical stack</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The front end is built in Next.js — the same framework we use for all our sites. The payment processing is Stripe — straightforward to integrate, handles the entire payment flow including receipts and failed payment handling. The AI layer is Claude via the Anthropic API — we send the customer CV, their target role, and a carefully crafted prompt that instructs Claude on the specific rewriting task. The output is formatted and emailed automatically. The whole system runs on Vercel with no ongoing server management required.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The prompt engineering — the hardest part</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Getting Claude to produce consistently high-quality CV rewrites required significant prompt iteration. The prompt needs to instruct Claude to retain the customer's actual experience and achievements, reframe them using language that resonates with the target role, optimise for ATS keyword matching without keyword stuffing, maintain a professional tone appropriate for the sector, and produce output in a specific format that is ready to send. Getting all of these right simultaneously took more iterations than the technical build. The prompt is the product — the code is just the delivery mechanism.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What it costs to run and what we learned</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The ongoing costs are minimal — Vercel hosting is effectively free at current traffic levels, Stripe takes its standard percentage, and the Claude API costs pennies per rewrite. The build took a few weeks of part-time work. The main lesson is that the hardest part of building an AI product is not the code — it is defining the task precisely enough that the AI can do it consistently. The businesses that get the most from AI tools are the ones that invest time in that definition before writing a line of code.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Related articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', marginBottom: '56px' }}>
            
            <Link key={0} href="/blog/what-is-an-ai-powered-business-tool-uk" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI-Powered Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>What Is an AI-Powered Business Tool — And Does Your Business Need One?</p>
            </Link>
            <Link key={1} href="/blog/why-uk-businesses-building-custom-tools" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Why UK Businesses Are Building Custom Tools Instead of Buying Software</p>
            </Link>
            <Link key={2} href="/blog/bespoke-software-vs-off-the-shelf-uk-small-business" style={{ display: 'block', padding: '20px 24px', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textDecoration: 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Custom Business Tools</span>
              <p style={{ fontSize: '15px', color: 'var(--ink)', marginTop: '8px', marginBottom: 0, lineHeight: '1.5', fontWeight: '500' }}>Bespoke Software vs Off-the-Shelf — The Honest UK Guide</p>
            </Link>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you are trying to build and we will tell you the best approach — and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
