import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/billing'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { data: m } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()
  if (!m) return NextResponse.json({ error: 'No organisation' }, { status: 400 })

  const { data: org } = await supabase
    .from('organisations').select('owner_id').eq('id', m.org_id).single()
  if (org?.owner_id !== user.id) {
    return NextResponse.json({ error: 'Only the account owner can manage billing' }, { status: 403 })
  }

  const { data: sub } = await supabase
    .from('subscriptions').select('stripe_customer_id').eq('org_id', m.org_id).single()

  if (!sub?.stripe_customer_id) {
    return NextResponse.json({ error: 'No billing account yet' }, { status: 400 })
  }

  const origin = new URL(request.url).origin
  const session = await getStripe().billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${origin}/app/billing`,
  })

  return NextResponse.json({ url: session.url })
}
