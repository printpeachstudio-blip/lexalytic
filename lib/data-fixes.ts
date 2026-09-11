/**
 * Fixing the problems the health check finds.
 *
 * Split deliberately into what can be corrected mechanically and what
 * cannot. A postcode with the space in the wrong place has one right
 * answer. An invalid postcode does not, and guessing at it would be
 * worse than leaving it alone.
 */

export type FixId =
  | 'trim'
  | 'blank_rows'
  | 'company_zeros'
  | 'postcode_format'
  | 'phone_format'
  | 'date_format'
  | 'case_names'
  | 'vat_format'
  | 'email_lower'

export interface FixDef {
  id: FixId
  label: string
  detail: string
  /** Safe means there is exactly one correct answer. */
  safe: boolean
}

export const FIXES: FixDef[] = [
  { id: 'company_zeros', safe: true,
    label: 'Restore leading zeros on company numbers',
    detail: 'A UK company number is eight characters. Excel strips the leading zero because 01234567 looks like a number to it. Padding it back is unambiguous.' },
  { id: 'trim', safe: true,
    label: 'Remove stray spaces',
    detail: 'Leading, trailing and repeated spaces inside a value. The commonest cause of a failed lookup, because " Smith Ltd" does not match "Smith Ltd".' },
  { id: 'blank_rows', safe: true,
    label: 'Remove blank rows',
    detail: 'Rows where every column is empty. Usually an artefact of how the file was exported.' },
  { id: 'postcode_format', safe: true,
    label: 'Normalise postcode spacing',
    detail: 'UK postcodes have one space before the last three characters. SW1A1AA becomes SW1A 1AA. Only applied where the postcode is otherwise valid.' },
  { id: 'email_lower', safe: true,
    label: 'Lowercase email addresses',
    detail: 'The local part of an address is technically case sensitive but no mainstream provider treats it that way, and mixed case causes duplicate records.' },
  { id: 'phone_format', safe: true,
    label: 'Normalise UK phone numbers',
    detail: 'Converts +44 and 0044 prefixes to a leading zero and removes spaces, brackets and dashes, so the same number is stored one way.' },
  { id: 'date_format', safe: false,
    label: 'Normalise dates to one format',
    detail: 'Where a column mixes formats this converts everything to YYYY-MM-DD. Not safe where the format is genuinely ambiguous, because 03/04 could be either. Anything ambiguous is left and flagged.' },
  { id: 'case_names', safe: false,
    label: 'Fix capitalisation on names',
    detail: 'Converts SHOUTING and all lowercase to title case. Not safe because it will get McDonald, O\u2019Brien and ACME Ltd wrong some of the time.' },
  { id: 'vat_format', safe: true,
    label: 'Standardise VAT number format',
    detail: 'Strips the GB prefix and spacing so every number is stored as nine digits. Does not touch numbers that fail the checksum, because those need a human.' },
]

export interface FixResult {
  rows: Record<string, string>[]
  applied: Record<FixId, number>
  unfixable: { reason: string; count: number }[]
}

// ---------------------------------------------------------------
// The individual corrections
// ---------------------------------------------------------------

const POSTCODE = /^([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})$/i
const COMPANY_NUM = /^([A-Z]{2})?(\d{1,8})$/i

function looksLikeHeader(header: string, ...words: string[]): boolean {
  const h = header.toLowerCase().replace(/[^a-z]/g, '')
  return words.some(w => h.includes(w))
}

function fixCompanyNumber(v: string): string {
  const t = v.trim().toUpperCase()
  const m = t.match(COMPANY_NUM)
  if (!m) return v
  const prefix = m[1] || ''
  const digits = m[2]
  if (prefix) {
    // SC, NI and so on take six digits after the prefix
    return prefix + digits.padStart(6, '0')
  }
  return digits.padStart(8, '0')
}

function fixPostcode(v: string): string {
  const t = v.trim().toUpperCase()
  const m = t.match(POSTCODE)
  if (!m) return v
  return `${m[1]} ${m[2]}`
}

function fixPhone(v: string): string {
  let t = v.trim().replace(/[\s()\-.]/g, '')
  if (!t) return v
  if (t.startsWith('+44')) t = '0' + t.slice(3)
  else if (t.startsWith('0044')) t = '0' + t.slice(4)
  else if (t.startsWith('44') && t.length >= 12) t = '0' + t.slice(2)
  // Only accept something that now looks like a UK number
  return /^0\d{9,10}$/.test(t) ? t : v
}

function fixVat(v: string): string {
  const t = v.trim().toUpperCase().replace(/[\s.\-]/g, '')
  const m = t.match(/^(GB)?(\d{9})(\d{3})?$/)
  if (!m) return v
  return m[2] + (m[3] || '')
}

function titleCase(v: string): string {
  const t = v.trim()
  if (!t) return v
  // Leave anything with deliberate internal capitals alone
  if (/[a-z][A-Z]/.test(t)) return v
  const allCaps = t === t.toUpperCase() && /[A-Z]{3,}/.test(t)
  const allLower = t === t.toLowerCase() && /[a-z]{3,}/.test(t)
  if (!allCaps && !allLower) return v
  return t.toLowerCase().replace(/\b([a-z])/g, (_, c) => c.toUpperCase())
}

