import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import SessionsClient from '@/components/margin/SessionsClient'
import Paywall from '@/components/app/Paywall'
import { accessFor, type SubscriptionRow } from '@/lib/billing'
import { CONCEPTS } from '@/lib/margin'

export const metadata: Metadata = {
  title: 'Sessions | Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function SessionsPage() {
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
  if (!sites?.length) redirect('/margin')
  const site = sites[0]

  const [{ data: sessions }, { data: periods }] = await Promise.all([
    supabase.from('session_positions').select('*').eq('site_id', site.id)
      .order('trade_date', { ascending: false }).limit(120),
    supabase.from('periods').select('*').eq('site_id', site.id)
      .order('period_start', { ascending: false }).limit(1),
  ])

  // Use the real gross profit if a period exists, otherwise the benchmark floor
  const p: any = periods?.[0]
  const gpPct = p && p.turnover > 0
    ? ((p.turnover - p.cost_of_sales) / p.turnover) * 100
    : CONCEPTS[(site as any).concept as keyof typeof CONCEPTS].gpLow

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin/sessions" siteName={sites.length > 1 ? site.name : undefined} />
      <SessionsClient site={site as any} sessions={(sessions ?? []) as any[]} gpPct={gpPct} />
    </div>
  )
}
