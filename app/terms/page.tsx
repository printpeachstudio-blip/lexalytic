import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/terms' },
  title: 'Terms of Service | Lexalytic',
  description: 'The terms that apply when you use Lexalytic software, including Retention Manager and the free tools.',
  robots: { index: true, follow: true },
}

const UPDATED = '10 September 2026'

const sections: [string, string[]][] = [
  ['1. Who you are contracting with', [
    'These terms apply to Lexalytic, a business operated by Mihir Hindocha, based in Bushey, Hertfordshire, United Kingdom. Where these terms say we, us or our, they mean Lexalytic. Where they say you, they mean the person or business using the service.',
    'You can reach us at hello@lexalytic.com. We answer within one working day.',
  ]],

  ['2. What these terms cover', [
    'These terms apply to Retention Manager and to any other subscription software we provide, to the free tools on our website, and to one-off documents purchased through the site such as the Retention Recovery Pack, Desk Exposure Report and Cash Release Plan.',
    'Separate written agreements govern bespoke development work. Where a signed contract for a project conflicts with these terms, that contract takes precedence for that project.',
  ]],

  ['3. Your account', [
    'You need an account to use the subscription software. You are responsible for keeping your password secure and for anything done through your account. Tell us promptly if you believe someone else has gained access.',
    'You must be at least 18 and using the service for business purposes. This is not a consumer product, so the consumer cancellation rights under the Consumer Contracts Regulations do not apply. Our cancellation terms are set out in section 6 and are more generous than those regulations require in most respects.',
    'One person on the account is the owner. Only the owner can change the plan, manage billing or invite others. If the owner leaves your business, contact us and we will transfer ownership once we are satisfied the request is genuine.',
  ]],

  ['4. Free trial', [
    'New accounts get fourteen days of full access without providing payment details. At the end of the trial the software locks until you choose a plan. Nothing you entered is deleted.',
    'One trial per organisation. We may decline to offer a further trial to an account that has already had one.',
  ]],

  ['5. Payment', [
    'Subscriptions are billed monthly in advance through Stripe. We do not see or store your card details. Prices are shown on the pricing page and include VAT where it applies.',
    'If a payment fails we will keep your access open while Stripe retries, and we will tell you. If it has not succeeded after those retries we may suspend access until it does. We will not delete anything for non-payment.',
    'We may change prices. If we do, we will give at least thirty days notice by email and the new price applies from your next renewal after that period. If you do not want to continue at the new price, cancel before it takes effect.',
    'One-off document purchases are charged at the price shown at the point of purchase and are not recurring.',
  ]],

  ['6. Cancelling', [
    'Cancel at any time from the billing page. There is no notice period and no minimum term.',
    'Your access continues until the end of the period you have already paid for. We do not refund part months, because you keep the service for the period you paid for.',
    'Export your data to CSV before your access ends. We keep your data for ninety days after a subscription ends in case you come back, then delete it. You can ask us to delete it sooner and we will.',
  ]],

  ['7. What the software does and does not do', [
    'Retention Manager calculates release dates, tracks payments and generates documents from figures you enter. The calculations follow the common contractual patterns described in the software, but your contract may say something different. It is your responsibility to check the figures and dates against your own contract before relying on them or sending anything to a third party.',
    'The application for release of retention, and the other documents the software generates, are templates based on the statutory framework. They are not legal advice and we are not a law firm. Read anything before you send it. If a matter is contentious or the sums are significant, take advice from a solicitor or a specialist adjudication practitioner.',
    'The free tools on our website are provided for general guidance. They do not constitute legal, financial, tax or professional advice of any kind.',
    'Statutory interest rates and legislative thresholds change. We update the software when they do, but you should verify current figures for anything you rely on.',
  ]],

  ['8. Reminder emails', [
    'The software can email you before and after retention release dates. These are sent on a best efforts basis. Email delivery depends on services outside our control, and a reminder may be delayed, filtered as spam, or not arrive.',
    'You remain responsible for your own deadlines. A missed reminder is not a defence to a missed release date, and we are not liable for retention that goes unclaimed.',
  ]],

  ['9. Your data', [
    'The data you enter stays yours. We do not sell it, and we do not use it to train anything.',
    'We process it to run the service, as described in our privacy policy. Where you enter information about other people, such as a contact at a main contractor, you are responsible for having a lawful basis to do so.',
    'You can export everything to CSV at any time, and you can ask us to delete your account and its data at any point.',
  ]],

  ['10. Availability', [
    'We aim to keep the service running but do not guarantee uninterrupted availability. We may need to take it offline for maintenance, and we will avoid doing that during UK working hours where we can.',
    'We do not offer a service level agreement or guaranteed response times. If that matters to your business, this may not be the right product for you.',
  ]],

  ['11. Acceptable use', [
    'Do not attempt to access other users data, probe or test our security, use the service to break the law, resell access without our written agreement, or overload the service with automated requests.',
    'We may suspend or close an account that does any of these, and where the breach is serious we will do so without notice.',
  ]],

  ['12. Liability', [
    'Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for anything else that cannot be limited under English law.',
    'Subject to that, our total liability to you for all claims in any twelve month period is limited to the amount you paid us in that period. Where you use the free tools and have paid us nothing, our liability is limited to one hundred pounds.',
    'We are not liable for loss of profit, loss of business, loss of anticipated savings, loss of data, or for retention, rebates or other sums that go unrecovered. That is the practical consequence of the service being a tool rather than a professional adviser.',
    'This allocation of risk is reflected in the price. A product that guaranteed outcomes would cost considerably more than nineteen pounds a month.',
  ]],

  ['13. Changing these terms', [
    'We may update these terms. For minor changes we will update this page and the date at the top. For changes that materially affect your rights we will email you at least thirty days beforehand.',
    'If you do not accept a change, cancel before it takes effect. Continuing to use the service after that point means you accept the updated terms.',
  ]],

  ['14. Ending the agreement', [
    'You can close your account at any time. We may close an account for a serious breach of these terms, for non-payment after we have contacted you, or on thirty days written notice if we discontinue the product.',
    'If we discontinue the product we will refund any period you have paid for and not received, and give you time to export your data.',
  ]],

  ['15. Law', [
    'These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive jurisdiction.',
  ]],

  ['13. The free tools and one-off reports', [
    'The calculators on this site run in your browser and apply general rules to the numbers you enter. They do not know your contract, your council, your accounting policies or anything else particular to you, and a general rule is not a substitute for the document that actually governs your position.',
    'Several of them touch things with legal or financial consequences. Treat the output as a prompt to check rather than an answer to rely on, and where a decision matters take advice from someone who can see the whole picture.',
    'Some tools produce a report for a one-off payment. The report sets out the figures you entered and what our model makes of them, with the working shown. We do not check the figures you gave us, and the report is a management document rather than professional advice.',
    'If a report is not what you expected, tell us within fourteen days and we will refund it without asking why. Digital content supplied immediately can lose the automatic cancellation right, and we would rather give the money back than rely on that.',
  ]],
]

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px',
            color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <Link href="/privacy" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Privacy</Link>
        </div>
      </nav>

      <section style={{ paddingTop: '130px', paddingBottom: '48px', background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', lineHeight: '1.15',
            letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Terms of service
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', margin: 0 }}>
            Last updated {UPDATED}
          </p>
        </div>
      </section>

      <article style={{ padding: 'clamp(40px, 6vw, 70px) 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '44px' }}>
            These are written to be read rather than to be impenetrable. If anything here is unclear,
            email <a href="mailto:hello@lexalytic.com" style={{ color: 'var(--amber)' }}>hello@lexalytic.com</a> and
            we will explain it plainly.
          </p>

          {sections.map(([heading, paras]) => (
            <div key={heading} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', marginBottom: '16px' }}>
                {heading}
              </h2>
              {paras.map((p, i) => (
                <p key={i} style={{ fontSize: '16px', color: 'var(--ink-2)',
                  lineHeight: '1.85', marginBottom: '14px' }}>{p}</p>
              ))}
            </div>
          ))}

          <div style={{ marginTop: '56px', padding: '28px 30px', background: 'var(--bg-2)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Getting in touch</h2>
            <p style={{ fontSize: '15px', color: 'var(--ink-3)', lineHeight: '1.8', margin: 0 }}>
              Lexalytic, Bushey, Hertfordshire, United Kingdom.{' '}
              <a href="mailto:hello@lexalytic.com" style={{ color: 'var(--amber)' }}>hello@lexalytic.com</a>
            </p>
          </div>
        </div>
      </article>

      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px',
            color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            Lex<span style={{ color: 'var(--amber)' }}>alytic</span>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>© 2026 Lexalytic</p>
          <Link href="/privacy" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Privacy policy</Link>
        </div>
      </footer>
    </div>
  )
}
