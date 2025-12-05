'use client';

import Link from 'next/link';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';

export default function PedidosPage() {
  return (
    <AdminLayoutWrapper>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-light text-gray-900">Pedidos</h1>
        <p className="text-gray-500 mt-1">Revisa y gestiona los pedidos de los clientes</p>
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Gestion de Pedidos</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Esta seccion te permitira ver y gestionar los pedidos realizados por tus clientes. Proximamente disponible.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Dashboard
        </Link>
      </div>
    </AdminLayoutWrapper>
  );
}
