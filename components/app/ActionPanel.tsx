'use client'

import React from 'react'
import { type Action, money2 } from '@/lib/retention'

const AMBER = '#C17D2E'

const TONE = {
  overdue: { c: '#A13B2A', bg: 'rgba(161,59,42,0.06)', b: 'rgba(161,59,42,0.22)', label: 'Overdue' },
  due:     { c: '#8F6318', bg: 'rgba(176,122,30,0.06)', b: 'rgba(176,122,30,0.22)', label: 'Releasable' },
  cap:     { c: '#8F6318', bg: 'rgba(176,122,30,0.06)', b: 'rgba(176,122,30,0.22)', label: 'Over-deducted' },
  soon:    { c: '#57514A', bg: 'transparent',            b: '#EDE7DD',              label: 'Coming up' },
  nodate:  { c: '#8A8279', bg: 'transparent',            b: '#EDE7DD',              label: 'Incomplete' },
}

export default function ActionPanel({
  actions, onOpen,
}: { actions: Action[]; onOpen: (jobId: string) => void }) {
  if (!actions.length) {
    return (
      <div style={{ padding: '26px 28px', borderRadius: 10, background: 'rgba(63,107,76,0.05)',
        border: '1px solid rgba(63,107,76,0.2)', marginBottom: 24 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, marginBottom: 6 }}>Nothing needs chasing</div>
        <div style={{ fontSize: 15, color: '#57514A', lineHeight: 1.7 }}>
          No release is due within the next two months and nothing is overdue. We will email you when
          that changes.
        </div>
      </div>
    )
  }

  const urgent = actions.filter(a => a.kind === 'overdue' || a.kind === 'due' || a.kind === 'cap')
  const later = actions.filter(a => a.kind === 'soon' || a.kind === 'nodate')
  const urgentTotal = urgent.reduce((s, a) => s + a.amount, 0)

  return (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 400, margin: 0 }}>
          Needs attention
        </h2>
        {urgentTotal > 0 && (
          <span style={{ fontSize: 14, color: '#8A8279' }}>
            {money2(urgentTotal)} chaseable today
          </span>
        )}
      </div>

      <div style={{ border: '1px solid #E8E2D8', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
        {[...urgent, ...later].map((a, i, arr) => {
          const t = TONE[a.kind]
          return (
            <button key={`${a.job.id}-${a.kind}-${a.stage?.key ?? ''}`}
              onClick={() => onOpen(a.job.id)}
              style={{
                width: '100%', textAlign: 'left', font: 'inherit', cursor: 'pointer',
                background: t.bg === 'transparent' ? '#fff' : t.bg,
                border: 0, borderBottom: i < arr.length - 1 ? '1px solid #F0EBE2' : 'none',
                padding: '16px 22px', display: 'flex', gap: 16, alignItems: 'flex-start',
              }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
                color: t.c, border: `1px solid ${t.b}`, borderRadius: 3, padding: '3px 8px',
                marginTop: 2, whiteSpace: 'nowrap' }}>
                {t.label}
              </span>
              <span style={{ flex: 1 }}>
                <span style={{ display: 'block', fontSize: 15, fontWeight: 500, color: '#1A1815' }}>
                  {a.headline}
                </span>
                <span style={{ display: 'block', fontSize: 13.5, color: '#6B6459', lineHeight: 1.6, marginTop: 3 }}>
                  {a.detail}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
