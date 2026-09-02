import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceNav from '@/components/ServiceNav'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/services/ai-tools' },
  title: 'AI-Powered Business Tools UK | Claude AI Integration | Lexalytic',
  description: 'We build business tools with AI built in — proposal generators, document processors, intelligent workflows, and internal assistants. AI working inside your business, not just alongside it.',
  keywords: 'AI powered business tools UK, Claude AI integration UK, AI business automation UK, bespoke AI tools small business UK, AI workflow automation UK, custom AI tool UK',
  openGraph: {
    title: 'AI-Powered Business Tools UK | Claude AI Integration | Lexalytic',
    description: 'Business tools with AI built in. Proposal generators, document processors, intelligent workflows.',
    url: 'https://www.lexalytic.com/services/ai-tools',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function AIToolsPage() {
  const structuredData = {"@context":"https://schema.org","@type":"Service","name":"AI-Powered Business Tools","description":"We build business tools with AI built in — proposal generators, document processors, intelligent workflows, and internal assistants.","url":"https://www.lexalytic.com/services/ai-tools","provider":{"@type":"LocalBusiness","name":"Lexalytic","url":"https://www.lexalytic.com","address":{"@type":"PostalAddress","addressLocality":"Bushey","addressRegion":"Hertfordshire","addressCountry":"GB"}},"areaServed":"GB","serviceType":"AI Tool Development"}

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What kinds of tasks can an AI-powered business tool automate?","acceptedAnswer":{"@type":"Answer","text":"Tasks that are repetitive, involve processing text or structured data, and currently require human time for each instance. Examples include proposal generation, document processing, CV rewriting, customer communication drafting, and data classification."}},{"@type":"Question","name":"Do we need technical knowledge to commission an AI tool?","acceptedAnswer":{"@type":"Answer","text":"No. You just need to be able to describe the task clearly — what goes in, what you want to come out, and how often it happens. We handle all the technical work."}},{"@type":"Question","name":"Is CVCraft AI an example of an AI tool you built?","acceptedAnswer":{"@type":"Answer","text":"Yes. CVCraft AI is an AI-powered CV rewriting service we built and operate ourselves. A customer submits their CV and target role, Claude rewrites it, Stripe handles payment, and the document is delivered automatically within 24 hours."}}]}' }} />
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ServiceNav />
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(193,125,46,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '760px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(193,125,46,0.12)', border: '1px solid rgba(193,125,46,0.25)', borderRadius: '100px', padding: '6px 16px', marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)', display: 'inline-block' }} />
              <span style={{ fontSize: '12px', color: 'var(--amber)', fontWeight: '500', letterSpacing: '0.5px' }}>AI-Powered Business Tools UK</span>
            </div>
            <h1 style={{ color: 'var(--white)', marginBottom: '24px', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
              AI that works inside<br /><em style={{ color: 'var(--amber)' }}>your business — not just alongside it.</em>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: 'rgba(255,255,255,0.55)', maxWidth: '620px', marginBottom: '40px', fontWeight: '300', lineHeight: '1.75' }}>
              We build business tools with Claude AI built in — so the intelligence is part of the workflow, not a separate tab someone has to remember to open. Proposal generators, document processors, intelligent data tools, internal assistants — built around exactly what your business needs.
            </p>
            <Link href="/#contact" className="btn-amber">Book a free scoping call →</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">What we build</span>
            <h2 style={{ marginBottom: '20px' }}>AI tools that fit your exact workflow</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '48px' }}>
              Generic AI tools require your team to adapt to them. A custom AI-powered tool is built around the specific task your business needs to automate — so it produces the right output, in the right format, every time.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
              {[
                { icon: '📝', title: 'Proposal and quote generators', desc: 'Input client requirements, output a formatted professional proposal — in your voice, with your pricing logic, ready to send.' },
                { icon: '📄', title: 'Document processors', desc: 'Upload contracts, invoices, or reports — extract key data, summarise, or transform into a structured format automatically.' },
                { icon: '🔍', title: 'Intelligent data tools', desc: 'Tools that analyse your business data, flag anomalies, generate insights, or answer questions in plain English.' },
                { icon: '🤝', title: 'Internal assistants', desc: 'AI assistants trained on your business knowledge — your processes, your products, your policies — for your team to query.' },
                { icon: '✉️', title: 'Communication tools', desc: 'CV rewriters, email drafters, report generators — AI tools that produce polished output from structured inputs.' },
                { icon: '⚙️', title: 'Process automation', desc: 'Workflows where AI makes the decisions that used to require human judgement — classification, routing, extraction, summarisation.' },
              ].map((item, i) => (
                <div key={i} style={{ padding: '24px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: '1.6' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <span className="section-label">Live example</span>
            <h2 style={{ marginBottom: '16px' }}>CVCraft AI — a live AI product we built and operate</h2>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>
              CVCraft AI is an AI-powered CV rewriting service we built ourselves. A customer submits their current CV and target job. Claude rewrites it to beat ATS systems and impress hiring managers. Stripe handles payment. The finished document arrives in their inbox within 24 hours — with no manual work in between.
            </p>
            <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '32px' }}>
              This is exactly the kind of AI-powered tool we build for clients — a specific business process, automated end to end, with AI doing the work that used to require a human for every instance.
            </p>
            <a href="https://cvcraft-ai.co.uk" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 24px', background: 'var(--ink)', borderRadius: 'var(--radius)', color: 'var(--white)', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
              See CVCraft AI live →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Have a process AI<br /><em style={{ color: 'var(--amber)' }}>could handle for you?</em></h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', marginBottom: '40px', lineHeight: '1.7' }}>Book a free 30-minute call. Describe the task and we will tell you whether an AI-powered tool makes sense — and what it would cost to build it.</p>
          <Link href="/#contact" className="btn-amber" style={{ fontSize: '16px', padding: '16px 36px' }}>Book your free scoping call →</Link>
        </div>
      </section>

      <footer style={{ background: 'var(--bg-dark-3)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--white)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/#services" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Services</Link>
            <Link href="/#work" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Work</Link>
            <Link href="/#contact" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Contact</Link>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>© 2026 Lexalytic. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  )
}
