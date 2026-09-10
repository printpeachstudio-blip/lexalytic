'use client'

import React, { useState, useTransition } from 'react'
import { addCertification, deleteCertification } from '@/app/app/actions'
import { money2, fmtDate } from '@/lib/retention'

const AMBER = '#C17D2E'

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Certifications({ jobId, entries }: { jobId: string; entries: any[] }) {
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrap = e.currentTarget.closest('.cf-form') as HTMLElement
    const fd = new FormData()
    wrap.querySelectorAll('input').forEach((el: any) => { if (el.name) fd.append(el.name, el.value) })
    setError('')
    start(async () => {
      const res = await addCertification(jobId, fd)
      if (res?.error) setError(res.error)
      else setAdding(false)
    })
  }

  return (
    <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F4F0E8' }}>
      <style>{`
        .cf-in { font: inherit; font-size: 14px; padding: 8px 11px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .cf-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .cf-g { display: grid; grid-template-columns: 140px 150px 1fr; gap: 10px; align-items: end; }
        @media (max-width: 620px) { .cf-g { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Certified value history</span>
        {!adding && (
          <button className="j-link" onClick={() => setAdding(true)} style={{ fontSize: 13 }}>
            Record a certificate
          </button>
        )}
      </div>

      {entries.length > 0 ? (
        <div style={{ marginBottom: adding ? 14 : 0 }}>
          {entries.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 14, alignItems: 'baseline',
              padding: '7px 0', fontSize: 14, color: '#57514A', borderBottom: '1px solid #F7F4EF' }}>
              <span style={{ minWidth: 110, fontWeight: 500 }}>{money2(c.certified)}</span>
              <span style={{ minWidth: 110, color: '#8A8279' }}>{fmtDate(c.certified_on)}</span>
              <span style={{ color: '#8A8279', fontSize: 13 }}>{c.reference || 'No reference'}</span>
              <button className="j-link" style={{ marginLeft: 'auto', fontSize: 13, color: '#8A8279' }}
                onClick={() => start(() => { deleteCertification(c.id) })}>Remove</button>
            </div>
          ))}
        </div>
      ) : !adding && (
        <div style={{ fontSize: 13.5, color: '#8A8279', lineHeight: 1.6 }}>
          Nothing recorded. If a contractor ever disputes how much retention is held, this is the trail
          that settles it.
        </div>
      )}

      {adding && (
        <div className="cf-form">
          <div className="cf-g" style={{ marginBottom: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>
                Cumulative certified
              </label>
              <input name="certified" type="number" step="0.01" className="cf-in" placeholder="£" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>
                Certificate date
              </label>
              <input name="certified_on" type="date" max={todayStr()} className="cf-in" defaultValue={todayStr()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>
                Reference
              </label>
              <input name="reference" className="cf-in" placeholder="Application 7" />
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: '#8A8279', marginBottom: 10, lineHeight: 1.55 }}>
            Enter the running total certified to date, not the value of this certificate alone. The
            job's certified figure updates to match.
          </div>
          {error && <div style={{ fontSize: 13, color: '#A13B2A', marginBottom: 10 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="j-btn j-primary" style={{ fontSize: 14, padding: '8px 16px' }}
              disabled={pending} onClick={save}>{pending ? 'Saving…' : 'Save certificate'}</button>
            <button className="j-link" style={{ color: '#8A8279', fontSize: 13 }}
              onClick={() => { setAdding(false); setError('') }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
