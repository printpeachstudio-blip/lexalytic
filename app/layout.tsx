import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lexalytic.com'),
  title: 'Lexalytic | Digital Studio — Websites, Software & AI Tools UK',
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
    title: 'Lexalytic | Digital Studio — Websites, Software & AI Tools UK',
    description: 'Lexalytic is a UK digital studio building websites, custom software, AI-powered tools and data systems. Fixed price. Based in Hertfordshire.',
    url: 'https://www.lexalytic.com',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: 'https://www.lexalytic.com/logo.svg', width: 400, height: 120 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
// Wed  2 Sep 2026 18:14:29 BST
