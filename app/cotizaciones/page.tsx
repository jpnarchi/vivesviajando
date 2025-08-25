'use client'
import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, User, MapPin, Heart } from 'lucide-react'

const CotizacionesPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    // Paso 1: Datos Personales
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    numeroViajeros: '2',
    
    // Paso 2: Lugar de Salida
    paisOrigen: '',
    ciudadOrigen: '',
    aeropuertoPreferido: '',
    fechaIda: '',
    fechaVuelta: '',
    flexibilidadFechas: false,
    
    // Paso 3: Información del Viaje
    tipoViaje: '',
    presupuestoAproximado: '',
    destinosInteres: [],
    actividades: [],
    tipoAlojamiento: '',
    comentarios: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCheckboxArrayChange = (name: string, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value]
      
      return {
        ...prev,
        [name]: newArray
      }
    })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setIsSuccess(false)
          setCurrentStep(1)
          setFormData({
            nombre: '', apellidos: '', email: '', telefono: '', fechaNacimiento: '', numeroViajeros: '2',
            paisOrigen: '', ciudadOrigen: '', aeropuertoPreferido: '', fechaIda: '', fechaVuelta: '', flexibilidadFechas: false,
            tipoViaje: '', presupuestoAproximado: '', destinosInteres: [], actividades: [], tipoAlojamiento: '', comentarios: ''
          })
        }, 3000)
      } else {
        alert(data.error || 'Error al enviar la cotización')
      }
    } catch (error) {
      alert('Error al enviar la cotización. Inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center font-semibold ${
              step <= currentStep ? 'text-white' : 'bg-gray-200 text-gray-500'
            }`} style={step <= currentStep ? {backgroundColor: '#003D66'} : {}}>
              {step === 1 && <User className="w-4 h-4 lg:w-6 lg:h-6" />}
              {step === 2 && <MapPin className="w-4 h-4 lg:w-6 lg:h-6" />}
              {step === 3 && <Heart className="w-4 h-4 lg:w-6 lg:h-6" />}
            </div>
            <span className={`text-xs mt-2 font-bold text-center max-w-[80px] lg:max-w-none ${
              step <= currentStep ? 'text-white' : 'text-gray-500'
            }`}>
              {step === 1 && 'Datos Personales'}
              {step === 2 && 'Lugar de Salida'}
              {step === 3 && 'Info del Viaje'}
            </span>
          </div>
          {step < 3 && (
            <div className={`w-8 h-1 lg:w-16 mx-2 lg:mx-4 mt-[-20px] ${
              step < currentStep ? 'bg-gray-400' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-4 lg:space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Apellidos *</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            placeholder="Tus apellidos"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            placeholder="tu@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Teléfono *</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            placeholder="+34 123 456 789"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Número de viajeros *</label>
        <select
          name="numeroViajeros"
          value={formData.numeroViajeros}
          onChange={handleChange}
          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
          required
        >
          {[1,2,3,4,5,6,7,8,9,10].map(num => (
            <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
          ))}
        </select>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4 lg:space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">País de origen *</label>
          <input
            type="text"
            name="paisOrigen"
            value={formData.paisOrigen}
            onChange={handleChange}
            placeholder="ej. España, México, Argentina"
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Ciudad de origen *</label>
          <input
            type="text"
            name="ciudadOrigen"
            value={formData.ciudadOrigen}
            onChange={handleChange}
            placeholder="ej. Madrid, Ciudad de México"
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Aeropuerto preferido</label>
        <input
          type="text"
          name="aeropuertoPreferido"
          value={formData.aeropuertoPreferido}
          onChange={handleChange}
          placeholder="ej. Madrid-Barajas, Barcelona-El Prat"
          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">Fecha de ida *</label>
          <input
            type="date"
            name="fechaIda"
            value={formData.fechaIda}
            onChange={handleChange}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-2">Fecha de vuelta *</label>
          <input
            type="date"
            name="fechaVuelta"
            value={formData.fechaVuelta}
            onChange={handleChange}
            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
            required
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="flexibilidadFechas"
          name="flexibilidadFechas"
          checked={formData.flexibilidadFechas}
          onChange={handleChange}
          className="mr-3 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="flexibilidadFechas" className="text-sm text-white">
          Tengo flexibilidad en las fechas (+/- 3 días)
        </label>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4 lg:space-y-6">

      <div>
        <label className="block text-sm font-medium text-white mb-2">Idea de viaje</label>
        <p className="text-xs text-gray-300 mb-2">Escribe una breve idea muy general sobre la idea que tienes en mente de tu viaje; es decir, necesitamos conocer los destinos por los cuales describe tu idea de viaje y/o ciudad a conocer</p>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={handleChange}
          rows={4}
          placeholder="Describe tu idea de viaje ideal..."
          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 resize-none text-base"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-2">Presupuesto estimado (USD) *</label>
        <p className="text-xs text-gray-300 mb-2">Escribe un estimado en USD que tengas destinado para este viaje. Un presupuesto 'sin' incluir los gastos personales, es decir, sólo para servicios de viaje como lo es: avión, hotel y/o barco, traslados y tours.</p>
        <input
          type="text"
          name="presupuestoAproximado"
          value={formData.presupuestoAproximado}
          onChange={handleChange}
          placeholder="Ejemplo: $5,000 USD"
          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 text-base"
          required
        />
      </div>
    </div>
  )

  return (
    <section className="min-h-screen pt-16 lg:pt-20 pb-10 max-container padding-container bg-[#003D66] mb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="bold-32 lg:bold-64 mb-4 text-white text-xl lg:text-2xl">Solicita tu Cotización</h1>
          <p className="regular-16 lg:regular-18 text-white px-4">
            Completa este formulario y te enviaremos una propuesta personalizada para tu viaje soñado
          </p>
        </div>

        {renderStepIndicator()}

        <div className="w-full rounded-2xl p-4 lg:p-8" style={{backgroundColor: '#003D66'}}>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0 mt-6 lg:mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-4 lg:px-6 py-3 rounded-lg font-semibold transition-all w-full lg:w-auto justify-center ${
                  currentStep === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <span className="text-sm text-white order-first lg:order-none">
                Paso {currentStep} de 3
              </span>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-4 lg:px-6 py-3 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-100 transition-all w-full lg:w-auto justify-center"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 lg:px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 w-full lg:w-auto ${
                    isSuccess 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-blue-500 hover:bg-gray-100'
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
                    "Enviando cotización..."
                  ) : (
                    "Enviar cotización"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CotizacionesPage