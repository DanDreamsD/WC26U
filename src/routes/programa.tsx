import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const speakerImages = Object.fromEntries(
  Object.entries(
    import.meta.glob("../../FOTOS PONENTES/*.{png,jpg,jpeg,svg,webp}", {
      eager: true,
      import: "default",
    })
  ).map(([path, src]) => [path.split("/").pop() ?? "", src as string])
) as Record<string, string>;

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
  "08:30 - 09:30", "09:30 - 09:45", "09:45 - 10:00", "10:00 - 10:45",
  "10:45 - 11:45", "11:45 - 12:30", "12:30 - 14:00", "14:00 - 14:30",
  "14:30 - 15:15", "15:15 - 15:30", "15:45 - 16:15", "16:15 - 17:45",
  "17:45 - 18:00", "18:00 - 18:30",
];

const scheduleBlocks = [
  {
    day: "Lunes",
    column: 2,
    items: [
      { label: "Recepción y networking", row: 1, theme: "accent" as const },
      { label: "Número musical", row: 2, theme: "deep" as const },
      { label: "Inauguración", row: 3, theme: "inauguracion" as const },
      { label: "Ponencia", row: 4, theme: "deep" as const },
      { label: "Taller Liderazgo", row: 5, theme: "deep" as const },
      { label: "Meet & Greet", row: 6, theme: "accent" as const },
      { label: "Almuerzo libre", row: 7, theme: "deep" as const },
      { label: "Ponencia", row: 9, theme: "deep" as const },
      { label: "Contingencia", row: 10, theme: "deep" as const },
      { label: "Ponencia", row: 11, theme: "deep" as const },
      { label: "Noche cultural", row: 12, span: 2, theme: "noche-cultural" as const },
    ],
  },
  {
    day: "Martes",
    column: 3,
    items: [
      { label: "Visita Técnica", row: 5, span: 2, theme: "accent" as const },
      { label: "Almuerzo libre", row: 7, theme: "deep" as const },
      { label: "Talk Experience", row: 9, theme: "deep" as const },
      { label: "Contingencia", row: 10, theme: "deep" as const },
      { label: "Ponencia", row: 11, theme: "deep" as const },
      { label: "Feria de voluntariados", row: 12, span: 2, theme: "feria-voluntarios" as const },
      { label: "Ponencia", row: 14, theme: "deep" as const },
    ],
  },
  {
    day: "Miércoles",
    column: 4,
    items: [
      { label: "Visita Técnica", row: 5, span: 2, theme: "accent" as const },
      { label: "Almuerzo libre", row: 7, theme: "deep" as const },
      { label: "Feria laboral", row: 8, span: 3, theme: "feria-laboral" as const },
      { label: "Taller Logística Inteligente", row: 11, theme: "deep" as const },
      { label: "Ponencia", row: 12, theme: "deep" as const },
      { label: "Coffee Break", row: 13, theme: "coffee" as const },
    ],
  },
  {
    day: "Jueves",
    column: 5,
    items: [
      { label: "Visita Técnica", row: 5, span: 2, theme: "accent" as const },
      { label: "Hub de Innovación Aplicada", row: 9, span: 2, theme: "hub-innovacion" as const },
      { label: "Meet & Greet", row: 12, theme: "accent" as const },
      { label: "Ponencia", row: 13, theme: "deep" as const },
    ],
  },
  {
    day: "Viernes",
    column: 6,
    items: [
      { label: "Recepción", row: 2, theme: "accent" as const },
      { label: "Ponencia", row: 3, theme: "deep" as const },
      { label: "Contingencia", row: 4, theme: "deep" as const },
      { label: "Conversatorio", row: 5, span: 2, theme: "deep" as const },
      { label: "Buffet · Fotos", row: 8, theme: "deep" as const },
      { label: "Taller Innovación", row: 9, theme: "deep" as const },
      { label: "Cierre", row: 11, theme: "deep" as const },
      { label: "Concierto", row: 12, theme: "concierto" as const },
    ],
  },
];

const ponentes = [
  {
    name: "Jeanmarco David Villegas Alvarez",
    role: "Doctor en Proyectos, MBA y especialista en gestión de proyectos e innovación. Experiencia en consultoría estratégica, emprendimiento y desarrollo de proyectos para empresas e instituciones educativas.",
    topic: "«Cómo los ingenieros pueden transformar tecnología en valor empresarial»",
    img: speakerImages["Jeanmarco David Villegas Alvarez.jpeg"],
  },
  {
    name: "Karen Rocío Humpiri Turpo",
    role: "Profesional vinculada a la Universidad Nacional de San Agustín, enfocada en el desarrollo del liderazgo y las habilidades profesionales para estudiantes y futuros ingenieros.",
    topic: "«Eje de liderazgo»",
    img: speakerImages["Karen Rocío Humpiri Turpo.jpeg"],
  },
  {
    name: "Gonzalo Alonso Sánchez Lorenzo",
    role: "Ingeniero Informático, MBA y consultor con más de 20 años de experiencia en transformación digital, gestión de proyectos e implementación de tecnologías para organizaciones públicas y privadas.",
    topic: "«Modelos de Negocio Innovadores»",
    img: speakerImages["Gonzalo Alonso Sánchez Lorenzo.jpeg"],
  },
];

