import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/db-status - Check database connection and status
export async function GET() {
  const diagnostics: {
    databaseUrl: string;
    connectionStatus: 'connected' | 'error';
    connectionError?: string;
    tables?: {
      categories: number;
      products: number;
      productImages: number;
      productVariants: number;
    };
    prismaVersion?: string;
    hint?: string;
  } = {
    databaseUrl: process.env.DATABASE_URL
      ? (process.env.DATABASE_URL.startsWith('file:')
          ? 'SQLite (file-based - not recommended for production)'
          : process.env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'configured')
      : 'NOT CONFIGURED',
    connectionStatus: 'error',
  };

  try {
    // Test database connection
    await prisma.$connect();
    diagnostics.connectionStatus = 'connected';

    // Get table counts
    const [categoriesCount, productsCount, imagesCount, variantsCount] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.productImage.count(),
      prisma.productVariant.count(),
    ]);

    diagnostics.tables = {
      categories: categoriesCount,
      products: productsCount,
      productImages: imagesCount,
      productVariants: variantsCount,
    };

    if (categoriesCount === 0) {
      diagnostics.hint = 'No hay categorias. Ejecuta POST /api/admin/seed-categories o usa el boton en el dashboard de admin.';
    }

    return NextResponse.json({
      success: true,
      message: 'Conexion a la base de datos exitosa',
      diagnostics,
    });
  } catch (error) {
    console.error('Database status check error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    diagnostics.connectionError = errorMessage;

    // Check for specific errors
    if (errorMessage.includes('connect') || errorMessage.includes('ECONNREFUSED')) {
      diagnostics.hint = 'No se puede conectar a la base de datos. Verifica que DATABASE_URL este configurado correctamente en Netlify.';
    } else if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
      diagnostics.hint = 'Las tablas no existen. El build debe ejecutar "prisma db push" para crearlas.';
    } else if (!process.env.DATABASE_URL) {
      diagnostics.hint = 'DATABASE_URL no esta configurado. Agregalo en las variables de entorno de Netlify.';
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error de conexion a la base de datos',
        diagnostics,
      },
      { status: 500 }
    );
  }
}
