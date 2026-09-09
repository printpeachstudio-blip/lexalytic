import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const AMBER = '#C17D2E'

interface QueueRow {
  job_id: string
  org_id: string
  ref: string
  contractor: string | null
  stage: 'first' | 'final'
  due_on: string
  days_away: number
  amount: number
  reminder_email: string | null
  reminders_enabled: boolean
  org_name: string
}

function money(n: number) {
  return '£' + Number(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmt(d: string) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function subjectFor(rows: QueueRow[]): string {
  const overdue = rows.filter(r => r.days_away < 0)
  if (overdue.length) {
    const total = overdue.reduce((s, r) => s + Number(r.amount), 0)
    return `${money(total)} of retention is overdue`
  }
  const soonest = rows.reduce((a, b) => (a.days_away < b.days_away ? a : b))
  if (soonest.days_away === 0) return `Retention on ${soonest.ref} is due today`
  return `Retention due in ${soonest.days_away} days on ${soonest.ref}`
}

function bodyFor(rows: QueueRow[], orgName: string): string {
  const line = (r: QueueRow) => {
    const late = r.days_away < 0
    const when = late
      ? `${Math.abs(r.days_away)} days overdue, fell due ${fmt(r.due_on)}`
      : r.days_away === 0 ? `due today` : `due in ${r.days_away} days, ${fmt(r.due_on)}`
    return `
      <tr>
        <td style="padding:10px 6px;border-bottom:1px solid #EDE7DD;">
          <strong style="color:#1A1815;">${r.ref}</strong><br/>
          <span style="color:#8A8279;font-size:13px;">${r.contractor || 'No contractor recorded'} · ${r.stage === 'first' ? 'First release' : 'Final release'}</span>
        </td>
        <td style="padding:10px 6px;border-bottom:1px solid #EDE7DD;text-align:right;white-space:nowrap;">
          <strong style="color:${late ? '#A13B2A' : '#1A1815'};">${money(r.amount)}</strong><br/>
          <span style="color:${late ? '#A13B2A' : '#8A8279'};font-size:13px;">${when}</span>
        </td>
      </tr>`
  }

  const total = rows.reduce((s, r) => s + Number(r.amount), 0)
  const anyOverdue = rows.some(r => r.days_away < 0)

  return `
<div style="background:#FDFCFA;padding:36px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E8E2D8;border-radius:10px;overflow:hidden;">
    <div style="padding:22px 30px;border-bottom:1px solid #E8E2D8;">
      <span style="font-family:Georgia,serif;font-size:19px;letter-spacing:-0.02em;color:#1A1815;">Lex<span style="color:${AMBER};">alytic</span></span>
      <span style="font-size:13px;color:#8A8279;margin-left:10px;">Retention Manager</span>
    </div>

    <div style="padding:30px;">
      <h1 style="font-family:Georgia,serif;font-size:21px;font-weight:400;color:#1A1815;margin:0 0 8px;">
        ${anyOverdue ? 'Retention is past its release date' : 'Retention coming up'}
      </h1>
      <p style="font-size:15px;line-height:1.7;color:#57514A;margin:0 0 20px;">
        ${money(total)} across ${rows.length} release${rows.length === 1 ? '' : 's'} for ${orgName}.
      </p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">${rows.map(line).join('')}</table>

      ${anyOverdue ? `<p style="font-size:14px;line-height:1.7;color:#57514A;margin:0 0 20px;">
        Statutory interest at eight points over base is recoverable on anything past its due date, and
        pay when paid is not a defence to withholding retention.
      </p>` : ''}

      <a href="https://www.lexalytic.com/app" style="display:inline-block;background:${AMBER};color:#ffffff;font-size:15px;font-weight:500;text-decoration:none;padding:12px 24px;border-radius:6px;">
        ${anyOverdue ? 'Generate an application' : 'Open the tracker'}
      </a>
    </div>

    <div style="padding:18px 30px;border-top:1px solid #E8E2D8;background:#FDFCFA;">
      <p style="font-size:12px;line-height:1.6;color:#8A8279;margin:0;">
        You are getting this because reminders are on for ${orgName}.
        Turn them off in <a href="https://www.lexalytic.com/app/settings" style="color:${AMBER};">settings</a>.
      </p>
    </div>
  </div>
</div>`
}

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }

  const supabase = createAdminClient()

  const { data, error } = await supabase.from('reminder_queue').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const rows = (data ?? []) as QueueRow[]

  // Skip anything already sent for this job, stage and threshold
  const { data: already } = await supabase
    .from('reminders_sent')
    .select('job_id, stage, days_before')

  const seen = new Set((already ?? []).map((r: any) => `${r.job_id}|${r.stage}|${r.days_before}`))
  const due = rows.filter(r =>
    r.reminders_enabled &&
    r.reminder_email &&
    !seen.has(`${r.job_id}|${r.stage}|${r.days_away}`)
  )

  if (!due.length) {
    return NextResponse.json({ sent: 0, checked: rows.length })
  }

  // One email per recipient rather than one per job
  const byEmail: Record<string, QueueRow[]> = {}
  due.forEach(r => { (byEmail[r.reminder_email!] = byEmail[r.reminder_email!] || []).push(r) })

  let sent = 0
  const failures: string[] = []

  for (const [to, items] of Object.entries(byEmail)) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Lexalytic <reminders@lexalytic.com>',
          to: [to],
          subject: subjectFor(items),
          html: bodyFor(items, items[0].org_name),
        }),
      })
      if (!res.ok) throw new Error(await res.text())

      await supabase.from('reminders_sent').insert(
        items.map(r => ({
          job_id: r.job_id, stage: r.stage, days_before: r.days_away, sent_to: to,
        }))
      )
      sent += items.length
    } catch (e: any) {
      failures.push(`${to}: ${String(e?.message || e).slice(0, 120)}`)
    }
  }

  return NextResponse.json({ sent, recipients: Object.keys(byEmail).length, failures })
}
