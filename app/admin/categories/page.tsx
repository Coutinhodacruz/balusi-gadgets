'use client'

import { useState } from 'react'
import { useCategories, Category } from '@/hooks/useCategories'
import { X, Edit2, Trash2, Plus } from 'lucide-react'
import ImageUpload from '@/components/ImageUpload'

export default function CategoriesPage() {
  const { categories, isLoaded, addCategory, updateCategory, deleteCategory } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Omit<Category, 'id'>>({
    name: '',
    subtitle: '',
    image: '/categories/iphones.jpg',
  })

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingId(category.id)
      setFormData({
        name: category.name,
        subtitle: category.subtitle,
        image: category.image,
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        subtitle: '',
        image: '/categories/iphones.jpg',
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.subtitle) {
      alert('Please fill in all required fields')
      return
    }

    if (editingId) {
      updateCategory(editingId, formData)
    } else {
      addCategory(formData)
    }

    handleCloseModal()
  }

  if (!isLoaded) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Categories</h1>
          <p className="text-gray-600 text-sm md:text-base">Manage product categories</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition w-full sm:w-auto"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 mb-4">No categories found</p>
            <button
              onClick={() => handleOpenModal()}
              className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Add your first category
            </button>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Category Image */}
              <div className="relative h-40 bg-gray-200 overflow-hidden">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.subtitle}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="flex items-center gap-1 flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition text-sm"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure?')) {
                        deleteCategory(category.id)
                      }
                    }}
                    className="flex items-center gap-1 flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-foreground">
                {editingId ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-foreground transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="iPhones"
                  required
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Latest & UK Used"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Category Image *
                </label>
                <ImageUpload 
                  value={formData.image} 
                  onChange={(url) => setFormData({ ...formData, image: url })} 
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {editingId ? 'Update Category' : 'Add Category'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
