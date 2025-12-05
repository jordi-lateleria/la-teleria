'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check authentication
    const session = localStorage.getItem('adminSession');
    if (!session) {
      router.push('/admin/login');
      return;
    }

    try {
      const parsed = JSON.parse(session);
      if (!parsed.isAuthenticated) {
        router.push('/admin/login');
        return;
      }
      setUserEmail(parsed.email || '');
      setIsLoading(false);
    } catch {
      localStorage.removeItem('adminSession');
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    // Clear the cookie
    document.cookie = 'adminSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/logo.png"
                alt="La Teleria"
                width={120}
                height={36}
                className="h-8 w-auto"
              />
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium">Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light text-gray-900 mb-8">
          Panel de Administración
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Productos</h2>
            <p className="text-gray-500 text-sm mb-4">Gestiona los productos de la tienda</p>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Ver productos →
            </button>
          </div>

          {/* Categories Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Categorías</h2>
            <p className="text-gray-500 text-sm mb-4">Administra las categorías de productos</p>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Ver categorías →
            </button>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Pedidos</h2>
            <p className="text-gray-500 text-sm mb-4">Revisa y gestiona los pedidos</p>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Ver pedidos →
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Bienvenido al Panel de Administración</h2>
          <p className="text-gray-500">
            Desde aquí podrás gestionar todos los aspectos de tu tienda La Teleria.
            Utiliza el menú superior para navegar entre las diferentes secciones.
          </p>
        </div>
      </main>
    </div>
  );
}
