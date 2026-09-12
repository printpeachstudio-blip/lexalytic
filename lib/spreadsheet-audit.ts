/**
 * Spreadsheet audit.
 *
 * Reads the formulas rather than the values, which is the only way to find
 * most of what goes wrong. A spreadsheet that shows the right numbers today
 * can still be broken in ways that surface when somebody adds a row.
 *
 * Everything here runs in the browser on a file the user picked. Nothing is
 * uploaded, which matters because a business spreadsheet is usually the last
 * thing anybody wants to email.
 */

export type Severity = 'critical' | 'major' | 'minor'

export interface Finding {
  id: string
  severity: Severity
  group: string
  title: string
  detail: string
  advice: string
  cells: string[]
  sheet: string
  count: number
}

export interface CellInfo {
  ref: string          // A1
  sheet: string
  formula?: string
  value?: unknown
  type?: string
  /** Cells this one reads from. */
  reads: string[]
  /** Cells that read from this one. */
  feeds: string[]
}

export interface SheetInfo {
  name: string
  rows: number
  cols: number
  formulaCount: number
  valueCount: number
  blankCount: number
}

export interface AuditResult {
  findings: Finding[]
  sheets: SheetInfo[]
  cells: Map<string, CellInfo>
  score: number
  totals: {
    sheets: number
    cells: number
    formulas: number
    uniqueFormulaShapes: number
    externalLinks: number
  }
}

// ---------------------------------------------------------------
// Formula parsing
// ---------------------------------------------------------------

/** A1 style references, with or without dollars, optionally a range. */
const REF_RE = /(?:'([^']+)'|([A-Za-z0-9_]+))?!?\$?([A-Z]{1,3})\$?(\d{1,7})(?::\$?([A-Z]{1,3})\$?(\d{1,7}))?/g

/** Functions whose result changes without the inputs changing. */
const VOLATILE = ['NOW', 'TODAY', 'RAND', 'RANDBETWEEN', 'OFFSET', 'INDIRECT', 'CELL', 'INFO']

/** Error values Excel puts in a cell when something is wrong. */
const ERROR_VALUES = ['#REF!', '#N/A', '#VALUE!', '#DIV/0!', '#NAME?', '#NULL!', '#NUM!', '#SPILL!', '#CALC!']

export function colToNum(col: string): number {
  let n = 0
  for (const ch of col.toUpperCase()) n = n * 26 + (ch.charCodeAt(0) - 64)
  return n
}

export function numToCol(n: number): string {
  let s = ''
  while (n > 0) {
    const r = (n - 1) % 26
    s = String.fromCharCode(65 + r) + s
    n = Math.floor((n - 1) / 26)
  }
  return s
}

/** Pull the cell references out of a formula. */
export function refsIn(formula: string, currentSheet: string): string[] {
  if (!formula) return []
  // strip string literals so text containing A1 does not count
  const clean = formula.replace(/"[^"]*"/g, '""')
  const out = new Set<string>()
  let m: RegExpExecArray | null
  REF_RE.lastIndex = 0
  while ((m = REF_RE.exec(clean)) !== null) {
    const sheet = m[1] || m[2] || currentSheet
    const c1 = m[3], r1 = m[4], c2 = m[5], r2 = m[6]
    if (!c2) {
      out.add(`${sheet}!${c1}${r1}`)
    } else {
      // expand a range, but cap it so a whole column reference does not
      // produce a million entries
      const ca = colToNum(c1), cb = colToNum(c2)
      const ra = parseInt(r1, 10), rb = parseInt(r2, 10)
      const cells = (Math.abs(cb - ca) + 1) * (Math.abs(rb - ra) + 1)
      if (cells > 400) {
        out.add(`${sheet}!${c1}${r1}:${c2}${r2}`)
      } else {
        for (let c = Math.min(ca, cb); c <= Math.max(ca, cb); c++) {
          for (let r = Math.min(ra, rb); r <= Math.max(ra, rb); r++) {
            out.add(`${sheet}!${numToCol(c)}${r}`)
          }
        }
      }
    }
  }
  return Array.from(out)
}

