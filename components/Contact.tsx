'use client'
import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('https://formspree.io/f/xwvwjppa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 'var(--radius)', color: 'var(--white)',
    fontSize: '15px', fontFamily: 'var(--sans)',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  return (
    <section id="contact" style={{ padding: 'clamp(80px, 10vw, 120px) 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '80px', alignItems: 'start' }} className="contact-grid">
          <div>
            <span className="section-label">Get in touch</span>
            <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Let's fix your business problem.</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '48px', fontSize: '16px', lineHeight: '1.8', fontWeight: '300' }}>
              Book a free 30-minute call and we'll tell you exactly what's possible — whether it's data automation, a custom business tool, or both. No commitment, no sales pressure.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
              {[
                { icon: '📞', label: 'Free 30-min scoping call', sub: 'We review your process and give you a clear scope' },
                { icon: '💰', label: 'Fixed price quote in 48 hours', sub: 'Exact cost before any work begins' },
                { icon: '⚡', label: 'Start within days', sub: 'Not weeks — we keep capacity available' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'rgba(193,125,46,0.1)', border: '1px solid rgba(193,125,46,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--white)', marginBottom: '3px' }}>{item.label}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: '1.5' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Or email us directly</p>
              <a href="mailto:hello@lexalytic.com" style={{ color: 'var(--amber)', fontSize: '16px' }}>hello@lexalytic.com</a>
            </div>
          </div>
          <div style={{
            background: 'var(--bg-dark-2)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-lg)', padding: 'clamp(28px, 4vw, 44px)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(193,125,46,0.15)', border: '1px solid rgba(193,125,46,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', fontSize: '28px',
                }}>✓</div>
                <h3 style={{ color: 'var(--white)', marginBottom: '12px' }}>Message received</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: '1.7' }}>
                  We'll be in touch within 24 hours to arrange your free scoping call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ color: 'var(--white)', marginBottom: '8px', fontFamily: 'var(--serif)', fontSize: '1.4rem' }}>Book your free call</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginBottom: '28px' }}>We'll respond within 24 hours.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }} className="form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Name *</label>
                    <input required style={inputStyle} placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email *</label>
                    <input required type="email" style={inputStyle} placeholder="you@company.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</label>
                  <input style={inputStyle} placeholder="Your company name" value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Tell us about your problem *</label>
                  <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' as const }}
                    placeholder="Describe the process that's taking too long, or what you're trying to build..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--amber)'}
                    onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <button type="submit" className="btn-amber" style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }} disabled={loading}>
                  {loading ? 'Sending...' : 'Send message →'}
                </button>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '14px' }}>
                  We respond within 24 hours. Your details are never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
