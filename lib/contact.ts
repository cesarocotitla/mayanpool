import { siteConfig } from "./site-config";

export const hasWhatsApp = siteConfig.contact.whatsappNumber.length >= 10;
export const hasEmail = /.+@.+\..+/.test(siteConfig.contact.email);

/** Enlace wa.me con mensaje precargado. Devuelve null si no hay número configurado. */
export function whatsappLink(message: string = siteConfig.contact.whatsappMessage): string | null {
  if (!hasWhatsApp) return null;
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Enlace de WhatsApp o, si no está configurado, ancla al formulario de contacto. */
export function whatsappHref(): string {
  return whatsappLink() ?? "#contacto";
}

export function mailtoLink(subject: string, body: string): string | null {
  if (!hasEmail) return null;
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Atributos para enlaces externos (abren en pestaña nueva). */
export function externalProps(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}
