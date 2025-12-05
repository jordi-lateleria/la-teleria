'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
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

  if (!isHydrated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                Añade productos a tu carrito antes de proceder al pago.
              </p>
              <Link
                href="/tienda"
                className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Ir a la tienda
              </Link>
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-light text-gray-900">Checkout</h1>
            <Link
              href="/carrito"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              Volver al carrito
            </Link>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen del pedido</h2>

            <div className="space-y-3 mb-6">
              {items.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-600">
                    {item.productName} x {item.quantity}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>IVA (21%)</span>
                <span>{formatPrice(iva)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-900 pt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <svg
              className="w-12 h-12 mx-auto text-yellow-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Proceso de pago en desarrollo
            </h3>
            <p className="text-gray-600 mb-4">
              El sistema de pago está actualmente en desarrollo.
              Por favor, vuelve pronto para completar tu compra.
            </p>
            <Link
              href="/contacto"
              className="inline-block text-gray-900 underline hover:no-underline"
            >
              Contactar para más información
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
