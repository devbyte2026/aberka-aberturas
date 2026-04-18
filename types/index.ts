export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: 'ventanas' | 'puertas' | 'perfiles' | 'accesorios'
  material: 'aluminio' | 'pvc' | 'mixto'
  color: string
  imagenes: string[]
  relacionados?: string[]
}

export interface ItemCarrito {
  producto: Producto
  cantidad: number
}

export interface Pedido {
  id: string
  cliente: string
  email: string
  telefono: string
  productos: ItemCarrito[]
  total: number
  estado: 'fabricacion' | 'listo' | 'enviado'
  guia?: string
  fechaCreacion: string
  fechaActualizacion: string
}

export interface Categoria {
  id: string
  nombre: string
  descripcion: string
  icono: string
  imagen: string
}