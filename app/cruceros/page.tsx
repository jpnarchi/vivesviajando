import Image from 'next/image'
import GetApp from '@/components/GetApp'

export default function CrucerosPage() {
  return (
    <>
      <section className="max-container padding-container py-20">
        <div className="text-center mb-12">
          <p className="regular-16 text-green-50 mb-4">Experiencias</p>
          <h1 className="bold-32 lg:bold-64 text-black mb-16">
            Encuentra tu crucero ideal
          </h1>
        </div>

        <div className="flex justify-center mb-16">
          <Image
            src="/naviers.jpeg"
            alt="Cruceros"
            width={800}
            height={500}
            className="rounded-2xl shadow-2xl shadow-green-50/30"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="bold-32 lg:bold-40 text-green-50">+ 15,000</h3>
            <p className="regular-16 text-gray-30">Clientes Satisfechos</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="bold-32 lg:bold-40 text-green-50">+ 80</h3>
            <p className="regular-16 text-gray-30">Países Visitados</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="bold-32 lg:bold-40 text-green-50">+ 250</h3>
            <p className="regular-16 text-gray-30">Destinos</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="bold-32 lg:bold-40 text-green-50">+ 140</h3>
            <p className="regular-16 text-gray-30">Reconocimientos</p>
          </div>
        </div>
      </section>
      
      <GetApp />
    </>
  )
}