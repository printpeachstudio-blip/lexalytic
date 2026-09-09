'use client'

import React, { useState, useTransition } from 'react'
import { createJob, updateJob } from '@/app/app/actions'
import type { JobRow } from '@/lib/retention'

const AMBER = '#C17D2E'

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function JobForm({ job, onDone }: { job?: JobRow; onDone: () => void }) {
  const [pending, start] = useTransition()
  const [error, setError] = useState('')

  const submit = (fd: FormData) => {
    setError('')
    start(async () => {
      const res = job ? await updateJob(job.id, fd) : await createJob(fd)
      if (res?.error) setError(res.error)
      else onDone()
    })
  }

  return (
    <div className="j-card" style={{ padding: 24, marginBottom: 20 }}>
      <style>{`
        .j-in { font: inherit; font-size: 15px; padding: 10px 13px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .j-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .j-label { display: block; font-size: 13px; color: #57514A; margin-bottom: 5px; }
        .j-hint { font-size: 12px; color: #8A8279; margin-top: 4px; line-height: 1.5; }
        .j-field { margin-bottom: 14px; }
        .j-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .j-g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
        @media (max-width: 680px) { .j-g2, .j-g3 { grid-template-columns: 1fr; } }
      `}</style>

      <div className="j-g2">
        <div className="j-field">
          <label className="j-label" htmlFor="ref">Job reference or site</label>
          <input id="ref" name="ref" className="j-in" defaultValue={job?.ref || ''} placeholder="Riverside Phase 2" />
        </div>
        <div className="j-field">
          <label className="j-label" htmlFor="contractor">Main contractor</label>
          <input id="contractor" name="contractor" className="j-in" defaultValue={job?.contractor || ''} placeholder="Who is holding the money" />
        </div>
      </div>

      <div className="j-field">
        <label className="j-label" htmlFor="contractor_email">Contractor email</label>
        <input id="contractor_email" name="contractor_email" type="email" className="j-in"
          defaultValue={job?.contractor_email || ''} placeholder="Optional, for applications" />
      </div>

      <div className="j-g2">
        <div className="j-field">
          <label className="j-label" htmlFor="contract_value">Contract value</label>
          <input id="contract_value" name="contract_value" type="number" step="0.01" className="j-in"
            defaultValue={job?.contract_value ?? ''} placeholder="£" />
        </div>
        <div className="j-field">
          <label className="j-label" htmlFor="certified">Value certified to date</label>
          <input id="certified" name="certified" type="number" step="0.01" className="j-in"
            defaultValue={job?.certified ?? ''} placeholder="£" />
          <div className="j-hint">Gross value certified across all interim applications.</div>
        </div>
      </div>

      <div className="j-g3">
        <div className="j-field">
          <label className="j-label" htmlFor="retention_pct">Retention rate</label>
          <input id="retention_pct" name="retention_pct" type="number" step="0.1" className="j-in"
            defaultValue={job?.retention_pct ?? 5} />
          <div className="j-hint">Usually 5%.</div>
        </div>
        <div className="j-field">
          <label className="j-label" htmlFor="cap_pct">Cap on retention</label>
          <input id="cap_pct" name="cap_pct" type="number" step="0.1" className="j-in"
            defaultValue={job?.cap_pct ?? 5} />
          <div className="j-hint">% of contract value. Deduction stops here.</div>
        </div>
        <div className="j-field">
          <label className="j-label" htmlFor="defects_months">Defects period</label>
          <input id="defects_months" name="defects_months" type="number" className="j-in"
            defaultValue={job?.defects_months ?? 12} />
          <div className="j-hint">Months. Usually 12.</div>
        </div>
      </div>

      <div className="j-field" style={{ maxWidth: 280 }}>
        <label className="j-label" htmlFor="pc_date">Practical completion date</label>
        <input id="pc_date" name="pc_date" type="date" max={todayStr()} className="j-in"
          defaultValue={job?.pc_date || ''} />
        <div className="j-hint">Leave blank if the job is still live. Both release dates run from this.</div>
      </div>

      <div className="j-field">
        <label className="j-label" htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" rows={2} className="j-in" style={{ resize: 'vertical' }}
          defaultValue={job?.notes || ''} placeholder="Optional" />
      </div>

      {error && (
        <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
          border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 14 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="j-btn j-primary" disabled={pending}
          onClick={e => {
            const form = (e.currentTarget.closest('.j-card') as HTMLElement)
            const fd = new FormData()
            form.querySelectorAll('input, textarea').forEach((el: any) => {
              if (el.name) fd.append(el.name, el.value)
            })
            submit(fd)
          }}>
          {pending ? 'Saving…' : job ? 'Save changes' : 'Add job'}
        </button>
        <button className="j-link" onClick={onDone} disabled={pending}>Cancel</button>
      </div>
    </div>
  )
}
