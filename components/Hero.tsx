'use client'

import Image from 'next/image'

export default function Hero() {
  const whatsappNumber = '2349016402153'
  const whatsappMessage = 'Hi! I am interested in your gadgets.'

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-b from-white via-white to-blue-50 overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Nigeria&apos;s Trusted Gadget Plug
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Your One-Stop
              <br />
              <span className="text-primary">Gadget</span>
              <br />
              Destination
            </h1>
            
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Phones, Laptops, AirPods, Smart Watches & more — Brand New & UK Used at unbeatable prices. Quality guaranteed, delivery nationwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#products"
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition text-center flex items-center justify-center gap-2"
              >
                Browse Products
                <span>↓</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-gray-300  px-8 py-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-600 transition text-center"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Mini Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">✓</span>
                </div>
                <span className="text-gray-700">100% Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">✓</span>
                </div>
                <span className="text-gray-700">Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary">✓</span>
                </div>
                <span className="text-gray-700">Best Prices</span>
              </div>
            </div>
          </div>

          {/* Right Side - Product Showcase */}
          <div className="relative h-auto pt-10 pb-20 md:py-0 md:h-screen flex items-center justify-center animate-slide-in-right">
            <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full max-w-xl px-4 sm:px-0">
              {/* iPhone - Top Right */}
              <div className="col-span-1 row-span-2 flex justify-end animate-float">
                <div className="p-2 sm:p-4 flex flex-col items-center justify-center transition overflow-hidden">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52 mb-2">
                    <Image
                      src="https://media.base44.com/images/public/69df7edb2972e4b26695c21b/390fdd94b_generated_a28144c0.png"
                      alt="iPhone 16"
                      fill
                      className="object-contain rounded-2xl"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-center text-foreground">iPhone 16</h3>
                </div>
              </div>

              {/* Laptop - Middle Left */}
              <div className="col-span-1 animate-float" style={{ animationDelay: '0.3s' }}>
                <div className="p-2 sm:p-4 flex flex-col items-center justify-center transition overflow-hidden">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52 mb-2">
                    <Image
                      src="https://media.base44.com/images/public/69df7edb2972e4b26695c21b/29c3d3621_generated_10ad4c4c.png"
                      alt="MacBook Pro"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">MacBook</h3>
                </div>
              </div>

              {/* AirPods - Bottom Left */}
              <div className="col-span-1 animate-float" style={{ animationDelay: '0.6s' }}>
                <div className="p-2 sm:p-4 flex flex-col items-center justify-center transition overflow-hidden">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52 mb-2">
                    <Image
                      src="https://media.base44.com/images/public/69df7edb2972e4b26695c21b/5212cd0ee_generated_45d2c355.png"
                      alt="AirPods Pro"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">AirPods Pro</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
