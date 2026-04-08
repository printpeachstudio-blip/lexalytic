import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lexalytic | Turn Your Data Into Decisions',
  description: 'Bespoke data automation, Power BI dashboards, and reporting solutions for businesses. Stop wasting time on manual processes. Start making faster, better decisions.',
  keywords: 'data automation, Power BI, Excel automation, VBA, business intelligence, reporting, UK',
  verification: {
    google: 'Vi1ffNWMta4hV-P-fVj5l8-6BrHpNWxEK1kAAAihSi4',
  },
  openGraph: {
    title: 'Lexalytic | Turn Your Data Into Decisions',
    description: 'Bespoke data automation and reporting solutions for businesses. Projects from £495.',
    url: 'https://lexalytic.com',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
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
      <body>{children}</body>
    </html>
  )
}
