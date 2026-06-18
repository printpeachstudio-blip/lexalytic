import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lexalytic.com'),
  title: 'Lexalytic | Turn Your Data Into Decisions',
  description: 'UK data automation consultancy based in Hertfordshire. Power BI dashboards, Excel automation, VBA development and data cleansing for UK businesses. Fixed price, free scoping call.',
  keywords: 'data automation consultant UK, Power BI consultant UK, Excel automation consultant UK, VBA developer UK, data cleansing UK, reduce manual data entry UK, Excel consultant Hertfordshire, automated reporting UK',
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
    title: 'Lexalytic | Turn Your Data Into Decisions',
    description: 'UK data automation consultancy. Power BI dashboards, Excel automation and data cleansing for UK businesses. Fixed price, free scoping call.',
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FWP3KBJ211" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FWP3KBJ211');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
