import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import speaker1 from "@/assets/ponente.jpg";
import speaker2 from "@/assets/ponente.jpg";
import speaker3 from "@/assets/ponente.jpg";
import speaker4 from "@/assets/ponente.jpg";

export const Route = createFileRoute("/programa")({
  head: () => ({
    meta: [
      { title: "Programa Académico — CEIISE 2026" },
      { name: "description", content: "Cronograma completo, conferencias magistrales, talleres y ponentes confirmados de CEIISE 2026." },
      { property: "og:title", content: "Programa Académico — CEIISE 2026" },
      { property: "og:description", content: "Conferencias, talleres y ponentes de CEIISE 2026." },
    ],
  }),
  component: ProgramPage,
});

/* ─── Alliance logos for feria voluntarios bg ─────── */
const logosAlianzas = Object.entries(
  import.meta.glob("../../LOGOS ALIANZAS/*.{png,jpg,jpeg,svg}", {
    eager: true,
    import: "default",
  })
).map(([, logo]) => logo as string);

const horas = [
  "08:30 - 09:30", "09:30 - 10:00", "10:00 - 10:45", "10:45 - 11:45",
  "11:45 - 12:30", "12:30 - 14:00", "14:00 - 14:30", "14:30 - 15:30",
  "15:30 - 15:45", "15:45 - 16:15", "16:15 - 17:00", "17:00 - 17:45",
  "17:45 - 18:00", "18:00 - 18:30",
];

const ponentes = [
  { name: "Próximamente", role: "Liderazgo", img: speaker1 },
  { name: "Próximamente", role: "Innovación", img: speaker2 },
  { name: "Próximamente", role: "Logística Inteligente", img: speaker3 },
  { name: "Próximamente", role: "Gestión Empresarial", img: speaker4 },
];

/* ─── Tooltip data per event ─────────────────────── */
interface EventInfo {
  title: string;
  time?: string;
  desc?: string;
}

const eventDescriptions: Record<string, EventInfo> = {
  "Check in": { title: "Check in", desc: "Registro y acreditación de participantes." },
  "Inauguración": { title: "Inauguración", desc: "Ceremonia oficial de apertura del CEIISE 2026." },
  "Ponencia": { title: "Ponencia Magistral", desc: "Conferencia a cargo de un experto invitado." },
  "Taller Innovación": { title: "Taller de Innovación", desc: "Taller práctico sobre metodologías de innovación." },
  "Meet & Greet": { title: "Meet & Greet", desc: "Espacio de interacción con ponentes y asistentes." },
  "Noche cultural": { title: "Noche Cultural", desc: "Actividad cultural y artística para cerrar el día." },
  "Visita Técnica": { title: "Visita Técnica", desc: "Recorrido guiado a una empresa local." },
  "Feria de voluntarios": { title: "Feria de Voluntarios", desc: "Conoce a las organizaciones aliadas y oportunidades de voluntariado." },
  "Feria laboral": { title: "Feria Laboral", desc: "Conecta con empresas y oportunidades profesionales." },
  "Taller Logística": { title: "Taller de Logística", desc: "Taller especializado en logística y cadena de suministro." },
  "Coffee Break": { title: "Coffee Break", desc: "Pausa para refrigerio y networking informal." },
  "Hub de Innovación Aplicada": { title: "Hub de Innovación Aplicada", desc: "Espacio de exhibición de proyectos innovadores." },
  "Conversatorio": { title: "Conversatorio", desc: "Mesa redonda con profesionales del sector." },
  "Taller Liderazgo": { title: "Taller de Liderazgo", desc: "Taller sobre habilidades de liderazgo y gestión." },
  "Cierre": { title: "Cierre", desc: "Ceremonia de clausura y premiación." },
  "Concierto": { title: "Concierto", desc: "Evento musical de cierre del congreso." },
};

/* ─── Themed cell type ───────────────────────────── */
type CellTheme =
  | "deep" | "accent" | "highlight" | "time"
  | "noche-cultural" | "feria-voluntarios" | "feria-laboral"
  | "concierto" | "coffee" | "inauguracion" | "hub-innovacion";

interface CellProps {
  theme: CellTheme;
  style: React.CSSProperties;
  children: React.ReactNode;
  activeCell: string | null;
  cellId: string;
  onCellClick: (id: string) => void;
}

