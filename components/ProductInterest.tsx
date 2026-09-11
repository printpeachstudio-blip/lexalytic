'use client'

import React, { useState } from 'react'

const FORMSPREE = 'https://formspree.io/f/xwvwjppa'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const AMBER = '#C17D2E'

export default function ProductInterest({
  product, industry, status, dark = false,
}: { product: string; industry: string; status: 'building' | 'considering'; dark?: boolean }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter an email address we can reply to.')
      return
    }
    setBusy(true); setError('')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          notes: note.trim(),
          _subject: `Product interest: ${product}`,
          product,
          industry,
          status,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('That did not send. Email hello@lexalytic.com and we will add you.')
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div style={{
        padding: dark ? 0 : '16px 20px', borderRadius: '8px',
        background: dark ? 'transparent' : 'rgba(63,107,76,0.06)',
        border: dark ? 0 : '1px solid rgba(63,107,76,0.2)',
        fontSize: '15px', color: dark ? 'rgba(255,255,255,0.7)' : '#3F6B4C',
        lineHeight: '1.7', maxWidth: '520px',
      }}>
        On the list. We will let you know when it is ready, and if we have questions
        while building it we may well ask you.
      </div>
    )
  }

  return (
    <div>
      <style>{`
        .pi-in { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          border: 1px solid ${dark ? 'rgba(255,255,255,0.15)' : '#DDD6CC'};
          background: ${dark ? 'rgba(255,255,255,0.06)' : '#fff'};
          color: ${dark ? '#fff' : 'inherit'}; width: 100%; }
        .pi-in::placeholder { color: ${dark ? 'rgba(255,255,255,0.35)' : '#8A8279'}; }
        .pi-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
      `}</style>

      {!open ? (
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ fontSize: '15px', cursor: 'pointer', border: 0 }}
            onClick={() => setOpen(true)}>
            {status === 'building' ? 'Tell me when it is ready' : 'Register interest'}
          </button>
          <span style={{ fontSize: '14px', color: dark ? 'rgba(255,255,255,0.45)' : 'var(--ink-3)', maxWidth: '360px', lineHeight: '1.6' }}>
            {status === 'building'
              ? 'Being built now. Early users get it free while we finish it.'
              : 'How many people ask decides what we build next.'}
          </span>
        </div>
      ) : (
        <div style={{ maxWidth: '520px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px', marginBottom: '12px' }}>
            <input className="pi-in" type="email" placeholder="Email address" value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submit() }} />
          </div>
          <textarea className="pi-in" rows={2} style={{ resize: 'vertical', marginBottom: '12px' }}
            placeholder="What would you most want it to do? (optional)"
            value={note} onChange={e => setNote(e.target.value)} />
          {error && (
            <div style={{ fontSize: '14px', color: '#A13B2A', marginBottom: '12px' }}>{error}</div>
          )}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ fontSize: '15px', cursor: 'pointer', border: 0 }}
              onClick={submit} disabled={busy}>
              {busy ? 'Sending…' : 'Send'}
            </button>
            <button onClick={() => { setOpen(false); setError('') }}
              style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: '14px',
                color: dark ? 'rgba(255,255,255,0.45)' : 'var(--ink-3)', cursor: 'pointer', textDecoration: 'underline' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
