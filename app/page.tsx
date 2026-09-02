import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Results from '@/components/Results'
import MTD from '@/components/MTD'
import Testimonials from '@/components/Testimonials'
import Tool from '@/components/Tool'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Work from '@/components/Work'


export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.lexalytic.com/#business",
        "name": "Lexalytic",
        "description": "UK data automation consultancy specialising in Power BI dashboards, Excel automation, Python and Power Automate for UK businesses.",
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
        "serviceType": ["Power BI Consulting", "Excel Automation", "VBA Development", "Python Automation", "Power Automate", "Data Automation"],
        "sameAs": [
          "https://www.linkedin.com/in/mihirhindocha"
        ]
      },
      {
        "@type": "WebSite",
        "url": "https://www.lexalytic.com",
        "name": "Lexalytic",
        "description": "UK data automation consultancy"
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
        <Services />
        <Work />
        <HowItWorks />
        <Pricing />
        <Results />
        <MTD />
        <Testimonials />
        <Tool />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
