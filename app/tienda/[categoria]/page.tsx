import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import Breadcrumb from '@/components/Breadcrumb'
import { getProductsByCategory, getCategoryBySlug, categories } from '@/data/products'

interface CategoryPageProps {
  params: Promise<{
    categoria: string
  }>
}

export function generateStaticParams() {
  return categories.map((category) => ({
    categoria: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params
  const category = getCategoryBySlug(categoria)

  if (!category) {
    notFound()
  }

  const categoryProducts = getProductsByCategory(categoria)

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Tienda', href: '/tienda' },
    { label: category.name },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />

          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            {category.description}
          </p>

          <CategoryFilter activeCategory={categoria} />

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No hay productos disponibles en esta categoría.
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2025 La Teleria. Textiles premium desde Girona, Catalunya.
          </p>
        </div>
      </footer>
    </div>
  )
}
