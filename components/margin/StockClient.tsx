'use client'

import React, { useState, useMemo, useTransition } from 'react'
import { type Site, type Stocktake, money, money2, pct, fmtDate, todayStr } from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import { saveStocktake, deleteStocktake } from '@/app/margin/actions'

const INK = '#1A1815'

export default function StockClient({
  site, stocktakes,
}: { site: Site; stocktakes: Stocktake[] }) {
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const stats = useMemo(() => {
    const withVariance = stocktakes.filter(s => s.variance_pct !== null)
    if (!withVariance.length) return null
    const latest = withVariance[0]
    const avg = withVariance.reduce((a, s) => a + Number(s.variance_pct), 0) / withVariance.length
    const totalLost = withVariance.reduce((a, s) => a + Math.max(0, Number(s.variance)), 0)
    // Direction of travel across the last few
    const recent = withVariance.slice(0, 3)
    const older = withVariance.slice(3, 6)
    const recentAvg = recent.length
      ? recent.reduce((a, s) => a + Number(s.variance_pct), 0) / recent.length : null
    const olderAvg = older.length
      ? older.reduce((a, s) => a + Number(s.variance_pct), 0) / older.length : null
    const trend = recentAvg !== null && olderAvg !== null ? recentAvg - olderAvg : null
    return { latest, avg, totalLost, trend, count: withVariance.length }
  }, [stocktakes])

  const run = (fn: () => Promise<any>) => {
    setError('')
    start(async () => {
      const res = await fn()
      if (res?.error) setError(res.error)
    })
  }

  const verdict = (v: number) => {
    const a = Math.abs(v)
    if (a < 1) return { label: 'Tight', color: '#3F6B4C' }
    if (a <= 2) return { label: 'Normal', color: '#3F6B4C' }
    if (a <= 3) return { label: 'Watch it', color: '#8F6318' }
    if (a <= 5) return { label: 'Investigate', color: '#A13B2A' }
    return { label: 'Something is wrong', color: '#A13B2A' }
  }

  return (
    <div className="m-wrap" style={{ paddingTop: 36 }}>
      <style>{MARGIN_STYLES}</style>
      <style>{`
        .st-row { display: grid; grid-template-columns: 130px 120px 120px 110px 1fr 70px;
          gap: 14px; align-items: baseline; padding: 13px 0; border-bottom: 1px solid #F4F0E8; }
        @media (max-width: 860px) { .st-row { grid-template-columns: 1fr 1fr; gap: 6px; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
          Stock
        </h1>
        {!adding && <button className="m-link" onClick={() => setAdding(true)}>Record a stocktake</button>}
      </div>
      <p style={{ fontSize: 15, color: '#8A8279', lineHeight: 1.7, margin: '0 0 22px', maxWidth: 680 }}>
        Variance is the gap between the stock that should have gone, based on what you sold, and the
        stock that actually went. Most sites count it and file it. The number that matters is the trend,
        because a variance that is growing is a different problem from one that is steady.
      </p>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {(adding || stocktakes.length === 0) && (
        <div className="m-card sk-form" style={{ padding: 22, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 14, marginBottom: 14 }}>
            <div>
              <label className="m-label">Date counted</label>
              <input name="taken_on" type="date" max={todayStr()} className="m-in" defaultValue={todayStr()} />
            </div>
            <div>
              <label className="m-label">Opening stock</label>
              <input name="opening_value" type="number" step="0.01" className="m-in" />
              <div style={{ fontSize: 11.5, color: '#8A8279', marginTop: 3 }}>Value at the last count</div>
            </div>
            <div>
              <label className="m-label">Purchases since</label>
              <input name="purchases" type="number" step="0.01" className="m-in" />
            </div>
            <div>
              <label className="m-label">Closing stock</label>
              <input name="closing_value" type="number" step="0.01" className="m-in" />
              <div style={{ fontSize: 11.5, color: '#8A8279', marginTop: 3 }}>What you just counted</div>
            </div>
            <div>
              <label className="m-label">Sales at cost</label>
              <input name="sales_at_cost" type="number" step="0.01" className="m-in" />
              <div style={{ fontSize: 11.5, color: '#8A8279', marginTop: 3 }}>
                Theoretical usage from the till
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="m-label">Notes</label>
            <input name="notes" className="m-in"
              placeholder="Optional. A delivery that arrived after the count, a function, a new chef." />
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="m-btn" disabled={pending} onClick={e => {
              const wrap = e.currentTarget.closest('.sk-form') as HTMLElement
              const fd = new FormData()
              wrap.querySelectorAll('input').forEach((x: any) => { if (x.name) fd.append(x.name, x.value) })
              run(async () => {
                const r = await saveStocktake(site.id, fd)
                if (!r?.error) setAdding(false)
                return r
              })
            }}>{pending ? 'Saving…' : 'Save stocktake'}</button>
            {stocktakes.length > 0 && (
              <button className="m-link" style={{ color: '#8A8279' }}
                onClick={() => setAdding(false)}>Cancel</button>
            )}
          </div>
          <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 12, lineHeight: 1.6, maxWidth: 620 }}>
            Sales at cost is what your till says you should have used. If you have costed your dishes,
            that is the sum of each dish cost multiplied by how many went out.
          </div>
        </div>
      )}

      {stats && (
        <div className="m-card" style={{ padding: '24px 28px', marginBottom: 20,
          background: Math.abs(Number(stats.latest.variance_pct)) > 3 ? 'rgba(161,59,42,0.04)' : '#fff',
          borderColor: Math.abs(Number(stats.latest.variance_pct)) > 3
            ? 'rgba(161,59,42,0.22)' : '#E8E2D8' }}>
          <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <div className="m-serif" style={{ fontSize: 28, lineHeight: 1,
                color: verdict(Number(stats.latest.variance_pct)).color }}>
                {pct(Number(stats.latest.variance_pct))}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6 }}>
                Latest variance · {verdict(Number(stats.latest.variance_pct)).label}
              </div>
            </div>
            <div>
              <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1, color: '#57514A' }}>
                {money(Math.abs(Number(stats.latest.variance)))}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                {Number(stats.latest.variance) > 0 ? 'More used than sold' : 'Less used than sold'}
              </div>
            </div>
            <div>
              <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1, color: '#57514A' }}>
                {pct(stats.avg)}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                Average across {stats.count}
              </div>
            </div>
            {stats.trend !== null && (
              <div>
                <div className="m-serif" style={{ fontSize: 21, lineHeight: 1.1,
                  color: stats.trend > 0.5 ? '#A13B2A' : stats.trend < -0.5 ? '#3F6B4C' : '#57514A' }}>
                  {stats.trend > 0 ? '+' : ''}{stats.trend.toFixed(1)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                  Points against earlier counts
                </div>
              </div>
            )}
          </div>

          <div style={{ paddingTop: 14, borderTop: '1px solid #F0EBE2',
            fontSize: 14.5, color: '#57514A', lineHeight: 1.75, maxWidth: 700 }}>
            {Math.abs(Number(stats.latest.variance_pct)) <= 2 ? (
              <>Under two points is normal and covers ordinary waste, spillage and small counting errors.
              Nothing here needs chasing.</>
            ) : Math.abs(Number(stats.latest.variance_pct)) <= 5 ? (
              <>Between three and five points is worth investigating. The usual causes are portioning that
              has drifted, stock going out without being rung through, a delivery counted in the wrong
              period, or dish costs that are out of date so the theoretical figure is wrong.</>
            ) : (
              <>Above five points is not ordinary waste. Either something is leaving without being
              recorded, or the theoretical figure is badly wrong because dish costs have not been updated.
              Check the second before assuming the first.</>
            )}
            {stats.trend !== null && stats.trend > 0.5 && (
              <> The variance has widened by {stats.trend.toFixed(1)} points against earlier counts, which
              matters more than the absolute figure. Something changed.</>
            )}
          </div>
        </div>
      )}

      {stocktakes.length > 0 && (
        <div className="m-card" style={{ padding: '20px 26px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>Every count</div>
          {stocktakes.map(s => {
            const v = s.variance_pct !== null ? verdict(Number(s.variance_pct)) : null
            return (
              <div key={s.id} className="st-row">
                <div style={{ fontSize: 14, fontWeight: 500 }}>{fmtDate(s.taken_on)}</div>
                <div style={{ fontSize: 14 }}>
                  {money(Number(s.actual_usage))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>actually used</div>
                </div>
                <div style={{ fontSize: 14 }}>
                  {money(Number(s.sales_at_cost))}
                  <div style={{ fontSize: 12, color: '#8A8279' }}>should have used</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: v?.color || '#57514A' }}>
                  {pct(s.variance_pct)}
                  <div style={{ fontSize: 12, fontWeight: 400, color: '#8A8279' }}>
                    {money(Math.abs(Number(s.variance)))}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: '#8A8279' }}>
                  {s.notes || (v ? v.label : '')}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button className="m-link" style={{ fontSize: 13, color: '#8A8279' }}
                    onClick={() => { if (confirm('Remove this count?')) run(() => deleteStocktake(s.id)) }}>
                    Remove
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
