'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const [copied, setCopied] = useState(false)

  const handleCopyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleCopyIBAN = () => {
    navigator.clipboard.writeText('ES12 3456 7890 1234 5678 9012')
  }

  if (!orderNumber) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-300 mb-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-2xl font-light text-gray-900 mb-4">
                No se encontró el pedido
              </h1>
              <p className="text-gray-600 mb-8">
                No hemos podido encontrar la información de tu pedido.
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              ¡Pedido confirmado!
            </h1>
            <p className="text-gray-600">
              Gracias por tu compra. Hemos recibido tu pedido correctamente.
            </p>
          </div>

          {/* Order Number */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2 text-center">Número de pedido</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-mono font-medium text-gray-900">
                {orderNumber}
              </p>
              <button
                onClick={handleCopyOrderNumber}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                title="Copiar número de pedido"
              >
                {copied ? (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 mb-2">
                  Instrucciones de pago
                </h3>
                <p className="text-blue-800 text-sm mb-4">
                  Para completar tu pedido, realiza una transferencia bancaria a la siguiente cuenta:
                </p>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-500 mb-1">IBAN</p>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-lg font-medium text-gray-900">
                      ES12 3456 7890 1234 5678 9012
                    </p>
                    <button
                      onClick={handleCopyIBAN}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copiar IBAN"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-blue-800 text-sm mt-4">
                  <strong>Importante:</strong> Incluye tu número de pedido <span className="font-mono font-medium">{orderNumber}</span> como concepto de la transferencia.
                </p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="font-medium text-gray-900 mb-4">¿Qué sucede ahora?</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                <span className="text-gray-600">Realiza la transferencia bancaria con el número de pedido como concepto.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                <span className="text-gray-600">Verificaremos el pago en un plazo de 24-48 horas laborables.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                <span className="text-gray-600">Te enviaremos un email de confirmación cuando el pedido esté en camino.</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tienda"
              className="flex-1 text-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="flex-1 text-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse text-center">
              <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full mb-6"></div>
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </main>
      </>
    }>
      <ConfirmacionContent />
    </Suspense>
  )
}
