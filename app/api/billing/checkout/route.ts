import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe, PLANS, TRIAL_DAYS, type PlanKey } from '@/lib/billing'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  let body: { plan?: string }
  try { body = await request.json() } catch { body = {} }

  const planKey = (body.plan ?? 'solo') as PlanKey
  const plan = PLANS[planKey]
  if (!plan) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 })

  const { data: m } = await supabase
    .from('organisation_members').select('org_id').eq('user_id', user.id).limit(1).single()
  if (!m) return NextResponse.json({ error: 'No organisation' }, { status: 400 })

  const { data: org } = await supabase
    .from('organisations').select('id, name, owner_id, created_at').eq('id', m.org_id).single()

  if (org?.owner_id !== user.id) {
    return NextResponse.json({ error: 'Only the account owner can change the plan' }, { status: 403 })
  }

  const { data: sub } = await supabase
    .from('subscriptions').select('stripe_customer_id, stripe_subscription_id, status')
    .eq('org_id', m.org_id).single()

  // Reuse the customer if we already made one
  let customerId = sub?.stripe_customer_id ?? null
  if (!customerId) {
    const customer = await getStripe().customers.create({
      email: user.email ?? undefined,
      name: org?.name ?? undefined,
      metadata: {
        product: plan.product, org_id: m.org_id, user_id: user.id },
    })
    customerId = customer.id
  }

  // Only offer a trial if they have never had a subscription
  const everSubscribed = Boolean(sub?.stripe_subscription_id)
  const created = org?.created_at ? new Date(org.created_at) : new Date()
  const trialEnd = new Date(created)
  trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS)
  const trialDaysLeft = Math.ceil((trialEnd.getTime() - Date.now()) / 86400000)

  const origin = new URL(request.url).origin

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: plan.priceId, quantity: 1 }],
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    success_url: `${origin}/app/billing?checkout=done`,
    cancel_url: `${origin}/app/billing?checkout=cancelled`,
    subscription_data: {
      metadata: { org_id: m.org_id, plan: planKey },
      ...(!everSubscribed && trialDaysLeft > 0
        ? { trial_period_days: Math.min(trialDaysLeft, TRIAL_DAYS) }
        : {}),
    },
    metadata: { org_id: m.org_id, plan: planKey },
  })

  return NextResponse.json({ url: session.url })
}
