import React from 'react'
import Button from './Button'

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className="z-20 flex w-full flex-1 flex-col items-start justify-center gap-8">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[520px]">¿Listo para tu próxima aventura?</h2>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border">
            <h3 className="bold-20 mb-6 text-center text-gray-900">Solicita tu cotización</h3>
            
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
              
              <input
                type="email"
                placeholder="Correo electrónico"
                className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
              
              <select className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500" required>
                <option value="">Destino de interés</option>
                <option value="europa">Europa</option>
                <option value="asia">Asia</option>
                <option value="america">América</option>
                <option value="africa">África</option>
                <option value="oceania">Oceanía</option>
              </select>
              
              <input
                type="date"
                placeholder="Fecha de viaje"
                className="regular-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                required
              />
              
              <Button 
                type="submit"
                title="Enviar solicitud"
                variant="btn_green"
                full
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default GetApp