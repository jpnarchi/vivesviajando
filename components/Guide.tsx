"use client"
import Image from 'next/image'
import Button from './Button'
import React from 'react'
import { useRouter } from 'next/navigation'

const Guide = () => {
  const router = useRouter()
  
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        {/* <Image src="/camp.svg" alt="camp" width={50} height={50} /> */}
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          Estamos aquí para ti
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Te Guiamos al Destino Perfecto</h2>
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className="regular-16 text-gray-30 xl:max-w-[520px]">Con Vives Viajando nunca más te sentirás perdido planificando tus vacaciones. Ofrecemos itinerarios personalizados y soporte completo. Invita a tus amigos y familia a vivir experiencias increíbles alrededor del mundo.</p>
            <div onClick={() => router.push('/cotizaciones')}>
              <Button 
                type="button" 
                title="Cotiza tu Viaje" 
                variant="btn_green" 
              />
            </div>
          </div>
        </div>

      </div>

      <div className="flexCenter max-container relative w-full">
        <Image 
          src="/santorini.avif"
          alt="santorini"
          width={1440}
          height={580}
          className="w-full object-cover object-center 2xl:rounded-5xl"
        />

        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <Image 
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className='flex w-full flex-col'>
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Destino</p>
                <p className="bold-16 text-green-50">5 días</p>
              </div>
              <p className="bold-20 mt-2">Santorini, Grecia</p>
            </div>

            <div className='flex w-full flex-col'>
              <p className="regular-16 text-gray-20">Salida desde</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">Madrid, España</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide