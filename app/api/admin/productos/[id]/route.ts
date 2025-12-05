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
    let parsedStock = existingProduct.stock;
    if (stock !== undefined && stock !== null && stock !== '') {
      parsedStock = parseInt(stock, 10);
      if (isNaN(parsedStock) || parsedStock < 0) {
        return NextResponse.json(
          { error: 'El stock debe ser un número entero mayor o igual a 0', field: 'stock' },
          { status: 400 }
        );
      }
    }

    // Generate new slug if name changed
    let slug = existingProduct.slug;
    if (name.trim() !== existingProduct.name) {
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

    // Handle images update: delete existing and create new ones
    if (images !== undefined && Array.isArray(images)) {
      // Delete all existing images for this product
      await prisma.productImage.deleteMany({
        where: { productId: id }
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        slug,
        shortDescription: shortDescription?.trim() || null,
        description: description?.trim() || '',
        price: parsedPrice,
        salePrice: parsedSalePrice,
        categoryId: categoryId?.trim() || null,
        stock: parsedStock,
        active: active !== undefined ? active : existingProduct.active,
        images: images !== undefined && Array.isArray(images) && images.length > 0
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
      } else if (error.message.includes('Invalid `prisma')) {
        errorMessage = 'Error de base de datos: verifica que todos los campos tengan el formato correcto';
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
