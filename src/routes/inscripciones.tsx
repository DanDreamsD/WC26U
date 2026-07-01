import { createFileRoute } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/inscripciones")({
  head: () => ({
    meta: [
      { title: "Inscripciones — CEIISE 2026" },
      { name: "description", content: "Tarifas Estándar, VIP y Premium para CEIISE 2026. Inscríbete con descuento Early Bird." },
      { property: "og:title", content: "Inscripciones CEIISE 2026" },
      { property: "og:description", content: "Compara tarifas y asegura tu cupo en CEIISE 2026." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Estándar",
    price: "S/ 68",
    desc: "Acceso al congreso completo.",
    features: [
      "Ingreso al congreso",
      "Guía interactiva",
      "Participación en todas las ponencias magistrales",
      "Interacción con asistentes, ponentes y organizaciones participantes",
      "Dinámicas",
      "Merchandising oficial Standard",
      "Certificado digital",
      "Coffee Break",
      "Talleres",
      "Networking",
      "Acceso a ponencias virtuales",
      "Acceso a visitas técnicas",
      "Acceso a la noche cultural",
      "Acceso al Hub de Innovación",
      "Acceso a la feria laboral"
        ],
    cta: "Inscribirme",
    featured: false,
    cardStyle: { background: "linear-gradient(135deg, #CE8BFF 0%, #DAAEF6 100%)" },
  },
  {
    name: "VIP",
    price: "S/ 72",
    desc: "Vive una experiencia completa con beneficios exclusivos.",
    features: [
      "Fast Pass VIP",
  "Beneficios Estándar",
  "Coleccionables",
  "Merchandising oficial VIP",
  "Certificado digital",
  "Fotografía profesional",
  "Networking con jóvenes líderes",
  "Acceso a carpeta digital",
  "Acceso a grabaciones"
    ],
    cta: "Quiero VIP",
    featured: true,
    cardStyle: { background: "linear-gradient(135deg, #9F1D87 0%, #5B2E89 100%)" },
  },
  {
    name: "Premium",
    price: "S/ 76",
    desc: "Para quienes buscan impulsar su perfil profesional al máximo y obtener beneficios exclusivos.",
    features: [
      "Fast Pass Premium",
  "Beneficios VIP",
  "Coleccionables",
  "Merchandising oficial Premium",
  "Certificado físico",
  "Revisión gratuita de CV",
  "Simulación de entrevistas",
  "Acceso a carpeta digital",
  "Acceso a grabaciones",
  "Networking con jóvenes líderes",
  "Networking ejecutivo",
  "Passport Challenge Premium",
  "Ranking de participación",
  "Acceso especial a futuros proyectos"
    ],
    cta: "Quiero Premium",
    featured: false,
    cardStyle: { background: "#000000" },
  },
];

export function PricingPage() {
  return (
    <div>
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">Inscripciones (preventa 2)</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Elige tu <span className="gradient-text">experiencia</span></h1>
          <p className="text-lg text-muted-foreground">
            Preventa disponible hasta 28 de Junio o hasta acabar stock. Asegura tu cupo y disfruta de beneficios exclusivos.{" "}
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              style={t.cardStyle}
              className={`relative rounded-3xl p-8 flex flex-col text-white shadow-lg shadow-black/20 ${t.featured ? "scale-[1.02]" : "border border-white/10"}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-primary text-xs font-semibold">
                  <Sparkles className="h-3 w-3" /> Más popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-1">{t.name}</h3>
              <p className="text-sm mb-6 text-white/80">{t.desc}</p>
              <div className="text-5xl font-bold font-display mb-6">{t.price}</div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-white" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://forms.gle/TefbATTX3ex5ea94A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center px-5 py-3 rounded-full font-medium transition-transform hover:scale-105 bg-white text-primary"
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
