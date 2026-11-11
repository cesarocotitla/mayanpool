# Mayan Pool — Landing page

Sitio oficial de **Mayan Pool** (jacuzzis, albercas e ingeniería del agua en Cuernavaca, Morelos).
Se publica en **Vercel** con el dominio **mayanpool.com**, que se administra en **GoDaddy**.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide React · next/font

---

## Estructura

```
app/                 Página, layout, estilos globales, metadatos SEO, sitemap.xml, robots.txt, íconos
components/          Header, Hero, HeroVideo, About, Services, Engineering, Projects,
                     Contact, ContactForm, Footer, WhatsAppButton, MobileQuoteBar…
lib/
  site-config.ts     ← DATOS COMERCIALES (nombre, dominio, servicios, cobertura, video…)
  projects.ts        ← Galería de proyectos
  contact.ts         Enlaces de WhatsApp y correo
  structured-data.ts Schema.org (negocio con área de servicio, sin dirección pública)
lib/assets.ts        Resuelve imágenes/video contra S3 (NEXT_PUBLIC_ASSETS_URL) o /public
public/images/       Copia local de respaldo de logotipos y fotografías (el origen principal es S3)
public/videos/       Solo para pruebas locales; los videos no se versionan (se sirven desde S3)
.env.example         Variables de entorno (WhatsApp, correo, redes)
```

## ⚠️ Datos pendientes

Ningún dato comercial se ha inventado. Mientras no se configuren, el sitio funciona así:

| Dato | Dónde se configura | Mientras falte |
|---|---|---|
| Correo de contacto | `NEXT_PUBLIC_CONTACT_EMAIL` | No se muestra. |
| Instagram / Perfil de Google | `lib/site-config.ts` → `social` (o `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`) | Los íconos no se muestran. Facebook y TikTok ya están configurados. |
| Fotos de proyectos reales | `lib/projects.ts` + bucket `images/projects/` | Se muestran fotografías del diseño, solo con su categoría. |

### Recursos en S3 (imágenes y video)

Las imágenes y el video se sirven desde el bucket **`mayanpool`** (us-east-1), definido en `NEXT_PUBLIC_ASSETS_URL=https://mayanpool.s3.amazonaws.com`. El bucket usa la misma estructura que `/public`:

```
s3://mayanpool/images/…            logotipos, fotos, imagen Open Graph
s3://mayanpool/videos/mayan-pool-hero.webm         (1280 px, ~2.8 MB)
s3://mayanpool/videos/mayan-pool-hero.mp4          (1280 px, ~2.7 MB)
s3://mayanpool/videos/mayan-pool-hero-mobile.mp4   (720 px, ~1 MB)
```

- Las imágenes pasan por `next/image`: Vercel las descarga del bucket, las optimiza (AVIF/WebP, tamaño según el dispositivo) y las guarda en caché.
- El video se sirve directo desde S3.
- Si se borra `NEXT_PUBLIC_ASSETS_URL`, el sitio vuelve a usar las copias locales de `/public/images`. Esas copias se conservan en el repositorio como respaldo.
- El bucket necesita **lectura pública solo para `images/*` y `videos/*`**, más CORS para los dominios del sitio:

```bash
aws s3api put-bucket-policy --bucket mayanpool --profile cluster --policy '{
  "Version":"2012-10-17",
  "Statement":[{"Sid":"PublicReadSiteAssets","Effect":"Allow","Principal":"*",
    "Action":"s3:GetObject",
    "Resource":["arn:aws:s3:::mayanpool/images/*","arn:aws:s3:::mayanpool/videos/*"]}]}'

aws s3api put-bucket-cors --bucket mayanpool --profile cluster --cors-configuration '{
  "CORSRules":[{"AllowedOrigins":["https://mayanpool.com","https://www.mayanpool.com","https://*.vercel.app","http://localhost:3000"],
    "AllowedMethods":["GET","HEAD"],"AllowedHeaders":["*"],
    "ExposeHeaders":["Content-Length","Content-Range","Accept-Ranges"],"MaxAgeSeconds":86400}]}'
```

Para subir o actualizar recursos, usa siempre `Cache-Control` y cambia el nombre del archivo si cambia su contenido:

```bash
aws s3 cp foto.webp s3://mayanpool/images/projects/foto.webp --profile cluster \
  --content-type image/webp --cache-control "public, max-age=31536000, immutable"
```

