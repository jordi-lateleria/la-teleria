import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import ProductDetailView from '@/components/ProductDetailView'
import prisma from '@/lib/prisma'
import { DbProduct } from '@/types/database'

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getProduct(slug: string): Promise<DbProduct | null> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
        active: true
      },
      include: {
        category: true,
        images: {
          orderBy: { order: 'asc' }
        },
        variants: true
      }
    })
    return product ? JSON.parse(JSON.stringify(product)) : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductDetailView product={product} />

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

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: 'Producto no encontrado'
    }
  }

  return {
    title: `${product.name} | La Teleria`,
    description: product.shortDescription || product.description
  }
}
