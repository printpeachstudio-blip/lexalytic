/**
 * Fuzzy duplicate detection for UK business and contact data.
 *
 * The hard part of data cleansing is not finding exact duplicates, it is
 * finding the ones that are the same thing spelled differently. Smith and
 * Sons Ltd, Smith & Sons Limited and SMITH AND SONS LTD are one customer
 * and three records.
 *
 * Everything here runs in the browser, so it has to be fast as well as
 * correct. A naive comparison of every row against every other is O(n squared),
 * which at ten thousand rows is fifty million comparisons and far too slow.
 * The answer is blocking: only compare records that share a cheap key, which
 * cuts the work by orders of magnitude while missing almost nothing.
 */

/**
 * Legal forms only. These say nothing about which company it is, so
 * removing them helps.
 *
 * Descriptive words are deliberately left alone. Smith Services and Smith
 * Solutions are two businesses, not one spelled two ways, and stripping
 * Services and Solutions would merge them. Sons is the same: Smith and Sons
 * Ltd is not necessarily Smith Ltd. Missing a duplicate is a nuisance.
 * Merging two real customers is a data loss, so the bias runs that way.
 */
const SUFFIXES = [
  'limited', 'ltd', 'plc', 'llp', 'llc', 'inc', 'incorporated',
  'cic', 'cio', 'lp', 'ug',
]

/** Leading words that carry nothing. */
const PREFIXES = ['the']

/** Words that carry nothing. 'a' is deliberately absent: in a name it is
 * usually an initial, as in A J Smith, rather than an article. */
const NOISE_WORDS = new Set(['and', 'of', 'for', 'at', 'in', 'the'])

/** Strip everything that does not help identify a thing. */
export function normalise(v: string): string {
  let s = String(v || '').toLowerCase()
  s = s.replace(/&/g, ' and ')
  s = s.replace(/[^a-z0-9 ]/g, ' ')
  s = s.replace(/\s+/g, ' ').trim()
  // remove legal forms from the end, repeatedly, since names often carry
  // more than one: Acme Holdings Ltd UK Limited happens
  let changed = true
  while (changed) {
    changed = false
    for (const suf of SUFFIXES) {
      if (s.endsWith(' ' + suf)) {
        s = s.slice(0, -(suf.length + 1)).trim()
        changed = true
      }
    }
  }
  for (const pre of PREFIXES) {
    if (s.startsWith(pre + ' ')) s = s.slice(pre.length + 1).trim()
  }
  return s
}

/** Sort the words, so word order stops mattering. */
export function tokenSort(v: string): string {
  return normalise(v)
    .split(' ')
    .filter(w => w && !NOISE_WORDS.has(w))
    .sort()
    .join(' ')
}

/**
 * Jaro-Winkler similarity, 0 to 1. Better than plain edit distance for
 * names because it weights a matching prefix, and people misspell the
 * ends of words more than the beginnings.
 */
export function jaroWinkler(a: string, b: string): number {
  if (a === b) return 1
  if (!a.length || !b.length) return 0

  const matchWindow = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1)
  const aMatched = new Array(a.length).fill(false)
  const bMatched = new Array(b.length).fill(false)
  let matches = 0

  for (let i = 0; i < a.length; i++) {
    const lo = Math.max(0, i - matchWindow)
    const hi = Math.min(i + matchWindow + 1, b.length)
    for (let j = lo; j < hi; j++) {
      if (bMatched[j] || a[i] !== b[j]) continue
      aMatched[i] = true
      bMatched[j] = true
      matches++
      break
    }
  }
  if (!matches) return 0

  let transpositions = 0
  let k = 0
  for (let i = 0; i < a.length; i++) {
    if (!aMatched[i]) continue
    while (!bMatched[k]) k++
    if (a[i] !== b[k]) transpositions++
    k++
  }
  transpositions /= 2

  const jaro = (matches / a.length + matches / b.length
    + (matches - transpositions) / matches) / 3

  // Winkler adjustment for a shared prefix, up to four characters
  let prefix = 0
  for (let i = 0; i < Math.min(4, a.length, b.length); i++) {
    if (a[i] === b[i]) prefix++; else break
  }
  return jaro + prefix * 0.1 * (1 - jaro)
}

