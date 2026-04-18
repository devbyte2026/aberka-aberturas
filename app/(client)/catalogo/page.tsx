import type { Metadata } from 'next'
import CatalogoClient from './CatalogoClient'

export const metadata: Metadata = {
  title: 'Catálogo | Aberka Aberturas',
  description: 'Explorá nuestro catálogo de aberturas: ventanas, puertas, perfiles de aluminio y accesorios de alta calidad.',
}

export default function CatalogoPage() {
  return <CatalogoClient />
}