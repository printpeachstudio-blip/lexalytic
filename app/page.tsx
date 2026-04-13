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

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
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
