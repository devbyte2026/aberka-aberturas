'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Package } from 'lucide-react'

interface Props {
  nombre: string
  descripcion: string
  icono: string
  imagen: string
  href: string
}

export default function CategoryCard({ nombre, descripcion, icono, imagen, href }: Props) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-xl h-64 transition-transform duration-200 hover:scale-[1.02]"
    >
      <Image
        src={imagen}
        alt={nombre}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/40" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="mb-4 opacity-90 text-4xl">{icono}</div>
        <h3 className="text-2xl font-bold mb-2">{nombre}</h3>
        <p className="text-sm text-white/70">{descripcion}</p>
      </div>
    </Link>
  )
}