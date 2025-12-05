'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import { DbProduct } from '@/types/database'
import { useCart } from '@/context/CartContext'

interface ProductDetailViewProps {
  product: DbProduct
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Tienda', href: '/tienda' },
    ...(product.category ? [{ label: product.category.name, href: `/tienda?category=${product.category.slug}` }] : []),
    { label: product.name }
  ]

  // Group variants by name
  const variantGroups = product.variants?.reduce((acc, variant) => {
    if (!acc[variant.name]) {
      acc[variant.name] = []
    }
    acc[variant.name].push(variant.value)
    return acc
  }, {} as Record<string, string[]>) || {}

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option
    }))
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImageIndex].url}
                  alt={product.images[selectedImageIndex].alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Imagen del producto</span>
                </div>
              )}
            </div>
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-gray-200 rounded-lg overflow-hidden relative cursor-pointer transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-gray-900'
                        : 'hover:ring-2 hover:ring-gray-400'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} - imagen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
            {(!product.images || product.images.length <= 1) && (
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      {i}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {product.category && (
              <Link
                href={`/tienda?category=${product.category.slug}`}
                className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              {product.salePrice ? (
                <>
                  <p className="text-2xl text-red-600">
                    {product.salePrice.toFixed(2).replace('.', ',')} €
                  </p>
                  <p className="text-lg text-gray-400 line-through">
                    {product.price.toFixed(2).replace('.', ',')} €
                  </p>
                </>
              ) : (
                <p className="text-2xl text-gray-900">
                  {product.price.toFixed(2).replace('.', ',')} €
                </p>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {Object.keys(variantGroups).length > 0 && (
              <div className="space-y-6 mb-8">
                {Object.entries(variantGroups).map(([name, options]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      {name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleVariantChange(name, option)}
                          className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                            selectedVariants[name] === option
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

            {/* Stock indicator */}
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 mb-6">
                En stock ({product.stock} disponibles)
              </p>
            ) : (
              <p className="text-sm text-red-600 mb-6">
                Agotado
              </p>
            )}

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Cantidad
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Disminuir cantidad"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Aumentar cantidad"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full py-4 text-sm tracking-wide rounded-lg transition-all ${
                product.stock > 0
                  ? addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.stock > 0
                ? addedToCart
                  ? 'Añadido al carrito'
                  : 'Añadir al carrito'
                : 'Producto agotado'}
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
  )
}
