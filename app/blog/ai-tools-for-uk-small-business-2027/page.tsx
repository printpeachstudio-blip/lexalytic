import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/ai-tools-for-uk-small-business-2027' },
  title: 'AI Tools for UK Small Businesses in 2027 — What Actually Works | Lexalytic',
  description: 'Beyond ChatGPT — the AI tools UK small businesses are actually using in 2027 to save time, reduce costs, and automate repetitive work.',
  openGraph: {
    title: 'AI Tools for UK Small Businesses in 2027 — What Actually Works',
    description: 'Beyond ChatGPT — the AI tools UK small businesses are actually using in 2027 to save time, reduce costs, and automate repetitive work.',
    url: 'https://www.lexalytic.com/blog/ai-tools-for-uk-small-business-2027',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  const structuredData = {"@context":"https://schema.org","@type":"Article","headline":"AI Tools for UK Small Businesses in 2027 — What Actually Works","description":"Beyond ChatGPT — the AI tools UK small businesses are actually using in 2027 to save time, reduce costs, and automate repetitive work.","datePublished":"2027-01-12","dateModified":"2027-01-12","url":"https://www.lexalytic.com/blog/ai-tools-for-uk-small-business-2027","author":{"@type":"Person","name":"Mihir Hindocha","url":"https://www.lexalytic.com/about"},"publisher":{"@type":"Organization","name":"Lexalytic","url":"https://www.lexalytic.com"}}
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
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>AI Tools</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>January 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>AI Tools for UK Small Businesses in 2027 — What Actually Works</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio Founder · Lexalytic · 15 years experience</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Most conversations about AI for business focus on ChatGPT and generic productivity tools. The more interesting question is what specific, purpose-built AI tools are doing for UK small businesses right now — and which problems are genuinely worth automating versus which are better left to people.</p>
          
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>The difference between AI tools and AI-powered tools</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>ChatGPT is an AI tool. A CV rewriting service that uses Claude to automatically rewrite submitted CVs, takes payment via Stripe, and delivers the finished document within 24 hours — that is an AI-powered business tool. The distinction matters because the second one is actually automated: once built, it runs without human intervention for every transaction. The first still requires a person to prompt it, review the output, and do something with the result. Most businesses are using AI the first way. The businesses getting the most return are using it the second way.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Document processing and classification</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Any business that receives high volumes of documents — invoices, applications, enquiries, reports — has a genuine AI automation opportunity. An AI tool trained on your document types can extract key data, classify documents by type, flag exceptions for human review, and route documents to the right place automatically. What used to require a person to open, read, and process each document now runs automatically. The accuracy rate on well-scoped document processing tools typically exceeds 95%, with human review only triggered for the exceptions.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Proposal and quote generation</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Professional services firms, agencies, and consultancies spend significant time writing proposals that follow largely the same structure for every client. An AI tool that takes a brief — client name, scope, requirements — and produces a first draft proposal in your house style typically saves 2-4 hours per proposal. At 20 proposals per month that is 40-80 hours saved. The output requires human review and personalisation, but the mechanical first-draft work is eliminated.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>Customer communication automation</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Responding to common customer queries, generating first drafts of client updates, producing meeting summaries from call transcripts — all of these are tasks where AI can handle 80% of the work and flag the remaining 20% for human attention. The key is building the tool around your specific business context: your products, your tone, your common queries. Generic AI tools produce generic responses. Purpose-built tools produce responses that match how your business actually communicates.</p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '20px', letterSpacing: '-0.02em' }}>What is not worth automating with AI</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Relationship-critical communications, complex negotiations, anything where a wrong output has significant consequences without easy correction, and any task where the cost of building and maintaining the tool exceeds the value of the time saved. AI is most valuable on high-volume, well-defined, lower-stakes tasks. It is least valuable on low-volume, highly contextual, high-stakes ones. Being clear about which category a task falls into before investing in automation saves significant time and money.</p>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your specific situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call →</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '80px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2027 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
    </>
  )
}
