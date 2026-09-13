#!/usr/bin/env node
/**
 * Security check.
 *
 * Everything here is deterministic: either a secret is committed or it is
 * not, either an API route checks auth or it does not. Runs in a few seconds
 * and catches the mistakes that are easy to make and expensive to discover.
 *
 * Run: node scripts/security-check.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

let problems = 0, warnings = 0
const red = s => `\x1b[31m${s}\x1b[0m`
const amber = s => `\x1b[33m${s}\x1b[0m`
const green = s => `\x1b[32m${s}\x1b[0m`
const dim = s => `\x1b[2m${s}\x1b[0m`

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const f of readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(f)) continue
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const codeFiles = walk('app').concat(walk('lib')).concat(walk('components'))
  .filter(f => /\.(ts|tsx|js|mjs)$/.test(f))

// ---------------------------------------------------------------
console.log('\nSECURITY CHECK\n')

// 1. Secrets in committed code
console.log('Secrets:')
const SECRET_PATTERNS = [
  [/sk_live_[A-Za-z0-9]{20,}/, 'Stripe live secret key'],
  [/sk_test_[A-Za-z0-9]{20,}/, 'Stripe test secret key'],
  [/whsec_[A-Za-z0-9]{20,}/, 'Stripe webhook secret'],
  [/eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\./, 'a JWT, possibly a Supabase key'],
  [/sk-ant-[A-Za-z0-9-]{20,}/, 'Anthropic API key'],
  [/re_[A-Za-z0-9]{20,}/, 'Resend API key'],
  [/AKIA[0-9A-Z]{16}/, 'AWS access key'],
]
let found = 0
for (const f of codeFiles) {
  const src = readFileSync(f, 'utf8')
  for (const [re, label] of SECRET_PATTERNS) {
    if (re.test(src)) {
      console.log(`  ${red('EXPOSED')} ${label} in ${f}`)
      problems++; found++
    }
  }
}
if (!found) console.log(`  ${green('ok')}      nothing that looks like a live key`)

// 2. Service role key reaching the browser
console.log('\nSupabase:')
let srk = 0
for (const f of codeFiles) {
  const src = readFileSync(f, 'utf8')
  if (!src.includes('SERVICE_ROLE')) continue
  const isClient = src.startsWith("'use client'") || src.includes("\n'use client'")
  if (isClient) {
    console.log(`  ${red('EXPOSED')} service role key referenced in a client component: ${f}`)
    problems++; srk++
  }
}
if (!srk) console.log(`  ${green('ok')}      service role key stays server side`)

// 3. API routes without an auth check
console.log('\nAPI routes:')
const routes = walk('app/api').filter(f => /route\.(ts|js)$/.test(f))
const PUBLIC_OK = ['companies-house', 'cron', 'webhook', 'stripe']
let unauth = 0
for (const f of routes) {
  const src = readFileSync(f, 'utf8')
  const hasAuth = /getUser|getSession|auth\(\)|requireUser|accessFor|CRON_SECRET|stripe\.webhooks|verifyHeader/.test(src)
  const deliberatelyPublic = PUBLIC_OK.some(p => f.includes(p))
  if (!hasAuth && !deliberatelyPublic) {
    console.log(`  ${red('OPEN')}    no auth check: ${f}`)
    problems++; unauth++
  }
}
console.log(dim(`  ${routes.length} routes, ${routes.length - unauth} with an auth check or deliberately public`))
if (!unauth) console.log(`  ${green('ok')}      every route is either authenticated or intentionally open`)

// 4. Dependencies
console.log('\nDependencies:')
try {
  const out = execSync('npm audit --json 2>/dev/null', { encoding: 'utf8', maxBuffer: 20e6 })
  const audit = JSON.parse(out)
  const v = audit.metadata?.vulnerabilities || {}
  const crit = (v.critical || 0), high = (v.high || 0), mod = (v.moderate || 0)
  if (crit || high) {
    console.log(`  ${red('RISK')}    ${crit} critical, ${high} high`)
    console.log(dim('          npm audit fix, or npm audit for the detail'))
    problems++
  } else if (mod) {
    console.log(`  ${amber('note')}    ${mod} moderate, ${v.low || 0} low`)
    warnings++
  } else {
    console.log(`  ${green('ok')}      nothing critical or high`)
  }
} catch (e) {
  // npm audit exits non-zero when it finds things
  try {
    const audit = JSON.parse(e.stdout || '{}')
    const v = audit.metadata?.vulnerabilities || {}
    if (v.critical || v.high) {
      console.log(`  ${red('RISK')}    ${v.critical || 0} critical, ${v.high || 0} high`)
      problems++
    } else {
      console.log(`  ${amber('note')}    ${v.moderate || 0} moderate, ${v.low || 0} low`)
      warnings++
    }
  } catch {
    console.log(`  ${amber('?')}       npm audit could not be read`)
    warnings++
  }
}

// 5. Live security headers
console.log('\nLive headers:')
const WANTED = {
  'strict-transport-security': 'forces HTTPS on repeat visits',
  'x-content-type-options': 'stops MIME sniffing',
  'x-frame-options': 'stops the site being framed',
  'referrer-policy': 'limits what is sent to other sites',
  'permissions-policy': 'switches off camera, microphone and location',
}
try {
  const r = await fetch('https://www.lexalytic.com/', {
    method: 'HEAD', signal: AbortSignal.timeout(15000),
  })
  let missing = 0
  for (const [h, why] of Object.entries(WANTED)) {
    if (!r.headers.get(h)) {
      console.log(`  ${amber('MISSING')} ${h}, ${why}`)
      warnings++; missing++
    }
  }
  if (!missing) console.log(`  ${green('ok')}      all five present`)
} catch {
  console.log(`  ${amber('?')}       could not reach the live site`)
  warnings++
}

// 6. Things that should not ship
console.log('\nLeftovers:')
let debris = 0
for (const f of codeFiles) {
  const src = readFileSync(f, 'utf8')
  const logs = (src.match(/console\.log\(/g) || []).length
  if (logs > 2) {
    console.log(`  ${amber('note')}    ${logs} console.log in ${f}`)
    warnings++; debris++
  }
  if (/\bTODO\b|\bFIXME\b|\bXXX\b/.test(src)) {
    console.log(`  ${amber('note')}    TODO or FIXME in ${f}`)
    warnings++; debris++
  }
}
if (!debris) console.log(`  ${green('ok')}      no stray logging or TODOs`)

// ---------------------------------------------------------------
console.log('')
if (problems) {
  console.log(red(`${problems} thing${problems > 1 ? 's need' : ' needs'} fixing now.`))
  process.exit(1)
} else if (warnings) {
  console.log(amber(`${warnings} thing${warnings > 1 ? 's' : ''} worth a look. Nothing urgent.`))
} else {
  console.log(green('Clean.'))
}
