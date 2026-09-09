import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' })
    const data = await res.json()
    return NextResponse.json({ egressIp: data.ip })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
