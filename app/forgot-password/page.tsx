'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const AMBER = '#C17D2E'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const submit = async () => {
    setError('')
    if (!email.trim()) { setError('Enter the email address on your account.'); return }
    setBusy(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
      })
      if (error) throw error
      setDone(true)
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .f-serif { font-family: Georgia, 'Times New Roman', serif; }
        .f-in { font: inherit; font-size: 15px; padding: 12px 14px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .f-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .f-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 13px 24px; border: 0; background: ${AMBER}; color: #fff; width: 100%; }
        .f-btn:hover { background: #A96C25; }
        .f-btn:disabled { opacity: .55; cursor: default; }
        .f-label { display: block; font-size: 13px; color: #57514A; margin-bottom: 5px; }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
          <Link href="/" className="f-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ maxWidth: 420 }}>
          {done ? (
            <>
              <h1 className="f-serif" style={{ fontSize: 26, fontWeight: 400, margin: '0 0 14px' }}>
                Check your email
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#57514A', margin: '0 0 8px' }}>
                If there is an account for <strong>{email}</strong>, a reset link is on its way.
                It expires in an hour.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', margin: 0 }}>
                Nothing after a few minutes? Check spam, and make sure you used the address you
                signed up with.
              </p>
            </>
          ) : (
            <>
              <h1 className="f-serif" style={{ fontSize: 28, fontWeight: 400,
                letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                Reset your password
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8A8279', margin: '0 0 26px' }}>
                Enter your email and we will send a link to set a new one.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label className="f-label" htmlFor="email">Email</label>
                <input id="email" className="f-in" type="email" value={email} autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') submit() }} />
              </div>

              {error && (
                <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
                  border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <button className="f-btn" onClick={submit} disabled={busy}>
                {busy ? 'Sending…' : 'Send reset link'}
              </button>

              <p style={{ fontSize: 14, color: '#8A8279', marginTop: 22 }}>
                Remembered it? <Link href="/signin" style={{ color: AMBER }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
