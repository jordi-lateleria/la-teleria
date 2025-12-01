import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="La Teleria"
            width={300}
            height={60}
            priority
          />
        </div>
      </header>

      {/* Hero */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-light mb-6">
            Textiles Premium para el Hogar
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Diseñado y producido en Catalunya
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 rounded hover:bg-gray-700 transition">
            Explorar Productos
          </button>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-light text-center mb-12">
            Productos Destacados
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Producto 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <p className="text-gray-400">Imagen producto</p>
              </div>
              <div className="p-6">
                <h4 className="font-light text-lg mb-2">Cortina de Lino</h4>
                <p className="text-gray-600 text-sm mb-4">100% lino natural</p>
                <p className="text-xl font-light">89,00 €</p>
              </div>
            </div>

            {/* Producto 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <p className="text-gray-400">Imagen producto</p>
              </div>
              <div className="p-6">
                <h4 className="font-light text-lg mb-2">Sábana de Algodón</h4>
                <p className="text-gray-600 text-sm mb-4">GOTS Certificado</p>
                <p className="text-xl font-light">65,00 €</p>
              </div>
            </div>

            {/* Producto 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <p className="text-gray-400">Imagen producto</p>
              </div>
              <div className="p-6">
                <h4 className="font-light text-lg mb-2">Manta de Lana</h4>
                <p className="text-gray-600 text-sm mb-4">Tejido artesanal</p>
                <p className="text-xl font-light">120,00 €</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 La Teleria. Textiles premium desde Girona, Catalunya.</p>
        </div>
      </footer>
    </div>
  )
}