import Header from '@/components/Header'

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-4">
            Politica de Privacidad
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12">
            Ultima actualizacion: Diciembre 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduccion */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">1. Responsable del tratamiento</h2>
              <p className="text-gray-600 mb-4">
                En cumplimiento del Reglamento General de Proteccion de Datos (RGPD) y la Ley Organica 3/2018 de Proteccion de Datos Personales y garantia de los derechos digitales (LOPDGDD), le informamos que:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Responsable:</strong> La Teleria</li>
                <li><strong>Direccion:</strong> Carrer Ciutadans, 17, 17004 Girona</li>
                <li><strong>Email:</strong> info@lateleria.com</li>
              </ul>
            </div>

            {/* Datos recogidos */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">2. Datos personales que recogemos</h2>
              <p className="text-gray-600 mb-4">
                Recogemos los datos personales que usted nos proporciona voluntariamente a traves de nuestros formularios de contacto y proceso de compra:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Nombre y apellidos</li>
                <li>Direccion de correo electronico</li>
                <li>Numero de telefono</li>
                <li>Direccion postal (para envios)</li>
                <li>Datos de facturacion</li>
              </ul>
            </div>

            {/* Finalidad */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">3. Finalidad del tratamiento</h2>
              <p className="text-gray-600 mb-4">
                Tratamos sus datos personales para las siguientes finalidades:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Gestionar y procesar sus pedidos de productos textiles</li>
                <li>Responder a sus consultas y solicitudes de informacion</li>
                <li>Enviar comunicaciones comerciales sobre nuestros productos y servicios (solo si ha dado su consentimiento)</li>
                <li>Cumplir con nuestras obligaciones legales y fiscales</li>
                <li>Mejorar nuestros servicios y la experiencia del usuario</li>
              </ul>
            </div>

            {/* Base legal */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">4. Base legal del tratamiento</h2>
              <p className="text-gray-600 mb-4">
                La base legal para el tratamiento de sus datos es:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Ejecucion de un contrato:</strong> Para procesar sus compras y entregas</li>
                <li><strong>Consentimiento:</strong> Para el envio de comunicaciones comerciales</li>
                <li><strong>Interes legitimo:</strong> Para mejorar nuestros servicios</li>
                <li><strong>Obligacion legal:</strong> Para cumplir con la normativa fiscal y mercantil</li>
              </ul>
            </div>

            {/* Conservacion */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">5. Conservacion de datos</h2>
              <p className="text-gray-600">
                Conservaremos sus datos personales durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad. Los datos de facturacion se conservaran durante el plazo legalmente establecido (minimo 6 anos segun la legislacion mercantil y fiscal espanola).
              </p>
            </div>

            {/* Derechos */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">6. Sus derechos</h2>
              <p className="text-gray-600 mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Acceso:</strong> Conocer que datos personales tratamos sobre usted</li>
                <li><strong>Rectificacion:</strong> Solicitar la correccion de datos inexactos</li>
                <li><strong>Supresion:</strong> Solicitar la eliminacion de sus datos (derecho al olvido)</li>
                <li><strong>Oposicion:</strong> Oponerse al tratamiento de sus datos</li>
                <li><strong>Limitacion:</strong> Solicitar la limitacion del tratamiento</li>
                <li><strong>Portabilidad:</strong> Recibir sus datos en un formato estructurado</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Para ejercer estos derechos, puede contactarnos en <a href="mailto:info@lateleria.com" className="text-gray-900 hover:underline">info@lateleria.com</a> o en nuestra direccion postal.
              </p>
            </div>

            {/* Seguridad */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">7. Seguridad de los datos</h2>
              <p className="text-gray-600">
                Aplicamos medidas tecnicas y organizativas apropiadas para proteger sus datos personales contra el tratamiento no autorizado o ilicito, la perdida accidental, la destruccion o el dano. Utilizamos conexiones seguras (HTTPS) y sistemas de pago seguros para proteger sus transacciones.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">8. Cookies</h2>
              <p className="text-gray-600">
                Nuestra web utiliza cookies para mejorar su experiencia de navegacion. Las cookies son pequenos archivos de texto que se almacenan en su dispositivo. Utilizamos cookies tecnicas necesarias para el funcionamiento de la web y cookies analiticas para comprender como los usuarios interactuan con nuestro sitio. Puede configurar su navegador para rechazar las cookies, aunque esto puede afectar a algunas funcionalidades de la web. Para mas informacion, consulte nuestra <a href="/politica-cookies" className="text-gray-900 hover:underline">Politica de Cookies</a>.
              </p>
            </div>

            {/* Terceros */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">9. Comunicacion a terceros</h2>
              <p className="text-gray-600">
                Sus datos podran ser comunicados a terceros unicamente cuando sea necesario para la prestacion de nuestros servicios (empresas de transporte, pasarelas de pago) o cuando exista una obligacion legal. No vendemos ni cedemos sus datos personales a terceros con fines comerciales.
              </p>
            </div>

            {/* Reclamaciones */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">10. Reclamaciones</h2>
              <p className="text-gray-600">
                Si considera que el tratamiento de sus datos no es adecuado, tiene derecho a presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">www.aepd.es</a>.
              </p>
            </div>

            {/* Contacto */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600 mb-4">
                Para cualquier cuestion relacionada con nuestra politica de privacidad, puede contactarnos:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:info@lateleria.com" className="text-gray-900 hover:underline">info@lateleria.com</a></li>
                <li><strong>Direccion:</strong> Carrer Ciutadans, 17, 17004 Girona</li>
              </ul>
            </div>
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
