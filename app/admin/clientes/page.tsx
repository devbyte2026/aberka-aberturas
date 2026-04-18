export default function ClientesPage() {
  const clientesMock = [
    { id: 1, nombre: 'María González', email: 'maria.gonzalez@gmail.com', telefono: '+54 9 341 555 1234', pedidos: 3, total: 245000 },
    { id: 2, nombre: 'Carlos Rodríguez', email: 'carlos.r@outlook.com', telefono: '+54 9 11 4444 5678', pedidos: 1, total: 48500 },
    { id: 3, nombre: 'Ana Martínez', email: 'anamartinez@correo.com', telefono: '+54 9 351 777 8901', pedidos: 2, total: 185500 },
    { id: 4, nombre: 'Pedro Sánchez', email: 'pedro.sanchez@yahoo.com', telefono: '+54 9 261 333 4567', pedidos: 1, total: 78000 },
    { id: 5, nombre: 'Laura Fernández', email: 'laura.fernandez@gmail.com', telefono: '+54 9 381 999 0123', pedidos: 4, total: 412000 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Gestión de Clientes</h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Cliente</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Email</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Teléfono</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Pedidos</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clientesMock.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground">{cliente.nombre}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted">{cliente.email}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted">{cliente.telefono}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-foreground">{cliente.pedidos}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-semibold text-primary">
                      ${cliente.total.toLocaleString('es-AR')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}