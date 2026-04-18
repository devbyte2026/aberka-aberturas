import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CarritoProvider } from '@/lib/CartContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2C3E6B',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://aberka-aberturas.com'),
  title: {
    default: 'Aberka Aberturas | Ventanas, Puertas y Perfiles de Aluminio',
    template: '%s | Aberka Aberturas',
  },
  description: 'Venta de aberturas de aluminio y PVC de alta calidad. Ventanas, puertas, perfiles y accesorios con garantía y envío a todo el país.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://aberka-aberturas.com',
    siteName: 'Aberka Aberturas',
    title: 'Aberka Aberturas | Ventanas, Puertas y Perfiles de Aluminio',
    description: 'Venta de aberturas de aluminio y PVC de alta calidad. Ventanas, puertas, perfiles y accesorios con garantía y envío a todo el país.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.variable + ' font-sans bg-background text-foreground antialiased'}>
        <CarritoProvider>
          {children}
        </CarritoProvider>
      </body>
    </html>
  )
}