'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { LayoutPanelTop, Menu, X, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCarrito } from '@/lib/CartContext'

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrolled
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const scrolled = useScrollPosition()
  const { cantidadItems } = useCarrito()

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

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/seguimiento', label: 'Seguimiento' },
    { href: '/contacto', label: 'Contacto' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b transition-shadow ${
        scrolled ? 'shadow-md' : ''
      }`}
      style={{ borderColor: 'var(--color-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <LayoutPanelTop className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="text-xl font-semibold text-primary">
              Aberka
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-lg min-h-[44px] flex items-center ${
                  isActive(link.href)
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:text-primary hover:bg-accent/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/carrito"
              className="relative p-2 text-foreground hover:text-primary transition-colors min-h-[44px] flex items-center"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={24} aria-hidden="true" />
              {cantidadItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cantidadItems}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/carrito"
              className="relative p-2 text-foreground min-h-[44px] flex items-center"
              aria-label="Carrito de compras"
            >
              <ShoppingCart size={22} aria-hidden="true" />
              {cantidadItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cantidadItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2.5 rounded-lg border-2 transition-all duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isOpen
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 text-foreground hover:border-primary/50 hover:bg-gray-50 active:bg-gray-100'
              }`}
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
            >
              <div className="transition-transform duration-200">
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[400px] pb-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 min-h-[48px] flex items-center ${
                  isActive(link.href)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-foreground hover:bg-accent/50 active:bg-accent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}