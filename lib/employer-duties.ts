/**
 * Employer duties that recur, and the ones people forget.
 *
 * Each of these has a published deadline. None of them is difficult. The
 * problem is that several recur on cycles long enough to fall out of memory,
 * and the penalty for missing them is real.
 *
 * Nothing here decides anything about a particular employer's position. It
 * takes dates they enter and works out when the next one falls due.
 *
 * LAST REVIEWED: 12 September 2026
 */

export type Cadence = 'annual' | 'triennial' | 'once' | 'ongoing'
export type Weight = 'penalty' | 'duty' | 'good'

export interface Duty {
  key: string
  label: string
  cadence: Cadence
  /** Fixed date in the tax year, as month and day, where there is one. */
  fixed?: { month: number; day: number }
  /** Months after the anchor date, for cycles that run from your own date. */
  monthsFromAnchor?: number
  anchor?: 'duties_start' | 'last_reenrolment' | 'holiday_year' | 'company'
  weight: Weight
  what: string
  missed: string
  note?: string
  /** Only shown where the employer says it applies to them. */
  conditional?: string
}

export const DUTIES: Duty[] = [
  {
    key: 'reenrolment',
    label: 'Pension re-enrolment',
    cadence: 'triennial',
    monthsFromAnchor: 36,
    anchor: 'duties_start',
    weight: 'penalty',
    what: 'Put eligible staff who opted out back into the workplace pension. You choose a date inside a six month window, three months either side of the third anniversary. Postponement cannot be used for re-enrolment.',
    missed: 'The Pensions Regulator can issue a fixed penalty of £400, then escalating daily penalties which start at £50 a day for the smallest employers and rise with headcount.',
    note: 'This is the duty small employers miss most often, because three years is long enough to forget it exists. Staff can opt out again immediately, but you have to put them back in first.',
  },
  {
    key: 'redeclaration',
    label: 'Re-declaration of compliance',
    cadence: 'triennial',
    monthsFromAnchor: 41,
    anchor: 'duties_start',
    weight: 'penalty',
    what: 'Tell the Pensions Regulator you have done it. Due within five months of the third anniversary of your duties start date, not of the re-enrolment date you chose.',
    missed: 'A separate penalty from the re-enrolment itself, on the same £400 then daily basis.',
    note: 'Due even where you had nobody to re-enrol. Employers who correctly worked out they had no one to put back in still get fined for not saying so.',
  },
  {
    key: 'p60',
    label: 'P60 to every employee',
    cadence: 'annual',
    fixed: { month: 5, day: 31 },
    weight: 'penalty',
    what: 'Everyone employed on 5 April gets a P60 by 31 May. Paper or electronic, both are fine.',
    missed: 'A penalty can be charged, and in practice it is the employee chasing it that causes the problem, usually when they need it for a mortgage.',
  },
  {
    key: 'p11d',
    label: 'P11D and P11D(b)',
    cadence: 'annual',
    fixed: { month: 7, day: 6 },
    weight: 'penalty',
    what: 'Report expenses and benefits provided in the tax year just ended. Only needed where you provided benefits that were not payrolled.',
    missed: 'Penalties run at £100 per 50 employees for each month late.',
    conditional: 'benefits',
  },
  {
    key: 'class1a',
    label: 'Class 1A National Insurance paid',
    cadence: 'annual',
    fixed: { month: 7, day: 22 },
    weight: 'penalty',
    what: 'Employer National Insurance on the benefits reported on the P11D(b). The 22nd where you pay electronically, the 19th otherwise.',
    missed: 'Interest from the due date, and a late payment penalty.',
    conditional: 'benefits',
  },
  {
    key: 'holiday_year',
    label: 'Holiday year resets',
    cadence: 'annual',
    monthsFromAnchor: 12,
    anchor: 'holiday_year',
    weight: 'duty',
    what: 'Untaken statutory holiday generally cannot be carried over or paid in lieu except on termination. Staff who have not taken it need to be told before the year ends, not after.',
    missed: 'Not a penalty, but a claim. Workers prevented from taking leave can carry it over, and unresolved holiday pay arrears are a common tribunal claim.',
    note: 'For irregular hours and part year workers, holiday accrues at 12.07 per cent of hours worked, which is a different calculation from the one most payroll runs by default.',
  },
  {
    key: 'written_statement',
    label: 'Written statement of particulars',
    cadence: 'ongoing',
    weight: 'duty',
    what: 'Every employee and worker gets one on or before their first day. Not within two months, which was the old rule, and not once probation ends.',
    missed: 'Where a worker brings another successful claim, the tribunal can award two or four weeks pay on top for the missing statement.',
    note: 'This changed in April 2020 and a lot of template contracts and onboarding checklists still say two months.',
  },
  {
    key: 'el_insurance',
    label: 'Employers liability insurance',
    cadence: 'annual',
    monthsFromAnchor: 12,
    anchor: 'company',
    weight: 'penalty',
    what: 'Cover of at least five million pounds, from an authorised insurer. The certificate must be accessible to employees.',
    missed: 'Up to £2,500 for each day without cover, and £1,000 for refusing to make the certificate available.',
    note: 'Certificates must be kept even after they expire, because claims for conditions with a long latency can arrive decades later.',
  },
  {
    key: 'gender_pay',
    label: 'Gender pay gap report',
    cadence: 'annual',
    fixed: { month: 4, day: 4 },
    weight: 'penalty',
    what: 'Private and voluntary sector employers with 250 or more staff on the snapshot date of 5 April report by the following 4 April.',
    missed: 'Enforcement by the Equality and Human Rights Commission, and the report list is public so absence is visible.',
    conditional: 'large',
  },
]

