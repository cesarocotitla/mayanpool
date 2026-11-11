import { ArrowRight } from "lucide-react";

/** CTA de cotización siempre visible en móvil (oculto desde 640 px). */
export default function MobileQuoteBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:hidden">
      <a href="#contacto" className="btn-primary w-full">
        Solicitar cotización
        <ArrowRight size={18} strokeWidth={1.8} aria-hidden />
      </a>
    </div>
  );
}
