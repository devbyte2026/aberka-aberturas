'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCarrito } from '@/lib/CartContext'

export default function CarritoPage() {
  const { state, quitar, cambiarCantidad, vaciar } = useCarrito()
  const { items, total } = state

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493794000000'
  const whatsappMensaje = `Hola! Quiero consultar el flete de mi pedido. Items: ${items.map(i => `${i.producto.nombre} x${i.cantidad}`).join(', ')}`
  const mpUrl = process.env.NEXT_PUBLIC_MP_CHECKOUT_URL || 'https://www.mercadopago.com.ar'

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={80} className="mx-auto text-muted mb-6" />
          <h1 className="text-2xl font-bold text-foreground mb-3">Tu carrito está vacío</h1>
          <p className="text-muted mb-6">Agregá productos desde nuestro catálogo para comenzar.</p>
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors min-h-[44px]"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Mi Carrito</h1>
          <button
            onClick={vaciar}
            className="text-sm text-red-500 hover:underline"
            aria-label="Vaciar carrito"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="border border-border rounded-xl overflow-hidden">
              {items.map((item, index) => (
                <div key={item.producto.id}>
                  <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.producto.imagenes[0]}
                        alt={`Producto: ${item.producto.nombre}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted uppercase tracking-wide mb-1">
                        {item.producto.categoria}
                      </p>
                      <h3 className="font-semibold text-foreground mb-1 truncate text-sm sm:text-base">
                        {item.producto.nombre}
                      </h3>
                      <p className="text-sm text-muted mb-3">
                        ${item.producto.precio.toLocaleString('es-AR')} c/u
                      </p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => cambiarCantidad(item.producto.id, item.cantidad - 1)}
                            className="p-2 hover:bg-accent/30 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                            aria-label="Reducir cantidad"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 sm:w-12 text-center text-sm">{item.cantidad}</span>
                          <button
                            onClick={() => cambiarCantidad(item.producto.id, item.cantidad + 1)}
                            disabled={item.cantidad >= item.producto.stock}
                            className="p-2 hover:bg-accent/30 transition-colors disabled:opacity-50 min-h-[40px] min-w-[40px] flex items-center justify-center"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                          <span className="font-semibold text-primary text-sm sm:text-base">
                            ${(item.producto.precio * item.cantidad).toLocaleString('es-AR')}
                          </span>
                          <button
                            onClick={() => quitar(item.producto.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label={`Eliminar ${item.producto.nombre}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < items.length - 1 && <div className="border-t border-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[40%] order-first lg:order-last mb-6 lg:mb-0">
            <div className="bg-accent/20 rounded-xl p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Resumen del pedido</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal ({items.length} productos)</span>
                  <span className="text-foreground">${total.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Envío</span>
                  <span className="text-foreground">A coordinar según destino</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-foreground">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-primary">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              <a
                href={mpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 sm:py-3.5 bg-primary hover:bg-primary-hover text-white text-center font-semibold rounded-xl transition-all duration-200 active:scale-95 mb-3 min-h-[44px] flex items-center justify-center"
              >
                Finalizar compra
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMensaje)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 sm:py-3.5 border-2 border-green-500 text-green-600 text-center font-semibold rounded-xl hover:bg-green-50 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Consultar flete por WhatsApp
              </a>

              <p className="text-xs text-muted text-center mt-4">
                Pagá en cuotas con Mercado Pago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}