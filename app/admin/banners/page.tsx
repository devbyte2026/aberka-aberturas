'use client'

import { useState } from 'react'
import { Image, Plus, Pencil, Trash2, X } from 'lucide-react'

interface Banner {
  id: number
  titulo: string
  subtitulo: string
  imagen: string
  activo: boolean
  orden: number
}

const bannersMock: Banner[] = [
  { id: 1, titulo: '¡Nuevas ventanas!', subtitulo: 'Hasta 20% off en aluminio', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', activo: true, orden: 1 },
  { id: 2, titulo: 'Envío gratis', subtitulo: 'En pedidos mayores a $100.000', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', activo: true, orden: 2 },
  { id: 3, titulo: 'Consultá por WhatsApp', subtitulo: 'Te asesoramos en minutos', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', activo: false, orden: 3 },
]

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(bannersMock)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Banner | null>(null)

  const toggleActivo = (id: number) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, activo: !b.activo } : b)))
  }

  const abrirAgregar = () => {
    setEditando({ id: Date.now(), titulo: '', subtitulo: '', imagen: '', activo: true, orden: banners.length + 1 })
    setModalOpen(true)
  }

  const abrirEditar = (banner: Banner) => {
    setEditando(banner)
    setModalOpen(true)
  }

  const guardar = () => {
    if (!editando) return
    if (banners.find((b) => b.id === editando.id)) {
      setBanners((prev) => prev.map((b) => (b.id === editando.id ? editando : b)))
    } else {
      setBanners((prev) => [...prev, editando])
    }
    setModalOpen(false)
  }

  const eliminar = (id: number) => {
    if (confirm('¿Eliminar este banner?')) {
      setBanners((prev) => prev.filter((b) => b.id !== id))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Gestión de Banners</h1>
        <button
          onClick={abrirAgregar}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus size={18} />
          Agregar banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className={`bg-white rounded-xl overflow-hidden shadow-sm ${!banner.activo ? 'opacity-60' : ''}`}>
            <div className="relative h-40 bg-gray-100">
              {banner.imagen ? (
                <img src={banner.imagen} alt={banner.titulo || 'Banner'} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted">Sin imagen</div>
              )}
              {!banner.activo && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded">Inactivo</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{banner.titulo}</h3>
              <p className="text-sm text-muted">{banner.subtitulo}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => toggleActivo(banner.id)}
                  className={`text-xs font-medium px-3 py-1 rounded-full ${banner.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  {banner.activo ? 'Activo' : 'Inactivo'}
                </button>
                <div className="flex gap-2">
                  <button onClick={() => abrirEditar(banner)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" aria-label="Editar">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => eliminar(banner.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" aria-label="Eliminar">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && editando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">{banners.find((b) => b.id === editando.id) ? 'Editar' : 'Agregar'} banner</h3>
              <button onClick={() => setModalOpen(false)} className="p-1"><X size={20} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Título</label>
                <input type="text" value={editando.titulo} onChange={(e) => setEditando({ ...editando, titulo: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subtítulo</label>
                <input type="text" value={editando.subtitulo} onChange={(e) => setEditando({ ...editando, subtitulo: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">URL de imagen</label>
                <input type="text" value={editando.imagen} onChange={(e) => setEditando({ ...editando, imagen: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg" />
              </div>
            </div>
            <div className="flex gap-3 p-5 border-t border-border">
              <button onClick={() => setModalOpen(false)} className="flex-1 px-4 py-2 border border-border rounded-lg">Cancelar</button>
              <button onClick={guardar} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}