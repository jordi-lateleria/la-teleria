'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayoutWrapper from './components/AdminLayoutWrapper';

interface CategoryStats {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  categories: CategoryStats[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Error al cargar estadisticas');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayoutWrapper>
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-light text-gray-900">Hola, Admin</h1>
        <p className="text-gray-500 mt-1">Bienvenido al panel de administracion de La Teleria</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Resumen</h2>

        {isLoadingStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Total Products Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total de productos</p>
                  <p className="text-3xl font-semibold text-gray-900 mt-1">{stats?.totalProducts || 0}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Products Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Productos activos</p>
                  <p className="text-3xl font-semibold text-green-600 mt-1">{stats?.activeProducts || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Inactive Products Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Productos inactivos</p>
                  <p className="text-3xl font-semibold text-gray-400 mt-1">{stats?.inactiveProducts || 0}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products by Category */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Productos por categoria</h2>

        {isLoadingStats ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-8"></div>
              </div>
            ))}
          </div>
        ) : error ? null : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats?.categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-gray-300 transition-colors">
                <p className="text-sm text-gray-500 truncate">{category.name}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{category.productCount}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Accesos rapidos</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Manage Products */}
          <Link
            href="/admin/productos"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Gestionar Productos</p>
                <p className="text-xs text-gray-500">Crear, editar y eliminar productos</p>
              </div>
            </div>
          </Link>

          {/* View Orders */}
          <Link
            href="/admin/pedidos"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Ver Pedidos</p>
                <p className="text-xs text-gray-500">Revisar y gestionar pedidos</p>
              </div>
            </div>
          </Link>

          {/* Configuration */}
          <Link
            href="/admin/configuracion"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Configuracion</p>
                <p className="text-xs text-gray-500">Ajustes de la tienda</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
