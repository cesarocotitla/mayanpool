import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { capabilityIcons } from "./icons";
import { asset } from "@/lib/assets";

const capabilities = [
  {
    icon: capabilityIcons.heat,
    title: "Climatización y bombas de calor",
    text: "Temperatura estable todo el año, con equipos dimensionados para el volumen y el uso real.",
  },
  {
    icon: capabilityIcons.automation,
    title: "Automatización y control inteligente",
    text: "Iluminación, filtración, temperatura y efectos desde un tablero o el celular.",
  },
  {
    icon: capabilityIcons.filtration,
    title: "Filtración y tratamiento del agua",
    text: "Agua cristalina y segura con sistemas de filtrado, sanitización y equilibrio químico.",
  },
  {
    icon: capabilityIcons.hydromassage,
    title: "Sistemas de hidromasaje",
    text: "Jets, sopladores y distribución hidráulica calibrados para un masaje uniforme.",
  },
  {
    icon: capabilityIcons.waterfalls,
    title: "Fuentes, cascadas y efectos acuáticos",
    text: "Láminas, cortinas y chorros que convierten el movimiento del agua en arquitectura.",
  },
  {
    icon: capabilityIcons.hydraulics,
    title: "Soluciones hidráulicas especializadas",
    text: "Diagnóstico y corrección de fugas, presiones, retornos y desafíos hidráulicos complejos.",
  },
];

const steps = [
  { title: "Diagnóstico", text: "Visitamos el sitio y entendemos el uso, el espacio y las condiciones técnicas." },
  { title: "Ingeniería y diseño", text: "Proyecto hidráulico, selección de equipos y propuesta de diseño." },
  { title: "Construcción", text: "Obra, instalación y equipamiento con supervisión técnica continua." },
  { title: "Puesta en marcha", text: "Pruebas, ajustes y capacitación para operar tu sistema con confianza." },
];

export default function Engineering() {
  return (
    <section id="ingenieria" aria-labelledby="ingenieria-title" className="bg-night py-24 text-white lg:py-[130px]">
      <div className="container-mp">
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="ingenieria-title"
              tone="dark"
              eyebrow="Ingeniería que transforma"
              title="La tecnología detrás de cada experiencia."
            />
            <p className="mt-7 text-[17px] leading-[1.75] text-white/75">
              Lo que no se ve es lo que hace extraordinario a un espacio acuático. Diseñamos la hidráulica, el
              equipamiento y el control de cada proyecto con el mismo cuidado que su apariencia.
            </p>
            <div className="relative mt-11 aspect-[4/3] overflow-hidden rounded">
              <Image
                src={asset("/images/ingenieria-spa-cascadas.webp")}
                alt="Cascadas y spa en operación"
                fill
                sizes="(min-width: 1024px) 470px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:col-span-7">
            {capabilities.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={(i % 2) * 0.08}
                className={`border-b border-white/15 py-9 ${
                  i % 2 === 0 ? "sm:pr-7" : "sm:border-l sm:pl-7"
                }`}
              >
                <Icon size={32} className="text-teal" />
                <h3 className="mb-2.5 mt-5 font-display text-[19px] font-semibold leading-snug">{title}</h3>
                <p className="text-[15px] leading-[1.65] text-white/70">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20 lg:mt-24">
          <h3 className="eyebrow mb-7 text-white/65">Cómo trabajamos</h3>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.08}
                className={`border-t-2 pt-5 ${i === 0 ? "border-teal" : "border-white/20"}`}
              >
                <span className="font-display text-[13px] font-medium text-aqua">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mb-2 mt-3 font-display text-lg font-semibold leading-snug">{step.title}</h4>
                <p className="text-sm leading-relaxed text-white/70">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
