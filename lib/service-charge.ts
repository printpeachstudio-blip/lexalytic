/**
 * Service charge and Section 20 rules, England and Wales.
 *
 * Almost all of this sits in the Landlord and Tenant Act 1985 as amended.
 * The useful thing about it is how much is a hard rule rather than a
 * judgement: thresholds, notice periods and deadlines that either were or
 * were not met.
 *
 * LAST REVIEWED: 11 September 2026
 */

export const QUALIFYING_WORKS_CAP = 250      // per leaseholder, s20
export const QLTA_CAP = 100                  // per leaseholder per year, s20
export const DEMAND_DEADLINE_MONTHS = 18     // s20B

export interface Stage {
  id: string
  label: string
  statutory: string
  days: number
  what: string
  commonFailure: string
}

/** The three stages of consultation for qualifying works. */
export const STAGES: Stage[] = [
  {
    id: 'intention',
    label: 'Notice of Intention',
    statutory: 'Stage one',
    days: 30,
    what: 'Describes the works, says why they are needed, and invites your observations. You get at least 30 days to respond, and you can nominate a contractor you would like invited to tender.',
    commonFailure: 'Sent to the wrong address, or the 30 days counted from the date on the letter rather than from when it was actually served.',
  },
  {
    id: 'estimates',
    label: 'Statement of Estimates',
    statutory: 'Stage two',
    days: 30,
    what: 'Sets out at least two estimates, one of which must be from someone unconnected to the landlord. It must summarise the observations received at stage one and the landlord\u2019s response to them. You get another 30 days.',
    commonFailure: 'Observations from stage one are ignored entirely rather than summarised and answered. Both estimates come from connected contractors.',
  },
  {
    id: 'award',
    label: 'Notice of Award',
    statutory: 'Stage three',
    days: 0,
    what: 'Says who was chosen and why, within 21 days of the contract being entered into. Not required if the chosen contractor was the cheapest or was one you nominated.',
    commonFailure: 'Simply not sent, on the assumption that nobody will notice.',
  },
]

export interface Ground {
  id: string
  label: string
  section: string
  question: string
  detail: string
  strength: 'strong' | 'moderate' | 'context'
}

/**
 * Grounds on which a service charge can be challenged. Separated by how
 * hard the rule is: a missed deadline is a fact, reasonableness is an
 * argument.
 */
export const GROUNDS: Ground[] = [
  {
    id: 'no_consultation',
    label: 'They did not consult at all',
    section: 'Section 20',
    strength: 'strong',
    question: 'Did you receive a Notice of Intention before the works started?',
    detail: 'Where qualifying works will cost any leaseholder more than £250, consultation is not optional. If it did not happen and the tribunal does not grant dispensation, recovery is capped at £250 from each leaseholder regardless of what the work actually cost. On a £20,000 bill that is the whole argument in one question.',
  },
  {
    id: 'short_notice',
    label: 'The notice period was too short',
    section: 'Section 20',
    strength: 'strong',
    question: 'Did you get a full 30 days to respond at each stage?',
    detail: 'Thirty days from service, not from the date printed on the letter. Posting adds days. A consultation that ran 21 days because somebody counted wrong is defective in the same way as one that never happened.',
  },
  {
    id: 'ignored_observations',
    label: 'Your observations were ignored',
    section: 'Section 20',
    strength: 'strong',
    question: 'Did you make observations at stage one, and were they summarised and answered at stage two?',
    detail: 'The landlord must have regard to observations and set out their response. Receiving them and filing them is not compliance. This is one of the commonest defects and one of the easiest to evidence, because you have your own letter.',
  },
  {
    id: 'estimates',
    label: 'The estimates were not proper estimates',
    section: 'Section 20',
    strength: 'strong',
    question: 'Were there at least two estimates, with one from a contractor unconnected to the landlord?',
    detail: 'Two quotes from companies in the same group is not two estimates. Nor is one estimate and a note saying nobody else would price it.',
  },
  {
    id: 'eighteen_months',
    label: 'They demanded it too late',
    section: 'Section 20B',
    strength: 'strong',
    question: 'Were the costs incurred more than 18 months before you received the demand?',
    detail: 'This is the one almost nobody knows. If costs were incurred more than 18 months before the demand arrives, they are not recoverable, unless within that 18 months you were notified in writing that the costs had been incurred and would be demanded. A bill for work done two years ago, with nothing in between, is frequently unrecoverable in full.',
  },
  {
    id: 'no_summary',
    label: 'The demand came without the summary of rights',
    section: 'Section 21B',
    strength: 'moderate',
    question: 'Did the demand include a summary of your rights and obligations?',
    detail: 'Every service charge demand must be accompanied by it. Without it you may withhold payment until it is provided, and no late payment consequence applies in the meantime. It does not make the charge go away, but it moves the timetable and it is a straightforward thing to check.',
  },
  {
    id: 'not_in_lease',
    label: 'The lease does not allow it',
    section: 'The lease itself',
    strength: 'strong',
    question: 'Does your lease actually permit a charge for this item?',
    detail: 'A landlord cannot recover something the lease does not provide for, however reasonable it might be. Improvements dressed up as repairs are the classic example. Read the service charge clause rather than assuming, because leases differ considerably even within the same block.',
  },
  {
    id: 'unreasonable',
    label: 'The amount is unreasonable',
    section: 'Section 19',
    strength: 'moderate',
    question: 'Is the cost out of line with what the work should cost?',
    detail: 'Costs must be reasonably incurred and the work of a reasonable standard. This is an argument rather than a fact, so it needs evidence: your own quotes for comparable work, photographs, a surveyor if the sums justify one. Harder than a procedural failure but it is what the tribunal exists to decide.',
  },
  {
    id: 'standard',
    label: 'The work was done badly',
    section: 'Section 19',
    strength: 'moderate',
    question: 'Was the work of a reasonable standard?',
    detail: 'A separate ground from the price. Work that was overpriced and work that was botched are two different challenges and you can run both. Photograph everything, dated.',
  },
]

