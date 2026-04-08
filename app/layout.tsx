import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'Lexalytic | Turn Your Data Into Decisions',
  description: 'Bespoke data automation, Power BI dashboards, and reporting solutions for businesses. Stop wasting time on manual processes. Start making faster, better decisions.',
  keywords: 'data automation, Power BI, Excel automation, VBA, business intelligence, reporting, UK',
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
    <html lang="en" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
