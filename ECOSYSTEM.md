# Ecosistema Nexus - Art Programs Studio

**Nexus IG Analyzer** es parte del ecosistema **Nexus**, un conjunto de aplicaciones interconectadas diseñadas para crear valor sostenible para usuarios y desarrolladores.

## 🏗️ Arquitectura del Ecosistema

```
┌─────────────────────────────────────────────────────────┐
│           NEXUS SERVER (Backend Central)                │
│  - Sistema de cuentas unificado (Nexus Account)        │
│  - Gestión de puntos y recompensas                     │
│  - Gestión de suscripciones premium                    │
│  - Autenticación y autorización                        │
└─────────────────────────────────────────────────────────┘
         ↑                    ↑                    ↑
         │                    │                    │
    ┌────┴────┐          ┌────┴────┐          ┌───┴────┐
    │          │          │          │          │        │
┌───▼──┐   ┌──▼────┐  ┌──▼────┐  ┌──▼────┐  ┌─▼────┐
│Nexus │   │Nexus  │  │Nexus  │  │Nexus  │  │Nexus │
│ Ads  │   │  IG   │  │Remind │  │ Web   │  │ API  │
│(Ads) │   │Analyzer│  │ ers   │  │(Site) │  │      │
└──────┘   └───────┘  └───────┘  └───────┘  └──────┘
```

## 📱 Componentes del Ecosistema

### 1. **Nexus Ads** 🎬
**Aplicación de Monetización Central**

- **Propósito**: Generar ingresos y recompensas para el ecosistema
- **Mecánica**: 
  - Feed de anuncios estáticos (scroll)
  - Videos recompensados
  - Sistema de puntos visible
- **Integración**: Usuarios ganan puntos canjeables en apps premium
- **Repo**: `art-programs-studio-server` (incluida)

### 2. **Nexus IG Analyzer** 📊
**Herramienta de Análisis de Instagram** (Este proyecto)

- **Propósito**: Analizar datos de Instagram de forma segura
- **Características**:
  - Análisis de seguidores sin compartir contraseña
  - Identificación de quién no sigue de vuelta
  - Estadísticas detalladas
  - Gráficos interactivos
- **Acceso**: Requiere suscripción premium (canjeada con puntos)
- **Repo**: `social-insight-web`

### 3. **Nexus Reminders** 📍
**Recordatorios por Ubicación**

- **Propósito**: Crear recordatorios basados en geofencing
- **Características**:
  - Recordatorios al entrar/salir de ubicaciones
  - Optimización de batería
  - Alta precisión
- **Acceso**: Requiere suscripción premium (canjeada con puntos)
- **Repo**: `geo-prompt-web`

### 4. **Nexus Server** 🔐
**Backend Central**

- **Propósito**: Conectar todas las aplicaciones
- **Responsabilidades**:
  - Gestión de cuentas Nexus unificadas
  - Registro y login
  - Gestión de puntos
  - Gestión de suscripciones
  - APIs para las apps
- **Repo**: `art-programs-studio-server`

### 5. **Art Programs Studio Web** 🌐
**Sitio Web Oficial**

- **Propósito**: Presentación y landing page
- **Contenido**:
  - Información sobre el ecosistema
  - Links a las aplicaciones
  - Blog y recursos
- **Repo**: `art-programs-studio-web`

## 🔄 Flujo de Usuario

### Paso 1: Registro
```
Usuario descarga cualquier app Nexus
        ↓
Crea cuenta Nexus (email + contraseña)
        ↓
Cuenta sincronizada en servidor central
```

### Paso 2: Ganar Puntos
```
Usuario abre Nexus Ads
        ↓
Inicia sesión con Nexus Account
        ↓
Ve anuncios y videos
        ↓
Acumula puntos (ej: 30 videos = 1 mes premium)
```

### Paso 3: Canjear Puntos
```
Usuario alcanza objetivo de puntos
        ↓
Elige app premium (IG Analyzer o Reminders)
        ↓
Canjea puntos por 1 mes de acceso
        ↓
Servidor registra canje y activa suscripción
```

### Paso 4: Usar App Premium
```
Usuario abre app premium (ej: Nexus IG Analyzer)
        ↓
App verifica con servidor si tiene suscripción
        ↓
Servidor confirma acceso activo
        ↓
App desbloquea todas las funciones
```

## 🔐 Sistema de Autenticación

### Nexus Account
- Email único
- Contraseña segura (hasheada en servidor)
- Token JWT para sesiones
- Sincronización entre apps

