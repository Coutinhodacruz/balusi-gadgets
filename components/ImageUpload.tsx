'use client'

import { useState, useCallback } from 'react'
import { UploadCloud, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleUpload = async (file: File) => {
    if (!file.type.includes('image/')) {
        toast.error('Please select an image file')
        return
    }
    
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (!res.ok) throw new Error('Failed to upload image')
      
      const data = await res.json()
      onChange(data.url)
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Error uploading image')
    } finally {
      setIsUploading(false)
    }
  }

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }, [])

  return (
    <div className="w-full">
      {value ? (
        <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden border border-gray-200">
          <img src={value} alt="Upload" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
            <button
               type="button"
               onClick={() => onChange('')}
               className="bg-white text-red-500 rounded-full p-2 hover:scale-110 transition shadow-lg"
               title="Remove image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors
            ${isDragging ? 'border-primary bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}`}
        >
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleUpload(e.target.files[0])
              }
            }}
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="animate-spin text-primary mb-2" size={32} />
              <p className="text-sm font-medium text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <UploadCloud className="text-gray-400 mb-2" size={32} />
              <p className="text-sm font-medium text-foreground">Click or drag image to upload</p>
              <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
