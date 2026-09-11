'use client'

import React, { useState, useTransition } from 'react'
import { type Site, type Channel, CONCEPTS, money, pct, fmtDate, todayStr } from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'
import { updateSite, createSite, saveChannel, savePeriod, saveStatement } from '@/app/margin/actions'

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

interface Statement {
  id: string
  channel_id: string
  period_start: string
  period_end: string
  gross_sales: number
  commission: number
  other_fees: number
  net_received: number
  our_recorded: number | null
}

export default function SettingsClient({
  site, sites, channels, periods, statements,
}: {
  site: Site; sites: Site[]; channels: Channel[]
  periods: Period[]; statements: Statement[]
}) {
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [addingSite, setAddingSite] = useState(false)
  const [addingChannel, setAddingChannel] = useState(false)
  const [addingPeriod, setAddingPeriod] = useState(false)
  const [stmtFor, setStmtFor] = useState<string | null>(null)
  const [pending, start] = useTransition()

  const concept = CONCEPTS[site.concept]

  const run = (fn: () => Promise<any>, msg?: string) => {
    setError(''); setNotice('')
    start(async () => {
      const res = await fn()
      if (res?.error) setError(res.error)
      else if (msg) setNotice(msg)
    })
  }

  const collect = (el: HTMLElement) => {
    const fd = new FormData()
    el.querySelectorAll('input, select').forEach((x: any) => {
      if (!x.name) return
      if (x.type === 'checkbox') fd.append(x.name, x.checked ? 'on' : 'off')
      else fd.append(x.name, x.value)
    })
    return fd
  }

  // Statement against our own record, which is the DAC7 check
  const mismatches = statements.filter(s =>
    s.our_recorded !== null &&
    Math.abs(Number(s.gross_sales) - Number(s.our_recorded)) > 1)

  return (
    <div className="m-wrap" style={{ paddingTop: 36, maxWidth: 820 }}>
      <style>{MARGIN_STYLES}</style>

      <h1 className="m-serif" style={{ fontSize: 25, fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 22px' }}>
        Settings
      </h1>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}
      {notice && (
        <div style={{ fontSize: 14, color: '#3F6B4C', background: 'rgba(63,107,76,0.07)',
          border: '1px solid rgba(63,107,76,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
          {notice}
        </div>
      )}

      {/* Site */}
      <div className="m-card st-form" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14 }}>This site</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 14, marginBottom: 14 }}>
          <div>
            <label className="m-label">Name</label>
            <input name="name" className="m-in" defaultValue={site.name} />
          </div>
          <div>
            <label className="m-label">Format</label>
            <select name="concept" className="m-sel" defaultValue={site.concept}>
              {Object.entries(CONCEPTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label className="m-label">Fixed costs a week</label>
            <input name="fixed_weekly" type="number" className="m-in" defaultValue={site.fixed_weekly} />
          </div>
          <div>
            <label className="m-label">Target GP</label>
            <input name="target_gp" type="number" step="0.1" className="m-in"
              defaultValue={site.target_gp ?? ''} placeholder={String(concept.gpLow)} />
          </div>
        </div>
        <label style={{ fontSize: 14.5, display: 'flex', gap: 9, alignItems: 'center',
          cursor: 'pointer', marginBottom: 18 }}>
          <input type="checkbox" name="vat_registered" defaultChecked={site.vat_registered} />
          VAT registered
        </label>
        <button className="m-btn" disabled={pending} onClick={e => {
          const fd = collect(e.currentTarget.closest('.st-form') as HTMLElement)
          run(() => updateSite(site.id, fd), 'Saved.')
        }}>Save site</button>
      </div>

      {/* Other sites */}
      <div className="m-card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>
            Sites {sites.length > 1 ? `(${sites.length})` : ''}
          </div>
          {!addingSite && <button className="m-link" onClick={() => setAddingSite(true)}>Add another</button>}
        </div>
        {sites.length > 1 && (
          <div style={{ marginBottom: 14 }}>
            {sites.map(s => (
              <div key={s.id} style={{ fontSize: 14, padding: '6px 0', color: '#57514A' }}>
                {s.name} <span style={{ color: '#8A8279' }}>
                  {CONCEPTS[s.concept].label}{s.id === site.id ? ' · currently showing' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
        {addingSite && (
          <div className="ns2-form" style={{ paddingTop: 10, borderTop: '1px solid #F0EBE2' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: 14, marginBottom: 14 }}>
              <div>
                <label className="m-label">Name</label>
                <input name="name" className="m-in" />
              </div>
              <div>
                <label className="m-label">Format</label>
                <select name="concept" className="m-sel" defaultValue="casual">
                  {Object.entries(CONCEPTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="m-label">Fixed costs a week</label>
                <input name="fixed_weekly" type="number" className="m-in" />
              </div>
            </div>
            <label style={{ fontSize: 14, display: 'flex', gap: 9, alignItems: 'center',
              cursor: 'pointer', marginBottom: 14 }}>
              <input type="checkbox" name="vat_registered" defaultChecked /> VAT registered
            </label>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <button className="m-btn m-quiet" disabled={pending} onClick={e => {
                const fd = collect(e.currentTarget.closest('.ns2-form') as HTMLElement)
                run(async () => {
                  const r = await createSite(fd)
                  if (!r?.error) setAddingSite(false)
                  return r
                }, 'Site added.')
              }}>Add site</button>
              <button className="m-link" style={{ color: '#8A8279' }}
                onClick={() => setAddingSite(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Channels */}
      <div className="m-card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Delivery channels</div>
          {!addingChannel && <button className="m-link" onClick={() => setAddingChannel(true)}>Add one</button>}
        </div>
        <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 14, lineHeight: 1.6 }}>
          Rates vary by contract and tier, and the one you signed up on may not be the one you are paying
          now. Check a statement rather than assuming.
        </div>

        {channels.map(ch => (
          <div key={ch.id} className={`ch-${ch.id}`} style={{ display: 'flex', gap: 12,
            flexWrap: 'wrap', alignItems: 'flex-end', padding: '12px 0',
            borderBottom: '1px solid #F7F4EF' }}>
            <div style={{ flex: '1 1 160px' }}>
              <label className="m-label">Name</label>
              <input name="name" className="m-in" defaultValue={ch.name} />
            </div>
            <div style={{ width: 110 }}>
              <label className="m-label">Commission %</label>
              <input name="commission_pct" type="number" step="0.1" className="m-in"
                defaultValue={ch.commission_pct} />
            </div>
            <div style={{ width: 120 }}>
              <label className="m-label">Packaging</label>
              <input name="packaging_cost" type="number" step="0.01" className="m-in"
                defaultValue={ch.packaging_cost} />
            </div>
            <label style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center',
              cursor: 'pointer', paddingBottom: 10 }}>
              <input type="checkbox" name="active" defaultChecked={ch.active} /> On
            </label>
            <button className="m-btn m-quiet" style={{ fontSize: 14, padding: '8px 14px' }}
              disabled={pending} onClick={e => {
                const fd = collect(e.currentTarget.closest(`.ch-${ch.id}`) as HTMLElement)
                run(() => saveChannel(site.id, ch.id, fd), 'Channel saved.')
              }}>Save</button>
            <button className="m-link" style={{ fontSize: 13, paddingBottom: 12 }}
              onClick={() => setStmtFor(stmtFor === ch.id ? null : ch.id)}>
              {stmtFor === ch.id ? 'Close' : 'Log a statement'}
            </button>
          </div>
        ))}

        {stmtFor && (
          <div className="stm-form" style={{ padding: '16px 0 4px', borderTop: '1px solid #F0EBE2',
            marginTop: 10 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
              Statement for {channels.find(c => c.id === stmtFor)?.name}
            </div>
            <div style={{ fontSize: 12.5, color: '#8A8279', marginBottom: 12, lineHeight: 1.6, maxWidth: 620 }}>
              Platforms report seller income to HMRC directly. Recording the statement alongside your own
              figure means a discrepancy surfaces here rather than somewhere less comfortable.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 12, marginBottom: 12 }}>
              <div>
                <label className="m-label">From</label>
                <input name="period_start" type="date" max={todayStr()} className="m-in" />
              </div>
              <div>
                <label className="m-label">To</label>
                <input name="period_end" type="date" max={todayStr()} className="m-in" />
              </div>
              <div>
                <label className="m-label">Gross sales</label>
                <input name="gross_sales" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Commission</label>
                <input name="commission" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Other fees</label>
                <input name="other_fees" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Net received</label>
                <input name="net_received" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Your own figure</label>
                <input name="our_recorded" type="number" step="0.01" className="m-in" />
              </div>
            </div>
            <button className="m-btn m-quiet" disabled={pending} onClick={e => {
              const fd = collect(e.currentTarget.closest('.stm-form') as HTMLElement)
              run(async () => {
                const r = await saveStatement(stmtFor, fd)
                if (!r?.error) setStmtFor(null)
                return r
              }, 'Statement recorded.')
            }}>Save statement</button>
          </div>
        )}

        {addingChannel && (
          <div className="nc-form" style={{ paddingTop: 14, borderTop: '1px solid #F0EBE2', marginTop: 10 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 160px' }}>
                <label className="m-label">Name</label>
                <input name="name" className="m-in" />
              </div>
              <div style={{ width: 110 }}>
                <label className="m-label">Commission %</label>
                <input name="commission_pct" type="number" step="0.1" className="m-in" defaultValue="30" />
              </div>
              <div style={{ width: 120 }}>
                <label className="m-label">Packaging</label>
                <input name="packaging_cost" type="number" step="0.01" className="m-in" defaultValue="0.45" />
              </div>
              <button className="m-btn m-quiet" disabled={pending} onClick={e => {
                const fd = collect(e.currentTarget.closest('.nc-form') as HTMLElement)
                run(async () => {
                  const r = await saveChannel(site.id, null, fd)
                  if (!r?.error) setAddingChannel(false)
                  return r
                }, 'Channel added.')
              }}>Add</button>
              <button className="m-link" style={{ color: '#8A8279', paddingBottom: 12 }}
                onClick={() => setAddingChannel(false)}>Cancel</button>
            </div>
          </div>
        )}

        {mismatches.length > 0 && (
          <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 6,
            background: 'rgba(161,59,42,0.05)', border: '1px solid rgba(161,59,42,0.22)',
            fontSize: 13.5, color: '#A13B2A', lineHeight: 1.7 }}>
            {mismatches.length} statement{mismatches.length === 1 ? '' : 's'} where the platform figure and
            your own do not agree. Worth resolving, since the platform figure is the one HMRC already has.
          </div>
        )}
      </div>

      {/* Periods */}
      <div className="m-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Trading periods</div>
          {!addingPeriod && <button className="m-link" onClick={() => setAddingPeriod(true)}>Add one</button>}
        </div>
        <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 14, lineHeight: 1.6, maxWidth: 640 }}>
          A period gives the overview a real gross profit to compare against the benchmark, and gives the
          sessions page a real figure instead of an assumed one. Monthly or quarterly is enough.
        </div>

        {periods.map(p => {
          const gp = p.turnover > 0 ? ((p.turnover - p.cost_of_sales) / p.turnover) * 100 : 0
          const net = p.turnover > 0
            ? ((p.turnover - p.cost_of_sales - p.wages - p.other_costs) / p.turnover) * 100 : 0
          return (
            <div key={p.id} style={{ display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) 110px 90px 90px', gap: 12,
              padding: '9px 0', fontSize: 14, alignItems: 'baseline', borderBottom: '1px solid #F7F4EF' }}>
              <div>{fmtDate(p.period_start)} to {fmtDate(p.period_end)}</div>
              <div style={{ color: '#57514A' }}>{money(Number(p.turnover))}</div>
              <div style={{ fontWeight: 600, color: gp >= concept.gpLow ? '#3F6B4C' : '#8F6318' }}>
                {pct(gp)}
              </div>
              <div style={{ color: net >= concept.netLow ? '#3F6B4C' : '#8F6318' }}>{pct(net)}</div>
            </div>
          )
        })}

        {(addingPeriod || periods.length === 0) && (
          <div className="pd-form" style={{ paddingTop: 14, marginTop: periods.length ? 12 : 0,
            borderTop: periods.length ? '1px solid #F0EBE2' : 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 12, marginBottom: 14 }}>
              <div>
                <label className="m-label">From</label>
                <input name="period_start" type="date" max={todayStr()} className="m-in" />
              </div>
              <div>
                <label className="m-label">To</label>
                <input name="period_end" type="date" max={todayStr()} className="m-in" />
              </div>
              <div>
                <label className="m-label">Turnover ex VAT</label>
                <input name="turnover" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Cost of sales</label>
                <input name="cost_of_sales" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Wages and NI</label>
                <input name="wages" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Other costs</label>
                <input name="other_costs" type="number" step="0.01" className="m-in" />
              </div>
              <div>
                <label className="m-label">Cash takings %</label>
                <input name="cash_pct" type="number" step="0.1" className="m-in" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <button className="m-btn" disabled={pending} onClick={e => {
                const fd = collect(e.currentTarget.closest('.pd-form') as HTMLElement)
                run(async () => {
                  const r = await savePeriod(site.id, fd)
                  if (!r?.error) setAddingPeriod(false)
                  return r
                }, 'Period saved.')
              }}>Save period</button>
              {periods.length > 0 && (
                <button className="m-link" style={{ color: '#8A8279' }}
                  onClick={() => setAddingPeriod(false)}>Cancel</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
