import { NextRequest, NextResponse } from 'next/server'

const CH_BASE = 'https://api.company-information.service.gov.uk'
const MAX_NUMBERS = 50

// Normalise: pad short numbers with leading zeros, uppercase prefixed ones
function normalise(raw: string): string | null {
  const v = String(raw).trim().toUpperCase().replace(/\s/g, '')
  if (/^[A-Z]{2}[0-9]{6}$/.test(v)) return v
  const digits = v.replace(/[^0-9]/g, '')
  if (digits.length === 0 || digits.length > 8) return null
  return digits.padStart(8, '0')
}

export async function POST(req: NextRequest) {
  const key = process.env.COMPANIES_HOUSE_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'Lookup is not configured.' }, { status: 500 })
  }

  let body: { numbers?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!Array.isArray(body.numbers)) {
    return NextResponse.json({ error: 'Expected a list of company numbers.' }, { status: 400 })
  }

  const input = body.numbers.slice(0, MAX_NUMBERS).map(String)
  const auth = 'Basic ' + Buffer.from(key + ':').toString('base64')

  const results = await Promise.all(
    input.map(async (original) => {
      const number = normalise(original)
      if (!number) {
        return { original, status: 'invalid_format' as const }
      }
      try {
        const res = await fetch(`${CH_BASE}/company/${number}`, {
          headers: { Authorization: auth },
          cache: 'no-store',
        })
        if (res.status === 404) {
          return { original, normalised: number, status: 'not_found' as const }
        }
        if (res.status === 429) {
          return { original, normalised: number, status: 'rate_limited' as const }
        }
        if (!res.ok) {
          const detail = await res.text()
          return { original, normalised: number, status: 'error' as const, httpStatus: res.status, detail: detail.slice(0, 200) }
        }
        const data = await res.json()
        return {
          original,
          normalised: number,
          status: 'found' as const,
          companyName: data.company_name ?? null,
          companyStatus: data.company_status ?? null,
          companyType: data.type ?? null,
          incorporatedOn: data.date_of_creation ?? null,
          dissolvedOn: data.date_of_cessation ?? null,
        }
      } catch (e) {
        return { original, normalised: number, status: 'error' as const, detail: String(e).slice(0, 200) }
      }
    })
  )

  return NextResponse.json({ results })
}
