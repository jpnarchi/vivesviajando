import type { Metadata } from 'next';

import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Viaje x Viaje',
  description: 'Viaje x Viaje - Descubre destinos increíbles y vive experiencias únicas con nuestra agencia de viajes',
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Viaje x Viaje',
    description: 'Viaje x Viaje - Descubre destinos increíbles y vive experiencias únicas con nuestra agencia de viajes',
    images: ['/img-2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viaje x Viaje',
    description: 'Viaje x Viaje - Descubre destinos increíbles y vive experiencias únicas con nuestra agencia de viajes',
    images: ['/img-2.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>
        <Navbar />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
