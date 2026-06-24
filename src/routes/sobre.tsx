import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Award } from "lucide-react";
import auditorium from "@/assets/auditorium.jpg";
import iisefoto from "@/assets/iisefoto.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre el Congreso — CEIISE 2026" },
      { name: "description", content: "Conoce el comité organizador, misión y visión del Congreso Estudiantil IISE 2026." },
      { property: "og:title", content: "Sobre CEIISE 2026" },
      { property: "og:description", content: "Misión, visión y objetivos del Congreso Estudiantil IISE 2026." },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <div>
      <section className="relative py-24">
        <div className="absolute inset-0 -z-10">
          <img src={auditorium} alt="" className="w-full h-full object-cover opacity-25" width={1280} height={800} />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">Información académica</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre el <span className="gradient-text">Congreso</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Un espacio académico diseñado para conectar a estudiantes, profesionales y líderes de diferentes áreas del conocimiento, fomentando el intercambio de ideas, la actualización continua y el desarrollo de competencias que contribuyan a la transformación de las organizaciones y la sociedad.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">¿Quiénes somos?</h2>
            <p className="text-muted-foreground leading-relaxed text-justify">
              El Instituto de Ingenieros Industriales y de Sistemas de la Universidad Nacional de San Agustín de Arequipa <strong className="text-foreground">(IISE-UNSA) </strong>
              es un voluntariado estudiantil conformado por estudiantes de Ingeniería Industrial, 
              orientado al fortalecimiento de sus conocimientos, competencias y habilidades profesionales. A través de actividades académicas, proyectos, 
              capacitaciones y espacios de liderazgo, promueve el desarrollo integral de sus miembros, 
              fomentando la innovación, el trabajo en equipo, la responsabilidad social y el crecimiento personal y profesional, 
              con el propósito de contribuir a la formación de futuros ingenieros capaces de generar impacto en su entorno.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden glow">
            <img src={iisefoto} alt="Equipo IISE" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-5">
          {[
            { icon: Target, title: "Misión", text: "Formar profesionales integrales en Ingeniería Industrial, impulsando la innovación, sostenibilidad y el compromiso ético para dar soluciones a los desafíos de la industria." },
            { icon: Eye, title: "Visión", text: "Ser el congreso estudiantil de referencia en Ingeniería Industrial, impulsando la transformación digital, la sostenibilidad y el liderazgo de nuevos profesionales en un entorno dinámico." },
          ].map((c) => (
            <div key={c.title} className="glass-card rounded-2xl p-8 text-center">
              <div className="h-14 w-14 mx-auto rounded-2xl gradient-brand flex items-center justify-center mb-4 glow">
                <c.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
