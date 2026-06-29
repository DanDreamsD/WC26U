import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import auditorium from "@/assets/auditorium.jpg";
import speaker1 from "@/assets/speaker1.jpg";
import panel from "@/assets/panel.jpg";
import networking from "@/assets/networking.jpg";
import visita_almacenes from "@/assets/VISITA_ALMACEN.jpg";
import merch from "@/assets/MERCH.jpg";
import grupal from "@/assets/GRUPAL.jpg";
import { BookOpen, Calendar, Cpu, Leaf, Zap, Users, MapPin, Briefcase } from "lucide-react";

export const Route = createFileRoute("/ediciones")({
  head: () => ({
    meta: [
      { title: "Ediciones Anteriores — CEIISE" },
      { name: "description", content: "Revive CEIISE 2025: +200 asistentes, XX países. Galería y memorias." },
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

const gallery = [grupal, speaker1, networking, panel,visita_almacenes, merch];

function AnimatedNumber({ value, prefix = "", duration = 1400, isActive = false }: { value: number; prefix?: string; duration?: number; isActive?: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayValue(0);
      return;
    }

    let animationFrame = 0;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(value * easedProgress));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration, isActive]);

  return <>{`${prefix}${displayValue}`}</>;
}

export function PastPage() {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = statsSectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);
  return (
    <div>
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">Ediciones anteriores</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Una <span className="gradient-text">trayectoria</span> que respalda
          </h1>
          <p className="text-lg text-muted-foreground">
            Memorias y datos de la edición CEIISE 2025.
          </p>
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

      {/* Edición 2025 */}
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
              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Fechas</div>
                    <div className="text-sm text-muted-foreground">4 - 8 de agosto</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <Cpu className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Inteligencia Artificial</div>
                    <div className="text-sm text-muted-foreground">IA aplicada a la industria</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <Leaf className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Sostenibilidad</div>
                    <div className="text-sm text-muted-foreground">Ingeniería y desarrollo sostenible</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Automatización</div>
                    <div className="text-sm text-muted-foreground">Transformación digital y automatización</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Ponencias y Conversatorios</div>
                    <div className="text-sm text-muted-foreground">Ponencias especializadas y conversatorios interdisciplinarios</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Visitas Técnicas</div>
                    <div className="text-sm text-muted-foreground">Visitas empresariales en Arequipa</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Feria Laboral</div>
                    <div className="text-sm text-muted-foreground">Feria de innovación y oportunidades profesionales</div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl hover:scale-105 transition-transform glow cursor-pointer">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-6 w-6 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">Talleres</div>
                    <div className="text-sm text-muted-foreground">Talleres prácticos en herramientas tecnológicas</div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-bold mb-10 text-center">Galería</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img src={src} alt={`Galería ${i + 1}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
