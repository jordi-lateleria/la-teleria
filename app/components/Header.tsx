'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [cartCount] = useState(0)
  const [locale, setLocale] = useState('es')

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl tracking-[0.3em] font-light text-gray-900">
                LA <span className="font-normal">TELERIA</span>
              </span>
            </Link>
          </div>

          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/tienda" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tienda
            </Link>
            <Link 
              href="/contacto" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contacto
            </Link>
            <Link 
              href="/b2b" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              B2B
            </Link>
          </nav>

          {/* Right side - Language & Cart */}
          <div className="flex items-center space-x-6">
            
            {/* Language Selector */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <select 
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="text-sm text-gray-600 bg-transparent border-none cursor-pointer focus:outline-none"
              >
                <option value="es">ES</option>
                <option value="en">EN</option>
              </select>
            </div>

            {/* Cart */}
            <Link href="/carrito" className="relative">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}