### Flujo de Login
```
App → Servidor: POST /api/auth/login (email, password)
Servidor → App: JWT token + User data
App → Almacena token localmente
App → Usa token para futuras requests
```

## 💰 Sistema de Puntos

### Generación de Puntos
- Ver anuncio estático: 1 punto
- Ver video completo: 5 puntos
- Acciones especiales: Puntos bonus

### Canje de Puntos
- 30 puntos = 1 mes de acceso premium
- Canjes se registran en servidor
- Suscripción se activa inmediatamente

### Historial de Puntos
```
Tabla: PointsLog
- user_id
- points_earned / points_spent
- reason (ad_view, video_view, redemption)
- timestamp
- balance_after
```

## 🔗 APIs del Servidor

### Autenticación
```
POST   /api/auth/register        - Crear cuenta
POST   /api/auth/login           - Iniciar sesión
POST   /api/auth/refresh         - Renovar token
POST   /api/auth/logout          - Cerrar sesión
```

### Usuarios
```
GET    /api/users/profile        - Obtener perfil
PUT    /api/users/profile        - Actualizar perfil
GET    /api/users/points         - Obtener puntos
```

### Puntos
```
GET    /api/points/balance       - Saldo actual
GET    /api/points/history       - Historial
POST   /api/points/add           - Agregar puntos (solo servidor)
```

### Suscripciones
```
GET    /api/subscriptions/active - Verificar suscripción
POST   /api/subscriptions/redeem - Canjear puntos
GET    /api/subscriptions/history - Historial
```

## 🛡️ Seguridad

### Protecciones Implementadas
- Contraseñas hasheadas (bcrypt)
- Tokens JWT con expiración
- Validación de entrada en servidor
- Rate limiting en APIs
- HTTPS obligatorio en producción
- CORS configurado correctamente

### Privacidad en Nexus IG Analyzer
- ✅ No requiere contraseña de Instagram
- ✅ Datos procesados localmente en navegador
- ✅ No se almacena información de Instagram
- ✅ Cumple con políticas de privacidad

## 📊 Base de Datos

### Tablas Principales

#### Users
```sql
- user_id (PK)
- email (UNIQUE)
- password_hash
- username
- created_at
- updated_at
```

#### PointsLog
```sql
- log_id (PK)
- user_id (FK)
- points_earned
- points_spent
- reason
- timestamp
- balance_after
```

#### Subscriptions
```sql
- subscription_id (PK)
- user_id (FK)
- app_name (IG_Analyzer, Reminders, etc)
- start_date
- end_date
- is_active
- created_at
```

## 🚀 Despliegue

### Desarrollo Local
```bash
# Clonar todos los repos
git clone https://github.com/Diego-20000/art-programs-studio-server.git
git clone https://github.com/Diego-20000/social-insight-web.git
git clone https://github.com/Diego-20000/geo-prompt-web.git

# Instalar dependencias
cd art-programs-studio-server && npm install
cd ../social-insight-web && npm install
cd ../geo-prompt-web && npm install

# Ejecutar en desarrollo
# Terminal 1: Servidor
cd art-programs-studio-server && npm run dev

# Terminal 2: IG Analyzer
cd social-insight-web && npm run dev

# Terminal 3: Reminders
cd geo-prompt-web && npm run dev
```

### Producción
- Servidor: Heroku, Railway, DigitalOcean
- Apps Web: Vercel, Netlify, Manus
- Base de datos: PostgreSQL, MongoDB
- CDN: Cloudflare, AWS CloudFront

## 📈 Métricas de Éxito

- Usuarios registrados
- Puntos generados vs canjeados
- Tasa de conversión (Ads → Premium)
- Retención de usuarios
- Tiempo promedio en app
- Conversión de suscripciones

## 🔮 Futuro del Ecosistema

### Corto Plazo
- [ ] Integración con proveedores de anuncios reales
- [ ] Cupones y códigos promocionales
- [ ] Análisis de rendimiento

### Mediano Plazo
- [ ] Aplicaciones móviles nativas
- [ ] Más apps premium en el ecosistema
- [ ] Sistema de referidos

### Largo Plazo
- [ ] Marketplace de apps Nexus
- [ ] Monetización para desarrolladores
- [ ] API pública para terceros

---

**Nexus** es un ecosistema en evolución. Cada componente está diseñado para funcionar de forma independiente pero conectado a través del servidor central, creando un valor único para usuarios y desarrolladores.

*Desarrollado por Art Programs Studio*
