import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-4">
            Politica de Cookies
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12">
            Ultima actualizacion: Diciembre 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduccion */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">1. Que son las cookies</h2>
              <p className="text-gray-600 mb-4">
                Las cookies son pequenos archivos de texto que se almacenan en su dispositivo (ordenador, tablet o movil) cuando visita un sitio web. Estas cookies permiten que el sitio recuerde sus acciones y preferencias (como idioma, tamano de fuente y otras preferencias de visualizacion) durante un periodo de tiempo, para que no tenga que volver a configurarlas cada vez que regrese al sitio o navegue de una pagina a otra.
              </p>
            </div>

            {/* Tipos de cookies */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">2. Tipos de cookies que utilizamos</h2>
              <p className="text-gray-600 mb-4">
                En La Teleria utilizamos los siguientes tipos de cookies:
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cookies tecnicas o necesarias</h3>
                <p className="text-gray-600 mb-2">
                  Son esenciales para el funcionamiento basico del sitio web. Sin estas cookies, el sitio web no podria funcionar correctamente.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Cookies de sesion de usuario</li>
                  <li>Cookies del carrito de compra</li>
                  <li>Cookies de seguridad y autenticacion</li>
                  <li>Cookies de preferencias de idioma</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cookies analiticas</h3>
                <p className="text-gray-600 mb-2">
                  Nos permiten medir y analizar como los usuarios navegan por nuestro sitio web. Esto nos ayuda a mejorar nuestros servicios y la experiencia de usuario.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Cookies de analisis de trafico</li>
                  <li>Cookies de comportamiento de navegacion</li>
                  <li>Cookies de rendimiento del sitio</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Cookies de funcionalidad</h3>
                <p className="text-gray-600 mb-2">
                  Permiten recordar sus preferencias y personalizar su experiencia en nuestro sitio.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Cookies de personalizacion de la interfaz</li>
                  <li>Cookies de productos visitados recientemente</li>
                </ul>
              </div>
            </div>

            {/* Cookies de terceros */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">3. Cookies de terceros</h2>
              <p className="text-gray-600 mb-4">
                Ademas de nuestras propias cookies, podemos utilizar cookies de terceros para:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Procesamiento de pagos:</strong> Nuestro proveedor de pagos (Stripe) puede utilizar cookies para procesar transacciones de forma segura</li>
                <li><strong>Analisis web:</strong> Herramientas de analisis para comprender el uso del sitio</li>
                <li><strong>Redes sociales:</strong> Si comparte contenido en redes sociales, estas pueden establecer sus propias cookies</li>
              </ul>
            </div>

            {/* Duracion */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">4. Duracion de las cookies</h2>
              <p className="text-gray-600 mb-4">
                Segun su duracion, las cookies pueden ser:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Cookies de sesion:</strong> Se eliminan automaticamente cuando cierra su navegador</li>
                <li><strong>Cookies persistentes:</strong> Permanecen en su dispositivo durante un periodo determinado o hasta que las elimine manualmente. En nuestro caso, las cookies persistentes tienen una duracion maxima de 12 meses</li>
              </ul>
            </div>

            {/* Gestion de cookies */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">5. Como gestionar las cookies</h2>
              <p className="text-gray-600 mb-4">
                Usted puede controlar y gestionar las cookies de varias formas:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Configuracion del navegador:</strong> La mayoria de navegadores le permiten rechazar o aceptar cookies, eliminar las existentes o configurar alertas antes de que se almacenen</li>
                <li><strong>Eliminar cookies:</strong> Puede eliminar todas las cookies que ya estan en su dispositivo borrando el historial de navegacion de su navegador</li>
                <li><strong>Bloquear cookies:</strong> Puede configurar su navegador para que bloquee las cookies, aunque esto puede afectar al funcionamiento de algunas partes del sitio</li>
              </ul>
              <p className="text-gray-600 mt-4">
                A continuacion le indicamos como gestionar las cookies en los navegadores mas comunes:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">Microsoft Edge</a></li>
              </ul>
            </div>

            {/* Consecuencias de desactivar cookies */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">6. Consecuencias de desactivar las cookies</h2>
              <p className="text-gray-600">
                Si decide desactivar las cookies, es posible que algunas funcionalidades de nuestro sitio web no esten disponibles o no funcionen correctamente. Por ejemplo, no podremos recordar los productos de su carrito de compra, sus preferencias de idioma o mantener su sesion iniciada. Las cookies tecnicas son necesarias para el correcto funcionamiento de la tienda online.
              </p>
            </div>

            {/* Base legal */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">7. Base legal</h2>
              <p className="text-gray-600">
                La base legal para el uso de cookies tecnicas es el interes legitimo del responsable para garantizar el correcto funcionamiento del sitio web. Para las cookies analiticas y de funcionalidad, la base legal es el consentimiento del usuario, que puede retirar en cualquier momento mediante la configuracion de su navegador.
              </p>
            </div>

            {/* Actualizaciones */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">8. Actualizaciones de esta politica</h2>
              <p className="text-gray-600">
                Podemos actualizar esta Politica de Cookies periodicamente para reflejar cambios en nuestras practicas o por motivos legales. Le recomendamos revisar esta pagina regularmente para estar informado sobre como utilizamos las cookies. Cualquier cambio sera efectivo inmediatamente despues de su publicacion en esta pagina.
              </p>
            </div>

            {/* Mas informacion */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">9. Mas informacion</h2>
              <p className="text-gray-600">
                Para mas informacion sobre como tratamos sus datos personales, puede consultar nuestra <Link href="/politica-privacidad" className="text-gray-900 hover:underline">Politica de Privacidad</Link>.
              </p>
            </div>

            {/* Contacto */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600 mb-4">
                Si tiene alguna pregunta sobre nuestra Politica de Cookies, puede contactarnos:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:info@lateleria.com" className="text-gray-900 hover:underline">info@lateleria.com</a></li>
                <li><strong>Direccion:</strong> Carrer Ciutadans, 17, 17004 Girona</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
