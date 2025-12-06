import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link
              href="/tienda"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Tienda
            </Link>
            <Link
              href="/contacto"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contacto
            </Link>
            <Link
              href="/b2b"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              B2B
            </Link>
            <Link
              href="/politica-privacidad"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos-condiciones"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/politica-cookies"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Política de Cookies
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2025 La Teleria. Textiles premium desde Girona, Catalunya.
          </p>
        </div>
      </div>
    </footer>
  )
}
