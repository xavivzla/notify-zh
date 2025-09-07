# Deploy de Website en Vercel

Esta guía explica cómo desplegar solo la carpeta `website` en Vercel.

## Método 1: Deploy desde la carpeta website (Recomendado)

### Paso 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

### Paso 2: Navegar a la carpeta website
```bash
cd website
```

### Paso 3: Hacer login en Vercel
```bash
vercel login
```

### Paso 4: Deploy inicial
```bash
vercel
```

Sigue las instrucciones:
- **Set up and deploy**: Selecciona `Y`
- **Which scope**: Selecciona tu cuenta/organización
- **Link to existing project**: Selecciona `N` (para crear nuevo proyecto)
- **Project name**: `notify-zh-website` (o el nombre que prefieras)
- **In which directory is your code located**: `.` (punto, ya que estás en la carpeta website)
- **Want to override the settings**: Selecciona `N` (Vercel detectará automáticamente Astro)

### Paso 5: Deploy de producción
```bash
vercel --prod
```

## Método 2: Deploy desde el repositorio root

Si prefieres hacer deploy desde la raíz del proyecto:

### Paso 1: Crear proyecto en Vercel Dashboard
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio GitHub
3. En la configuración del proyecto:
   - **Root Directory**: `website`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Configuración Automática

El archivo `vercel.json` ya está configurado con:
- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Variables de Entorno (si es necesario)

Si tu proyecto necesita variables de entorno:

1. En Vercel Dashboard → Project Settings → Environment Variables
2. O usando CLI:
```bash
vercel env add VARIABLE_NAME
```

## Comandos Útiles

```bash
# Ver deployments
vercel ls

# Ver logs del último deployment
vercel logs

# Eliminar deployment
vercel rm [deployment-url]

# Ver información del proyecto
vercel inspect
```

## Dominio Personalizado

Para agregar un dominio personalizado:

1. En Vercel Dashboard → Project Settings → Domains
2. O usando CLI:
```bash
vercel domains add tu-dominio.com
```

## Notas Importantes

- El deploy se hace solo de la carpeta `website`, no del proyecto completo
- Vercel detectará automáticamente que es un proyecto Astro
- Los builds se ejecutarán en Node.js 18+ automáticamente
- El sitio estará disponible en una URL como `https://notify-zh-website.vercel.app`

## Troubleshooting

### Error de build
- Verifica que `npm run build` funcione localmente
- Revisa los logs con `vercel logs`

### Error de dependencias
- Asegúrate de que `package.json` tenga todas las dependencias necesarias
- Verifica que `package-lock.json` esté incluido en el repositorio