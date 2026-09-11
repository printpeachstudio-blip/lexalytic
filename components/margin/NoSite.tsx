'use client'

import React, { useState, useTransition } from 'react'
import { createSite } from '@/app/margin/actions'
import { CONCEPTS } from '@/lib/margin'
import { MARGIN_STYLES } from '@/lib/margin-styles'

export default function NoSite() {
  const [error, setError] = useState('')
  const [pending, start] = useTransition()

  const save = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wrap = e.currentTarget.closest('.ns-form') as HTMLElement
    const fd = new FormData()
    wrap.querySelectorAll('input, select').forEach((el: any) => {
      if (!el.name) return
      if (el.type === 'checkbox') fd.append(el.name, el.checked ? 'on' : 'off')
      else fd.append(el.name, el.value)
    })
    setError('')
    start(async () => {
      const res = await createSite(fd)
      if (res?.error) setError(res.error)
    })
  }

  return (
    <div className="m-wrap" style={{ paddingTop: 50, maxWidth: 620 }}>
      <style>{MARGIN_STYLES}</style>
      <h1 className="m-serif" style={{ fontSize: 27, fontWeight: 400, letterSpacing: '-0.02em',
        margin: '0 0 12px' }}>
        Set up your site
      </h1>
      <p style={{ fontSize: 16, color: '#57514A', lineHeight: 1.75, margin: '0 0 28px' }}>
        One to start with. If you run more than one you can add the rest afterwards and compare them
        against each other.
      </p>

      <div className="m-card ns-form" style={{ padding: 26 }}>
        <div style={{ marginBottom: 16 }}>
          <label className="m-label" htmlFor="name">Site name</label>
          <input id="name" name="name" className="m-in" placeholder="The Crown, or Kitchen Street" />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label className="m-label" htmlFor="concept">Format</label>
          <select id="concept" name="concept" className="m-sel" defaultValue="casual">
            {Object.entries(CONCEPTS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
            Sets which benchmark range you get measured against.
          </div>
        </div>

        <div style={{ marginBottom: 16, maxWidth: 220 }}>
          <label className="m-label" htmlFor="fixed_weekly">Fixed costs a week</label>
          <input id="fixed_weekly" name="fixed_weekly" type="number" className="m-in" placeholder="0" />
          <div style={{ fontSize: 12, color: '#8A8279', marginTop: 4 }}>
            Rent, rates, utilities, salaried staff. Used for break-even.
          </div>
        </div>

        <label style={{ fontSize: 15, display: 'flex', gap: 10, alignItems: 'center',
          cursor: 'pointer', marginBottom: 22 }}>
          <input type="checkbox" name="vat_registered" defaultChecked />
          VAT registered
        </label>

        {error && (
          <div style={{ fontSize: 14, color: '#A13B2A', background: 'rgba(161,59,42,0.07)',
            border: '1px solid rgba(161,59,42,0.2)', borderRadius: 6, padding: '11px 14px', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button className="m-btn" onClick={save} disabled={pending}>
          {pending ? 'Setting up…' : 'Create the site'}
        </button>
        <div style={{ fontSize: 13, color: '#8A8279', marginTop: 12, lineHeight: 1.6 }}>
          Deliveroo, Uber Eats and Just Eat get added automatically at typical commission rates. Change
          them once you have a statement in front of you.
        </div>
      </div>
    </div>
  )
}