/* ─── Themed inner content renderers ─────────────── */
function NocheCulturalDecor() {
  return (
    <>
      <div className="cell-stars">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="cell-star" />
        ))}
      </div>
      <span className="cell-moon">🌙</span>
    </>
  );
}

function FeriaVoluntariosDecor() {
  const doubled = [...logosAlianzas, ...logosAlianzas];
  return (
    <div className="cell-logos-bg">
      <div className="cell-logos-track">
        {doubled.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
}

function FeriaLaboralDecor() {
  const buildings = [
    { w: 6, h: 22 }, { w: 5, h: 30 }, { w: 7, h: 18 }, { w: 4, h: 35 },
    { w: 6, h: 25 }, { w: 5, h: 15 }, { w: 7, h: 28 }, { w: 4, h: 20 },
  ];
  return (
    <>
      <div className="cell-corporate-bg">
        {buildings.map((b, i) => (
          <div key={i} className="cell-building" style={{ width: b.w, height: b.h }} />
        ))}
      </div>
      <span className="cell-person-icons">👤👤👤</span>
    </>
  );
}

function ConciertoDecor() {
  return (
    <>
      <span className="cell-music-note" style={{ top: '15%', left: '10%' }}>♪</span>
      <span className="cell-music-note" style={{ top: '60%', right: '12%' }}>♫</span>
    </>
  );
}

function CoffeeDecor() {
  return (
    <div className="cell-food-icons">
      <span className="cell-food-icon">☕</span>
      <span className="cell-food-icon">🥐</span>
      <span className="cell-food-icon">🍩</span>
      <span className="cell-food-icon">🧁</span>
    </div>
  );
}

function InauguracionDecor() {
  return (
    <>
      <div className="cell-gold-shimmer" />
      <span className="cell-sparkle">✦</span>
      <span className="cell-sparkle">✧</span>
      <span className="cell-sparkle">✦</span>
    </>
  );
}

function HubInnovacionDecor() {
  return (
    <>
      <div className="cell-sparks">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="cell-spark" />
        ))}
      </div>
      <span className="cell-bulb">💡</span>
      <span className="cell-bulb">💡</span>
    </>
  );
}

/* ─── Cell component ─────────────────────────────── */
function Cell({ theme, style, children, activeCell, cellId, onCellClick }: CellProps) {
  const baseColors: Record<string, string> = {
    deep:      "bg-[#240046]",
    accent:    "bg-[#3c096c]",
    highlight: "bg-[#7b2cbf] border border-[#9d4edd]/30",
    time:      "bg-[#1a0033]/60 text-purple-300 font-mono border border-[#3c096c]/20",
  };

  const themeClassMap: Record<string, string> = {
    "noche-cultural": "cell-noche-cultural",
    "feria-voluntarios": "cell-feria-voluntarios",
    "feria-laboral": "cell-feria-laboral",
    "concierto": "cell-concierto",
    "coffee": "cell-coffee",
    "inauguracion": "cell-inauguracion",
    "hub-innovacion": "cell-hub-innovacion",
  };

  const isThemed = theme in themeClassMap;
  const bgClass = isThemed ? "" : (baseColors[theme] || "");
  const themeClass = isThemed ? themeClassMap[theme] : "";
  const isActive = activeCell === cellId;
  const isTimeCell = theme === "time";

  const childText = typeof children === "string" ? children : "";
  const info = eventDescriptions[childText];

  const decorMap: Record<string, React.ReactNode> = {
    "noche-cultural": <NocheCulturalDecor />,
    "feria-voluntarios": <FeriaVoluntariosDecor />,
    "feria-laboral": <FeriaLaboralDecor />,
    "concierto": <ConciertoDecor />,
    "coffee": <CoffeeDecor />,
    "inauguracion": <InauguracionDecor />,
    "hub-innovacion": <HubInnovacionDecor />,
  };

  return (
    <div
      className={`schedule-cell ${bgClass} ${themeClass} text-center text-xs font-semibold p-1.5 rounded-lg flex items-center justify-center ${isActive ? "cell-active" : ""}`}
      style={style}
      onClick={(e) => {
        if (!isTimeCell) {
          e.stopPropagation();
          onCellClick(isActive ? "" : cellId);
        }
      }}
    >
      {/* Themed decoration */}
      {isThemed && decorMap[theme]}

      {/* Label */}
      {isThemed ? (
        <span className="cell-label">{children}</span>
      ) : (
        children
      )}

      {/* Tooltip */}
      {!isTimeCell && info && (
        <div className="cell-tooltip">
          <div className="cell-tooltip-title">{info.title}</div>
          {info.desc && <div className="cell-tooltip-desc">{info.desc}</div>}
        </div>
      )}
    </div>
  );
}

