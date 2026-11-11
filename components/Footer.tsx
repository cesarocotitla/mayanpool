import Image from "next/image";
import { navLinks, siteConfig } from "@/lib/site-config";
import { externalProps, whatsappLink } from "@/lib/contact";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./icons";
import { asset } from "@/lib/assets";

export default function Footer() {
  const wa = whatsappLink();
  const socials = [
    siteConfig.social.facebook && { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
    siteConfig.social.instagram && { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
    wa && { href: wa, label: "WhatsApp", Icon: WhatsAppIcon },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof FacebookIcon }[];

  return (
    <footer className="bg-white pb-28 pt-[72px] sm:pb-9">
      <div className="container-mp">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <a href="#inicio" aria-label="Mayan Pool, ir al inicio" className="block leading-none">
            <Image
              src={asset("/images/logo-mayan-pool.webp")}
              alt="Mayan Pool — Spa · Albercas · Ingeniería del agua"
              width={840}
              height={571}
              sizes="220px"
              className="h-auto w-[200px] sm:w-[220px]"
            />
          </a>
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-7 gap-y-4 font-display text-sm font-medium">
              {navLinks
                .filter((l) => l.href !== "#inicio")
                .map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-abyss no-underline hover:text-teal-text">
                      {l.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
          {socials.length > 0 && (
            <ul className="flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...externalProps(href)}
                    aria-label={`${siteConfig.name} en ${label}`}
                    className="flex size-11 items-center justify-center rounded-full border border-field text-abyss transition-colors hover:border-teal hover:text-teal-text"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-[13px] leading-normal text-slate">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </span>
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.24em]">
            {siteConfig.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
