import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Companies House status lookup.
 *
 * Only company numbers reach this endpoint. A company number is public
 * register data rather than personal data, so nothing here engages UK
 * GDPR. Names, emails, addresses and phone numbers stay in the browser
 * and are never sent.
 */

const CH_BASE = 'https://api.company-information.service.gov.uk'
const MAX_NUMBERS = 500

interface Result {
  number: string
  found: boolean
  name?: string
  status?: string
  statusDetail?: string
  incorporated?: string
  dissolved?: string
  concern?: 'dissolved' | 'liquidation' | 'administration' | 'proposed_strike_off' | 'not_found' | null
}

const CONCERNS: Record<string, Result['concern']> = {
  'dissolved': 'dissolved',
  'liquidation': 'liquidation',
  'receivership': 'liquidation',
  'administration': 'administration',
  'insolvency-proceedings': 'administration',
  'voluntary-arrangement': 'administration',
}

function readableStatus(status: string): string {
  const map: Record<string, string> = {
    'active': 'Active',
    'dissolved': 'Dissolved',
    'liquidation': 'In liquidation',
    'receivership': 'In receivership',
    'administration': 'In administration',
    'voluntary-arrangement': 'Voluntary arrangement',
    'converted-closed': 'Converted or closed',
    'insolvency-proceedings': 'Insolvency proceedings',
    'registered': 'Registered',
    'removed': 'Removed',
    'closed': 'Closed',
  }
  return map[status] || status
}

export async function POST(request: Request) {
  const key = process.env.COMPANIES_HOUSE_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'The Companies House lookup is not configured.' }, { status: 503 })
  }

  let body: { numbers?: unknown }
  try { body = await request.json() } catch { body = {} }

  if (!Array.isArray(body.numbers) || body.numbers.length === 0) {
    return NextResponse.json({ error: 'No company numbers given' }, { status: 400 })
  }

  // Only accept things shaped like a company number. Nothing else is
  // read from the request, so nothing else can be sent.
  const numbers = body.numbers
    .filter((n): n is string => typeof n === 'string')
    .map(n => n.trim().toUpperCase())
    .filter(n => /^([A-Z]{2}\d{6}|\d{8})$/.test(n))
    .slice(0, MAX_NUMBERS)

  if (!numbers.length) {
    return NextResponse.json(
      { error: 'None of those looked like company numbers' }, { status: 400 })
  }

  const auth = 'Basic ' + Buffer.from(key + ':').toString('base64')
  const results: Result[] = []

  // Companies House rate limits at 600 requests per five minutes, so
  // batch and pause rather than firing everything at once.
  const BATCH = 10
  for (let i = 0; i < numbers.length; i += BATCH) {
    const batch = numbers.slice(i, i + BATCH)

    const settled = await Promise.all(batch.map(async (num): Promise<Result> => {
      try {
        const res = await fetch(`${CH_BASE}/company/${num}`, {
          headers: { Authorization: auth },
        })

        if (res.status === 404) {
          return { number: num, found: false, concern: 'not_found' }
        }
        if (res.status === 429) {
          return { number: num, found: false, concern: null,
            statusDetail: 'Rate limited, try again shortly' }
        }
        if (!res.ok) {
          return { number: num, found: false, concern: null,
            statusDetail: `Lookup failed (${res.status})` }
        }

        const data = await res.json()
        const status = String(data.company_status || '')
        let concern = CONCERNS[status] ?? null

        // A company with a strike off notice is still "active" but is on
        // its way out, which is worth knowing before you invoice it.
        if (!concern && data.has_insolvency_history) concern = null
        if (status === 'active' && data.company_status_detail
            && String(data.company_status_detail).includes('strike-off')) {
          concern = 'proposed_strike_off'
        }

        return {
          number: num,
          found: true,
          name: data.company_name,
          status: readableStatus(status),
          statusDetail: data.company_status_detail,
          incorporated: data.date_of_creation,
          dissolved: data.date_of_cessation,
          concern,
        }
      } catch {
        return { number: num, found: false, concern: null, statusDetail: 'Lookup failed' }
      }
    }))

    results.push(...settled)
    if (i + BATCH < numbers.length) {
      await new Promise(r => setTimeout(r, 300))
    }
  }

  const concerns = results.filter(r => r.concern)
  return NextResponse.json({
    checked: results.length,
    results,
    summary: {
      active: results.filter(r => r.found && !r.concern).length,
      dissolved: results.filter(r => r.concern === 'dissolved').length,
      liquidation: results.filter(r => r.concern === 'liquidation').length,
      administration: results.filter(r => r.concern === 'administration').length,
      strikeOff: results.filter(r => r.concern === 'proposed_strike_off').length,
      notFound: results.filter(r => r.concern === 'not_found').length,
      concerns: concerns.length,
    },
  })
}
