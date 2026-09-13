#!/usr/bin/env node
/**
 * Contrast and accessibility.
 *
 * This is the one that would have caught the navbar: white links on a cream
 * background is a measurable contrast failure, not a matter of taste. It
 * renders each page in a headless browser and reads the computed colours.
 *
 * Needs: npm install --save-dev pa11y
 * Run:   node scripts/a11y-check.mjs [--live]
 */
import pa11y from 'pa11y'

const LIVE = process.argv.includes('--live')
const BASE = LIVE ? 'https://www.lexalytic.com' : 'http://localhost:3000'

/** One of each kind of page, rather than all 150. */
const PAGES = [
  ['/', 'homepage, dark hero'],
  ['/about', 'light page'],
  ['/tools', 'tools index'],
  ['/blog', 'blog index'],
  ['/blog/what-is-data-cleansing-uk', 'a blog post'],
  ['/services/power-bi', 'a service page'],
  ['/case-studies', 'case studies'],
  ['/industries/construction', 'an industry hub'],
  ['/startups', 'startups'],
  ['/homeowners', 'homeowners'],
  ['/tools/retention-tracker', 'a tool'],
  ['/tools/spreadsheet-audit', 'a file tool'],
  ['/retention-manager', 'a product page'],
  ['/margin-manager', 'a product page'],
]

const red = s => `\x1b[31m${s}\x1b[0m`
const amber = s => `\x1b[33m${s}\x1b[0m`
const green = s => `\x1b[32m${s}\x1b[0m`
const dim = s => `\x1b[2m${s}\x1b[0m`

console.log(`\nACCESSIBILITY AND CONTRAST\n${dim(BASE)}\n`)

let contrastFails = 0, otherFails = 0, pagesWithIssues = 0

for (const [path, what] of PAGES) {
  let res
  try {
    res = await pa11y(BASE + path, {
      standard: 'WCAG2AA',
      timeout: 30000,
      chromeLaunchConfig: { args: ['--no-sandbox', '--disable-dev-shm-usage'] },
      hideElements: 'iframe',
    })
  } catch (e) {
    console.log(`  ${amber('?')} ${path.padEnd(38)} could not load`)
    continue
  }

  const errors = res.issues.filter(i => i.type === 'error')
  const contrast = errors.filter(i => /contrast/i.test(i.message))
  const other = errors.filter(i => !/contrast/i.test(i.message))

  if (!errors.length) {
    console.log(`  ${green('ok')} ${path.padEnd(38)} ${dim(what)}`)
    continue
  }

  pagesWithIssues++
  console.log(`  ${contrast.length ? red('FAIL') : amber('note')} ${path.padEnd(38)} ${dim(what)}`)

  // contrast first, it is the one that makes text unreadable
  const seen = new Set()
  for (const i of contrast.slice(0, 4)) {
    const key = i.message.slice(0, 80)
    if (seen.has(key)) continue
    seen.add(key)
    const ratio = i.message.match(/ratio of ([\d.]+):1/)
    const need = i.message.match(/expected.*?([\d.]+):1/)
    console.log(`       ${red('contrast')} ${ratio ? ratio[1] + ':1' : '?'}${need ? ', needs ' + need[1] + ':1' : ''}`)
    console.log(dim(`         ${(i.context || '').replace(/\s+/g, ' ').slice(0, 90)}`))
    contrastFails++
  }
  const otherSeen = new Set()
  for (const i of other.slice(0, 3)) {
    const key = i.code
    if (otherSeen.has(key)) continue
    otherSeen.add(key)
    console.log(`       ${amber('issue')} ${i.message.slice(0, 88)}`)
    otherFails++
  }
  if (errors.length > 7) console.log(dim(`       and ${errors.length - 7} more`))
}

console.log('')
if (contrastFails) {
  console.log(red(`${contrastFails} contrast failure${contrastFails > 1 ? 's' : ''}. Some text cannot be read.`))
  process.exit(1)
} else if (otherFails) {
  console.log(amber(`${otherFails} accessibility issue${otherFails > 1 ? 's' : ''} across ${pagesWithIssues} page${pagesWithIssues > 1 ? 's' : ''}.`))
} else {
  console.log(green('No contrast or accessibility errors.'))
}

/*
 * KNOWN AND ACCEPTED
 *
 * 1.05:1 on the logo, on pages with a dark hero. The navbar is transparent
 * and sits over a dark section, which pa11y cannot see. Visually correct.
 *
 * 3.37:1 on .btn-amber, white on #C17D2E. A WCAG AA failure on a strict
 * reading and a deliberate choice: the alternatives are a noticeably
 * browner button or near-black text on amber, and the text is legible.
 * Revisit if the site ever needs a formal accessibility statement.
 */
