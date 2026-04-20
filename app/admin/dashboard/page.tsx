'use client'

import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import Link from 'next/link'

export default function DashboardPage() {
  const { products, isLoaded: productsLoaded } = useProducts()
  const { categories, isLoaded: categoriesLoaded } = useCategories()

  if (!productsLoaded || !categoriesLoaded) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      color: 'bg-blue-50 text-primary',
      icon: '📱',
    },
    {
      label: 'Categories',
      value: categories.length,
      color: 'bg-green-50 text-green-600',
      icon: '🏷️',
    },
    {
      label: 'Phones',
      value: products.filter(p => p.category === 'phones').length,
      color: 'bg-purple-50 text-purple-600',
      icon: '☎️',
    },
    {
      label: 'Laptops',
      value: products.filter(p => p.category === 'laptops').length,
      color: 'bg-orange-50 text-orange-600',
      icon: '💻',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard. Manage products and categories.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-16 h-16 rounded-lg flex items-center justify-center text-3xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-foreground">Recent Products</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-4">
              You have {products.length} products in your catalog.
            </p>
            <Link
              href="/admin/products"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Manage Products
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-foreground">Categories</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-600 text-sm mb-4">
              You have {categories.length} categories available.
            </p>
            <Link
              href="/admin/categories"
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Manage Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Recently Added */}
      {products.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-foreground">Latest Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Condition</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(-5).reverse().map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">₦{product.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        product.condition === 'new' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {product.condition === 'new' ? 'Brand New' : 'UK Used'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
