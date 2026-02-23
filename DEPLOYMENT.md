# Guía de Despliegue - Social Insight

## 🚀 Despliegue en GitHub Pages

Social Insight está configurado para desplegarse automáticamente en GitHub Pages.

### Configuración Automática

El proyecto incluye:
- ✅ Base URL configurada para `/social-insight-web/`
- ✅ Build optimizado para producción
- ✅ Archivos estáticos servidos correctamente

### Pasos para Desplegar

#### 1. Habilitar GitHub Pages en tu Repositorio

1. Ve a **Settings** → **Pages**
2. En "Build and deployment":
   - **Source**: Selecciona "Deploy from a branch"
   - **Branch**: Selecciona `main` y `/root`
3. Haz clic en **Save**

#### 2. Construir el Proyecto

```bash
# Instalar dependencias
npm install

# Compilar para producción
npm run build
```

#### 3. Subir los Cambios a GitHub

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 4. Esperar el Despliegue

GitHub Pages tardará unos minutos en desplegar. Una vez completado, tu aplicación estará disponible en:

```
https://Diego-20000.github.io/social-insight-web/
```

---

## 📋 Verificar el Despliegue

### En GitHub

1. Ve a tu repositorio
2. Abre la pestaña **Actions**
3. Busca el workflow de despliegue
4. Verifica que el estado sea ✅ (verde)

### En tu Navegador

Visita: `https://Diego-20000.github.io/social-insight-web/`

Si ves la aplicación cargando correctamente, ¡el despliegue fue exitoso! 🎉

---

## 🔧 Solución de Problemas

### La aplicación no carga

**Problema**: Ves una página en blanco o errores en la consola

**Solución**:
1. Abre DevTools (F12)
2. Verifica que no haya errores en la consola
3. Comprueba que la URL sea correcta: `/social-insight-web/`
4. Limpia el caché del navegador (Ctrl+Shift+Del)

### Los archivos no se encuentran

**Problema**: Errores 404 para CSS o JS

**Solución**:
- Verifica que `vite.config.js` tenga `base: '/social-insight-web/'`
- Reconstruye: `npm run build`
- Vuelve a subir: `git push origin main`

### GitHub Pages no está habilitado

**Problema**: No ves la opción de Pages en Settings

**Solución**:
1. Verifica que el repositorio sea público
2. Ve a Settings → Pages
3. Selecciona "Deploy from a branch"
4. Elige `main` branch

---

## 📦 Despliegue Manual en dist/

Si prefieres desplegar manualmente:

```bash
# 1. Compilar
npm run build

# 2. Los archivos compilados están en ./dist/

# 3. Subir contenido de dist/ a tu hosting
```

---

## 🌐 Despliegue en Otros Hosting

### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Desplegar
netlify deploy --prod --dir=dist
```

### Heroku

```bash
# Crear app
heroku create social-insight

# Desplegar
git push heroku main
```

---

## ✅ Checklist de Despliegue

- [ ] Repositorio es público
- [ ] GitHub Pages está habilitado
- [ ] `vite.config.js` tiene `base: '/social-insight-web/'`
- [ ] `npm run build` funciona sin errores
- [ ] Archivos en `dist/` están listos
- [ ] Push a `main` branch completado
- [ ] GitHub Actions completó el despliegue
- [ ] Aplicación es accesible en la URL pública

---

**¡Tu aplicación está lista para el mundo!** 🌍

Para más información, visita:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
