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

// GET /api/admin/seed - Check database status and seed data
export async function GET() {
  try {
    const existingCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    const missingCategories = categories.filter(
      c => !existingCategories.some(ec => ec.slug === c.slug)
    );

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      database: {
        connected: true,
        categoriesCount: existingCategories.length,
        categories: existingCategories,
      },
      seedStatus: {
        expectedCategories: categories.map(c => c.name),
        missingCategories: missingCategories.map(c => c.name),
        needsSeeding: missingCategories.length > 0,
      },
      hint: missingCategories.length > 0
        ? 'Call POST /api/admin/seed to create missing categories'
        : 'All categories are present'
    });
  } catch (error) {
    console.error('Database connection error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        error: 'Database connection error',
        details: errorMessage,
        hint: 'Verify DATABASE_URL is correctly configured in Netlify environment variables'
      },
      { status: 500 }
    );
  }
}

// POST /api/admin/seed - Create initial categories if they don't exist
export async function POST() {
  const results: { category: string; status: 'created' | 'exists' | 'error'; error?: string }[] = [];

  try {
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
        const errorMessage = categoryError instanceof Error ? categoryError.message : 'Unknown error';
        results.push({ category: category.name, status: 'error', error: errorMessage });
      }
    }

    const finalCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });

    const createdCount = results.filter(r => r.status === 'created').length;
    const existingCount = results.filter(r => r.status === 'exists').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    return NextResponse.json({
      success: errorCount === 0,
      message: errorCount === 0
        ? `Seed completed: ${createdCount} categories created, ${existingCount} already existed`
        : `Seed completed with errors: ${createdCount} created, ${existingCount} existing, ${errorCount} errors`,
      results,
      totalCategories: finalCategories.length,
      categories: finalCategories
    });
  } catch (error) {
    console.error('Seed error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    let hint = 'Verify DATABASE_URL is correctly configured';
    if (errorMessage.includes('connect')) {
      hint = 'Cannot connect to database. Verify DATABASE_URL and that the database server is accessible';
    } else if (errorMessage.includes('does not exist') || errorMessage.includes('relation')) {
      hint = 'Tables do not exist. Run "prisma db push" or "prisma migrate deploy" to create the schema';
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error running seed',
        details: errorMessage,
        hint,
        results
      },
      { status: 500 }
    );
  }
}