> Recomendado a futuro: poner **CloudFront** delante del bucket (HTTPS en tu dominio, caché en el borde, HTTP/2) y cambiar `NEXT_PUBLIC_ASSETS_URL` a esa URL. Agrega el nuevo host en `images.remotePatterns` de `next.config.ts`.

### Formulario de contacto

El formulario valida nombre, teléfono a 10 dígitos, tipo de proyecto y mensaje. Al enviarlo, abre **WhatsApp** con la solicitud ya redactada. Si no hay número configurado, abre el **correo**. No necesita servidor ni servicios externos.
Para conectarlo después a un servicio de envío (Resend, Formspree, un CRM, etc.), reemplaza la función `deliver()` en `components/ContactForm.tsx`.

### Video del hero

El video original (`hero_video.mp4`, 14 MB, con audio) se optimizó sin audio a las tres versiones del bucket que aparecen arriba. Así se comporta:

- Se reproduce automáticamente, en silencio, en loop y con `playsInline`.
- Se carga **después** de la página, para no afectar la carga inicial (LCP).
- No se carga si el visitante tiene activado `prefers-reduced-motion` o el ahorro de datos.
- Se pausa cuando el hero sale de la pantalla.
- Mientras carga, o si falla, se ve el póster `public/images/hero-poster.webp`.

