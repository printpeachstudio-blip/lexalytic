import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/ai-powered-proposal-generator-uk' },
  title: 'AI Proposal Generator for UK Businesses - How to Automate Your First Draft | Lexalytic',
  description: 'How UK professional services firms are using AI to generate first draft proposals in minutes instead of hours.',
  openGraph: {
    title: 'AI Proposal Generator for UK Businesses - How to Automate Your First Draft',
    description: 'How UK professional services firms are using AI to generate first draft proposals in minutes instead of hours.',
    url: 'https://www.lexalytic.com/blog/ai-powered-proposal-generator-uk',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

export default function BlogPost() {
  return (
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>March 2027 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>AI Proposal Generator for UK Businesses - How to Automate Your First Draft</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Writing proposals is one of the most time-consuming things a professional services business does. And most proposals follow the same structure with the same sections containing information that changes only in the specific details. The situation, the approach, the team, the timeline, the price. If you have written fifty proposals you have written the same document fifty times with different names and numbers.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>What AI can and cannot do in proposal writing</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>AI is good at producing well-structured prose on familiar topics quickly. Given a brief describing the client situation and your proposed approach, it will produce a coherent first draft of the executive summary, approach section, and team credentials in a few minutes. What it cannot do is make judgements about strategy, assess whether the scope is right for the budget, or write the specific personal observations that show you were genuinely listening in the discovery call. AI handles the scaffolding. You provide what makes it persuasive.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The input that determines the output quality</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The quality of an AI-generated proposal draft is directly proportional to the quality of the brief you give it. A vague brief produces a generic draft that needs extensive rewriting. A specific brief - client name, industry, the problem they described, what they want to achieve, the approach you are proposing, the team, the timeline, the fee - produces a first draft that needs editing rather than rewriting. Investing five minutes in a structured brief template saves thirty minutes in post-generation editing.</p>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '48px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', background: 'var(--amber)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '6px', color: 'var(--white)', fontWeight: '700', fontSize: '13px' }}>3</div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '12px' }}>Building the process around a brief template</h2>
              <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>The most effective approach is a standardised brief form that your team completes after every discovery call. The fields map directly to the sections of your proposal. Client situation maps to the executive summary. Stated objectives map to the outcomes section. Proposed approach maps to the methodology. The brief form becomes the input to the AI tool, and the AI tool produces the first draft. The account manager edits and personalises before it goes to the client.</p>
            </div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What tools to use</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Claude and GPT-4 are both capable of producing good proposal first drafts from a well-structured brief. For a repeatable process across a team, building a simple internal tool - a form that collects the brief details and passes them to the AI API with a standardised system prompt - produces more consistent output than each team member prompting the AI differently. The internal tool costs a day to build and pays for itself within a few weeks of use.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The time saving in practice</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A typical proposal for a professional services firm takes two to four hours to write from scratch. An AI-assisted process with a good brief template and editing takes forty-five minutes to an hour. At twenty proposals per month, that saving compounds to thirty to sixty hours per month across the team. The quality of the proposals also tends to improve because the AI never forgets to include a section and always produces clean formatting.</p>
          </div>
          <div style={{ padding: '40px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '64px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: '16px' }}>Want to talk through your situation?</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.7', maxWidth: '500px', margin: '0 auto 28px' }}>Book a free 30-minute call. Tell us what you need and we will tell you the best approach and what it would cost.</p>
            <Link href="/#contact" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Book a free scoping call</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '40px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>2026 Lexalytic. All rights reserved.</p>
          <Link href="/blog" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Back to blog</Link>
        </div>
      </footer>
    </div>
  )
}