/**
 * The shape of a formula, with references replaced by placeholders.
 * Two cells in a column should have the same shape. Where one does not,
 * somebody has edited a single cell and that is usually a bug.
 */
export function formulaShape(formula: string): string {
  return formula
    .replace(/"[^"]*"/g, '"S"')
    .replace(/(?:'[^']+'|[A-Za-z0-9_]+)?!?\$?[A-Z]{1,3}\$?\d{1,7}/g, 'R')
    .replace(/\d+(\.\d+)?/g, 'N')
    .replace(/\s+/g, '')
    .toUpperCase()
}

/** Numbers written into a formula that probably should be a reference. */
export function hardcodedNumbers(formula: string): string[] {
  const clean = formula
    .replace(/"[^"]*"/g, '""')
    .replace(/(?:'[^']+'|[A-Za-z0-9_]+)?!?\$?[A-Z]{1,3}\$?\d{1,7}/g, '')
  const out: string[] = []
  const re = /(?<![A-Z0-9.])(\d+\.\d+|\d{2,})(?![0-9.])/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(clean)) !== null) {
    const v = m[1]
    // 0, 1, 2, 100 and the like are usually structural rather than a rate
    if (['0', '1', '2', '10', '100', '12', '24', '365', '1000'].includes(v)) continue
    out.push(v)
  }
  return out
}

// ---------------------------------------------------------------
// The audit
// ---------------------------------------------------------------

interface RawCell {
  ref: string
  sheet: string
  formula?: string
  value?: unknown
  type?: string
  text?: string
}

/**
 * Runs the checks. Takes cells already extracted from the workbook, so the
 * parsing library stays out of here and this stays testable.
 */
