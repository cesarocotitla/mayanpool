import { MapPin, Mail } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ContactForm from "./ContactForm";
import { WhatsAppIcon } from "./icons";
import { siteConfig } from "@/lib/site-config";
import { externalProps, hasEmail, whatsappLink } from "@/lib/contact";

export default function Contact() {
  const wa = whatsappLink();

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="relative overflow-hidden bg-abyss py-24 lg:py-[130px]"
    >
      <div className="container-mp relative">
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-14 lg:grid-cols-12">
          <Reveal className="text-white lg:col-span-5">
            <SectionHeading
              id="contacto-title"
              tone="dark"
              eyebrow="Contacto"
              title="Hagamos realidad tu próximo proyecto."
            />
            <p className="mt-7 text-[17px] leading-[1.75] text-white/80">
              Desde un jacuzzi residencial hasta una solución hidráulica especializada, estamos listos para
              transformar tus ideas en realidad.
            </p>

            {wa && (
              <a href={wa} {...externalProps(wa)} className="btn mt-9 bg-whatsapp text-[#06301A] hover:bg-[#3BE07A]">
                <WhatsAppIcon size={20} />
                Escríbenos por WhatsApp
              </a>
            )}

            <dl className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-7">
              <div className="flex items-start gap-4">
                <MapPin size={24} strokeWidth={1.5} className="shrink-0 text-aqua" aria-hidden />
                <div>
                  <dt className="mb-1 font-display text-[15px] font-semibold">Zona de servicio</dt>
                  <dd className="text-[15px] leading-relaxed text-white/75">
                    {siteConfig.location.serviceAreaLabel}
                    <br />
                    Atendemos directamente en tu domicilio o proyecto.
                  </dd>
                </div>
              </div>
              {hasEmail && (
                <div className="flex items-start gap-4">
                  <Mail size={24} strokeWidth={1.5} className="shrink-0 text-aqua" aria-hidden />
                  <div>
                    <dt className="mb-1 font-display text-[15px] font-semibold">Correo</dt>
                    <dd>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-[15px] text-white/85 underline-offset-4 hover:text-white hover:underline"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
