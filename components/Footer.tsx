'use client'

export default function Footer() {
  const whatsappNumber = '2349016402153'
  const whatsappMessage = 'Hi! I have a question about your gadgets.'

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded border-2 border-white flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">B</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm">BALUSI</span>
                <span className="font-bold text-xs">GADGETS</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for quality gadgets in Nigeria. Brand new and UK used phones, laptops, and accessories at the best prices.
            </p>
          </div>

          {/* Products Section */}
          <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  iPhones
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  Samsung Phones
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  MacBook Laptops
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  HP & Dell Laptops
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  AirPods
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  Smart Watches
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition">
                  Smart Glasses
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="animate-slide-in-right">
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">📞</span>
                </div>
                <a href="tel:+2349016402153" className="text-gray-400 hover:text-white transition text-sm">
                  +234 901 640 2153
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">💬</span>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  WhatsApp Available
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">📍</span>
                </div>
                <span className="text-gray-400 text-sm">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* WhatsApp CTA */}
          <div className="mb-8">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.995 1.514 9.882 9.882 0 003.823 19.019h.005c2.46 0 4.771-.993 6.512-2.62l3.054 3.054c.527.527 1.379.527 1.906 0 .527-.527.527-1.379 0-1.906l-3.054-3.054a9.865 9.865 0 002.62-6.512c0-5.514-4.486-9.99-10.007-9.99" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>© 2026 Balusi Gadgets Ventures. All rights reserved.</p>
            <p className="mt-2">
              <a href="/admin/login" className="text-gray-400 hover:text-white transition text-xs">
                Admin Access
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-accent text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.995 1.514 9.882 9.882 0 003.823 19.019h.005c2.46 0 4.771-.993 6.512-2.62l3.054 3.054c.527.527 1.379.527 1.906 0 .527-.527.527-1.379 0-1.906l-3.054-3.054a9.865 9.865 0 002.62-6.512c0-5.514-4.486-9.99-10.007-9.99" />
        </svg>
      </a>
    </footer>
  )
}