export function audit(raw: RawCell[], sheets: SheetInfo[]): AuditResult {
  const cells = new Map<string, CellInfo>()
  const findings: Finding[] = []

  // Build the graph
  raw.forEach(c => {
    const key = `${c.sheet}!${c.ref}`
    cells.set(key, {
      ref: c.ref, sheet: c.sheet, formula: c.formula,
      value: c.value, type: c.type, reads: [], feeds: [],
    })
  })

  raw.forEach(c => {
    if (!c.formula) return
    const key = `${c.sheet}!${c.ref}`
    const info = cells.get(key)!
    info.reads = refsIn(c.formula, c.sheet)
    info.reads.forEach(r => {
      const target = cells.get(r)
      if (target) target.feeds.push(key)
    })
  })

  const add = (f: Omit<Finding, 'count'>) => {
    if (!f.cells.length) return
    findings.push({ ...f, count: f.cells.length })
  }

  const byCell = (list: string[]) =>
    list.slice(0, 12).map(k => k.includes('!') ? k.split('!')[1] : k)

  // ---- 1. Error values sitting in the file ----
  const errored = raw.filter(c =>
    typeof c.text === 'string' && ERROR_VALUES.some(e => c.text === e))
  if (errored.length) {
    const byErr = new Map<string, string[]>()
    errored.forEach(c => {
      const arr = byErr.get(c.text as string) || []
      arr.push(`${c.sheet}!${c.ref}`)
      byErr.set(c.text as string, arr)
    })
    byErr.forEach((list, err) => {
      add({
        id: 'err_' + err.replace(/\W/g, ''),
        severity: 'critical',
        group: 'Broken formulas',
        title: `${list.length} cell${list.length === 1 ? '' : 's'} showing ${err}`,
        detail: err === '#REF!'
          ? 'A formula is pointing at something that no longer exists, usually because a row, column or sheet was deleted. Anything downstream of it is wrong too, and the sheet may still look fine at a glance.'
          : err === '#DIV/0!'
          ? 'A division by zero or by an empty cell. Often harmless in a template before data arrives, and a real problem in a live report.'
          : err === '#N/A'
          ? 'A lookup found nothing. Sometimes expected, frequently a sign that two lists have stopped matching each other.'
          : err === '#NAME?'
          ? 'Excel does not recognise something in the formula, commonly a misspelled function or a named range that has gone.'
          : 'A formula could not produce a result.',
        advice: err === '#REF!'
          ? 'Find what was deleted and either restore it or rewrite the formula. Do not just clear the cell, because whatever reads from it will then be silently wrong rather than obviously broken.'
          : 'Wrap it in IFERROR only once you know why it is failing. Hiding an error is not the same as fixing it.',
        cells: byCell(list),
        sheet: errored[0].sheet,
      })
    })
  }

  // ---- 2. Formulas that skip cells in a column ----
  const colGroups = new Map<string, RawCell[]>()
  raw.forEach(c => {
    const col = c.ref.match(/^([A-Z]+)/)?.[1]
    if (!col) return
    const k = `${c.sheet}!${col}`
    const arr = colGroups.get(k) || []
    arr.push(c)
    colGroups.set(k, arr)
  })

  const gaps: string[] = []
  const inconsistent: string[] = []

  colGroups.forEach((list, k) => {
    const withFormula = list.filter(c => c.formula)
    if (withFormula.length < 4) return

    // a column that is mostly formulas but not entirely
    const hasValue = list.filter(c => !c.formula && c.text && String(c.text).trim() !== '')
    if (withFormula.length >= 4 && hasValue.length > 0
        && hasValue.length <= Math.max(2, withFormula.length * 0.25)) {
      // ignore the header row
      hasValue.filter(c => {
        const r = parseInt(c.ref.replace(/[A-Z]/g, ''), 10)
        return r > 1
      }).forEach(c => gaps.push(`${c.sheet}!${c.ref}`))
    }

    // shapes that disagree with the majority
    const shapes = new Map<string, RawCell[]>()
    withFormula.forEach(c => {
      const sh = formulaShape(c.formula!)
      const arr = shapes.get(sh) || []
      arr.push(c)
      shapes.set(sh, arr)
    })
    if (shapes.size > 1) {
      const sorted = Array.from(shapes.entries()).sort((a, b) => b[1].length - a[1].length)
      const majority = sorted[0][1].length
      sorted.slice(1).forEach(([, list2]) => {
        if (list2.length <= Math.max(1, majority * 0.2)) {
          list2.forEach(c => inconsistent.push(`${c.sheet}!${c.ref}`))
        }
      })
    }
  })

  add({
    id: 'gaps',
    severity: 'critical',
    group: 'Broken formulas',
    title: `${gaps.length} cell${gaps.length === 1 ? ' where a formula was overwritten' : 's where formulas were overwritten'}`,
    detail: 'A column of formulas with a typed number in the middle of it. Somebody pasted a value over a calculation, which means that row no longer updates and nobody can tell by looking.',
    advice: 'Check whether the typed value is right and then restore the formula. This is the single commonest way a working spreadsheet starts producing wrong numbers, because the error is invisible.',
    cells: byCell(gaps),
    sheet: '',
  })

  add({
    id: 'inconsistent',
    severity: 'major',
    group: 'Broken formulas',
    title: `${inconsistent.length} formula${inconsistent.length === 1 ? ' that differs from its neighbours' : 's that differ from their neighbours'}`,
    detail: 'A cell whose formula is a different shape from the rest of its column. Sometimes deliberate, usually a hand edit that was never propagated or a drag that went wrong.',
    advice: 'Compare each against the cell above and below. If the difference is intentional, it is worth a comment explaining why, because the next person will assume it is a mistake.',
    cells: byCell(inconsistent),
    sheet: '',
  })

  // ---- 3. Circular references ----
  const circular: string[] = []
  cells.forEach((info, key) => {
    if (info.reads.includes(key)) circular.push(key)
  })
  add({
    id: 'circular',
    severity: 'critical',
    group: 'Broken formulas',
    title: `${circular.length} circular reference${circular.length === 1 ? '' : 's'}`,
    detail: 'A formula that refers to itself, directly or through a chain. Excel either refuses to calculate it or shows zero, and either way the number is not what anybody intended.',
    advice: 'Trace the chain and break it. A circular reference usually means two cells are each trying to be derived from the other, which means one of them should be an input.',
    cells: byCell(circular),
    sheet: '',
  })

  // ---- 4. Hardcoded numbers in formulas ----
  const hardcoded: string[] = []
  const hardcodedExamples: string[] = []
  raw.forEach(c => {
    if (!c.formula) return
    const nums = hardcodedNumbers(c.formula)
    if (nums.length) {
      hardcoded.push(`${c.sheet}!${c.ref}`)
      if (hardcodedExamples.length < 4) {
        hardcodedExamples.push(`${c.ref} contains ${nums.slice(0, 2).join(' and ')}`)
      }
    }
  })
  add({
    id: 'hardcoded',
    severity: 'major',
    group: 'Maintainability',
    title: `${hardcoded.length} formula${hardcoded.length === 1 ? ' with a number typed inside it' : 's with a number typed inside them'}`,
    detail: `A rate, threshold or multiplier written into the formula rather than held in a cell. ${hardcodedExamples.slice(0, 2).join('. ')}. When VAT changes or a margin is revised, somebody has to find every one of these, and they will miss some.`,
    advice: 'Move each number to a labelled cell on an assumptions sheet and point the formulas at it. Then changing it is one edit and the value is visible rather than buried.',
    cells: byCell(hardcoded),
    sheet: '',
  })

  // ---- 5. Numbers stored as text ----
  const asText = raw.filter(c =>
    !c.formula && c.type === 's' && c.text && /^-?[\d,]+(\.\d+)?$/.test(String(c.text).trim()))
  add({
    id: 'text_numbers',
    severity: 'major',
    group: 'Data types',
    title: `${asText.length} number${asText.length === 1 ? '' : 's'} stored as text`,
    detail: 'These look like numbers and behave like words. SUM ignores them, sorting puts 100 before 20, and a lookup against them fails against a genuine number.',
    advice: 'Select the column, use Text to Columns and finish immediately, or multiply by one in a helper column. Check the totals afterwards, because they will change.',
    cells: byCell(asText.map(c => `${c.sheet}!${c.ref}`)),
    sheet: '',
  })

  // ---- 6. External workbook links ----
  const external = raw.filter(c => c.formula && /\[[^\]]+\]/.test(c.formula))
  add({
    id: 'external',
    severity: 'critical',
    group: 'Fragility',
    title: `${external.length} link${external.length === 1 ? '' : 's'} to another workbook`,
    detail: 'A formula reading from a different file. It breaks the moment that file moves, is renamed, or sits on a drive the next person cannot reach, and it usually breaks silently by keeping the last value it saw.',
    advice: 'Either bring the data into this workbook or accept that this file only works on one machine in one folder. External links are the commonest reason a spreadsheet works for the person who built it and nobody else.',
    cells: byCell(external.map(c => `${c.sheet}!${c.ref}`)),
    sheet: '',
  })

  // ---- 7. Volatile functions ----
  const volatile: string[] = []
  raw.forEach(c => {
    if (!c.formula) return
    const up = c.formula.toUpperCase()
    if (VOLATILE.some(v => up.includes(v + '('))) volatile.push(`${c.sheet}!${c.ref}`)
  })
  add({
    id: 'volatile',
    severity: 'minor',
    group: 'Fragility',
    title: `${volatile.length} cell${volatile.length === 1 ? '' : 's'} using a volatile function`,
    detail: 'NOW, TODAY, OFFSET, INDIRECT and RAND recalculate constantly and their result changes without the inputs changing. A report built on TODAY shows something different tomorrow, which makes a saved copy impossible to reconcile.',
    advice: 'For a report that needs to be reproducible, put the date in a cell as a typed value rather than calculating it. INDIRECT and OFFSET are also invisible to Excel dependency tracing, so nobody can follow what they do.',
    cells: byCell(volatile),
    sheet: '',
  })

  // ---- 8. Whole column references ----
  const wholeCol: string[] = []
  raw.forEach(c => {
    if (!c.formula) return
    if (/\$?[A-Z]{1,3}:\$?[A-Z]{1,3}/.test(c.formula)) wholeCol.push(`${c.sheet}!${c.ref}`)
  })
  add({
    id: 'whole_col',
    severity: 'minor',
    group: 'Performance',
    title: `${wholeCol.length} formula${wholeCol.length === 1 ? ' referencing a whole column' : 's referencing a whole column'}`,
    detail: 'A reference like A:A covers a million rows whether or not they hold anything. A few of these are harmless. A few hundred makes a workbook slow to open and slower to edit.',
    advice: 'Use a table or a bounded range instead. If the data grows, an Excel table expands its references automatically without reading empty rows.',
    cells: byCell(wholeCol),
    sheet: '',
  })

  // ---- 9. Very long formulas ----
  const longF = raw.filter(c => c.formula && c.formula.length > 250)
  add({
    id: 'long',
    severity: 'minor',
    group: 'Maintainability',
    title: `${longF.length} formula${longF.length === 1 ? ' over 250 characters' : 's over 250 characters'}`,
    detail: 'Long enough that nobody will read it, including whoever wrote it. These are where errors hide, because checking one takes longer than rebuilding it.',
    advice: 'Break the calculation into steps across helper columns, or into named LET variables. Both are slightly less elegant and considerably easier to trust.',
    cells: byCell(longF.map(c => `${c.sheet}!${c.ref}`)),
    sheet: '',
  })

  // ---- 10. Deeply nested IFs ----
  const nested: string[] = []
  raw.forEach(c => {
    if (!c.formula) return
    const count = (c.formula.toUpperCase().match(/\bIF\(/g) || []).length
    if (count >= 5) nested.push(`${c.sheet}!${c.ref}`)
  })
  add({
    id: 'nested_if',
    severity: 'minor',
    group: 'Maintainability',
    title: `${nested.length} formula${nested.length === 1 ? ' with five or more nested IFs' : 's with five or more nested IFs'}`,
    detail: 'A chain of conditions that has to be read in order to be understood, and re-read every time it changes.',
    advice: 'A lookup table usually replaces the whole thing. IFS or SWITCH are also easier to follow than nesting, and both make it obvious when a case is missing.',
    cells: byCell(nested),
    sheet: '',
  })

  // ---- Score ----
  const weights: Record<Severity, number> = { critical: 14, major: 6, minor: 2 }
  const penalty = findings.reduce((n, f) =>
    n + weights[f.severity] * Math.min(3, Math.ceil(f.count / 5)), 0)
  const score = Math.max(0, Math.min(100, 100 - penalty))

  const formulas = raw.filter(c => c.formula).length
  const shapes = new Set(raw.filter(c => c.formula).map(c => formulaShape(c.formula!)))

  const order: Severity[] = ['critical', 'major', 'minor']
  findings.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity) || b.count - a.count)

  return {
    findings,
    sheets,
    cells,
    score,
    totals: {
      sheets: sheets.length,
      cells: raw.length,
      formulas,
      uniqueFormulaShapes: shapes.size,
      externalLinks: external.length,
    },
  }
}

