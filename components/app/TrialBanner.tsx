import Link from 'next/link'
import type { AccessState } from '@/lib/billing'

export default function TrialBanner({ access }: { access: AccessState }) {
  if (access.reason === 'trialing' && access.daysLeft !== null && access.daysLeft <= 7) {
    return (
      <div style={{ background: 'rgba(176,122,30,0.08)', borderBottom: '1px solid rgba(176,122,30,0.22)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '12px 20px', fontSize: 14,
          color: '#8F6318', lineHeight: 1.6, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span>
            {access.daysLeft === 0
              ? 'Your trial ends today.'
              : `${access.daysLeft} day${access.daysLeft === 1 ? '' : 's'} left on your trial.`}
            {' '}Pick a plan and nothing gets interrupted.
          </span>
          <Link href="/app/billing" style={{ color: '#8F6318', fontWeight: 600, marginLeft: 'auto' }}>
            See plans
          </Link>
        </div>
      </div>
    )
  }

  if (access.reason === 'past_due') {
    return (
      <div style={{ background: 'rgba(161,59,42,0.07)', borderBottom: '1px solid rgba(161,59,42,0.22)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: '12px 20px', fontSize: 14,
          color: '#A13B2A', lineHeight: 1.6, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span>A payment did not go through. Everything still works for now.</span>
          <Link href="/app/billing" style={{ color: '#A13B2A', fontWeight: 600, marginLeft: 'auto' }}>
            Update card
          </Link>
        </div>
      </div>
    )
  }

  return null
}
