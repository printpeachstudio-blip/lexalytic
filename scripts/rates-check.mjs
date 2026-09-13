#!/usr/bin/env node
/**
 * Rate drift check.
 *
 * The tools hardcode figures that change on a schedule: the Bank of England
 * base rate up to eight times a year, the National Living Wage every April,
 * alcohol duty every February. When one goes stale the tool quietly gives a
 * wrong answer and nobody finds out.
 *
 * This compares what is in the code against the official source where one
 * can be read, and flags anything not reviewed recently where it cannot.
 *
 * Run: node scripts/rates-check.mjs
 */
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const STALE_DAYS = 90
let problems = 0
let warnings = 0

const red = s => `\x1b[31m${s}\x1b[0m`
const amber = s => `\x1b[33m${s}\x1b[0m`
const green = s => `\x1b[32m${s}\x1b[0m`
const dim = s => `\x1b[2m${s}\x1b[0m`

function readRates() {
  const src = readFileSync('lib/rates.ts', 'utf8')
  const out = {}
  for (const m of src.matchAll(/export const (\w+)\s*=\s*([0-9.]+)/g)) {
    out[m[1]] = parseFloat(m[2])
  }
  for (const m of src.matchAll(/export const (\w+_CHECKED)\s*=\s*'([^']+)'/g)) {
    out[m[1]] = m[2]
  }
  return out
}

function daysSince(iso) {
  if (!iso) return null
  return Math.round((Date.now() - new Date(iso + 'T00:00:00Z').getTime()) / 86400000)
}

async function fetchText(url) {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LexalyticRateCheck/1.0)' },
      signal: AbortSignal.timeout(15000),
    })
    if (!r.ok) return null
    return await r.text()
  } catch {
    return null
  }
}

// ---------------------------------------------------------------
// Checks that read an official source
// ---------------------------------------------------------------

async function checkBoeRate(rates) {
  const html = await fetchText('https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate')
  if (!html) {
    console.log(`  ${amber('?')} Bank rate: could not reach the Bank of England, check by hand`)
    warnings++
    return
  }
  // the page states the current rate as a percentage
  const m = html.match(/Bank Rate[^%]{0,120}?(\d+\.?\d*)\s*%/i)
             || html.match(/(\d+\.?\d*)\s*%[^<]{0,40}Bank Rate/i)
  if (!m) {
    console.log(`  ${amber('?')} Bank rate: page format changed, check by hand`)
    warnings++
    return
  }
  const live = parseFloat(m[1])
  if (Math.abs(live - rates.BOE_BASE) > 0.001) {
    console.log(`  ${red('DRIFT')} Bank rate: code says ${rates.BOE_BASE}%, the Bank says ${live}%`)
    console.log(dim(`        statutory interest is base plus 8, so every retention and lock-up figure is wrong`))
    console.log(dim(`        fix: lib/rates.ts BOE_BASE and BOE_CHECKED`))
    problems++
  } else {
    console.log(`  ${green('ok')}    Bank rate ${live}%`)
  }
}

async function checkNlw(rates) {
  const html = await fetchText('https://www.gov.uk/national-minimum-wage-rates')
  if (!html) {
    console.log(`  ${amber('?')} National Living Wage: could not reach gov.uk, check by hand`)
    warnings++
    return
  }
  // the 21 and over rate is the National Living Wage
  const rows = [...html.matchAll(/£(\d+\.\d{2})/g)].map(m => parseFloat(m[1]))
  if (!rows.length) {
    console.log(`  ${amber('?')} National Living Wage: page format changed, check by hand`)
    warnings++
    return
  }
  const highest = Math.max(...rows)
  if (Math.abs(highest - rates.NLW) > 0.001) {
    console.log(`  ${red('DRIFT')} National Living Wage: code says £${rates.NLW}, gov.uk highest rate is £${highest}`)
    console.log(dim(`        affects every labour cost calculation`))
    console.log(dim(`        fix: lib/rates.ts NLW and EMPLOYMENT_CHECKED`))
    problems++
  } else {
    console.log(`  ${green('ok')}    National Living Wage £${rates.NLW}`)
  }
}

// ---------------------------------------------------------------
// Checks based on when something was last reviewed
// ---------------------------------------------------------------

function checkStaleness(rates) {
  const groups = [
    ['BOE_CHECKED', 'Bank rate', 'up to eight times a year'],
    ['EMPLOYMENT_CHECKED', 'Employment costs, NI, pension, holiday', 'every April'],
  ]
  for (const [key, label, cadence] of groups) {
    const d = daysSince(rates[key])
    if (d === null) continue
    if (d > STALE_DAYS) {
      console.log(`  ${amber('STALE')} ${label}: last reviewed ${d} days ago, changes ${cadence}`)
      warnings++
    }
  }
}

// ---------------------------------------------------------------
// Duplicated constants, which drift against each other
// ---------------------------------------------------------------

function walk(dir, out = []) {
  for (const f of readdirSync(dir)) {
    if (f === 'node_modules' || f === '.next' || f.startsWith('.')) continue
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.tsx?$/.test(p)) out.push(p)
  }
  return out
}

function checkDuplicates(rates) {
  const names = Object.keys(rates).filter(k => !k.endsWith('_CHECKED'))
  const files = walk('app').concat(walk('lib')).concat(walk('components'))
  const dupes = new Map()

  for (const f of files) {
    if (f.endsWith('lib/rates.ts')) continue
    const src = readFileSync(f, 'utf8')
    for (const n of names) {
      const m = src.match(new RegExp(`const ${n}\\s*=\\s*([0-9.]+)`))
      if (m) {
        const v = parseFloat(m[1])
        if (!dupes.has(n)) dupes.set(n, [])
        dupes.get(n).push({ file: f, value: v })
      }
    }
  }

  for (const [name, uses] of dupes) {
    const central = rates[name]
    const wrong = uses.filter(u => Math.abs(u.value - central) > 0.001)
    if (wrong.length) {
      console.log(`  ${red('DRIFT')} ${name} defined again with a different value:`)
      for (const w of wrong) console.log(dim(`        ${w.file} has ${w.value}, lib/rates.ts has ${central}`))
      problems++
    } else {
      console.log(`  ${amber('DUP')}   ${name} redefined in ${uses.length} file${uses.length > 1 ? 's' : ''}, same value for now`)
      for (const u of uses) console.log(dim(`        ${u.file}`))
      warnings++
    }
  }
}

// ---------------------------------------------------------------

console.log('\nRATE DRIFT CHECK\n')
const rates = readRates()

console.log('Against the official source:')
await checkBoeRate(rates)
await checkNlw(rates)

console.log('\nLast reviewed:')
checkStaleness(rates)
if (!warnings) console.log(`  ${green('ok')}    everything reviewed within ${STALE_DAYS} days`)

console.log('\nDuplicated constants:')
const before = problems + warnings
checkDuplicates(rates)
if (problems + warnings === before) console.log(`  ${green('ok')}    nothing redefined outside lib/rates.ts`)

console.log('')
if (problems) {
  console.log(red(`${problems} rate${problems > 1 ? 's are' : ' is'} wrong. Tools are giving incorrect answers.`))
  process.exit(1)
} else if (warnings) {
  console.log(amber(`${warnings} thing${warnings > 1 ? 's' : ''} to look at. Nothing is wrong yet.`))
  process.exit(0)
} else {
  console.log(green('Everything current.'))
}
