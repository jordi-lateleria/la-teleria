'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { totalItems } = useCart()
  const [locale, setLocale] = useState('es')

  return (
    <header className="bg-white">
      {/* Top bar with language and cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-12 space-x-6">
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
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Logo - Centered */}
      <div className="flex justify-center py-6">
        <Link href="/">
          <Image 
            src="/images/logo.png"
            alt="La Teleria"
            width={250}
            height={60}
            priority
            className="h-auto"
          />
        </Link>
      </div>

      {/* Navigation - Centered below logo */}
      <nav className="flex justify-center space-x-8 pb-4 border-b border-gray-100">
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
    </header>
  )
}