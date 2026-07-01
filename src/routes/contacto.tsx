import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Ayuda y Contacto — CEIISE 2026" },
      { name: "description", content: "FAQ, comunidad de WhatsApp y teléfonos del comité de soporte de CEIISE 2026." },
      { property: "og:title", content: "Ayuda y Contacto — CEIISE 2026" },
      { property: "og:description", content: "Resuelve tus dudas sobre certificados, pagos y envío de trabajos." },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  { q: " ¿Quiénes pueden participar en el congreso?", a: "El congreso está dirigido a estudiantes universitarios, egresados, docentes, investigadores, profesionales y público en general interesado en ampliar sus conocimientos y desarrollar nuevas habilidades. No es necesario pertenecer a la Universidad Nacional de San Agustín para participar; el evento está abierto a todas las personas que deseen formar parte de esta experiencia académica y profesional." },
  { q: "¿Cómo puedo inscribirme?", a: "La inscripción se realiza de manera virtual a través del formulario disponible en la página web oficial del congreso. Una vez completado el registro y realizado el pago correspondiente, el participante recibirá un correo de confirmación con toda la información necesaria para acceder a las actividades programadas. Se recomienda revisar cuidadosamente los datos ingresados para evitar inconvenientes durante el proceso." },
  { q: "¿Recibiré un certificado de participación?", a: "Sí. Los participantes que cumplan con los requisitos establecidos por la organización, como el registro correcto y el porcentaje mínimo de asistencia requerido, recibirán un certificado digital emitido por IISE UNSA. Este documento acreditará su participación en el congreso y podrá ser utilizado como evidencia de formación complementaria en actividades académicas y profesionales." },
  { q: "¿Cómo puedo comunicarme con los organizadores?", a: "Para cualquier consulta relacionada con inscripciones, programación, certificaciones o información general del evento, los participantes pueden comunicarse con el equipo organizador a través de los canales oficiales de IISE UNSA, incluyendo correo electrónico, redes sociales y formularios de contacto disponibles en la página web. Nuestro equipo estará dispuesto a brindar orientación y resolver cualquier duda de manera oportuna." },
];

export function ContactPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div>
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">Soporte</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Ayuda y <span className="gradient-text">Contacto</span></h1>
          <p className="text-lg text-muted-foreground">
            Estamos para resolver tus dudas.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold mb-6">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openIdx === i;
              return (
                <div key={f.q} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium">{f.q}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
