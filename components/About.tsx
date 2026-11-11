import Image from "next/image";
import Reveal from "./Reveal";
import { MayanDivider } from "./icons";
import { siteConfig } from "@/lib/site-config";
import { asset } from "@/lib/assets";

const pillars = [
  {
    title: "Ingeniería",
    text: "Cálculo hidráulico, selección de equipos y sistemas pensados para operar con eficiencia durante años.",
  },
  {
    title: "Diseño",
    text: "Espacios acuáticos que dialogan con la arquitectura, los materiales y el paisaje que los rodea.",
  },
  {
    title: "Innovación",
    text: "Automatización, climatización y tratamiento del agua con tecnología actual y control preciso.",
  },
];

export default function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="bg-white py-24 lg:pb-[120px] lg:pt-[140px]">
      <div className="container-mp">
        <div className="grid grid-cols-1 items-end gap-x-6 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-6 text-teal-text">Nuestra esencia</p>
            <h2
              id="nosotros-title"
              className="font-display text-[34px] font-semibold leading-[1.05] tracking-[-0.025em] text-abyss sm:text-5xl lg:text-[60px]"
            >
              Más que agua.
              <br />
              <span className="font-medium text-slate">Ingeniería, diseño e innovación.</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="text-[17px] leading-[1.75] text-[#3D5666] sm:text-lg">
              En {siteConfig.name} combinamos conocimiento técnico, experiencia e innovación para desarrollar
              soluciones acuáticas que integran funcionalidad, estética y tecnología. Cada proyecto representa
              una oportunidad para transformar el agua en una experiencia única.
            </p>
          </Reveal>
        </div>

        <MayanDivider className="mt-16 text-[#C9D6DB] lg:mt-[72px]" />

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
          <Reveal className="relative min-h-[320px] overflow-hidden rounded sm:min-h-[420px] lg:col-span-7 lg:min-h-[520px]">
            <Image
              src={asset("/images/spa-exterior-cascadas.webp")}
              alt="Spa exterior con cascadas integrado al jardín"
              fill
              sizes="(min-width: 1024px) 680px, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="flex flex-col justify-between gap-10 lg:col-span-5">
            <ol>
              {pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 0.08}
                  className={`flex gap-6 border-t border-line py-7 ${i === pillars.length - 1 ? "border-b" : ""}`}
                >
                  <span className="w-7 shrink-0 font-display text-[13px] font-medium leading-relaxed tracking-[0.1em] text-teal-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-2 font-display text-xl font-semibold leading-snug text-abyss">{p.title}</h3>
                    <p className="text-[15px] leading-[1.65] text-stone">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="font-display text-[22px] font-medium italic leading-[1.45] text-abyss">
              “{siteConfig.slogan}”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
