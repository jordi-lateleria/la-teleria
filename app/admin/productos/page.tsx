'use client';

import Link from 'next/link';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';

export default function ProductosPage() {
  return (
    <AdminLayoutWrapper>
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-light text-gray-900">Productos</h1>
        <p className="text-gray-500 mt-1">Gestiona el catalogo de productos de la tienda</p>
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Gestion de Productos</h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Esta seccion te permitira crear, editar y eliminar productos de tu catalogo. Proximamente disponible.
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
