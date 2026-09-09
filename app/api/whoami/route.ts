import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET() {
  const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' })
  const data = await res.json()
  return NextResponse.json({ egressIp: data.ip })
}
