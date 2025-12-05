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
    const { name, shortDescription, description, price, salePrice, categoryId, stock, active, images } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'El nombre es obligatorio', field: 'name' },
        { status: 400 }
      );
    }

    if (price === undefined || price === null || price === '') {
      return NextResponse.json(
        { error: 'El precio es obligatorio', field: 'price' },
        { status: 400 }
      );
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: 'El precio debe ser un número válido mayor o igual a 0', field: 'price' },
        { status: 400 }
      );
    }

    // Validate categoryId if provided - must be a valid category ID from the database
    if (categoryId && categoryId.trim() !== '') {
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!categoryExists) {
        return NextResponse.json(
          {
            error: 'La categoría seleccionada no existe. Por favor, selecciona una categoría válida.',
            field: 'categoryId',
            details: `El ID de categoría "${categoryId}" no se encontró en la base de datos`
          },
          { status: 400 }
        );
      }
    }

    // Validate salePrice if provided
    let parsedSalePrice = null;
    if (salePrice !== undefined && salePrice !== null && salePrice !== '') {
      parsedSalePrice = parseFloat(salePrice);
      if (isNaN(parsedSalePrice) || parsedSalePrice < 0) {
        return NextResponse.json(
          { error: 'El precio de oferta debe ser un número válido mayor o igual a 0', field: 'salePrice' },
          { status: 400 }
        );
      }
    }

    // Validate stock if provided
    let parsedStock = 0;
    if (stock !== undefined && stock !== null && stock !== '') {
      parsedStock = parseInt(stock, 10);
      if (isNaN(parsedStock) || parsedStock < 0) {
        return NextResponse.json(
          { error: 'El stock debe ser un número entero mayor o igual a 0', field: 'stock' },
          { status: 400 }
        );
      }
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
        name: name.trim(),
        slug: finalSlug,
        shortDescription: shortDescription?.trim() || null,
        description: description?.trim() || '',
        price: parsedPrice,
        salePrice: parsedSalePrice,
        categoryId: categoryId?.trim() || null,
        stock: parsedStock,
        active: active !== undefined ? active : true,
        images: images && Array.isArray(images) && images.length > 0
          ? {
              create: images.map((img: { url: string; alt?: string; order?: number }, index: number) => ({
                url: img.url,
                alt: img.alt || null,
                order: img.order ?? index,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
        },
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);

    // Extract detailed error message
    let errorMessage = 'Error al crear producto';
    let errorDetails = '';
    let errorCode = '';

    if (error instanceof Error) {
      errorDetails = error.message;

      // Check if it's a Prisma error with a code
      const prismaError = error as { code?: string; meta?: Record<string, unknown> };
      if (prismaError.code) {
        errorCode = prismaError.code;
        console.error('Prisma error code:', prismaError.code);
        console.error('Prisma error meta:', prismaError.meta);
      }

      // Handle specific Prisma errors
      if (error.message.includes('Foreign key constraint') || prismaError.code === 'P2003') {
        errorMessage = 'La categoria seleccionada no existe. Ejecuta el seed de categorias primero.';
      } else if (error.message.includes('Unique constraint') || prismaError.code === 'P2002') {
        errorMessage = 'Ya existe un producto con ese nombre o slug';
      } else if (error.message.includes('Invalid `prisma') || error.message.includes('prisma')) {
        errorMessage = 'Error de base de datos: verifica que todos los campos tengan el formato correcto';
      } else if (prismaError.code === 'P1001' || error.message.includes('connect')) {
        errorMessage = 'No se puede conectar a la base de datos. Verifica DATABASE_URL';
      } else if (prismaError.code === 'P2021' || error.message.includes('does not exist')) {
        errorMessage = 'La tabla no existe. Ejecuta "prisma db push" para crear el esquema';
      }

      // Log the full error for debugging
      console.error('Full error object:', JSON.stringify({
        message: error.message,
        code: errorCode,
        stack: error.stack
      }, null, 2));
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        code: errorCode || undefined,
        hint: 'Si el problema persiste, verifica: 1) DATABASE_URL esta configurado 2) Las categorias existen (usa /api/admin/seed-categories) 3) El schema esta sincronizado (prisma db push)'
      },
      { status: 500 }
    );
  }
}
