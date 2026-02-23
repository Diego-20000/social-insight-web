# Guía de Contribución

¡Gracias por tu interés en contribuir a Social Insight! Este documento proporciona pautas y instrucciones para contribuir al proyecto.

## Código de Conducta

Por favor, sé respetuoso y considerado con otros contribuyentes. Esperamos que todos mantengan un ambiente positivo y acogedor.

## Cómo Contribuir

### 1. Reportar Bugs

Si encuentras un bug, por favor abre un [Issue](https://github.com/Diego-20000/social-insight-web/issues) con:

- **Título descriptivo**: Resumen claro del problema
- **Descripción detallada**: Qué pasó, qué esperabas que pasara
- **Pasos para reproducir**: Instrucciones paso a paso
- **Capturas de pantalla**: Si es relevante
- **Información del navegador**: Versión y sistema operativo

### 2. Sugerir Mejoras

Para sugerir nuevas características:

- Abre un [Issue](https://github.com/Diego-20000/social-insight-web/issues) con la etiqueta `enhancement`
- Describe la mejora de forma clara
- Explica por qué sería útil
- Proporciona ejemplos si es posible

### 3. Enviar Pull Requests

#### Preparación

1. Fork el repositorio
2. Clona tu fork: `git clone https://github.com/tu-usuario/social-insight-web.git`
3. Crea una rama: `git checkout -b feature/mi-feature`
4. Instala dependencias: `npm install`

#### Desarrollo

1. Haz cambios en tu rama
2. Prueba localmente: `npm run dev`
3. Asegúrate de que el código sigue el estilo del proyecto
4. Escribe commits claros: `git commit -m "Add: descripción clara del cambio"`

#### Envío

1. Push a tu fork: `git push origin feature/mi-feature`
2. Abre un Pull Request con:
   - Título descriptivo
   - Descripción de cambios
   - Referencia a Issues relacionados (si los hay)
   - Capturas de pantalla si aplica

## Estándares de Código

- **JavaScript**: Usa ES6+, evita var, prefiere const y let
- **CSS**: Usa variables CSS, mantén los estilos organizados
- **Nombres**: Usa camelCase para variables/funciones, kebab-case para clases CSS
- **Comentarios**: Comenta código complejo, mantén comentarios actualizados
- **Funciones**: Mantén funciones pequeñas y enfocadas

## Estructura del Proyecto

```
src/
├── main.js          # Lógica principal
├── analyzer.js      # Análisis de datos
├── charts.js        # Gráficos
├── ui.js            # Interfaz de usuario
└── styles.css       # Estilos
```

## Proceso de Review

1. Tu PR será revisado por los mantenedores
2. Pueden solicitar cambios
3. Una vez aprobado, será mergeado
4. ¡Tu contribución será parte del proyecto!

## Preguntas

Si tienes preguntas, puedes:

- Abrir un [Discussion](https://github.com/Diego-20000/social-insight-web/discussions)
- Revisar la documentación en [README.md](README.md)
- Contactar a los mantenedores

---

**¡Gracias por contribuir a Social Insight!** 🎉
