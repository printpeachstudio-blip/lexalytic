'use client'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 'var(--radius)', color: 'var(--white)',
    fontSize: '15px', fontFamily: 'var(--sans)',
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '60px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <span className="section-label">Get in touch</span>
            <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>
              Let's fix your data problem.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px', fontSize: '15px', lineHeight: '1.7' }}>
              Book a free 30-minute call and we'll tell you exactly what's possible with your data — and what it would cost to fix it. No commitment, no sales pressure.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: '📞', label: 'Free 30-min scoping call', sub: 'We review your process and give you a clear scope' },
                { icon: '💰', label: 'Fixed price quote in 48 hours', sub: 'Exact cost before any work begins' },
                { icon: '⚡', label: 'Start within days', sub: 'Not weeks — we keep capacity available' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--white)', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>Or email us directly</p>
              <a href="mailto:hello@lexalytic.com" style={{ color: 'var(--amber)', fontSize: '15px' }}>hello@lexalytic.com</a>
            </div>
          </div>

          {/* Right — form */}
          <div style={{
            background: 'var(--bg-dark-2)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-lg)', padding: 'clamp(24px, 4vw, 36px)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ color: 'var(--white)', marginBottom: '12px' }}>Message received</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
                  We'll be in touch within 24 hours to arrange your free scoping call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--white)', marginBottom: '24px', fontFamily: 'var(--serif)' }}>Book your free call</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Name *</label>
                    <input required style={inputStyle} placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email *</label>
                    <input required type="email" style={inputStyle} placeholder="you@company.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Company</label>
                  <input style={inputStyle} placeholder="Your company name" value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tell us about your problem *</label>
                  <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Describe the process that's taking too long, or what you're trying to build..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <button type="submit" className="btn-amber" style={{ width: '100%', justifyContent: 'center' }}>
                  Send message →
                </button>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '12px' }}>
                  We respond within 24 hours. Your details are never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div {
            grid-template-columns: 1fr !important;
          }
          #contact form > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
