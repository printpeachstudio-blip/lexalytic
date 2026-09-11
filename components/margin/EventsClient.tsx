'use client'

import React, { useState, useMemo, useTransition } from 'react'
import { type Site, type EventRow, type Dish, EVENT_KINDS, money, money2, fmtDate, todayStr } from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import { saveEvent, deleteEvent } from '@/app/margin/actions'

const AMBER = '#C17D2E'
const INK = '#1A1815'

export default function EventsClient({
  site, events, dishes,
}: { site: Site; events: EventRow[]; dishes: Dish[] }) {
  const [filter, setFilter] = useState<string>('all')
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const stats = useMemo(() => {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 90)
    const recent = events.filter(e => new Date(e.occurred_on + 'T00:00:00') >= cutoff)
    const byKind: Record<string, { count: number; value: number }> = {}
    recent.forEach(e => {
      const c = byKind[e.kind] || { count: 0, value: 0 }
      c.count += 1; c.value += Number(e.value)
      byKind[e.kind] = c
    })
    const total = recent.reduce((s, e) => s + Number(e.value), 0)
    const last = events[0]
    const daysSince = last
      ? Math.floor((Date.now() - new Date(last.occurred_on + 'T00:00:00').getTime()) / 86400000)
      : null
    // How many of the last 30 days have an entry
    const days = new Set(recent
      .filter(e => new Date(e.occurred_on + 'T00:00:00') >= new Date(Date.now() - 30 * 86400000))
      .map(e => e.occurred_on))
    return { recent, byKind, total, daysSince, coverage: days.size }
  }, [events])

  const shown = filter === 'all' ? events : events.filter(e => e.kind === filter)

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
        .e-row { display: grid; grid-template-columns: 110px 150px 1fr 100px 70px;
          gap: 14px; align-items: baseline; padding: 12px 0; border-bottom: 1px solid #F4F0E8; }
        @media (max-width: 820px) { .e-row { grid-template-columns: 1fr 1fr; gap: 6px; } }
      `}</style>

      <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
        The log
      </h1>
      <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 8px', maxWidth: 680 }}>
        Waste, comps, discounts and staff meals, recorded as they happen. Operationally this tells you
        where stock is going. The other use is that it explains a margin sitting below benchmark, and a
        record written at the time carries far more weight than the same figure estimated a year later.
      </p>
      <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, margin: '0 0 22px', maxWidth: 680 }}>
        Entries cannot be edited once saved, only removed. That is deliberate.
      </p>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Quick add, always visible because friction kills this */}
      <div className="m-card ev-form" style={{ padding: 22, marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 14, marginBottom: 14 }}>
          <div>
            <label className="m-label">Date</label>
            <input name="occurred_on" type="date" max={todayStr()} className="m-in" defaultValue={todayStr()} />
          </div>
          <div>
            <label className="m-label">What kind</label>
            <select name="kind" className="m-sel" defaultValue="waste">
              {Object.entries(EVENT_KINDS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="m-label">Value</label>
            <input name="value" type="number" step="0.01" className="m-in" placeholder="Cost, not menu price" />
          </div>
          <div>
            <label className="m-label">Dish</label>
            <select name="dish_id" className="m-sel" defaultValue="">
              <option value="">Not specific</option>
              {dishes.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 14, marginBottom: 16 }} className="ev-desc">
          <div>
            <label className="m-label">What happened</label>
            <input name="description" className="m-in"
              placeholder="Two portions of salmon past date, binned" />
          </div>
          <div>
            <label className="m-label">Signed off by</label>
            <input name="signed_off" className="m-in" placeholder="Optional, but worth it" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="m-btn" disabled={pending} onClick={e => {
            const wrap = e.currentTarget.closest('.ev-form') as HTMLElement
            const fd = new FormData()
            wrap.querySelectorAll('input, select').forEach((x: any) => {
              if (x.name) fd.append(x.name, x.value)
            })
            run(async () => {
              const r = await saveEvent(site.id, fd)
              if (!r?.error) {
                ;(wrap.querySelector('input[name=description]') as HTMLInputElement).value = ''
                ;(wrap.querySelector('input[name=value]') as HTMLInputElement).value = ''
              }
              return r
            })
          }}>{pending ? 'Saving…' : 'Add to the log'}</button>
          <span style={{ fontSize: 12.5, color: '#8A8279' }}>
            Value at cost rather than menu price, since that is what actually left the building.
          </span>
        </div>
      </div>

      {/* Summary */}
      {stats.recent.length > 0 && (
        <div className="m-card" style={{ padding: '24px 28px', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 34, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <div className="m-serif" style={{ fontSize: 26, lineHeight: 1, color: '#57514A' }}>
                {money(stats.total)}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6 }}>Logged, last 90 days</div>
            </div>
            <div>
              <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1, color: '#57514A' }}>
                {stats.recent.length}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Entries</div>
            </div>
            <div>
              <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1,
                color: stats.coverage < 10 ? '#8F6318' : '#3F6B4C' }}>
                {stats.coverage}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                Days with an entry, last 30
              </div>
            </div>
            {stats.daysSince !== null && (
              <div>
                <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1,
                  color: stats.daysSince > 14 ? '#A13B2A' : '#57514A' }}>
                  {stats.daysSince}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Days since the last one</div>
              </div>
            )}
          </div>

          <div style={{ paddingTop: 14, borderTop: '1px solid #F0EBE2', display: 'flex',
            gap: 26, flexWrap: 'wrap' }}>
            {Object.entries(stats.byKind).sort((a, b) => b[1].value - a[1].value).map(([kind, v]) => (
              <div key={kind}>
                <div style={{ fontSize: 16, color: '#57514A' }}>{money(v.value)}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 2 }}>
                  {EVENT_KINDS[kind as keyof typeof EVENT_KINDS]} · {v.count}
                </div>
              </div>
            ))}
          </div>

          {stats.coverage < 10 && (
            <div style={{ marginTop: 16, padding: '13px 16px', borderRadius: 6,
              background: 'rgba(176,122,30,0.07)', border: '1px solid rgba(176,122,30,0.22)',
              fontSize: 13.5, color: '#8F6318', lineHeight: 1.7 }}>
              Only {stats.coverage} of the last 30 days have an entry. A log with gaps in it is much
              weaker as evidence than one that runs continuously, because gaps invite the question of
              what was happening on the other days.
            </div>
          )}
        </div>
      )}

      {/* Filter */}
      {events.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {[['all', `All ${events.length}`], ...Object.entries(EVENT_KINDS)
            .filter(([k]) => events.some(e => e.kind === k))
            .map(([k, v]) => [k, v] as [string, string])].map(([k, label]) => (
            <button key={k} onClick={() => setFilter(k)}
              style={{ font: 'inherit', fontSize: 13.5, padding: '7px 14px', borderRadius: 6,
                cursor: 'pointer', border: '1px solid ' + (filter === k ? INK : '#DDD6CC'),
                background: filter === k ? INK : '#fff', color: filter === k ? '#fff' : '#4A453F' }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Entries */}
      {shown.length > 0 ? (
        <div className="m-card" style={{ padding: '18px 26px' }}>
          {shown.map(e => (
            <div key={e.id} className="e-row">
              <div style={{ fontSize: 13.5, color: '#57514A' }}>{fmtDate(e.occurred_on)}</div>
              <div style={{ fontSize: 13.5, color: '#8A8279' }}>
                {EVENT_KINDS[e.kind]}
              </div>
              <div style={{ fontSize: 14 }}>
                {e.description}
                {e.dish_id && (
                  <span style={{ color: '#8A8279', fontSize: 13 }}>
                    {' '}· {dishes.find(d => d.id === e.dish_id)?.name || 'dish'}
                  </span>
                )}
                {e.signed_off && (
                  <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 2 }}>
                    Signed off by {e.signed_off}
                  </div>
                )}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{money2(Number(e.value))}</div>
              <div style={{ textAlign: 'right' }}>
                <button className="m-link" style={{ fontSize: 13, color: '#8A8279' }}
                  onClick={() => { if (confirm('Remove this entry?')) run(() => deleteEvent(e.id)) }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="m-card" style={{ padding: '26px 30px', fontSize: 15, color: '#57514A', lineHeight: 1.75 }}>
          Nothing logged yet. The habit is worth more than the completeness: a short entry every day beats
          a detailed one once a month, because it is the continuity that makes it credible.
        </div>
      ) : null}
    </div>
  )
}
