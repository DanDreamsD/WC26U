import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
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

// Definimos las horas de la columna izquierda
const horas = [
  "08:30 - 09:30", "09:30 - 10:00", "10:00 - 10:45", "10:45 - 11:45", 
  "11:45 - 12:30", "12:30 - 14:00", "14:00 - 14:30", "14:30 - 15:30", 
  "15:30 - 15:45", "15:45 - 16:15", "16:15 - 17:00", "17:00 - 17:45", 
  "17:45 - 18:00", "18:00 - 18:30"
];

const ponentes = [
  { name: "Próximamente", role: "", img: speaker1 },
  { name: "Próximamente", role: "", img: speaker2 },
  { name: "Próximamente", role: "", img: speaker3 },
  { name: "Próximamente", role: "", img: speaker4 },
];

export function ProgramPage() {
  return (
    <div className="bg-[#0d0214] min-h-screen text-white">
      {/* SECCIÓN HERO */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg md:text-3xl uppercase tracking-widest text-primary mb-8 font-semibold">Programación CEIISE</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">¿Qué <span className="gradient-text">encontrarás</span> este 2026?</h1>
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

      {/* SECCIÓN CRONOGRAMA */}
      <section className="py-12 px-4 md:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-10 text-center tracking-wide">
            Cronograma
          </h2>
          
          <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-black/20 p-6 backdrop-blur-md">
            {/* Cabeceras de los días */}
            <div className="grid grid-cols-6 gap-4 min-w-[950px] mb-4 text-center font-bold">
              <div className="bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30 text-purple-200">Hora</div>
              <div className="bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30">Lunes</div>
              <div className="bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30">Martes</div>
              <div className="bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30">Miércoles</div>
              <div className="bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30">Jueves</div>
              <div className="bg-[#240046] p-3 rounded-xl border border-[#3c096c]/30">Viernes</div>
            </div>

            {/* Cuerpo del Cronograma usando CSS Grid para controlar filas */}
            {/* Hay 14 intervalos de horas, por lo que creamos 14 filas iguales mediante grid-rows-[repeat(14,minmax(45px,auto))] */}
            <div className="grid-schedule grid grid-cols-6 gap-3 min-w-[950px] grid-rows-[repeat(14,minmax(45px,auto))]">
              
              {/* COLUMNA 1: HORAS (Ocupa una fila por cada iteración automáticamente) */}
              {horas.map((hora, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#1a0033]/60 text-center text-xs py-2 px-1 rounded-xl border border-[#3c096c]/20 text-purple-300 font-mono flex items-center justify-center self-stretch"
                  style={{ gridColumn: 1, gridRow: idx + 1 }}
                >
                  {hora}
                </div>
              ))}

              {/*LUNES */}
              <div className="bg-[#3c096c] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "1" }}>Check in</div>
              <div className="bg-[#3c096c] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "2" }}>Inauguración</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "3" }}>Ponencia</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "4" }}>Taller Innovación</div>
              <div className="bg-[#3c096c] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "5" }}>Meet & Greet</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "8" }}>Ponencia</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 2, gridRow: "9/11" }}>Ponencia</div>
              {/* MARTES */}
              <div className="bg-[#7b2cbf] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center shadow-lg shadow-[#7b2cbf]/20 border border-[#9d4edd]/30" style={{ gridColumn: 2, gridRow: "11/13" }}>
                Noche cultural
              </div>              
              <div className="bg-[#3c096c] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 border border-white/5" style={{ gridColumn: 3, gridRow: "span 5 / 6" }}>
                Visita Técnica
              </div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center" style={{ gridColumn: 3, gridRow: "8" }}>Ponencia</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 3, gridRow: "9/11" }}>Ponencia</div>
              <div className="bg-[#7b2cbf] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 shadow-lg shadow-[#7b2cbf]/20 border border-[#9d4edd]/30" style={{ gridColumn: 3, gridRow: "11/13" }}>
                Feria de voluntarios
              </div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 3, gridRow: "13/15" }}>Ponencia</div>

              {/* MIÉRCOLES */}
              <div className="bg-[#3c096c] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 border border-white/5" style={{ gridColumn: 4, gridRow: "span 5 / 6" }}>
                Visita Técnica
              </div>              
              <div className="bg-[#7b2cbf] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 shadow-lg shadow-[#7b2cbf]/20 border border-[#9d4edd]/30" style={{ gridColumn: 4, gridRow: "7/11" }}>
                Feria laboral
              </div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 4, gridRow: "11" }}>Taller Logística</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 4, gridRow: "12" }}>Ponencia</div>
              <div className="bg-[#1a0033] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/50 text-purple-300" style={{ gridColumn: 4, gridRow: "13" }}>
                Coffee Break
              </div>

              {/* JUEVESS */}
              <div className="bg-[#3c096c] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 border border-white/5" style={{ gridColumn: 5, gridRow: "span 5 / 6" }}>
                Visita Técnica
              </div>            
              <div className="bg-[#7b2cbf] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 shadow-lg shadow-[#7b2cbf]/20 border border-[#9d4edd]/30" style={{ gridColumn: 5, gridRow: "8/11" }}>
                Hub de Innovación Aplicada
              </div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 5, gridRow: "11" }}>Ponencia</div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 5, gridRow: "12" }}>Meet & Greet</div>

              {/*VIERNES */}
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 6, gridRow: "3" }}>Ponencia</div>
              <div className="bg-[#240046] flex items-center justify-center text-center text-xs font-semibold rounded-xl border border-[#3c096c]/30" style={{ gridColumn: 6, gridRow: "4/6" }}>
                Conversatorio
              </div>              
              <div className="bg-[#240046] flex items-center justify-center text-center text-xs font-semibold rounded-xl px-2 border border-[#3c096c]/30" style={{ gridColumn: 6, gridRow: "8/10" }}>
                Taller Liderazgo
              </div>
              <div className="bg-[#240046] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center border border-[#3c096c]/30" style={{ gridColumn: 6, gridRow: "10" }}>Cierre</div>
              <div className="bg-[#7b2cbf] text-center text-xs font-semibold p-2 rounded-xl flex items-center justify-center shadow-lg shadow-[#7b2cbf]/20 border border-[#9d4edd]/30" style={{ gridColumn: 6, gridRow: "11" }}>
                Concierto
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PONENTES */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
            <span className="gradient-text">Ponentes</span> confirmados
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ponentes.map((p) => (
              <article key={p.name} className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}