'use client'

import Image from 'next/image'
import { useCategories } from '@/hooks/useCategories'

export default function BrowseByCategory() {
  const { categories, isLoaded } = useCategories()

  if (!isLoaded) {
    return (
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="categories" className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in-down">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From flagship phones to premium laptops and accessories — we&apos;ve got every gadget you need
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group cursor-pointer animate-scale-in hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-56 sm:h-64">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Category Info */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
