import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Cpu, Leaf, Zap, Users, MapPin, Briefcase } from "lucide-react";
import auditorium from "@/assets/auditorium.jpg";
import speaker1 from "@/assets/speaker1.jpg";
import panel from "@/assets/panel.jpg";
import networking from "@/assets/networking.jpg";
import visita_almacenes from "@/assets/VISITA_ALMACEN.jpg";
import merch from "@/assets/MERCH.jpg";
import grupal from "@/assets/GRUPAL.jpg";

export const Route = createFileRoute("/ediciones")({
  head: () => ({
    meta: [
      { title: "Ediciones Anteriores — CEIISE" },
      { name: "description", content: "Revive CEIISE 2025: +200 asistentes, ponentes y empresas. Galería y memorias." },
      { property: "og:title", content: "Ediciones Anteriores CEIISE" },
      { property: "og:description", content: "Memorias, estadísticas y galería de las ediciones pasadas de CEIISE." },
    ],
  }),
  component: PastPage,
});

const stats = [
  { value: 200, prefix: "+", label: "Asistentes" },
  { value: 12, label: "Empresas" },
  { value: 24, label: "Ponentes" },
  { value: 10, label: "Aliados institucionales" },
];

const gallery = [grupal, speaker1, networking, panel, visita_almacenes, merch, auditorium];

/* ─── Animated counter ──────────────────────────────── */
function AnimatedNumber({ value, prefix = "", duration = 1400, isActive = false }: {
  value: number; prefix?: string; duration?: number; isActive?: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) { setDisplayValue(0); return; }
    let frame = 0;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplayValue(Math.floor(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, isActive]);

  return <>{`${prefix}${displayValue}`}</>;
}

/* ─── Photo Carousel ────────────────────────────────── */
function GalleryCarousel({ photos }: { photos: string[] }) {
  const [current, setCurrent] = useState(0);
  const total = photos.length;
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  // Auto-play
  useEffect(() => {
    const id = setInterval(() => goTo(current + 1), 3500);
    return () => clearInterval(id);
  }, [current, goTo]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? goTo(current + 1) : goTo(current - 1);
    dragStartX.current = null;
  };

  return (
    <div className="relative select-none">
      {/* Main viewport */}
      <div
        className="relative overflow-hidden rounded-2xl aspect-[16/9] cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translateX(${(i - current) * 100}%)`,
              opacity: i === current ? 1 : 0.35,
              transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease",
            }}
          >
            <img src={src} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            {i === current && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            )}
          </div>
        ))}

        {/* Counter */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-mono">
          {current + 1} / {total}
        </div>

        {/* Arrows */}
        <button onClick={() => goTo(current - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-primary/60 transition-colors" aria-label="Anterior">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={() => goTo(current + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white flex items-center justify-center hover:bg-primary/60 transition-colors" aria-label="Siguiente">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              i === current
                ? "border-primary scale-105 shadow-[0_0_12px_oklch(0.50_0.30_305/0.5)]"
                : "border-transparent opacity-45 hover:opacity-75"
            }`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-primary" : "w-1.5 bg-white/25 hover:bg-white/50"
            }`}
            aria-label={`Foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────── */
export function PastPage() {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsStatsVisible(true); observer.disconnect(); } },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">Ediciones anteriores</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Una <span className="gradient-text">trayectoria</span> que respalda
          </h1>
          <p className="text-lg text-muted-foreground">Fotografías y datos de la edición CEIISE 2025.</p>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsSectionRef} className="py-12">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-8 text-center">
              <div className="text-5xl md:text-6xl font-bold gradient-text mb-2 font-display">
                <AnimatedNumber value={s.value} prefix={s.prefix} isActive={isStatsVisible} />
              </div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Edición 2025 info */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="glass-card rounded-2xl overflow-hidden p-0 h-full">
            <img src={auditorium} alt="Edición 2025" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">Memorias <span className="gradient-text">2025</span></h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Se desarrolló la <strong>V edición del Congreso Estudiantil IISE UNSA (CEIISE 2025)</strong> del <strong>4 al 8 de agosto</strong>, consolidándose como un espacio académico de encuentro entre estudiantes, profesionales y expertos nacionales e internacionales.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Calendar,  title: "Fechas",                    desc: "4 - 8 de agosto" },
                { icon: Cpu,       title: "Inteligencia Artificial",   desc: "IA aplicada a la industria" },
                { icon: Leaf,      title: "Sostenibilidad",            desc: "Ingeniería y desarrollo sostenible" },
                { icon: Zap,       title: "Automatización",            desc: "Transformación digital y automatización" },
                { icon: Users,     title: "Ponencias y Conversatorios",desc: "Ponencias especializadas e interdisciplinarias" },
                { icon: MapPin,    title: "Visitas Técnicas",          desc: "Visitas empresariales en Arequipa" },
                { icon: Briefcase, title: "Feria Laboral",             desc: "Feria de innovación y oportunidades profesionales" },
                { icon: BookOpen,  title: "Talleres",                  desc: "Talleres prácticos en herramientas tecnológicas" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Icon className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <div className="font-semibold">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galería — Mosaico + Carrusel */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold mb-3 text-center">
            Galería <span className="gradient-text">CEIISE 2025</span>
          </h2>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-12">
            Momentos que quedaron para siempre
          </p>

          {/* ── Mosaico ampliado (CSS grid-template-areas) ── */}
          <div
            className="grid gap-3 mb-16"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "220px 220px",
              gridTemplateAreas: `
                "hero  hero  sm1  sm2"
                "tall1 tall2 sm3  sm4"
              `,
            }}
          >
            {[
              { area: "hero",  src: grupal,           alt: "Foto grupal · CEIISE 2025",  label: "Foto grupal" },
              { area: "tall1", src: speaker1,          alt: "Ponente",                    label: "Ponente" },
              { area: "tall2", src: networking,        alt: "Networking",                 label: "Networking" },
              { area: "sm1",   src: panel,             alt: "Panel",                      label: "" },
              { area: "sm2",   src: visita_almacenes,  alt: "Visita técnica",             label: "" },
              { area: "sm3",   src: merch,             alt: "Merch",                      label: "" },
              { area: "sm4",   src: auditorium,        alt: "Auditorio",                  label: "" },
            ].map(({ area, src, alt, label }) => (
              <div key={area} style={{ gridArea: area }} className="group relative overflow-hidden rounded-2xl">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                  {label && <span className="text-white text-sm font-semibold">{label}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* ── Carrusel de fotos ── */}
          <h3 className="text-2xl font-bold mb-8 text-center">
            Explora la <span className="gradient-text">galería completa</span>
          </h3>
          <GalleryCarousel photos={gallery} />
        </div>
      </section>
    </div>
  );
}
