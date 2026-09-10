import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function esc(v: any): string {
  const s = v === null || v === undefined ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function addMonths(dateStr: string | null, months: number): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  if (isNaN(d.getTime())) return ''
  d.setMonth(d.getMonth() + months)
  return d.toISOString().slice(0, 10)
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not signed in' }, { status: 401 })

  const { data: jobs, error } = await supabase
    .from('job_positions').select('*').order('ref')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const headers = [
    'Job reference', 'Main contractor', 'Contract value', 'Certified to date',
    'Retention rate %', 'Cap %', 'Retention held', 'Over deducted',
    'Practical completion', 'Defects months',
    'First release due', 'First half expected', 'First half received', 'First half settled',
    'Final release due', 'Final half expected', 'Final half received', 'Final half settled',
    'Total outstanding',
  ]

  const rows = (jobs ?? []).map((j: any) => {
    const held = Number(j.retention_held)
    const half = held / 2
    const firstOut = j.first_released ? 0 : Math.max(0, half - Number(j.received_first))
    const finalOut = j.final_released ? 0 : Math.max(0, half - Number(j.received_final))
    return [
      j.ref, j.contractor, j.contract_value, j.certified,
      j.retention_pct, j.cap_pct, held.toFixed(2), Number(j.over_deducted).toFixed(2),
      j.pc_date ?? '', j.defects_months,
      j.first_due ?? '', half.toFixed(2), Number(j.received_first).toFixed(2), j.first_released ? 'Yes' : 'No',
      j.final_due ?? addMonths(j.pc_date, j.defects_months), half.toFixed(2),
      Number(j.received_final).toFixed(2), j.final_released ? 'Yes' : 'No',
      (firstOut + finalOut).toFixed(2),
    ].map(esc).join(',')
  })

  const csv = [headers.map(esc).join(','), ...rows].join('\r\n')
  const stamp = new Date().toISOString().slice(0, 10)

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="retention-position-${stamp}.csv"`,
    },
  })
}
