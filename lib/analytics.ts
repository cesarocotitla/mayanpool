/**
 * Medición con Google Tag Manager.
 *
 * Las conversiones de Google Ads se configuran DENTRO de GTM (no se usa gtag.js
 * directamente en el sitio) para evitar duplicados. El sitio solo publica
 * eventos en `dataLayer`.
 */

/** Contenedor de GTM (se puede sobrescribir con NEXT_PUBLIC_GTM_ID; el valor "off" lo desactiva). */
const rawGtmId = (process.env.NEXT_PUBLIC_GTM_ID ?? "").trim();
export const GTM_ID = rawGtmId.toLowerCase() === "off" ? "" : rawGtmId || "GTM-N2CK23J3";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function pushEvent(payload: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * Clic en WhatsApp (activador de la conversión «Contacto» en GTM).
 * No incluye datos personales: solo el método de contacto y la ruta de la página.
 */
export function trackWhatsAppClick() {
  pushEvent({
    event: "whatsapp_click",
    contact_method: "whatsapp",
    source_page: window.location.pathname,
  });
}

/** ¿El enlace apunta a WhatsApp? */
export function isWhatsAppUrl(href: string): boolean {
  try {
    const { hostname } = new URL(href, window.location.href);
    return hostname === "wa.me" || hostname === "api.whatsapp.com" || hostname === "web.whatsapp.com";
  } catch {
    return false;
  }
}
