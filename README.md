# 🎨 ArtPrograms Studio - Code Showcase

Catálogo interactivo de componentes frontend premium con animaciones y efectos visuales de alta calidad. Una plataforma profesional y moderna que funciona como un catálogo interactivo de componentes frontend premium.

## 📋 Descripción Ejecutiva

**ArtPrograms Studio - Code Showcase** es una plataforma web profesional diseñada para proporcionar a desarrolladores y diseñadores acceso a demostraciones funcionales de animaciones, efectos visuales y componentes UI de alta calidad, con la capacidad de visualizar, copiar y reutilizar el código fuente de cada ejemplo.

### Objetivos Principales

- **Centralizar código frontend** de alta calidad de forma profesional
- **Facilitar reutilización de código** permitiendo que otros desarrolladores copien y adapten componentes
- **Crear experiencia de usuario premium** con diseño elegante, animaciones suaves y navegación intuitiva
- **Escalabilidad futura** con arquitectura modular que permite agregar nuevos componentes fácilmente
- **Documentación completa** con código bien comentado y documentación clara para cada componente

## 🚀 Características Principales

### Para Desarrolladores

- Catálogo interactivo con búsqueda y filtrado
- Visualización de componentes en vivo
- Visor de código con syntax highlighting
- Copiar código con un clic
- Documentación detallada de cada componente
- Ejemplos de uso y casos de aplicación

### Componentes Iniciales

1. **Login Lamp Animation** 💡
   - Formulario de login interactivo con lámpara animada
   - Efecto de iluminación gradual
   - Sombras realistas

2. **Particle Effects** ✨
   - Efecto de partículas animadas
   - Múltiples modos (lluvia, explosión, órbita)
   - Colisiones y rebotes realistas

3. **Glassmorphism Card** 🔮
   - Tarjeta con efecto de vidrio esmerilado
   - Bordes sutiles con gradiente
   - Animaciones suaves

## 🛠️ Stack Tecnológico

### Frontend

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 19 | Framework principal |
| TypeScript | 5.9 | Tipado estático |
| Tailwind CSS | 4 | Estilos y diseño responsivo |
| Framer Motion | 12+ | Animaciones fluidas |
| tRPC | 11 | Comunicación cliente-servidor |
| React Query | 5 | Gestión de estado y caché |
| Lucide React | 0.453 | Iconos profesionales |
| Prism.js | Latest | Syntax highlighting |
| Sonner | 2 | Notificaciones toast |

### Backend

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Express.js | 4.21 | Servidor web |
| Node.js | 22 | Runtime |
| tRPC | 11 | API type-safe |
| Drizzle ORM | 0.44 | ORM para base de datos |
| MySQL | 8+ | Base de datos |
| JWT | 6.1 | Autenticación |

## 📁 Estructura del Proyecto

```
artprograms-studio/
├── client/                          # Aplicación React
│   ├── src/
│   │   ├── pages/                  # Páginas principales
│   │   ├── components/             # Componentes reutilizables
│   │   ├── hooks/                  # Custom hooks
│   │   ├── lib/                    # Utilidades
│   │   ├── App.tsx                 # Componente raíz
│   │   ├── main.tsx                # Punto de entrada
│   │   └── index.css               # Estilos globales
│   ├── index.html                  # HTML principal
│   ├── vite.config.ts              # Configuración Vite
│   ├── tsconfig.json               # Configuración TypeScript
│   └── package.json                # Dependencias del cliente
│
├── server/                          # Servidor Express
│   ├── src/
│   │   ├── core/                   # Configuración principal
│   │   └── routes/                 # Rutas de API
│   ├── drizzle/                    # Esquema y migraciones
│   ├── drizzle.config.ts           # Configuración Drizzle
│   └── package.json                # Dependencias del servidor
│
├── .env.example                    # Variables de entorno ejemplo
├── package.json                    # Configuración del workspace
└── README.md                       # Este archivo
```

## 🚀 Instalación y Setup

### Requisitos Previos

- Node.js 22+
- npm o pnpm
- MySQL 8+

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Diego-20000/social-insight-web.git
cd social-insight-web
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Inicializar base de datos**

```bash
npm run db:push
```

5. **Iniciar desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📚 Documentación de Componentes

### Login Lamp Animation

**Descripción**: Formulario de login interactivo con una lámpara que se enciende al tirar de una cuerda.

**Características**:
- Fondo completamente negro cuando la lámpara está apagada
- Panel de login invisible hasta que se encienda la lámpara
- Animación de cuerda con Framer Motion
- Efecto de iluminación gradual
- Sombras realistas de luz

### Particle Effects

**Descripción**: Efecto de partículas animadas que crean una atmósfera visual dinámica.

**Características**:
- Partículas que se mueven aleatoriamente
- Colisiones y rebotes
- Cambio de color dinámico
- Diferentes modos (lluvia, explosión, órbita)

### Glassmorphism Card

**Descripción**: Tarjeta con efecto de vidrio esmerilado con contenido interactivo.

**Características**:
- Fondo semi-transparente con blur
- Bordes sutiles con gradiente
- Sombras suaves y realistas
- Efecto hover con cambio de opacidad

## 🔐 Seguridad y Performance

### Seguridad

- Validación de entrada en servidor
- Sanitización de código mostrado
- CORS configurado correctamente
- Protección contra XSS
- Rate limiting en API
- JWT para autenticación

### Performance

- Code splitting automático con Vite
- Lazy loading de componentes
- Optimización de imágenes
- Caché de cliente con React Query
- Minificación de CSS y JS

## 🗺️ Características Futuras

### Fase 2

- Sistema de favoritos
- Búsqueda y filtrado avanzado
- Categorización por tecnología
- Sistema de ratings y comentarios
- Descarga de componentes como ZIP

### Fase 3

- Autenticación de usuarios
- Historial de componentes visitados
- Recomendaciones personalizadas
- Blog con tutoriales
- API pública para integración

### Fase 4

- Marketplace de componentes premium
- Sistema de versiones
- Integración con npm
- Editor en línea
- Exportación a diferentes frameworks

## 📝 Contribuciones

Las contribuciones son bienvenidas. Por favor, consulta CONTRIBUTING.md para más detalles.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ por Diego

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2026  
**Estado**: Listo para desarrollo
