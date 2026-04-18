'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { productos } from '@/lib/mockData'
import { Producto } from '@/types'

const featuredProducts = productos.slice(0, 6)

export function FeaturedCarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const prev = () => setCurrent((c) => (c === 0 ? featuredProducts.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === featuredProducts.length - 1 ? 0 : c + 1))

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => next(), 5000)
    return () => clearInterval(interval)
  }, [isHovered])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)

  return (
    <section className="py-8 sm:py-10 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">
            Productos destacados
          </h2>
          <p className="text-muted text-xs sm:text-sm max-w-xl mx-auto">
            Conocé nuestra selección de productos más requeridos
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {featuredProducts.map((product: Producto) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <Link
                    href={`/producto/${product.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-accent/20">
                      <Image
                        src={product.imagenes[0]}
                        alt={product.nombre}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.stock === 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          Sin stock
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-primary text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-lg">
                        {formatPrice(product.precio)}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-foreground text-xs sm:text-sm mb-0.5 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.nombre}
                      </h3>
                      <p className="text-xs text-muted capitalize">{product.categoria}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted/70 bg-accent/30 px-1.5 py-0.5 rounded">
                          {product.color}
                        </span>
                        <span className="text-xs text-primary font-medium group-hover:underline">
                          Ver →
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 hover:bg-white shadow-md rounded-full flex items-center justify-center text-primary hover:scale-105 transition-all z-10"
            aria-label="Producto anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 bg-white/95 hover:bg-white shadow-md rounded-full flex items-center justify-center text-primary hover:scale-105 transition-all z-10"
            aria-label="Siguiente producto"
          >
            <ChevronRight size={18} />
          </button>

          <div className="flex justify-center gap-1.5 mt-3">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  current === index ? 'bg-primary w-4' : 'bg-primary/40'
                }`}
                aria-label={`Ir al producto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 text-xs sm:text-sm"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  )
}