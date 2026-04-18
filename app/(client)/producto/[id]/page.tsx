import { productos } from '@/lib/mockData'
import { Producto } from '@/types'
import ProductoClient from './ProductoClient'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const producto = productos.find((p: Producto) => p.id === id)

  if (!producto) {
    return {
      title: 'Producto no encontrado | Aberka Aberturas',
    }
  }

  return {
    title: `${producto.nombre} | Aberka Aberturas`,
    description: producto.descripcion,
    openGraph: {
      title: producto.nombre,
      description: producto.descripcion,
      images: producto.imagenes,
    },
  }
}

export default async function ProductoPage({ params }: PageProps) {
  const { id } = await params
  return <ProductoClient id={id} />
}