import Stripe from 'stripe'

// Created on first use rather than at import, so a build without the key
// present does not fail while collecting page data.
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
    _stripe = new Stripe(key, { typescript: true })
  }
  return _stripe
}

export const PLANS = {
  solo: {
    key: 'solo' as const,
    name: 'Solo',
    price: 19,
    priceId: 'price_1UE5B04DeIIW1weWf8W40wgF',
    seats: 1,
    blurb: 'One person, unlimited jobs.',
    features: [
      'Unlimited jobs and contractors',
      'Both release dates worked out for you',
      'Email reminders at 90, 30 and 7 days, then when overdue',
      'Applications for release, with follow up wording',
      'Statutory interest calculated on anything late',
      'Part payments and certified value history',
      'CSV export for your accountant',
    ],
  },
  team: {
    key: 'team' as const,
    name: 'Team',
    price: 39,
    priceId: 'price_1UE5Bc4DeIIW1weWy2LLKAg6',
    seats: 10,
    blurb: 'Everything in Solo, shared across your team.',
    features: [
      'Everything in Solo',
      'Invite up to ten people',
      'Everyone sees the same jobs and figures',
      'Useful when the person doing the work is not the person chasing the money',
    ],
  },
}

export type PlanKey = keyof typeof PLANS

export const TRIAL_DAYS = 14

export interface SubscriptionRow {
  org_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: PlanKey | null
  status: string
  seats: number
  current_period_end: string | null
  cancel_at_period_end: boolean
  trial_ends_at?: string | null
}

// Statuses where the app should keep working
const LIVE = ['active', 'trialing', 'past_due']

export interface AccessState {
  allowed: boolean
  reason: 'active' | 'trialing' | 'past_due' | 'trial_expired' | 'cancelled' | 'none'
  daysLeft: number | null
  plan: PlanKey | null
}

export function accessFor(sub: SubscriptionRow | null, orgCreatedAt: string): AccessState {
  const created = new Date(orgCreatedAt)
  const trialEnd = new Date(created)
  trialEnd.setDate(trialEnd.getDate() + TRIAL_DAYS)
  const now = new Date()
  const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / 86400000)

  if (sub && LIVE.includes(sub.status) && sub.stripe_subscription_id) {
    return {
      allowed: true,
      reason: sub.status === 'past_due' ? 'past_due' : 'active',
      daysLeft: null,
      plan: sub.plan,
    }
  }

  if (sub && sub.status === 'canceled') {
    return { allowed: false, reason: 'cancelled', daysLeft: null, plan: sub.plan }
  }

  // No paid subscription. Fall back to the signup trial.
  if (daysLeft > 0) {
    return { allowed: true, reason: 'trialing', daysLeft, plan: null }
  }

  return { allowed: false, reason: 'trial_expired', daysLeft: 0, plan: null }
}
