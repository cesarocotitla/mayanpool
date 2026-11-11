"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { categoryLabel, projectCategories, projects, type ProjectCategory } from "@/lib/projects";
import { asset } from "@/lib/assets";

type Filter = ProjectCategory | "todos";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("todos");
  const visible = filter === "todos" ? projects : projects.filter((p) => p.category === filter);
  const showFeatured = filter === "todos";

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="bg-white py-24 lg:py-[130px]">
      <div className="container-mp">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-[680px]">
            <SectionHeading id="proyectos-title" eyebrow="Proyectos" title="Cada proyecto, una solución única." />
          </Reveal>
          <div role="group" aria-label="Filtrar proyectos" className="flex flex-wrap gap-2">
            {projectCategories.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(c.id)}
                  className={`btn min-h-11 px-5 tracking-[0.02em] ${
                    active ? "bg-abyss text-white" : "bg-mist text-abyss hover:bg-line"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? "proyecto" : "proyectos"} mostrados
        </p>

        <m.ul layout className="grid grid-flow-dense grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => {
              const featured = showFeatured && p.featured;
              const caption = [p.location, p.year].filter(Boolean).join(" · ");
              return (
                <m.li
                  key={p.image}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                  className={featured ? "sm:col-span-2 lg:row-span-2" : ""}
                >
                  <figure className="group flex h-full flex-col gap-4">
                    <div
                      className={`relative grow overflow-hidden rounded bg-mist ${
                        featured ? "aspect-[4/3] lg:aspect-auto lg:min-h-[560px]" : "aspect-[4/3]"
                      }`}
                    >
                      <Image
                        src={asset(p.image)}
                        alt={p.alt}
                        fill
                        sizes={featured ? "(min-width: 1024px) 800px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
                        className="object-cover transition-transform duration-[900ms] ease-water group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 font-display text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-abyss">
                        {categoryLabel[p.category]}
                      </span>
                    </div>
                    {(p.title || caption || p.description) && (
                      <figcaption>
                        {caption && (
                          <p className="mb-1.5 font-display text-[13px] font-medium tracking-[0.08em] text-teal-text">
                            {caption}
                          </p>
                        )}
                        {p.title && (
                          <h3 className="mb-1.5 font-display text-xl font-semibold text-abyss">{p.title}</h3>
                        )}
                        {p.description && <p className="text-[15px] leading-relaxed text-stone">{p.description}</p>}
                      </figcaption>
                    )}
                  </figure>
                </m.li>
              );
            })}
          </AnimatePresence>
        </m.ul>
      </div>
    </section>
  );
}
