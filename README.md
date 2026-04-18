# Aberka Aberturas - E-commerce Website

Sistema web completo de comercio electrónico para **Aberka Aberturas**, empresa de ventanas, puertas y perfiles de aluminio ubicada en Resistencia, Chaco, Argentina.

---

## 1. Descripción del Proyecto

**Aberka Aberturas** es una aplicación web Next.js que incluye:

- **Sitio público (cliente)**: Catálogo de productos, carrito de compras, seguimiento de pedidos, información de la empresa y contacto.
- **Panel de administración**: Dashboard con métricas, gestión de productos, pedidos, clientes, reportes y banners promocionales.

El proyecto está orientado a un negocio real de aberturas de aluminio, con funcionalidad completa de catálogo, carrito y administración.

---

## 2. Tecnologías Usadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.2.4 | Framework principal (App Router) |
| **React** | 19.x | Librería de UI |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 3.x | Estilos (con PostCSS) |
| **lucide-react** | latest | Iconos |
| **Recharts** | latest | Gráficos del dashboard admin |
| **clsx + tailwind-merge** | latest | Utilidades de clases |

---

## 3. Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd aberka-aberturas

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Iniciar entorno de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

---

## 4. Variables de Entorno

```env
# WhatsApp (obligatorio para botón de contacto)
NEXT_PUBLIC_WHATSAPP_NUMBER=5493794000000
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hola! Quiero consultar sobre aberturas.

# Mercado Pago (opcional, para integración futura de pagos)
NEXT_PUBLIC_MP_CHECKOUT_URL=https://www.mercadopago.com.ar

# URL del sitio (para meta tags y OpenGraph)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.vercel.app
```

---

## 5. Estructura del Proyecto

```
aberka-aberturas/
├── app/
│   ├── (client)/              # Grupo de rutas públicas
│   │   ├── page.tsx           # Home (hero, categorías, carrusel, mapa)
│   │   ├── catalogo/           # Catálogo con filtros
│   │   ├── producto/[id]/      # Detalle de producto
│   │   ├── carrito/           # Carrito de compras
│   │   ├── seguimiento/        # Tracking de pedido
│   │   ├── nosotros/          # Página institucional
│   │   ├── contacto/           # Formulario de contacto
│   │   └── layout.tsx         # Layout con Header + Footer + WhatsApp button
│   ├── admin/                  # Panel administrativo
│   │   ├── layout.tsx          # Layout con Sidebar
│   │   ├── page.tsx           # Login (usuario: admin / contraseña: aberka2024)
│   │   ├── dashboard/         # KPIs y gráficos
│   │   ├── productos/         # CRUD de productos
│   │   ├── pedidos/           # Gestión de pedidos
│   │   ├── clientes/          # Listado de clientes
│   │   ├── reportes/          # Reportes y estadísticas
│   │   └── banners/           # Gestión de banners
│   ├── globals.css            # Variables CSS, animaciones, reset
│   └── layout.tsx             # Root layout (providers, metadata)
├── components/
│   ├── layout/
│   │   ├── Header.tsx         # Navbar responsive con menú hamburguesa
│   │   ├── Footer.tsx        # Footer de 4 columnas
│   │   └── WhatsAppButton.tsx # Botón flotante de WhatsApp
│   ├── admin/
│   │   └── Sidebar.tsx       # Sidebar del panel admin (mobile drawer)
│   ├── ui/
│   │   ├── ProductCard.tsx   # Tarjeta de producto
│   │   ├── FeaturedCarousel.tsx # Carrusel de productos destacados
│   │   ├── ScrollReveal.tsx  # Animación de reveal al scroll
│   │   └── Badge.tsx        # Badge de estado
│   └── client/
│       └── Hero.tsx         # Sección hero (cliente)
├── lib/
│   ├── CartContext.tsx      # Context del carrito (localStorage)
│   ├── mockData.ts         # Datos de prueba (12 productos, pedidos)
│   └── utils.ts            # Función cn() para clases
├── types/
│   └── index.ts            # Interfaces: Producto, Pedido, ItemCarrito, Categoria
└── next.config.ts          # Configuración Next (remote patterns para imágenes)
```

---

## 6. Funcionamiento General

### Sitio Público (Cliente)

- **Catálogo**: Filtra por categoría, material, color y rango de precio. Paginación de 6 productos por página.
- **Carrito**: Se guarda en localStorage. Calcula totales, permite cambiar cantidades y eliminar items.
- **Seguimiento**: Consulta estado de pedido por número (ej: ABK-001).
- **Productos**: Detalle con imágenes, descripción, precio y botón de agregar al carrito.

