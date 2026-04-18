'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Search, Plus, Upload, Pencil, Trash2, X } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { productos as initialProductos } from '@/lib/mockData'
import { Producto } from '@/types'

const ITEMS_POR_PAGINA = 10

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>(initialProductos)
  const [busqueda, setBusqueda] = useState('')
  const [paginaActual, setPaginaActual] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editandoId, setEditandoId] = useState<string | null>(null)

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'ventanas' as Producto['categoria'],
    material: 'aluminio' as Producto['material'],
    color: '',
    precio: 0,
    stock: 0,
  })

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA)
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA
  const productosPagina = productosFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA)

  const abrirAgregar = () => {
    setEditandoId(null)
    setForm({ nombre: '', descripcion: '', categoria: 'ventanas', material: 'aluminio', color: '', precio: 0, stock: 0 })
    setModalOpen(true)
  }

  const abrirEditar = (producto: Producto) => {
    setEditandoId(producto.id)
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      material: producto.material,
      color: producto.color,
      precio: producto.precio,
      stock: producto.stock,
    })
    setModalOpen(true)
  }

  const guardar = () => {
    if (editandoId) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === editandoId
            ? { ...p, ...form, imagenes: p.imagenes }
            : p
        )
      )
    } else {
      const nuevoProducto: Producto = {
        id: `PROD-${Date.now()}`,
        ...form,
        imagenes: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
        relacionados: [],
      }
      setProductos((prev) => [...prev, nuevoProducto])
    }
    setModalOpen(false)
  }

  const eliminar = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProductos((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const Toast = ({ message }: { message: string }) => (
    <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50">
      {message}
    </div>
  )

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Gestión de Productos</h1>

      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 relative max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1) }}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => alert('Próximamente')}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload size={16} />
              Importar desde Excel
            </button>
            <button
              onClick={abrirAgregar}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              <Plus size={16} />
              Agregar producto
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Foto</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Producto</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Categoría</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Material</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Precio</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Stock</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {productosPagina.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={producto.imagenes[0]}
                        alt={producto.nombre}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-medium text-foreground">{producto.nombre}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="default">{producto.categoria}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted capitalize">{producto.material}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-foreground">
                      ${producto.precio.toLocaleString('es-AR')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{producto.stock}</span>
                      {producto.stock < 5 && <Badge variant="danger">Bajo</Badge>}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirEditar(producto)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => eliminar(producto.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 p-5 border-t border-border">
            <button
              onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
              disabled={paginaActual === 1}
              className="px-4 py-2 text-sm border border-border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Anterior
            </button>
            <span className="text-sm text-muted">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-4 py-2 text-sm border border-border rounded-lg disabled:opacity-50 hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {editandoId ? 'Editar producto' : 'Agregar producto'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-muted hover:text-foreground">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Categoría</label>
                  <select
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value as Producto['categoria'] })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="ventanas">Ventanas</option>
                    <option value="puertas">Puertas</option>
                    <option value="perfiles">Perfiles</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Material</label>
                  <select
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value as Producto['material'] })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="aluminio">Aluminio</option>
                    <option value="pvc">PVC</option>
                    <option value="mixto">Mixto</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Color</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Precio (ARS)</label>
                  <input
                    type="number"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Imágenes</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full px-4 py-2 border border-border rounded-lg"
                />
                <p className="text-xs text-muted mt-1">Seleccionar archivos (no se subirán automáticamente)</p>
              </div>
            </div>

            <div className="flex gap-3 p-5 border-t border-border">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                className="flex-1 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-hover"
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