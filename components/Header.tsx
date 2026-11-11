"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/site-config";
import { asset } from "@/lib/assets";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menú móvil: bloquea el scroll, cierra con Escape y mantiene el foco dentro.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
        Boolean,
      ) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-water ${
        solid
          ? "bg-night/95 py-3 shadow-[0_10px_30px_rgba(3,18,30,.25)] backdrop-blur-md"
          : "bg-transparent py-4 sm:py-7"
      }`}
    >
      <div className="container-mp flex items-center justify-between gap-6">
        <a href="#inicio" aria-label="Mayan Pool, ir al inicio" className="block shrink-0 leading-none">
          <Image
            src={asset("/images/logo-mayan-pool-horizontal-blanco.webp")}
            alt="Mayan Pool — Spa · Albercas · Ingeniería del agua"
            width={520}
            height={132}
            priority
            sizes="182px"
            className={`w-auto transition-[height] duration-500 ${solid ? "h-10" : "h-10 sm:h-[46px]"}`}
          />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-display text-sm font-medium tracking-[0.04em] text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contacto" className="btn-primary hidden min-h-[46px] px-[22px] lg:inline-flex">
            Cotizar proyecto
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-[46px] cursor-pointer items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X size={20} strokeWidth={1.6} aria-hidden /> : <Menu size={20} strokeWidth={1.6} aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100svh-64px)] overflow-y-auto lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-mp pb-8 pt-6">
          <ul className="flex flex-col border-t border-white/15">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-white/15">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between font-display text-lg font-medium text-white"
                >
                  {link.label}
                  <ArrowRight size={18} className="text-aqua" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
            Cotizar proyecto
          </a>
        </nav>
      </div>
    </header>
  );
}
