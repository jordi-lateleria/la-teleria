import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { products } from '@/data/products'

export default function TiendaPage() {
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

          <CategoryFilter />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
