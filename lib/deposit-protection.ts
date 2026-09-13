/**
 * Tenancy deposit protection, England and Wales.
 *
 * Sections 213 to 215 of the Housing Act 2004. Two obligations, both with
 * the same 30 day deadline running from receipt of the money rather than
 * from the tenancy start: protect the deposit in an approved scheme, and
 * serve the prescribed information.
 *
 * The parts landlords miss, in order of how often:
 *   - the prescribed information, which is a separate duty from protecting
 *   - re-protection on renewal, where an originally compliant deposit
 *     becomes non-compliant because nobody re-served anything
 *   - the cap, which is five weeks rent, or six where annual rent is
 *     £50,000 or more
 *
 * A tenant has six years to bring a claim, so tenancies that ended years
 * ago still matter.
 *
 * LAST REVIEWED: 12 September 2026
 */

export const PROTECT_DAYS = 30
export const CLAIM_WINDOW_YEARS = 6
export const CAP_WEEKS_STANDARD = 5
export const CAP_WEEKS_HIGH_RENT = 6
export const HIGH_RENT_THRESHOLD = 50000

export const SCHEMES = [
  { key: 'dps', label: 'Deposit Protection Service (DPS)' },
  { key: 'mydeposits', label: 'mydeposits' },
  { key: 'tds', label: 'Tenancy Deposit Scheme (TDS)' },
  { key: 'none', label: 'Not protected' },
  { key: 'unsure', label: 'Not sure' },
] as const

export interface Tenancy {
  id: string
  property: string
  tenant: string
  deposit: string
  annualRent: string
  received: string        // when the money arrived
  tenancyStart: string
  protectedOn: string     // date protected with a scheme
  scheme: string
  piServed: string        // prescribed information served
  renewedOn: string       // date of any renewal
  reprotectedOn: string   // re-protected after that renewal
  piReserved: string      // prescribed information served again
  ended: string           // tenancy end date, blank if live
}

export type Severity = 'breach' | 'risk' | 'check' | 'clear'

export interface Issue {
  id: string
  severity: Severity
  title: string
  detail: string
  action: string
  section: string
}

export interface Assessment {
  tenancy: Tenancy
  deposit: number
  issues: Issue[]
  daysToProtect: number | null
  daysToPi: number | null
  exposureLow: number
  exposureHigh: number
  claimExpires: Date | null
  claimLive: boolean
  worst: Severity
}

function parse(d: string): Date | null {
  if (!d) return null
  const x = new Date(d + 'T00:00:00')
  return isNaN(x.getTime()) ? null : x
}

export function daysBetween(a: string, b: string): number | null {
  const x = parse(a), y = parse(b)
  if (!x || !y) return null
  return Math.round((y.getTime() - x.getTime()) / 86400000)
}

export function addYears(d: Date, n: number): Date {
  const x = new Date(d)
  x.setFullYear(x.getFullYear() + n)
  return x
}

