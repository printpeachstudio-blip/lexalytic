import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import Overview from '@/components/margin/Overview'
import NoSite from '@/components/margin/NoSite'
import { accessFor, type SubscriptionRow } from '@/lib/billing'
import Paywall from '@/components/app/Paywall'

export const metadata: Metadata = {
  title: 'Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function MarginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: mem } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()

  const { data: orgRow } = mem
    ? await supabase.from('organisations').select('created_at').eq('id', mem.org_id).single()
    : { data: null }

  const { data: subRow } = mem
    ? await supabase.from('subscriptions').select('*').eq('org_id', mem.org_id).single()
    : { data: null }

  const access = accessFor(subRow as SubscriptionRow | null, orgRow?.created_at ?? new Date().toISOString())
  if (!access.allowed) return <Paywall access={access} />

  const { data: sites } = await supabase
    .from('sites').select('*').eq('archived', false).order('created_at')

  if (!sites?.length) {
    return (
      <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
        <MarginNav current="/margin" />
        <NoSite />
      </div>
    )
  }

  const site = sites[0]

  const [
    { data: dishes }, { data: sessions }, { data: events },
    { data: stocktakes }, { data: channels }, { data: periods }, { data: sales },
  ] = await Promise.all([
    supabase.from('dish_positions').select('*').eq('site_id', site.id),
    supabase.from('session_positions').select('*').eq('site_id', site.id)
      .order('trade_date', { ascending: false }).limit(60),
    supabase.from('events').select('*').eq('site_id', site.id)
      .order('occurred_on', { ascending: false }).limit(200),
    supabase.from('stocktake_variance').select('*').eq('site_id', site.id)
      .order('taken_on', { ascending: false }).limit(12),
    supabase.from('channels').select('*').eq('site_id', site.id).eq('active', true),
    supabase.from('periods').select('*').eq('site_id', site.id)
      .order('period_start', { ascending: false }).limit(12),
    supabase.from('dish_sales').select('*').order('period_start', { ascending: false }),
  ])

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin" siteName={sites.length > 1 ? site.name : undefined} />
      <Overview
        site={site as any}
        sites={sites as any[]}
        dishes={(dishes ?? []) as any[]}
        sessions={(sessions ?? []) as any[]}
        events={(events ?? []) as any[]}
        stocktakes={(stocktakes ?? []) as any[]}
        channels={(channels ?? []) as any[]}
        periods={(periods ?? []) as any[]}
        sales={(sales ?? []) as any[]}
      />
    </div>
  )
}
