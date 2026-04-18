'use client'

import { useState } from 'react'
import { Search, Check, MapPin, Mail, MessageCircle, Package, ClipboardCheck, Truck } from 'lucide-react'
import { pedidos } from '@/lib/mockData'
import { Pedido } from '@/types'
import type { Metadata } from 'next'

type EstadoPedido = 'fabricacion' | 'listo' | 'enviado'

const pasos = [
  { key: 'fabricacion', label: 'En Fabricación', icono: Package },
  { key: 'listo', label: 'Listo para retirar', icono: ClipboardCheck },
  { key: 'enviado', label: 'Enviado', icono: Truck },
]

function Timeline({ estado }: { estado: EstadoPedido }) {
  const estadoOrden: EstadoPedido[] = ['fabricacion', 'listo', 'enviado']
  const estadoActual = estadoOrden.indexOf(estado)

  return (
    <div className="flex items-center justify-center py-8">
      {pasos.map((paso, index) => {
        const pasoIndex = estadoOrden.indexOf(paso.key as EstadoPedido)
        const completado = pasoIndex <= estadoActual
        const activo = pasoIndex === estadoActual

        return (
          <div key={paso.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
                  completado
                    ? 'bg-primary text-white animate-scale-in'
                    : activo
                    ? 'border-2 border-primary bg-primary/10'
                    : 'border-2 border-gray-300'
                }`}
              >
                {completado ? (
                  <Check size={24} aria-hidden="true" />
                ) : (
                  <paso.icono size={24} className={activo ? 'text-primary' : 'text-gray-400'} aria-hidden="true" />
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium transition-colors ${
                  completado || activo ? 'text-foreground' : 'text-muted'
                }`}
              >
                {paso.label}
              </span>
            </div>

            {index < pasos.length - 1 && (
              <div
                className={`w-16 sm:w-20 h-1 mx-2 transition-colors duration-500 ${
                  pasoIndex < estadoActual ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function SeguimientoPage() {
  const [numeroPedido, setNumeroPedido] = useState('')
  const [pedidoEncontrado, setPedidoEncontrado] = useState<Pedido | null>(null)
  const [noEncontrado, setNoEncontrado] = useState(false)
  const [busquedaRealizada, setBusquedaRealizada] = useState(false)

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493794000000'

  const buscarPedido = () => {
    if (!numeroPedido.trim()) return
    setBusquedaRealizada(true)
    const pedido = pedidos.find((p: Pedido) => p.id.toUpperCase() === numeroPedido.toUpperCase())
    if (pedido) {
      setPedidoEncontrado(pedido)
      setNoEncontrado(false)
    } else {
      setPedidoEncontrado(null)
      setNoEncontrado(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-2">
          Seguí tu pedido
        </h1>
        <p className="text-muted text-center mb-8">
          Ingresá el número que recibiste por email o WhatsApp
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={numeroPedido}
            onChange={(e) => setNumeroPedido(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarPedido()}
            placeholder="Ej: ABK-001"
            className="flex-1 px-5 py-3 sm:py-4 text-base sm:text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[48px]"
            aria-label="Número de pedido"
          />
          <button
            onClick={buscarPedido}
            className="px-6 py-3 sm:py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[48px]"
          >
            <Search size={20} aria-hidden="true" />
            <span>Buscar pedido</span>
          </button>
        </div>

        {noEncontrado && busquedaRealizada && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-2 font-medium">Pedido no encontrado</p>
            <p className="text-muted text-sm">Verificá el número e intentá nuevamente. Probá con ABK-001, ABK-002 o ABK-003.</p>
          </div>
        )}

        {pedidoEncontrado && (
          <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
            <div className="text-center mb-6">
              <p className="text-sm text-muted mb-1">Pedido</p>
              <p className="text-2xl font-bold text-primary">{pedidoEncontrado.id}</p>
            </div>

            <Timeline estado={pedidoEncontrado.estado} />

            <div className="border-t border-border mt-6 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted mb-1">Total del pedido</p>
                  <p className="text-xl font-bold text-foreground">
                    ${pedidoEncontrado.total.toLocaleString('es-AR')}
                  </p>
                </div>
                <div className="bg-accent/20 rounded-lg p-4">
                  <p className="text-sm text-muted mb-1">Productos</p>
                  <p className="text-xl font-bold text-foreground">
                    {pedidoEncontrado.productos.length} item(s)
                  </p>
                </div>
              </div>

              {pedidoEncontrado.guia && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted">Número de guía</p>
                      <p className="font-semibold text-foreground">{pedidoEncontrado.guia}</p>
                    </div>
                    <a
                      href={`https://www.google.com/search?q=tracking+${pedidoEncontrado.guia}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline text-sm"
                    >
                      <MapPin size={14} aria-hidden="true" />
                      Rastrear envío
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-muted text-sm">
                  <Mail size={16} aria-hidden="true" />
                  <span>{pedidoEncontrado.email}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola! Quiero consultar por mi pedido ${pedidoEncontrado.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 sm:py-4 border-2 border-green-500 text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors min-h-[48px]"
              >
                <MessageCircle size={20} aria-hidden="true" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}