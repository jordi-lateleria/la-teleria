import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/pedidos - List all orders with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: {
      status?: string;
      OR?: Array<{ orderNumber?: { contains: string }; customerName?: { contains: string }; customerEmail?: { contains: string } }>;
    } = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search } },
        { customerName: { contains: search } },
        { customerEmail: { contains: search } }
      ];
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Error al obtener pedidos' },
      { status: 500 }
    );
  }
}
