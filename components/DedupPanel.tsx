'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
  findDuplicates, mergeCluster, completeness, guessKind,
  type FieldMap, type FieldKind, type Cluster,
} from '@/lib/dedup'

const AMBER = '#C17D2E'
const INK = '#1A1815'

const KINDS: { id: FieldKind; label: string; note: string }[] = [
  { id: 'name', label: 'Name', note: 'Company, customer or contact name. Compared word by word, so typos and word order do not matter.' },
  { id: 'email', label: 'Email', note: 'An exact match identifies the same person or business on its own.' },
  { id: 'company_number', label: 'Company number', note: 'The strongest signal there is. An exact match settles it whatever the names say.' },
  { id: 'postcode', label: 'Postcode', note: 'Supporting evidence only. Two businesses at one address are not one business.' },
  { id: 'phone', label: 'Phone', note: 'Compared after stripping spaces and country codes.' },
  { id: 'other', label: 'Ignore', note: 'Not used for matching.' },
]

export default function DedupPanel({
  rows, headers, money,
}: {
  rows: Record<string, string>[]
  headers: string[]
  money?: (n: number) => string
}) {
  const [fields, setFields] = useState<FieldMap[]>(() =>
    headers.map(h => ({ column: h, kind: guessKind(h) })))
  const [threshold, setThreshold] = useState(0.85)
  const [result, setResult] = useState<ReturnType<typeof findDuplicates> | null>(null)
  const [running, setRunning] = useState(false)
  const [keep, setKeep] = useState<Record<number, number>>({})
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())
  const [expanded, setExpanded] = useState<number | null>(0)

  const active = fields.filter(f => f.kind !== 'other')

  const run = useCallback(() => {
    setRunning(true)
    setResult(null)
    setKeep({})
    setDismissed(new Set())
    // let the button state paint before the work starts
    setTimeout(() => {
      const r = findDuplicates(rows, fields, threshold)
      setResult(r)
      // default to keeping the most complete record in each group
      const defaults: Record<number, number> = {}
      r.clusters.forEach((c, i) => {
        let best = c.ids[0], bestScore = -1
        c.ids.forEach(id => {
          const sc = completeness(rows[id], headers)
          if (sc > bestScore) { bestScore = sc; best = id }
        })
        defaults[i] = best
      })
      setKeep(defaults)
      setRunning(false)
      setExpanded(0)
    }, 30)
  }, [rows, fields, threshold, headers])

  const stats = useMemo(() => {
    if (!result) return null
    const live = result.clusters.filter((_, i) => !dismissed.has(i))
    return {
      groups: live.length,
      removable: live.reduce((n, c) => n + c.ids.length - 1, 0),
      dismissed: dismissed.size,
    }
  }, [result, dismissed])

  const download = useCallback(() => {
    if (!result) return
    const drop = new Set<number>()
    const replace = new Map<number, Record<string, string>>()

    result.clusters.forEach((c, i) => {
      if (dismissed.has(i)) return
      const keepId = keep[i] ?? c.ids[0]
      replace.set(keepId, mergeCluster(rows, c.ids, keepId, headers))
      c.ids.forEach(id => { if (id !== keepId) drop.add(id) })
    })

    const out = rows
      .map((r, i) => (drop.has(i) ? null : (replace.get(i) ?? r)))
      .filter((r): r is Record<string, string> => r !== null)

    const esc = (v: unknown) => {
      const s = v === null || v === undefined ? '' : String(v)
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
    }
    const csv = [headers.map(esc).join(',')]
      .concat(out.map(r => headers.map(h => esc(r[h])).join(',')))
      .join('\r\n')

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'deduplicated.csv'
    a.click()
    URL.revokeObjectURL(url)
  }, [result, rows, headers, keep, dismissed])

  return (
    <div style={{ marginTop: 40 }}>
      <style>{`
        .dd-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .dd-sel { font: inherit; font-size: 13.5px; padding: 7px 9px; border-radius: 6px;
          border: 1px solid #DDD6CC; background: #fff; width: 100%; }
        .dd-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer;
          border-radius: 6px; padding: 11px 20px; border: 1px solid transparent;
          background: ${AMBER}; color: #fff; }
        .dd-btn:disabled { opacity: .5; cursor: default; }
        .dd-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .dd-link { background: none; border: 0; padding: 0; font: inherit; font-size: 13.5px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .dd-row { display: grid; gap: 10px; padding: 10px 12px; border-radius: 6px;
          align-items: start; cursor: pointer; }
        .dd-row:hover { background: #FDFCFA; }
        @media (max-width: 760px) { .dd-map { grid-template-columns: 1fr !important; } }
      `}</style>

      <div className="dd-card" style={{ padding: '28px 30px', marginBottom: 20 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, marginBottom: 10,
          letterSpacing: '-0.01em' }}>
          Find the records that are the same thing twice
        </div>
        <p style={{ fontSize: 15, color: '#57514A', lineHeight: 1.8, margin: '0 0 6px', maxWidth: 660 }}>
          Exact duplicates are easy and the checker above already found them. The ones that cost you
          money are the near misses. Smith and Sons Ltd, Smith &amp; Sons Limited and SMITH AND SONS
          are one customer and three records, and no amount of sorting a spreadsheet will show you that.
        </p>
        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.75, margin: '0 0 24px', maxWidth: 660 }}>
          This compares names word by word rather than character by character, which matters. It means a
          typo is forgiven and word order does not count, but Smith Services and Smith Solutions stay
          separate, because they are two businesses. Merging two real customers loses data, so it errs
          toward leaving them alone.
        </p>

        {/* Column mapping */}
        <div style={{ fontSize: 14.5, fontWeight: 600, marginBottom: 4 }}>
          Which columns identify a record?
        </div>
        <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 14 }}>
          Guessed from the headers. Change anything that is wrong, and set the rest to ignore.
        </div>

        <div className="dd-map" style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
          gap: 12, marginBottom: 20 }}>
          {fields.map((f, i) => (
            <div key={f.column}>
              <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 4 }}>
                {f.column}
              </label>
              <select className="dd-sel" value={f.kind}
                onChange={e => {
                  const next = [...fields]
                  next[i] = { ...next[i], kind: e.target.value as FieldKind }
                  setFields(next)
                  setResult(null)
                }}>
                {KINDS.map(k => <option key={k.id} value={k.id}>{k.label}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Threshold */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end',
          flexWrap: 'wrap', marginBottom: 20, paddingTop: 16, borderTop: '1px solid #F0EBE2' }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#8A8279', marginBottom: 6 }}>
              How similar before it counts
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[[0.92, 'Strict'], [0.85, 'Balanced'], [0.78, 'Loose']].map(([v, label]) => (
                <button key={String(v)}
                  onClick={() => { setThreshold(v as number); setResult(null) }}
                  style={{ font: 'inherit', fontSize: 13.5, padding: '8px 14px', borderRadius: 6,
                    cursor: 'pointer',
                    border: '1px solid ' + (threshold === v ? INK : '#DDD6CC'),
                    background: threshold === v ? INK : '#fff',
                    color: threshold === v ? '#fff' : '#4A453F' }}>
                  {label as string}
                </button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.6, flex: '1 1 260px',
            paddingBottom: 4 }}>
            {threshold >= 0.92
              ? 'Only near certain matches. Misses some real duplicates, flags almost nothing wrongly.'
              : threshold >= 0.85
              ? 'The sensible default. Catches typos and formatting differences without guessing.'
              : 'Catches more, including some that are not duplicates. Review every group.'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="dd-btn" onClick={run} disabled={running || !active.length}>
            {running ? 'Comparing…' : 'Find duplicates'}
          </button>
          <span style={{ fontSize: 13, color: '#8A8279' }}>
            {!active.length
              ? 'Set at least one column to something other than ignore.'
              : `${rows.length.toLocaleString('en-GB')} rows, matching on ${active.map(f => f.column).join(', ')}`}
          </span>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          <div className="dd-card" style={{ padding: '24px 28px', marginBottom: 18,
            background: stats && stats.removable > 0 ? 'rgba(176,122,30,0.04)' : '#fff',
            borderColor: stats && stats.removable > 0 ? 'rgba(176,122,30,0.22)' : '#E8E2D8' }}>
            {result.clusters.length === 0 ? (
              <div style={{ fontSize: 15.5, color: '#3F6B4C', lineHeight: 1.8 }}>
                Nothing came back at this threshold. Either the file is clean, or the duplicates differ
                in ways this cannot see. Try the looser setting, or check the columns above are mapped
                to the right things.
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 34, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 30, lineHeight: 1,
                      color: '#8F6318' }}>
                      {stats?.removable ?? 0}
                    </div>
                    <div style={{ fontSize: 12, color: '#8A8279', marginTop: 6 }}>
                      rows that look like repeats
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, lineHeight: 1.1,
                      color: '#57514A' }}>
                      {stats?.groups ?? 0}
                    </div>
                    <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>groups to review</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, lineHeight: 1.1,
                      color: '#57514A' }}>
                      {rows.length > 0
                        ? (((stats?.removable ?? 0) / rows.length) * 100).toFixed(1) : 0}%
                    </div>
                    <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>of the file</div>
                  </div>
                  {stats && stats.dismissed > 0 && (
                    <div>
                      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, lineHeight: 1.1,
                        color: '#8A8279' }}>{stats.dismissed}</div>
                      <div style={{ fontSize: 12, color: '#8A8279', marginTop: 5 }}>
                        you marked as different
                      </div>
                    </div>
                  )}
                </div>

                {result.truncated && (
                  <div style={{ marginTop: 16, padding: '13px 16px', borderRadius: 6,
                    background: 'rgba(176,122,30,0.08)', border: '1px solid rgba(176,122,30,0.22)',
                    fontSize: 13.5, color: '#8F6318', lineHeight: 1.7 }}>
                    {result.truncated}
                  </div>
                )}

                <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.06)',
                  fontSize: 14, color: '#57514A', lineHeight: 1.75, maxWidth: 660 }}>
                  Go through each group below and pick the record to keep. Blank fields in the one you
                  keep get filled from the others, so nothing is lost. Anything that is not actually a
                  duplicate, mark as different and it stays untouched.
                </div>
              </>
            )}
          </div>

          {/* Clusters */}
          {result.clusters.map((c, i) => {
            const isDismissed = dismissed.has(i)
            const keepId = keep[i] ?? c.ids[0]
            const open = expanded === i
            const cols = active.map(f => f.column).slice(0, 4)

            return (
              <div key={i} className="dd-card" style={{ marginBottom: 12, overflow: 'hidden',
                opacity: isDismissed ? 0.55 : 1 }}>
                <button onClick={() => setExpanded(open ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 0,
                    font: 'inherit', padding: '15px 20px', cursor: 'pointer', display: 'flex',
                    gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11.5, fontWeight: 600,
                    color: c.score >= 0.95 ? '#A13B2A' : '#8F6318',
                    border: `1px solid ${c.score >= 0.95 ? 'rgba(161,59,42,0.25)' : 'rgba(176,122,30,0.25)'}`,
                    borderRadius: 3, padding: '3px 9px', whiteSpace: 'nowrap' }}>
                    {c.score >= 0.95 ? 'Near certain' : 'Likely'}
                  </span>
                  <span style={{ flex: '1 1 240px', fontSize: 15 }}>
                    {c.ids.slice(0, 2).map(id =>
                      String(rows[id][cols[0]] ?? '').trim() || '(blank)').join('  ·  ')}
                    {c.ids.length > 2 && (
                      <span style={{ color: '#8A8279' }}> and {c.ids.length - 2} more</span>
                    )}
                  </span>
                  <span style={{ fontSize: 13, color: '#8A8279' }}>
                    {c.ids.length} records
                    {c.reasons.length > 0 && `, matched on ${c.reasons.map(r => r.column).join(' and ')}`}
                  </span>
                  <span style={{ fontSize: 13, color: isDismissed ? '#8A8279' : AMBER }}>
                    {isDismissed ? 'marked different' : open ? 'Close' : 'Review'}
                  </span>
                </button>

                {open && !isDismissed && (
                  <div style={{ padding: '4px 20px 18px', borderTop: '1px solid #F0EBE2' }}>
                    <div style={{ fontSize: 13, color: '#8A8279', margin: '14px 0 10px' }}>
                      Which one do you want to keep? The most complete is selected.
                    </div>

                    {c.ids.map(id => (
                      <label key={id} className="dd-row"
                        style={{ gridTemplateColumns: `28px repeat(${cols.length}, minmax(0, 1fr)) 80px`,
                          border: '1px solid ' + (keepId === id ? AMBER : 'transparent'),
                          background: keepId === id ? 'rgba(193,125,46,0.05)' : 'transparent' }}>
                        <input type="radio" name={`keep-${i}`} checked={keepId === id}
                          onChange={() => setKeep(k => ({ ...k, [i]: id }))}
                          style={{ marginTop: 3 }} />
                        {cols.map(col => (
                          <span key={col} style={{ fontSize: 13.5, minWidth: 0,
                            overflowWrap: 'break-word',
                            color: String(rows[id][col] ?? '').trim() ? '#1A1815' : '#C4BDB2' }}>
                            <span style={{ display: 'block', fontSize: 11, color: '#8A8279' }}>{col}</span>
                            {String(rows[id][col] ?? '').trim() || 'blank'}
                          </span>
                        ))}
                        <span style={{ fontSize: 12, color: '#8A8279', textAlign: 'right' }}>
                          {completeness(rows[id], headers)}/{headers.length} filled
                        </span>
                      </label>
                    ))}

                    <div style={{ display: 'flex', gap: 18, alignItems: 'center',
                      flexWrap: 'wrap', marginTop: 14, paddingTop: 12, borderTop: '1px solid #F4F0E8' }}>
                      <button className="dd-link" style={{ color: '#8A8279' }}
                        onClick={() => {
                          setDismissed(d => new Set(d).add(i))
                          setExpanded(null)
                        }}>
                        These are not the same, leave them alone
                      </button>
                      {i < result.clusters.length - 1 && (
                        <button className="dd-link" style={{ marginLeft: 'auto' }}
                          onClick={() => setExpanded(i + 1)}>
                          Next group
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {open && isDismissed && (
                  <div style={{ padding: '14px 20px', borderTop: '1px solid #F0EBE2',
                    fontSize: 14, color: '#8A8279' }}>
                    Marked as different, so these records stay as they are.{' '}
                    <button className="dd-link" onClick={() => {
                      setDismissed(d => { const n = new Set(d); n.delete(i); return n })
                    }}>Undo</button>
                  </div>
                )}
              </div>
            )
          })}

          {/* Export */}
          {result.clusters.length > 0 && (
            <div style={{ padding: 28, borderRadius: 10, background: INK, color: '#fff',
              marginTop: 20 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, marginBottom: 10 }}>
                Download the deduplicated file
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                margin: '0 0 20px', maxWidth: 560 }}>
                {rows.length.toLocaleString('en-GB')} rows in,{' '}
                {(rows.length - (stats?.removable ?? 0)).toLocaleString('en-GB')} out. Every group you
                kept is merged into one record with the blanks filled from the others. Anything you
                marked as different is untouched. Your original file is not modified, because it never
                left your computer.
              </p>
              <button className="dd-btn" onClick={download}>Download the CSV</button>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>
                Saved with a byte order mark so Excel opens it without mangling accents.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