Para reemplazarlo, optimízalo con [ffmpeg](https://ffmpeg.org/) con los mismos parámetros que se usaron:

```bash
ffmpeg -i original.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -preset slow -crf 30 \
  -pix_fmt yuv420p -movflags +faststart mayan-pool-hero.mp4
ffmpeg -i original.mp4 -an -vf "scale=1280:-2,fps=24" -c:v libvpx-vp9 -crf 42 -b:v 0 mayan-pool-hero.webm
ffmpeg -i original.mp4 -an -vf "scale=720:-2,fps=24" -c:v libx264 -preset slow -crf 31 \
  -pix_fmt yuv420p -movflags +faststart mayan-pool-hero-mobile.mp4
```

Súbelos a `s3://mayanpool/videos/` con `--content-type video/mp4` (o `video/webm`) y el mismo `--cache-control`. Como se guardan en caché un año, usa un **nombre nuevo** y actualiza `heroVideo` en `lib/site-config.ts`. Si el video cambia de escena, actualiza también el póster (`images/hero-poster.webp`) con su primer cuadro.

---

## 1. Instalar dependencias

Requiere **Node.js 20.9 o superior**.

```bash
npm install
```

## 2. Ejecutar localmente

```bash
cp .env.example .env.local   # y completa los valores reales
npm run dev                  # http://localhost:3000
```

Para verificar la versión de producción:

```bash
npm run build
npm run start
```

## 3. Crear el repositorio en GitHub

1. Repositorio: `https://github.com/cesarocotitla/mayanpool` (ya creado).
2. Desde la carpeta del proyecto:

```bash
git init -b main          # si aún no existe
git add .
git commit -m "Landing Mayan Pool"
git remote add origin https://github.com/cesarocotitla/mayanpool.git
git push -u origin main
```

El archivo `.env.local` está en `.gitignore` y **no** se sube.

## 4. Importar el proyecto en Vercel

1. Entra a [vercel.com](https://vercel.com) → **Add New… → Project**.
2. Conecta tu cuenta de GitHub y selecciona el repositorio `mayanpool`.
3. Vercel detecta **Next.js** automáticamente. No cambies el comando de build (`next build`) ni el directorio de salida.
4. Antes de pulsar **Deploy**, configura las variables de entorno (paso 5).

## 5. Variables de entorno

En Vercel → *Project* → **Settings → Environment Variables**, agrega estas variables para *Production*, *Preview* y *Development*:

| Variable | Ejemplo de formato | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://mayanpool.com` | Sí |
| `NEXT_PUBLIC_ASSETS_URL` | `https://mayanpool.s3.amazonaws.com` | Sí (para usar S3) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `52` + 10 dígitos, solo números | Opcional (por defecto 527777898908) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `contacto@…` | Opcional |
| `NEXT_PUBLIC_FACEBOOK_URL` | URL completa de la página | Opcional (por defecto el de site-config) |
| `NEXT_PUBLIC_INSTAGRAM_URL` | URL completa del perfil | Opcional |
| `NEXT_PUBLIC_TIKTOK_URL` | URL completa del perfil | Opcional (por defecto el de site-config) |
| `NEXT_PUBLIC_GOOGLE_BUSINESS_URL` | Enlace de Google Maps del Perfil de Empresa | Opcional |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código de Search Console | Opcional |

Estas variables se aplican **al compilar**. Si las cambias, ve a **Deployments → ⋯ → Redeploy**.

## 6. Vincular mayanpool.com y www.mayanpool.com (GoDaddy)

1. En Vercel → *Project* → **Settings → Domains**, agrega `mayanpool.com`.
2. Agrega también `www.mayanpool.com`.
3. Vercel mostrará los **registros DNS exactos** que necesita cada dominio: tipo, nombre y valor. Normalmente es un registro `A` para el dominio raíz y un `CNAME` para `www`.
   **Usa exactamente los valores que muestre Vercel.** No copies IPs ni destinos de otras guías, porque pueden cambiar.
4. En GoDaddy → **Mis productos → Dominios → mayanpool.com → DNS → Administrar DNS**:
   - Edita o crea los registros con el **tipo, nombre (`@` o `www`) y valor** que indica Vercel.
   - Elimina los registros `A` o `CNAME` anteriores que entren en conflicto con los mismos nombres. Por ejemplo, el registro «Parked» de GoDaddy o un `CNAME www` que apunte a otro sitio.
   - **No toques** los registros `MX`, `TXT` (SPF/DKIM) ni otros que usen el correo u otros servicios.
5. Regresa a Vercel y espera a que ambos dominios aparezcan como **Valid Configuration**. Puede tardar desde minutos hasta 48 h, según la propagación DNS.

> Alternativa: en lugar de editar registros, puedes cambiar los *nameservers* de GoDaddy a los que te indique Vercel. Hazlo solo si todo el DNS, incluido el correo, se administrará desde Vercel.

## 7. Redirección al dominio principal

El dominio canónico es **`https://mayanpool.com`**, sin www.

1. En **Settings → Domains**, edita `www.mayanpool.com`.
2. Elige **Redirect to** `mayanpool.com` con **308 Permanent Redirect**.
3. Verifica que `mayanpool.com` esté marcado como dominio de producción y **no** redirija a ningún otro.

## 8. Verificar HTTPS y certificado SSL

Vercel emite y renueva automáticamente certificados SSL (Let's Encrypt) en cuanto el DNS es válido. Para comprobarlo:

- Abre `https://mayanpool.com` y revisa el candado del navegador.
- Abre `http://mayanpool.com` y `https://www.mayanpool.com`: ambos deben terminar en `https://mayanpool.com`.
- En la terminal: `curl -I https://www.mayanpool.com` debe responder `308` con `location: https://mayanpool.com/`.
- Si el certificado sigue pendiente, revisa en **Settings → Domains** que no haya errores de DNS.

Después de publicar:

- Registra el sitio en [Google Search Console](https://search.google.com/search-console) y envía `https://mayanpool.com/sitemap.xml`.
- Prueba la vista previa al compartir con el [Sharing Debugger de Facebook](https://developers.facebook.com/tools/debug/). WhatsApp e Instagram usan la misma imagen Open Graph.
- Valida los datos estructurados con la [Prueba de resultados enriquecidos de Google](https://search.google.com/test/rich-results).

## 9. Publicar futuras actualizaciones

Cada `git push` despliega automáticamente:

```bash
git add .
git commit -m "Describe el cambio"
git push                  # main → producción en mayanpool.com
```

- Los cambios en otras ramas o *pull requests* generan una **URL de vista previa** sin afectar el sitio publicado.
- Para revertir, ve a Vercel → **Deployments**, elige una versión anterior y usa **⋯ → Promote to Production**.

---

## Cómo editar contenido

- **Datos del negocio, servicios, cobertura y SEO:** `lib/site-config.ts`
- **Proyectos:** `lib/projects.ts`. Agrega fotos en `public/images/projects/` y completa nombre, ubicación, año y descripción **solo con datos reales**.
- **Textos de secciones:** el componente correspondiente en `components/`.
- **Colores y tipografía:** `app/globals.css` (bloque `@theme`) y `app/layout.tsx`.

Para crecer hacia un sitio corporativo completo, agrega rutas en `app/`, por ejemplo `app/proyectos/[slug]/page.tsx` o `app/servicios/albercas/page.tsx`, y añádelas en `app/sitemap.ts`. Los componentes y la configuración ya son reutilizables.
