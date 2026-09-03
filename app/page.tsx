import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Results from '@/components/Results'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Work from '@/components/Work'
import Objections from '@/components/Objections'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'


export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.lexalytic.com/#business",
        "name": "Lexalytic",
        "description": "Lexalytic is a UK digital studio. We build websites, custom business software, AI-powered tools, and data systems for UK businesses. Fixed price, fast delivery.",
        "url": "https://www.lexalytic.com",
        "email": "hello@lexalytic.com",
        "founder": {
          "@type": "Person",
          "name": "Mihir Hindocha"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bushey",
          "addressRegion": "Hertfordshire",
          "addressCountry": "GB"
        },
        "areaServed": "GB",
        "priceRange": "££",
        "telephone": "+44-hello@lexalytic.com",
        "openingHours": "Mo-Fr 09:00-18:00",
        "hasMap": "https://www.google.com/maps?q=Bushey+Hertfordshire",
        "currenciesAccepted": "GBP",
        "paymentAccepted": "Credit Card, Bank Transfer",
        "serviceType": ["Website Development", "Custom Business Software", "AI-Powered Tools", "Platform Development", "Power BI Dashboards", "Excel Automation", "Data Automation"],
        "sameAs": [
          "https://www.linkedin.com/in/mihirhindocha"
        ]
      },
      {
        "@type": "WebSite",
        "url": "https://www.lexalytic.com",
        "name": "Lexalytic",
        "description": "UK digital studio building websites, software, AI tools and data systems"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <Hero />
        <WhoWeWorkWith />
        <Work />
        <Services />
        <HowItWorks />
        <Results />
        <Testimonials />
        <Objections />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
