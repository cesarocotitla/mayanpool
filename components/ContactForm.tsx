"use client";

import { useId, useState } from "react";
import { Send, CircleCheck, ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { hasWhatsApp, mailtoLink, whatsappLink } from "@/lib/contact";
import { trackWhatsAppClick } from "@/lib/analytics";

type Values = { nombre: string; telefono: string; tipo: string; mensaje: string };
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { nombre: "", telefono: "", tipo: "", mensaje: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  const name = v.nombre.trim();
  if (name.length < 2) e.nombre = "Escribe tu nombre.";
  else if (name.length > 80) e.nombre = "El nombre es demasiado largo.";

  const digits = v.telefono.replace(/\D/g, "");
  if (!digits) e.telefono = "Escribe un teléfono de contacto.";
  else if (digits.length !== 10 && !(digits.length === 12 && digits.startsWith("52")))
    e.telefono = "Usa un teléfono de 10 dígitos.";

  if (!v.tipo) e.tipo = "Selecciona el tipo de proyecto.";

  const msg = v.mensaje.trim();
  if (msg.length < 10) e.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
  else if (msg.length > 1000) e.mensaje = "Máximo 1000 caracteres.";
  return e;
}

function buildMessage(v: Values) {
  return [
    siteConfig.contact.whatsappMessage + ".",
    "",
    `Nombre: ${v.nombre.trim()}`,
    `Teléfono: ${v.telefono.trim()}`,
    `Tipo de proyecto: ${v.tipo}`,
    `Mensaje: ${v.mensaje.trim()}`,
  ].join("\n");
}

const labelCls = "flex flex-col gap-2 font-display text-[13px] font-semibold text-abyss";
const errorCls = "font-sans text-[13px] font-normal text-[#B42318]";

/**
 * Formulario de cotización con validación en el cliente.
 * Envía la solicitud por WhatsApp (mensaje estructurado) o, si no hay
 * número configurado, por correo. Para integrar un servicio de envío
 * (Resend, Formspree, CRM…) basta con reemplazar `deliver()`.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sent" | "unavailable">("idle");
  const uid = useId();
  const ids = {
    nombre: `${uid}-nombre`,
    telefono: `${uid}-telefono`,
    tipo: `${uid}-tipo`,
    mensaje: `${uid}-mensaje`,
  };

  const update = (field: keyof Values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof Values) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  function deliver(v: Values): boolean {
    const text = buildMessage(v);
    const wa = whatsappLink(text);
    if (wa) {
      trackWhatsAppClick(); // abre WhatsApp sin enlace <a>, así que se registra aquí
      window.open(wa, "_blank", "noopener,noreferrer");
      return true;
    }
    const mail = mailtoLink(`Solicitud de cotización — ${v.tipo}`, text);
    if (mail) {
      window.location.href = mail;
      return true;
    }
    return false;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("empresa")) return; // honeypot anti-spam

    const errs = validate(values);
    setErrors(errs);
    setTouched({ nombre: true, telefono: true, tipo: true, mensaje: true });
    const firstInvalid = (Object.keys(ids) as (keyof Values)[]).find((k) => errs[k]);
    if (firstInvalid) {
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }
    if (deliver(values)) {
      setStatus("sent");
      setValues(initial);
      setTouched({});
    } else {
      setStatus("unavailable");
    }
  }

  const fieldProps = (field: keyof Values) => ({
    id: ids[field],
    name: field,
    value: values[field],
    onChange: update(field),
    onBlur: blur(field),
    "aria-invalid": Boolean(touched[field] && errors[field]) || undefined,
    "aria-describedby": touched[field] && errors[field] ? `${ids[field]}-error` : undefined,
  });

  const errorFor = (field: keyof Values) =>
    touched[field] && errors[field] ? (
      <span id={`${ids[field]}-error`} className={errorCls}>
        {errors[field]}
      </span>
    ) : null;

  const invalidRing = (field: keyof Values) => (touched[field] && errors[field] ? " border-[#B42318]" : "");

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${uid}-title`}
      className="relative rounded-md bg-white p-6 shadow-[0_30px_80px_rgba(3,18,30,.35)] sm:p-11"
    >
      <h3 id={`${uid}-title`} className="mb-1.5 font-display text-2xl font-semibold text-abyss">
        Solicita tu cotización
      </h3>
      <p className="mb-7 text-[15px] leading-relaxed text-stone">Cuéntanos sobre tu proyecto y te contactaremos.</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label htmlFor={ids.nombre} className={labelCls}>
          Nombre
          <input
            {...fieldProps("nombre")}
            type="text"
            autoComplete="name"
            placeholder="Tu nombre completo"
            maxLength={80}
            required
            className={`field${invalidRing("nombre")}`}
          />
          {errorFor("nombre")}
        </label>
        <label htmlFor={ids.telefono} className={labelCls}>
          Teléfono
          <input
            {...fieldProps("telefono")}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="10 dígitos"
            maxLength={16}
            required
            className={`field${invalidRing("telefono")}`}
          />
          {errorFor("telefono")}
        </label>
        <label htmlFor={ids.tipo} className={`${labelCls} sm:col-span-2`}>
          Tipo de proyecto
          <span className="relative block">
          <select
            {...fieldProps("tipo")}
            required
            className={`field cursor-pointer appearance-none pr-11${values.tipo ? "" : " text-slate"}${invalidRing("tipo")}`}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {siteConfig.projectTypes.map((t) => (
              <option key={t} value={t} className="text-abyss">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate"
          />
          </span>
          {errorFor("tipo")}
        </label>
        <label htmlFor={ids.mensaje} className={`${labelCls} sm:col-span-2`}>
          Mensaje
          <textarea
            {...fieldProps("mensaje")}
            placeholder="Describe brevemente tu proyecto"
            maxLength={1000}
            rows={5}
            required
            className={`field h-32 resize-y py-3.5${invalidRing("mensaje")}`}
          />
          {errorFor("mensaje")}
        </label>
        {/* Honeypot anti-spam: invisible para personas */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Empresa
            <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <button type="submit" className="btn mt-7 w-full bg-abyss text-white hover:bg-night">
        <Send size={18} strokeWidth={1.8} aria-hidden />
        {hasWhatsApp ? "Enviar solicitud por WhatsApp" : "Enviar solicitud"}
      </button>

      <div aria-live="polite" className="mt-4 min-h-6 text-center text-[13px] leading-normal">
        {status === "sent" && (
          <p className="flex items-center justify-center gap-2 font-medium text-teal-text">
            <CircleCheck size={16} aria-hidden />
            {hasWhatsApp
              ? "Abrimos WhatsApp con tu solicitud. Solo presiona enviar."
              : "Abrimos tu correo con la solicitud lista para enviar."}
          </p>
        )}
        {status === "unavailable" && (
          <p className="font-medium text-[#B42318]">
            El canal de contacto aún no está configurado. Inténtalo más tarde.
          </p>
        )}
        {status === "idle" && (
          <p className="text-slate">Tus datos se usan solo para responder a tu solicitud.</p>
        )}
      </div>
    </form>
  );
}
