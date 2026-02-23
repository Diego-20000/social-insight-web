# Guía Rápida - Social Insight

## 🚀 Inicio Rápido en 5 minutos

### 1. Clonar el repositorio
```bash
git clone https://github.com/Diego-20000/social-insight-web.git
cd social-insight-web
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

### 4. Cargar datos de Instagram

1. **Exportar datos desde Instagram:**
   - Ve a tu perfil de Instagram
   - Configuración → Privacidad y seguridad
   - Descargar tu información
   - Selecciona "JSON" como formato
   - Descarga tu archivo

2. **Cargar en Social Insight:**
   - Haz clic en "Selecciona archivo JSON"
   - Elige el archivo `connections.json` de tu descarga
   - ¡Espera a que se procesen los datos!

### 5. Explorar resultados

- 📊 Visualiza tus estadísticas en tarjetas
- 📈 Explora gráficos interactivos
- 🔍 Busca usuarios específicos
- 📥 Descarga listas en CSV

---

## 📦 Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

---

## 🧪 Probar con Datos de Ejemplo

Se incluye un archivo `example-data.json` para pruebas rápidas:

1. Abre la aplicación
2. Carga el archivo `example-data.json`
3. ¡Verás datos de ejemplo al instante!

---

## 🔧 Troubleshooting

### El puerto 5173 está en uso
```bash
npm run dev -- --port 3000
```

### Errores al procesar JSON
- Asegúrate de que el archivo sea un JSON válido
- Verifica que sea el archivo `connections.json` de Instagram
- Intenta con el archivo de ejemplo primero

### Problemas de compatibilidad
- Usa un navegador moderno (Chrome, Firefox, Safari, Edge)
- Limpia el caché del navegador
- Abre las DevTools (F12) para ver errores

---

## 📚 Más Información

- [README.md](README.md) - Documentación completa
- [CONTRIBUTING.md](CONTRIBUTING.md) - Cómo contribuir
- [GitHub Issues](https://github.com/Diego-20000/social-insight-web/issues) - Reportar problemas

---

¡Disfruta analizando tus datos de Instagram! 📊✨
