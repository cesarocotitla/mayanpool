/**
 * Origen de los recursos (imágenes y video).
 *
 * - Con `NEXT_PUBLIC_ASSETS_URL` (ej. bucket S3 o CloudFront) los recursos se
 *   sirven desde ahí: `/images/logo.webp` → `https://…/images/logo.webp`.
 * - Sin la variable, se usan las copias locales de `/public`.
 *
 * En el bucket se respeta la misma estructura de carpetas que en `/public`
 * (`images/…`, `videos/…`), así que cambiar de origen no requiere tocar código.
 */
export const assetsBaseUrl = (process.env.NEXT_PUBLIC_ASSETS_URL ?? "").trim().replace(/\/$/, "");

export const usesRemoteAssets = assetsBaseUrl.length > 0;

/** Resuelve la ruta de un recurso (`/images/…`, `/videos/…`) contra el origen configurado. */
export function asset(path: string): string {
  if (!usesRemoteAssets || /^https?:\/\//.test(path)) return path;
  return `${assetsBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** URL absoluta (para Open Graph y Schema.org). */
export function absoluteAsset(path: string, siteUrl: string): string {
  const resolved = asset(path);
  return /^https?:\/\//.test(resolved) ? resolved : `${siteUrl}${resolved}`;
}
