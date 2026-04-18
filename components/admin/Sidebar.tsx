'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart2, Image, LogOut, Menu, X, LayoutPanelTop } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icono: LayoutDashboard },
  { href: '/admin/productos', label: 'Productos', icono: Package },
  { href: '/admin/pedidos', label: 'Pedidos', icono: ShoppingBag },
  { href: '/admin/clientes', label: 'Clientes', icono: Users },
  { href: '/admin/reportes', label: 'Reportes', icono: BarChart2 },
  { href: '/admin/banners', label: 'Banners', icono: Image },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b flex items-center justify-between px-4 h-16" style={{ borderColor: '#1A2A4A' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2.5 rounded-lg border-2 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
            isOpen
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-gray-200 text-foreground hover:border-primary/50 active:bg-gray-50'
          }`}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          <div className="transition-transform duration-200">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </div>
        </button>

        <div className="flex items-center gap-2">
          <LayoutPanelTop size={22} className="text-primary" aria-hidden="true" />
          <span className="text-lg font-bold text-foreground">Admin</span>
        </div>

        <div className="w-11" />
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-primary flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:top-0'
        }`}
        style={{ backgroundColor: '#1A2A4A' }}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <LayoutPanelTop size={24} className="text-white" aria-hidden="true" />
            <h1 className="text-lg font-bold text-white">Aberka Admin</h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-5 py-3.5 text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 border-l-[3px] border-white text-white'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icono size={20} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <LogOut size={20} aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}