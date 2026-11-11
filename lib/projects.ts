/**
 * Galería de proyectos.
 *
 * PENDIENTE: sustituir por fotografías de proyectos reales de Mayan Pool.
 * Coloca las fotos en /public/images/projects/ y completa los campos
 * opcionales (nombre, ubicación, año, descripción) solo con datos reales.
 * Los campos vacíos no se muestran.
 */

export type ProjectCategory = "spa" | "alberca" | "ingenieria";

export type Project = {
  image: string;
  alt: string;
  category: ProjectCategory;
  title?: string;
  location?: string;
  year?: string;
  description?: string;
  /** Ocupa el doble de ancho y alto en escritorio. */
  featured?: boolean;
};

export const projectCategories: { id: ProjectCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "spa", label: "Jacuzzis y spas" },
  { id: "alberca", label: "Albercas" },
  { id: "ingenieria", label: "Ingeniería" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  spa: "Jacuzzi / spa",
  alberca: "Alberca",
  ingenieria: "Ingeniería",
};

export const projects: Project[] = [
  {
    image: "/images/spa-exterior-cascadas.webp",
    alt: "Spa exterior con cascadas integrado al jardín",
    category: "spa",
    featured: true,
  },
  {
    image: "/images/hero-poster.webp",
    alt: "Alberca con mosaico y cascadas laterales frente al jardín",
    category: "alberca",
  },
  {
    image: "/images/servicio-ingenieria.webp",
    alt: "Cascadas de acero integradas a muros de piedra",
    category: "ingenieria",
  },
];
