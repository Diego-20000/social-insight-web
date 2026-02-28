# Guía de Contribución

¡Gracias por tu interés en contribuir a ArtPrograms Studio! Este documento proporciona directrices para contribuir al proyecto.

## Cómo Contribuir

### 1. Fork el Repositorio

Crea un fork del repositorio en tu cuenta de GitHub.

### 2. Clonar tu Fork

```bash
git clone https://github.com/tu-usuario/social-insight-web.git
cd social-insight-web
```

### 3. Crear una Rama

```bash
git checkout -b feature/nombre-de-tu-feature
```

### 4. Realizar Cambios

Realiza tus cambios siguiendo los estándares de código del proyecto.

### 5. Commit

```bash
git commit -m "Descripción clara de los cambios"
```

### 6. Push

```bash
git push origin feature/nombre-de-tu-feature
```

### 7. Pull Request

Abre un Pull Request en el repositorio original con una descripción clara de los cambios.

## Estándares de Código

### TypeScript

- Usa tipos explícitos siempre que sea posible
- Evita `any`
- Comenta código complejo

### React

- Usa componentes funcionales
- Prefiere hooks sobre clases
- Mantén componentes pequeños y reutilizables

### Estilos

- Usa Tailwind CSS para estilos
- Sigue la paleta de colores del proyecto
- Mantén consistencia visual

### Commits

- Usa mensajes claros y descriptivos
- Referencia issues cuando sea relevante
- Sigue el formato: `tipo: descripción`

Tipos de commit:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `test`: Adición de tests
- `chore`: Cambios en configuración

## Proceso de Review

1. Tu PR será revisado por los mantenedores
2. Se pueden solicitar cambios
3. Una vez aprobado, será mergeado

## Reportar Bugs

1. Verifica que el bug no haya sido reportado
2. Abre un issue con:
   - Descripción clara del bug
   - Pasos para reproducir
   - Comportamiento esperado
   - Comportamiento actual
   - Capturas de pantalla si es relevante

## Sugerir Mejoras

1. Abre un issue con la etiqueta `enhancement`
2. Describe la mejora propuesta
3. Explica por qué sería útil

## Licencia

Al contribuir, aceptas que tu código será licenciado bajo la licencia MIT del proyecto.

---

¡Gracias por contribuir!
