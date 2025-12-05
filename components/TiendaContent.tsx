'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { DbProduct, DbCategory } from '@/types/database'

interface TiendaContentProps {
  products: DbProduct[]
  categories: DbCategory[]
}

export default function TiendaContent({ products, categories }: TiendaContentProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryFromUrl = searchParams.get('category')
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryFromUrl)

  useEffect(() => {
    setActiveCategory(categoryFromUrl)
  }, [categoryFromUrl])

  const handleCategoryChange = (categorySlug: string | null) => {
    if (categorySlug) {
      router.push(`/tienda?category=${categorySlug}`)
    } else {
      router.push('/tienda')
    }
  }

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category?.slug === activeCategory)
    : products

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-4 py-2 text-sm rounded-full transition-colors ${
            !activeCategory
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              activeCategory === category.slug
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No hay productos disponibles en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/tienda/${product.slug}`}
              className="group cursor-pointer block"
            >
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:bg-gray-300 transition-colors">
                    <span className="text-sm">Imagen del producto</span>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                {product.shortDescription || product.description}
              </p>
              <div className="flex items-center gap-2">
                {product.salePrice ? (
                  <>
                    <p className="text-lg text-red-600">
                      {product.salePrice.toFixed(2).replace('.', ',')} €
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      {product.price.toFixed(2).replace('.', ',')} €
                    </p>
                  </>
                ) : (
                  <p className="text-lg text-gray-900">
                    {product.price.toFixed(2).replace('.', ',')} €
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