/** Work out which date format a column is using, if it is consistent. */
function detectDateFormat(values: string[]): 'dmy' | 'mdy' | 'ymd' | 'ambiguous' | null {
  let dmyOnly = 0, mdyOnly = 0, ymd = 0, either = 0, total = 0
  for (const v of values) {
    const t = v.trim()
    if (!t) continue
    if (/^\d{4}-\d{2}-\d{2}/.test(t)) { ymd++; total++; continue }
    const m = t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/)
    if (!m) continue
    total++
    const a = parseInt(m[1], 10), b = parseInt(m[2], 10)
    if (a > 12 && b <= 12) dmyOnly++
    else if (b > 12 && a <= 12) mdyOnly++
    else either++
  }
  if (!total) return null
  if (ymd === total) return 'ymd'
  if (dmyOnly > 0 && mdyOnly === 0) return 'dmy'
  if (mdyOnly > 0 && dmyOnly === 0) return 'mdy'
  if (either === total) return 'ambiguous'   // every value works either way
  return 'ambiguous'
}

function toIso(v: string, fmt: 'dmy' | 'mdy' | 'ymd'): string {
  const t = v.trim()
  if (!t) return v
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t
  const m = t.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/)
  if (!m) return v
  let [, p1, p2, y] = m
  if (y.length === 2) y = (parseInt(y, 10) > 50 ? '19' : '20') + y
  const day = fmt === 'mdy' ? p2 : p1
  const month = fmt === 'mdy' ? p1 : p2
  const d = parseInt(day, 10), mo = parseInt(month, 10)
  if (d < 1 || d > 31 || mo < 1 || mo > 12) return v
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// ---------------------------------------------------------------
// Applying a set of fixes across the whole file
// ---------------------------------------------------------------

export function applyFixes(
  rows: Record<string, string>[],
  headers: string[],
  selected: Set<FixId>
): FixResult {
  const applied: Record<string, number> = {}
  const unfixable: { reason: string; count: number }[] = []
  const bump = (k: string) => { applied[k] = (applied[k] || 0) + 1 }

  let out = rows.map(r => ({ ...r }))

  // Blank rows first, so later counts are not inflated by them
  if (selected.has('blank_rows')) {
    const before = out.length
    out = out.filter(r => headers.some(h => String(r[h] ?? '').trim() !== ''))
    const removed = before - out.length
    if (removed) applied['blank_rows'] = removed
  }

  // Work out date formats once per column
  const dateFormats: Record<string, ReturnType<typeof detectDateFormat>> = {}
  if (selected.has('date_format')) {
    headers.forEach(h => {
      if (!looksLikeHeader(h, 'date', 'dob', 'birth', 'created', 'expiry', 'due', 'start', 'end')) return
      dateFormats[h] = detectDateFormat(out.map(r => String(r[h] ?? '')))
    })
    const ambiguous = Object.entries(dateFormats).filter(([, f]) => f === 'ambiguous')
    ambiguous.forEach(([h]) => {
      unfixable.push({
        reason: `Dates in "${h}" could be day first or month first and there is no way to tell. Left as they are.`,
        count: out.length,
      })
    })
  }

  out = out.map(row => {
    const next = { ...row }
    headers.forEach(h => {
      let v = String(next[h] ?? '')
      if (v === '') return
      const original = v

      if (selected.has('trim')) {
        const t = v.replace(/\s+/g, ' ').trim()
        if (t !== v) { v = t; bump('trim') }
      }

      if (selected.has('company_zeros') &&
          looksLikeHeader(h, 'company', 'companieshouse', 'crn', 'registration')) {
        const t = fixCompanyNumber(v)
        if (t !== v) { v = t; bump('company_zeros') }
      }

      if (selected.has('postcode_format') && looksLikeHeader(h, 'postcode', 'postal', 'zip')) {
        const t = fixPostcode(v)
        if (t !== v) { v = t; bump('postcode_format') }
      }

      if (selected.has('email_lower') && looksLikeHeader(h, 'email', 'mail')) {
        const t = v.trim().toLowerCase()
        if (t !== v) { v = t; bump('email_lower') }
      }

      if (selected.has('phone_format') &&
          looksLikeHeader(h, 'phone', 'tel', 'mobile', 'contactnumber')) {
        const t = fixPhone(v)
        if (t !== v) { v = t; bump('phone_format') }
      }

      if (selected.has('vat_format') && looksLikeHeader(h, 'vat')) {
        const t = fixVat(v)
        if (t !== v) { v = t; bump('vat_format') }
      }

      if (selected.has('date_format')) {
        const fmt = dateFormats[h]
        if (fmt && fmt !== 'ambiguous') {
          const t = toIso(v, fmt)
          if (t !== v) { v = t; bump('date_format') }
        }
      }

      if (selected.has('case_names') &&
          looksLikeHeader(h, 'name', 'company', 'contact', 'town', 'city', 'county')) {
        const t = titleCase(v)
        if (t !== v) { v = t; bump('case_names') }
      }

      if (v !== original) next[h] = v
    })
    return next
  })

  return { rows: out, applied: applied as Record<FixId, number>, unfixable }
}

/** Turn the cleaned rows back into a CSV string. */
export function toCsv(rows: Record<string, string>[], headers: string[]): string {
  const esc = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v)
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
  }
  const lines = [headers.map(esc).join(',')]
  rows.forEach(r => lines.push(headers.map(h => esc(r[h])).join(',')))
  return lines.join('\r\n')
}

/** Pull company numbers out of a file, for the Companies House lookup. */
export function extractCompanyNumbers(
  rows: Record<string, string>[], headers: string[]
): { column: string; numbers: string[] } | null {
  const col = headers.find(h =>
    looksLikeHeader(h, 'company', 'companieshouse', 'crn', 'registration'))
  if (!col) return null

  const seen = new Set<string>()
  rows.forEach(r => {
    const v = fixCompanyNumber(String(r[col] ?? ''))
    if (/^([A-Z]{2}\d{6}|\d{8})$/i.test(v)) seen.add(v.toUpperCase())
  })

  return seen.size ? { column: col, numbers: Array.from(seen) } : null
}
