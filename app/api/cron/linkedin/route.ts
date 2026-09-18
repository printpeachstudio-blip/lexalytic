import { NextResponse } from 'next/server'

/**
 * LinkedIn posting, moved off GitHub Actions.
 *
 * The GitHub schedule failed three days running in September 2026 while the
 * same workflow ran fine when triggered by hand, which is GitHub declining to
 * fire scheduled jobs rather than anything wrong with the script. They make no
 * guarantee about it, so there is nothing to fix on that side.
 *
 * Vercel cron on the Hobby plan runs once a day, which is enough: this checks
 * whether today has a post and does nothing if it does not. That covers the
 * Tuesday, Wednesday and Thursday schedule without needing three jobs.
 *
 * A direct port of scripts/post-linkedin.py, including the legacy Assets API
 * for images, which is what works with a w_member_social token.
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const MEMBER_ID = '7wmU65vVm_'
const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']

/** Parse the posts file into a map of date to text. */
function parsePosts(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  let date: string | null = null
  let lines: string[] = []
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (t.startsWith('#')) continue
    if (t.length === 10 && t[4] === '-' && t[7] === '-') {
      if (date && lines.length) out[date] = lines.join('\n').trim()
      date = t
      lines = []
    } else if (date) {
      lines.push(line)
    }
  }
  if (date && lines.length) out[date] = lines.join('\n').trim()
  return out
}

export async function GET(request: Request) {
  // Vercel sends the cron secret as a bearer token
  const auth = request.headers.get('authorization')
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 })
  }

  const token = process.env.LINKEDIN_ACCESS_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'no LINKEDIN_ACCESS_TOKEN' }, { status: 500 })
  }

  const base = 'https://www.lexalytic.com'
  const today = new Date().toISOString().slice(0, 10)

  // the posts file is served from public so it is always in the deployment
  let raw: string
  try {
    const r = await fetch(`${base}/linkedin-posts.txt`, { cache: 'no-store' })
    if (!r.ok) throw new Error(String(r.status))
    raw = await r.text()
  } catch (e) {
    return NextResponse.json({ error: 'could not read the posts file' }, { status: 500 })
  }

  const text = parsePosts(raw)[today]
  if (!text) {
    return NextResponse.json({ ok: true, message: `nothing scheduled for ${today}` })
  }

  // ---- the image, if there is one for today ----
  const d = new Date()
  const name = `post-${MONTHS[d.getMonth()]}${String(d.getDate()).padStart(2, '0')}.png`
  let assetUrn: string | null = null

  try {
    const img = await fetch(`${base}/post-images/${name}`, { cache: 'no-store' })
    if (img.ok) {
      const bytes = await img.arrayBuffer()

      const reg = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:person:${MEMBER_ID}`,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent',
            }],
          },
        }),
      })

      if (reg.ok) {
        const rd = await reg.json()
        const uploadUrl = rd.value.uploadMechanism[
          'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl
        const up = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'image/png' },
          body: bytes,
        })
        if (up.ok) assetUrn = rd.value.asset
      }
    }
  } catch {
    // an image failure is never a reason not to post
  }

  // ---- the post ----
  const share: Record<string, unknown> = assetUrn
    ? {
        shareCommentary: { text },
        shareMediaCategory: 'IMAGE',
        media: [{
          status: 'READY',
          description: { text: 'Lexalytic' },
          media: assetUrn,
          title: { text: 'Lexalytic' },
        }],
      }
    : { shareCommentary: { text }, shareMediaCategory: 'NONE' }

  const res = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:person:${MEMBER_ID}`,
      lifecycleState: 'PUBLISHED',
      specificContent: { 'com.linkedin.ugc.ShareContent': share },
      visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' },
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    // LinkedIn rejects an identical post within a window, which is not a failure
    if (body.includes('DUPLICATE_POST')) {
      return NextResponse.json({ ok: true, message: 'already posted today' })
    }
    return NextResponse.json({ error: body.slice(0, 400), status: res.status }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    date: today,
    withImage: Boolean(assetUrn),
    preview: text.slice(0, 80),
  })
}
