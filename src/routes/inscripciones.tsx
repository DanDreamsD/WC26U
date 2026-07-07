import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Sparkles, TrendingUp, Tag, Crown, Star, Gem } from "lucide-react";

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

/* ── All benefits in display order ── */
const allBenefits = [
  { name: "Acceso al congreso", standard: true, vip: true, premium: true },
  { name: "Guía interactiva", standard: true, vip: true, premium: true },
  { name: "Participación en ponencias magistrales", standard: true, vip: true, premium: true },
  { name: "Interacción con asistentes y ponentes", standard: true, vip: true, premium: true },
  { name: "Dinámicas", standard: true, vip: true, premium: true },
  { name: "Merchandising", standard: "ESTÁNDAR", vip: "VIP", premium: "PREMIUM" },
  { name: "Certificado digital", standard: true, vip: true, premium: true },
  { name: "Certificado físico", standard: false, vip: false, premium: true },
  { name: "Coffee Break", standard: true, vip: true, premium: true },
  { name: "Talleres", standard: true, vip: true, premium: true },
  { name: "Networking", standard: true, vip: true, premium: true },
  { name: "Networking con jóvenes líderes", standard: false, vip: true, premium: true },
  { name: "Networking ejecutivo", standard: false, vip: false, premium: true },
  { name: "Fast Pass", standard: false, vip: true, premium: true },
  { name: "Fotografía profesional", standard: false, vip: true, premium: true },
  { name: "Coleccionables", standard: false, vip: true, premium: true },
  { name: "Acceso a carpeta digital", standard: false, vip: true, premium: true },
  { name: "Acceso a grabaciones", standard: false, vip: true, premium: true },
  { name: "Acceso a ponencias virtuales", standard: true, vip: true, premium: true },
  { name: "Acceso a visitas técnicas", standard: true, vip: true, premium: true },
  { name: "Acceso a la noche cultural", standard: true, vip: true, premium: true },
  { name: "Acceso al Hub de Innovación", standard: true, vip: true, premium: true },
  { name: "Acceso a la feria laboral", standard: true, vip: true, premium: true },
  { name: "Revisión de CV", standard: false, vip: false, premium: true },
  { name: "Simulación de entrevistas", standard: false, vip: false, premium: true },
  { name: "Passport Challenge Premium", standard: false, vip: false, premium: true },
  { name: "Ranking de participación", standard: false, vip: false, premium: true },
  { name: "Acceso especial a futuros proyectos", standard: false, vip: false, premium: true },
];

type TierKey = "standard" | "vip" | "premium";

interface TierConfig {
  key: TierKey;
  name: string;
  price: number;
  currency: string;
  desc: string;
  cta: string;
  featured: boolean;
  icon: React.ReactNode;
  cardStyle: React.CSSProperties;
  priceHistory: { label: string; price: number; active: boolean }[];
}

const tiers: TierConfig[] = [
  {
    key: "standard",
    name: "Estándar",
    price: 75,
    currency: "PEN",
    desc: "Participa en todas las actividades principales del evento.",
    cta: "Inscribirme",
    featured: false,
    icon: <Star className="h-6 w-6" />,
    cardStyle: { background: "linear-gradient(135deg, #CE8BFF 0%, #DAAEF6 100%)" },
    priceHistory: [
      { label: "Preventa 1", price: 55, active: false },
      { label: "Preventa 2", price: 68, active: false },
      { label: "Venta General", price: 75, active: true },
    ],
  },
  {
    key: "vip",
    name: "VIP",
    price: 78,
    currency: "PEN",
    desc: "Vive una experiencia completa con beneficios exclusivos.",
    cta: "Quiero VIP",
    featured: true,
    icon: <Crown className="h-6 w-6" />,
    cardStyle: { background: "linear-gradient(135deg, #9F1D87 0%, #5B2E89 100%)" },
    priceHistory: [
      { label: "Preventa 1", price: 60, active: false },
      { label: "Preventa 2", price: 72, active: false },
      { label: "Venta General", price: 78, active: true },
    ],
  },
  {
    key: "premium",
    name: "Premium",
    price: 80,
    currency: "PEN",
    desc: "Para quienes buscan impulsar su perfil profesional al máximo.",
    cta: "Quiero Premium",
    featured: false,
    icon: <Gem className="h-6 w-6" />,
    cardStyle: { background: "linear-gradient(160deg, #1a0a2e 0%, #0d0518 100%)" },
    priceHistory: [
      { label: "Preventa 1", price: 68, active: false },
      { label: "Preventa 2", price: 76, active: false },
      { label: "Venta General", price: 80, active: true },
    ],
  },
];

