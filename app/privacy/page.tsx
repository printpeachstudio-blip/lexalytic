import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/privacy' },
  title: 'Privacy Policy | Lexalytic',
  description: 'Privacy policy for Lexalytic — UK digital studio.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <Link href="/" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>← Back to home</Link>
        </div>
      </nav>
      <div className="container" style={{ maxWidth: '720px', paddingTop: '120px', paddingBottom: '80px' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', marginBottom: '8px', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p style={{ fontSize: '14px', color: 'var(--ink-4)', marginBottom: '48px' }}>Last updated: September 2026</p>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', marginTop: '40px' }}>Who we are</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>Lexalytic is a UK digital studio operated by Mihir Hindocha, based in Bushey, Hertfordshire. We build websites, custom business software, AI-powered tools, and data systems for UK businesses. Our website is lexalytic.com and you can contact us at hello@lexalytic.com.</p>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', marginTop: '40px' }}>What data we collect</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>We collect information you provide directly when you contact us through the website form — specifically your name, email address, company name, and the message you send. We do not collect any data automatically beyond standard server logs, and we do not use cookies for tracking or advertising.</p>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', marginTop: '40px' }}>How we use your data</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>We use the information you send us solely to respond to your enquiry and, where relevant, to provide the services you have requested. We do not sell your data to third parties. We do not add you to marketing lists without your explicit consent.</p>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', marginTop: '40px' }}>Third party services</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>Our contact form uses Formspree to process submissions. Messages sent through the form are stored by Formspree and forwarded to us by email. Formspree&#x27;s privacy policy is available at formspree.io/legal/privacy-policy. Our website is hosted on Vercel. Standard server logs may be retained by Vercel in accordance with their privacy policy at vercel.com/legal/privacy-policy.</p>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', marginTop: '40px' }}>Your rights</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>Under UK GDPR you have the right to access the personal data we hold about you, to request correction or deletion of that data, and to object to its processing. To exercise any of these rights, contact us at hello@lexalytic.com. We will respond within 30 days.</p>

        <h2 style={{ fontSize: '1.2rem', marginBottom: '12px', marginTop: '40px' }}>Contact</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: '1.8', marginBottom: '24px' }}>For any privacy-related questions, contact us at <a href="mailto:hello@lexalytic.com" style={{ color: 'var(--amber)' }}>hello@lexalytic.com</a>.</p>
      </div>
    </div>
  )
}
