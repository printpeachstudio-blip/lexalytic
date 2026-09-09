'use client'

import React, { useState, useTransition } from 'react'
import { addReceipt, deleteReceipt } from '@/app/app/actions'
import { type Receipt, money2, fmtDate } from '@/lib/retention'

const AMBER = '#C17D2E'

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Receipts({
  jobId, receipts,
}: { jobId: string; receipts: Receipt[] }) {
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrap = e.currentTarget.closest('.rc-form') as HTMLElement
    const fd = new FormData()
    wrap.querySelectorAll('input, select, textarea').forEach((el: any) => {
      if (el.name) fd.append(el.name, el.value)
    })
    setError('')
    start(async () => {
      const res = await addReceipt(jobId, fd)
      if (res?.error) setError(res.error)
      else setAdding(false)
    })
  }

  return (
    <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F4F0E8' }}>
      <style>{`
        .rc-in { font: inherit; font-size: 14px; padding: 8px 11px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .rc-in:focus-visible { outline: 2px solid ${AMBER}; outline-offset: 1px; }
        .rc-g { display: grid; grid-template-columns: 120px 150px 1fr; gap: 10px; align-items: end; }
        @media (max-width: 620px) { .rc-g { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Payments received</span>
        {!adding && (
          <button className="j-link" onClick={() => setAdding(true)} style={{ fontSize: 13 }}>
            Log a payment
          </button>
        )}
      </div>

      {receipts.length > 0 && (
        <div style={{ marginBottom: adding ? 14 : 0 }}>
          {receipts.map(r => (
            <div key={r.id} style={{ display: 'flex', gap: 14, alignItems: 'baseline',
              padding: '7px 0', fontSize: 14, color: '#57514A', borderBottom: '1px solid #F7F4EF' }}>
              <span style={{ minWidth: 90, fontWeight: 500 }}>{money2(r.amount)}</span>
              <span style={{ minWidth: 110, color: '#8A8279' }}>{fmtDate(r.received_on)}</span>
              <span style={{ color: '#8A8279', fontSize: 13 }}>
                {r.stage === 'first' ? 'First release' : r.stage === 'final' ? 'Final release' : 'Cap recovery'}
              </span>
              <button className="j-link" style={{ marginLeft: 'auto', fontSize: 13, color: '#8A8279' }}
                onClick={() => start(() => { deleteReceipt(r.id) })}>Remove</button>
            </div>
          ))}
        </div>
      )}

      {receipts.length === 0 && !adding && (
        <div style={{ fontSize: 13.5, color: '#8A8279', lineHeight: 1.6 }}>
          Nothing logged. Retention often arrives in parts, and recording what has come in keeps the
          outstanding figure honest.
        </div>
      )}

      {adding && (
        <div className="rc-form">
          <div className="rc-g" style={{ marginBottom: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Amount</label>
              <input name="amount" type="number" step="0.01" className="rc-in" placeholder="£" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Received on</label>
              <input name="received_on" type="date" max={todayStr()} className="rc-in" defaultValue={todayStr()} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>Against</label>
              <select name="stage" className="rc-in">
                <option value="first">First release</option>
                <option value="final">Final release</option>
                <option value="cap">Over-deduction recovered</option>
              </select>
            </div>
          </div>
          {error && <div style={{ fontSize: 13, color: '#A13B2A', marginBottom: 10 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button className="j-btn j-primary" style={{ fontSize: 14, padding: '8px 16px' }}
              disabled={pending} onClick={save}>
              {pending ? 'Saving…' : 'Save payment'}
            </button>
            <button className="j-link" style={{ color: '#8A8279', fontSize: 13 }}
              onClick={() => { setAdding(false); setError('') }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
