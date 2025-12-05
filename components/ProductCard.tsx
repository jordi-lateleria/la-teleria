import Link from 'next/link'
import { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/tienda/${product.categorySlug}/${product.slug}`}
      className="group cursor-pointer block"
    >
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:bg-gray-300 transition-colors">
          <span className="text-sm">Imagen del producto</span>
        </div>
      </div>
      <h3 className="text-lg font-light text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.description}</p>
      <p className="text-lg text-gray-900">{product.price.toFixed(2).replace('.', ',')} €</p>
    </Link>
  )
}
