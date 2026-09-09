import type { Metadata } from 'next'
import DataHealthChecker from './DataHealthChecker'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/data-health-check' },
  title: 'Free UK Data Health Check - Scan a Spreadsheet for Errors | Lexalytic',
  description: 'Free browser based tool that checks a customer or supplier spreadsheet for UK specific data problems: invalid postcodes, VAT numbers that fail the HMRC checksum, company numbers missing their leading zero, mixed date formats and duplicates. Nothing is uploaded.',
  keywords: 'data quality checker UK, CSV data checker, spreadsheet error checker UK, data cleansing tool UK, VAT number checker, company number validator, UK postcode validator, free data quality tool',
  openGraph: {
    title: 'Free UK Data Health Check | Lexalytic',
    description: 'Check a spreadsheet for the errors that break UK business systems. Free, runs in your browser, nothing uploaded.',
    url: 'https://www.lexalytic.com/tools/data-health-check',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'UK Data Health Check',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool that checks a CSV of customer or supplier records for UK specific data quality problems including invalid postcodes, VAT numbers failing the HMRC mod-97 checksum, company numbers with stripped leading zeros, mixed date formats and duplicate records.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: {
    '@type': 'Organization',
    name: 'Lexalytic',
    url: 'https://www.lexalytic.com',
  },
  featureList: [
    'UK postcode format validation',
    'VAT number mod-97 checksum verification',
    'Company number leading zero detection',
    'Mixed date format detection',
    'Duplicate record and repeated email detection',
    'Runs entirely in the browser with no file upload',
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DataHealthChecker />
    </>
  )
}
