import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { asset, usesRemoteAssets } from "@/lib/assets";
import HeroVideo, { type VideoSource } from "./HeroVideo";

/**
 * Fuentes del video del hero.
 * - Origen remoto (S3/CDN): se usan las rutas configuradas.
 * - Origen local: solo las que existen en /public (se evalúa en el build).
 */
function availableVideoSources(): { sources: VideoSource[]; mobile?: string } {
  const { webm, mp4, mp4Mobile } = siteConfig.heroVideo;
  const exists = (p: string) =>
    usesRemoteAssets || fs.existsSync(path.join(process.cwd(), "public", p));
  const sources: VideoSource[] = [];
  if (exists(webm)) sources.push({ src: asset(webm), type: "video/webm" });
  if (exists(mp4)) sources.push({ src: asset(mp4), type: "video/mp4" });
  return { sources, mobile: exists(mp4Mobile) ? asset(mp4Mobile) : undefined };
}

export default function Hero() {
  const { sources, mobile } = availableVideoSources();

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden bg-night sm:min-h-[760px] lg:min-h-[880px]"
    >
      {/* Póster: es la imagen LCP y el respaldo si el video no carga */}
      <Image
        src={asset(siteConfig.heroVideo.poster)}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover"
      />
      {sources.length > 0 && <HeroVideo sources={sources} mobileSrc={mobile} />}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,40,.72)_0%,rgba(7,26,40,.28)_34%,rgba(7,26,40,.45)_62%,rgba(7,26,40,.92)_100%)]"
      />

      <div className="relative z-10 flex grow items-end pb-28 pt-32 sm:pb-[72px]">
        <div className="container-mp">
          <p className="eyebrow mb-7 flex items-center gap-3.5 leading-snug text-aqua">
            <span aria-hidden className="inline-block h-px w-10 shrink-0 bg-aqua" />
            {siteConfig.location.city}, {siteConfig.location.region} · Ingeniería del agua
          </p>
          <h1
            id="hero-title"
            className="max-w-[980px] font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl lg:text-[80px] lg:leading-[1.02]"
          >
            Transformamos el agua en experiencias extraordinarias.
          </h1>
          <p className="mt-7 max-w-[600px] text-[17px] leading-relaxed text-white/85 sm:text-[19px]">
            Diseño, construcción e ingeniería especializada para albercas, jacuzzis y espacios acuáticos.
          </p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <a href="#contacto" className="btn-primary">
              Solicitar cotización
              <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
            </a>
            <a href="#servicios" className="btn-ghost">
              Explorar servicios
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-white/20 pt-6 sm:mt-[72px]">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-display text-xs font-medium uppercase tracking-[0.14em] text-white/75 sm:text-[13px]">
              {siteConfig.services.map((s, i) => (
                <li key={s.id}>
                  {String(i + 1).padStart(2, "0")} · {s.title}
                </li>
              ))}
            </ul>
            <span
              aria-hidden
              className="hidden items-center gap-3 font-display text-xs font-medium uppercase tracking-[0.2em] text-white/75 sm:flex"
            >
              Desliza
              <span className="inline-block h-9 w-px bg-gradient-to-b from-aqua to-transparent" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
