import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TeaGrain from '@/components/TeaGrain'
import Hero from '@/components/sections/Hero'
import ProtectionOverview from '@/components/sections/ProtectionOverview'
import DevelopmentTimeline from '@/components/sections/DevelopmentTimeline'
import MediaCoverage from '@/components/sections/MediaCoverage'
import ClaimTriggers from '@/components/sections/ClaimTriggers'
import LiabilitySection from '@/components/sections/LiabilitySection'
import PayoutCalculator from '@/components/sections/PayoutCalculator'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import Eligibility from '@/components/sections/Eligibility'
import ContactForm from '@/components/sections/ContactForm'
import TeaGallery from '@/components/sections/TeaGallery'

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#1A120B]">
      <TeaGrain />
      <Navbar />
      <main>
        <Hero />
        <ProtectionOverview />
        <DevelopmentTimeline />
        <MediaCoverage />
        <ClaimTriggers />
        <LiabilitySection />
        <PayoutCalculator />
        <ProcessTimeline />
        <Eligibility />
        <TeaGallery />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
