import type { Metadata } from 'next';

import './globals.css'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Vives Viajando',
  description: 'Vives Viajando - Descubre destinos increíbles y vive experiencias únicas con nuestra agencia de viajes',
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
    type: 'website',
    url: 'https://vivesviajando.com',
    title: 'Vives Viajando',
    description: 'Vives Viajando - Descubre destinos increíbles y vive experiencias únicas con nuestra agencia de viajes',
    images: [
      {
        url: 'https://vivesviajando.com/img-2.png',
        width: 1200,
        height: 630,
        alt: 'Vives Viajando - Agencia de viajes',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your-twitter',
    title: 'Vives Viajando',
    description: 'Vives Viajando - Descubre destinos increíbles y vive experiencias únicas con nuestra agencia de viajes',
    images: ['https://vivesviajando.com/img-2.png'],
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
