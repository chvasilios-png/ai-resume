'use client'

import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { CTASection } from '@/components/landing/CTASection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}