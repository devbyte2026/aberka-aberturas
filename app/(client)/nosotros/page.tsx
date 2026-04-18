import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros | Aberka Aberturas',
  description: 'Conocé más sobre Aberka Aberturas. Más de 10 años de experiencia en aberturas de aluminio y PVC en Resistencia, Chaco.',
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">
          Sobre Nosotros
        </h1>
        <p className="text-muted text-center mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Conocé nuestra historia y compromiso con la calidad
        </p>

        <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Nuestra Historia</h2>
          <p className="text-muted leading-relaxed mb-4 text-sm sm:text-base">
            Aberka Aberturas nació en Resistencia, Chaco, con la misión de ofrecer aberturas de aluminio de alta calidad a precios accesibles. Con más de 10 años de experiencia, nos hemos convertido en referente regional en soluciones de carpintería de aluminio para el hogar y la industria.
          </p>
          <p className="text-muted leading-relaxed text-sm sm:text-base">
            Trabajamos con las mejores marcas del mercado nacional e importado, asegurando materiales premium y acabados impecables en cada producto que fabricamos.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">10+</p>
            <p className="text-muted text-xs sm:text-sm">Años de experiencia</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">500+</p>
            <p className="text-muted text-xs sm:text-sm">Clientes satisfechos</p>
          </div>
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
            <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">100%</p>
            <p className="text-muted text-xs sm:text-sm">Garantía en productos</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Nuestros Valores</h2>
          <ul className="space-y-3 sm:space-y-4">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted text-sm sm:text-base"><strong className="text-foreground">Calidad:</strong> Utilizamos solo materiales premium y procesos certificados.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted text-sm sm:text-base"><strong className="text-foreground">Honestidad:</strong> Precios transparentes sin costos ocultos.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted text-sm sm:text-base"><strong className="text-foreground">Compromiso:</strong> Cumplimos los plazos acordados con cada cliente.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted text-sm sm:text-base"><strong className="text-foreground">Vocación de servicio:</strong> Estamos siempre disponibles para asesorarte.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}