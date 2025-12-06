'use client'

import { useState } from 'react'
import Header from '@/components/Header'

interface ContactFormData {
  nombre: string
  email: string
  asunto: string
  mensaje: string
}

const initialFormData: ContactFormData = {
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
}

export default function ContactoPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const form = e.currentTarget
      const formDataToSend = new FormData(form)

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend as unknown as Record<string, string>).toString()
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData(initialFormData)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-center text-gray-900 mb-4">
            Contacto
          </h1>
          <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. No dudes en contactarnos.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6">Información de contacto</h2>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">Carrer Ciutadans, 17</p>
                    <p className="text-gray-600">17004 Girona</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@lateleria.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                      info@lateleria.com
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Horario</h3>
                    <div className="text-gray-600 space-y-1">
                      <p><span className="font-medium">Lunes:</span> 17:00 - 20:00</p>
                      <p><span className="font-medium">Martes - Viernes:</span> 10:30 - 13:30 y 17:00 - 20:00</p>
                      <p><span className="font-medium">Sábado:</span> 11:00 - 14:00</p>
                      <p><span className="font-medium">Domingo:</span> Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Envíanos un mensaje</h2>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700">¡Mensaje enviado correctamente! Te responderemos pronto.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700">Error al enviar el mensaje. Por favor, inténtalo de nuevo.</p>
                  </div>
                </div>
              )}

              <form
                name="contacto"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contacto" />
                <p className="hidden">
                  <label>
                    No rellenar: <input name="bot-field" />
                  </label>
                </p>

                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Asunto */}
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors"
                    placeholder="Asunto del mensaje"
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition-colors resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>
              </form>
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
