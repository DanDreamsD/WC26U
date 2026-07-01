import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Brain, Truck, Quote } from "lucide-react";
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
      { property: "og:description", content: "Liderazgo, Innovación y Logística Inteligente. Agosto 2026." },
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

/** Animates each digit change with a flip-in effect */
function AnimatedDigit({ value }: { value: number }) {
  const formatted = String(value).padStart(2, "0");
  return (
    <span className="countdown-digit">
      <span key={formatted} className="countdown-digit-value">
        {formatted}
      </span>
    </span>
  );
}

/** Attaches IntersectionObserver to trigger .reveal animations on scroll */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current ?? document;
    const els = root instanceof Document
      ? document.querySelectorAll(".reveal")
      : (root as HTMLElement).querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Full-screen loading splash shown once on first render */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [hiding, setHiding] = useState(false);
  const onDoneRef = useRef(onDone);
  
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const t = setTimeout(() => {
      setHiding(true);
      setTimeout(() => {
        onDoneRef.current();
      }, 650);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="ceiise-loader" className={hiding ? "loader-hidden" : ""}>
      <div className="loader-ring" />
      <div className="loader-text">
        {"CEIISE".split("").map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>
      <p className="loader-sub">Congreso Estudiantil IISE · 2026</p>
    </div>
  );
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

const alianzas = [
  { name: "Empresa 1", logo: "" },
  { name: "Empresa 2", logo: "" },
  { name: "Empresa 3", logo: "" },
  { name: "Empresa 4", logo: "" },
  { name: "Empresa 5", logo: "" },
  { name: "Empresa 6", logo: "" },
];

const whatsappContacts = [
  {
    name: "Carlos Zuñiga",
    phone: "+51 955 119 544",
    link: "https://api.whatsapp.com/send/?phone=51955119544&text=Hola+CEIISE%2C+me+interesa+asistir+al+congreso+y+quisiera+m%C3%A1s+informaci%C3%B3n+sobre+las+entradas.&type=phone_number&app_absent=0",
  },
  {
    name: "Nicole Paco",
    phone: "+51 972 471 004",
    link: "https://api.whatsapp.com/send/?phone=51972471004&text=Hola+CEIISE%2C+me+interesa+asistir+al+congreso+y+quisiera+m%C3%A1s+informaci%C3%B3n+sobre+las+entradas.&type=phone_number&app_absent=0",
  },
  {
    name: "Jonathan Quispe",
    phone: "+51 940 020 483",
    link: "https://api.whatsapp.com/send/?phone=51940020483&text=Hola+CEIISE%2C+me+interesa+asistir+al+congreso+y+quisiera+m%C3%A1s+informaci%C3%B3n+sobre+las+entradas.&type=phone_number&app_absent=0",
  },
  {
    name: "Diago Pari",
    phone: "+51 912 599 839",
    link: "https://api.whatsapp.com/send/?phone=51912599839&text=Hola+CEIISE%2C+me+interesa+asistir+al+congreso+y+quisiera+m%C3%A1s+informaci%C3%B3n+sobre+las+entradas.&type=phone_number&app_absent=0",
  },
  {
    name: "Unirme al grupo informativo CEIISE",
    phone: "",
    link: "https://chat.whatsapp.com/LYRFATObSua0ZLDOweONdJ",
  },
];

function HomePage() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pageRef = useScrollReveal();

  return (
    <div className="relative" ref={pageRef}>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
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
          <a
            href="https://linktr.ee/ceiise2026.unsa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-secondary transition-colors"
          >
            Accede al linktree
          </a>
        </div>

        {/* Countdown */}
        <div className="glass-card rounded-2xl p-8 w-full max-w-lg reveal reveal-delay-4">
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
                    <AnimatedDigit value={b.v} />
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>
    
      {/* Ejes */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mb-12 mx-auto text-center reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Ejes <span className="gradient-text">temáticos</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ejes.map((e, index) => {
              const cardStyles = [
                "bg-[linear-gradient(135deg,#3C0465_0%,#6105A3_100%)] text-white",
                "bg-[linear-gradient(135deg,#ff6b35_0%,#ffb703_100%)] text-slate-950",
                "bg-[linear-gradient(135deg,#0f766e_0%,#22c55e_100%)] text-white",
              ];
              const iconStyles = ["bg-white/15", "bg-black/10", "bg-white/15"];
              const textStyles = ["text-white/85", "text-slate-800", "text-white/85"];
              const delays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"] as const;

              return (
                <div
                  key={e.title}
                  className={`reveal ${delays[index]} rounded-[28px] p-8 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${cardStyles[index]}`}
                >
                  <div className={`h-16 w-16 rounded-2xl mb-6 flex items-center justify-center ${iconStyles[index]}`}>
                    <e.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-[1.7rem] md:text-[2rem] leading-tight mb-4">{e.title}</h3>
                  <p className={`text-[15px] md:text-[16px] leading-8 ${textStyles[index]}`}>
                    {e.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Alianzas */}
      <section className="py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 reveal">
          <h2 className="text-3xl md:text-6xl font-bold text-center mb-4">Nuestras <span className="gradient-text">alianzas</span></h2>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-12">Próximamente</p>
        </div>

        <div className="relative overflow-hidden">
          <div className="animate-slide-left flex gap-8 py-8">
            {[...alianzas, ...alianzas].map((a, idx) => (
              <div key={idx} className="alliance-item flex-shrink-0 flex items-center gap-3 min-w-max cursor-pointer px-4">
                <div className="w-16 h-16 rounded-lg bg-muted/20 border border-border flex items-center justify-center shrink-0">
                  {a.logo ? (
                    <img src={a.logo} alt={a.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center px-2">Logo</span>
                  )}
                </div>
                <span className="alliance-text font-display font-semibold text-sm uppercase tracking-[0.25em] text-foreground/80">
                  {a.name}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background to-transparent z-10" />
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 reveal">
          <div className="relative animate-float rounded-[32px] border border-white/20 bg-[linear-gradient(145deg,#6105A3_100%,#d9b6f2_100%)] p-12 text-center text-white shadow-[0_25px_80px_rgba(96,5,163,0.35)] overflow-hidden md:p-16">
            <div className="absolute inset-0 opacity-30 mix-blend-screen">
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/25 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#ffb703]/30 blur-3xl" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_35%)]" />
            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur-sm">
                Inscripciones abiertas
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Asegura tu lugar en CEIISE 2026
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-base md:text-2xl font-semibold text-white/90">
                Cupos limitados - Preventa 2
              </p>
              <a
                href="#inscripciones"
                className="relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#3C0465] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_12px_30px_rgba(255,255,255,0.25)]"
              >
                Inscríbete ahora <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Secciones embebidas */}
      <div id="sobre" className="scroll-mt-20"><AboutPage /></div>
      <div id="programa" className="scroll-mt-20"><ProgramPage /></div>
      <div id="inscripciones" className="scroll-mt-20"><PricingPage /></div>
      <div id="ediciones" className="scroll-mt-20"><PastPage /></div>

      {/* Testimonios */}
      <section className="py-24 relative">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={auditorium} alt="" className="w-full h-full object-cover" width={1280} height={800} loading="lazy" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center reveal">
            Lo que dicen de la <span className="gradient-text">edición 2025</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonios.map((t, i) => (
              <figure key={t.name} className={`glass-card rounded-2xl p-6 reveal reveal-delay-${(i + 1) as 1 | 2 | 3}`}>
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

      <div id="contacto" className="scroll-mt-20"><ContactPage /></div>

      <div className="fixed bottom-6 right-6 z-50 flex w-full max-w-sm flex-col items-end gap-3">
        {whatsappOpen && (
          <div className="w-full rounded-3xl border border-white/15 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Contáctanos</p>
                <p className="text-sm font-semibold text-white">Selecciona un asesor o únete al grupo informativo</p>
              </div>
              <button
                onClick={() => setWhatsappOpen(false)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10"
              >
                Cerrar
              </button>
            </div>
            <div className="space-y-3">
              {whatsappContacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={contact.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  <div>
                    <p className="font-semibold text-white">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.phone}</p>
                  </div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setWhatsappOpen((open) => !open)}
          className="group relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:-translate-y-1"
          aria-label="Abrir bandeja de WhatsApp"
        >
          <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-semibold text-white shadow-lg">
            1
          </span>
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.52 3.48A11.84 11.84 0 0012 0C5.37 0 0 5.37 0 12a11.8 11.8 0 001.92 6.72L0 24l5.41-1.42A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.18-1.24-6.15-3.48-8.52zM12 22.05a10 10 0 01-5.35-1.4l-.38-.23-3.21.84.86-3.13-.25-.4A10.05 10.05 0 011.95 12c0-5.58 4.53-10.1 10.1-10.1 2.69 0 5.21 1.05 7.09 2.95A10.07 10.07 0 0122.05 12 10.07 10.07 0 0112 22.05z" />
            <path d="M17.71 14.23c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.12-.18.24-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.35-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.42.12-.55.12-.12.27-.31.4-.46.13-.15.17-.25.27-.42.09-.18.05-.33-.02-.46-.08-.13-.6-1.44-.82-1.97-.22-.52-.45-.45-.62-.46h-.53c-.18 0-.47.07-.72.33-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.12 2.82.14.18 1.94 2.96 4.7 4.16 1.43.62 2.04.66 2.76.55.42-.07 1.29-.53 1.48-1.04.19-.52.19-.98.13-1.07-.06-.09-.23-.15-.5-.27z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