/* ─── Tooltip data per event ─────────────────────── */
interface EventInfo {
  title: string;
  time?: string;
  desc?: string;
}

const eventDescriptions: Record<string, EventInfo> = {
  "Recepción y networking": { title: "Recepción y networking", desc: "Registro y bienvenida inicial de participantes." },
  "Número musical": { title: "Número musical", desc: "Apertura artística del día." },
  "Inauguración": { title: "Inauguración", desc: "Ceremonia oficial de apertura del CEIISE 2026." },
  "Ponencia": { title: "Ponencia", desc: "Conferencia o charla temática del congreso." },
  "Taller Liderazgo": { title: "Taller de liderazgo", desc: "Taller especializado en liderazgo y gestión." },
  "Meet & Greet": { title: "Meet & Greet", desc: "Espacio de interacción con ponentes y asistentes." },
  "Almuerzo libre": { title: "Almuerzo libre", desc: "Tiempo libre para alimentación y descanso." },
  "Contingencia": { title: "Contingencia", desc: "Ajuste de agenda por imprevistos o pausas." },
  "Noche cultural": { title: "Noche Cultural", desc: "Actividad cultural y artística para cerrar el día." },
  "Visita Técnica": { title: "Visita Técnica", desc: "Recorrido guiado al lugar de la visita." },
  "Talk Experience": { title: "Talk Experience", desc: "Espacio dinámico de conversación y reflexión." },
  "Feria de voluntariados": { title: "Feria de voluntariados", desc: "Conoce oportunidades de participación y servicio." },
  "Feria laboral": { title: "Feria Laboral", desc: "Conecta con empresas y oportunidades profesionales." },
  "Taller Logística Inteligente": { title: "Taller Logística Inteligente", desc: "Taller enfocado en logística y optimización." },
  "Coffee Break": { title: "Coffee Break", desc: "Pausa para refrigerio y networking informal." },
  "Hub de Innovación Aplicada": { title: "Hub de Innovación Aplicada", desc: "Espacio de exhibición y exploración de innovación." },
  "Conversatorio": { title: "Conversatorio", desc: "Mesa redonda con profesionales del sector." },
  "Buffet · Fotos": { title: "Buffet · Fotos", desc: "Reto de networking y registro fotográfico." },
  "Taller Innovación": { title: "Taller de Innovación", desc: "Taller práctico sobre metodologías de innovación." },
  "Cierre": { title: "Cierre", desc: "Ceremonia de clausura y premiación." },
  "Concierto": { title: "Concierto", desc: "Evento musical de cierre del congreso." },
  "Recepción": { title: "Recepción", desc: "Bienvenida y registro del día." },
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
                  <p className="text-[10px] leading-snug text-purple-200/90">{p.role}</p>
                  <div className="mt-3 rounded-xl border border-purple-400/20 bg-white/10 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-purple-200/80">Tema</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-amber-100">{p.topic}</p>
                  </div>
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
          {/* BOTÓN DEL BROCHURE COMENTADO
          <a
            href="https://online.fliphtml5.com/kqejn/BROCHURE---CEIISE-2026-LILI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-brand text-primary-foreground font-medium glow hover:scale-105 transition-transform"
          >
            <BookOpen className="h-4 w-4" /> Ver brochure completo
          </a>
          */}
        </div>
      </section>

      {/* CRONOGRAMA - COMENTADO PARA HABILITARLO DESPUÉS
      <section className="py-12 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-10 text-center tracking-wide">
            Cronograma
          </h2>

          <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-black/20 p-4 backdrop-blur-md">
            {/* Headers *//*}
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

            {/* Body *//*}
            <div className="grid-schedule grid grid-cols-6 gap-[3px] min-w-[900px] grid-rows-[repeat(14,minmax(36px,auto))]">
              {horas.map((hora, idx) => (
                <Cell key={idx} theme="time" style={{ gridColumn: 1, gridRow: idx + 1 }} {...cellProps(`time-${idx}`)}>
                  {hora}
                </Cell>
              ))}

              {scheduleBlocks.map((dayBlock) =>
                dayBlock.items.map((item, idx) => (
                  <Cell
                    key={`${dayBlock.day}-${idx}`}
                    theme={item.theme}
                    style={{
                      gridColumn: dayBlock.column,
                      gridRow: item.span ? `${item.row} / ${item.row + item.span}` : item.row,
                    }}
                    {...cellProps(`${dayBlock.day}-${idx}`)}
                  >
                    {item.label}
                  </Cell>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      */}


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