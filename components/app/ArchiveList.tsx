'use client'

import React, { useTransition } from 'react'
import Link from 'next/link'
import { archiveJob } from '@/app/app/actions'
import { money, fmtDate } from '@/lib/retention'

export default function ArchiveList({ jobs }: { jobs: any[] }) {
  const [pending, start] = useTransition()

  if (!jobs.length) {
    return (
      <div style={{ padding: '28px 30px', background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginBottom: 8 }}>Nothing archived</div>
        <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7, margin: '0 0 18px' }}>
          Archive a job once its retention is fully settled and you no longer want it cluttering the list.
        </p>
        <Link href="/app" style={{ fontSize: 15, color: '#C17D2E' }}>Back to jobs</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden' }}>
      {jobs.map((j, i) => (
        <div key={j.id} style={{ padding: '16px 24px', display: 'flex', gap: 16,
          alignItems: 'center', flexWrap: 'wrap',
          borderBottom: i < jobs.length - 1 ? '1px solid #F0EBE2' : 'none' }}>
          <div style={{ flex: '1 1 220px' }}>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{j.ref}</div>
            <div style={{ fontSize: 13, color: '#8A8279', marginTop: 2 }}>
              {j.contractor || 'No contractor'} · {money(Number(j.retention_held))} held
              {j.pc_date ? ` · completed ${fmtDate(j.pc_date)}` : ''}
            </div>
          </div>
          <button
            onClick={() => start(() => { archiveJob(j.id, false) })}
            disabled={pending}
            style={{ background: 'none', border: 0, padding: 0, font: 'inherit', fontSize: 14,
              color: '#C17D2E', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>
            Restore
          </button>
        </div>
      ))}
    </div>
  )
}
