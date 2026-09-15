import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * RSS feed.
 *
 * Worth having for two reasons that are not the obvious one. Aggregators and
 * newsreaders still exist, and more usefully, several AI crawlers and content
 * discovery services read feeds in preference to crawling, so a feed is a
 * cheap way of being found by things that are not Google.
 *
 * The posts live in the blog index as a const rather than a database, so this
 * reads that file and parses it rather than duplicating the list, which would
 * drift within a week.
 */

export const dynamic = 'force-static'

const MONTHS = ['January','February','March','April','May','June','July',
                'August','September','October','November','December']

interface Post { slug: string; title: string; excerpt: string; date: string }

function posts(): Post[] {
  const src = readFileSync(join(process.cwd(), 'app/blog/page.tsx'), 'utf8')
  const out: Post[] = []
  const re = /slug:\s*'([^']+)',\s*\n\s*title:\s*'((?:[^'\\]|\\.)*)',\s*\n\s*excerpt:\s*'((?:[^'\\]|\\.)*)',\s*\n\s*date:\s*'([^']+)'/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src)) !== null) {
    out.push({
      slug: m[1],
      title: m[2].replace(/\\'/g, "'"),
      excerpt: m[3].replace(/\\'/g, "'"),
      date: m[4],
    })
  }
  return out
}

function pubDate(d: string): string {
  const [mo, yr] = d.split(' ')
  const i = MONTHS.indexOf(mo)
  if (i < 0 || !yr) return new Date().toUTCString()
  // mid month, since the posts only carry a month
  return new Date(Date.UTC(parseInt(yr, 10), i, 15)).toUTCString()
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function GET() {
  const all = posts()
    .map(p => ({ ...p, ts: new Date(pubDate(p.date)).getTime() }))
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 50)

  const items = all.map(p => `    <item>
      <title>${esc(p.title)}</title>
      <link>https://www.lexalytic.com/blog/${p.slug}</link>
      <guid isPermaLink="true">https://www.lexalytic.com/blog/${p.slug}</guid>
      <description>${esc(p.excerpt)}</description>
      <pubDate>${pubDate(p.date)}</pubDate>
    </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lexalytic</title>
    <link>https://www.lexalytic.com/blog</link>
    <atom:link href="https://www.lexalytic.com/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Retention that goes unclaimed, service charges nobody questioned, spreadsheets nobody can read. Mostly about small businesses losing money in ways that were avoidable.</description>
    <language>en-gb</language>
    <lastBuildDate>${all[0] ? pubDate(all[0].date) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
