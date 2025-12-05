import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const categories = [
  { name: 'Accesorio', slug: 'accesorio' },
  { name: 'BathCloth', slug: 'bathcloth' },
  { name: 'Courtain', slug: 'courtain' },
  { name: 'Living', slug: 'living' },
  { name: 'Lounge', slug: 'lounge' },
  { name: 'TableCloth', slug: 'tablecloth' },
];

// GET /api/admin/seed-categories - Check database connection and categories status
export async function GET() {
  try {
    // Test database connection
    const existingCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    return NextResponse.json({
      success: true,
      message: 'Conexion a la base de datos exitosa',
      existingCategories: existingCategories.length,
      categories: existingCategories,
      expectedCategories: categories.map(c => c.name),
      missingCategories: categories.filter(
        c => !existingCategories.some(ec => ec.slug === c.slug)
      ).map(c => c.name)
    });
  } catch (error) {
    console.error('Database connection error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        success: false,
        error: 'Error de conexion a la base de datos',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
        hint: 'Verifica que DATABASE_URL este configurado correctamente en las variables de entorno de Netlify'
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/seed-categories - Create categories if they don't exist
export async function POST() {
  const results: { category: string; status: 'created' | 'exists' | 'error'; error?: string }[] = [];

  try {
    // Test database connection first
    await prisma.$connect();
    console.log('Database connection successful');

    for (const category of categories) {
      try {
        const existingCategory = await prisma.category.findUnique({
          where: { slug: category.slug }
        });

        if (existingCategory) {
          console.log(`Category already exists: ${category.name}`);
          results.push({ category: category.name, status: 'exists' });
        } else {
          await prisma.category.create({
            data: category
          });
          console.log(`Created category: ${category.name}`);
          results.push({ category: category.name, status: 'created' });
        }
      } catch (categoryError) {
        console.error(`Error processing category ${category.name}:`, categoryError);
        const errorMessage = categoryError instanceof Error ? categoryError.message : 'Error desconocido';
        results.push({ category: category.name, status: 'error', error: errorMessage });
      }
    }

    // Get final count
    const finalCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    const createdCount = results.filter(r => r.status === 'created').length;
    const existingCount = results.filter(r => r.status === 'exists').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return NextResponse.json({
      success: errorCount === 0,
      message: errorCount === 0
        ? `Seed completado: ${createdCount} categorias creadas, ${existingCount} ya existian`
        : `Seed completado con errores: ${createdCount} creadas, ${existingCount} existentes, ${errorCount} errores`,
      results,
      totalCategories: finalCategories.length,
      categories: finalCategories
    });
  } catch (error) {
    console.error('Seed categories error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Check for specific Prisma errors
    let hint = 'Verifica que DATABASE_URL este configurado correctamente';
    if (errorMessage.includes('connect')) {
      hint = 'No se puede conectar a la base de datos. Verifica DATABASE_URL y que el servidor de base de datos este accesible';
    } else if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
      hint = 'Las tablas no existen. Ejecuta "prisma db push" o "prisma migrate deploy" para crear el esquema';
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error al ejecutar seed de categorias',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
        hint,
        results
      },
      { status: 500 }
    );
  }
}
