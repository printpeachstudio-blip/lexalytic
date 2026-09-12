import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/blog/find-duplicate-records-spreadsheet' },
  title: 'How to Find Duplicate Records When They Are Spelled Differently | Lexalytic',
  description: 'Excel finds exact duplicates. It will not find that Smith and Sons Ltd, Smith & Sons Limited and SMITH AND SONS are one customer on three rows, and that is where the real cost sits.',
  openGraph: {
    title: 'How to Find Duplicate Records When They Are Spelled Differently',
    description: 'Excel finds exact duplicates. It will not find that Smith and Sons Ltd, Smith & Sons Limited and SMITH AND SONS are one customer on three rows, and that is where the real cost sits.',
    url: 'https://www.lexalytic.com/blog/find-duplicate-records-spreadsheet',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'article',
  },
}

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Find Duplicate Records When They Are Spelled Differently",
  "description": "Excel finds exact duplicates. It will not find that Smith and Sons Ltd, Smith & Sons Limited and SMITH AND SONS are one customer on three rows, and that is where the real cost sits.",
  "datePublished": "2026-08-15",
  "dateModified": "2026-08-15",
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
    "@id": "https://www.lexalytic.com/blog/find-duplicate-records-spreadsheet"
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
            <span style={{ fontSize: '12px', color: 'var(--ink-4)' }}>August 2026 · 8 min read</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: '1.15', marginBottom: '24px', letterSpacing: '-0.02em' }}>How to Find Duplicate Records When They Are Spelled Differently</h1>
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
          <p style={{ fontSize: '18px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Remove Duplicates in Excel works on exact matches. It will happily leave you with three rows for the same customer because one has an ampersand, one spells Limited out and one is in capitals. Those are the duplicates that cost you money, because they are the ones that survive every clean up.</p>
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Why exact matching misses most of them</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Duplicates are almost never identical. They arrive from different places: one record typed by someone on the phone, one imported from a supplier list, one filled in by the customer on a web form. Each source has its own conventions for ampersands, legal suffixes, capitalisation and whether the trading name or the registered name goes in the box. Sort the column and they sit nowhere near each other, because S-M-I-T-H space ampersand and S-M-I-T-H space A-N-D are different strings.</p>
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>What the same record actually looks like</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Company names diverge on legal form, so Limited, Ltd, PLC and nothing at all. On ampersands against the word and. On the definite article, since The Smith Group and Smith Group are one company. On trading names against registered names. People diverge on initials, so J Smith and John Smith, on middle names, and on nicknames. Addresses diverge on whether the flat number went in line one or line two. Any of those makes an exact match fail while a human would spot it immediately.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The approach that works, and the one that does not</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>The obvious idea is to measure how many characters differ, which is what edit distance does. It fails badly on names. Smith Ltd and Smith Solutions Ltd share a long run of characters so they score highly, and they are two different businesses. John Smith and Jane Smith share a surname and score highly too. Comparing word against word is the thing that works: match each word in the shorter name to its closest partner in the longer one, and judge the pair by the weakest match rather than the average. Then a typo in one word is forgiven while a genuinely different word is not, because the distinguishing word is precisely the one that matters.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Which fields to trust</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Not all evidence is equal. A matching company number identifies the same business on its own, whatever the names say, and so does a matching email address. A matching postcode proves very little: two businesses at the same address are not one business, and a shared postcode with a similar name is exactly the trap that merges records it should not. Treat identifiers as decisive, names as the test, and everything else as supporting evidence only.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>Deciding which one survives</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Once you have a group, something has to be kept and the rest removed. The default worth using is the most complete record, counting how many fields are populated, then filling any remaining blanks from the others. That way nothing is lost: the record with the phone number contributes the phone number even if it is not the one you keep. What you should not do is keep the oldest or the newest by reflex, because neither correlates with which one is right.</p>
          <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '20px' }}>The error that costs more than the duplicates</h2>
          <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', marginBottom: '48px' }}>Merging two records that are actually different customers. A duplicate left in your list is an annoyance, someone gets two emails and you look careless. A wrongly merged pair is data loss, and you will not notice until somebody asks why their order went to another company. Any process for this should lean toward leaving things alone, flag the marginal cases for a human rather than deciding them, and never merge automatically on a threshold alone.</p>
          <div style={{ borderLeft: '3px solid var(--amber)', paddingLeft: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '16px' }}>Doing it without uploading your customer list</h2>
            <p style={{ fontSize: '17px', color: 'var(--ink-2)', lineHeight: '1.85', margin: 0 }}>Our free data cleansing tool does this in your browser. It compares names word by word, treats company numbers and email addresses as decisive, shows each group with what it matched on, and lets you pick which record survives before anything changes. The file never leaves your machine, which is the point: a customer list is the last thing you want to paste into a website to find out what it would do.</p>
          </div>
          <div style={{ padding: '36px', background: 'var(--ink)', borderRadius: 'var(--radius-lg)', marginTop: '56px' }}>
            <h3 style={{ color: 'var(--white)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '14px' }}>Three rows, one customer</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: '1.75', maxWidth: '520px', marginBottom: '26px' }}>Free tool that finds the near duplicates Excel misses, in your browser, with nothing uploaded.</p>
            <Link href="/tools/data-health-check" className="btn-amber" style={{ fontSize: '15px', padding: '14px 28px' }}>Find the duplicates in your file</Link>
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
