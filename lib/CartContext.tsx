'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import type { Producto, ItemCarrito } from '@/types'

interface CarritoState {
  items: ItemCarrito[]
  total: number
}

type CarritoAction =
  | { type: 'AGREGAR'; producto: Producto; cantidad: number }
  | { type: 'QUITAR'; productoId: string }
  | { type: 'CAMBIAR_CANTIDAD'; productoId: string; cantidad: number }
  | { type: 'VACIAR' }
  | { type: 'CARGAR'; items: ItemCarrito[] }

function calcularTotal(items: ItemCarrito[]): number {
  return items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)
}

function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case 'AGREGAR': {
      const existente = state.items.find((i) => i.producto.id === action.producto.id)
      let nuevosItems: ItemCarrito[]
      if (existente) {
        nuevosItems = state.items.map((i) =>
          i.producto.id === action.producto.id
            ? { ...i, cantidad: i.cantidad + action.cantidad }
            : i
        )
      } else {
        nuevosItems = [...state.items, { producto: action.producto, cantidad: action.cantidad }]
      }
      return { items: nuevosItems, total: calcularTotal(nuevosItems) }
    }
    case 'QUITAR': {
      const nuevosItems = state.items.filter((i) => i.producto.id !== action.productoId)
      return { items: nuevosItems, total: calcularTotal(nuevosItems) }
    }
    case 'CAMBIAR_CANTIDAD': {
      if (action.cantidad <= 0) {
        const nuevosItems = state.items.filter((i) => i.producto.id !== action.productoId)
        return { items: nuevosItems, total: calcularTotal(nuevosItems) }
      }
      const nuevosItems = state.items.map((i) =>
        i.producto.id === action.productoId ? { ...i, cantidad: action.cantidad } : i
      )
      return { items: nuevosItems, total: calcularTotal(nuevosItems) }
    }
    case 'VACIAR':
      return { items: [], total: 0 }
    case 'CARGAR':
      return { items: action.items, total: calcularTotal(action.items) }
    default:
      return state
  }
}

interface CarritoContextType {
  state: CarritoState
  agregar: (producto: Producto, cantidad: number) => void
  quitar: (productoId: string) => void
  cambiarCantidad: (productoId: string, cantidad: number) => void
  vaciar: () => void
  cantidadItems: number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(carritoReducer, { items: [], total: 0 })

  useEffect(() => {
    const stored = localStorage.getItem('carrito')
    if (stored) {
      try {
        const items = JSON.parse(stored) as ItemCarrito[]
        dispatch({ type: 'CARGAR', items })
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(state.items))
  }, [state.items])

  const agregar = (producto: Producto, cantidad: number) => {
    dispatch({ type: 'AGREGAR', producto, cantidad })
  }

  const quitar = (productoId: string) => {
    dispatch({ type: 'QUITAR', productoId })
  }

  const cambiarCantidad = (productoId: string, cantidad: number) => {
    dispatch({ type: 'CAMBIAR_CANTIDAD', productoId, cantidad })
  }

  const vaciar = () => {
    dispatch({ type: 'VACIAR' })
  }

  const cantidadItems = state.items.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <CarritoContext.Provider value={{ state, agregar, quitar, cambiarCantidad, vaciar, cantidadItems }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito must be used within CarritoProvider')
  }
  return context
}