import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import SettingsClient from '@/components/margin/SettingsClient'
import Paywall from '@/components/app/Paywall'
import { accessFor, type SubscriptionRow } from '@/lib/billing'

export const metadata: Metadata = {
  title: 'Settings | Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function MarginSettingsPage() {
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

  const [{ data: channels }, { data: periods }] = await Promise.all([
    supabase.from('channels').select('*').eq('site_id', site.id).order('name'),
    supabase.from('periods').select('*').eq('site_id', site.id)
      .order('period_start', { ascending: false }).limit(12),
  ])

  const channelIds = (channels ?? []).map((c: any) => c.id)
  const { data: statements } = channelIds.length
    ? await supabase.from('channel_statements').select('*').in('channel_id', channelIds)
        .order('period_start', { ascending: false }).limit(24)
    : { data: [] }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin/settings" siteName={sites.length > 1 ? site.name : undefined} />
      <SettingsClient
        site={site as any}
        sites={sites as any[]}
        channels={(channels ?? []) as any[]}
        periods={(periods ?? []) as any[]}
        statements={(statements ?? []) as any[]}
      />
    </div>
  )
}
