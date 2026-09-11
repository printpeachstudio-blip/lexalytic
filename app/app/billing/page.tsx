import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import AppNav from '@/components/app/AppNav'
import BillingPanel from '@/components/app/BillingPanel'
import { accessFor, PLANS, type SubscriptionRow } from '@/lib/billing'

export const metadata: Metadata = {
  title: 'Billing | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function BillingPage({
  searchParams,
}: { searchParams: Promise<{ checkout?: string }> }) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: m } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()

  const { data: org } = m
    ? await supabase.from('organisations').select('id, name, owner_id, created_at').eq('id', m.org_id).single()
    : { data: null }

  const { data: sub } = m
    ? await supabase.from('subscriptions').select('*').eq('org_id', m.org_id).eq('product', 'retention').maybeSingle()
    : { data: null }

  const access = accessFor(sub as SubscriptionRow | null, org?.created_at ?? new Date().toISOString())
  const isOwner = org?.owner_id === user.id

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <AppNav current="/app/billing" />
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '38px 20px' }}>
        <BillingPanel
          access={access}
          sub={sub as SubscriptionRow | null}
          isOwner={isOwner}
          checkout={params?.checkout}
          plans={PLANS}
        />
      </div>
    </div>
  )
}
