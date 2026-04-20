'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import BrowseByCategory from '@/components/BrowseByCategory'
import StatsSection from '@/components/StatsSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <BrowseByCategory />
      <StatsSection />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}
