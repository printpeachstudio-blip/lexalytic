import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/privacy' },
  title: 'Privacy Policy | Lexalytic',
  description: 'What data Lexalytic collects, why, how long it is kept, and how to get it deleted. Covers the website, the free tools, Retention Manager and Margin Manager.',
  robots: { index: true, follow: true },
}

const UPDATED = '10 September 2026'

export default function PrivacyPage() {
  const H = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)', marginBottom: '16px', marginTop: '40px' }}>
      {children}
    </h2>
  )
  const P = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '14px' }}>
      {children}
    </p>
  )

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
          <Link href="/terms" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Terms</Link>
        </div>
      </nav>

      <section style={{ paddingTop: '130px', paddingBottom: '48px', background: 'var(--bg-2)',
        borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', lineHeight: '1.15',
            letterSpacing: '-0.02em', marginBottom: '14px' }}>Privacy policy</h1>
          <p style={{ fontSize: '15px', color: 'var(--ink-3)', margin: 0 }}>Last updated {UPDATED}</p>
        </div>
      </section>

      <article style={{ padding: 'clamp(40px, 6vw, 70px) 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <P>
            Lexalytic is the data controller for the information described here. We are based in Bushey,
            Hertfordshire and you can reach us at{' '}
            <a href="mailto:hello@lexalytic.com" style={{ color: 'var(--amber)' }}>hello@lexalytic.com</a>.
          </P>
          <P>
            This covers three different things, and what happens to your data differs considerably
            between them.
          </P>

          <H>The free tools</H>
          <P>
            The tools at lexalytic.com/tools run entirely in your browser. Spreadsheets you check,
            properties you enter, jobs you track and placements you record are held in your browser
            storage on your own device. They are never sent to us and we cannot see them.
          </P>
          <P>
            That is why clearing your browser data erases them and why they do not appear on another
            device. It is a deliberate trade, and it means we hold nothing about your use of those tools
            beyond ordinary website analytics.
          </P>
          <P>
            If you send an enquiry from a tool, the form submission goes to us through Formspree and
            includes whatever summary the tool generated. That we do receive and keep.
          </P>

          <H>Retention Manager and other subscription software</H>
          <P>
            This is different. To provide an account, sync across devices and send reminders, we store
            your data on servers we control.
          </P>
          <P><strong>What we hold:</strong> your name and email address, your company name, address and
            phone number, and the operational data you enter. For Retention Manager that means job
            references, main contractor names and email addresses, contract values, certified sums,
            retention rates, completion dates, payments received, certificate references and the
            applications you have generated.</P>
          <P><strong>Why:</strong> to run the service you have asked for. The lawful basis is performance
            of a contract. For service emails such as reminders and billing notices, the basis is also
            contractual performance rather than consent, because they are part of what you are paying
            for.</P>
          <P><strong>Where:</strong> in a PostgreSQL database hosted by Supabase in London. Row level
            security means your organisation can only read its own rows.</P>
          <P><strong>How long:</strong> for as long as your account is open. After a subscription ends we
            keep it for ninety days in case you return, then delete it. You can ask us to delete it
            sooner and we will do so within thirty days.</P>

          <H>Information about other people</H>
          <P>
            The software lets you record details of people at other businesses, typically a contact at a
            main contractor. Where you do that you are the controller of that information and you need a
            lawful basis for holding it, which in a commercial context is usually legitimate interests.
            We process it on your instructions as a processor.
          </P>
          <P>
            We do not contact those people. Nothing you enter about a third party is used for our own
            marketing.
          </P>

          <H>The website</H>
          <P>
            We keep server logs including IP addresses for security and diagnostics, held for a short
            period. Contact form submissions come to us through Formspree.
          </P>
          <P>
            We do not run advertising trackers or sell data to anyone.
          </P>

          <H>Who else is involved</H>
          <P>
            We use a small number of providers to run the service. Each processes data only to deliver
            their part of it.
          </P>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
            overflow: 'hidden', marginBottom: '20px' }}>
            {[
              ['Supabase', 'Database and authentication for the software. Data held in London.'],
              ['Vercel', 'Hosting for the website and application.'],
              ['Stripe', 'Payment processing. Card details go to Stripe directly and we never see them.'],
              ['Resend', 'Sending reminder and service emails.'],
              ['Namecheap PrivateEmail', 'Our own mailbox, so email you send us passes through it.'],
              ['Formspree', 'Contact and enquiry form submissions.'],
            ].map(([name, what], i, arr) => (
              <div key={name} style={{ padding: '14px 20px', background: 'var(--white)',
                borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'grid', gridTemplateColumns: 'minmax(0, 190px) minmax(0, 1fr)', gap: '16px' }}>
                <div style={{ fontSize: '14.5px', fontWeight: '600' }}>{name}</div>
                <div style={{ fontSize: '14px', color: 'var(--ink-3)', lineHeight: '1.7' }}>{what}</div>
              </div>
            ))}
          </div>
          <P>
            Some of these are US companies. Where data leaves the UK it is covered by the UK addendum to
            the EU standard contractual clauses or an equivalent safeguard.
          </P>

          <H>What we do not do</H>
          <P>
            We do not sell your data. We do not share it with advertisers. We do not use anything you
            enter to train machine learning models, ours or anybody else's. We do not read your job data
            except where you ask us to help with a support problem.
          </P>

          <H>Your rights</H>
          <P>
            Under UK GDPR you can ask for a copy of what we hold, ask us to correct it, ask us to delete
            it, object to how we use it, or ask us to restrict processing. Email us and we will respond
            within thirty days.
          </P>
          <P>
            You can also export your own data to CSV from within the software at any point without
            asking us.
          </P>
          <P>
            If you are unhappy with how we have handled your information you can complain to the
            Information Commissioner's Office at ico.org.uk, though we would rather you told us first so
            we can put it right.
          </P>

          <H>Security</H>
          <P>
            Data is encrypted in transit and at rest. Access is controlled at the database level so one
            organisation cannot read another's rows. Passwords are hashed and we never see them. Payment
            card details never touch our systems.
          </P>
          <P>
            No system is perfectly secure. If a breach occurs that is likely to affect your rights we
            will tell you and the ICO within seventy two hours.
          </P>
        <H>Where your data goes when you use a tool</H>
        <P>
          Most of the free calculators run entirely in your browser. Nothing you type reaches us,
          which is the point of building them that way: they work on a client list you would not be
          comfortable emailing.
        </P>
        <P>
          Two things are different and worth naming plainly. The Companies House check in the data
          health tool sends only the company numbers to our server and on to the Companies House
          public API. Names, emails, addresses and phone numbers stay in your browser and are never
          transmitted. A company number is public register data rather than personal data.
        </P>
        <P>
          Invoices uploaded to Margin Manager are stored in our database and sent to Anthropic, whose
          model reads them and returns the line items. They process the file to give that answer and
          do not use it to train their models. The file stays in your account until you delete it,
          and deleting the invoice deletes the file.
        </P>

        <H>Who else handles your data</H>
        <P>
          Supabase for the database and file storage, hosted in London. Vercel for hosting. Stripe
          for payments, who hold card details so that we do not. Resend for the emails the software
          sends. Anthropic for reading uploaded invoices. Each acts on our instructions and none of
          them sells your data.
        </P>
        <P>
          Where you pay us, Stripe also collect what they need for their own legal obligations, and
          their privacy notice governs that part.
        </P>

          <H>Changes</H>
          <P>
            We will update this page when things change and revise the date at the top. For anything
            that materially affects how we handle your data we will email you first.
          </P>

          <div style={{ marginTop: '56px', padding: '28px 30px', background: 'var(--bg-2)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '12px', marginTop: 0 }}>Getting in touch</h2>
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
          <Link href="/terms" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Terms of service</Link>
        </div>
      </footer>
    </div>
  )
}
