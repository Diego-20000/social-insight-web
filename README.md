# Social Insight 📊
https://Diego-20000.github.io/social-insight-web/
**Herramienta de análisis profundo de datos de Instagram**

Social Insight es una aplicación web que te permite analizar y visualizar tus datos exportados de Instagram. Descubre quién no te sigue de vuelta, estadísticas detalladas y más, sin necesidad de compartir tu contraseña.

## Características

✨ **Análisis Completo**
- Visualiza tus seguidores y cuentas que sigues
- Identifica quién no te sigue de vuelta
- Descubre quién te sigue pero no lo sigues
- Estadísticas detalladas con gráficos interactivos

📊 **Visualización de Datos**
- Gráficos interactivos con Chart.js
- Distribución de relaciones en gráfico de dona
- Análisis de seguimiento en gráfico de barras

📥 **Exportación de Datos**
- Descarga listas en formato CSV
- Fácil integración con otras herramientas

🔍 **Búsqueda y Filtrado**
- Busca usuarios en tiempo real
- Filtra resultados instantáneamente

## Cómo usar

### 1. Exportar datos de Instagram

1. Abre Instagram en tu navegador
2. Ve a Configuración → Descargar tu información
3. Selecciona "JSON" como formato
4. Descarga tu archivo de datos

### 2. Cargar datos en Social Insight

1. Abre la aplicación web
2. Haz clic en "Selecciona archivo JSON"
3. Elige el archivo `connections.json` de tu descarga
4. ¡Espera a que se procesen los datos!

### 3. Analizar resultados

- Visualiza tus estadísticas en tarjetas
- Explora los gráficos interactivos
- Busca usuarios específicos en las listas
- Descarga listas como CSV

## Estructura del Proyecto

```
social-insight-web/
├── index.html              # Página principal
├── package.json            # Dependencias
├── README.md              # Este archivo
├── src/
│   ├── main.js            # Lógica principal
│   ├── analyzer.js        # Análisis de datos
│   ├── charts.js          # Gráficos
│   ├── ui.js              # Interfaz de usuario
│   └── styles.css         # Estilos
└── public/                # Archivos estáticos
```

## Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/Diego-20000/social-insight-web.git
cd social-insight-web

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualización**: Chart.js
- **Build**: Vite
- **Estilos**: CSS personalizado con variables

## Características de Datos

La aplicación procesa los siguientes datos de tu exportación de Instagram:

- **Followers**: Lista completa de seguidores
- **Following**: Lista de cuentas que sigues
- **Blocked Profiles**: Perfiles bloqueados
- **Restricted Profiles**: Perfiles restringidos
- **Pending Requests**: Solicitudes pendientes
- **Recent Requests**: Solicitudes recientes

## Privacidad

⚠️ **Importante**: 
- Todos los datos se procesan **localmente** en tu navegador
- No se envía información a servidores externos
- Los datos no se almacenan permanentemente
- Solo se usan para análisis dentro de la sesión

## Limitaciones

- El archivo JSON debe ser válido
- Se requiere navegador moderno (Chrome, Firefox, Safari, Edge)
- Máximo de usuarios procesables depende de la memoria del navegador

## Roadmap

- [ ] Análisis de tendencias temporales
- [ ] Comparación de períodos
- [ ] Exportación de reportes PDF
- [ ] Análisis de hashtags
- [ ] Integración con API de Instagram (si es posible)
- [ ] Aplicación móvil

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## Empresa

**Art Programs Studio** - [GitHub](https://github.com/Diego-20000)

---



## Soporte

Si encuentras problemas o tienes sugerencias, por favor abre un [Issue](https://github.com/Diego-20000/social-insight-web/issues).

---

**Hecho con ❤️ para analistas de redes sociales**
