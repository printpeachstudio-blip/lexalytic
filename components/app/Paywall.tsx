import Link from 'next/link'
import AppNav from './AppNav'
import MarginNav from '../margin/MarginNav'
import type { AccessState, ProductKey } from '@/lib/billing'

const COPY: Record<ProductKey, {
  kept: string
  back: string
  from: number
  billing: string
}> = {
  retention: {
    kept: 'Jobs, payments logged, certificates recorded, applications sent. Nothing has been deleted and nothing will be.',
    back: 'Pick a plan and it all comes back, including the reminders.',
    from: 19,
    billing: '/app/billing',
  },
  margin: {
    kept: 'Dishes, recipes, ingredient price history, stocktakes and everything in the log. Nothing has been deleted and nothing will be.',
    back: 'Pick a plan and it all comes back, including the invoice scanning.',
    from: 49,
    billing: '/margin/billing',
  },
}

export default function Paywall({
  access,
  product = 'retention',
}: {
  access: AccessState
  product?: ProductKey
}) {
  const expired = access.reason === 'trial_expired'
  const copy = COPY[product]

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      {product === 'margin'
        ? <MarginNav current="/margin/billing" />
        : <AppNav current="/app/billing" />}
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '70px 20px' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 27, fontWeight: 400,
          letterSpacing: '-0.02em', margin: '0 0 14px' }}>
          {expired ? 'Your trial has ended' : 'Your subscription has ended'}
        </h1>
        <p style={{ fontSize: 17, color: '#57514A', lineHeight: 1.8, margin: '0 0 16px' }}>
          Everything you entered is still here. {copy.kept}
        </p>
        <p style={{ fontSize: 17, color: '#57514A', lineHeight: 1.8, margin: '0 0 28px' }}>
          {copy.back} From £{copy.from} a month, cancel any time.
        </p>
        <Link href={copy.billing} style={{ display: 'inline-block', font: 'inherit', fontSize: 15,
          fontWeight: 500, borderRadius: 6, padding: '13px 26px', background: '#C17D2E',
          color: '#fff', textDecoration: 'none' }}>
          See the plans
        </Link>
      </div>
    </div>
  )
}
