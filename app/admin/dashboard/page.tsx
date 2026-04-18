'use client'

import Link from 'next/link'
import { DollarSign, TrendingUp, Package, Boxes } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Badge from '@/components/ui/Badge'

const kpis = [
  { label: 'Ventas hoy', valor: '$45.200', variacion: '+12%', icono: DollarSign, color: '#3B82F6' },
  { label: 'Ventas del mes', valor: '$892.500', variacion: '+8%', icono: TrendingUp, color: '#10B981' },
  { label: 'Pedidos activos', valor: '14', variacion: '', icono: Package, color: '#F59E0B' },
  { label: 'Productos en stock', valor: '87', variacion: '', icono: Boxes, color: '#8B5CF6' },
]

const datosVentas = [
  { dia: 'Lun', ventas: 45000 },
  { dia: 'Mar', ventas: 62000 },
  { dia: 'Mié', ventas: 38000 },
  { dia: 'Jue', ventas: 78000 },
  { dia: 'Vie', ventas: 95000 },
  { dia: 'Sáb', ventas: 42000 },
  { dia: 'Dom', ventas: 28000 },
]

const ultimosPedidos = [
  { id: 'ABK-001', cliente: 'María González', total: 156500, estado: 'enviado' },
  { id: 'ABK-002', cliente: 'Carlos Rodríguez', total: 48500, estado: 'fabricacion' },
  { id: 'ABK-003', cliente: 'Ana Martínez', total: 89000, estado: 'listo' },
  { id: 'ABK-004', cliente: 'Pedro Sánchez', total: 67800, estado: 'fabricacion' },
  { id: 'ABK-005', cliente: 'Laura Fernández', total: 123000, estado: 'enviado' },
]

const estadoConfig = {
  fabricacion: { label: 'En fabricación', variant: 'warning' as const },
  listo: { label: 'Listo', variant: 'success' as const },
  enviado: { label: 'Enviado', variant: 'default' as const },
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-primary">${payload[0].value.toLocaleString('es-AR')}</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <div className="overflow-x-hidden">
      <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-xl p-4 sm:p-5 border-l-4 shadow-sm"
            style={{ borderLeftColor: kpi.color }}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <kpi.icono size={20} className="sm:w-6 sm:h-6" style={{ color: kpi.color }} />
              {kpi.variacion && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  {kpi.variacion}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-muted mb-0.5 sm:mb-1">{kpi.label}</p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{kpi.valor}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-4 sm:mb-6 lg:mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Ventas de la semana</h2>
        <div className="h-48 sm:h-64 lg:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datosVentas}>
              <XAxis dataKey="dia" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="ventas" fill="#2C3E6B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Últimos pedidos</h2>
          <Link
            href="/admin/pedidos"
            className="text-xs sm:text-sm text-primary hover:underline font-medium"
          >
            Ver todos →
          </Link>
        </div>
        <div className="divide-y divide-border">
          {ultimosPedidos.map((pedido) => {
            const config = estadoConfig[pedido.estado as keyof typeof estadoConfig]
            return (
              <div key={pedido.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-primary text-sm sm:text-base">{pedido.id}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{pedido.cliente}</p>
                    <p className="text-xs sm:text-sm text-muted">${pedido.total.toLocaleString('es-AR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={config.variant}>{config.label}</Badge>
                  <Link
                    href="/admin/pedidos"
                    className="text-xs sm:text-sm text-primary hover:underline"
                  >
                    Ver
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}