export function money(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

export function fmt(iso: string): string {
  const d = parse(iso)
  return d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
}

const SEV_ORDER: Severity[] = ['breach', 'risk', 'check', 'clear']

export function assess(t: Tenancy, today = new Date()): Assessment {
  const deposit = parseFloat(t.deposit) || 0
  const annualRent = parseFloat(t.annualRent) || 0
  const issues: Issue[] = []

  const daysToProtect = daysBetween(t.received, t.protectedOn)
  const daysToPi = daysBetween(t.received, t.piServed)

  // ---- protection ----
  if (t.scheme === 'none') {
    issues.push({
      id: 'not_protected',
      severity: 'breach',
      title: 'The deposit was never protected',
      detail: 'A deposit taken on an assured shorthold tenancy has to sit in one of the three approved schemes. This one does not, which is a breach for every day it has been held.',
      action: 'Protect it now, or return it to the tenant in full. Protecting late does not undo the breach but it stops it continuing, and courts treat a landlord who put it right differently from one who did not.',
      section: 'Section 213',
    })
  } else if (t.scheme === 'unsure') {
    issues.push({
      id: 'scheme_unknown',
      severity: 'check',
      title: 'You are not sure which scheme holds it',
      detail: 'Each of the three schemes has a free online check. If none of them holds it, the deposit is not protected.',
      action: 'Check with DPS, mydeposits and TDS. It takes a few minutes and it is worth knowing rather than assuming.',
      section: 'Section 213',
    })
  } else if (!t.protectedOn) {
    issues.push({
      id: 'no_protect_date',
      severity: 'check',
      title: 'No protection date recorded',
      detail: 'The scheme will have the date. Without it you cannot show the deadline was met, and the burden is on the landlord.',
      action: 'Get the certificate from the scheme and record the date.',
      section: 'Section 213',
    })
  } else if (daysToProtect !== null && daysToProtect > PROTECT_DAYS) {
    issues.push({
      id: 'protect_late',
      severity: 'breach',
      title: `Protected ${daysToProtect} days after the money arrived`,
      detail: `The deadline is ${PROTECT_DAYS} days from receipt, not from the tenancy start and not from when the tenant moved in. This was ${daysToProtect - PROTECT_DAYS} days over.`,
      action: 'There is no way to undo a late protection. What you can do is make sure every current tenancy is inside the window and that the record shows it.',
      section: 'Section 213(3)',
    })
  }

  // ---- prescribed information ----
  if (t.scheme !== 'none' && !t.piServed) {
    issues.push({
      id: 'no_pi',
      severity: 'breach',
      title: 'No record of the prescribed information being served',
      detail: 'This is a separate duty from protecting the deposit and it carries the same penalty. Protecting the money and never serving the information is a breach, and it is the commonest one there is.',
      action: 'Serve it now if you have not, and keep proof of how and when. The scheme provides a standard form.',
      section: 'Section 213(6)',
    })
  } else if (daysToPi !== null && daysToPi > PROTECT_DAYS) {
    issues.push({
      id: 'pi_late',
      severity: 'breach',
      title: `Prescribed information served ${daysToPi} days after receipt`,
      detail: `Same ${PROTECT_DAYS} day deadline as the protection itself. Late by one day carries the same consequence as late by a hundred.`,
      action: 'Nothing undoes it. Make sure the current ones are inside the window.',
      section: 'Section 213(6)',
    })
  }

  // ---- renewal ----
  if (t.renewedOn) {
    const reDays = daysBetween(t.renewedOn, t.reprotectedOn)
    const rePi = daysBetween(t.renewedOn, t.piReserved)
    if (!t.reprotectedOn && !t.piReserved) {
      issues.push({
        id: 'renewal_nothing',
        severity: 'risk',
        title: 'Nothing recorded at renewal',
        detail: 'When a tenancy is renewed as a new fixed term, the deposit is generally treated as received again. A deposit protected perfectly in 2022 can be non compliant from a 2024 renewal that nobody did anything about.',
        action: 'Check with your scheme whether the protection carried over. Some schemes handle renewals automatically and some do not, and the answer depends on how the renewal was documented.',
        section: 'Section 215B',
      })
    } else if (reDays !== null && reDays > PROTECT_DAYS) {
      issues.push({
        id: 'renewal_late',
        severity: 'breach',
        title: `Re-protected ${reDays} days after renewal`,
        detail: 'The renewal restarts the clock where the deposit is treated as received again.',
        action: 'Worth taking advice on whether your renewal documentation created a new tenancy, because that decides whether this applies.',
        section: 'Section 215B',
      })
    }
    if (rePi !== null && rePi > PROTECT_DAYS) {
      issues.push({
        id: 'renewal_pi_late',
        severity: 'breach',
        title: `Prescribed information re-served ${rePi} days after renewal`,
        detail: 'Where the deposit is treated as received again, the information has to be served again inside the window.',
        action: 'Same as above, and the same caveat about how the renewal was documented.',
        section: 'Section 215B',
      })
    }
  }

  // ---- the cap ----
  if (deposit > 0 && annualRent > 0) {
    const weeks = annualRent >= HIGH_RENT_THRESHOLD ? CAP_WEEKS_HIGH_RENT : CAP_WEEKS_STANDARD
    const cap = (annualRent / 52) * weeks
    if (deposit > cap + 1) {
      issues.push({
        id: 'over_cap',
        severity: 'breach',
        title: `The deposit is ${money(deposit - cap)} over the cap`,
        detail: `With annual rent of ${money(annualRent)} the cap is ${weeks} weeks, so ${money(cap)}. Anything above that is a prohibited payment under the Tenant Fees Act 2019, separately from the deposit protection rules.`,
        action: 'The excess has to be returned. A prohibited payment also blocks a possession notice until it is repaid.',
        section: 'Tenant Fees Act 2019',
      })
    }
  }

  // ---- how long a claim stays live ----
  const base = parse(t.ended) || parse(t.tenancyStart) || parse(t.received)
  const claimExpires = base ? addYears(base, CLAIM_WINDOW_YEARS) : null
  const claimLive = claimExpires ? claimExpires > today : false

  // ---- exposure ----
  const hasBreaches = issues.some(i => i.severity === 'breach')
  const exposureLow = hasBreaches && claimLive ? deposit : 0
  const exposureHigh = hasBreaches && claimLive ? deposit * 3 : 0

  if (!issues.length) {
    issues.push({
      id: 'clear',
      severity: 'clear',
      title: 'Nothing flagged on what you have entered',
      detail: 'Protected inside the window, prescribed information served inside the window, deposit within the cap.',
      action: 'Keep the scheme certificate and proof of service somewhere you can find it in six years, because that is how long a claim can be brought.',
      section: '',
    })
  }

  issues.sort((a, b) => SEV_ORDER.indexOf(a.severity) - SEV_ORDER.indexOf(b.severity))

  return {
    tenancy: t, deposit, issues,
    daysToProtect, daysToPi,
    exposureLow, exposureHigh,
    claimExpires, claimLive,
    worst: issues[0].severity,
  }
}

/** Deadline for a live tenancy that has not been protected yet. */
export function deadlineFor(received: string): { due: Date | null; daysLeft: number | null } {
  const r = parse(received)
  if (!r) return { due: null, daysLeft: null }
  const due = new Date(r)
  due.setDate(due.getDate() + PROTECT_DAYS)
  const daysLeft = Math.round((due.getTime() - Date.now()) / 86400000)
  return { due, daysLeft }
}
