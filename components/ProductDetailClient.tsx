'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Breadcrumb from '@/components/Breadcrumb'
import { Product, Category } from '@/data/products'

interface ProductDetailClientProps {
  product: Product
  category: Category
}

export default function ProductDetailClient({ product, category }: ProductDetailClientProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Tienda', href: '/tienda' },
    { label: category.name, href: `/tienda/${category.slug}` },
    { label: product.name },
  ]

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Imagen del producto</span>
                </div>
              </div>
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all"
                  >
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      {i}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-2xl text-gray-900 mb-6">
                {product.price.toFixed(2).replace('.', ',')} €
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-6 mb-8">
                  {product.variants.map((variant) => (
                    <div key={variant.name}>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        {variant.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleVariantChange(variant.name, option)}
                            className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                              selectedVariants[variant.name] === option
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add to Cart Button */}
              <button className="w-full bg-gray-900 text-white py-4 text-sm tracking-wide hover:bg-gray-800 transition-colors rounded-lg">
                Añadir al carrito
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Envío gratuito en pedidos superiores a 100€</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Devoluciones gratuitas en 30 días</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Pago seguro con tarjeta o PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 La Teleria. Textiles premium desde Girona, Catalunya.
          </p>
        </div>
      </footer>
    </div>
  )
}
