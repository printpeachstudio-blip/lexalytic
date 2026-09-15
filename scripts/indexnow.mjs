#!/usr/bin/env node
/**
 * IndexNow.
 *
 * Google caps URL submissions at roughly ten a day through Search Console,
 * which is why seventeen tools took a fortnight to get in front of it.
 * IndexNow has no such limit: one call to one endpoint and Bing, Yandex and
 * Seznam all pick it up, usually within minutes. Google does not participate,
 * so this is in addition to Search Console rather than instead of it.
 *
 * It runs on every push and submits only what changed in that push, because
 * submitting the whole site every time is the kind of thing that gets a
 * domain ignored.
 *
 * Run: node scripts/indexnow.mjs [--all]
 */
import { execSync } from 'child_process'
import { readFileSync, existsSync } from 'fs'

const HOST = 'www.lexalytic.com'
const KEY_FILE = 'public/indexnow-key.txt'

if (!existsSync(KEY_FILE)) {
  console.log('  no key file at ' + KEY_FILE + ', skipping')
  process.exit(0)
}
const key = readFileSync(KEY_FILE, 'utf8').trim()

/** Turn a changed file path into the URL it serves. */
function toUrl(path) {
  if (!path.startsWith('app/') || !path.endsWith('page.tsx')) return null
  let p = path.replace(/^app/, '').replace(/\/page\.tsx$/, '')
  // routes that are not pages
  if (/\/(api|app|margin|signin|signup|auth|invite|reset|forgot)\b/.test(p)) return null
  if (p.includes('[')) return null
  return `https://${HOST}${p || '/'}`
}

let urls = []

if (process.argv.includes('--all')) {
  const r = await fetch(`https://${HOST}/sitemap.xml`)
  const xml = await r.text()
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  console.log(`  submitting everything in the sitemap: ${urls.length} urls`)
} else {
  // what changed in the last push
  let changed = []
  try {
    changed = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' })
      .split('\n').filter(Boolean)
  } catch {
    console.log('  could not read the last commit, nothing submitted')
    process.exit(0)
  }
  urls = [...new Set(changed.map(toUrl).filter(Boolean))]
  if (!urls.length) {
    console.log('  no page changes in this push, nothing to submit')
    process.exit(0)
  }
  console.log(`  ${urls.length} page${urls.length > 1 ? 's' : ''} changed:`)
  urls.forEach(u => console.log(`     ${u.replace('https://' + HOST, '')}`))
}

const body = {
  host: HOST,
  key,
  keyLocation: `https://${HOST}/indexnow-key.txt`,
  urlList: urls.slice(0, 10000),
}

try {
  const r = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20000),
  })
  // 200 accepted, 202 accepted but key still being validated
  if (r.status === 200 || r.status === 202) {
    console.log(`\n  accepted (${r.status}). Bing and Yandex will crawl these shortly.`)
  } else {
    console.log(`\n  returned ${r.status}. 403 usually means the key file is not reachable.`)
    process.exit(0)   // never fail a deploy over this
  }
} catch (e) {
  console.log('\n  could not reach IndexNow, carrying on')
}
