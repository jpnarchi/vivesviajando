import Image from 'next/image'
import Link from 'next/link'
import { DESTINOS } from '@/constants'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default function DestinoPage({ params }: PageProps) {
  const destino = DESTINOS.find(d => d.slug === params.slug)
  
  if (!destino) {
    notFound()
  }

  return (
    <section className="max-container padding-container py-20">
      <Link 
        href="/destinos" 
        className="inline-flex items-center mb-8 text-green-50 hover:text-green-90 transition-colors"
      >
        ← Volver a destinos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative h-96 lg:h-[500px] w-full rounded-xl overflow-hidden">
          <Image
            src={destino.image}
            alt={destino.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="bold-40 lg:bold-64 text-black mb-6">
            {destino.name}
          </h1>
          
          <p className="regular-16 text-gray-30 mb-8 leading-relaxed">
            Descubre la magia de {destino.name}. Un destino único que te ofrecerá experiencias inolvidables 
            y paisajes espectaculares. Nuestros expertos han diseñado itinerarios especiales para que 
            vivas cada momento al máximo.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="bold-20 text-black mb-3">Experiencias destacadas</h3>
              <ul className="space-y-2 text-gray-30">
                <li>• Tours guiados con expertos locales</li>
                <li>• Actividades culturales auténticas</li>
                <li>• Gastronomía local y internacional</li>
                <li>• Alojamientos de lujo seleccionados</li>
              </ul>
            </div>

            <div>
              <h3 className="bold-20 text-black mb-3">Mejor época para viajar</h3>
              <p className="text-gray-30">
                Todo el año, con condiciones especialmente favorables durante los meses de temporada alta.
              </p>
            </div>

            <div className="pt-6">
              <button className="bg-green-50 text-white px-8 py-3 rounded-full hover:bg-green-90 transition-colors font-medium">
                Solicitar información
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="bold-32 text-black mb-8 text-center">Otros destinos que te pueden interesar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESTINOS.filter(d => d.slug !== params.slug).slice(0, 3).map((otroDestino) => (
            <Link 
              key={otroDestino.slug} 
              href={`/destinos/${otroDestino.slug}`}
              className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={otroDestino.image}
                  alt={otroDestino.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-center font-bold text-lg px-4 drop-shadow-lg">
                    {otroDestino.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  return DESTINOS.map((destino) => ({
    slug: destino.slug,
  }))
}