'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdminLayoutWrapper from '../../components/AdminLayoutWrapper';

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
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  pagado: 'bg-green-50 text-green-700 border-green-200',
  enviado: 'bg-blue-50 text-blue-700 border-blue-200'
};

const paymentMethodLabels: Record<string, string> = {
  bank_transfer: 'Transferencia bancaria',
  card: 'Tarjeta'
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateError, setStatusUpdateError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/admin/pedidos/${orderId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Pedido no encontrado');
        }
        throw new Error('Error al cargar el pedido');
      }
      const data = await response.json();
      setOrder(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!order || newStatus === order.status) return;

    try {
      setIsUpdatingStatus(true);
      setStatusUpdateError(null);
      const response = await fetch(`/api/admin/pedidos/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado');
      }

      const updatedOrder = await response.json();
      setOrder(updatedOrder);
    } catch (err) {
      setStatusUpdateError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsUpdatingStatus(false);
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const parseVariants = (variantsString: string | null): Record<string, string> => {
    if (!variantsString) return {};
    try {
      return JSON.parse(variantsString);
    } catch {
      return {};
    }
  };

  if (isLoading) {
    return (
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-500">Cargando pedido...</p>
          </div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  if (error || !order) {
    return (
      <AdminLayoutWrapper>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-gray-700 text-lg mb-4">{error || 'Pedido no encontrado'}</p>
            <Link
              href="/admin/pedidos"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a pedidos
            </Link>
          </div>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper>
      {/* Header with back button */}
      <div className="mb-6">
        <Link
          href="/admin/pedidos"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a pedidos
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-light text-gray-900">
              Pedido {order.orderNumber}
            </h1>
            <p className="text-gray-500 mt-1">
              Realizado el {formatDate(order.createdAt)}
            </p>
          </div>
          {/* Status dropdown */}
          <div className="flex items-center gap-3">
            <label htmlFor="status" className="text-sm font-medium text-gray-700">
              Estado:
            </label>
            <select
              id="status"
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isUpdatingStatus}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white ${
                isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''
              } ${statusStyles[order.status] || 'border-gray-300'}`}
            >
              <option value="pending">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="enviado">Enviado</option>
            </select>
            {isUpdatingStatus && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            )}
          </div>
        </div>
        {statusUpdateError && (
          <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {statusUpdateError}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products section - takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Productos del pedido</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => {
                const variants = parseVariants(item.selectedVariants);
                const variantEntries = Object.entries(variants);
                return (
                  <div key={item.id} className="px-6 py-4 flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.productName}</h3>
                      {variantEntries.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {variantEntries.map(([key, value]) => (
                            <span
                              key={key}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                            >
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Order totals */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (21%)</span>
                  <span className="text-gray-900">{formatPrice(order.iva)}</span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer info section - takes 1 column */}
        <div className="space-y-6">
          {/* Customer data */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Datos del cliente</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </label>
                <p className="mt-1 text-sm text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  <a href={`mailto:${order.customerEmail}`} className="text-blue-600 hover:underline">
                    {order.customerEmail}
                  </a>
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefono
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  <a href={`tel:${order.customerPhone}`} className="text-blue-600 hover:underline">
                    {order.customerPhone}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Direccion de envio</h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-900">{order.shippingAddress}</p>
              <p className="text-sm text-gray-900 mt-1">
                {order.shippingPostalCode} {order.shippingCity}
              </p>
              <p className="text-sm text-gray-900 mt-1">{order.shippingProvince}</p>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Informacion del pago</h2>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metodo de pago
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {paymentMethodLabels[order.paymentMethod] || order.paymentMethod}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado del pago
                </label>
                <p className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusStyles[order.status] || 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
