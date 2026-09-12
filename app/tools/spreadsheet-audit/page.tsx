import type { Metadata } from 'next'
import SpreadsheetAudit from './SpreadsheetAudit'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.lexalytic.com/tools/spreadsheet-audit' },
  title: 'Free Spreadsheet Audit Tool | Find Excel Formula Errors | Lexalytic',
  description: 'Upload an Excel workbook and find the formulas that were overwritten with typed values, links to files that no longer exist, numbers hardcoded into calculations, and circular references. Reads formulas, not values. Nothing uploaded.',
  keywords: 'excel formula errors, spreadsheet audit tool, check excel for errors, find broken formulas excel, spreadsheet error checker UK, excel audit free',
  openGraph: {
    title: 'The spreadsheet works. That is not the same as being right.',
    description: 'Finds overwritten formulas, external links and hardcoded numbers by reading the formulas rather than the values.',
    url: 'https://www.lexalytic.com/tools/spreadsheet-audit',
    siteName: 'Lexalytic',
    locale: 'en_GB',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Spreadsheet Audit',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web browser',
  description: 'Free tool that reads the formulas in an Excel workbook and reports overwritten formulas, inconsistent columns, external workbook links, hardcoded numbers, circular references and numbers stored as text.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@id': 'https://www.lexalytic.com/#organisation' },
}

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I find errors in an Excel spreadsheet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The visible errors are easy: anything showing a hash error can be found with Go To Special. The dangerous ones are invisible, because they show a perfectly reasonable number. A formula overwritten with a typed value, a column where one cell was edited by hand, a link to a workbook that no longer exists still displaying the last value it saw. Finding those means reading the formulas rather than the values, which is what this tool does.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most common spreadsheet error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A formula pasted over with a typed number. Somebody checks a figure, types what they think it should be, and that row stops calculating. Nothing on screen indicates it, the total still updates, and the error survives every review because the cell looks identical to the ones around it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my spreadsheet uploaded anywhere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The file is opened and read in your browser and never sent to a server. Macros are not executed. This matters because a business spreadsheet usually contains exactly the information you would not want to email to a website.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why are hardcoded numbers in formulas a problem?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A rate written inside a formula is invisible and unmaintainable. When VAT changes or a margin is revised, somebody has to find every formula containing the old figure, and they will miss some. Moving the number to a labelled cell makes it one edit rather than a search, and makes the assumption visible to anyone reading the file.',
      },
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <SpreadsheetAudit />
    </>
  )
}
