"use client";

import { useEffect } from "react";
import { isWhatsAppUrl, trackWhatsAppClick } from "@/lib/analytics";

/**
 * Registra `whatsapp_click` en cualquier enlace a WhatsApp del sitio
 * (botón flotante, sección de contacto, pie de página y los que se agreguen después),
 * mediante un único listener delegado. No altera la navegación del enlace.
 */
export default function WhatsAppClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Clic principal o clic central (abrir en pestaña nueva); un evento por clic.
      if (e.type === "auxclick" && e.button !== 1) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (link && isWhatsAppUrl(link.href)) trackWhatsAppClick();
    };
    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("auxclick", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      document.removeEventListener("auxclick", onClick, { capture: true });
    };
  }, []);

  return null;
}
