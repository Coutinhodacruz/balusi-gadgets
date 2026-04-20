import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

export interface Product {
  _id?: string
  id: string
  name: string
  category: 'phones' | 'laptops' | 'accessories'
  brand: string
  condition: 'new' | 'used'
  price: number
  specs: string
  image: string
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoaded(false)
      setError(null)
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Failed to fetch products')
      
      const data = await res.json()
      setProducts(data.products || [])
    } catch (err: any) {
      console.error('[useProducts] fetch error:', err)
      setError(err.message)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const id = Date.now().toString()
      const newProductPayload = { ...product, id }
      
      // Optimistic upate
      const tempProduct = newProductPayload as Product
      setProducts([...products, tempProduct])
      
      const res = await fetch('/api/products', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProductPayload) 
      })
      
      if (!res.ok) throw new Error('Failed to create product')
      
      const data = await res.json()
      setProducts(prev => prev.map(p => p.id === id ? data.product : p))
      toast.success('Product added successfully')
      return data.product
    } catch (err) {
      console.error('Error creating product:', err)
      toast.error('Failed to create product')
      fetchProducts()
      throw err
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    // Optimistic update
    setProducts(products.map(p => (p.id === id ? { ...p, ...updates } : p)))
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Failed to update product')
      toast.success('Product updated successfully')
    } catch (err) {
      console.error('Error updating product:', err)
      toast.error('Failed to update product')
      fetchProducts()
    }
  }

  const deleteProduct = async (id: string) => {
    // Optimistic delete
    setProducts(products.filter(p => p.id !== id))
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete product')
      toast.success('Product deleted successfully')
    } catch (err) {
      console.error('Error deleting product:', err)
      toast.error('Failed to delete product')
      fetchProducts()
    }
  }

  return {
    products,
    isLoaded,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  }
}
