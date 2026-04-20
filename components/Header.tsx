'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const whatsappNumber = '2349016402153'
  const whatsappMessage = 'Hi Balusi! I am interested in your gadgets.'

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="https://media.base44.com/images/public/69df7edb2972e4b26695c21b/2daaef9f5_WhatsApp_Image_2026-04-15_at_10022_PM-removebg-preview.png" alt="" 
            className='h-18 w-26'
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-primary font-medium transition">
              Home
            </a>
            <a href="#products" className="text-gray-700 hover:text-primary font-medium transition">
              Products
            </a>
            <a href="#categories" className="text-gray-700 hover:text-primary font-medium transition">
              Categories
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition">
              Contact
            </a>
          </nav>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-white bg-green-500 px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.995 1.514 9.882 9.882 0 003.823 19.019h.005c2.46 0 4.771-.993 6.512-2.62l3.054 3.054c.527.527 1.379.527 1.906 0 .527-.527.527-1.379 0-1.906l-3.054-3.054a9.865 9.865 0 002.62-6.512c0-5.514-4.486-9.99-10.007-9.99" />
            </svg>
            WhatsApp Us
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-4 px-4 bg-white">
            <a onClick={() => setMobileMenuOpen(false)} href="#home" className="block text-gray-700 hover:text-primary font-medium">
              Home
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#products" className="block text-gray-700 hover:text-primary font-medium">
              Products
            </a>
            <a onClick={() => setMobileMenuOpen(false)} href="#categories" className="block text-gray-700 hover:text-primary font-medium">
              Categories
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-2 rounded-full font-semibold w-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.995 1.514 9.882 9.882 0 003.823 19.019h.005c2.46 0 4.771-.993 6.512-2.62l3.054 3.054c.527.527 1.379.527 1.906 0 .527-.527.527-1.379 0-1.906l-3.054-3.054a9.865 9.865 0 002.62-6.512c0-5.514-4.486-9.99-10.007-9.99" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
