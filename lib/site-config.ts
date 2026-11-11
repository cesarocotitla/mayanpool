/**
 * ─────────────────────────────────────────────────────────────
 *  MAYAN POOL — Configuración comercial centralizada
 * ─────────────────────────────────────────────────────────────
 *  Edita este archivo para cambiar los datos del negocio.
 *
 *  Los datos de contacto (WhatsApp, correo, redes) se leen de
 *  variables de entorno para poder cambiarlos desde Vercel sin
 *  tocar el código. Ver `.env.example`.
 *
 *  ⚠️  No se ha inventado ningún dato: todo lo marcado como
 *      PENDIENTE debe ser proporcionado por Mayan Pool.
 * ─────────────────────────────────────────────────────────────
 */

const env = (value: string | undefined) => (value ?? "").trim();

export type ServiceId = "spa" | "alberca" | "ingenieria";

export const siteConfig = {
  /** Nombre comercial */
  name: "Mayan Pool",
  tagline: "Spa · Albercas · Ingeniería del agua",
  slogan: "Ingeniería que transforma el agua.",

  /** Dominio principal (canonical). */
  domain: "mayanpool.com",
  url: (env(process.env.NEXT_PUBLIC_SITE_URL) || "https://mayanpool.com").replace(/\/$/, ""),

  /** SEO */
  seo: {
    title: "Mayan Pool | Jacuzzis, Albercas e Ingeniería del Agua en Cuernavaca",
    description:
      "Diseño, construcción y remodelación de jacuzzis, spas y albercas en Cuernavaca, Morelos. Climatización, filtración, automatización e ingeniería hidráulica. Solicita tu cotización.",
    keywords: [
      "jacuzzis Cuernavaca",
      "albercas Cuernavaca",
      "construcción de albercas Morelos",
      "remodelación de albercas",
      "spas Cuernavaca",
      "climatización de albercas",
      "ingeniería del agua",
      "Mayan Pool",
    ],
    locale: "es_MX",
    ogImage: "/images/og-mayan-pool.jpg",
  },

  /** Contacto. Las variables de entorno, si existen, tienen prioridad. */
  contact: {
    /** WhatsApp: 52 (México) + 10 dígitos. Número: 777 789 8908. */
    whatsappNumber: (env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) || "527777898908").replace(/\D/g, ""),
    whatsappMessage:
      "Hola, visité mayanpool.com y me gustaría recibir información sobre un proyecto",
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },

  /** Redes sociales — vacías = no se muestran */
  social: {
    facebook: env(process.env.NEXT_PUBLIC_FACEBOOK_URL),
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  },

  /**
   * Ubicación y cobertura.
   * Empresa de servicio a domicilio: NO se publica dirección física.
   */
  location: {
    city: "Cuernavaca",
    region: "Morelos",
    regionCode: "MOR",
    country: "MX",
    serviceAreaLabel: "Cuernavaca, Morelos y alrededores.",
  },

  /** Servicios principales */
  services: [
    {
      id: "spa" as ServiceId,
      title: "Jacuzzis y spas",
      description: "Diseño, construcción y equipamiento de espacios de relajación e hidromasaje.",
      cta: "Cotizar spa",
      image: "/images/servicio-jacuzzi.webp",
      imageAlt: "Jacuzzi con hidromasaje en funcionamiento",
    },
    {
      id: "alberca" as ServiceId,
      title: "Albercas",
      description:
        "Diseño, construcción, remodelación y modernización de albercas residenciales y comerciales.",
      cta: "Cotizar alberca",
      image: "/images/servicio-alberca.webp",
      imageAlt: "Alberca con mosaico y bordes de cantera",
    },
    {
      id: "ingenieria" as ServiceId,
      title: "Ingeniería del agua",
      description:
        "Soluciones hidráulicas, filtración, climatización, tratamiento, automatización y sistemas especializados.",
      cta: "Consultar solución",
      image: "/images/servicio-ingenieria.webp",
      imageAlt: "Cascadas de acero integradas a muros de piedra",
    },
  ],

  /** Opciones del formulario de cotización */
  projectTypes: [
    "Jacuzzi o spa",
    "Alberca nueva",
    "Remodelación de alberca",
    "Ingeniería del agua",
    "Otro",
  ],

  /**
   * Video del hero. Se sirve desde NEXT_PUBLIC_ASSETS_URL (bucket S3) o,
   * sin esa variable, desde /public/videos/ si los archivos existen.
   * Si no hay video disponible, se muestra únicamente el póster.
   */
  heroVideo: {
    webm: "/videos/mayan-pool-hero.webm",
    mp4: "/videos/mayan-pool-hero.mp4",
    /** Versión ligera opcional para móviles (≤ 768 px). */
    mp4Mobile: "/videos/mayan-pool-hero-mobile.mp4",
    poster: "/images/hero-poster.webp",
  },
} as const;

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
] as const;

export type SiteConfig = typeof siteConfig;
