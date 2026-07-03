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

type TierKey = "standard" | "vip" | "premium";

const priceComparisonRows = [
  {
    entry: "Estándar",
    values: [55, 68, 72],
    cellClass: "bg-[linear-gradient(135deg,#CE8BFF_0%,#DAAEF6_100%)] text-slate-900",
  },
  {
    entry: "VIP",
    values: [60, 72, 75],
    cellClass: "bg-[linear-gradient(135deg,#9F1D87_0%,#5B2E89_100%)] text-white",
  },
  {
    entry: "Premium",
    values: [68, 76, 80],
    cellClass: "bg-[linear-gradient(135deg,#2a0f3d_0%,#13061f_100%)] text-white",
  },
];

const benefitComparisonRows = [
  { benefit: "Precio", standard: "S/ 68", vip: "S/ 72", premium: "S/ 76" },
  { benefit: "Acceso al congreso", standard: true, vip: true, premium: true },
  { benefit: "Guía interactiva", standard: true, vip: true, premium: true },
  { benefit: "Participación en todas las ponencias magistrales", standard: true, vip: true, premium: true },
  { benefit: "Interacción con asistentes, ponentes y organizaciones participantes", standard: true, vip: true, premium: true },
  { benefit: "Dinámicas", standard: true, vip: true, premium: true },
  { benefit: "Merchandising", standard: "ESTANDAR", vip: "VIP", premium: "PREMIUM" },
  { benefit: "Certificado digital", standard: true, vip: true, premium: true },
  { benefit: "Certificado físico", standard: false, vip: false, premium: true },
  { benefit: "Coffee Break", standard: true, vip: true, premium: true },
  { benefit: "Talleres", standard: true, vip: true, premium: true },
  { benefit: "Networking", standard: true, vip: true, premium: true },
  { benefit: "Networking con jóvenes líderes", standard: false, vip: true, premium: true },
  { benefit: "Networking ejecutivo", standard: false, vip: false, premium: true },
  { benefit: "Fast Pass", standard: false, vip: true, premium: true },
  { benefit: "Fotografía profesional", standard: false, vip: true, premium: true },
  { benefit: "Coleccionables", standard: false, vip: true, premium: true },
  { benefit: "Acceso a carpeta digital", standard: false, vip: true, premium: true },
  { benefit: "Acceso a grabaciones", standard: false, vip: true, premium: true },
  { benefit: "Acceso a ponencias virtuales", standard: true, vip: true, premium: true },
  { benefit: "Acceso a visitas técnicas", standard: true, vip: true, premium: true },
  { benefit: "Acceso a la noche cultural", standard: true, vip: true, premium: true },
  { benefit: "Acceso al Hub de Innovación", standard: true, vip: true, premium: true },
  { benefit: "Acceso a la feria laboral", standard: true, vip: true, premium: true },
  { benefit: "Revisión de CV", standard: false, vip: false, premium: true },
  { benefit: "Simulación de entrevistas", standard: false, vip: false, premium: true },
  { benefit: "Passport Challenge Premium", standard: false, vip: false, premium: true },
  { benefit: "Ranking de participación", standard: false, vip: false, premium: true },
  { benefit: "Acceso especial a futuros proyectos", standard: false, vip: false, premium: true },
];

const buildTierBenefits = (tier: TierKey) =>
  benefitComparisonRows
    .filter((row) => row.benefit !== "Precio")
    .map((row) => ({
      name: row.benefit,
      included: typeof row[tier] === "boolean" ? row[tier] : true,
    }));

const tiers = [
  {
    name: "Estándar",
    price: 68,
    currency: "PEN",
    desc: "Acceso al congreso completo.",
    benefits: buildTierBenefits("standard"),
    cta: "Inscribirme",
    featured: false,
    cardStyle: { background: "linear-gradient(135deg, #CE8BFF 0%, #DAAEF6 100%)" },
    actionClass: "bg-white text-slate-900 shadow-[0_10px_25px_rgba(255,255,255,0.18)]",
  },
  {
    name: "VIP",
    price: 72,
    currency: "PEN",
    desc: "Vive una experiencia completa con beneficios exclusivos.",
    benefits: buildTierBenefits("vip"),
    cta: "Quiero VIP",
    featured: true,
    cardStyle: { background: "linear-gradient(135deg, #9F1D87 0%, #5B2E89 100%)" },
    actionClass: "bg-white text-slate-900 shadow-[0_10px_25px_rgba(255,255,255,0.18)]",
  },
  {
    name: "Premium",
    price: 76,
    currency: "PEN",
    desc: "Para quienes buscan impulsar su perfil profesional al máximo y obtener beneficios exclusivos.",
    benefits: buildTierBenefits("premium"),
    cta: "Quiero Premium",
    featured: false,
    cardStyle: { background: "#000000" },
    actionClass: "bg-white text-slate-900 shadow-[0_10px_25px_rgba(255,255,255,0.18)]",
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
              <div className="text-5xl font-bold font-display mb-6">S/ {t.price}</div>
              <ul className="mb-8 flex-1 space-y-2">
                {t.benefits.map((benefit) => (
                  <li
                    key={benefit.name}
                    className={`flex items-start gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm ${benefit.included ? "bg-white/10" : "bg-white/5 opacity-50"}`}
                  >
                    <span className={`mt-0.5 shrink-0 text-base font-semibold ${benefit.included ? "text-white" : "text-white/80"}`}>
                      {benefit.included ? "✓" : "✕"}
                    </span>
                    <span className="leading-5">{benefit.name}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://forms.gle/TefbATTX3ex5ea94A"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center px-5 py-3 rounded-full font-medium transition-transform hover:scale-105 ${t.actionClass}`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-md">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Comparativa de beneficios</h2>
                <p className="text-sm text-muted-foreground">Revisa de forma horizontal qué incluye cada entrada en una sola vista.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-2xl">
                <thead>
                  <tr>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Beneficio
                    </th>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Estándar
                    </th>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      VIP
                    </th>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {benefitComparisonRows.map((row) => (
                    <tr key={row.benefit}>
                      <td className="border-b border-white/10 bg-black/20 px-4 py-3 font-medium text-white">
                        {row.benefit}
                      </td>
                      {[row.standard, row.vip, row.premium].map((value, index) => (
                        <td
                          key={`${row.benefit}-${index}`}
                          className={`border-b border-white/10 px-4 py-3 text-center text-sm font-semibold ${
                            typeof value === "boolean"
                              ? value
                                ? "bg-emerald-500/15 text-emerald-200"
                                : "bg-white/5 text-white/40"
                              : "bg-white/10 text-white"
                          }`}
                        >
                          {typeof value === "boolean" ? (value ? "✓" : "✕") : value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-[28px] border border-white/10 bg-black/20 p-6 shadow-2xl backdrop-blur-md">
            <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Comparativa de precios</h2>
                <p className="text-sm text-muted-foreground">Consulta el valor de cada entrada según la etapa de venta.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-2xl">
                <thead>
                  <tr>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Entrada
                    </th>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Preventa 1
                    </th>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Preventa 2
                    </th>
                    <th className="border-b border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                      Venta General
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceComparisonRows.map((row) => (
                    <tr key={row.entry}>
                      <td className="border-b border-white/10 bg-black/20 px-4 py-3 font-semibold text-white">
                        {row.entry}
                      </td>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.entry}-${index}`}
                          className={`border-b border-white/10 px-4 py-3 text-center font-semibold ${row.cellClass}`}
                        >
                          S/ {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
