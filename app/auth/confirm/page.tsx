'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const AMBER = '#C17D2E'

function ConfirmInner() {
  const router = useRouter()
  const params = useSearchParams()
  const tokenHash = params.get('token_hash')
  const type = params.get('type')
  const next = params.get('next') || '/app'

  const [state, setState] = useState<'ready' | 'working' | 'failed'>('ready')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!tokenHash || !type) {
      setState('failed')
      setError('That link is missing something. Ask for a new one.')
    }
  }, [tokenHash, type])

  const confirm = async () => {
    if (!tokenHash || !type) return
    setState('working')
    setError('')
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash: tokenHash,
      })
      if (error) throw error
      router.push(next)
      router.refresh()
    } catch (e: any) {
      setState('failed')
      const msg = String(e?.message || '')
      setError(
        msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('invalid')
          ? 'That link has expired or has already been used. Links last an hour and work once.'
          : msg || 'Something went wrong. Ask for a new link.'
      )
    }
  }

  const isRecovery = type === 'recovery'

  return (
    <div style={{ maxWidth: 460 }}>
      <style>{`
        .c-serif { font-family: Georgia, 'Times New Roman', serif; }
        .c-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 13px 26px; border: 0; background: ${AMBER}; color: #fff; }
        .c-btn:hover { background: #A96C25; }
        .c-btn:disabled { opacity: .55; cursor: default; }
      `}</style>

      {state === 'failed' ? (
        <>
          <h1 className="c-serif" style={{ fontSize: 26, fontWeight: 400,
            letterSpacing: '-0.02em', margin: '0 0 14px' }}>
            That link will not work
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#57514A', margin: '0 0 24px' }}>
            {error}
          </p>
          <Link href={isRecovery ? '/forgot-password' : '/signin'} className="c-btn"
            style={{ textDecoration: 'none', display: 'inline-block' }}>
            {isRecovery ? 'Request a new link' : 'Back to sign in'}
          </Link>
        </>
      ) : (
        <>
          <h1 className="c-serif" style={{ fontSize: 26, fontWeight: 400,
            letterSpacing: '-0.02em', margin: '0 0 14px' }}>
            {isRecovery ? 'Reset your password' : 'Confirm your email'}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#57514A', margin: '0 0 10px' }}>
            {isRecovery
              ? 'Click below and you will be taken straight to setting a new password.'
              : 'Click below to confirm this address and finish setting up your account.'}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8A8279', margin: '0 0 26px' }}>
            This extra step exists because some email providers open links automatically to scan them,
            which uses the link up before you get to it.
          </p>
          <button className="c-btn" onClick={confirm} disabled={state === 'working'}>
            {state === 'working'
              ? 'One moment…'
              : isRecovery ? 'Set a new password' : 'Confirm my email'}
          </button>
        </>
      )}
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
          <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: 20,
            letterSpacing: '-0.02em', color: '#1A1815', textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </Link>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '70px 20px' }}>
        <Suspense fallback={null}>
          <ConfirmInner />
        </Suspense>
      </div>
    </div>
  )
}
