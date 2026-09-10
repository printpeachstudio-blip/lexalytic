'use client'

import React, { useState } from 'react'
import type { AccessState, SubscriptionRow } from '@/lib/billing'

const AMBER = '#C17D2E'

function fmt(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BillingPanel({
  access, sub, isOwner, checkout, plans,
}: {
  access: AccessState
  sub: SubscriptionRow | null
  isOwner: boolean
  checkout?: string
  plans: any
}) {
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState('')

  const go = async (path: string, body?: any) => {
    setBusy(path); setError('')
    try {
      const res = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body ?? {}),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      if (data.url) window.location.href = data.url
    } catch (e: any) {
      setError(e?.message || 'Something went wrong. Try again.')
      setBusy(null)
    }
  }

  const paying = access.reason === 'active' || access.reason === 'past_due'

  return (
    <div>
      <style>{`
        .b-serif { font-family: Georgia, 'Times New Roman', serif; }
        .b-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 12px 22px; border: 1px solid transparent; }
        .b-primary { background: ${AMBER}; color: #fff; }
        .b-primary:hover { background: #A96C25; }
        .b-primary:disabled { opacity: .5; cursor: default; }
        .b-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .b-plans { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        @media (max-width: 700px) { .b-plans { grid-template-columns: 1fr; } }
      `}</style>

      <h1 className="b-serif" style={{ fontSize: 26, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
        Billing
      </h1>

      {checkout === 'done' && (
        <div style={{ padding: '14px 18px', borderRadius: 8, marginBottom: 22,
          background: 'rgba(63,107,76,0.07)', border: '1px solid rgba(63,107,76,0.2)',
          fontSize: 15, color: '#3F6B4C', lineHeight: 1.6 }}>
          That went through. It can take a few seconds for the account to update, so refresh if the
          plan below still looks wrong.
        </div>
      )}
      {checkout === 'cancelled' && (
        <div style={{ padding: '14px 18px', borderRadius: 8, marginBottom: 22,
          background: '#fff', border: '1px solid #E8E2D8', fontSize: 15, color: '#57514A', lineHeight: 1.6 }}>
          No payment was taken. Nothing has changed on your account.
        </div>
      )}

      {/* Current state */}
      <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10,
        padding: '24px 26px', marginBottom: 26 }}>
        {access.reason === 'trialing' && (
          <>
            <div className="b-serif" style={{ fontSize: 20, marginBottom: 8 }}>
              {access.daysLeft} day{access.daysLeft === 1 ? '' : 's'} left on your trial
            </div>
            <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
              Everything is available during the trial, including reminders. Pick a plan below before it
              ends and nothing gets interrupted. No card is needed until you do.
            </p>
          </>
        )}

        {access.reason === 'active' && (
          <>
            <div className="b-serif" style={{ fontSize: 20, marginBottom: 8 }}>
              On the {sub?.plan === 'team' ? 'Team' : 'Solo'} plan
            </div>
            <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: '0 0 16px' }}>
              {sub?.cancel_at_period_end
                ? `Cancelling. You keep access until ${fmt(sub.current_period_end)}.`
                : sub?.current_period_end
                  ? `Renews ${fmt(sub.current_period_end)}.`
                  : 'Active.'}
            </p>
            {isOwner && (
              <button className="b-btn b-quiet" disabled={busy !== null}
                onClick={() => go('/api/billing/portal')}>
                {busy === '/api/billing/portal' ? 'Opening…' : 'Manage payment and invoices'}
              </button>
            )}
          </>
        )}

        {access.reason === 'past_due' && (
          <>
            <div className="b-serif" style={{ fontSize: 20, marginBottom: 8, color: '#A13B2A' }}>
              A payment did not go through
            </div>
            <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: '0 0 16px', maxWidth: 560 }}>
              Everything still works for now. Update the card and it will settle itself on the next attempt.
            </p>
            {isOwner && (
              <button className="b-btn b-primary" disabled={busy !== null}
                onClick={() => go('/api/billing/portal')}>
                {busy === '/api/billing/portal' ? 'Opening…' : 'Update payment details'}
              </button>
            )}
          </>
        )}

        {access.reason === 'trial_expired' && (
          <>
            <div className="b-serif" style={{ fontSize: 20, marginBottom: 8 }}>Your trial has ended</div>
            <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
              Your jobs and history are all still here, and nothing has been deleted. Pick a plan and
              everything comes straight back, including the reminders.
            </p>
          </>
        )}

        {access.reason === 'cancelled' && (
          <>
            <div className="b-serif" style={{ fontSize: 20, marginBottom: 8 }}>Subscription cancelled</div>
            <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
              Your data is kept. Resubscribe whenever you want and it picks up where it left off.
            </p>
          </>
        )}
      </div>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 18 }}>
          {error}
        </div>
      )}

      {!isOwner && (
        <div style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginBottom: 20 }}>
          Only the account owner can change the plan.
        </div>
      )}

      {isOwner && !paying && (
        <div className="b-plans">
          {(['solo', 'team'] as const).map(k => {
            const p = plans[k]
            return (
              <div key={k} style={{ background: '#fff', border: '1px solid #E8E2D8',
                borderRadius: 10, padding: '26px 28px', display: 'flex', flexDirection: 'column' }}>
                <div className="b-serif" style={{ fontSize: 19, marginBottom: 4 }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                  <span className="b-serif" style={{ fontSize: 32, color: AMBER }}>£{p.price}</span>
                  <span style={{ fontSize: 14, color: '#8A8279' }}>a month</span>
                </div>
                <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.65, margin: '0 0 18px' }}>{p.blurb}</p>
                <ul style={{ fontSize: 14, color: '#57514A', lineHeight: 1.85, paddingLeft: 18,
                  margin: '0 0 22px', flex: 1 }}>
                  {p.features.map((f: string) => <li key={f}>{f}</li>)}
                </ul>
                <button className="b-btn b-primary" disabled={busy !== null}
                  onClick={() => go('/api/billing/checkout', { plan: k })}>
                  {busy === '/api/billing/checkout' ? 'Opening…' : `Choose ${p.name}`}
                </button>
              </div>
            )
          })}
        </div>
      )}

      <p style={{ fontSize: 13.5, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 620 }}>
        Cancel whenever you like from the billing portal. There is no notice period and no minimum
        term. If you cancel, your data stays available until the end of the period you have paid for,
        and you can export everything to CSV before then.
      </p>
    </div>
  )
}
