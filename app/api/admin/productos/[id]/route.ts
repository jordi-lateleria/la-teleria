import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/productos/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/productos/[id] - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, shortDescription, description, price, salePrice, categoryId, stock, active } = body;

    if (!name || !price) {
      return NextResponse.json(
        { error: 'El nombre y el precio son obligatorios' },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    // Generate new slug if name changed
    let slug = existingProduct.slug;
    if (name !== existingProduct.name) {
      slug = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Check if new slug already exists (excluding current product)
      const productWithSlug = await prisma.product.findFirst({
        where: {
          slug,
          id: { not: id }
        }
      });

      if (productWithSlug) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        shortDescription: shortDescription || null,
        description: description || '',
        price: parseFloat(price),
        salePrice: salePrice ? parseFloat(salePrice) : null,
        categoryId: categoryId || null,
        stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
        active: active !== undefined ? active : existingProduct.active
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);

    // Extract detailed error message
    let errorMessage = 'Error al actualizar producto';
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

// DELETE /api/admin/productos/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    );
  }
}
