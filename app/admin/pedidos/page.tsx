'use client'

import { useState } from 'react'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'

type EstadoPedido = 'fabricacion' | 'listo' | 'enviado'

interface Pedido {
  id: string
  cliente: string
  email: string
  productos: { nombre: string; cantidad: number }[]
  total: number
  estado: EstadoPedido
  guia?: string
}

const pedidosMock: Pedido[] = [
  { id: 'ABK-001', cliente: 'María González', email: 'maria.gonzalez@gmail.com', productos: [{ nombre: 'Ventana Corrediza', cantidad: 2 }, { nombre: 'Puerta de Entrada', cantidad: 1 }], total: 156500, estado: 'enviado', guia: '1234567890' },
  { id: 'ABK-002', cliente: 'Carlos Rodríguez', email: 'carlos.r@outlook.com', productos: [{ nombre: 'Ventana Proyectante', cantidad: 1 }], total: 48500, estado: 'fabricacion' },
  { id: 'ABK-003', cliente: 'Ana Martínez', email: 'anam@correo.com', productos: [{ nombre: 'Perfil U de 6 metros', cantidad: 5 }, { nombre: 'Ruedas para puerta', cantidad: 2 }], total: 89000, estado: 'listo' },
  { id: 'ABK-004', cliente: 'Pedro Sánchez', email: 'pedro.sanchez@yahoo.com', productos: [{ nombre: 'Marco para ventana PVC', cantidad: 1 }], total: 67800, estado: 'fabricacion' },
  { id: 'ABK-005', cliente: 'Laura Fernández', email: 'laura.fernandez@gmail.com', productos: [{ nombre: 'Puerta corrediza de patio', cantidad: 1 }, { nombre: 'Cerradura de seguridad', cantidad: 2 }], total: 123000, estado: 'enviado', guia: '9876543210' },
  { id: 'ABK-006', cliente: 'Jorge López', email: 'jlopez@hotmail.com', productos: [{ nombre: 'Ventana Fija', cantidad: 3 }], total: 95000, estado: 'fabricacion' },
  { id: 'ABK-007', cliente: 'Sofia Torres', email: 'sofia.torres@gmail.com', productos: [{ nombre: 'Perfil angular 20x20mm', cantidad: 10 }], total: 62000, estado: 'listo' },
  { id: 'ABK-008', cliente: 'Miguel Castro', email: 'miguel.c@correo.com', productos: [{ nombre: 'Burletes de goma', cantidad: 5 }], total: 22500, estado: 'fabricacion' },
]

const estadoConfig: Record<EstadoPedido, { label: string; variant: 'warning' | 'success' | 'default' }> = {
  fabricacion: { label: 'En fabricación', variant: 'warning' },
  listo: { label: 'Listo para retirar', variant: 'success' },
  enviado: { label: 'Enviado', variant: 'default' },
}

const ITEMS_POR_PAGINA = 8

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<EstadoPedido | 'todos'>('todos')
  const [paginaActual, setPaginaActual] = useState(1)
  const [guiaModal, setGuiaModal] = useState<{ pedidoId: string; numero: string } | null>(null)

  const guardarGuia = (id: string) => {
    if (guiaModal?.numero) {
      setGuiaModal(null)
    }
    setGuiaModal(null)
  }

  const pedidosFiltrados = pedidos.filter((p) => {
    const matchBusqueda =
      p.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.cliente.toLowerCase().includes(busqueda.toLowerCase())
    const matchEstado = filtroEstado === 'todos' || p.estado === filtroEstado
    return matchBusqueda && matchEstado
  })

  const totalPaginas = Math.ceil(pedidosFiltrados.length / ITEMS_POR_PAGINA)
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA
  const pedidosPagina = pedidosFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA)

  const estados: Array<{ key: EstadoPedido | 'todos'; label: string }> = [
    { key: 'todos', label: 'Todos' },
    { key: 'fabricacion', label: 'En fab.' },
    { key: 'listo', label: 'Listos' },
    { key: 'enviado', label: 'Enviados' },
  ]

  return (
    <div className="overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Gestión de Pedidos</h1>

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5 mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar pedido o cliente..."
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1) }}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1">
            {estados.map((estado) => (
              <button
                key={estado.key}
                onClick={() => { setFiltroEstado(estado.key); setPaginaActual(1) }}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap ${
                  filtroEstado === estado.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-muted hover:bg-gray-200'
                }`}
              >
                {estado.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {pedidosPagina.map((pedido) => {
          const config = estadoConfig[pedido.estado]
          return (
            <div key={pedido.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-bold text-primary text-sm sm:text-base">{pedido.id}</span>
                  <p className="text-sm sm:text-base font-medium text-foreground">{pedido.cliente}</p>
                  <p className="text-xs text-muted">{pedido.email}</p>
                </div>
                <Badge variant={config.variant}>{config.label}</Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm mb-3">
                <span className="text-muted">{pedido.productos.length} producto(s)</span>
                <span className="font-semibold text-foreground">${pedido.total.toLocaleString('es-AR')}</span>
                {pedido.guia && (
                  <span className="font-mono text-muted bg-gray-100 px-2 py-0.5 rounded">{pedido.guia}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={pedido.estado}
                  onChange={(e) => {
                    const newEstado = e.target.value as EstadoPedido
                    setPedidos((prev) =>
                      prev.map((p) => (p.id === pedido.id ? { ...p, estado: newEstado } : p))
                    )
                  }}
                  className="flex-1 text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white cursor-pointer"
                >
                  <option value="fabricacion">En Fabricación</option>
                  <option value="listo">Listo para Retirar</option>
                  <option value="enviado">Enviado</option>
                </select>
                <button
                  onClick={() => setGuiaModal({ pedidoId: pedido.id, numero: pedido.guia || '' })}
                  className="text-xs sm:text-sm text-primary hover:underline py-2"
                >
                  {pedido.guia ? 'Editar guía' : 'Cargar guía'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-3 mt-5 sm:mt-6">
          <button
            onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
            className="p-2 border border-border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-muted px-2">
            {paginaActual} / {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
            className="p-2 border border-border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {guiaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">Cargar número de guía</h3>
              <button onClick={() => setGuiaModal(null)} className="text-muted hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-muted mb-4">Pedido: <span className="font-bold text-primary">{guiaModal.pedidoId}</span></p>
            <input
              type="text"
              value={guiaModal.numero}
              onChange={(e) => setGuiaModal({ ...guiaModal, numero: e.target.value })}
              placeholder="Ej: 1234567890"
              className="w-full px-4 py-2.5 border border-border rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setGuiaModal(null)}
                className="flex-1 px-4 py-2.5 text-sm border border-border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => guardarGuia(guiaModal.pedidoId)}
                className="flex-1 px-4 py-2.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}