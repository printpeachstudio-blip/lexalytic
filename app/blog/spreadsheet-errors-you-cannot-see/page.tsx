import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/spreadsheet-errors-you-cannot-see' },
  title: 'The Spreadsheet Errors You Cannot See | Lexalytic',
  description: 'A formula overwritten with a typed number still shows a number. A link to a missing file still shows the last value it saw. The dangerous errors are the ones that look perfectly reasonable.',
  openGraph: {
    title: 'The Spreadsheet Errors You Cannot See',
    description: 'A formula overwritten with a typed number still shows a number. A link to a missing file still shows the last value it saw. The dangerous errors are the ones that look perfectly reasonable.',
    url: 'https://www.lexalytic.com/blog/spreadsheet-errors-you-cannot-see',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Spreadsheet Errors You Cannot See",
  "description": "A formula overwritten with a typed number still shows a number. A link to a missing file still shows the last value it saw. The dangerous errors are the ones that look perfectly reasonable.",
  "datePublished": "2026-09-08",
  "dateModified": "2026-09-08",
  "author": {
    "@type": "Person",
    "name": "Mihir Hindocha",
    "url": "https://www.lexalytic.com/about",
    "jobTitle": "Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Lexalytic",
      "url": "https://www.lexalytic.com"
    }
  },
  "publisher": {
    "@id": "https://www.lexalytic.com/#organisation"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.lexalytic.com/blog/spreadsheet-errors-you-cannot-see"
  },
  "inLanguage": "en-GB",
  "articleSection": "Data"
}

export default function BlogPost() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(15,15,15,0.08)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/tools" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Free Tools</Link>
            <Link href="/blog" style={{ fontSize: '14px', color: 'var(--ink-3)' }}>Blog</Link>
            <Link href="/#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>Book free call</Link>
          </div>
        </div>
      </nav>
      <section style={{ paddingTop: '120px', paddingBottom: '60px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--amber)', background: 'rgba(193,125,46,0.1)', padding: '4px 12px', borderRadius: '100px' }}>Data</span>
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>September 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>The Spreadsheet Errors You Cannot See</h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <img src="/mihir.jpg" alt="Mihir Hindocha" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <a href="/about" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--ink)', textDecoration: 'none' }}>Mihir Hindocha</a>
              <div style={{ fontSize: '13px', color: 'var(--ink-4)' }}>Digital Studio Founder · Lexalytic</div>
            </div>
          </div>
        </div>
      </section>
      <article style={{ padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The errors people find are the ones Excel shows them. A cell with a hash error gets noticed and fixed. The ones that cost money look completely normal, because they are numbers, and they are in the right place, and they are simply not what anybody thinks they are.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>The one that catches everyone</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>A column of formulas with a typed number partway down. Somebody checked a figure, disagreed with it, and typed what they thought it should be. That row has stopped calculating. Nothing on screen indicates it, the total below still updates, and the cell looks identical to the ones around it. Every review since has looked straight past it, because there is nothing to look at. This is the single commonest way a working spreadsheet starts producing wrong answers, and it survives indefinitely.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The one that only breaks for other people</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A formula reading from another workbook. It works perfectly on the machine of the person who built it, because the file it points at is sitting where it expects. Open the same spreadsheet somewhere else and it does not fail, which would be helpful. It shows the last value it saw, quietly, for as long as anybody keeps using it. A finance report that has silently frozen one input while everything around it moves is worse than one that is obviously broken.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The one that costs money when the rate changes</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A VAT rate, a margin or a discount typed inside a formula rather than held in a cell. On its own that is harmless. Across four hundred formulas it means that when the rate changes, somebody has to find every instance, and the search will not catch the ones written as a different expression. Six months later you have some calculations on the new rate and some on the old, and no way to tell which without opening each one.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The one that makes sorting wrong</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Numbers stored as text. They look like numbers, they line up like numbers, and SUM ignores them completely. Sorting puts 100 before 20, because it is sorting alphabetically. A lookup against them fails against a genuine number even when the two appear identical on screen. This usually arrives from a system export and nobody notices until a total is obviously too low.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The one that is nobody’s fault</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>A cell that one person edited by hand, in a column where every other cell has the same formula. Sometimes that is deliberate and correct, because one row genuinely is different. Usually it is a drag that stopped a row short, or an edit that never got propagated. Either way the next person cannot tell which, and will either break something by standardising it or leave a real error in place by not.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Why none of this shows up in a review</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Because reviewing a spreadsheet means looking at the numbers, and the numbers are fine. Every one of the problems above produces a plausible figure in the right format in the right cell. Finding them means reading the formulas, one at a time, which nobody does on a file with four thousand of them. That is precisely why they persist for years in files that matter.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>And the problem underneath all of them</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Almost every business has a spreadsheet that somebody built, that runs something important, and that nobody else fully understands. Usually that person has moved on. The errors are worth fixing, but the real exposure is that the file is unreadable to anyone but its author, and the author is not available. Knowing which cells everything else depends on, and writing that down, is worth more than fixing any individual formula.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Finding them without opening every cell</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free spreadsheet audit reads the formulas rather than the values and reports all of the above, with the specific cells. It runs in your browser, the file is never uploaded and no macros are executed, which matters because a business spreadsheet usually holds exactly what you would not want to send to a website.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>The spreadsheet works. That is not the same as being right.</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free audit that reads the formulas rather than the values. Nothing uploaded, no macros run.</p>
            <Link href="/tools/spreadsheet-audit" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Check a workbook</Link>
          </div>
        </div>
      </article>
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)', marginTop: '40px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--ink)', letterSpacing: '-0.03em' }}>Lex<span style={{ color: 'var(--amber)' }}>alytic</span></Link>
          <p style={{ fontSize: '13px', color: 'var(--ink-4)', margin: 0 }}>2026 Lexalytic. All rights reserved.</p>
          <Link href="/tools" style={{ fontSize: '13px', color: 'var(--ink-3)' }}>Free tools</Link>
        </div>
      </footer>
    </div>
  )
}
