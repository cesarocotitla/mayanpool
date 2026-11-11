import { siteConfig } from "./site-config";
import { whatsappLink } from "./contact";

export type SocialId = "facebook" | "instagram" | "tiktok" | "google" | "whatsapp";

export type SocialLink = { id: SocialId; label: string; href: string };

/** Enlaces sociales configurados (los vacíos se omiten). */
export function socialLinks({ includeWhatsApp = true } = {}): SocialLink[] {
  const { facebook, instagram, tiktok, google } = siteConfig.social;
  const wa = includeWhatsApp ? whatsappLink() : null;
  const links: (SocialLink | false | null | "")[] = [
    facebook && { id: "facebook", label: "Facebook", href: facebook },
    instagram && { id: "instagram", label: "Instagram", href: instagram },
    tiktok && { id: "tiktok", label: "TikTok", href: tiktok },
    google && { id: "google", label: "Google", href: google },
    wa && { id: "whatsapp", label: "WhatsApp", href: wa },
  ];
  return links.filter(Boolean) as SocialLink[];
}
