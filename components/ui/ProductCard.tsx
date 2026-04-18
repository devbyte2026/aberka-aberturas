'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Package, CheckCircle, XCircle } from 'lucide-react'

interface Props {
  id: string
  nombre: string
  precio: number
  stock: number
  imagen: string
  categoria: string
}

export default function ProductCard({ id, nombre, precio, stock, imagen, categoria }: Props) {
  return (
    <div className="group border rounded-xl overflow-hidden bg-white transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 shadow-card">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={imagen}
          alt={`Producto: ${nombre}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          {stock > 0 ? (
            <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              <CheckCircle size={12} />
              En stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              <XCircle size={12} />
              Sin stock
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted uppercase tracking-wide mb-1">{categoria}</p>
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{nombre}</h3>
        <p className="text-xl sm:text-2xl font-bold text-primary mb-4">
          ${precio.toLocaleString('es-AR')}
        </p>
        <Link
          href={`/producto/${id}`}
          className="inline-flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-200 active:scale-95 min-h-[44px]"
        >
          <Package size={16} />
          Ver detalle
        </Link>
      </div>
    </div>
  )
}