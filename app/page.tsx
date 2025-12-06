import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6">
            Textiles Premium para el Hogar
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Diseñado y producido en Catalunya
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 text-sm tracking-wide hover:bg-gray-800 transition-colors">
            Explorar Productos
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-light text-center text-gray-900 mb-16">
            Productos Destacados
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Imagen del producto</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-1">Cortina de Lino</h3>
              <p className="text-sm text-gray-500 mb-2">100% lino natural</p>
              <p className="text-lg text-gray-900">89,00 €</p>
            </div>

            {/* Product 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Imagen del producto</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-1">Sábana de Algodón</h3>
              <p className="text-sm text-gray-500 mb-2">GOTS Certificado</p>
              <p className="text-lg text-gray-900">65,00 €</p>
            </div>

            {/* Product 3 */}
            <div className="group cursor-pointer">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Imagen del producto</span>
                </div>
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-1">Manta de Lana</h3>
              <p className="text-sm text-gray-500 mb-2">Tejido artesanal</p>
              <p className="text-lg text-gray-900">120,00 €</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}