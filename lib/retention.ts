export interface Receipt {
  id: string
  job_id: string
  stage: 'first' | 'final' | 'cap'
  amount: number
  received_on: string
  notes: string | null
}

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
  final_released: boolean
  notes: string | null
  retention_held: number
  over_deducted: number
  first_due: string | null
  final_due: string | null
  received_first: number
  received_final: number
  received_cap: number
}

export interface Profile {
  company_name: string | null
  contact_name: string | null
  address: string | null
  phone: string | null
}

import { BOE_BASE as RATE } from './rates'

export const BOE_BASE = RATE
export const STAT_RATE = BOE_BASE + 8

export function money(n: number): string {
  return '£' + Math.round(Number(n)).toLocaleString('en-GB')
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
export function fmtLong(d: string | Date | null): string {
  if (!d) return ''
  const date = typeof d === 'string' ? new Date(d + 'T00:00:00') : d
  if (isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
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
  expected: number
  received: number
  outstanding: number
  due: string | null
  days: number | null
  released: boolean
  overdue: boolean
  interest: number
}

export function stagesFor(j: JobRow): Stage[] {
  const half = Number(j.retention_held) / 2
  const mk = (
    key: 'first' | 'final', label: string, sub: string,
    due: string | null, received: number, released: boolean
  ): Stage => {
    const days = daysUntil(due)
    const outstanding = Math.max(0, half - Number(received))
    const overdue = !released && outstanding > 0 && days !== null && days < 0
    return {
      key, label, sub, expected: half, received: Number(received), outstanding,
      due, days, released, overdue,
      interest: overdue ? interestOn(outstanding, Math.abs(days!)) : 0,
    }
  }
  return [
    mk('first', 'First release', 'At practical completion', j.first_due, j.received_first, j.first_released),
    mk('final', 'Final release', `End of ${j.defects_months} month defects period`, j.final_due, j.received_final, j.final_released),
  ]
}

export function totals(jobs: JobRow[]) {
  let held = 0, outstanding = 0, releasable = 0, overdue = 0, overdueInterest = 0
  let overDeducted = 0, received = 0
  jobs.forEach(j => {
    held += Number(j.retention_held)
    overDeducted += Math.max(0, Number(j.over_deducted) - Number(j.received_cap))
    received += Number(j.received_first) + Number(j.received_final) + Number(j.received_cap)
    stagesFor(j).forEach(s => {
      if (s.released) return
      outstanding += s.outstanding
      if (s.days !== null && s.days <= 0) releasable += s.outstanding
      if (s.overdue) { overdue += s.outstanding; overdueInterest += s.interest }
    })
  })
  return { held, outstanding, releasable, overdue, overdueInterest, overDeducted, received }
}

// Anything needing attention, most urgent first
export interface Action {
  kind: 'overdue' | 'due' | 'soon' | 'cap' | 'nodate'
  job: JobRow
  stage?: Stage
  amount: number
  headline: string
  detail: string
  days: number | null
}

export function actionsFor(jobs: JobRow[]): Action[] {
  const out: Action[] = []
  jobs.forEach(j => {
    const capLeft = Math.max(0, Number(j.over_deducted) - Number(j.received_cap))
    if (capLeft > 0) {
      out.push({
        kind: 'cap', job: j, amount: capLeft, days: null,
        headline: `${money2(capLeft)} deducted beyond the cap on ${j.ref}`,
        detail: 'Never contractually due. Recoverable now, separately from the release stages.',
      })
    }
    if (!j.pc_date) {
      out.push({
        kind: 'nodate', job: j, amount: 0, days: null,
        headline: `No completion date on ${j.ref}`,
        detail: 'Neither release date can be worked out until this is set.',
      })
      return
    }
    stagesFor(j).forEach(s => {
      if (s.released || s.outstanding <= 0) return
      if (s.overdue) {
        out.push({
          kind: 'overdue', job: j, stage: s, amount: s.outstanding, days: s.days,
          headline: `${money2(s.outstanding)} overdue from ${j.contractor || j.ref}`,
          detail: `${s.label} on ${j.ref} fell due ${fmtDate(s.due)}, ${Math.abs(s.days!)} days ago. Interest of ${money2(s.interest)} has accrued.`,
        })
      } else if (s.days !== null && s.days <= 0) {
        out.push({
          kind: 'due', job: j, stage: s, amount: s.outstanding, days: s.days,
          headline: `${money2(s.outstanding)} is now releasable on ${j.ref}`,
          detail: `${s.label} fell due ${fmtDate(s.due)}. Apply in writing before it ages.`,
        })
      } else if (s.days !== null && s.days <= 60) {
        out.push({
          kind: 'soon', job: j, stage: s, amount: s.outstanding, days: s.days,
          headline: `${money2(s.outstanding)} due in ${s.days} days on ${j.ref}`,
          detail: `${s.label}, ${fmtDate(s.due)}. Worth applying a fortnight ahead.`,
        })
      }
    })
  })
  const order = { overdue: 0, due: 1, cap: 2, soon: 3, nodate: 4 }
  return out.sort((a, b) => order[a.kind] - order[b.kind] || b.amount - a.amount)
}
