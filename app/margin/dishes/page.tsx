import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import DishesClient from '@/components/margin/DishesClient'
import Paywall from '@/components/app/Paywall'
import { accessFor, type SubscriptionRow } from '@/lib/billing'

export const metadata: Metadata = {
  title: 'Dishes | Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function DishesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: mem } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()
  const { data: orgRow } = mem
    ? await supabase.from('organisations').select('created_at').eq('id', mem.org_id).single()
    : { data: null }
  const { data: subRow } = mem
    ? await supabase.from('subscriptions').select('*').eq('org_id', mem.org_id).eq('product', 'margin').maybeSingle()
    : { data: null }

  const access = accessFor(subRow as SubscriptionRow | null, orgRow?.created_at ?? new Date().toISOString(), 'margin')
  if (!access.allowed) return <Paywall access={access} />

  const { data: sites } = await supabase
    .from('sites').select('*').eq('archived', false).order('created_at')
  if (!sites?.length) redirect('/margin')

  const site = sites[0]

  const [{ data: dishes }, { data: ingredients }, { data: channels }, { data: sales }] =
    await Promise.all([
      supabase.from('dish_positions').select('*').eq('site_id', site.id).order('name'),
      supabase.from('ingredients').select('*').eq('site_id', site.id).eq('archived', false).order('name'),
      supabase.from('channels').select('*').eq('site_id', site.id).eq('active', true).order('name'),
      supabase.from('dish_sales').select('*'),
    ])

  const dishIds = (dishes ?? []).map((d: any) => d.id)
  const { data: lines } = dishIds.length
    ? await supabase.from('dish_lines').select('*').in('dish_id', dishIds)
    : { data: [] }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin/dishes" siteName={sites.length > 1 ? site.name : undefined} />
      <DishesClient
        site={site as any}
        dishes={(dishes ?? []) as any[]}
        lines={(lines ?? []) as any[]}
        ingredients={(ingredients ?? []) as any[]}
        channels={(channels ?? []) as any[]}
        sales={(sales ?? []) as any[]}
      />
    </div>
  )
}