### Panel de Administración

- **Login**: Usuario `admin` / Contraseña `aberka2024` (simple, sin hashing por ahora).
- **Dashboard**: Muestra KPIs (ventas, pedidos activos, stock) y gráficos de ventas semanales.
- **Productos**: CRUD completo con modal. Validación de formulario. Enum de categorías/materiales.
- **Pedidos**: Cambio de estado (fabricación → listo → enviado). Carga de número de guía de seguimiento.
- **Clientes**: Listado readonly con datos mock.
- **Reportes**: Gráficos de ventas mensuales y distribución por categoría.
- **Banners**: CRUD de banners con toggle de activo/inactivo.

---

## 7. Funciones Clave

### Carrito (CartContext)

```typescript
// Provider envuelve toda la app en app/layout.tsx
// Usa useReducer para estado: { items: ItemCarrito[], cantidadItems: number }

// Métodos:
// - agregarProducto(producto, cantidad)
// - quitarProducto(id)
// - actualizarCantidad(id, cantidad)
// - limpiarCarrito()
// - Persistencia en localStorage
```

### ScrollReveal

```typescript
// Componente que usa IntersectionObserver
// Props: children, className, delay (default 0)
// Animación: opacity 0→1, translateY 8px→0, 700ms ease-out
// Se activa cuando el elemento entra en el viewport
```

### Header con Menú Mobile

- Sticky en scroll
- Logo + links (desktop) / Logo + carrito + hamburguesa (mobile)
- Menú se expande con animación suave
- Overlay oscuro al abrir
- `onClick={() => setIsOpen(false)}` en cada Link

---

## 8. Rutas Principales

### Sitio Público

| Ruta | Descripción |
|------|-------------|
| `/` | Home: Hero, categorías, productos destacados, mapa |
| `/catalogo` | Catálogo con filtros y paginación |
| `/producto/[id]` | Detalle de producto |
| `/carrito` | Carrito de compras |
| `/seguimiento` | Consulta de estado de pedido |
| `/nosotros` | Información de la empresa |
| `/contacto` | Formulario de contacto + datos |

### Panel Admin

| Ruta | Descripción |
|------|-------------|
| `/admin` | Login |
| `/admin/dashboard` | KPIs y gráficos |
| `/admin/productos` | Gestión de productos |
| `/admin/pedidos` | Gestión de pedidos |
| `/admin/clientes` | Listado de clientes |
| `/admin/reportes` | Reportes visuales |
| `/admin/banners` | Gestión de banners |

---

## 9. Deploy en Vercel

### Paso a paso:

1. **Crear proyecto en Vercel**:
   ```bash
   vercel login
   vercel project add aberka-aberturas
   ```

2. **Configurar variables de entorno** en el dashboard de Vercel:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_WHATSAPP_MESSAGE`
   - `NEXT_PUBLIC_SITE_URL`

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Notas para deploy:
- El proyecto usa `next/image` con Unsplash. Las imágenes vienen de fuentes externas.
- No requiere base de datos (datos mock en `lib/mockData.ts`).
- Para producción real, considerar migrar datos a una base de datos (Supabase, Prisma, etc.).

---

## 10. Notas y Mejoras Futuras

### Escalabilidad

El proyecto está preparado para escalar con:
- **Base de datos**: Conectar Prisma + PostgreSQL para datos persistentes
- **Auth**: Implementar NextAuth.js con OAuth (Google, GitHub)
- **Pagos**: Integrar Mercado Pago o Stripe para checkout real
- **Email**: Integrar nodemailer o Resend para notificaciones
- **Estado global**: Considerar Zustand o Jotai si Redux no es necesario

### Mejoras sugeridas

1. **UI/UX**: Implementar modo oscuro, animaciones más sofisticadas
2. **Performance**: Optimizar imágenes con Next.js Image, lazy loading
3. **SEO**: Agregar sitemap.xml, robots.txt, structured data
4. **Testing**: Agregar unit tests con Vitest y e2e con Playwright
5. **Monitoreo**: Integrar Sentry para tracking de errores

---

## Credenciales de Acceso Admin

```
Usuario: admin
Contraseña: aberka2024
```

> ⚠️ Estas credenciales son de desarrollo. En producción, implementar auth real con hashing y variables de entorno seguras.

---

**Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS + Recharts
**Ubicación**: Resistencia, Chaco, Argentina
**Desarrollado por DevByte**