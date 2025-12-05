'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/data/products'

interface CategoryFilterProps {
  activeCategory?: string
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <Link
        href="/tienda"
        className={`px-4 py-2 text-sm rounded-full transition-colors ${
          !activeCategory || pathname === '/tienda'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/tienda/${category.slug}`}
          className={`px-4 py-2 text-sm rounded-full transition-colors ${
            activeCategory === category.slug
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
