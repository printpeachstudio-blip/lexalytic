'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { acceptInvitation } from '@/app/app/actions'

const AMBER = '#C17D2E'

export default function AcceptInvite({ token, email }: { token: string; email: string }) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const accept = () => {
    setError('')
    start(async () => {
      const res = await acceptInvitation(token)
      if (res?.error) setError(res.error)
      else { router.push('/app'); router.refresh() }
    })
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 400,
        letterSpacing: '-0.02em', margin: '0 0 12px' }}>You have been invited</h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: '#57514A', margin: '0 0 24px' }}>
        Accepting will give you access to that team's jobs, applications and figures. You are signed
        in as <strong>{email}</strong>, and the invitation has to have been sent to that address.
      </p>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 18 }}>
          {error}
        </div>
      )}

      <button onClick={accept} disabled={pending}
        style={{ font: 'inherit', fontSize: 15, fontWeight: 500, cursor: 'pointer',
          borderRadius: 6, padding: '13px 26px', border: 0, background: AMBER, color: '#fff',
          opacity: pending ? 0.5 : 1 }}>
        {pending ? 'Joining…' : 'Accept invitation'}
      </button>
    </div>
  )
}
