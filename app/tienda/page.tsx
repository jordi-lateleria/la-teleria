import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TiendaContent from '@/components/TiendaContent'
import prisma from '@/lib/prisma'
import { DbProduct, DbCategory } from '@/types/database'

async function getProducts(): Promise<DbProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

async function getCategories(): Promise<DbCategory[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
    return JSON.parse(JSON.stringify(categories))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function TiendaPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-4">
            Tienda
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Descubre nuestra colección de textiles premium para el hogar
          </p>

          <Suspense fallback={
            <div className="text-center py-16">
              <div className="animate-pulse">
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                      <div className="aspect-square bg-gray-200 rounded-lg" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-6 bg-gray-200 rounded w-1/4" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }>
            <TiendaContent products={products} categories={categories} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  )
}
