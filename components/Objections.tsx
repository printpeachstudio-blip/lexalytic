'use client'
import { useState } from 'react'

const objections = [
  {
    q: "I don't know exactly what I need yet.",
    a: "That's the most common starting point and it's fine. The scoping call is designed for exactly this — you tell us the problem you are trying to solve, and we tell you what makes sense to build and what it would cost. You don't need a spec to start a conversation.",
  },
  {
    q: "I've been let down by a developer before.",
    a: "You work directly with Mihir from first call to final handover. No account managers, no handoffs to juniors, no offshore team you never speak to. The price is agreed in writing before any work begins, and nothing goes live without your sign-off. If you want to see the quality before committing, look at CVCraft AI, FamilyEntitled, or the site you are on right now.",
  },
  {
    q: "I'm not sure I can justify the cost right now.",
    a: "Every project is scoped individually — there is no minimum spend and no retainer required. Some projects are completed in days, others take months. The scoping call is free and comes with no obligation. You will know the exact cost before deciding whether to proceed.",
  },
  {
    q: "We're a small business — is this aimed at bigger companies?",
    a: "Most of our clients are small and medium UK businesses. The whole point is to give smaller businesses access to senior-level digital work at prices that make sense — not enterprise prices, not agency overhead. Shell, NHS, and Warner Bros are in the background. Your business gets the benefit of that experience.",
  },
]

export default function Objections() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <span className="section-label" style={{ color: 'var(--ink-3)' }}>Common questions</span>
          <h2 style={{ color: 'var(--ink)', marginBottom: '12px' }}>What usually stops people.</h2>
          <p style={{ color: 'var(--ink-3)', fontSize: '16px', marginBottom: '48px', lineHeight: '1.7' }}>
            Honest answers to the things most people are thinking before they get in touch.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {objections.map((obj, i) => (
              <div key={i} style={{
                background: open === i ? 'var(--bg)' : 'var(--white)',
                border: '1px solid var(--border)',
                borderTop: i > 0 ? 'none' : '1px solid var(--border)',
                borderRadius: i === 0 ? 'var(--radius) var(--radius) 0 0' : i === objections.length - 1 ? '0 0 var(--radius) var(--radius)' : '0',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }} onClick={() => setOpen(open === i ? null : i)}>
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '500', color: 'var(--ink)', margin: 0, lineHeight: '1.5' }}>{obj.q}</h3>
                  <span style={{ fontSize: '20px', color: 'var(--amber)', flexShrink: 0, lineHeight: '1' }}>{open === i ? '−' : '+'}</span>
                </div>
                {open === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.75' }}>
                    {obj.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'var(--ink-4)', marginBottom: '16px' }}>Something else on your mind?</p>
            <a href="#contact" className="btn-secondary" style={{ color: 'var(--ink-3)', borderColor: 'var(--border)', fontSize: '14px' }}>
              Just ask us directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