export type FieldKind = 'name' | 'email' | 'postcode' | 'phone' | 'company_number' | 'other'

export interface FieldMap {
  column: string
  kind: FieldKind
}

/** How much each kind of field contributes to a match. */
const WEIGHTS: Record<FieldKind, number> = {
  company_number: 1.0,   // an exact match here is decisive
  email: 0.9,
  postcode: 0.6,
  phone: 0.6,
  name: 0.8,
  other: 0.2,
}


/**
 * Name similarity, decided by the weakest word rather than the average.
 *
 * Averaging is the mistake. John Smith and Jane Smith share a surname, so
 * the mean of a perfect match and a poor one clears any sensible threshold
 * and two different people get merged. Same for Smith and Sons against
 * Smith Services.
 *
 * The distinguishing word is the one that matters. If it does not match,
 * nothing else rescues it, because a shared surname is not evidence and
 * neither is a shared address. Merging two real records loses data;
 * missing a duplicate merely leaves work. The bias runs that way
 * deliberately.
 */
export function nameSimilarity(a: string, b: string): number {
  const ta = normalise(a).split(' ').filter(w => w && !NOISE_WORDS.has(w))
  const tb = normalise(b).split(' ').filter(w => w && !NOISE_WORDS.has(w))
  if (!ta.length || !tb.length) return 0

  const [short, long] = ta.length <= tb.length ? [ta, tb] : [tb, ta]

  const used = new Set<number>()
  const scores: number[] = []

  for (const w of short) {
    let best = 0, bestIdx = -1
    long.forEach((v, i) => {
      if (used.has(i)) return
      let sc: number
      if (w.length === 1 || v.length === 1) {
        // an initial against a full word, J for John. Real but weaker,
        // since J could be Jane
        sc = w[0] === v[0] ? 0.86 : 0
      } else {
        sc = jaroWinkler(w, v)
      }
      if (sc > best) { best = sc; bestIdx = i }
    })
    if (bestIdx >= 0) used.add(bestIdx)
    scores.push(best)
  }

  // The weakest word decides. Below this and the names are simply
  // different however well the rest lines up.
  const weakest = Math.min(...scores)
  if (weakest < 0.80) return weakest * 0.5

  const mean = scores.reduce((x, y) => x + y, 0) / scores.length

  // Extra meaningful words in the longer name count against it. Smith is
  // not Smith Solutions, and the missing word is the whole difference.
  const coverage = short.length / long.length

  return mean * (0.4 + 0.6 * coverage)
}

function compareField(kind: FieldKind, a: string, b: string): number | null {
  const x = String(a || '').trim()
  const y = String(b || '').trim()
  if (!x || !y) return null  // cannot compare, so do not penalise

  switch (kind) {
    case 'company_number':
      return x.replace(/\D/g, '').padStart(8, '0') === y.replace(/\D/g, '').padStart(8, '0') ? 1 : 0
    case 'email':
      return x.toLowerCase() === y.toLowerCase() ? 1 : 0
    case 'postcode':
      return x.toUpperCase().replace(/\s/g, '') === y.toUpperCase().replace(/\s/g, '') ? 1 : 0
    case 'phone': {
      const cl = (v: string) => v.replace(/\D/g, '').replace(/^44/, '0').slice(-10)
      return cl(x) === cl(y) ? 1 : 0
    }
    case 'name':
      return nameSimilarity(x, y)
    default:
      return normalise(x) === normalise(y) ? 1 : 0
  }
}

export interface Pair {
  a: number
  b: number
  score: number
  reasons: { column: string; kind: FieldKind; score: number }[]
}

