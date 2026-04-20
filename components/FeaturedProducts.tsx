'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useProducts } from '@/hooks/useProducts'

export default function FeaturedProducts() {
  const { products, isLoaded } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [selectedCondition, setSelectedCondition] = useState('all')

  const whatsappNumber = '2349016402153'

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category))
    return ['all', ...Array.from(cats).sort()]
  }, [products])

  const brands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand))
    return ['all', ...Array.from(brandsSet).sort()]
  }, [products])

  const conditions = useMemo(() => {
    const condSet = new Set(products.map(p => p.condition))
    return ['all', ...Array.from(condSet).sort()]
  }, [products])

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand
      const matchesCondition = selectedCondition === 'all' || product.condition === selectedCondition

      return matchesSearch && matchesCategory && matchesBrand && matchesCondition
    })
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedCondition])

  const handleWhatsApp = (product: any) => {
    const message = `Hi! I'm interested in the ${product.name} (${product.condition}). What's the current price and availability?`
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (!isLoaded) {
    return (
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="products" className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-down">
          <span className="inline-block bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Collection
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Quality gadgets at prices that make sense — every device tested and verified
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for a gadget..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 animate-fade-in space-y-4">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap justify-center items-center">
            <span className="text-sm font-medium text-gray-700">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Brand Filter */}
          <div className="flex gap-2 flex-wrap justify-center items-center">
            <span className="text-sm font-medium text-gray-700">Brand:</span>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  selectedBrand === brand
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {brand === 'all' ? 'All' : brand}
              </button>
            ))}
          </div>

          {/* Condition Filter */}
          <div className="flex gap-2 flex-wrap justify-center items-center">
            <span className="text-sm font-medium text-gray-700">Condition:</span>
            {conditions.map((cond) => (
              <button
                key={cond}
                onClick={() => setSelectedCondition(cond)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                  selectedCondition === cond
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cond === 'all' ? 'All' : cond === 'new' ? 'Brand New' : 'UK Used'}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                    {product.condition === 'new' ? 'Brand New' : 'UK Used'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase">{product.brand}</p>
                      <h3 className="font-bold text-foreground text-sm">{product.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3">{product.specs}</p>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-primary">₦{product.price.toLocaleString()}</span>
                  </div>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsApp(product)}
                    className="w-full bg-accent text-white py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.995 1.514 9.882 9.882 0 003.823 19.019h.005c2.46 0 4.771-.993 6.512-2.62l3.054 3.054c.527.527 1.379.527 1.906 0 .527-.527.527-1.379 0-1.906l-3.054-3.054a9.865 9.865 0 002.62-6.512c0-5.514-4.486-9.99-10.007-9.99" />
                    </svg>
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
