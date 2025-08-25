'use client'
import React, { useState } from 'react'
import Button from './Button'

const GetApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destino: '',
    fecha: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      const response = await fetch('/api/send-quote', {
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
          destino: '',
          fecha: ''
        });
        
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        alert(data.error || 'Error al enviar la solicitud');
      }
    } catch (error) {
      alert('Error al enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-8 -mb-20 pt-10 lg:pt-0 lg:mb-0 lg:ml-20">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[520px]">¿Listo para tu próxima aventura?</h2>
        </div>

        <div className="flex flex-1 items-center justify-end lg:mr-20">
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">
            <h3 className="bold-20 mb-6 text-center text-gray-900">Solicita tu cotización</h3>
            
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900 bg-white"
                required
              />
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900 bg-white"
                required
              />
              
              <div className="relative">
                <label htmlFor="destino" className="block text-sm font-medium text-gray-700 mb-2">Destino de interés</label>
                <select 
                  id="destino"
                  name="destino"
                  value={formData.destino}
                  onChange={handleChange}
                  className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900 bg-white w-full appearance-none cursor-pointer" 
                  required
                >
                  <option value="">Selecciona un destino</option>
                  <option value="Europa">Europa</option>
                  <option value="Asia">Asia</option>
                  <option value="América">América</option>
                  <option value="África">África</option>
                  <option value="Oceanía">Oceanía</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-2">Fecha de viaje</label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleChange}
                  className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-50 text-gray-900 bg-white w-full"
                  required
                />
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
                    Enviado
                  </>
                ) : isSubmitting ? (
                  "Enviando..."
                ) : (
                  "Enviar solicitud"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default GetApp