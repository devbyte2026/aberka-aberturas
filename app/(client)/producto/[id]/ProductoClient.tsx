'use client'

import { useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Minus, Plus, MessageCircle, CheckCircle, XCircle, ShoppingCart } from 'lucide-react'
import { productos } from '@/lib/mockData'
import { useCarrito } from '@/lib/CartContext'
import ProductCard from '@/components/ui/ProductCard'
import Badge from '@/components/ui/Badge'
import { Producto } from '@/types'

interface ProductoClientProps {
  id: string
}

export default function ProductoClient({ id }: ProductoClientProps) {
  const router = useRouter()
  const { agregar } = useCarrito()
  const producto = productos.find((p: Producto) => p.id === id)

  const [imagenActiva, setImagenActiva] = useState(0)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  if (!producto) {
    router.replace('/catalogo')
    return null
  }

  const relacionados = producto.relacionados
    ? productos.filter((p: Producto) => producto.relacionados?.includes(p.id)).slice(0, 4)
    : []

  const incrementar = () => setCantidad((c) => Math.min(c + 1, producto.stock))
  const decrementar = () => setCantidad((c) => Math.max(1, c - 1))

  const handleAgregarAlCarrito = () => {
    agregar(producto, cantidad)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493794000000'}?text=${encodeURIComponent(`Hola! Quiero consultar por ${producto.nombre}`)}`

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-6 transition-colors"
          aria-label="Volver al catálogo"
        >
          <ChevronLeft size={20} />
          <span>Volver al catálogo</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12 lg:mb-16">
          <div>
            <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4 cursor-zoom-in">
              <Image
                src={producto.imagenes[imagenActiva] || producto.imagenes[0]}
                alt={`Producto: ${producto.nombre}`}
                fill
                className="object-cover"
              />
            </div>
            {producto.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {producto.imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagenActiva(idx)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      imagenActiva === idx ? 'border-primary' : 'border-transparent hover:border-border'
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${producto.nombre} - imagen ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="default">{producto.categoria}</Badge>
              <Badge variant={producto.material === 'aluminio' ? 'success' : 'warning'}>{producto.material}</Badge>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{producto.nombre}</h1>

            <p className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              ${producto.precio.toLocaleString('es-AR')}
            </p>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {producto.stock > 0 ? (
                <>
                  <CheckCircle size={18} className="text-green-500" aria-hidden="true" />
                  <span className="text-muted">{producto.stock} unidades disponibles</span>
                  <Badge variant="success">En stock</Badge>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-red-500" aria-hidden="true" />
                  <span className="text-muted">Sin stock</span>
                  <Badge variant="danger">Agotado</Badge>
                </>
              )}
            </div>

            <p className="text-muted mb-6 leading-relaxed">{producto.descripcion}</p>

            <div className="border-t border-border pt-6 mb-6">
              <p className="text-sm text-muted mb-3">
                Color: <span className="text-foreground font-medium">{producto.color}</span>
              </p>

              {producto.stock > 0 && (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm text-muted">Cantidad:</span>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={decrementar}
                        disabled={cantidad <= 1}
                        className="p-2.5 hover:bg-accent/30 transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Reducir cantidad"
                      >
                        <Minus size={18} />
                      </button>
                      <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(Math.min(Number(e.target.value), producto.stock))}
                        className="w-14 sm:w-16 text-center py-2.5 border-x border-border"
                        min={1}
                        max={producto.stock}
                        aria-label="Cantidad"
                      />
                      <button
                        onClick={incrementar}
                        disabled={cantidad >= producto.stock}
                        className="p-2.5 hover:bg-accent/30 transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAgregarAlCarrito}
                    className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 mb-3 min-h-[48px] active:scale-95 ${
                      agregado ? 'bg-green-500 text-white' : 'bg-primary hover:bg-primary-hover text-white'
                    }`}
                  >
                    <ShoppingCart size={20} aria-hidden="true" />
                    {agregado ? '¡Agregado al carrito!' : 'Agregar al carrito'}
                  </button>
                </>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 sm:py-4 border-2 border-green-500 text-green-600 hover:bg-green-50 text-base sm:text-lg font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[48px] active:scale-95"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">También te puede interesar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relacionados.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id}
                  nombre={prod.nombre}
                  precio={prod.precio}
                  stock={prod.stock}
                  imagen={prod.imagenes[0]}
                  categoria={prod.categoria}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}