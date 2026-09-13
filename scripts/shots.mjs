#!/usr/bin/env node
/**
 * Screenshots, desktop and mobile.
 *
 * Neither Claude nor any script can tell you whether a page looks right.
 * This at least produces the images, so somebody, or Claude Code, can look
 * at them without clicking through forty pages.
 *
 * Needs: npm install --save-dev playwright && npx playwright install chromium
 * Run:   node scripts/shots.mjs [--live]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'fs'

const LIVE = process.argv.includes('--live')
const BASE = LIVE ? 'https://www.lexalytic.com' : 'http://localhost:3000'
const OUT = 'screenshots'

const PAGES = [
  '/', '/about', '/tools', '/blog', '/case-studies',
  '/blog/what-is-data-cleansing-uk',
  '/services/power-bi',
  '/industries/construction',
  '/startups', '/homeowners',
  '/tools/retention-tracker',
  '/tools/spreadsheet-audit',
  '/retention-manager', '/margin-manager',
]

mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch()

for (const [label, size] of [['desktop', { width: 1440, height: 900 }],
                             ['mobile', { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  for (const path of PAGES) {
    const name = (path === '/' ? 'home' : path.replace(/\//g, '-').replace(/^-/, ''))
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 })
      // the navbar changes on scroll, so capture the top as a visitor sees it
      await page.screenshot({ path: `${OUT}/${label}-${name}-top.png` })
      await page.evaluate(() => window.scrollBy(0, 600))
      await page.waitForTimeout(400)
      await page.screenshot({ path: `${OUT}/${label}-${name}-scrolled.png` })
      console.log(`  ${label.padEnd(8)} ${path}`)
    } catch {
      console.log(`  ${label.padEnd(8)} ${path}  could not load`)
    }
  }
  await ctx.close()
}

await browser.close()
console.log(`\nWritten to ${OUT}/. Two per page per size: the top, and scrolled down.`)
