export interface JobRow {
  id: string
  ref: string
  contractor: string | null
  contractor_email: string | null
  contract_value: number
  certified: number
  retention_pct: number
  cap_pct: number
  pc_date: string | null
  defects_months: number
  first_released: boolean
  first_released_on: string | null
  final_released: boolean
  final_released_on: string | null
  notes: string | null
  retention_held: number
  over_deducted: number
  first_due: string | null
  final_due: string | null
}

export const BOE_BASE = 3.75
export const STAT_RATE = BOE_BASE + 8

export function money(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}
export function money2(n: number): string {
  return '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
export function fmtDate(d: string | Date | null): string {
  if (!d) return '—'
  const date = typeof d === 'string' ? new Date(d + 'T00:00:00') : d
  if (isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
export function daysUntil(d: string | null): number | null {
  if (!d) return null
  const date = new Date(d + 'T00:00:00')
  if (isNaN(date.getTime())) return null
  const today = new Date(); today.setHours(0, 0, 0, 0)
  return Math.round((date.getTime() - today.getTime()) / 86400000)
}
export function interestOn(amount: number, daysOverdue: number): number {
  if (daysOverdue <= 0) return 0
  return amount * (STAT_RATE / 100) * (daysOverdue / 365)
}

export interface Stage {
  key: 'first' | 'final'
  label: string
  sub: string
  amount: number
  due: string | null
  days: number | null
  released: boolean
  overdue: boolean
  interest: number
}

export function stagesFor(j: JobRow): Stage[] {
  const half = Number(j.retention_held) / 2
  const firstDays = daysUntil(j.first_due)
  const finalDays = daysUntil(j.final_due)
  return [
    {
      key: 'first', label: 'First release', sub: 'At practical completion',
      amount: half, due: j.first_due, days: firstDays, released: j.first_released,
      overdue: !j.first_released && firstDays !== null && firstDays < 0,
      interest: !j.first_released && firstDays !== null && firstDays < 0 ? interestOn(half, Math.abs(firstDays)) : 0,
    },
    {
      key: 'final', label: 'Final release', sub: `End of ${j.defects_months} month defects period`,
      amount: half, due: j.final_due, days: finalDays, released: j.final_released,
      overdue: !j.final_released && finalDays !== null && finalDays < 0,
      interest: !j.final_released && finalDays !== null && finalDays < 0 ? interestOn(half, Math.abs(finalDays)) : 0,
    },
  ]
}

export function totals(jobs: JobRow[]) {
  let held = 0, outstanding = 0, releasable = 0, overdue = 0, overdueInterest = 0, overDeducted = 0
  jobs.forEach(j => {
    held += Number(j.retention_held)
    overDeducted += Number(j.over_deducted)
    stagesFor(j).forEach(s => {
      if (!s.released) {
        outstanding += s.amount
        if (s.days !== null && s.days <= 0) releasable += s.amount
        if (s.overdue) { overdue += s.amount; overdueInterest += s.interest }
      }
    })
  })
  return { held, outstanding, releasable, overdue, overdueInterest, overDeducted }
}
