import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TerminosCondicionesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-4">
            Terminos y Condiciones de Compra
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12">
            Ultima actualizacion: Diciembre 2025
          </p>

          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduccion */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">1. Informacion general</h2>
              <p className="text-gray-600 mb-4">
                Los presentes Terminos y Condiciones regulan la compra de productos textiles a traves de la tienda online de La Teleria. Al realizar una compra en nuestra web, usted acepta quedar vinculado por estos terminos.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Razon social:</strong> La Teleria</li>
                <li><strong>Direccion:</strong> Carrer Ciutadans, 17, 17004 Girona</li>
                <li><strong>Email:</strong> info@lateleria.com</li>
              </ul>
            </div>

            {/* Productos */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">2. Productos</h2>
              <p className="text-gray-600 mb-4">
                Todos los productos ofrecidos en nuestra tienda online son textiles de alta calidad. Nos esforzamos por mostrar con precision los colores y caracteristicas de nuestros productos, aunque pueden existir ligeras variaciones debido a la configuracion de su pantalla.
              </p>
              <p className="text-gray-600">
                Las imagenes de los productos son ilustrativas y pueden no representar exactamente el articulo. Las medidas y composiciones se especifican en cada ficha de producto.
              </p>
            </div>

            {/* Precios */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">3. Precios y disponibilidad</h2>
              <p className="text-gray-600 mb-4">
                Los precios mostrados en nuestra web incluyen el IVA aplicable. Nos reservamos el derecho de modificar los precios en cualquier momento, aunque los cambios no afectaran a los pedidos ya confirmados.
              </p>
              <p className="text-gray-600">
                La disponibilidad de los productos esta sujeta a existencias. En caso de que un producto no este disponible despues de realizar su pedido, le contactaremos para ofrecerle alternativas o proceder al reembolso.
              </p>
            </div>

            {/* Proceso de compra */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">4. Proceso de compra</h2>
              <p className="text-gray-600 mb-4">
                Para realizar una compra en nuestra tienda online, debera seguir los siguientes pasos:
              </p>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Seleccionar los productos deseados y anadir al carrito</li>
                <li>Revisar el contenido del carrito</li>
                <li>Introducir sus datos de envio y facturacion</li>
                <li>Seleccionar el metodo de pago</li>
                <li>Confirmar el pedido</li>
              </ol>
              <p className="text-gray-600 mt-4">
                Una vez confirmado el pedido, recibira un email de confirmacion con los detalles de su compra.
              </p>
            </div>

            {/* Metodos de pago */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">5. Metodos de pago</h2>
              <p className="text-gray-600 mb-4">
                Aceptamos los siguientes metodos de pago:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Tarjetas de credito y debito (Visa, Mastercard)</li>
                <li>Transferencia bancaria</li>
                <li>Pago seguro a traves de pasarela de pago</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Todos los pagos se procesan de forma segura. Sus datos bancarios estan protegidos mediante encriptacion SSL.
              </p>
            </div>

            {/* Envios */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">6. Envios y entregas</h2>
              <p className="text-gray-600 mb-4">
                Realizamos envios a toda la Peninsula Iberica y Baleares. Los plazos de entrega son:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Peninsula:</strong> 3-5 dias laborables</li>
                <li><strong>Baleares:</strong> 5-7 dias laborables</li>
                <li><strong>Girona y alrededores:</strong> Posibilidad de recogida en tienda</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Los gastos de envio se calculan en funcion del peso y destino del pedido, y se mostraran antes de confirmar la compra. Para pedidos superiores a 100€, el envio es gratuito en Peninsula.
              </p>
            </div>

            {/* Devoluciones */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">7. Devoluciones y cambios</h2>
              <p className="text-gray-600 mb-4">
                Dispone de 14 dias naturales desde la recepcion del pedido para ejercer su derecho de desistimiento. Para realizar una devolucion:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Los productos deben estar en su estado original, sin usar y con el embalaje intacto</li>
                <li>Contacte con nosotros en info@lateleria.com indicando el numero de pedido</li>
                <li>Le enviaremos las instrucciones para la devolucion</li>
                <li>Una vez recibido y verificado el producto, procederemos al reembolso en un plazo maximo de 14 dias</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Los gastos de devolucion correran a cargo del cliente, salvo que el producto este defectuoso o no corresponda con lo solicitado.
              </p>
            </div>

            {/* Productos defectuosos */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">8. Productos defectuosos</h2>
              <p className="text-gray-600">
                Si recibe un producto defectuoso o que no corresponde con su pedido, contacte con nosotros en las 48 horas siguientes a la recepcion. Adjunte fotografias del producto y del embalaje. Procederemos a la sustitucion o reembolso sin coste adicional para usted.
              </p>
            </div>

            {/* Garantia */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">9. Garantia</h2>
              <p className="text-gray-600">
                Todos nuestros productos textiles estan cubiertos por la garantia legal de 3 anos para productos de consumo, segun la normativa vigente. Esta garantia cubre los defectos de fabricacion, pero no el desgaste normal por uso ni los danos causados por un uso inadecuado o lavado incorrecto.
              </p>
            </div>

            {/* Cuidado de productos */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">10. Cuidado de los productos</h2>
              <p className="text-gray-600 mb-4">
                Para garantizar la durabilidad de nuestros textiles, le recomendamos seguir las instrucciones de lavado indicadas en la etiqueta de cada producto. Como reglas generales:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Lave los textiles a la temperatura indicada en la etiqueta</li>
                <li>Evite el uso de lejia en productos de color</li>
                <li>Planche a temperatura adecuada segun el tipo de tejido</li>
                <li>Algunos productos pueden requerir limpieza en seco</li>
              </ul>
            </div>

            {/* Propiedad intelectual */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">11. Propiedad intelectual</h2>
              <p className="text-gray-600">
                Todos los contenidos de esta web (textos, imagenes, logos, disenos) son propiedad de La Teleria o de terceros que han autorizado su uso. Queda prohibida su reproduccion, distribucion o modificacion sin autorizacion expresa.
              </p>
            </div>

            {/* Limitacion de responsabilidad */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">12. Limitacion de responsabilidad</h2>
              <p className="text-gray-600">
                La Teleria no sera responsable de los danos o perjuicios derivados del uso inadecuado de los productos, ni de las interrupciones o errores en el servicio de la web por causas ajenas a nuestra voluntad. Nos comprometemos a resolver cualquier incidencia en el menor tiempo posible.
              </p>
            </div>

            {/* Modificaciones */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">13. Modificacion de los terminos</h2>
              <p className="text-gray-600">
                Nos reservamos el derecho de modificar estos Terminos y Condiciones en cualquier momento. Los cambios entraran en vigor desde su publicacion en la web. Le recomendamos revisar periodicamente esta pagina.
              </p>
            </div>

            {/* Ley aplicable */}
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">14. Ley aplicable y jurisdiccion</h2>
              <p className="text-gray-600">
                Estos Terminos y Condiciones se rigen por la legislacion espanola. Para cualquier controversia derivada de la interpretacion o ejecucion de los mismos, ambas partes se someten a los Juzgados y Tribunales de Girona, salvo que la normativa de consumidores establezca otro fuero.
              </p>
            </div>

            {/* Contacto */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Contacto</h2>
              <p className="text-gray-600 mb-4">
                Para cualquier consulta sobre estos Terminos y Condiciones o sobre su pedido, puede contactarnos:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:info@lateleria.com" className="text-gray-900 hover:underline">info@lateleria.com</a></li>
                <li><strong>Direccion:</strong> Carrer Ciutadans, 17, 17004 Girona</li>
                <li><strong>Horario de atencion:</strong> Lunes a Viernes, 10:00 - 14:00 y 17:00 - 20:00</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
