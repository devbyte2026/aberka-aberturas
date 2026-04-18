'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const ventasMensuales = [
  { mes: 'Ene', ventas: 450000 },
  { mes: 'Feb', ventas: 520000 },
  { mes: 'Mar', ventas: 480000 },
  { mes: 'Abr', ventas: 610000 },
  { mes: 'May', ventas: 550000 },
  { mes: 'Jun', ventas: 720000 },
]

const categoriaData = [
  { name: 'Ventanas', value: 35, color: '#2C3E6B' },
  { name: 'Puertas', value: 25, color: '#4B5563' },
  { name: 'Perfiles', value: 25, color: '#6B7280' },
  { name: 'Accesorios', value: 15, color: '#9CA3AF' },
]

const kpis = [
  { label: 'Ventas del mes', valor: '$720.000', variacion: '+15%', color: '#10B981' },
  { label: 'Pedidos completados', valor: '42', variacion: '+8', color: '#3B82F6' },
  { label: 'Ticket promedio', valor: '$17.140', variacion: '+5%', color: '#8B5CF6' },
  { label: 'Clientes nuevos', valor: '12', variacion: '+3', color: '#F59E0B' },
]

export default function ReportesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Reportes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-sm border-l-4" style={{ borderLeftColor: kpi.color }}>
            <p className="text-sm text-muted mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-foreground">{kpi.valor}</p>
            <p className="text-xs font-medium mt-1" style={{ color: kpi.color }}>{kpi.variacion} vs mes anterior</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ventas mensuales</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ventasMensuales}>
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString('es-AR')}`, 'Ventas']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }}
              />
              <Bar dataKey="ventas" fill="#2C3E6B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Ventas por categoría</h2>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie
                  data={categoriaData}
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoriaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {categoriaData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm text-muted">{cat.name}</span>
                  <span className="text-sm font-semibold text-foreground ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}