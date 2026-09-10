'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const AMBER = '#C17D2E'
const INK = '#1A1815'

export default function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/app'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [company, setCompany] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [checkEmail, setCheckEmail] = useState(false)

  const submit = async () => {
    setError('')
    if (!email.trim() || !password) {
      setError('Enter an email address and password.')
      return
    }
    if (mode === 'signup' && password.length < 8) {
      setError('Use at least eight characters.')
      return
    }
    if (mode === 'signup' && !company.trim()) {
      setError('Enter your company name.')
      return
    }

    setBusy(true)
    const supabase = createClient()

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { company_name: company.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        })
        if (error) throw error
        setCheckEmail(true)
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (error) throw error
        router.push(next)
        router.refresh()
      }
    } catch (e: any) {
      const msg = String(e?.message || '')
      if (msg.includes('Invalid login')) setError('That email and password do not match an account.')
      else if (msg.includes('already registered')) setError('There is already an account with that email. Sign in instead.')
      else setError(msg || 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  if (checkEmail) {
    return (
      <div style={{ maxWidth: 420 }}>
        <h1 className="a-serif" style={{ fontSize: 26, fontWeight: 400, margin: '0 0 14px' }}>
          Check your email
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#57514A', margin: 0 }}>
          We have sent a confirmation link to <strong>{email}</strong>. Click it and you will be
          taken straight into your account. It may take a minute, and it is worth checking spam.
        </p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <style>{`
        .a-serif { font-family: Georgia, 'Times New Roman', serif; }
        .a-in { font: inherit; font-size: 15px; padding: 12px 14px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .a-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .a-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer;
          border-radius: 6px; padding: 13px 24px; border: 0; background: ${AMBER}; color: #fff; width: 100%; }
        .a-btn:hover { background: #A96C25; }
        .a-btn:disabled { opacity: .55; cursor: default; }
        .a-label { display: block; font-size: 13px; color: #57514A; margin-bottom: 5px; }
      `}</style>

      <h1 className="a-serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
        {mode === 'signup' ? 'Start tracking retention' : 'Sign in'}
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8A8279', margin: '0 0 26px' }}>
        {mode === 'signup'
          ? 'Fourteen days free, no card needed. Add your jobs and see what is owed.'
          : 'Welcome back.'}
      </p>

      {mode === 'signup' && (
        <div style={{ marginBottom: 14 }}>
          <label className="a-label" htmlFor="company">Company name</label>
          <input id="company" className="a-in" value={company} autoComplete="organization"
            onChange={e => setCompany(e.target.value)} placeholder="Appears on the letters you send" />
        </div>
      )}

      <div style={{ marginBottom: 14 }}>
        <label className="a-label" htmlFor="email">Email</label>
        <input id="email" className="a-in" type="email" value={email} autoComplete="email"
          onChange={e => setEmail(e.target.value)} />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label className="a-label" htmlFor="password">Password</label>
        <input id="password" className="a-in" type="password" value={password}
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') submit() }} />
        {mode === 'signup' && (
          <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>At least eight characters.</div>
        )}
      </div>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      <button className="a-btn" onClick={submit} disabled={busy}>
        {busy ? 'One moment…' : mode === 'signup' ? 'Create account' : 'Sign in'}
      </button>

      {mode === 'signup' && (
        <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.65, marginTop: 14 }}>
          Creating an account means you accept our{' '}
          <Link href="/terms" style={{ color: '#8A8279', textDecoration: 'underline' }}>terms of service</Link>{' '}
          and{' '}
          <Link href="/privacy" style={{ color: '#8A8279', textDecoration: 'underline' }}>privacy policy</Link>.
        </p>
      )}

      {mode === 'signin' && (
        <p style={{ fontSize: 14, marginTop: 16, textAlign: 'center' }}>
          <Link href="/forgot-password" style={{ color: '#8A8279' }}>Forgotten your password?</Link>
        </p>
      )}

      <p style={{ fontSize: 14, color: '#8A8279', marginTop: 22 }}>
        {mode === 'signup' ? (
          <>Already have an account? <Link href="/signin" style={{ color: AMBER }}>Sign in</Link></>
        ) : (
          <>No account yet? <Link href="/signup" style={{ color: AMBER }}>Start a free trial</Link></>
        )}
      </p>
    </div>
  )
}
