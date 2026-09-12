'use client'

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import * as XLSX from 'xlsx'
import {
  audit, dependencies, numToCol,
  type AuditResult, type Finding, type Severity,
} from '@/lib/spreadsheet-audit'

const STRIPE_LINK = 'https://buy.stripe.com/00w4gsbcRfyWgYk7NO3AY0f'
const UNLOCK_PARAM = 'xla-2p6mv9'
const PAID_KEY = 'lexalytic.xlaudit.paid.v1'

const AMBER = '#C17D2E'
const INK = '#1A1815'

const SEV: Record<Severity, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: 'Critical', color: '#A13B2A', bg: 'rgba(161,59,42,0.06)', border: 'rgba(161,59,42,0.22)' },
  major:    { label: 'Major',    color: '#B07A1E', bg: 'rgba(176,122,30,0.06)', border: 'rgba(176,122,30,0.22)' },
  minor:    { label: 'Minor',    color: '#5A6B57', bg: 'rgba(90,107,87,0.06)',  border: 'rgba(90,107,87,0.20)' },
}

function grade(score: number) {
  if (score >= 85) return { letter: 'A', words: 'In good shape' }
  if (score >= 70) return { letter: 'B', words: 'Sound, with things worth tidying' }
  if (score >= 50) return { letter: 'C', words: 'Working, but fragile' }
  if (score >= 30) return { letter: 'D', words: 'This will catch somebody out' }
  return { letter: 'E', words: 'Do not rely on these numbers' }
}