// ---------------------------------------------------------------
// Paid: dependency analysis
// ---------------------------------------------------------------

export interface Dependency {
  key: string
  ref: string
  sheet: string
  formula?: string
  isInput: boolean
  directFeeds: number
  totalFeeds: number
  label?: string
}

/**
 * Which cells everything else depends on.
 *
 * The useful question is not what a spreadsheet contains but what happens
 * if one number changes. A typed value feeding two hundred formulas is the
 * thing to worry about, and it is invisible unless somebody traces it.
 */
export function dependencies(cells: Map<string, CellInfo>, limit = 25): Dependency[] {
  const out: Dependency[] = []

  const reach = (key: string): number => {
    const seen = new Set<string>()
    const stack = [key]
    while (stack.length) {
      const k = stack.pop()!
      const info = cells.get(k)
      if (!info) continue
      for (const f of info.feeds) {
        if (seen.has(f)) continue
        seen.add(f)
        stack.push(f)
        if (seen.size > 3000) return seen.size
      }
    }
    return seen.size
  }

  cells.forEach((info, key) => {
    if (!info.feeds.length) return
    out.push({
      key,
      ref: info.ref,
      sheet: info.sheet,
      formula: info.formula,
      isInput: !info.formula,
      directFeeds: info.feeds.length,
      totalFeeds: reach(key),
    })
  })

  out.sort((a, b) => b.totalFeeds - a.totalFeeds)
  return out.slice(0, limit)
}
