'use client'

import { useState } from 'react'
import { productos } from '@/lib/mockData'
import ProductCard from '@/components/ui/ProductCard'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { Producto } from '@/types'

const categorias = ['ventanas', 'puertas', 'perfiles', 'accesorios']
const materiales = ['aluminio', 'pvc', 'mixto']
const colores = ['Blanco', 'Negro', 'Gris', 'Natural']
const PRODUCTOS_POR_PAGINA = 6

export default function CatalogoClient() {
  const [filtros, setFiltros] = useState({
    categorias: [] as string[],
    materiales: [] as string[],
    colores: [] as string[],
    precioMin: 0,
    precioMax: 200000,
  })
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [paginaActual, setPaginaActual] = useState(1)

  const toggleFiltro = (tipo: string, valor: string) => {
    setFiltros((prev) => {
      const lista = prev[tipo as keyof typeof prev] as string[]
      const actualizados = lista.includes(valor)
        ? lista.filter((v) => v !== valor)
        : [...lista, valor]
      return { ...prev, [tipo]: actualizados }
    })
    setPaginaActual(1)
  }

  const productosFiltrados = productos.filter((p: Producto) => {
    if (filtros.categorias.length && !filtros.categorias.includes(p.categoria)) return false
    if (filtros.materiales.length && !filtros.materiales.includes(p.material)) return false
    if (filtros.colores.length && !filtros.colores.includes(p.color)) return false
    if (p.precio < filtros.precioMin || p.precio > filtros.precioMax) return false
    return true
  })

  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA)
  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA
  const productosPagina = productosFiltrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)

  const limpiarFiltros = () => {
    setFiltros({ categorias: [], materiales: [], colores: [], precioMin: 0, precioMax: 200000 })
    setPaginaActual(1)
  }

  const FiltrosContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Categoría</h3>
        {categorias.map((cat) => (
          <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filtros.categorias.includes(cat)}
              onChange={() => toggleFiltro('categorias', cat)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm capitalize text-foreground/80">{cat}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-foreground">Material</h3>
        {materiales.map((mat) => (
          <label key={mat} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filtros.materiales.includes(mat)}
              onChange={() => toggleFiltro('materiales', mat)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm capitalize text-foreground/80">{mat}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-foreground">Color</h3>
        {colores.map((col) => (
          <label key={col} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filtros.colores.includes(col)}
              onChange={() => toggleFiltro('colores', col)}
              className="w-4 h-4 rounded border-border"
            />
            <span className="text-sm text-foreground/80">{col}</span>
          </label>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-foreground">Precio</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={filtros.precioMin}
            onChange={(e) => { setFiltros({ ...filtros, precioMin: Number(e.target.value) }); setPaginaActual(1) }}
            className="w-full border border-border rounded px-2 py-1.5 text-sm"
            placeholder="Min"
            aria-label="Precio mínimo"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            value={filtros.precioMax}
            onChange={(e) => { setFiltros({ ...filtros, precioMax: Number(e.target.value) }); setPaginaActual(1) }}
            className="w-full border border-border rounded px-2 py-1.5 text-sm"
            placeholder="Max"
            aria-label="Precio máximo"
          />
        </div>
      </div>

      <button
        onClick={limpiarFiltros}
        className="w-full py-2 text-sm text-muted hover:text-foreground border border-border rounded-lg transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">Catálogo de Productos</h1>
        <p className="text-muted mb-6 sm:mb-8">({productosFiltrados.length} productos)</p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg min-h-[44px]"
            aria-label="Mostrar filtros"
          >
            <SlidersHorizontal size={18} />
            Filtros
            <ChevronDown size={18} className={`transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 border border-border rounded-xl p-5">
              <h2 className="text-lg font-semibold mb-4 text-foreground">Filtrar por</h2>
              <FiltrosContent />
            </div>
          </aside>

          {mostrarFiltros && (
            <div className="lg:hidden border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
                <button onClick={() => setMostrarFiltros(false)} className="p-1" aria-label="Cerrar filtros">
                  <X size={20} />
                </button>
              </div>
              <FiltrosContent />
            </div>
          )}

          <main className="flex-1">
            {productosPagina.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted">No hay productos que coincidan con los filtros.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {productosPagina.map((producto) => (
                    <ProductCard
                      key={producto.id}
                      id={producto.id}
                      nombre={producto.nombre}
                      precio={producto.precio}
                      stock={producto.stock}
                      imagen={producto.imagenes[0]}
                      categoria={producto.categoria}
                    />
                  ))}
                </div>

                {totalPaginas > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                      disabled={paginaActual === 1}
                      className="px-4 py-2.5 border border-border rounded-lg disabled:opacity-50 hover:bg-accent/30 transition-colors min-h-[44px]"
                    >
                      Anterior
                    </button>
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pag) => (
                      <button
                        key={pag}
                        onClick={() => setPaginaActual(pag)}
                        className={`w-10 h-10 rounded-lg border transition-colors ${
                          paginaActual === pag ? 'bg-primary text-white' : 'border-border hover:bg-accent/30'
                        }`}
                      >
                        {pag}
                      </button>
                    ))}
                    <button
                      onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
                      disabled={paginaActual === totalPaginas}
                      className="px-4 py-2.5 border border-border rounded-lg disabled:opacity-50 hover:bg-accent/30 transition-colors min-h-[44px]"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}