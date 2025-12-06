'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  selectedVariants: string | null;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  subtotal: number;
  iva: number;
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingProvince: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  pagado: 'Pagado',
  enviado: 'Enviado'
};

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  pagado: 'bg-green-50 text-green-700',
  enviado: 'bg-blue-50 text-blue-700'
};

export default function PedidosPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, searchTerm]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus) params.append('status', selectedStatus);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/admin/pedidos?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Error al cargar pedidos');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <AdminLayoutWrapper>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-light text-gray-900">Pedidos</h1>
        <p className="text-gray-500 mt-1">Revisa y gestiona los pedidos de los clientes</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por numero, cliente o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Status Filter */}
        <div className="sm:w-64">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white"
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="enviado">Enviado</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-500">Cargando pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p className="text-gray-500 text-lg">No hay pedidos todavia</p>
            <p className="text-gray-400 mt-1">Los pedidos de tus clientes apareceran aqui</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Numero
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => router.push(`/admin/pedidos/${order.id}`)}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{formatPrice(order.total)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          statusStyles[order.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="text-sm text-gray-600">{formatDate(order.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
