import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin, ArrowRight, Sparkles, Brain, Truck, Users, Quote } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import auditorium from "@/assets/auditorium.jpg";
import { AboutPage } from "./sobre";
import { ProgramPage } from "./programa";
import { PricingPage } from "./inscripciones";
import { PastPage } from "./ediciones";
import { ContactPage } from "./contacto";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CEIISE 2026 — Liderazgo, Innovación y Logística Inteligente" },
      { name: "description", content: "Únete al Congreso Estudiantil IISE 2026. Tres días de conferencias, talleres y networking con líderes en innovación y logística inteligente." },
      { property: "og:title", content: "CEIISE 2026 — Congreso Estudiantil IISE" },
      { property: "og:description", content: "Liderazgo, Innovación y Logística Inteligente. Marzo 2026." },
    ],
  }),
  component: HomePage,
});

const EVENT_DATE = new Date("2026-08-03T08:30:00");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const ejes = [
  { icon: Sparkles, title: "Liderazgo", desc: "Enfocado en el desarrollo personal, la gestión de equipos, la comunicación y el fortalecimiento de habilidades blandas." },
  { icon: Brain, title: "Innovación", desc: "Orientado a la creatividad, la transformación digital, las nuevas tendencias de negocios y la tecnología aplicada." },
  { icon: Truck, title: "Logística Inteligente", desc: "Centrado en la optimización de procesos, automatización, supply chain, analítica de datos y logística moderna." },
];

const testimonios = [
  { name: "Melany Cruz", role: "Estudiante participante del IV CEIISE (2024)", text: "Participar en el IV CEIISE fue una experiencia que superó mis expectativas. Las ponencias me permitieron conocer herramientas y tendencias que actualmente se aplican en la industria, mientras que los espacios de interacción me ayudaron a conectar con estudiantes que compartían los mismos intereses profesionales, así como con profesionales activos en la industria, con amplia experiencia. Sin duda, este congreso reforzó mi motivación por seguir aprendiendo y preparándome para los retos de la Ingeniería Industrial." },
  { name: "Abigail Medina", role: "Participante del V CEIISE (2025)", text: "El V CEIISE representó una gran oportunidad de crecimiento personal y académico. Escuchar las experiencias de profesionales destacados me permitió ampliar mi perspectiva sobre las diferentes áreas de desarrollo de la carrera. AdeJmás, el permitirme ser parte de las visitas técnicas a empresas importantes de la ciudad, tuve la oportunidad de ir a Plastisur y conocer de cerca cómo funciona una empresa realmente, hizo que esta actividad fuera muy enriquecedora. Recomiendo totalmente vivir esta experiencia a todos los estudiantes." },
  { name: "Flor Mamani", role: "Participante de las ediciones IV (2024) y V (2025)", text: "He tenido la oportunidad de asistir a más de una edición del CEIISE y puedo afirmar que cada año el congreso eleva su nivel. No solo brinda conocimientos técnicos, sino que también inspira a los estudiantes a desarrollar habilidades de liderazgo, trabajo en equipo y visión profesional. Es un evento que deja huella, ya que está constantemente actualizando sus ejes temáticos y contribuye significativamente a nuestra formación iJntegral, y espero con ansias poder participar de esta nueva edición, de las visitas técnicas, y del crédito extracurricular." },
];

const alianzas = [""];

function HomePage() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

      <div className="relative mx-auto max-w-5xl px-6 py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs uppercase tracking-widest mb-6">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Edición 2026 · Inscripciones abiertas
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Congreso Estudiantil IISE 2026
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
          <span className="gradient-text">CEIISE 2026</span>
          <br />
          <span className="text-foreground">Liderazgo, Innovación &amp; Logística Inteligente</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <a href="#inscripciones" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-brand text-primary-foreground font-medium glow hover:scale-105 transition-transform animate-pulse-glow">
            Inscríbete ahora <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#programa" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-secondary transition-colors">
            Ver programa
          </a>
        </div>

        {/* Countdown */}
        <div className="glass-card rounded-2xl p-8 w-full max-w-lg">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">El congreso inicia en</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { v: days, l: "Días" },
              { v: hours, l: "Horas" },
              { v: minutes, l: "Min" },
              { v: seconds, l: "Seg" },
            ].map((b) => (
              <div key={b.l} className="text-center">
                <div className="rounded-xl gradient-brand p-4 mb-2 glow">
                  <span className="text-3xl md:text-4xl font-bold font-display tabular-nums">
                    {String(b.v).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* ¿Qué es? */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-10 text-center">
          <h2 className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">¿Qué es CEIISE?</h2>
          <p className="text-2xl md:text-2xl font-display leading-snug text-justify">
            El <span className="gradient-text font-semibold">Congreso Estudiantil IISE (CEIISE 2025)</span> reunirá a expositores,
            profesionales y estudiantes para actualizar y reflexionar junto a estudiantes y profesionales en ingeniería industrial.
            A través de conferencias, talleres y espacios de discusión, 
            se abordarán los desafíos de la industria en inteligencia artificial,
            sostenibilidad y automatización, 
            con una perspectiva crítica y estratégica hacia el futuro.
          </p>
        </div>
      </section>

      {/* Ejes */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-3">Ejes <span className="gradient-text">temáticos</span></h2>
            <p className="text-muted-foreground">Líneas de investigación principales del congreso.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ejes.map((e) => (
              <div key={e.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform justify-items-center">
                <div className="h-12 w-12 rounded-xl gradient-brand flex items-center justify-center mb-4">
                  <e.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{e.title}</h3>
                <p className="text-sm text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={auditorium} alt="" className="w-full h-full object-cover" width={1280} height={800} loading="lazy" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Lo que dicen de la <span className="gradient-text">edición 2025</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonios.map((t) => (
              <figure key={t.name} className="glass-card rounded-2xl p-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                <blockquote className="text-foreground/90 mb-6">"{t.text}"</blockquote>
                <figcaption>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8"></p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {alianzas.map((a) => (
              <span key={a} className="font-display font-semibold text-lg text-muted-foreground/70 hover:text-foreground transition-colors">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative rounded-3xl gradient-hero p-12 md:p-16 text-center overflow-hidden glow">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/20 blur-3xl" />
            </div>
            <h2 className="relative text-4xl md:text-5xl font-bold mb-4 text-white">
              Asegura tu lugar en CEIISE 2026
            </h2>
            <p className="relative text-white/80 mb-8 md:text-2xl mx-auto font-semibold">
              Cupos limitados. Inicio de preventa en 08 de Junio.
            </p>
            <a href="#inscripciones" className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold hover:scale-105 transition-transform">
              Inscríbete ahora <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Secciones embebidas */}
      <div id="sobre" className="scroll-mt-20"><AboutPage /></div>
      <div id="programa" className="scroll-mt-20"><ProgramPage /></div>
      <div id="inscripciones" className="scroll-mt-20"><PricingPage /></div>
      <div id="ediciones" className="scroll-mt-20"><PastPage /></div>
      <div id="contacto" className="scroll-mt-20"><ContactPage /></div>
    </div>
  );
}
