import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import IngredientsClient from '@/components/margin/IngredientsClient'
import Paywall from '@/components/app/Paywall'
import { accessFor, type SubscriptionRow } from '@/lib/billing'

export const metadata: Metadata = {
  title: 'Ingredients | Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function IngredientsPage() {
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

  const [{ data: ingredients }, { data: suppliers }, { data: dishes }] = await Promise.all([
    supabase.from('ingredients').select('*').eq('site_id', site.id).eq('archived', false).order('name'),
    supabase.from('suppliers').select('*').eq('site_id', site.id).order('name'),
    supabase.from('dishes').select('id, name').eq('site_id', site.id).eq('archived', false),
  ])

  const ids = (ingredients ?? []).map((i: any) => i.id)
  const dishIds = (dishes ?? []).map((d: any) => d.id)

  const [{ data: prices }, { data: lines }] = await Promise.all([
    ids.length
      ? supabase.from('ingredient_prices').select('*').in('ingredient_id', ids)
          .order('effective_on', { ascending: false })
      : Promise.resolve({ data: [] as any[] }),
    dishIds.length
      ? supabase.from('dish_lines').select('*').in('dish_id', dishIds)
      : Promise.resolve({ data: [] as any[] }),
  ])

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin/ingredients" siteName={sites.length > 1 ? site.name : undefined} />
      <IngredientsClient
        site={site as any}
        ingredients={(ingredients ?? []) as any[]}
        suppliers={(suppliers ?? []) as any[]}
        prices={(prices ?? []) as any[]}
        dishes={(dishes ?? []) as any[]}
        lines={(lines ?? []) as any[]}
      />
    </div>
  )
}
