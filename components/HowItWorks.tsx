'use client'

/**
 * The process, with the payment point made explicit.
 *
 * Most agencies take half the money before they start. Not taking anything
 * until the client has watched the thing work is the single most reassuring
 * thing we can say to somebody who has never bought custom software and is
 * worried about paying for something that never arrives. So it gets its own
 * step and its own weight rather than a line in the small print.
 */

const steps = [
  {
    num: '1',
    title: 'A call',
    desc: 'Half an hour, free, no forms first. You describe what is slowing you down and we work out whether building something is the right answer. Sometimes it is not, and we will say so.',
  },
  {
    num: '2',
    title: 'We work out what it actually needs to do',
    desc: 'The difference between what people ask for and what they need is usually a couple of questions. We ask them now rather than halfway through, because that is where projects go wrong.',
  },
  {
    num: '3',
    title: 'A fixed price, in writing',
    desc: 'One number for the whole thing, agreed before anything starts. Not an estimate that moves, and not a day rate. If we get the scope wrong, that is our problem rather than your invoice.',
  },
  {
    num: '4',
    title: 'We build it',
    desc: 'You get progress as it goes rather than silence and then a reveal. Most things are done inside a couple of weeks, tested against your real data rather than a demo set.',
  },
  {
    num: '5',
    title: 'You watch it work, and you have still paid nothing',
    desc: 'A video call where we go through the finished thing with your data in it. You use it, you ask for changes, and only when you are happy does any money change hands. Nothing up front, no deposit, no staged payments.',
    weight: true,
  },
  {
    num: '6',
    title: 'You pay, and it is yours',
    desc: 'Payment, then handover. The code, the hosting account, the documentation. You own it outright rather than licensing it back from us, and you can take it to somebody else whenever you like.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding: 'clamp(60px, 8vw, 100px) 0',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <h2 style={{ marginBottom: '16px', maxWidth: '620px' }}>
          Nobody pays us before they have seen it working
        </h2>
        <p
          style={{
            fontSize: '17px',
            color: 'var(--ink-2)',
            lineHeight: '1.8',
            maxWidth: '660px',
            marginBottom: '52px',
          }}
        >
          Most agencies take half the money before they write a line. We do not take any of it until
          you have sat on a call and watched the thing do what you asked for. If it does not, you have
          lost nothing.
        </p>

        <div style={{ position: 'relative' }}>
          {/* the line running down the numbers */}
          <div
            aria-hidden="true"
            className="hiw-spine"
            style={{
              position: 'absolute',
              left: '19px',
              top: '18px',
              bottom: '30px',
              width: '1px',
              background: 'var(--border)',
            }}
          />

          {steps.map((s) => (
            <div
              key={s.num}
              style={{
                display: 'flex',
                gap: '22px',
                marginBottom: '30px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '39px',
                  height: '39px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--serif)',
                  fontSize: '16px',
                  background: s.weight ? 'var(--amber)' : 'var(--bg)',
                  color: s.weight ? '#fff' : 'var(--ink-3)',
                  border: `1px solid ${s.weight ? 'var(--amber)' : 'var(--border)'}`,
                  zIndex: 1,
                }}
              >
                {s.num}
              </div>

              <div
                style={{
                  flex: 1,
                  paddingBottom: s.weight ? '22px' : 0,
                  paddingLeft: s.weight ? '22px' : 0,
                  paddingRight: s.weight ? '22px' : 0,
                  paddingTop: s.weight ? '18px' : '6px',
                  marginTop: s.weight ? '-18px' : 0,
                  borderRadius: s.weight ? 'var(--radius-lg)' : 0,
                  background: s.weight ? 'rgba(193,125,46,0.05)' : 'transparent',
                  border: s.weight ? '1px solid rgba(193,125,46,0.22)' : 'none',
                  maxWidth: '680px',
                }}
              >
                <div
                  style={{
                    fontSize: s.weight ? '17px' : '16px',
                    fontWeight: 600,
                    marginBottom: '7px',
                    color: 'var(--ink)',
                  }}
                >
                  {s.title}
                </div>
                <p
                  style={{
                    fontSize: '15.5px',
                    color: 'var(--ink-2)',
                    lineHeight: '1.8',
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--ink-3)',
            lineHeight: '1.8',
            maxWidth: '660px',
            marginTop: '10px',
          }}
        >
          The reason it works this way round is that most people buying custom software have not bought
          it before, and the thing they are afraid of is paying for something that never turns up. This
          removes that. It also means we only get paid for work somebody is actually pleased with, which
          concentrates the mind.
        </p>
      </div>
    </section>
  )
}
