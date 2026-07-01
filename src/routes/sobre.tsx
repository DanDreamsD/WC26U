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
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Organizado por IISE UNSA</h2>
            <p className="text-muted-foreground leading-relaxed text-justify">
              El Instituto de Ingenieros Industriales y de Sistemas de la Universidad Nacional de San Agustín de Arequipa <strong className="text-foreground">(IISE-UNSA) </strong>
              es un voluntariado estudiantil conformado por estudiantes de Ingeniería Industrial, 
              orientado al fortalecimiento de sus conocimientos, competencias y habilidades profesionales.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden glow">
            <img src={iisefoto} alt="Equipo IISE" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
}
