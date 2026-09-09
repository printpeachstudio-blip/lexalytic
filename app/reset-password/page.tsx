'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const AMBER = '#C17D2E'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [noSession, setNoSession] = useState(false)

  useEffect(() => {
    const check = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) setNoSession(true)
      setReady(true)
    }
    check()
  }, [])

  const submit = async () => {
    setError('')
    if (password.length < 8) { setError('Use at least eight characters.'); return }
    if (password !== confirm) { setError('The two passwords do not match.'); return }
    setBusy(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      router.push('/app')
      router.refresh()
    } catch (e: any) {
      setError(e?.message || 'Could not update the password. Request a new link and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .r-serif { font-family: Georgia, 'Times New Roman', serif; }
        .r-in { font: inherit; font-size: 15px; padding: 12px 14px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .r-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .r-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 13px 24px; border: 0; background: ${AMBER}; color: #fff; width: 100%; }
        .r-btn:hover { background: #A96C25; }
        .r-btn:disabled { opacity: .55; cursor: default; }
        .r-label { display: block; font-size: 13px; color: #57514A; margin-bottom: 5px; }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
          <Link href="/" className="r-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '70px 20px' }}>
        <div style={{ maxWidth: 420 }}>
          {!ready ? null : noSession ? (
            <>
              <h1 className="r-serif" style={{ fontSize: 26, fontWeight: 400, margin: '0 0 14px' }}>
                That link has expired
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#57514A', margin: '0 0 20px' }}>
                Reset links last an hour and can only be used once.
              </p>
              <Link href="/forgot-password" className="r-btn"
                style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}>
                Request a new one
              </Link>
            </>
          ) : (
            <>
              <h1 className="r-serif" style={{ fontSize: 28, fontWeight: 400,
                letterSpacing: '-0.02em', margin: '0 0 10px' }}>
                Set a new password
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8A8279', margin: '0 0 26px' }}>
                You will be signed in straight away afterwards.
              </p>

              <div style={{ marginBottom: 14 }}>
                <label className="r-label" htmlFor="pw">New password</label>
                <input id="pw" className="r-in" type="password" value={password} autoComplete="new-password"
                  onChange={e => setPassword(e.target.value)} />
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>At least eight characters.</div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="r-label" htmlFor="pw2">Confirm</label>
                <input id="pw2" className="r-in" type="password" value={confirm} autoComplete="new-password"
                  onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') submit() }} />
              </div>

              {error && (
                <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
                  border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
                  {error}
                </div>
              )}

              <button className="r-btn" onClick={submit} disabled={busy}>
                {busy ? 'Saving…' : 'Save and sign in'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