export interface EmployerInput {
  dutiesStart: string        // auto enrolment duties start or staging date
  lastReenrolment: string    // if they have already done one
  holidayYearStart: string   // e.g. 2026-01-01 or 2026-04-06
  elRenewal: string          // employers liability renewal date
  headcount: string
  providesBenefits: boolean
  payrollsBenefits: boolean
}

export interface DueItem {
  duty: Duty
  due: Date | null
  daysAway: number | null
  windowOpens?: Date | null
  windowCloses?: Date | null
  status: 'overdue' | 'now' | 'soon' | 'later' | 'unknown' | 'na'
  because: string
}

function parse(d: string): Date | null {
  if (!d) return null
  const x = new Date(d + 'T00:00:00')
  return isNaN(x.getTime()) ? null : x
}

function addMonths(d: Date, n: number): Date {
  const x = new Date(d)
  x.setMonth(x.getMonth() + n)
  return x
}

/** The next occurrence of a fixed month and day, from today. */
function nextFixed(month: number, day: number, from: Date): Date {
  const y = from.getFullYear()
  let d = new Date(y, month - 1, day)
  if (d < from) d = new Date(y + 1, month - 1, day)
  return d
}

export function statusFor(days: number | null): DueItem['status'] {
  if (days === null) return 'unknown'
  if (days < 0) return 'overdue'
  if (days <= 30) return 'now'
  if (days <= 90) return 'soon'
  return 'later'
}

