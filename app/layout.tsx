import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lexalytic.com'),
  title: 'Lexalytic | Data Automation & Custom Business Tools UK',
  description: 'UK data automation consultancy based in Hertfordshire. Power BI dashboards, Excel automation, custom business tools, CRM development and data cleansing for UK businesses. Fixed price, free scoping call.',
  keywords: 'data automation consultant UK, Power BI consultant UK, Excel automation consultant UK, excel consultant UK, excel spreadsheet consultant, custom business tools UK, bespoke CRM UK, custom software small business UK, VBA developer UK, excel vba consultant, data cleansing UK, Excel consultant Hertfordshire, spreadsheet consultant UK, excel experts UK',
  alternates: {
    canonical: 'https://www.lexalytic.com',
  },
  verification: {
    google: 'Vi1ffNWMta4hV-P-fVj5l8-6BrHpNWxEK1kAAAihSi4',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Lexalytic | Data Automation & Custom Business Tools UK',
    description: 'UK data automation consultancy. Power BI dashboards, Excel automation, custom business tools and data cleansing for UK businesses. Fixed price, free scoping call.',
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
// build Wed  2 Sep 2026 18:14:29 BST
