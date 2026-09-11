'use client'

import React, { useState, useMemo, useTransition } from 'react'
import { type Site, type SessionRow, CONCEPTS, money, money2, pct, fmtDate, todayStr, trueHourly } from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import { saveSession, deleteSession } from '@/app/margin/actions'

const INK = '#1A1815'

const DAYPARTS = ['breakfast', 'lunch', 'afternoon', 'evening', 'late']

export default function SessionsClient({
  site, sessions, gpPct,
}: { site: Site; sessions: SessionRow[]; gpPct: number }) {
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const gp = gpPct / 100
  const concept = CONCEPTS[site.concept]

  const rows = useMemo(() => sessions.map(s => ({
    s,
    contribution: (Number(s.sales) * gp) - Number(s.labour_cost),
    salesPerHour: Number(s.staff_hours) > 0 ? Number(s.sales) / Number(s.staff_hours) : 0,
  })), [sessions, gp])

  // Averages by daypart, which is where the pattern shows
  const byDaypart = useMemo(() => {
    const m: Record<string, { count: number; sales: number; labour: number; contribution: number }> = {}
    rows.forEach(r => {
      const k = r.s.daypart
      const cur = m[k] || { count: 0, sales: 0, labour: 0, contribution: 0 }
      cur.count += 1
      cur.sales += Number(r.s.sales)
      cur.labour += Number(r.s.labour_cost)
      cur.contribution += r.contribution
      m[k] = cur
    })
    return Object.entries(m).map(([k, v]) => ({
      daypart: k, ...v,
      avgContribution: v.contribution / v.count,
      labourPct: v.sales > 0 ? (v.labour / v.sales) * 100 : 0,
    })).sort((a, b) => a.avgContribution - b.avgContribution)
  }, [rows])

  const totals = useMemo(() => {
    const sales = rows.reduce((a, r) => a + Number(r.s.sales), 0)
    const labour = rows.reduce((a, r) => a + Number(r.s.labour_cost), 0)
    const contribution = rows.reduce((a, r) => a + r.contribution, 0)
    const negative = rows.filter(r => r.contribution < 0)
    return { sales, labour, contribution, negative,
      labourPct: sales > 0 ? (labour / sales) * 100 : 0 }
  }, [rows])

  const run = (fn: () => Promise<any>) => {
    setError('')
    start(async () => {
      const res = await fn()
      if (res?.error) setError(res.error)
    })
  }

  return (
    <div className="m-wrap" style={{ paddingTop: 36 }}>
      <style>{MARGIN_STYLES}</style>
      <style>{`
        .s-row { display: grid; grid-template-columns: 1.3fr 100px 100px 90px 1fr 70px;
          gap: 14px; align-items: center; padding: 13px 0; border-bottom: 1px solid #F4F0E8; }
        @media (max-width: 860px) { .s-row { grid-template-columns: 1fr 1fr; gap: 6px; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
          Sessions
        </h1>
        {!adding && <button className="m-link" onClick={() => setAdding(true)}>Record a session</button>}
      </div>
      <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 22px', maxWidth: 660 }}>
        Contribution is gross profit on the sales less what the labour actually cost, which is around 26
        per cent above the hourly rate once holiday accrual, employer National Insurance and pension are
        in. An hour at £13.20 costs {money2(trueHourly(13.2))}.
      </p>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {(adding || sessions.length === 0) && (
        <div className="m-card ss-form" style={{ padding: 22, marginBottom: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 14, marginBottom: 16 }}>
            <div>
              <label className="m-label">Date</label>
              <input name="trade_date" type="date" max={todayStr()} className="m-in"
                defaultValue={todayStr()} />
            </div>
            <div>
              <label className="m-label">Session</label>
              <select name="daypart" className="m-sel" defaultValue="evening">
                {DAYPARTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="m-label">Sales</label>
              <input name="sales" type="number" step="0.01" className="m-in" />
            </div>
            <div>
              <label className="m-label">Staff hours</label>
              <input name="staff_hours" type="number" step="0.5" className="m-in" />
            </div>
            <div>
              <label className="m-label">Average rate</label>
              <input name="avg_rate" type="number" step="0.01" className="m-in" defaultValue="13.00" />
            </div>
            <div>
              <label className="m-label">Covers</label>
              <input name="covers" type="number" className="m-in" />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="m-label">Notes</label>
            <input name="notes" className="m-in" placeholder="Optional. Bank holiday, roadworks, a big table." />
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="m-btn" disabled={pending} onClick={e => {
              const wrap = e.currentTarget.closest('.ss-form') as HTMLElement
              const fd = new FormData()
              wrap.querySelectorAll('input, select').forEach((x: any) => {
                if (x.name) fd.append(x.name, x.value)
              })
              run(async () => {
                const r = await saveSession(site.id, fd)
                if (!r?.error) {
                  wrap.querySelectorAll('input').forEach((x: any) => {
                    if (['sales','staff_hours','covers','notes'].includes(x.name)) x.value = ''
                  })
                }
                return r
              })
            }}>{pending ? 'Saving…' : 'Save session'}</button>
            {sessions.length > 0 && (
              <button className="m-link" style={{ color: '#8A8279' }}
                onClick={() => setAdding(false)}>Done</button>
            )}
            <span style={{ fontSize: 12.5, color: '#8A8279' }}>
              Recording the same date and session again replaces it.
            </span>
          </div>
        </div>
      )}

      {rows.length > 0 && (
        <>
          <div className="m-card" style={{ padding: '24px 28px', marginBottom: 20,
            background: totals.negative.length ? 'rgba(161,59,42,0.04)' : '#fff',
            borderColor: totals.negative.length ? 'rgba(161,59,42,0.22)' : '#E8E2D8' }}>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <div className="m-serif" style={{ fontSize: 28, lineHeight: 1,
                  color: totals.contribution >= 0 ? '#3F6B4C' : '#A13B2A' }}>
                  {money(totals.contribution)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6 }}>
                  Contribution across {rows.length} session{rows.length === 1 ? '' : 's'}
                </div>
              </div>
              <div>
                <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1,
                  color: totals.labourPct > 35 ? '#A13B2A' : '#57514A' }}>
                  {pct(totals.labourPct)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                  Labour, typically 30 to 33
                </div>
              </div>
              <div>
                <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1, color: '#57514A' }}>
                  {money(totals.labour)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Real labour cost</div>
              </div>
              <div>
                <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1,
                  color: totals.negative.length ? '#A13B2A' : '#C4BDB2' }}>
                  {totals.negative.length}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Losing money</div>
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.06)',
              fontSize: 14, color: '#57514A', lineHeight: 1.7 }}>
              Using {pct(gpPct)} gross profit. Fixed costs of {money(Number(site.fixed_weekly))} a week
              still come out of the contribution above, so a session covering its own labour is not the
              same as a session paying for itself.
            </div>
          </div>

          {byDaypart.length > 1 && (
            <div className="m-card" style={{ padding: '22px 26px', marginBottom: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Which sessions carry it</div>
              <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 14 }}>
                Averaged across everything recorded, worst first.
              </div>
              {byDaypart.map(d => (
                <div key={d.daypart} style={{ display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) 120px 100px 130px', gap: 14,
                  padding: '9px 0', fontSize: 14, alignItems: 'baseline',
                  borderBottom: '1px solid #F7F4EF' }}>
                  <div style={{ textTransform: 'capitalize', fontWeight: 500 }}>
                    {d.daypart}
                    <span style={{ color: '#8A8279', fontWeight: 400, fontSize: 13 }}> · {d.count}</span>
                  </div>
                  <div style={{ fontWeight: 600,
                    color: d.avgContribution < 0 ? '#A13B2A' : '#3F6B4C' }}>
                    {money(d.avgContribution)}
                    <span style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}> avg</span>
                  </div>
                  <div style={{ color: d.labourPct > 40 ? '#A13B2A' : '#57514A' }}>
                    {pct(d.labourPct)}
                  </div>
                  <div style={{ fontSize: 13, color: '#8A8279' }}>
                    {d.avgContribution < 0 ? 'Costs more than it earns'
                      : d.labourPct > 40 ? 'Thin, tips over on a quiet week'
                      : 'Contributing'}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="m-card" style={{ padding: '20px 26px' }}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Everything recorded</div>
            {rows.map(r => (
              <div key={r.s.id} className="s-row">
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 500, textTransform: 'capitalize' }}>
                    {fmtDate(r.s.trade_date)} {r.s.daypart}
                  </div>
                  {r.s.notes && (
                    <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 2 }}>{r.s.notes}</div>
                  )}
                </div>
                <div style={{ fontSize: 14 }}>
                  {money(Number(r.s.sales))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>
                    {r.s.covers ? `${r.s.covers} covers` : 'sales'}
                  </div>
                </div>
                <div style={{ fontSize: 14 }}>
                  {money(Number(r.s.labour_cost))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>{r.s.staff_hours} hrs</div>
                </div>
                <div style={{ fontSize: 14, color: Number(r.s.labour_pct) > 40 ? '#A13B2A' : '#57514A' }}>
                  {pct(r.s.labour_pct)}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>labour</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600,
                  color: r.contribution < 0 ? '#A13B2A' : '#3F6B4C' }}>
                  {money(r.contribution)}
                  <div style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}>
                    {money2(r.salesPerHour)} per hour worked
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button className="m-link" style={{ fontSize: 13, color: '#8A8279' }}
                    onClick={() => { if (confirm('Remove this session?')) run(() => deleteSession(r.s.id)) }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
