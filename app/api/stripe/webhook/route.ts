import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { getStripe, PLANS, type PlanKey } from '@/lib/billing'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

function planFromPriceId(priceId: string | undefined): PlanKey | null {
  if (!priceId) return null
  const hit = Object.values(PLANS).find(p => p.priceId === priceId)
  return hit ? hit.key : null
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const supabase = createAdminClient()
  const orgId = sub.metadata?.org_id
  if (!orgId) return

  const item = sub.items.data[0]
  const priceId = item?.price?.id
  const plan = planFromPriceId(priceId) ?? (sub.metadata?.plan as PlanKey | undefined) ?? null
  const periodEnd = (sub as any).current_period_end as number | undefined

  await supabase.from('subscriptions').upsert({
    org_id: orgId,
    stripe_customer_id: typeof sub.customer === 'string' ? sub.customer : sub.customer.id,
    stripe_subscription_id: sub.id,
    plan,
    status: sub.status,
    seats: plan ? PLANS[plan].seats : 1,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: sub.cancel_at_period_end ?? false,
  }, { onConflict: 'org_id' })
}

export async function POST(request: Request) {
  const body = await request.text()
  const sig = (await headers()).get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Not signed' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (e: any) {
    return NextResponse.json({ error: `Signature check failed: ${e.message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.subscription) {
          const subId = typeof session.subscription === 'string'
            ? session.subscription : session.subscription.id
          const sub = await getStripe().subscriptions.retrieve(subId)
          // Checkout metadata is the reliable source of the org
          if (!sub.metadata?.org_id && session.metadata?.org_id) {
            await getStripe().subscriptions.update(subId, {
              metadata: { org_id: session.metadata.org_id, plan: session.metadata.plan ?? '' },
            })
            const fresh = await getStripe().subscriptions.retrieve(subId)
            await upsertSubscription(fresh)
          } else {
            await upsertSubscription(sub)
          }
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        await upsertSubscription(event.data.object as Stripe.Subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subId = (invoice as any).subscription
        if (subId) {
          const sub = await getStripe().subscriptions.retrieve(
            typeof subId === 'string' ? subId : subId.id
          )
          await upsertSubscription(sub)
        }
        break
      }
    }
  } catch (e: any) {
    // Return 500 so Stripe retries rather than treating it as handled
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
