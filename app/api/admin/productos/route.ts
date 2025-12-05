import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/productos - List all products with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    const where: {
      categoryId?: string;
      name?: { contains: string };
    } = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.name = { contains: search };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

// POST /api/admin/productos - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, shortDescription, description, price, salePrice, categoryId, stock, active } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: 'El nombre y el precio son obligatorios' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });

    const finalSlug = existingProduct ? `${slug}-${Date.now()}` : slug;

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        shortDescription: shortDescription || null,
        description: description || '',
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        categoryId: categoryId || null,
        stock: stock ? parseInt(stock) : 0,
        active: active !== undefined ? active : true
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);

    // Extract detailed error message
    let errorMessage = 'Error al crear producto';
    let errorDetails = '';

    if (error instanceof Error) {
      errorDetails = error.message;

      // Handle specific Prisma errors
      if (error.message.includes('Foreign key constraint')) {
        errorMessage = 'La categoría seleccionada no existe';
      } else if (error.message.includes('Unique constraint')) {
        errorMessage = 'Ya existe un producto con ese nombre o slug';
      } else if (error.message.includes('Invalid')) {
        errorMessage = 'Datos inválidos: revisa los campos del formulario';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    );
  }
}
