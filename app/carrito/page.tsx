'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'

export default function CarritoPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Calculate IVA and totals
  const IVA_RATE = 0.21
  const subtotal = totalPrice
  const iva = subtotal * IVA_RATE
  const total = subtotal + iva

  // Format price for display
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',') + ' €'
  }

  // Get variant display string
  const getVariantDisplay = (variants: Record<string, string>) => {
    const entries = Object.entries(variants)
    if (entries.length === 0) return null
    return entries.map(([key, value]) => `${key}: ${value}`).join(', ')
  }

  if (!isHydrated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Tu carrito</h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg
                className="w-24 h-24 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-xl text-gray-600 mb-4">Tu carrito está vacío</h2>
              <p className="text-gray-500 mb-8">
                Parece que aún no has añadido ningún producto a tu carrito.
              </p>
              <Link
                href="/tienda"
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Ir a la tienda
              </Link>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-8">
                <div className="border-b border-gray-200 pb-4 mb-4 hidden md:grid md:grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Producto</div>
                  <div className="col-span-2 text-center">Precio</div>
                  <div className="col-span-2 text-center">Cantidad</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div
                      key={`${item.productId}-${Object.entries(item.selectedVariants).sort().map(([k, v]) => `${k}:${v}`).join('|')}-${index}`}
                      className="border-b border-gray-100 pb-6"
                    >
                      <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                        {/* Product Info */}
                        <div className="flex items-center gap-4 col-span-6 mb-4 md:mb-0">
                          <Link
                            href={`/tienda/${item.productSlug}`}
                            className="shrink-0"
                          >
                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                              {item.productImage ? (
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                  sizes="80px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1}
                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </Link>
                          <div>
                            <Link
                              href={`/tienda/${item.productSlug}`}
                              className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
                            >
                              {item.productName}
                            </Link>
                            {getVariantDisplay(item.selectedVariants) && (
                              <p className="text-sm text-gray-500 mt-1">
                                {getVariantDisplay(item.selectedVariants)}
                              </p>
                            )}
                            <button
                              onClick={() => removeFromCart(item.productId, item.selectedVariants)}
                              className="text-sm text-red-600 hover:text-red-800 mt-2 md:hidden"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden md:flex col-span-2 justify-center text-gray-600">
                          {formatPrice(item.price)}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between md:justify-center col-span-2 mb-4 md:mb-0">
                          <span className="text-sm text-gray-500 md:hidden">Cantidad:</span>
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariants)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-l-lg"
                              aria-label="Disminuir cantidad"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="w-10 text-center text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariants)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors rounded-r-lg"
                              aria-label="Aumentar cantidad"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="flex items-center justify-between md:justify-end col-span-2">
                          <span className="text-sm text-gray-500 md:hidden">Total:</span>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.productId, item.selectedVariants)}
                              className="hidden md:block text-gray-400 hover:text-red-600 transition-colors"
                              aria-label="Eliminar producto"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-8">
                  <Link
                    href="/tienda"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Continuar comprando
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>IVA (21%)</span>
                      <span>{formatPrice(iva)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-medium text-gray-900">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="block w-full bg-gray-900 text-white text-center py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                  >
                    Finalizar compra
                  </Link>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Envío gratuito en pedidos +100€</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Pago 100% seguro</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Devoluciones en 30 días</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
