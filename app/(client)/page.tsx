import Image from 'next/image'
import Link from 'next/link'
import { Shield, Truck, Award, MapPin, Phone, Clock, Users, Factory, Package, ScrollText } from 'lucide-react'
import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FeaturedCarousel } from '@/components/ui/FeaturedCarousel'
import { Hero } from '@/components/client/Hero'

export const metadata: Metadata = {
  title: 'Aberka Aberturas | Ventanas, Puertas y Perfiles de Aluminio',
  description: 'Venta de aberturas de aluminio y PVC de alta calidad. Ventanas, puertas, perfiles y accesorios con garantía y envío a todo el país.',
}

const heroCategorias = [
  { nombre: 'Ventanas', descripcion: 'Corredizas, proyectantes y fijas', href: '/catalogo?categoria=ventanas', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { nombre: 'Puertas', descripcion: 'De entrada, patio y plegadizas', href: '/catalogo?categoria=puertas', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { nombre: 'Perfiles', descripcion: 'U, angulares y marcos PVC', href: '/catalogo?categoria=perfiles', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { nombre: 'Accesorios', descripcion: 'Herrajes, ruedas y cerraduras', href: '/catalogo?categoria=accesorios', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
]

const razones = [
  { icono: Shield, titulo: 'Calidad Premium', descripcion: 'Materiales de primera selección con acabados profesionales que garantizan durabilidad.' },
  { icono: Truck, titulo: 'Envíos a todo el país', descripcion: 'Enviamos tu pedido a cualquier punto de Argentina con packaging protegido.' },
  { icono: Award, titulo: 'Garantía incluida', descripcion: 'Todos nuestros productos cuentan con garantía de fabricación.' },
]

const diferenciadores = [
  { icono: Factory, titulo: 'Fabricación propia', descripcion: 'Producimos nuestras aberturas en Resistencia con control de calidad en cada etapa.' },
  { icono: Users, titulo: 'Asesoría profesional', descripcion: 'Equipo técnico capacitado para ayudarte a elegir la mejor opción para tu proyecto.' },
  { icono: Package, titulo: 'Stock disponible', descripcion: 'Mayorista de perfiles y accesorios. Entregas inmediatas o bajo pedido.' },
  { icono: ScrollText, titulo: 'Presupuestos detallados', descripcion: 'Cotizamos tu proyecto sin compromiso. Transparent costing.' },
]

const marcas = ['ALUMINIO NACIONAL', 'ALUAR', 'PVC IMPORTADO', 'VIDRIOS TEMPLADOS', 'HERRAJES EUROPEOS', 'EASYSoft']

function Categorias() {
  return (
    <section className="py-8 sm:py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-5 sm:mb-7">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1.5">
            Nuestros productos
          </h2>
          <p className="text-muted text-xs sm:text-sm">
            Encontrá la solución ideal para tu proyecto
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {heroCategorias.map((cat) => (
            <Link
              key={cat.nombre}
              href={cat.href}
              className="group relative overflow-hidden rounded-lg h-32 sm:h-40 lg:h-44 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
            >
              <Image
                src={cat.imagen}
                alt={cat.nombre}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-3 sm:p-4 text-center">
                <h3 className="text-sm sm:text-base font-bold mb-0.5">{cat.nombre}</h3>
                <p className="text-xs text-white/80 hidden sm:block">{cat.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function PorQueElegirnos() {
  return (
    <section className="py-10 sm:py-16 px-4 bg-accent/20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-10 text-foreground">
            ¿Por qué elegirnos?
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {razones.map((razon, i) => (
            <ScrollReveal key={razon.titulo} delay={i * 100}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                  <razon.icono size={24} className="text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 text-foreground">{razon.titulo}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{razon.descripcion}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionConfianza() {
  return (
    <section className="py-10 sm:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Tu socio en cada proyecto
            </h2>
            <p className="text-muted text-xs sm:text-sm max-w-xl mx-auto">
              Más de una década construyendo relaciones sólidas con arquitectos, constructores y familias de Resistencia
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {diferenciadores.map((item, i) => (
            <ScrollReveal key={item.titulo} delay={i * 80}>
              <div className="bg-background rounded-xl p-4 sm:p-5 text-center hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/10">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 mb-3">
                  <item.icono size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5 text-sm sm:text-base">{item.titulo}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.descripcion}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Visitanos en Resistencia</p>
                <p className="text-xs text-muted">Av. 25 de Mayo 1030, Chaco</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Llamanos sin compromiso</p>
                <p className="text-xs text-muted">+54 9 379 400-0000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Horarios de atención</p>
                <p className="text-xs text-muted">Lun-Vie 8:00-18:00 | Sáb 8:00-13:00</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function MapaSection() {
  return (
    <section className="py-10 sm:py-14 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Encontranos en Resistencia
            </h2>
            <p className="text-muted text-xs sm:text-sm">
              Te esperamos en nuestro local para asesorarte personalmente
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="rounded-xl overflow-hidden shadow-md border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.7550149890903!2d-58.83032732395764!3d-27.46910127670036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456b3a9f2f2a5f%3A0x4c7f2f3c9a4b8e8d!2sAv.%2025%20de%20Mayo%201030%2C%20Resistencia%2C%20Chaco!5e0!3m2!1ses!2sus!4v1700000000000!5m2!1ses!2sus"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Aberka Aberturas en Resistencia, Chaco"
              className="w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Marcas() {
  return (
    <section className="py-8 sm:py-10 px-4 bg-white border-y" style={{ borderColor: 'var(--color-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-muted mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-widest font-medium">
            Trabajamos con las mejores marcas y materiales
          </p>
        </ScrollReveal>

        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-8 sm:gap-12 items-center">
            {[...marcas, ...marcas].map((marca, index) => (
              <span
                key={`${marca}-${index}`}
                className="text-xs sm:text-sm font-bold text-foreground/40 whitespace-nowrap hover:text-primary transition-colors cursor-default"
              >
                {marca}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categorias />
      <FeaturedCarousel />
      <PorQueElegirnos />
      <SeccionConfianza />
      <Marcas />
      <MapaSection />
    </>
  )
}