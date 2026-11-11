import { externalProps, whatsappHref } from "@/lib/contact";
import { WhatsAppIcon } from "./icons";

/**
 * Botón flotante de WhatsApp con el mensaje precargado.
 * Si aún no hay número configurado, lleva al formulario de contacto.
 * En móvil se eleva para no tapar la barra de cotización.
 */
export default function WhatsAppButton() {
  const href = whatsappHref();
  return (
    <a
      href={href}
      {...externalProps(href)}
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-[88px] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_rgba(0,0,0,.25)] transition-transform duration-300 ease-water hover:scale-105 sm:bottom-7 sm:right-7 sm:size-[60px]"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
