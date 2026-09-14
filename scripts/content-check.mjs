#!/usr/bin/env node
/**
 * How much text does Google see before any JavaScript runs?
 *
 * This exists because of a real failure. Every tool page served a short
 * intro and then Next.js boilerplate, because the tool itself was a client
 * component and the FAQ sat in a script tag. Google compared that HTML
 * against other Next.js sites, found it near-identical, and picked an
 * unrelated gambling site as the canonical for one of the tools. The page
 * could not rank and there was no error anywhere to explain it.
 *
 * The page that actually failed was carrying 456 words, so 500 is the line
 * that reflects what happened rather than a number picked out of the air.
 *
 * Run: node scripts/content-check.mjs [--live]
 */

const LIVE = process.argv.includes('--live')
const BASE = LIVE ? 'https://www.lexalytic.com' : 'http://localhost:3000'

const THIN = 500
const VERY_THIN = 350

const red = s => `\x1b[31m${s}\x1b[0m`
const amber = s => `\x1b[33m${s}\x1b[0m`
const green = s => `\x1b[32m${s}\x1b[0m`
const dim = s => `\x1b[2m${s}\x1b[0m`

/** Every page worth checking, fetched from the sitemap so nothing is missed. */
async function urls() {
  try {
    const r = await fetch(BASE + '/sitemap.xml', { signal: AbortSignal.timeout(20000) })
    const xml = await r.text()
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => m[1].replace('https://www.lexalytic.com', ''))
      .filter(p => p && p !== '/')
  } catch {
    return null
  }
}

function words(html) {
  // strip scripts, styles and tags, then count what a crawler would read
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text ? text.split(' ').length : 0
}

console.log(`\nSERVER RENDERED CONTENT\n${dim(BASE)}\n`)

const paths = await urls()
if (!paths) {
  console.log(red('  could not read the sitemap'))
  process.exit(1)
}

// check the tools and the key pages, not all 150 blog posts
const check = paths.filter(p =>
  p.startsWith('/tools') || p.startsWith('/industries') ||
  ['/about', '/blog', '/case-studies', '/startups', '/homeowners',
   '/retention-manager', '/margin-manager'].includes(p) ||
  p.startsWith('/services'))

let thin = 0, veryThin = 0, failed = 0
const results = []

for (const p of check) {
  try {
    const r = await fetch(BASE + p, { signal: AbortSignal.timeout(20000) })
    if (!r.ok) { failed++; results.push([p, -1]); continue }
    const n = words(await r.text())
    results.push([p, n])
    if (n < VERY_THIN) veryThin++
    else if (n < THIN) thin++
  } catch {
    failed++
    results.push([p, -1])
  }
}

results.sort((a, b) => a[1] - b[1])

for (const [p, n] of results) {
  if (n < 0) {
    console.log(`  ${red('ERR ')} ${p}`)
  } else if (n < VERY_THIN) {
    console.log(`  ${red('THIN')} ${String(n).padStart(5)}  ${p}`)
  } else if (n < THIN) {
    console.log(`  ${amber('LOW ')} ${String(n).padStart(5)}  ${p}`)
  } else {
    console.log(`  ${green('ok  ')} ${String(n).padStart(5)}  ${dim(p)}`)
  }
}

console.log(`\n  ${check.length} pages, ${veryThin} under ${VERY_THIN} words, ${thin} under ${THIN}`)

if (veryThin) {
  console.log(red(`\n${veryThin} page${veryThin > 1 ? 's are' : ' is'} thin enough that Google may treat`))
  console.log(red('it as a duplicate of another site built on the same framework.'))
  console.log(dim('The usual cause is content living in a client component or a script tag.'))
  console.log(dim('Rendering the FAQ or the explanatory copy server side fixes it.'))
  process.exit(1)
} else if (thin) {
  console.log(amber(`\n${thin} page${thin > 1 ? 's' : ''} on the low side. Worth a look, not urgent.`))
} else {
  console.log(green('\nEvery page carries enough text before JavaScript runs.'))
}
