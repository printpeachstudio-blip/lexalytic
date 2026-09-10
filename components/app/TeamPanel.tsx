'use client'

import React, { useState, useTransition } from 'react'
import { inviteMember, revokeInvitation } from '@/app/app/actions'
import { fmtDate } from '@/lib/retention'

const AMBER = '#C17D2E'

export default function TeamPanel({
  isOwner, memberCount, invites,
}: { isOwner: boolean; memberCount: number; invites: any[] }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [link, setLink] = useState('')
  const [pending, start] = useTransition()

  const send = () => {
    setError(''); setLink('')
    const fd = new FormData()
    fd.append('email', email)
    start(async () => {
      const res = await inviteMember(fd)
      if (res?.error) setError(res.error)
      else if (res?.token) {
        setLink(`${window.location.origin}/invite/${res.token}`)
        setEmail('')
      }
    })
  }

  return (
    <div>
      <style>{`
        .t-in { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .t-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .t-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 10px 20px; border: 0; background: ${AMBER}; color: #fff; }
        .t-btn:disabled { opacity: .5; cursor: default; }
        .t-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
      `}</style>

      <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10,
        padding: '20px 24px', marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
          {memberCount} {memberCount === 1 ? 'person' : 'people'} on this account
        </div>
        <div style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.65 }}>
          {memberCount === 1
            ? 'Just you at the moment.'
            : 'Everyone sees the same jobs and can log payments and generate applications.'}
        </div>
      </div>

      {isOwner && (
        <>
          <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10,
            padding: '22px 24px', marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Invite someone</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
              <input className="t-in" type="email" placeholder="Their email address"
                style={{ flex: '1 1 240px' }} value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') send() }} />
              <button className="t-btn" onClick={send} disabled={pending || !email.trim()}>
                {pending ? 'Creating…' : 'Create invite'}
              </button>
            </div>

            {error && <div style={{ fontSize: 14, color: '#A13B2A', marginBottom: 10 }}>{error}</div>}

            {link && (
              <div style={{ padding: '14px 16px', borderRadius: 6, background: 'rgba(63,107,76,0.06)',
                border: '1px solid rgba(63,107,76,0.2)' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Send them this link</div>
                <div style={{ fontSize: 13, fontFamily: 'ui-monospace, Menlo, monospace',
                  wordBreak: 'break-all', color: '#3F6B4C', marginBottom: 8 }}>{link}</div>
                <div style={{ fontSize: 13, color: '#57514A', lineHeight: 1.6 }}>
                  It only works for that email address and expires in fourteen days.
                </div>
              </div>
            )}
          </div>

          {invites.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #F0EBE2', fontSize: 15, fontWeight: 600 }}>
                Waiting to be accepted
              </div>
              {invites.map((inv, i) => (
                <div key={inv.id} style={{ padding: '14px 24px', display: 'flex', gap: 14,
                  alignItems: 'center', flexWrap: 'wrap',
                  borderBottom: i < invites.length - 1 ? '1px solid #F7F4EF' : 'none' }}>
                  <span style={{ fontSize: 14, flex: '1 1 200px' }}>{inv.email}</span>
                  <span style={{ fontSize: 13, color: '#8A8279' }}>
                    expires {fmtDate(inv.expires_at?.slice(0, 10))}
                  </span>
                  <button className="t-link" style={{ color: '#8A8279' }}
                    onClick={() => start(() => { revokeInvitation(inv.id) })}>Revoke</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
