import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get total products count
    const totalProducts = await prisma.product.count();

    // Get active and inactive products count
    const activeProducts = await prisma.product.count({
      where: { active: true }
    });
    const inactiveProducts = await prisma.product.count({
      where: { active: false }
    });

    // Get all categories with their product counts
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    const categoriesWithCounts = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      productCount: category._count.products
    }));

    return NextResponse.json({
      totalProducts,
      activeProducts,
      inactiveProducts,
      categories: categoriesWithCounts
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadisticas' },
      { status: 500 }
    );
  }
}