export function assess(input: EmployerInput, today = new Date()): DueItem[] {
  const head = parseInt(input.headcount, 10) || 0
  const out: DueItem[] = []

  for (const duty of DUTIES) {
    // does it apply
    if (duty.conditional === 'benefits' && !input.providesBenefits) {
      out.push({ duty, due: null, daysAway: null, status: 'na',
        because: input.payrollsBenefits
          ? 'You payroll benefits, so no P11D is needed for those.'
          : 'You said you do not provide benefits in kind.' })
      continue
    }
    if (duty.conditional === 'large' && head < 250) {
      out.push({ duty, due: null, daysAway: null, status: 'na',
        because: `Applies at 250 or more staff. You have ${head || 'fewer'}.` })
      continue
    }

    let due: Date | null = null
    let windowOpens: Date | null = null
    let windowCloses: Date | null = null
    let because = ''

    if (duty.fixed) {
      due = nextFixed(duty.fixed.month, duty.fixed.day, today)
      because = 'Fixed date every year.'
    } else if (duty.anchor === 'duties_start' && duty.monthsFromAnchor) {
      // run forward from the later of duties start and last re-enrolment
      const base = parse(input.lastReenrolment) || parse(input.dutiesStart)
      if (base) {
        const months = parse(input.lastReenrolment) ? duty.monthsFromAnchor : duty.monthsFromAnchor
        let next = addMonths(base, months)
        // roll forward in three year steps until it is in the future
        while (next < today) next = addMonths(next, 36)
        due = next
        if (duty.key === 'reenrolment') {
          windowOpens = addMonths(next, -3)
          windowCloses = addMonths(next, 3)
          because = parse(input.lastReenrolment)
            ? 'Three years from your last re-enrolment date.'
            : 'Three years from your duties start date.'
        } else {
          because = 'Five months after the three year anniversary.'
        }
      } else {
        because = 'Enter your auto enrolment duties start date.'
      }
    } else if (duty.anchor === 'holiday_year') {
      const base = parse(input.holidayYearStart)
      if (base) {
        let next = new Date(base)
        while (next <= today) next = addMonths(next, 12)
        due = next
        because = 'Your holiday year end.'
      } else {
        because = 'Enter the date your holiday year starts.'
      }
    } else if (duty.anchor === 'company') {
      const base = parse(input.elRenewal)
      if (base) {
        let next = new Date(base)
        while (next < today) next = addMonths(next, 12)
        due = next
        because = 'Your policy renewal date.'
      } else {
        because = 'Enter your employers liability renewal date.'
      }
    } else {
      because = 'Applies to every new starter, on or before their first day.'
    }

    const daysAway = due
      ? Math.round((due.getTime() - today.getTime()) / 86400000)
      : null

    out.push({
      duty, due, daysAway, windowOpens, windowCloses,
      status: duty.cadence === 'ongoing' ? 'unknown' : statusFor(daysAway),
      because,
    })
  }

  const order: DueItem['status'][] = ['overdue', 'now', 'soon', 'later', 'unknown', 'na']
  out.sort((a, b) => {
    const d = order.indexOf(a.status) - order.indexOf(b.status)
    if (d !== 0) return d
    return (a.daysAway ?? 9e9) - (b.daysAway ?? 9e9)
  })
  return out
}

export function fmt(d: Date | null): string {
  return d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
}

/** An ics file so the dates live somewhere that will actually remind them. */
export function toIcs(items: DueItem[]): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const stamp = (d: Date) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Lexalytic//Employer duties//EN', 'CALSCALE:GREGORIAN',
  ]
  items.filter(i => i.due).forEach((i, n) => {
    const d = i.due!
    const end = new Date(d); end.setDate(end.getDate() + 1)
    lines.push('BEGIN:VEVENT')
    lines.push(`UID:lexalytic-emp-${i.duty.key}-${stamp(d)}-${n}@lexalytic.com`)
    lines.push(`DTSTAMP:${stamp(new Date())}T000000Z`)
    lines.push(`DTSTART;VALUE=DATE:${stamp(d)}`)
    lines.push(`DTEND;VALUE=DATE:${stamp(end)}`)
    lines.push(`SUMMARY:${i.duty.label}`)
    lines.push(`DESCRIPTION:${i.duty.what.replace(/[,;]/g, '\\$&')}`)
    // a reminder a month out, because these are not same day jobs
    lines.push('BEGIN:VALARM', 'TRIGGER:-P30D', 'ACTION:DISPLAY',
      `DESCRIPTION:${i.duty.label} due in 30 days`, 'END:VALARM')
    lines.push('END:VEVENT')
  })
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
