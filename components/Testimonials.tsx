'use client'

const testimonials = [
  {
    quote: "Without Lexalytic's help, I was working on 3 excel spreadsheets to manage my bookings for trainings, registers, finance on the same project, but they managed to put it all on one database and most of the work is now done by pressing a button instead of copying and pasting. All work done within set deadlines and communication was great.",
    name: "Silvia Z",
    role: "Quality Assurance Officer",
    company: "Royal Borough of Kensington and Chelsea",
    initial: "K",
  },
  {
    quote: "From our first conversation we knew that we had finally found the perfect company to build exactly what we needed for our business. Mihir was exceptionally efficient and professional. His work has meant I can grow my own business far more successfully.",
    name: "Sarah Quirk",
    role: "Nutritional Advisor",
    company: "Sarah Q Nutrition",
    initial: "S",
  },
  {
    quote: "Lexalytic immediately understood what we wanted via a brief phone call. Their personal attention and speed of turnaround was phenomenal. They not only delivered upon their promises, they were also a pleasure to work with. They have now become an additional outsourced member of our team.",
    name: "David Nikolich",
    role: "Founder & MD",
    company: "Abstract",
    initial: "A",
  },
  {
    quote: "Using Lexalytic has saved me a massive amount of work, time and headaches. I was provided with a professional and efficient service at each stage — I also felt that I was properly listened to and my needs and requirements were met.",
    name: "Kate Freethe",
    role: "Workshops Administrator",
    company: "Royal Shakespeare Company",
    initial: "R",
  },
  {
    quote: "Lexalytic has helped my business grow with custom reports, including aircraft technical reports through visual basic automation of data sources. I highly recommend this service for any data automation project.",
    name: "Jeff Brandon",
    role: "Director",
    company: "White Cloud Aviation Services Ltd",
    initial: "W",
  },
  {
    quote: "We had a challenging problem with our 5 year plan spreadsheet that we had tried and failed several times to fix ourselves. Lexalytic came to our rescue and fixed it within a few hours.",
    name: "Melvin Jay",
    role: "CEO & Founder",
    company: "Gunna Drinks",
    initial: "G",
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(60px, 8vw, 100px) 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '56px', flexWrap: 'wrap' }}>
          <img src="/mihir.jpg" alt="Mihir Hindocha — Founder of Lexalytic" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(193,125,46,0.4)', flexShrink: 0, marginTop: '4px' }} />
          <div style={{ flex: 1 }}>
            <span className="section-label">Client testimonials</span>
            <h2 style={{ color: 'var(--white)', maxWidth: '480px', marginBottom: '12px' }}>What clients say about working with Mihir.</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: '1.7', maxWidth: '520px' }}>
              15 years experience across Shell, NHS, Warner Bros, Citi, and Foster & Partners — now working directly with UK businesses of every size. Every project is handled personally.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: 'var(--amber)', fontSize: '14px' }}>★</span>
                ))}
              </div>
              <p style={{
                fontSize: '14px', lineHeight: '1.8',
                color: 'rgba(255,255,255,0.7)',
                fontWeight: '300', flex: 1,
                fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'rgba(193,125,46,0.2)',
                  border: '1px solid rgba(193,125,46,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '15px', fontWeight: '600', color: 'var(--amber)',
                  flexShrink: 0, fontFamily: 'var(--serif)',
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: 'var(--white)' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
