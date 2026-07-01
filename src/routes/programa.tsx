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

/* ─── Shared schedule cell ───────────────────────────────────── */
type CellType = "deep" | "accent" | "highlight" | "time";
interface CellProps {
  type: CellType;
  style: React.CSSProperties;
  children: React.ReactNode;
  waveActive: boolean;
}

function Cell({ type, style, children, waveActive }: CellProps) {
  const baseColors: Record<CellType, string> = {
    deep:      "bg-[#240046]",
    accent:    "bg-[#3c096c]",
    highlight: "bg-[#7b2cbf] shadow-lg shadow-[#7b2cbf]/20 border border-[#9d4edd]/30",
    time:      "bg-[#1a0033]/60 text-purple-300 font-mono border border-[#3c096c]/20",
  };

  const waveClass = waveActive && type !== "time" ? `wave-active type-${type}` : "";

  return (
    <div
      className={`schedule-cell ${baseColors[type]} ${waveClass} text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ─── 3-D Speaker Carousel ───────────────────────────────────── */
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

  // Touch / mouse drag
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

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  // Auto-advance
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
        {/* Prev arrow */}
        <button
          className="carousel-nav prev"
          onClick={prev}
          aria-label="Ponente anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* 3-D track */}
        <div className="speakers-track" ref={trackRef}>
          {ponentes.map((p, i) => {
            const offset = ((i - current + total) % total);
            // positions: 0 = front, 1 = right, 2 = back, 3 = left
            const angle = offset * (360 / total);
            const z = 220; // radius
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
                {/* Glow border on active */}
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

        {/* Next arrow */}
        <button
          className="carousel-nav next"
          onClick={next}
          aria-label="Ponente siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
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

/* ─── Main Page ──────────────────────────────────────────────── */
export function ProgramPage() {
  const scheduleRef = useRef<HTMLDivElement>(null);
  const [waveActive, setWaveActive] = useState(false);

  useEffect(() => {
    const el = scheduleRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWaveActive(true);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

          <div
            ref={scheduleRef}
            className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-black/20 p-6 backdrop-blur-md"
          >
            {/* Headers */}
            <div className="grid grid-cols-6 gap-4 min-w-[950px] mb-4 text-center font-bold">
              {["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((d) => (
                <div
                  key={d}
                  className="schedule-cell type-accent bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30 text-purple-200"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="grid-schedule grid grid-cols-6 gap-3 min-w-[950px] grid-rows-[repeat(14,minmax(45px,auto))]">

              {/* HORAS */}
              {horas.map((hora, idx) => (
                <Cell key={idx} type="time" waveActive={waveActive} style={{ gridColumn: 1, gridRow: idx + 1 }}>
                  {hora}
                </Cell>
              ))}

              {/* LUNES */}
              <Cell type="accent" waveActive={waveActive} style={{ gridColumn: 2, gridRow: "1" }}>Check in</Cell>
              <Cell type="accent" waveActive={waveActive} style={{ gridColumn: 2, gridRow: "2" }}>Inauguración</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 2, gridRow: "3" }}>Ponencia</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 2, gridRow: "4" }}>Taller Innovación</Cell>
              <Cell type="accent" waveActive={waveActive} style={{ gridColumn: 2, gridRow: "5" }}>Meet &amp; Greet</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 2, gridRow: "8" }}>Ponencia</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 2, gridRow: "9/11" }}>Ponencia</Cell>
              <Cell type="highlight" waveActive={waveActive} style={{ gridColumn: 2, gridRow: "11/13" }}>Noche cultural</Cell>

              {/* MARTES */}
              <Cell type="accent" waveActive={waveActive} style={{ gridColumn: 3, gridRow: "span 5 / 6" }}>Visita Técnica</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 3, gridRow: "8" }}>Ponencia</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 3, gridRow: "9/11" }}>Ponencia</Cell>
              <Cell type="highlight" waveActive={waveActive} style={{ gridColumn: 3, gridRow: "11/13" }}>Feria de voluntarios</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 3, gridRow: "13/15" }}>Ponencia</Cell>

              {/* MIÉRCOLES */}
              <Cell type="accent" waveActive={waveActive} style={{ gridColumn: 4, gridRow: "span 5 / 6" }}>Visita Técnica</Cell>
              <Cell type="highlight" waveActive={waveActive} style={{ gridColumn: 4, gridRow: "7/11" }}>Feria laboral</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 4, gridRow: "11" }}>Taller Logística</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 4, gridRow: "12" }}>Ponencia</Cell>
              <Cell type="time"   waveActive={waveActive} style={{ gridColumn: 4, gridRow: "13" }}>Coffee Break</Cell>

              {/* JUEVES */}
              <Cell type="accent" waveActive={waveActive} style={{ gridColumn: 5, gridRow: "span 5 / 6" }}>Visita Técnica</Cell>
              <Cell type="highlight" waveActive={waveActive} style={{ gridColumn: 5, gridRow: "8/11" }}>Hub de Innovación Aplicada</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 5, gridRow: "11" }}>Ponencia</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 5, gridRow: "12" }}>Meet &amp; Greet</Cell>

              {/* VIERNES */}
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 6, gridRow: "3" }}>Ponencia</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 6, gridRow: "4/6" }}>Conversatorio</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 6, gridRow: "8/10" }}>Taller Liderazgo</Cell>
              <Cell type="deep"   waveActive={waveActive} style={{ gridColumn: 6, gridRow: "10" }}>Cierre</Cell>
              <Cell type="highlight" waveActive={waveActive} style={{ gridColumn: 6, gridRow: "11" }}>Concierto</Cell>
            </div>
          </div>
        </div>
      </section>


      {/* PONENTES 3D */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            <span className="gradient-text">Ponentes</span> confirmados
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-12 tracking-widest uppercase">
            Arrastra o usa las flechas para explorar
          </p>
          <SpeakersCarousel />
        </div>
      </section>
    </div>
  );
}