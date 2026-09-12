import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lexalytic.com'),
  title: 'Lexalytic | Digital Studio - Websites, Software & AI Tools UK',
  description: 'Lexalytic is a UK digital studio. We build websites, custom business software, AI-powered tools, and data systems for UK businesses. Fixed price. Fast delivery. Based in Hertfordshire.',
  keywords: 'UK digital studio, bespoke website development UK, custom software UK small business, AI powered tools UK, website developer Hertfordshire, custom business software UK, bespoke CRM UK, Power BI consultant UK, data automation UK, fixed price web development UK',
  alternates: {
    canonical: 'https://www.lexalytic.com',
  },
  verification: {
    google: 'Vi1ffNWMta4hV-P-fVj5l8-6BrHpNWxEK1kAAAihSi4',
    other: {
      'msvalidate.01': 'EEF7BEAA590764D02138C925D7DC88F8',
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Lexalytic | Digital Studio - Websites, Software & AI Tools UK',
    description: 'Lexalytic is a UK digital studio building websites, custom software, AI-powered tools and data systems. Fixed price. Based in Hertfordshire.',
    url: 'https://www.lexalytic.com',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: 'https://www.lexalytic.com/og-image.jpg', width: 400, height: 120 }],
  },
}

// Publisher entity. Every Article schema on the blog points back to this,
// so it needs to resolve to something real.
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.lexalytic.com/#organisation',
  name: 'Lexalytic',
  url: 'https://www.lexalytic.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.lexalytic.com/og-image.jpg',
  },
  description: 'UK digital studio building websites, custom software, AI tools and data systems for small businesses.',
  email: 'hello@lexalytic.com',
  foundingDate: '2017',
  founder: {
    '@type': 'Person',
    name: 'Mihir Hindocha',
    url: 'https://www.lexalytic.com/about',
    jobTitle: 'Founder',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bushey',
    addressRegion: 'Hertfordshire',
    addressCountry: 'GB',
  },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  knowsAbout: [
    'Custom software development',
    'Website development',
    'Business intelligence',
    'Data automation',
    'AI powered business tools',
  ],
  sameAs: ['https://www.linkedin.com/company/lexalytic'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.lexalytic.com/#website',
  url: 'https://www.lexalytic.com',
  name: 'Lexalytic',
  publisher: { '@id': 'https://www.lexalytic.com/#organisation' },
  inLanguage: 'en-GB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
              <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
// Wed  2 Sep 2026 18:14:29 BST
