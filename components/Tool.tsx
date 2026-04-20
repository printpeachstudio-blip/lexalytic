'use client'
import { useState } from 'react'

export default function Tool() {
  const [people, setPeople] = useState(2)
  const [hours, setHours] = useState(5)
  const [freq, setFreq] = useState(4)
  const [salary, setSalary] = useState(35000)
  const [showResult, setShowResult] = useState(false)

  const hourlyRate = salary / 52 / 37.5
  const hoursPerYear = people * hours * freq * 12
  const annualCost = Math.round(hoursPerYear * hourlyRate)
  const automatedCost = Math.round(hoursPerYear * hourlyRate * 0.05)
  const saving = annualCost - automatedCost
  const roiMonths = Math.round((495 / (saving / 12)) * 10) / 10

  return (
    <section id="tool" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <span className="section-label">Free tool</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '60px', alignItems: 'start' }}>

          {/* Left — intro */}
          <div>
            <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>
              What is your manual reporting <em style={{ color: 'var(--amber)' }}>actually costing you?</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px', fontSize: '15px', lineHeight: '1.7' }}>
              Most businesses don't realise how much manual data work costs in real terms. Use this calculator to find out — and see how quickly automation pays for itself.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Takes under 60 seconds',
                'No email required',
                'Instant result',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--amber)', fontSize: '16px' }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — calculator */}
          <div style={{
            background: 'var(--bg-dark-2)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-lg)', padding: 'clamp(24px, 4vw, 36px)',
          }}>
            {[
              { label: 'How many people run manual reports?', value: people, setter: setPeople, min: 1, max: 20, unit: people === 1 ? 'person' : 'people' },
              { label: 'Hours per report (on average)?', value: hours, setter: setHours, min: 0.5, max: 20, unit: 'hours', step: 0.5 },
              { label: 'Reports per month?', value: freq, setter: setFreq, min: 1, max: 30, unit: freq === 1 ? 'report' : 'reports' },
              { label: 'Average annual salary of those involved?', value: salary, setter: setSalary, min: 20000, max: 120000, unit: `£${salary.toLocaleString()}`, step: 1000 },
            ].map((field, i) => (
              <div key={i} style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <label style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: '400' }}>{field.label}</label>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--amber)' }}>{field.unit}</span>
                </div>
                <input type="range" min={field.min} max={field.max} step={field.step || 1}
                  value={field.value} onChange={e => { field.setter(Number(e.target.value)); setShowResult(false); }}
                  style={{ width: '100%', accentColor: 'var(--amber)' }}
                />
              </div>
            ))}

            <button onClick={() => setShowResult(true)} className="btn-amber" style={{ width: '100%', justifyContent: 'center', marginBottom: '20px' }}>
              Calculate my cost →
            </button>

            {showResult && (
              <div style={{
                background: 'rgba(193,125,46,0.08)', border: '1px solid rgba(193,125,46,0.2)',
                borderRadius: 'var(--radius)', padding: '20px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Annual cost now</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: '#ef4444' }}>£{annualCost.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>After automation</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--amber)' }}>£{automatedCost.toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>
                    You could save <strong style={{ color: 'var(--white)' }}>£{saving.toLocaleString()}/year</strong> — and automation typically pays for itself within months of delivery.</strong>
                  </div>
                  <a href="#contact" className="btn-amber" style={{ marginTop: '16px', width: '100%', justifyContent: 'center', fontSize: '14px' }}>
                    Let's fix this — book a free call →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #tool .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
