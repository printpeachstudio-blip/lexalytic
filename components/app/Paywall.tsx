import Link from 'next/link'
import AppNav from './AppNav'
import type { AccessState } from '@/lib/billing'

export default function Paywall({ access }: { access: AccessState }) {
  const expired = access.reason === 'trial_expired'
  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <AppNav current="/app/billing" />
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '70px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 27, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 14px' }}>
          {expired ? 'Your trial has ended' : 'Your subscription has ended'}
        </h1>
        <p style={{ fontSize: 17, color: '#57514A', lineHeight: 1.8, margin: '0 0 16px' }}>
          Everything you entered is still here. Jobs, payments logged, certificates recorded,
          applications sent. Nothing has been deleted and nothing will be.
        </p>
        <p style={{ fontSize: 17, color: '#57514A', lineHeight: 1.8, margin: '0 0 28px' }}>
          Pick a plan and it all comes back, including the reminders. From £19 a month, cancel any time.
        </p>
        <Link href="/app/billing" style={{ display: 'inline-block', font: 'inherit', fontSize: 15,
          fontWeight: 500, borderRadius: 6, padding: '13px 26px', background: '#C17D2E',
          color: '#fff', textDecoration: 'none' }}>
          See the plans
        </Link>
      </div>
    </div>
  )
}
