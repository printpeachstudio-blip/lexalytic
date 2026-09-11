import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import BillingPanel from '@/components/app/BillingPanel'
import { accessFor, PLANS, type SubscriptionRow } from '@/lib/billing'

export const metadata: Metadata = {
  title: 'Billing | Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

// Only the margin plans, so nobody browsing a restaurant product is
// offered the construction one.
const MARGIN_PLANS = Object.fromEntries(
  Object.entries(PLANS).filter(([, p]) => p.product === 'margin')
) as typeof PLANS

export default async function MarginBillingPage(
  { searchParams }: { searchParams?: Promise<{ checkout?: string }> }
) {
  const params = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: m } = await supabase
    .from('organisation_members')
    .select('org_id, role')
    .eq('user_id', user.id).limit(1).single()

  const isOwner = m?.role === 'owner'

  const { data: orgRow } = m
    ? await supabase.from('organisations').select('created_at').eq('id', m.org_id).single()
    : { data: null }

  const { data: sub } = m
    ? await supabase.from('subscriptions').select('*')
        .eq('org_id', m.org_id).eq('product', 'margin').maybeSingle()
    : { data: null }

  const access = accessFor(
    sub as SubscriptionRow | null,
    orgRow?.created_at ?? new Date().toISOString(),
    'margin'
  )

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin/billing" />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '38px 20px' }}>
        <BillingPanel
          access={access}
          sub={sub as SubscriptionRow | null}
          isOwner={isOwner}
          checkout={params?.checkout}
          plans={MARGIN_PLANS}
        />
      </div>
    </div>
  )
}