export interface Right {
  id: string
  label: string
  section: string
  detail: string
}

/** Things a leaseholder can demand, which most do not know they can. */
export const RIGHTS: Right[] = [
  {
    id: 's21',
    label: 'A written summary of costs',
    section: 'Section 21',
    detail: 'You can require a written summary of the costs behind the service charge for the last accounting period. It must be provided within one month of the request or six months of the end of the period, whichever is later. Failing to provide it without reasonable excuse is a criminal offence, which is worth saying plainly in the request.',
  },
  {
    id: 's22',
    label: 'To inspect the invoices',
    section: 'Section 22',
    detail: 'Within six months of getting the summary you can require facilities to inspect the actual receipts and invoices, and to take copies. This is where inflated or duplicated charges tend to become visible.',
  },
  {
    id: 's27a',
    label: 'To have the tribunal decide',
    section: 'Section 27A',
    detail: 'Any leaseholder can apply to the First-tier Tribunal for a determination of whether a charge is payable and how much. You do not need a solicitor and the fees are modest. A clause in your lease purporting to remove this right is void, so it does not matter what the lease says about it.',
  },
  {
    id: 's20c',
    label: 'To stop them charging you for their lawyers',
    section: 'Section 20C',
    detail: 'Ask for this in any tribunal application, always. Without a section 20C order the freeholder can add their legal costs of defending your challenge to next year\u2019s service charge, which means winning still costs you money. It is one line in the application and leaving it out is the commonest own goal.',
  },
  {
    id: 'rtm',
    label: 'To take over the management',
    section: 'Right to Manage',
    detail: 'If the problem is the managing agent rather than one bill, leaseholders can take over management of the block collectively without having to prove fault. It is a bigger undertaking than a single challenge but it is the answer to a pattern rather than an incident.',
  },
]

export function money(n: number): string {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

/** Months between two dates, for the 18 month check. */
export function monthsBetween(fromIso: string, toIso: string): number | null {
  if (!fromIso || !toIso) return null
  const a = new Date(fromIso + 'T00:00:00')
  const b = new Date(toIso + 'T00:00:00')
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return null
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

/** Days between two dates, for the notice period checks. */
export function daysBetween(fromIso: string, toIso: string): number | null {
  if (!fromIso || !toIso) return null
  const a = new Date(fromIso + 'T00:00:00')
  const b = new Date(toIso + 'T00:00:00')
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return null
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}