export interface Cluster {
  ids: number[]
  score: number
  reasons: { column: string; kind: FieldKind; score: number }[]
}

/**
 * Blocking key. Two records only get compared if they share one of these,
 * which is what makes this feasible in a browser.
 */
function blockKeys(row: Record<string, string>, fields: FieldMap[]): string[] {
  const keys: string[] = []
  for (const f of fields) {
    const v = String(row[f.column] || '').trim()
    if (!v) continue
    if (f.kind === 'company_number') keys.push('c:' + v.replace(/\D/g, '').padStart(8, '0'))
    else if (f.kind === 'email') keys.push('e:' + v.toLowerCase())
    else if (f.kind === 'postcode') keys.push('p:' + v.toUpperCase().replace(/\s/g, ''))
    else if (f.kind === 'phone') keys.push('t:' + v.replace(/\D/g, '').slice(-10))
    else if (f.kind === 'name') {
      const t = tokenSort(v)
      if (t) {
        // first four characters of the sorted tokens, plus the sorted initials
        keys.push('n:' + t.slice(0, 4))
        const initials = t.split(' ').map(w => w[0]).sort().join('')
        if (initials.length > 1) keys.push('i:' + initials)
      }
    }
  }
  return keys
}

export interface DedupResult {
  clusters: Cluster[]
  compared: number
  duplicateRows: number
  /** Set when the file was too large or too uniform to finish properly. */
  truncated?: string
}

/**
 * A budget on comparisons. Some files are pathologically uniform: fifteen
 * thousand records across ninety postcodes produces enormous blocks and
 * millions of comparisons. Rather than freezing the tab we stop and say so,
 * because a tool that hangs is worse than one that admits a limit.
 */
const COMPARISON_BUDGET = 600000

/**
 * Find clusters of records that look like the same thing.
 *
 * threshold is 0 to 1. Above about 0.9 is near certain, 0.8 to 0.9 is
 * likely and worth a human look, below 0.75 produces too much noise to
 * be useful.
 */
