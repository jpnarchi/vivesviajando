'use client'
import React, { useState } from 'react'
import { Phone, Mail } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        alert(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 pb-10 max-container padding-container">
      <div className="flex flex-col lg:flex-row gap-16 items-start h-full pb-10">
        {/* Contact Information */}
        <div className="lg:w-1/2">
          <h1 className="bold-40 lg:bold-64 mb-8 text-gray-900">Contáctanos</h1>
          <p className="regular-18 mb-12 text-gray-600">
            ¿Tienes alguna pregunta sobre nuestros destinos o servicios? ¡Estamos aquí para ayudarte a planificar tu próxima aventura!
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="bold-18 text-gray-900 mb-2">Celular</h3>
                <p className="regular-16 text-gray-600">+34 912 345 678</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="bold-18 text-gray-900 mb-2">Correo</h3>
                <p className="regular-16 text-gray-600">travelxtravel2025@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-1/2">
          <div className="bg-white p-8 rounded-2xl shadow-lg border">
            <h2 className="bold-24 mb-6 text-center text-gray-900">Envíanos un mensaje</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="Cotización de viaje">Cotización de viaje</option>
                  <option value="Consulta sobre destinos">Consulta sobre destinos</option>
                  <option value="Modificar reserva">Modificar reserva</option>
                  <option value="Cancelación">Cancelación</option>
                  <option value="Reclamo o sugerencia">Reclamo o sugerencia</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900 resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full p-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-green-50 text-white hover:bg-green-90'
                }`}
              >
                {isSuccess ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Mensaje enviado
                  </>
                ) : isSubmitting ? (
                  "Enviando mensaje..."
                ) : (
                  "Enviar mensaje"
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Campos obligatorios
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage