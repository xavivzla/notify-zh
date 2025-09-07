# Guía de Deploy para notify-zh

Esta guía explica cómo usar los scripts de deploy para publicar la librería notify-zh en npm.

## Scripts Disponibles

### Scripts de Versionado
```bash
# Incrementar versión patch (1.0.1 -> 1.0.2)
npm run version:patch

# Incrementar versión minor (1.0.1 -> 1.1.0)
npm run version:minor

# Incrementar versión major (1.0.1 -> 2.0.0)
npm run version:major
```

### Scripts de Deploy
```bash
# Hacer un dry-run (simular publicación sin publicar)
npm run deploy:dry

# Publicar en npm
npm run deploy
```

## Proceso de Deploy Completo

1. **Asegúrate de que todos los cambios estén commiteados**
   ```bash
   git status
   git add .
   git commit -m "Descripción de cambios"
   ```

2. **Ejecuta los tests**
   ```bash
   npm test
   ```

3. **Incrementa la versión según el tipo de cambio**
   ```bash
   # Para bug fixes
   npm run version:patch
   
   # Para nuevas features
   npm run version:minor
   
   # Para breaking changes
   npm run version:major
   ```

4. **Haz un dry-run para verificar que todo esté correcto**
   ```bash
   npm run deploy:dry
   ```

5. **Si el dry-run es exitoso, publica en npm**
   ```bash
   npm run deploy
   ```

6. **Push los cambios al repositorio**
   ```bash
   git push
   git push --tags
   ```

## Qué hace cada script

- **`prepublishOnly`**: Se ejecuta automáticamente antes de publicar. Ejecuta tests y build.
- **`deploy`**: Ejecuta prepublishOnly y luego publica en npm.
- **`deploy:dry`**: Simula la publicación sin publicar realmente.
- **`version:*`**: Incrementa la versión en package.json y crea un tag de git.

## Requisitos

- Estar logueado en npm: `npm login`
- Tener permisos de publicación en el paquete notify-zh
- Todos los tests deben pasar
- El build debe ser exitoso