/* ─── 3-D Speaker Carousel ───────────────────────── */
function SpeakersCarousel() {
  const [current, setCurrent] = useState(0);
  const total = ponentes.length;
  const dragStartX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    dragStartX.current = null;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    const id = setInterval(() => goTo(current + 1), 4000);
    return () => clearInterval(id);
  }, [current, goTo]);

  return (
    <div>
      <div
        className="speakers-carousel"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <button className="carousel-nav prev" onClick={prev} aria-label="Ponente anterior">
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="speakers-track" ref={trackRef}>
          {ponentes.map((p, i) => {
            const offset = ((i - current + total) % total);
            const angle = offset * (360 / total);
            const z = 220;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * z;
            const zPos = Math.cos(rad) * z;
            const scale = 0.55 + 0.45 * ((zPos + z) / (2 * z));
            const opacity = offset === 0 ? 1 : 0.55 + 0.3 * ((zPos + z) / (2 * z));
            const zIndex = Math.round(scale * 10);

            return (
              <div
                key={p.name + i}
                className="speaker-card-3d"
                style={{
                  transform: `translateX(${x}px) translateZ(${zPos}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease",
                  boxShadow: offset === 0
                    ? "0 0 40px oklch(0.50 0.30 305 / 0.5), 0 20px 60px rgba(0,0,0,0.5)"
                    : "0 10px 30px rgba(0,0,0,0.4)",
                }}
                onClick={() => goTo(i)}
              >
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="card-info">
                  <h3>{p.name}</h3>
                  <p>{p.role}</p>
                </div>
                {offset === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 24,
                      border: "2px solid oklch(0.50 0.30 305 / 0.7)",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        <button className="carousel-nav next" onClick={next} aria-label="Ponente siguiente">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="carousel-dots">
        {ponentes.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? "active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ver ponente ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────── */
export function ProgramPage() {
  const [activeCell, setActiveCell] = useState<string | null>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handler = () => setActiveCell(null);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const cellProps = (id: string) => ({
    activeCell,
    cellId: id,
    onCellClick: setActiveCell,
  });

  return (
    <div className="bg-[#0d0214] min-h-screen text-white">
      {/* HERO */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">
            Programación CEIISE
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ¿Qué <span className="gradient-text">encontrarás</span> este 2026?
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            5 días de aprendizaje, 10+ ponencias, 3 visitas técnicas de tu elección, talleres especializados y oportunidades de conexión con profesionales y empresas.
          </p>
          <a
            href="https://linktr.ee/ceiise2026.unsa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-brand text-primary-foreground font-medium glow hover:scale-105 transition-transform"
          >
            <BookOpen className="h-4 w-4" /> Ver brochure completo
          </a>
        </div>
      </section>

      {/* CRONOGRAMA */}
      <section className="py-12 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-10 text-center tracking-wide">
            Cronograma
          </h2>

          <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-black/20 p-4 backdrop-blur-md">
            {/* Headers */}
            <div className="grid grid-cols-6 gap-[3px] min-w-[900px] mb-1 text-center font-bold">
              {["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((d) => (
                <div
                  key={d}
                  className="schedule-cell type-accent bg-[#240046] p-2 rounded-lg border border-[#3c096c]/30 text-purple-200 text-xs"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="grid-schedule grid grid-cols-6 gap-[3px] min-w-[900px] grid-rows-[repeat(14,minmax(36px,auto))]">

              {/* HORAS */}
              {horas.map((hora, idx) => (
                <Cell key={idx} theme="time" style={{ gridColumn: 1, gridRow: idx + 1 }} {...cellProps(`time-${idx}`)}>
                  {hora}
                </Cell>
              ))}

              {/* LUNES */}
              <Cell theme="accent" style={{ gridColumn: 2, gridRow: "1" }} {...cellProps("l-1")}>Check in</Cell>
              <Cell theme="inauguracion" style={{ gridColumn: 2, gridRow: "2" }} {...cellProps("l-2")}>Inauguración</Cell>
              <Cell theme="deep" style={{ gridColumn: 2, gridRow: "3" }} {...cellProps("l-3")}>Ponencia</Cell>
              <Cell theme="deep" style={{ gridColumn: 2, gridRow: "4" }} {...cellProps("l-4")}>Taller Innovación</Cell>
              <Cell theme="accent" style={{ gridColumn: 2, gridRow: "5" }} {...cellProps("l-5")}>Meet &amp; Greet</Cell>
              <Cell theme="deep" style={{ gridColumn: 2, gridRow: "8" }} {...cellProps("l-8")}>Ponencia</Cell>
              <Cell theme="deep" style={{ gridColumn: 2, gridRow: "9/11" }} {...cellProps("l-9")}>Ponencia</Cell>
              <Cell theme="noche-cultural" style={{ gridColumn: 2, gridRow: "11/13" }} {...cellProps("l-11")}>Noche cultural</Cell>

              {/* MARTES */}
              <Cell theme="accent" style={{ gridColumn: 3, gridRow: "span 5 / 6" }} {...cellProps("m-1")}>Visita Técnica</Cell>
              <Cell theme="deep" style={{ gridColumn: 3, gridRow: "8" }} {...cellProps("m-8")}>Ponencia</Cell>
              <Cell theme="deep" style={{ gridColumn: 3, gridRow: "9/11" }} {...cellProps("m-9")}>Ponencia</Cell>
              <Cell theme="feria-voluntarios" style={{ gridColumn: 3, gridRow: "11/13" }} {...cellProps("m-11")}>Feria de voluntarios</Cell>
              <Cell theme="deep" style={{ gridColumn: 3, gridRow: "13/15" }} {...cellProps("m-13")}>Ponencia</Cell>

              {/* MIÉRCOLES */}
              <Cell theme="accent" style={{ gridColumn: 4, gridRow: "span 5 / 6" }} {...cellProps("x-1")}>Visita Técnica</Cell>
              <Cell theme="feria-laboral" style={{ gridColumn: 4, gridRow: "7/11" }} {...cellProps("x-7")}>Feria laboral</Cell>
              <Cell theme="deep" style={{ gridColumn: 4, gridRow: "11" }} {...cellProps("x-11")}>Taller Logística</Cell>
              <Cell theme="deep" style={{ gridColumn: 4, gridRow: "12" }} {...cellProps("x-12")}>Ponencia</Cell>
              <Cell theme="coffee" style={{ gridColumn: 4, gridRow: "13" }} {...cellProps("x-13")}>Coffee Break</Cell>

              {/* JUEVES */}
              <Cell theme="accent" style={{ gridColumn: 5, gridRow: "span 5 / 6" }} {...cellProps("j-1")}>Visita Técnica</Cell>
              <Cell theme="hub-innovacion" style={{ gridColumn: 5, gridRow: "8/11" }} {...cellProps("j-8")}>Hub de Innovación Aplicada</Cell>
              <Cell theme="deep" style={{ gridColumn: 5, gridRow: "11" }} {...cellProps("j-11")}>Ponencia</Cell>
              <Cell theme="deep" style={{ gridColumn: 5, gridRow: "12" }} {...cellProps("j-12")}>Meet &amp; Greet</Cell>

              {/* VIERNES */}
              <Cell theme="deep" style={{ gridColumn: 6, gridRow: "3" }} {...cellProps("v-3")}>Ponencia</Cell>
              <Cell theme="deep" style={{ gridColumn: 6, gridRow: "4/6" }} {...cellProps("v-4")}>Conversatorio</Cell>
              <Cell theme="deep" style={{ gridColumn: 6, gridRow: "8/10" }} {...cellProps("v-8")}>Taller Liderazgo</Cell>
              <Cell theme="deep" style={{ gridColumn: 6, gridRow: "10" }} {...cellProps("v-10")}>Cierre</Cell>
              <Cell theme="concierto" style={{ gridColumn: 6, gridRow: "11" }} {...cellProps("v-11")}>Concierto</Cell>
            </div>
          </div>
        </div>
      </section>


      {/* PONENTES 3D */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-25 text-center">
            <span className="gradient-text">Ponentes</span> confirmados
          </h2>
          <SpeakersCarousel />
        </div>
      </section>
    </div>
  );
}