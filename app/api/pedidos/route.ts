import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendOrderConfirmationEmail } from '@/lib/resend';

export const dynamic = 'force-dynamic';

interface OrderItemInput {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  selectedVariants: Record<string, string>;
}

interface CreateOrderInput {
  shippingData: {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    codigoPostal: string;
    ciudad: string;
    provincia: string;
  };
  items: OrderItemInput[];
  subtotal: number;
  iva: number;
  total: number;
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LAT-${timestamp}-${random}`;
}

// POST /api/pedidos - Create a new order
export async function POST(request: Request) {
  try {
    const body: CreateOrderInput = await request.json();
    const { shippingData, items, subtotal, iva, total } = body;

    // Validate required fields
    if (!shippingData || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Datos de envío y productos son requeridos' },
        { status: 400 }
      );
    }

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Create the order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'pending',
        paymentMethod: 'bank_transfer',
        subtotal,
        iva,
        total,
        customerName: shippingData.nombre,
        customerEmail: shippingData.email,
        customerPhone: shippingData.telefono,
        shippingAddress: shippingData.direccion,
        shippingCity: shippingData.ciudad,
        shippingPostalCode: shippingData.codigoPostal,
        shippingProvince: shippingData.provincia,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productSlug: item.productSlug,
            price: item.price,
            quantity: item.quantity,
            selectedVariants: JSON.stringify(item.selectedVariants),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Send order confirmation email (non-blocking)
    sendOrderConfirmationEmail({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        selectedVariants: item.selectedVariants || undefined,
      })),
      subtotal: order.subtotal,
      iva: order.iva,
      total: order.total,
      shippingAddress: order.shippingAddress,
      shippingCity: order.shippingCity,
      shippingPostalCode: order.shippingPostalCode,
      shippingProvince: order.shippingProvince,
    }).catch((error) => {
      // Log error but don't fail the order creation
      console.error('Failed to send order confirmation email:', error);
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Error al crear el pedido' },
      { status: 500 }
    );
  }
}
