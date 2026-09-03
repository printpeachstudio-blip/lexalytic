'use client'
import { useState } from 'react'

const faqs = [
  {
    q: 'How quickly can you start?',
    a: 'Usually within 2–3 working days of scoping. We keep capacity available for new projects so you\'re not waiting weeks to get started.',
  },
  {
    q: 'Do I need to know anything technical?',
    a: 'Not at all. You just need to be able to describe what you do today and what you wish it did instead. We handle everything technical.',
  },
  {
    q: 'What if the project turns out to be bigger than expected?',
    a: 'We scope carefully before quoting — so this rarely happens. But if it does, we\'ll tell you immediately, explain why, and agree a revised price before continuing. No hidden extras.',
  },
  {
    q: 'Will I be able to maintain it myself afterwards?',
    a: 'Yes. We document everything clearly and walk your team through how it works. The goal is to give you something you can use independently — not create dependency on us.',
  },
  {
    q: 'What kinds of businesses do you work with?',
    a: 'All kinds. We have built websites, custom tools, AI products, and data systems for businesses in healthcare, recruitment, construction, professional services, retail, hospitality, and more. The technologies differ but the underlying needs are almost always the same.',
  },
  {
    q: 'Can you work with our existing systems?',
    a: 'Almost certainly yes. We\'re experienced in connecting to most common business systems — CRMs, ERPs, databases, cloud storage, and more. Tell us what you use and we\'ll confirm.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr)', gap: '60px', alignItems: 'start' }}>
          <div>
            <span className="section-label">FAQ</span>
            <h2 style={{ marginBottom: '16px' }}>Questions people always ask</h2>
            <p style={{ color: 'var(--ink-3)', fontSize: '15px', marginBottom: '28px' }}>
              If yours isn't here, just ask us directly.
            </p>
            <a href="#contact" className="btn-primary">Ask us anything →</a>
          </div>

          <div>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: '100%', textAlign: 'left', padding: '20px 0',
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                }}>
                  <span style={{ fontSize: '16px', fontWeight: '400', color: 'var(--ink)', fontFamily: 'var(--sans)' }}>{f.q}</span>
                  <span style={{
                    flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%',
                    background: open === i ? 'var(--amber)' : 'var(--bg)',
                    border: `1px solid ${open === i ? 'var(--amber)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', color: open === i ? 'white' : 'var(--ink-3)',
                    transition: 'all 0.2s',
                  }}>
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                {/* Always render answer for SEO, hide visually when closed */}
                <p style={{
                  paddingBottom: open === i ? '20px' : '0',
                  fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.7', fontWeight: '300',
                  maxHeight: open === i ? '200px' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  margin: 0,
                  visibility: open === i ? 'visible' : 'hidden',
                  position: open === i ? 'relative' : 'absolute',
                  opacity: open === i ? 1 : 0,
                }}>
                  {f.a}
                </p>

              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #faq .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
