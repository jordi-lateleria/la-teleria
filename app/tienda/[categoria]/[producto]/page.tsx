import { notFound } from 'next/navigation'
import ProductDetailClient from '@/components/ProductDetailClient'
import { getProductBySlug, getCategoryBySlug, products } from '@/data/products'

interface ProductPageProps {
  params: Promise<{
    categoria: string
    producto: string
  }>
}

export function generateStaticParams() {
  return products.map((product) => ({
    categoria: product.categorySlug,
    producto: product.slug,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { categoria, producto } = await params
  const product = getProductBySlug(producto)
  const category = getCategoryBySlug(categoria)

  if (!product || !category || product.categorySlug !== categoria) {
    notFound()
  }

  return <ProductDetailClient product={product} category={category} />
}