export default function SpreadsheetAudit() {
  const [state, setState] = useState<'idle' | 'reading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<AuditResult | null>(null)
  const [fileName, setFileName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [dragging, setDragging] = useState(false)
  const [paid, setPaid] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      if (localStorage.getItem(PAID_KEY) === '1') setPaid(true)
      const p = new URLSearchParams(window.location.search)
      if (p.get('ref') === UNLOCK_PARAM) {
        localStorage.setItem(PAID_KEY, '1')
        setPaid(true)
        window.history.replaceState({}, '', window.location.pathname)
      }
    } catch { /* storage unavailable */ }
  }, [])

  const run = useCallback((buf: ArrayBuffer, name: string) => {
    setState('reading')
    setFileName(name)
    setTimeout(() => {
      try {
        // cellFormula is the whole point. Without it we would only see
        // the values, and the values are not where the problems are.
        const wb = XLSX.read(buf, { type: 'array', cellFormula: true, cellNF: true, cellText: true })
        const raw: any[] = []
        const sheets: any[] = []

        wb.SheetNames.forEach(name2 => {
          const ws = wb.Sheets[name2]
          if (!ws || !ws['!ref']) {
            sheets.push({ name: name2, rows: 0, cols: 0, formulaCount: 0, valueCount: 0, blankCount: 0 })
            return
          }
          const range = XLSX.utils.decode_range(ws['!ref'])
          let f = 0, v = 0, b = 0

          for (let r = range.s.r; r <= range.e.r; r++) {
            for (let c = range.s.c; c <= range.e.c; c++) {
              const addr = numToCol(c + 1) + (r + 1)
              const cell = ws[addr]
              if (!cell) { b++; continue }
              if (cell.f) f++; else v++
              raw.push({
                ref: addr,
                sheet: name2,
                formula: cell.f ? '=' + cell.f : undefined,
                value: cell.v,
                type: cell.t,
                text: cell.w !== undefined ? String(cell.w) : (cell.v !== undefined ? String(cell.v) : undefined),
              })
            }
          }
          sheets.push({
            name: name2,
            rows: range.e.r - range.s.r + 1,
            cols: range.e.c - range.s.c + 1,
            formulaCount: f, valueCount: v, blankCount: b,
          })
        })

        if (!raw.length) {
          setErrorMsg('That workbook appears to be empty.')
          setState('error')
          return
        }

        const r = audit(raw, sheets)
        setResult(r)
        const groups: Record<string, boolean> = {}
        r.findings.forEach(x => { groups[x.group] = true })
        setOpenGroups(groups)
        setState('done')
      } catch (e: any) {
        setErrorMsg('That file could not be read. It needs to be an xlsx or xlsm workbook. The older xls format and Numbers files will not work.')
        setState('error')
      }
    }, 200)
  }, [])

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('That file is over 15MB. Anything that large is usually better looked at properly than scanned.')
      setState('error')
      return
    }
    const reader = new FileReader()
    reader.onload = e => run(e.target!.result as ArrayBuffer, file.name)
    reader.onerror = () => { setErrorMsg('The file could not be opened.'); setState('error') }
    reader.readAsArrayBuffer(file)
  }, [run])

  const counts = useMemo(() => {
    if (!result) return null
    return {
      critical: result.findings.filter(f => f.severity === 'critical').length,
      major: result.findings.filter(f => f.severity === 'major').length,
      minor: result.findings.filter(f => f.severity === 'minor').length,
    }
  }, [result])

  const deps = useMemo(() => result ? dependencies(result.cells, 20) : [], [result])

  const grouped = useMemo(() => {
    if (!result) return []
    const g = new Map<string, Finding[]>()
    result.findings.forEach(f => {
      const arr = g.get(f.group) || []
      arr.push(f)
      g.set(f.group, arr)
    })
    return Array.from(g.entries())
  }, [result])

  const g = result ? grade(result.score) : null

  return (
    <div style={{ background: '#FDFCFA', color: INK, minHeight: '100vh', paddingBottom: 72,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif' }}>
      <style>{`
        .xa-wrap { max-width: 940px; margin: 0 auto; padding: 0 20px; }
        .xa-serif { font-family: Georgia, 'Times New Roman', serif; }
        .xa-card { background: #fff; border: 1px solid #E8E2D8; border-radius: 10px; }
        .xa-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; }
        .xa-btn { font: inherit; font-size: 15px; font-weight: 500; cursor: pointer; border-radius: 6px;
          padding: 11px 20px; border: 1px solid transparent; background: ${AMBER}; color: #fff; }
        .xa-quiet { background: #fff; color: #4A453F; border-color: #DDD6CC; }
        .xa-link { background: none; border: 0; padding: 0; font: inherit; font-size: 14px;
          color: ${AMBER}; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }
        .xa-drop { border: 2px dashed #DDD6CC; border-radius: 12px; padding: 44px 32px;
          text-align: center; cursor: pointer; background: #fff; }
        .xa-drop:hover, .xa-drop[data-drag="true"] { border-color: ${AMBER}; background: #FFFDF9; }
        .xa-chip { display: inline-block; font-family: ui-monospace, monospace; font-size: 12px;
          background: #F4F0E8; border: 1px solid #E8E2D8; border-radius: 4px;
          padding: 2px 7px; margin: 0 5px 5px 0; }
        .xa-btn:focus-visible, .xa-link:focus-visible, .xa-drop:focus-visible {
          outline: 2px solid ${AMBER}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div style={{ borderBottom: '1px solid #E8E2D8', background: '#fff' }}>
        <div className="xa-wrap" style={{ padding: 20 }}>
          <a href="/" className="xa-serif" style={{ fontSize: 20, letterSpacing: '-0.02em',
            color: INK, textDecoration: 'none' }}>
            Lex<span style={{ color: AMBER }}>alytic</span>
          </a>
        </div>
      </div>

      <div className="xa-wrap" style={{ paddingTop: 44 }}>
        {state === 'idle' && (
          <>
            <h1 className="xa-serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 2.5rem)', lineHeight: 1.15,
              letterSpacing: '-0.025em', fontWeight: 400, margin: '0 0 16px', maxWidth: 680 }}>
              The spreadsheet works. That is not the same as being right.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: '#57514A', maxWidth: 660, margin: '0 0 8px' }}>
              A formula that was overwritten with a typed number still shows a number. A link to a file
              on somebody else's drive still shows the last value it saw. A column where one cell was
              edited by hand looks exactly like a column where none was.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#8A8279', maxWidth: 660, margin: '0 0 32px' }}>
              This reads the formulas rather than the values, which is the only way to see any of it.
              Your file is opened in your browser and never uploaded.
            </p>

            <div className="xa-drop" data-drag={dragging} tabIndex={0} role="button"
              onClick={() => inputRef.current?.click()}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]) }}>
              <input ref={inputRef} type="file" accept=".xlsx,.xlsm,.xlsb"
                style={{ display: 'none' }}
                onChange={e => handleFile(e.target.files?.[0] ?? undefined)} />
              <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
                Drop a workbook here
              </div>
              <div style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7 }}>
                or click to choose one. xlsx and xlsm, up to 15MB.<br />
                Nothing is uploaded, and no macros are run.
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>What it looks for</div>
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 22 }}>
                {[
                  ['Formulas that were overwritten', 'A column of calculations with a typed number partway down. That row has stopped updating and nothing on screen says so. This is the commonest way a working spreadsheet starts producing wrong answers.'],
                  ['Formulas that disagree with their neighbours', 'One cell in a column with a different shape to the rest. Sometimes deliberate, usually a drag that went wrong or an edit that never propagated.'],
                  ['Links to other workbooks', 'A formula reading from a file on somebody\u2019s drive. It keeps showing the last value it saw, so it fails silently rather than obviously.'],
                  ['Numbers typed inside formulas', 'A VAT rate or a margin written into the calculation rather than held in a cell. When it changes, somebody has to find every one, and they will miss some.'],
                  ['Numbers stored as text', 'They look like numbers and behave like words. SUM ignores them and sorting puts 100 before 20.'],
                  ['Circular references and error values', 'Cells that refer to themselves, and anything already showing a hash error that has been scrolled past for months.'],
                ].map(([h, p]) => (
                  <div key={h}>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{h}</div>
                    <div style={{ fontSize: 14, color: '#57514A', lineHeight: 1.75 }}>{p}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {state === 'reading' && (
          <div style={{ padding: '80px 0', textAlign: 'center', fontSize: 16, color: '#8A8279' }}>
            Reading {fileName}…
          </div>
        )}

        {state === 'error' && (
          <div style={{ padding: '60px 0' }}>
            <div style={{ fontSize: 17, color: '#A13B2A', marginBottom: 16, maxWidth: 600,
              lineHeight: 1.7 }}>{errorMsg}</div>
            <button className="xa-btn" onClick={() => { setState('idle'); setErrorMsg('') }}>
              Try another file
            </button>
          </div>
        )}

        {state === 'done' && result && g && counts && (
          <>
            <div style={{ fontSize: 13, color: '#8A8279', marginBottom: 10 }}>
              <span className="xa-mono">{fileName}</span> · {result.totals.sheets} sheet
              {result.totals.sheets === 1 ? '' : 's'} · {result.totals.cells.toLocaleString('en-GB')} cells
              · {result.totals.formulas.toLocaleString('en-GB')} formulas
            </div>

            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 36, flexWrap: 'wrap',
              paddingBottom: 26, borderBottom: '2px solid ' + INK, marginBottom: 28 }}>
              <div className="xa-serif" style={{ fontSize: 72, lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: result.score >= 70 ? '#4A7C59' : result.score >= 40 ? '#B07A1E' : '#A13B2A' }}>
                {g.letter}
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div className="xa-serif" style={{ fontSize: 23, marginBottom: 10 }}>{g.words}</div>
                <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14,
                  color: '#57514A' }}>
                  {counts.critical > 0 && (
                    <span><strong style={{ color: SEV.critical.color }}>{counts.critical}</strong> critical</span>
                  )}
                  {counts.major > 0 && (
                    <span><strong style={{ color: SEV.major.color }}>{counts.major}</strong> major</span>
                  )}
                  {counts.minor > 0 && (
                    <span><strong style={{ color: SEV.minor.color }}>{counts.minor}</strong> minor</span>
                  )}
                  {result.findings.length === 0 && <span>Nothing flagged</span>}
                </div>
              </div>
              <button className="xa-link" onClick={() => { setState('idle'); setResult(null) }}>
                Check another file
              </button>
            </div>

            {result.findings.length === 0 && (
              <div className="xa-card" style={{ padding: '28px 30px', fontSize: 16,
                color: '#3F6B4C', lineHeight: 1.8 }}>
                Nothing came back. No overwritten formulas, no external links, no circular references and
                nothing showing an error. That is unusual and worth being slightly pleased about.
              </div>
            )}

            {/* Findings */}
            {grouped.map(([group, items]) => (
              <div key={group} style={{ marginBottom: 26 }}>
                <button onClick={() => setOpenGroups(o => ({ ...o, [group]: !o[group] }))}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 0,
                    font: 'inherit', padding: '0 0 12px', cursor: 'pointer', display: 'flex',
                    alignItems: 'baseline', gap: 12, borderBottom: '1px solid #E8E2D8',
                    marginBottom: 14 }}>
                  <span style={{ fontSize: 17, fontWeight: 600 }}>{group}</span>
                  <span style={{ fontSize: 13, color: '#8A8279' }}>
                    {items.length} finding{items.length === 1 ? '' : 's'}
                  </span>
                  <span style={{ fontSize: 13, color: AMBER, marginLeft: 'auto' }}>
                    {openGroups[group] ? 'Hide' : 'Show'}
                  </span>
                </button>

                {openGroups[group] && items.map(f => {
                  const s = SEV[f.severity]
                  return (
                    <div key={f.id} style={{ padding: '18px 22px', borderRadius: 8,
                      background: s.bg, border: `1px solid ${s.border}`, marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'baseline',
                        flexWrap: 'wrap', marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: s.color,
                          letterSpacing: '0.04em' }}>{s.label.toUpperCase()}</span>
                        <span style={{ fontSize: 15.5, fontWeight: 600 }}>{f.title}</span>
                      </div>
                      <p style={{ fontSize: 14.5, color: '#57514A', lineHeight: 1.8, margin: '0 0 10px' }}>
                        {f.detail}
                      </p>
                      {f.cells.length > 0 && (
                        <div style={{ marginBottom: 10 }}>
                          {f.cells.map(c => <span key={c} className="xa-chip">{c}</span>)}
                          {f.count > f.cells.length && (
                            <span style={{ fontSize: 12.5, color: '#8A8279' }}>
                              and {f.count - f.cells.length} more
                            </span>
                          )}
                        </div>
                      )}
                      <p style={{ fontSize: 14, color: '#6B6459', lineHeight: 1.75, margin: 0,
                        paddingTop: 10, borderTop: `1px solid ${s.border}` }}>
                        <strong style={{ color: s.color }}>What to do.</strong> {f.advice}
                      </p>
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Sheets */}
            <div className="xa-card" style={{ padding: '22px 26px', marginBottom: 26 }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>The sheets</div>
              {result.sheets.map(sh => (
                <div key={sh.name} style={{ display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.4fr) 110px 110px 110px', gap: 14,
                  padding: '9px 0', borderBottom: '1px solid #F7F4EF', fontSize: 14,
                  alignItems: 'baseline' }}>
                  <div style={{ fontWeight: 500 }}>{sh.name}</div>
                  <div style={{ color: '#8A8279' }}>{sh.rows} × {sh.cols}</div>
                  <div style={{ color: '#57514A' }}>{sh.formulaCount} formulas</div>
                  <div style={{ color: '#8A8279' }}>{sh.valueCount} values</div>
                </div>
              ))}
              <div style={{ fontSize: 13, color: '#8A8279', marginTop: 14, lineHeight: 1.7 }}>
                {result.totals.formulas.toLocaleString('en-GB')} formulas across{' '}
                {result.totals.uniqueFormulaShapes.toLocaleString('en-GB')} distinct shapes. A workbook
                with many more shapes than that suggests a lot of one off calculations rather than
                consistent columns, which is harder for anyone else to follow.
              </div>
            </div>

            {/* Paid */}
            {!paid ? (
              <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
                <div className="xa-serif" style={{ fontSize: 21, marginBottom: 12,
                  letterSpacing: '-0.01em' }}>
                  The bigger problem is usually that only one person understands it
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 8px', maxWidth: 600 }}>
                  Every business has a spreadsheet that somebody built, that runs something important,
                  and that nobody dares change. Usually the person who built it has moved on. The errors
                  above are worth fixing, but the risk is that the file is unreadable to anyone else.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 22px', maxWidth: 600 }}>
                  The paid version traces what depends on what, names the cells everything else is
                  built on, and writes the handover document that should have existed from the start.
                </p>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
                  <a href={STRIPE_LINK} className="xa-btn"
                    style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Unlock for £29
                  </a>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                    One payment, use it on as many workbooks as you like.
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="xa-card" style={{ padding: '24px 28px', marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
                    What everything else depends on
                  </div>
                  <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.75,
                    margin: '0 0 20px', maxWidth: 660 }}>
                    Ranked by how much breaks if the cell changes. A typed value near the top of this
                    list is the thing to be careful about, because it is an assumption that somebody
                    entered once and everything downstream believes.
                  </p>

                  {deps.length === 0 ? (
                    <div style={{ fontSize: 14.5, color: '#57514A', lineHeight: 1.75 }}>
                      Nothing in this workbook feeds anything else, which means the formulas are all
                      independent. Unusual, and it makes the file easier to change than most.
                    </div>
                  ) : deps.map((d, i) => (
                    <div key={d.key} style={{ display: 'grid',
                      gridTemplateColumns: '28px 130px minmax(0, 1fr) 110px', gap: 14,
                      padding: '10px 0', borderBottom: '1px solid #F7F4EF',
                      fontSize: 14, alignItems: 'baseline' }}>
                      <div style={{ color: '#C4BDB2' }}>{i + 1}</div>
                      <div>
                        <span className="xa-mono">{d.sheet}!{d.ref}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#57514A' }}>
                        {d.isInput ? (
                          <span style={{ color: '#A13B2A', fontWeight: 500 }}>
                            A typed value, not a formula
                          </span>
                        ) : (
                          <span className="xa-mono" style={{ color: '#8A8279' }}>
                            {(d.formula || '').slice(0, 46)}{(d.formula || '').length > 46 ? '…' : ''}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13.5, textAlign: 'right',
                        color: d.totalFeeds > 50 ? '#A13B2A' : '#57514A' }}>
                        {d.totalFeeds} cells
                      </div>
                    </div>
                  ))}

                  {deps.some(d => d.isInput && d.totalFeeds > 20) && (
                    <div style={{ marginTop: 16, padding: '14px 16px', borderRadius: 6,
                      background: 'rgba(161,59,42,0.05)', border: '1px solid rgba(161,59,42,0.22)',
                      fontSize: 14, color: '#A13B2A', lineHeight: 1.75 }}>
                      Some of the cells everything depends on are typed values rather than formulas. Those
                      are assumptions, and they should be labelled and kept together on an assumptions
                      sheet rather than sitting in the middle of the calculation where nobody will find
                      them.
                    </div>
                  )}
                </div>

                <div style={{ padding: 30, borderRadius: 10, background: INK, color: '#fff' }}>
                  <div className="xa-serif" style={{ fontSize: 20, marginBottom: 12 }}>
                    The handover document
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                    margin: '0 0 20px', maxWidth: 580 }}>
                    Everything above written up as one document: what each sheet does, what the file
                    depends on, what is wrong with it and what to do. The thing to hand somebody when
                    you go on holiday, or when you leave.
                  </p>
                  <button className="xa-btn" onClick={() => {
                    const rows = result.findings.map(f =>
                      `<tr><td>${SEV[f.severity].label}</td><td>${f.title}</td><td class="m">${f.cells.join(', ')}</td><td>${f.advice}</td></tr>`).join('')
                    const shRows = result.sheets.map(sh =>
                      `<tr><td>${sh.name}</td><td class="r">${sh.rows} × ${sh.cols}</td><td class="r">${sh.formulaCount}</td><td class="r">${sh.valueCount}</td></tr>`).join('')
                    const depRows = deps.map(d =>
                      `<tr><td class="m">${d.sheet}!${d.ref}</td><td>${d.isInput ? 'Typed value' : 'Formula'}</td><td class="r">${d.totalFeeds}</td></tr>`).join('')
                    const today = new Date().toLocaleDateString('en-GB',
                      { day: 'numeric', month: 'long', year: 'numeric' })
                    const w = window.open('', '_blank')
                    if (w) {
                      w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${fileName} handover</title>
<style>@page{margin:20mm}body{font-family:Georgia,serif;max-width:780px;margin:0 auto;padding:28px;font-size:13.5px;line-height:1.7;color:#111}
h1{font-size:23px;margin:0 0 4px}h2{font-size:17px;margin:28px 0 10px}.sub{color:#666;font-size:13px;margin:0 0 24px}
table{width:100%;border-collapse:collapse;margin:10px 0 18px;font-size:12px}
th,td{text-align:left;padding:7px 6px;border-bottom:1px solid #ddd;vertical-align:top}
th{border-bottom:2px solid #333}.r{text-align:right}.m{font-family:monospace;font-size:11.5px}
.note{font-size:11.5px;color:#666;border-top:1px solid #ddd;padding-top:12px;margin-top:26px}
@media print{.noprint{display:none}}</style></head><body>
<div class="noprint" style="background:#1A1815;color:#fff;padding:13px 17px;border-radius:8px;margin-bottom:24px;font-family:sans-serif;font-size:13px">
Print and choose Save as PDF. Keep it with the workbook.</div>
<h1>${fileName}</h1>
<p class="sub">Reviewed ${today} &middot; ${result.totals.sheets} sheets &middot; ${result.totals.cells.toLocaleString('en-GB')} cells &middot; ${result.totals.formulas.toLocaleString('en-GB')} formulas</p>
<h2>What is in it</h2>
<table><thead><tr><th>Sheet</th><th class="r">Size</th><th class="r">Formulas</th><th class="r">Values</th></tr></thead><tbody>${shRows}</tbody></table>
<h2>What everything depends on</h2>
<p>Ranked by how much of the workbook changes if the cell does. A typed value high in this list is an assumption somebody entered once.</p>
<table><thead><tr><th>Cell</th><th>Kind</th><th class="r">Cells affected</th></tr></thead><tbody>${depRows || '<tr><td colspan="3">Nothing feeds anything else.</td></tr>'}</tbody></table>
<h2>What is wrong with it</h2>
<table><thead><tr><th>Severity</th><th>Finding</th><th>Where</th><th>What to do</th></tr></thead><tbody>${rows || '<tr><td colspan="4">Nothing flagged.</td></tr>'}</tbody></table>
<p class="note">Produced by the free spreadsheet audit at lexalytic.com. It reads formulas and structure, not meaning: it cannot tell whether the calculation is the right calculation, only whether it is built in a way that will hold up. A workbook that scores well can still be answering the wrong question.</p>
</body></html>`)
                      w.document.close()
                    }
                  }}>Open the handover document</button>
                </div>
              </>
            )}

            <p style={{ fontSize: 13, color: '#8A8279', lineHeight: 1.7, marginTop: 28, maxWidth: 660 }}>
              This reads formulas and structure, not meaning. It cannot tell you whether a calculation
              is the right calculation, only whether it is built in a way that will hold up when
              somebody adds a row or changes a rate. A workbook that scores well can still be answering
              the wrong question, and that is the part that needs a person.
            </p>
          </>
        )}

        <p style={{ fontSize: 14, color: '#8A8279', lineHeight: 1.7, marginTop: 24, maxWidth: 660 }}>
          Built by <a href="/" style={{ color: AMBER }}>Lexalytic</a>. See our other{' '}
          <a href="/tools" style={{ color: AMBER }}>free tools</a>.
        </p>
      </div>
    </div>
  )
}
