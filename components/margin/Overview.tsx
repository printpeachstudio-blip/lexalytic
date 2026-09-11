'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import {
  type Site, type Dish, type SessionRow, type EventRow, type Stocktake,
  type Channel, type DishSale, CONCEPTS, EVENT_KINDS,
  money, money2, pct, fmtDate, channelMargin, classify, QUADRANTS,
} from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'

const AMBER = '#C17D2E'
const INK = '#1A1815'

interface Period {
  id: string
  period_start: string
  period_end: string
  turnover: number
  cost_of_sales: number
  wages: number
  other_costs: number
  cash_pct: number
}

interface Attention {
  level: 'high' | 'medium' | 'low'
  title: string
  detail: string
  href?: string
}

export default function Overview({
  site, sites, dishes, sessions, events, stocktakes, channels, periods, sales,
}: {
  site: Site; sites: Site[]; dishes: Dish[]; sessions: SessionRow[]
  events: EventRow[]; stocktakes: Stocktake[]; channels: Channel[]
  periods: Period[]; sales: DishSale[]
}) {
  const concept = CONCEPTS[site.concept]

  // ---- current benchmark position from the most recent period ----
  const position = useMemo(() => {
    const p = periods[0]
    if (!p || !p.turnover) return null
    const gp = ((p.turnover - p.cost_of_sales) / p.turnover) * 100
    const net = ((p.turnover - p.cost_of_sales - p.wages - p.other_costs) / p.turnover) * 100
    const prime = ((p.cost_of_sales + p.wages) / p.turnover) * 100
    const prev = periods[1]
    const prevGp = prev && prev.turnover
      ? ((prev.turnover - prev.cost_of_sales) / prev.turnover) * 100 : null
    return { p, gp, net, prime, prevGp, trend: prevGp !== null ? gp - prevGp : null }
  }, [periods])

  // ---- dish level ----
  const dishStats = useMemo(() => {
    const priced = dishes.filter(d => !d.is_component && d.menu_price > 0 && d.gp_pct !== null)
    if (!priced.length) return null

    const salesByDish: Record<string, { dineIn: number; delivery: number }> = {}
    sales.forEach(s => {
      const cur = salesByDish[s.dish_id] || { dineIn: 0, delivery: 0 }
      cur.dineIn += s.dine_in_qty
      cur.delivery += s.delivery_qty
      salesByDish[s.dish_id] = cur
    })

    const withVol = priced.map(d => {
      const v = salesByDish[d.id] || { dineIn: 0, delivery: 0 }
      return { dish: d, volume: v.dineIn + v.delivery, dineIn: v.dineIn, delivery: v.delivery }
    })

    const avgGp = priced.reduce((s, d) => s + Number(d.gp_pct), 0) / priced.length
    const anyVolume = withVol.some(w => w.volume > 0)
    const avgVol = anyVolume
      ? withVol.reduce((s, w) => s + w.volume, 0) / withVol.length : 0

    const quadrants = anyVolume
      ? withVol.map(w => ({ ...w, q: classify(Number(w.dish.gp_pct), w.volume, avgGp, avgVol) }))
      : []

    // Delivery losses across active channels
    const losing: { dish: Dish; channel: Channel; margin: number; qty: number }[] = []
    channels.forEach(ch => {
      priced.forEach(d => {
        const m = channelMargin(d, ch, site.vat_registered)
        if (m.margin < 0) {
          const v = salesByDish[d.id]?.delivery ?? 0
          losing.push({ dish: d, channel: ch, margin: m.margin, qty: v })
        }
      })
    })
    losing.sort((a, b) => (a.margin * Math.max(a.qty, 1)) - (b.margin * Math.max(b.qty, 1)))

    const belowTarget = site.target_gp
      ? priced.filter(d => Number(d.gp_pct) < Number(site.target_gp))
      : priced.filter(d => Number(d.gp_pct) < concept.gpLow)

    return { priced, avgGp, quadrants, losing, belowTarget, anyVolume }
  }, [dishes, sales, channels, site, concept])

  // ---- sessions, last 7 with data ----
  const sessionStats = useMemo(() => {
    const recent = sessions.slice(0, 14).filter(s => s.sales > 0)
    if (!recent.length) return null
    const gp = position ? position.gp / 100 : (concept.gpLow / 100)
    const withContribution = recent.map(s => ({
      s, contribution: (Number(s.sales) * gp) - Number(s.labour_cost),
    }))
    const negative = withContribution.filter(w => w.contribution < 0)
    const totalSales = recent.reduce((a, s) => a + Number(s.sales), 0)
    const totalLabour = recent.reduce((a, s) => a + Number(s.labour_cost), 0)
    return {
      withContribution, negative,
      labourPct: totalSales > 0 ? (totalLabour / totalSales) * 100 : 0,
      worst: [...withContribution].sort((a, b) => a.contribution - b.contribution)[0],
    }
  }, [sessions, position, concept])

  // ---- evidence log, last 90 days ----
  const logStats = useMemo(() => {
    const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 90)
    const recent = events.filter(e => new Date(e.occurred_on + 'T00:00:00') >= cutoff)
    const byKind: Record<string, number> = {}
    recent.forEach(e => { byKind[e.kind] = (byKind[e.kind] || 0) + Number(e.value) })
    const total = recent.reduce((s, e) => s + Number(e.value), 0)
    const last = events[0]
    const daysSince = last
      ? Math.floor((Date.now() - new Date(last.occurred_on + 'T00:00:00').getTime()) / 86400000)
      : null
    return { recent, byKind, total, daysSince, count: recent.length }
  }, [events])

  const variance = stocktakes[0] ?? null

  // ---- what needs attention ----
  const attention = useMemo(() => {
    const out: Attention[] = []

    if (!dishes.length) {
      out.push({ level: 'medium', title: 'No dishes costed yet',
        detail: 'Everything else follows from knowing what each dish costs. Start with the ten that sell most.',
        href: '/margin/dishes' })
    }

    if (dishStats?.losing.length) {
      const l = dishStats.losing[0]
      out.push({ level: 'high',
        title: `${dishStats.losing.length} ${dishStats.losing.length === 1 ? 'dish loses' : 'dishes lose'} money on delivery`,
        detail: `${l.dish.name} returns ${money2(l.margin)} per order on ${l.channel.name}. Selling more of it makes the position worse, not better.`,
        href: '/margin/dishes' })
    }

    if (position && position.gp < concept.gpLow) {
      out.push({ level: 'high',
        title: `Gross profit ${pct(concept.gpLow - position.gp)} below the range for ${concept.label.toLowerCase()}`,
        detail: `At ${pct(position.gp)} against an expected ${concept.gpLow} to ${concept.gpHigh}%. The evidence log is what explains a gap like this if anyone asks.`,
        href: '/margin/events' })
    }

    if (position?.trend !== null && position?.trend !== undefined && position.trend < -2) {
      out.push({ level: 'medium',
        title: `Gross profit fell ${pct(Math.abs(position.trend))} on the previous period`,
        detail: 'A sudden movement draws more attention than a consistently low figure, so it is worth knowing what changed.',
        href: '/margin/stock' })
    }

    if (sessionStats?.negative.length) {
      const w = sessionStats.worst
      out.push({ level: 'medium',
        title: `${sessionStats.negative.length} recorded ${sessionStats.negative.length === 1 ? 'session costs' : 'sessions cost'} more in labour than they earn`,
        detail: `${fmtDate(w.s.trade_date)} ${w.s.daypart} contributed ${money(w.contribution)}. Trimming the edges is usually better than closing.`,
        href: '/margin/sessions' })
    }

    if (variance && variance.variance_pct !== null && Math.abs(Number(variance.variance_pct)) > 3) {
      out.push({ level: 'high',
        title: `Stock variance at ${pct(Math.abs(Number(variance.variance_pct)))}`,
        detail: `${money(Math.abs(Number(variance.variance)))} more stock was used than sales account for. Under 2% is normal, above 3% is worth investigating.`,
        href: '/margin/stock' })
    }

    if (logStats.daysSince !== null && logStats.daysSince > 14) {
      out.push({ level: 'medium', title: `Nothing logged for ${logStats.daysSince} days`,
        detail: 'A waste log written as it happens is worth a great deal. The same figures estimated later are worth very little.',
        href: '/margin/events' })
    } else if (logStats.daysSince === null) {
      out.push({ level: 'low', title: 'The log is empty',
        detail: 'Waste, comps and discounts recorded as they happen are what explain a margin that sits below benchmark.',
        href: '/margin/events' })
    }

    if (dishStats?.belowTarget.length && dishStats.belowTarget.length > 2) {
      out.push({ level: 'low',
        title: `${dishStats.belowTarget.length} dishes below the target GP`,
        detail: `Against ${site.target_gp ? pct(Number(site.target_gp)) : concept.gpLow + '%'}. The popular ones matter most.`,
        href: '/margin/dishes' })
    }

    const order = { high: 0, medium: 1, low: 2 }
    return out.sort((a, b) => order[a.level] - order[b.level])
  }, [dishes, dishStats, position, sessionStats, variance, logStats, concept, site])

  const TONE = {
    high: { c: '#A13B2A', bg: 'rgba(161,59,42,0.05)', b: 'rgba(161,59,42,0.22)', label: 'Now' },
    medium: { c: '#8F6318', bg: 'rgba(176,122,30,0.05)', b: 'rgba(176,122,30,0.22)', label: 'Soon' },
    low: { c: '#57514A', bg: '#fff', b: '#EDE7DD', label: 'Worth doing' },
  }

  return (
    <div className="m-wrap" style={{ paddingTop: 36 }}>
      <style>{MARGIN_STYLES}</style>

      {sites.length > 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {sites.map(s => (
            <span key={s.id} style={{
              fontSize: 13, padding: '6px 14px', borderRadius: 100,
              border: '1px solid ' + (s.id === site.id ? INK : '#DDD6CC'),
              background: s.id === site.id ? INK : '#fff',
              color: s.id === site.id ? '#fff' : '#8A8279',
            }}>{s.name}</span>
          ))}
        </div>
      )}

      {/* Headline */}
      <div className="m-card" style={{ padding: '26px 30px', marginBottom: 22 }}>
        <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <div className="m-serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', lineHeight: 1,
              color: !position ? '#C4BDB2'
                : position.gp >= concept.gpLow ? '#3F6B4C' : '#8F6318' }}>
              {position ? pct(position.gp) : 'No data'}
            </div>
            <div style={{ fontSize: 12, color: '#8A8279', marginTop: 7 }}>
              Gross profit, expected {concept.gpLow} to {concept.gpHigh}%
            </div>
          </div>
          {position && (
            <>
              <div>
                <div className="m-serif" style={{ fontSize: 22, lineHeight: 1.1,
                  color: position.net >= concept.netLow ? '#3F6B4C' : '#8F6318' }}>
                  {pct(position.net)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                  Net, expected {concept.netLow} to {concept.netHigh}%
                </div>
              </div>
              <div>
                <div className="m-serif" style={{ fontSize: 22, lineHeight: 1.1,
                  color: position.prime > 70 ? '#A13B2A' : '#57514A' }}>
                  {pct(position.prime)}
                </div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Prime cost</div>
              </div>
            </>
          )}
          {sessionStats && (
            <div>
              <div className="m-serif" style={{ fontSize: 22, lineHeight: 1.1,
                color: sessionStats.labourPct > 35 ? '#A13B2A' : '#57514A' }}>
                {pct(sessionStats.labourPct)}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Labour, recent sessions</div>
            </div>
          )}
          {logStats.total > 0 && (
            <div>
              <div className="m-serif" style={{ fontSize: 22, lineHeight: 1.1, color: '#57514A' }}>
                {money(logStats.total)}
              </div>
              <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>Logged, last 90 days</div>
            </div>
          )}
        </div>

        {!position && (
          <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F0EBE2',
            fontSize: 14.5, color: '#57514A', lineHeight: 1.7 }}>
            Add a trading period in <Link href="/margin/settings" style={{ color: AMBER }}>settings</Link>{' '}
            to see where you sit against the benchmarks for your format.
          </div>
        )}
      </div>

      {/* Attention */}
      <div style={{ marginBottom: 26 }}>
        <h2 className="m-serif" style={{ fontSize: 19, fontWeight: 400, margin: '0 0 14px' }}>
          Needs attention
        </h2>
        {attention.length === 0 ? (
          <div style={{ padding: '22px 26px', borderRadius: 10, background: 'rgba(63,107,76,0.05)',
            border: '1px solid rgba(63,107,76,0.2)', fontSize: 15, color: '#57514A', lineHeight: 1.7 }}>
            Nothing is flagged. Margins are inside range, the log is current and no dish is losing money
            on delivery.
          </div>
        ) : (
          <div style={{ border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
            {attention.map((a, i) => {
              const t = TONE[a.level]
              const inner = (
                <>
                  <span className="m-tag" style={{ color: t.c, border: `1px solid ${t.b}`, marginTop: 2 }}>
                    {t.label}
                  </span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 500, color: INK }}>
                      {a.title}
                    </span>
                    <span style={{ display: 'block', fontSize: 13.5, color: '#6B6459',
                      lineHeight: 1.6, marginTop: 3 }}>{a.detail}</span>
                  </span>
                </>
              )
              const style: React.CSSProperties = {
                display: 'flex', gap: 14, alignItems: 'flex-start', padding: '15px 22px',
                background: t.bg === '#fff' ? '#fff' : t.bg, textDecoration: 'none',
                borderBottom: i < attention.length - 1 ? '1px solid #F0EBE2' : 'none',
              }
              return a.href
                ? <Link key={i} href={a.href} style={style}>{inner}</Link>
                : <div key={i} style={style}>{inner}</div>
            })}
          </div>
        )}
      </div>

      {/* Menu engineering */}
      {dishStats?.anyVolume && dishStats.quadrants.length > 0 && (
        <div className="m-card" style={{ padding: '24px 28px', marginBottom: 22 }}>
          <h2 className="m-serif" style={{ fontSize: 19, fontWeight: 400, margin: '0 0 6px' }}>
            What the menu is doing
          </h2>
          <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.65, margin: '0 0 18px', maxWidth: 620 }}>
            Each dish against the average on two axes: how well it sells, and how much it earns.
            Average gross profit across the menu is {pct(dishStats.avgGp)}.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 16 }}>
            {(['star', 'plough', 'puzzle', 'dog'] as const).map(q => {
              const items = dishStats.quadrants.filter(x => x.q === q)
              const meta = QUADRANTS[q]
              return (
                <div key={q} style={{ border: '1px solid #EDE7DD', borderRadius: 8, padding: '16px 18px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: meta.color, marginBottom: 4 }}>
                    {meta.label} <span style={{ color: '#8A8279', fontWeight: 400 }}>{items.length}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: '#8A8279', lineHeight: 1.6, marginBottom: 10 }}>
                    {meta.action}
                  </div>
                  {items.slice(0, 4).map(x => (
                    <div key={x.dish.id} style={{ fontSize: 13.5, color: '#57514A', padding: '3px 0' }}>
                      {x.dish.name} <span style={{ color: '#8A8279' }}>{pct(Number(x.dish.gp_pct))}</span>
                    </div>
                  ))}
                  {items.length > 4 && (
                    <div style={{ fontSize: 12.5, color: '#8A8279', marginTop: 4 }}>
                      and {items.length - 4} more
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/margin/dishes" style={{ fontSize: 14, color: AMBER }}>
              See every dish with its cost and margin
            </Link>
          </div>
        </div>
      )}

      {/* Log summary */}
      {logStats.count > 0 && (
        <div className="m-card" style={{ padding: '24px 28px', marginBottom: 22 }}>
          <h2 className="m-serif" style={{ fontSize: 19, fontWeight: 400, margin: '0 0 6px' }}>
            The evidence log
          </h2>
          <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.65, margin: '0 0 16px', maxWidth: 620 }}>
            {logStats.count} entries in the last 90 days, {money(logStats.total)} in total. This is what
            explains a margin below benchmark, and it only counts if it was written at the time.
          </p>
          <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap' }}>
            {Object.entries(logStats.byKind).sort((a, b) => b[1] - a[1]).map(([kind, value]) => (
              <div key={kind}>
                <div className="m-serif" style={{ fontSize: 19, color: '#57514A' }}>{money(value)}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 3 }}>
                  {EVENT_KINDS[kind as keyof typeof EVENT_KINDS]}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/margin/events" style={{ fontSize: 14, color: AMBER }}>Open the log</Link>
          </div>
        </div>
      )}
    </div>
  )
}
