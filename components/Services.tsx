import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/site-config";
import { asset } from "@/lib/assets";

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="bg-mist py-24 lg:py-[120px]">
      <div className="container-mp">
        <div className="mb-14 grid grid-cols-1 items-end gap-x-6 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              id="servicios-title"
              eyebrow="Soluciones"
              title="Un mismo equipo, del concepto a la puesta en marcha."
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-[17px] leading-[1.7] text-stone">
              Integramos diseño, obra y equipamiento en un solo proceso, para que cada espacio acuático funcione
              tan bien como se ve.
            </p>
          </Reveal>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {siteConfig.services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 0.08}>
              <a
                href="#contacto"
                data-service={service.id}
                className="group relative block aspect-[4/5] overflow-hidden rounded bg-night text-white no-underline"
              >
                <Image
                  src={asset(service.image)}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-water group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,26,40,0)_35%,rgba(7,26,40,.9)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  <span className="font-display text-[13px] font-medium tracking-[0.16em] text-aqua">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-2.5 mt-3.5 font-display text-[26px] font-semibold leading-[1.15] sm:text-[28px]">
                    {service.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-white/85">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-[13px] font-semibold tracking-[0.08em] transition-[gap] duration-300 group-hover:gap-3.5">
                    {service.cta}
                    <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
