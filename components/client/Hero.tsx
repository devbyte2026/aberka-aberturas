'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const heroImages = {
  main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
}

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImages.main}
          alt="Aberturas de aluminio para el hogar"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50 z-10" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        <div className="mb-3">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
            Desde Resistencia, Chaco 🇦🇷
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
          Aberturas de calidad<br className="hidden sm:block" /> para tu hogar
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-white/85 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
          Ventanas, puertas y perfiles de aluminio con garantía y envío a todo el país
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
          <Link
            href="/catalogo"
            className="bg-white text-primary font-semibold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl hover:bg-accent transition-all duration-200 active:scale-95 text-center min-h-[44px] flex items-center justify-center shadow-lg text-sm sm:text-base"
          >
            Ver Catálogo
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493794000000'}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola! Quiero consultar sobre aberturas.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl transition-all duration-200 active:scale-95 text-center min-h-[44px] flex items-center justify-center shadow-lg text-sm sm:text-base"
          >
            Consultar por WhatsApp
          </a>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-5 text-white/80 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-green-400" />
            <span>Envío a todo el país</span>
          </div>
          <div className="w-px h-3 bg-white/30 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <CheckCircle size={14} className="text-green-400" />
            <span>Garantía de fábrica</span>
          </div>
          <div className="w-px h-3 bg-white/30 hidden md:block" />
          <div className="hidden md:flex items-center gap-1.5">
            <CheckCircle size={14} className="text-green-400" />
            <span>+10 años en el mercado</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-1.5 sm:pt-2">
          <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  )
}