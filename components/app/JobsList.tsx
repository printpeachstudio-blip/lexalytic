'use client'

import React, { useState, useTransition } from 'react'
import JobForm from './JobForm'
import { setReleased, archiveJob } from '@/app/app/actions'
import { type JobRow, stagesFor, totals, money, money2, fmtDate, STAT_RATE } from '@/lib/retention'

const AMBER = '#C17D2E'
const INK = '#1A1815'

export default function JobsList({ jobs }: { jobs: JobRow[] }) {
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const [, start] = useTransition()

  const t = totals(jobs)

  return (
    <div>
      <style>{`
        .j-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .j-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; }
        .j-primary { background: ${AMBER}; color: #fff; }
        .j-primary:hover { background: #A96C25; }
        .j-primary:disabled { opacity: .5; cursor: default; }
        .j-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .j-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .j-serif { font-family: Georgia, 'Times New Roman', serif; }
        .j-stage { display: grid; grid-template-columns: 1fr 130px 150px 120px; gap: 14px;
          align-items: center; padding: 14px 0; border-bottom: 1px solid #F4F0E8; }
        @media (max-width: 700px) { .j-stage { grid-template-columns: 1fr; gap: 4px; } }
      `}</style>

      {jobs.length > 0 && (
        <div className="j-card" style={{ padding: '24px 26px', marginBottom: 22,
          background: t.overdue > 0 ? 'rgba(161,59,42,0.04)' : '#fff',
          borderColor: t.overdue > 0 ? 'rgba(161,59,42,0.22)' : '#E8E2D8' }}>
          <div style={{ display: 'flex', gap: 34, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {([
              ['Retention held', money(t.held), '#57514A'],
              ['Still outstanding', money(t.outstanding), '#57514A'],
              ['Releasable now', money(t.releasable), t.releasable > 0 ? '#3F6B4C' : '#C4BDB2'],
              ['Overdue', money(t.overdue), t.overdue > 0 ? '#A13B2A' : '#C4BDB2'],
            ] as [string, string, string][]).map(([l, v, c]) => (
              <div key={l}>
                <div className="j-serif" style={{ fontSize: 26, lineHeight: 1.1, color: c }}>{v}</div>
                <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
          {t.overdueInterest > 0 && (
            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.07)',
              fontSize: 14, color: '#57514A', lineHeight: 1.65 }}>
              Statutory interest on the overdue amount is running at {STAT_RATE.toFixed(2)}% and stands at{' '}
              <strong style={{ color: '#A13B2A' }}>{money2(t.overdueInterest)}</strong>, recoverable on top of the retention.
            </div>
          )}
          {t.overDeducted > 0 && (
            <div style={{ marginTop: 12, fontSize: 14, color: '#8F6318', lineHeight: 1.65 }}>
              <strong>{money2(t.overDeducted)}</strong> has been deducted beyond the contractual cap. That was never due.
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
        <h2 className="j-serif" style={{ fontSize: 20, fontWeight: 400, margin: 0 }}>
          {jobs.length ? `Jobs (${jobs.length})` : 'Add your first job'}
        </h2>
        {!adding && jobs.length > 0 && <button className="j-link" onClick={() => setAdding(true)}>Add another</button>}
      </div>

      {(adding || jobs.length === 0) && <JobForm onDone={() => setAdding(false)} />}

      {jobs.map(j => {
        const stages = stagesFor(j)
        const anyOverdue = stages.some(s => s.overdue)
        const isOpen = open === j.id
        const isEditing = editing === j.id

        if (isEditing) {
          return <JobForm key={j.id} job={j} onDone={() => setEditing(null)} />
        }

        return (
          <div key={j.id} className="j-card" style={{ marginBottom: 14, overflow: 'hidden',
            borderColor: anyOverdue ? 'rgba(161,59,42,0.25)' : '#E8E2D8' }}>
            <button onClick={() => setOpen(isOpen ? null : j.id)} aria-expanded={isOpen}
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, font: 'inherit',
                padding: '18px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center',
                gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{j.ref}</div>
                <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
                  {j.contractor || 'No contractor set'} · {money(Number(j.retention_held))} held
                </div>
              </div>
              {anyOverdue && (
                <span style={{ fontSize: 12, fontWeight: 600, padding: '4px 11px', borderRadius: 4,
                  color: '#A13B2A', background: 'rgba(161,59,42,0.07)', border: '1px solid rgba(161,59,42,0.22)' }}>
                  Overdue
                </span>
              )}
              <span style={{ fontSize: 13, color: '#8A8279' }}>{isOpen ? 'Close' : 'Open'}</span>
            </button>

            {isOpen && (
              <div style={{ padding: '4px 24px 22px', borderTop: '1px solid #F0EBE2' }}>
                {Number(j.over_deducted) > 0 && (
                  <div style={{ marginTop: 16, marginBottom: 8, padding: '14px 16px', borderRadius: 6,
                    background: 'rgba(176,122,30,0.07)', border: '1px solid rgba(176,122,30,0.22)',
                    fontSize: 14, lineHeight: 1.65, color: '#8F6318' }}>
                    Retention has passed the {j.cap_pct}% cap. <strong>{money2(Number(j.over_deducted))}</strong>{' '}
                    has been deducted beyond it and is recoverable now, separately from the releases below.
                  </div>
                )}

                {stages.map(s => (
                  <div key={s.key} className="j-stage">
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{s.label}</div>
                      <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>{s.sub}</div>
                    </div>
                    <div style={{ fontSize: 15 }}>{money2(s.amount)}</div>
                    <div style={{ fontSize: 13, color: '#57514A' }}>
                      {s.due ? fmtDate(s.due) : 'Set completion date'}
                    </div>
                    <div style={{ fontSize: 13 }}>
                      {s.released ? <span style={{ color: '#3F6B4C' }}>Received</span>
                        : s.overdue ? <span style={{ color: '#A13B2A', fontWeight: 600 }}>{Math.abs(s.days!)}d overdue</span>
                        : s.days !== null ? <span style={{ color: '#8A8279' }}>{s.days} days</span>
                        : <span style={{ color: '#C4BDB2' }}>—</span>}
                    </div>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 16, alignItems: 'center' }}>
                  {stages.map(s => (
                    <label key={s.key} style={{ fontSize: 14, display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
                      <input type="checkbox" checked={s.released}
                        onChange={e => start(() => { setReleased(j.id, s.key, e.target.checked) })} />
                      {s.key === 'first' ? 'First half received' : 'Final half received'}
                    </label>
                  ))}
                  <button className="j-link" onClick={() => setEditing(j.id)} style={{ marginLeft: 'auto' }}>Edit</button>
                  <button className="j-link" style={{ color: '#8A8279' }}
                    onClick={() => { if (confirm(`Archive ${j.ref}?`)) start(() => { archiveJob(j.id) }) }}>
                    Archive
                  </button>
                </div>

                {j.notes && (
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F4F0E8',
                    fontSize: 14, color: '#57514A', lineHeight: 1.7 }}>{j.notes}</div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
