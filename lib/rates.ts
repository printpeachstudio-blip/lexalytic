/**
 * Every rate and threshold that goes stale, in one place.
 *
 * When one of these changes, update it here and everything that uses it
 * follows. Each carries the date it was last checked so it is obvious
 * when something has been left too long.
 *
 * LAST REVIEWED: 11 September 2026
 */

// ---------------------------------------------------------------
// Bank of England
// Moves at MPC meetings, roughly eight times a year.
// Check: bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate
// ---------------------------------------------------------------
export const BOE_BASE = 3.75
export const BOE_CHECKED = '2026-09-11'

// Late Payment of Commercial Debts (Interest) Act 1998.
// Base plus eight percentage points, on a simple basis.
export const STATUTORY_INTEREST = BOE_BASE + 8

// ---------------------------------------------------------------
// Employment costs, England 2026/27
// Change at the start of each tax year in April.
// Check: gov.uk/guidance/rates-and-thresholds-for-employers
// ---------------------------------------------------------------
export const EMPLOYER_NI_RATE = 0.15
export const EMPLOYER_NI_THRESHOLD_ANNUAL = 5000
export const EMPLOYER_NI_THRESHOLD_HOURLY = 2.56  // roughly, over 1,950 hours
export const PENSION_MIN_EMPLOYER = 0.03
export const HOLIDAY_ACCRUAL = 0.1207             // 28 days, the statutory minimum
export const NLW = 12.71                          // National Living Wage, 21 and over
export const WEEKS_WORKED = 46.4                  // 52 less 5.6 weeks statutory holiday
export const HOURS_PER_WEEK = 37.5
export const EMPLOYMENT_CHECKED = '2026-09-11'

/** What an hour of someone's time actually costs the business. */
export function trueHourlyCost(rate: number): number {
  const gross = rate * (1 + HOLIDAY_ACCRUAL)
  const ni = Math.max(0, gross - EMPLOYER_NI_THRESHOLD_HOURLY) * EMPLOYER_NI_RATE
  return gross + ni + gross * PENSION_MIN_EMPLOYER
}

/** Same thing from an annual salary rather than an hourly rate. */
export function trueHourlyFromSalary(salary: number): number {
  const ni = Math.max(0, salary - EMPLOYER_NI_THRESHOLD_ANNUAL) * EMPLOYER_NI_RATE
  const pension = salary * PENSION_MIN_EMPLOYER
  return (salary + ni + pension) / (WEEKS_WORKED * HOURS_PER_WEEK)
}

// ---------------------------------------------------------------
// HMO and lettings
// Renters' Rights Act provisions in force 1 May 2026.
// Check: gov.uk and the Housing Act 2004 as amended
// ---------------------------------------------------------------
export const HMO_CIVIL_PENALTY_MAX = 30000
export const RRO_MAX_MONTHS = 24        // doubled from 12 on 1 May 2026
export const RRO_CLAIM_WINDOW_MONTHS = 24
export const HMO_ROOM_SINGLE = 6.51     // square metres, one person over 10
export const HMO_ROOM_DOUBLE = 10.22
export const HMO_ROOM_CHILD = 4.64      // under 10
export const HMO_CHECKED = '2026-09-11'

// ---------------------------------------------------------------
// Hospitality benchmarks
// Commonly published UK figures rather than an official source.
// Worth revisiting annually.
// ---------------------------------------------------------------
export const ALCOHOL_DUTY_RISE_2026 = 3.66   // RPI, from 1 February 2026
export const DELIVERY_COMMISSION_TYPICAL = 30
export const DRAUGHT_WASTAGE_TYPICAL = 5.5
export const HOSPITALITY_CHECKED = '2026-09-11'

// ---------------------------------------------------------------
// VAT
// ---------------------------------------------------------------
export const VAT_RATE = 0.20
export const VAT_THRESHOLD = 90000

/**
 * How long since a group of rates was last checked. Used to warn in
 * development rather than to show anyone.
 */
export function monthsSince(isoDate: string): number {
  const then = new Date(isoDate)
  const now = new Date()
  return (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth())
}
