import Image from 'next/image'
import Link from 'next/link'
import { DESTINOS } from '@/constants'

export default function DestinosPage() {
  return (
    <section className="max-container padding-container py-20">
      <div className="text-center mb-12">
        <h1 className="bold-52 lg:bold-88 text-black">
          Nuestros Destinos
        </h1>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px] mx-auto">
          Encuentra tu viaje ideal. Descubre experiencias únicas en los destinos más increíbles del mundo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DESTINOS.map((destino) => (
          <Link 
            key={destino.slug} 
            href={`/destinos/${destino.slug}`}
            className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-105"
          >
            <div className="relative h-64 w-full">
              <Image
                src={destino.image}
                alt={destino.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-center font-bold text-lg px-4 drop-shadow-lg">
                  {destino.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}