import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

export interface Category {
  _id?: string
  id: number
  name: string
  subtitle: string
  image: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoaded(false)
      setError(null)
      const res = await fetch('/api/categories')
      if (!res.ok) throw new Error('Failed to fetch categories')
      
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (err: any) {
      console.error('[useCategories] fetch error:', err)
      setError(err.message)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const updateCategory = async (id: number, updates: Partial<Category>) => {
    // Optimistic update
    setCategories(categories.map(c => (c.id === id ? { ...c, ...updates } : c)))
    
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Failed to update category')
      toast.success('Category updated successfully')
    } catch (err) {
      console.error('Error updating category:', err)
      toast.error('Failed to update category')
      fetchCategories() // Revert state on error
    }
  }

  const deleteCategory = async (id: number) => {
    // Optimistic delete
    setCategories(categories.filter(c => c.id !== id))
    
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete category')
      toast.success('Category deleted successfully')
    } catch (err) {
      console.error('Error deleting category:', err)
      toast.error('Failed to delete category')
      fetchCategories() // Revert state on error
    }
  }

  const addCategory = async (category: Omit<Category, 'id'>) => {
    try {
      const id = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1
      const newCategoryPayload = { ...category, id }
      
      // Optimistic update
      const tempCategory = newCategoryPayload as Category
      setCategories([...categories, tempCategory])
      
      const res = await fetch('/api/categories', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategoryPayload) 
      })
      
      if (!res.ok) throw new Error('Failed to create category')
      
      const data = await res.json()
      // Optional: Update state with actual DB record containing _id
      setCategories(prev => prev.map(c => c.id === id ? data.category : c))
      toast.success('Category added successfully')
      return data.category
    } catch (err) {
      console.error('Error creating category:', err)
      toast.error('Failed to create category')
      fetchCategories() // Revert state
      throw err
    }
  }

  return {
    categories,
    isLoaded,
    error,
    updateCategory,
    deleteCategory,
    addCategory,
    refreshCategories: fetchCategories
  }
}
