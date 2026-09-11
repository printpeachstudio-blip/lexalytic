import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import MarginNav from '@/components/margin/MarginNav'
import InvoicesClient from '@/components/margin/InvoicesClient'
import Paywall from '@/components/app/Paywall'
import { accessFor, type SubscriptionRow } from '@/lib/billing'

export const metadata: Metadata = {
  title: 'Invoices | Margin Manager | Lexalytic',
  robots: { index: false, follow: false },
}

export default async function InvoicesPage() {
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

  const [{ data: invoices }, { data: ingredients }] = await Promise.all([
    supabase.from('invoices').select('*').eq('site_id', site.id)
      .order('created_at', { ascending: false }).limit(40),
    supabase.from('ingredients').select('id, name, recipe_unit, current_price')
      .eq('site_id', site.id).eq('archived', false).order('name'),
  ])

  const ids = (invoices ?? []).map((i: any) => i.id)
  const { data: lines } = ids.length
    ? await supabase.from('invoice_review').select('*').in('invoice_id', ids)
    : { data: [] }

  return (
    <div style={{ background: '#FDFCFA', minHeight: '100vh', color: '#1A1815', paddingBottom: 70,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <MarginNav current="/margin/invoices" siteName={sites.length > 1 ? site.name : undefined} />
      <InvoicesClient
        siteId={site.id}
        invoices={(invoices ?? []) as any[]}
        lines={(lines ?? []) as any[]}
        ingredients={(ingredients ?? []) as any[]}
      />
    </div>
  )
}