/* ── Price stages data for bottom table ── */
const stages = [
  { name: "Preventa 1", status: "Culminado", statusClass: "stage-ended", prices: [55, 60, 68] },
  { name: "Preventa 2", status: "Culminado", statusClass: "stage-ended", prices: [68, 72, 76] },
  { name: "Venta General", status: "Activa", statusClass: "stage-active", prices: [75, 78, 80] },
];

export function PricingPage() {
  return (
    <div>
      {/* ── Hero header ── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">
            Inscripciones (venta general)
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Elige tu <span className="gradient-text">experiencia</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Selecciona la entrada que más se ajusta a tus necesidades y asegura tu lugar en CEIISE 2026.
          </p>
        </div>
      </section>

      {/* ── Aligned Tier Cards ── */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="tier-grid">
            {tiers.map((t) => (
              <div
                key={t.name}
                style={t.cardStyle}
                className={`tier-card ${t.featured ? "tier-card--featured" : ""}`}
              >
                {/* Featured badge */}
                {t.featured && (
                  <span className="tier-badge">
                    <Sparkles className="h-3 w-3" /> Más popular
                  </span>
                )}

                {/* Header */}
                <div className="tier-header">
                  <div className="tier-icon">{t.icon}</div>
                  <h3 className="text-2xl font-bold">{t.name}</h3>
                  <p className="text-sm text-white/70 leading-snug">{t.desc}</p>
                </div>

                {/* Price */}
                <div className="tier-price-block">
                  <span className="tier-price-amount">S/ {t.price}</span>
                  <span className="tier-price-label">Venta General</span>
                </div>

                {/* Mini price history */}
                <div className="tier-price-history">
                  {t.priceHistory.map((ph) => (
                    <div key={ph.label} className={`tier-ph-item ${ph.active ? "tier-ph-item--active" : ""}`}>
                      <span className="tier-ph-label">{ph.label}</span>
                      <span className="tier-ph-value">S/ {ph.price}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="tier-divider" />

                {/* Benefits — same order, same count for alignment */}
                <ul className="tier-benefits">
                  {allBenefits.map((b) => {
                    const value = b[t.key];
                    const included = typeof value === "boolean" ? value : true;
                    const label = typeof value === "string" ? `${b.name} (${value})` : b.name;
                    return (
                      <li key={b.name} className={`tier-benefit-row ${included ? "" : "tier-benefit-row--disabled"}`}>
                        <span className={`tier-benefit-icon ${included ? "tier-benefit-icon--yes" : "tier-benefit-icon--no"}`}>
                          {included ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                        </span>
                        <span className="tier-benefit-text">{label}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <a
                  href="https://forms.gle/TefbATTX3ex5ea94A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-cta"
                >
                  {t.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sales Stage Comparison (improved) ── */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="stage-wrapper">
            {/* Header */}
            <div className="stage-header">
              <div className="stage-header-icon">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Etapas de venta</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Los precios aumentan en cada etapa. ¡Aprovecha la venta general activa!
                </p>
              </div>
            </div>

            {/* Stage cards */}
            <div className="stage-cards">
              {stages.map((stage) => (
                <div key={stage.name} className={`stage-card ${stage.statusClass}`}>
                  {/* Stage name & status */}
                  <div className="stage-card-top">
                    <h3 className="stage-card-name">{stage.name}</h3>
                    <span className={`stage-status-pill ${stage.statusClass}`}>{stage.status}</span>
                  </div>

                  {/* Price rows */}
                  <div className="stage-prices">
                    {["Estándar", "VIP", "Premium"].map((tierName, i) => (
                      <div key={tierName} className="stage-price-row">
                        <span className="stage-tier-name">
                          <Tag className="h-3.5 w-3.5 opacity-60" />
                          {tierName}
                        </span>
                        <span className="stage-tier-price">S/ {stage.prices[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
