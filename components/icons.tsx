import type { SVGProps } from "react";

/**
 * Iconos de marca (Lucide no incluye logotipos de marcas) y
 * pictogramas técnicos propios del sistema visual de Mayan Pool.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  "aria-hidden": true as const,
  focusable: false as const,
  ...props,
});

export function WhatsAppIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(size, props)}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43l-.75-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.75 2.75 0 0 0-.86 2.05 4.78 4.78 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...base(size, props)}>
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} {...base(size, props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </svg>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const capabilityIcons = {
  heat: (p: IconProps) => (
    <svg viewBox="0 0 32 32" {...stroke} {...base(p.size ?? 32, p)}>
      <path d="M14 5a3 3 0 0 1 6 0v13a6 6 0 1 1-6 0Z" />
      <path d="M17 12v10" />
    </svg>
  ),
  automation: (p: IconProps) => (
    <svg viewBox="0 0 32 32" {...stroke} {...base(p.size ?? 32, p)}>
      <rect x="7" y="7" width="18" height="18" rx="3" />
      <rect x="12" y="12" width="8" height="8" rx="1" />
      <path d="M12 3v4M20 3v4M12 25v4M20 25v4M3 12h4M3 20h4M25 12h4M25 20h4" />
    </svg>
  ),
  filtration: (p: IconProps) => (
    <svg viewBox="0 0 32 32" {...stroke} {...base(p.size ?? 32, p)}>
      <path d="M16 4c5 6 8 10 8 14a8 8 0 0 1-16 0c0-4 3-8 8-14Z" />
      <path d="M12 19a4 4 0 0 0 4 4" />
    </svg>
  ),
  hydromassage: (p: IconProps) => (
    <svg viewBox="0 0 32 32" {...stroke} {...base(p.size ?? 32, p)}>
      <circle cx="10" cy="20" r="4" />
      <circle cx="21" cy="14" r="6" />
      <circle cx="22" cy="26" r="2" />
      <circle cx="9" cy="8" r="2" />
    </svg>
  ),
  waterfalls: (p: IconProps) => (
    <svg viewBox="0 0 32 32" {...stroke} {...base(p.size ?? 32, p)}>
      <path d="M5 6h12v4" />
      <path d="M17 10c0 6-2 10-2 16M13 10c0 6 0 10 1 16M9 10c0 5 1 10 2 16" />
      <path d="M4 27h24" />
    </svg>
  ),
  hydraulics: (p: IconProps) => (
    <svg viewBox="0 0 32 32" {...stroke} {...base(p.size ?? 32, p)}>
      <path d="M3 11h9v10h8V11h9" />
      <path d="M3 16h4M25 16h4" />
      <circle cx="16" cy="7" r="2" />
    </svg>
  ),
};

/** Gesto maya: línea escalonada usada solo como separador editorial. */
export function MayanDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1160 24"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
      focusable="false"
      className={`block h-6 w-full ${className}`}
    >
      <path vectorEffect="non-scaling-stroke" d="M0 23.5H500V15.5H530V7.5H560V.5H600V7.5H630V15.5H660V23.5H1160" />
    </svg>
  );
}