export function findDuplicates(
  rows: Record<string, string>[],
  fields: FieldMap[],
  threshold = 0.85,
  maxRows = 15000
): DedupResult {
  const active = fields.filter(f => f.kind !== 'other')
  if (!active.length || rows.length < 2) {
    return { clusters: [], compared: 0, duplicateRows: 0 }
  }

  const work = rows.slice(0, maxRows)

  // Build blocks
  const blocks = new Map<string, number[]>()
  work.forEach((row, i) => {
    for (const k of blockKeys(row, active)) {
      const arr = blocks.get(k)
      if (arr) arr.push(i); else blocks.set(k, [i])
    }
  })

  // Compare only within blocks, and only once per pair
  const seen = new Set<string>()
  const pairs: Pair[] = []
  let compared = 0

  let budgetSpent = false

  blocks.forEach(ids => {
    if (budgetSpent) return
    // A block holding a large share of the file is not telling us anything.
    // Everybody in one postcode is not a signal.
    if (ids.length > 150) return
    for (let x = 0; x < ids.length; x++) {
      for (let y = x + 1; y < ids.length; y++) {
        const i = ids[x], j = ids[y]
        if (compared >= COMPARISON_BUDGET) { budgetSpent = true; return }
        const key = i < j ? `${i}:${j}` : `${j}:${i}`
        if (seen.has(key)) continue
        seen.add(key)
        compared++

        let weighted = 0, totalWeight = 0
        const reasons: Pair['reasons'] = []
        let decisive = false

        let nameScore: number | null = null

        for (const f of active) {
          const sc = compareField(f.kind, work[i][f.column], work[j][f.column])
          if (sc === null) continue
          const w = WEIGHTS[f.kind]
          weighted += sc * w
          totalWeight += w
          if (sc > 0.7) reasons.push({ column: f.column, kind: f.kind, score: sc })
          if (f.kind === 'name') nameScore = Math.max(nameScore ?? 0, sc)
          // an exact company number or email match identifies the same
          // entity on its own, whatever the name says
          if (sc === 1 && (f.kind === 'company_number' || f.kind === 'email')) decisive = true
        }

        if (!totalWeight) continue

        // The name has to hold up on its own unless something decisive
        // says otherwise. A matching postcode is not evidence that two
        // businesses at the same address are the same business, and a
        // shared surname is not evidence about two people.
        if (!decisive && nameScore !== null && nameScore < 0.72) continue

        const score = decisive ? Math.max(0.95, weighted / totalWeight) : weighted / totalWeight
        if (score >= threshold) pairs.push({ a: i, b: j, score, reasons })
      }
    }
  })

  // Join pairs into clusters with a union find
  const parent = new Map<number, number>()
  const find = (x: number): number => {
    if (!parent.has(x)) parent.set(x, x)
    let p = parent.get(x)!
    if (p !== x) { p = find(p); parent.set(x, p) }
    return p
  }
  const union = (x: number, y: number) => {
    const a = find(x), b = find(y)
    if (a !== b) parent.set(a, b)
  }

  const bestPair = new Map<number, Pair>()
  pairs.forEach(p => {
    union(p.a, p.b)
    const root = find(p.a)
    const cur = bestPair.get(root)
    if (!cur || p.score > cur.score) bestPair.set(root, p)
  })

  const groups = new Map<number, number[]>()
  Array.from(parent.keys()).forEach(k => {
    const r = find(k)
    const arr = groups.get(r)
    if (arr) arr.push(k); else groups.set(r, [k])
  })

  const clusters: Cluster[] = []
  groups.forEach((ids, root) => {
    if (ids.length < 2) return
    const p = bestPair.get(root)
    clusters.push({
      ids: ids.sort((a, b) => a - b),
      score: p ? p.score : threshold,
      reasons: p ? p.reasons : [],
    })
  })

  clusters.sort((a, b) => b.score - a.score)

  let truncated: string | undefined
  if (rows.length > maxRows) {
    truncated = `Only the first ${maxRows.toLocaleString('en-GB')} rows were checked. Split the file and run it again for the rest.`
  } else if (budgetSpent) {
    truncated = 'The file has a lot of records sharing the same postcode or a very similar name, which makes the comparison large. Some pairs were not checked. Narrowing the fields you match on usually helps.'
  }

  return {
    clusters,
    compared,
    duplicateRows: clusters.reduce((n, c) => n + c.ids.length - 1, 0),
    truncated,
  }
}

/** How many fields in a row are populated, for picking which to keep. */
export function completeness(row: Record<string, string>, headers: string[]): number {
  return headers.filter(h => String(row[h] ?? '').trim() !== '').length
}

/**
 * Merge a cluster into one record. Starts from the chosen row and fills
 * any blank field from the others, so nothing is silently lost.
 */
export function mergeCluster(
  rows: Record<string, string>[],
  ids: number[],
  keepId: number,
  headers: string[]
): Record<string, string> {
  const out = { ...rows[keepId] }
  headers.forEach(h => {
    if (String(out[h] ?? '').trim() !== '') return
    for (const id of ids) {
      const v = String(rows[id][h] ?? '').trim()
      if (v) { out[h] = v; break }
    }
  })
  return out
}

/** Guess what each column is, so the user does not have to map everything. */
export function guessKind(header: string): FieldKind {
  const h = header.toLowerCase().replace(/[^a-z]/g, '')
  if (/companynumber|companieshouse|crn|registration/.test(h)) return 'company_number'
  if (/email|mail/.test(h)) return 'email'
  if (/postcode|postal|zip/.test(h)) return 'postcode'
  if (/phone|tel|mobile/.test(h)) return 'phone'
  if (/name|company|client|customer|supplier|contact|organisation|organization/.test(h)) return 'name'
  return 'other'
}
