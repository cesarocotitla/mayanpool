import { siteConfig } from "./site-config";
import { hasEmail, hasWhatsApp } from "./contact";
import { absoluteAsset } from "./assets";

/**
 * Schema.org para negocio de servicio a domicilio (Service Area Business):
 * - Sin dirección de calle (no hay establecimiento abierto al público).
 * - `areaServed` define la cobertura.
 */
export function buildStructuredData() {
  const { url, name, location, contact, social, services, seo } = siteConfig;
  const sameAs = [social.facebook, social.instagram].filter(Boolean);

  const business: Record<string, unknown> = {
    "@type": "HomeAndConstructionBusiness",
    "@id": `${url}/#business`,
    name,
    description: seo.description,
    slogan: siteConfig.slogan,
    url,
    logo: absoluteAsset("/images/logo-mayan-pool.webp", url),
    image: absoluteAsset(seo.ogImage, url),
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    areaServed: [
      { "@type": "City", name: `${location.city}, ${location.region}` },
      { "@type": "State", name: location.region },
    ],
    knowsAbout: ["Jacuzzis", "Spas", "Albercas", "Ingeniería hidráulica", "Climatización de albercas"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          areaServed: `${location.city}, ${location.region}`,
        },
      })),
    },
  };

  if (hasWhatsApp) business.telephone = `+${contact.whatsappNumber}`;
  if (hasEmail) business.email = contact.email;
  if (sameAs.length) business.sameAs = sameAs;

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name,
        inLanguage: "es-MX",
        publisher: { "@id": `${url}/#business` },
      },
    ],
  };
}
