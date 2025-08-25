"use client"
import Image from 'next/image'
import Button from './Button'
import { useRouter } from 'next/navigation'

const Hero = () => {
  const router = useRouter()
  
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="hero-map" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <h1 className="bold-52 lg:bold-88">Tu Próximo Viaje Ahora</h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px]">
          Queremos acompañarte en cada viaje, descubriendo la belleza incomparable del mundo. Te ayudamos a planificar aventuras extraordinarias en cualquier destino con nuestra plataforma integral.
        </p>

        {/* <div className="my-11 flex flex-wrap gap-5">
          <div className="flex items-center gap-2">
            {Array(5).fill(1).map((_, index) => (
              <Image 
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div>

          <p className="bold-16 lg:bold-20 text-blue-70">
            120+
            <span className="regular-16 lg:regular-20 ml-1">Reseñas Excelentes</span>
          </p>
        </div> */}

        <div className="flex flex-col w-full gap-6 pt-10 sm:flex-row">
          <div onClick={() => router.push('/cotizaciones')}>
            <Button 
              type="button" 
              title="Planifica tu Viaje" 
              variant="btn_green" 
            />
          </div>
          <div onClick={() => router.push('/contacto')}>
            <Button 
              type="button" 
              title="Contáctanos" 
              variant="btn_white_blue" 
            />
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-start">
        <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">

           <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Destino</p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-white">Machu Picchu</p>
          </div>

          <div className="flexBetween">
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Duración</p>
              <p className="bold-20 text-white">7 días</p>
            </div>
            <div className="flex flex-col">
              <p className="regular-16 block text-gray-20">Precio</p>
              <p className="bold-20 text-white">$1,200</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero