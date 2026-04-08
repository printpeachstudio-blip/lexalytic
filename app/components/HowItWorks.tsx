const steps = [
  {
    num: '01',
    title: 'Tell us your problem',
    desc: 'Book a free 30-minute call or send us your spreadsheet. No forms to fill in, no lengthy questionnaires — just tell us what\'s slowing you down.',
  },
  {
    num: '02',
    title: 'We scope it in 48 hours',
    desc: 'We review your process and come back within 48 hours with a clear scope, fixed price, and timeline. No vague estimates, no surprises.',
  },
  {
    num: '03',
    title: 'We build it',
    desc: 'We get to work. You get progress updates. Most projects are delivered within a week. We test everything against your real data before handover.',
  },
  {
    num: '04',
    title: 'You get the keys',
    desc: 'Full handover with documentation and a walkthrough so your team can use it confidently. Ongoing support available if you need it.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <span className="section-label">How it works</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ color: 'var(--white)', maxWidth: '420px' }}>Simple, structured, no jargon.</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '320px', fontSize: '15px' }}>From first call to live solution — most projects take less than two weeks.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-dark)', padding: 'clamp(28px, 4vw, 40px) 28px' }}>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: '52px', lineHeight: 1,
                color: 'rgba(255,255,255,0.08)', marginBottom: '20px',
              }}>{s.num}</div>
              <h3 style={{ color: 'var(--white)', marginBottom: '12px', fontSize: '17px', fontFamily: 'var(--serif)' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: '1.7', fontWeight: '300' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#contact" className="btn-amber">Start the conversation →</a>
        </div>
      </div>
    </section>
  )
}
