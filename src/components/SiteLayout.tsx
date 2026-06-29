import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import iconLogo from "../assets/iconoceiiseweb.svg";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/#sobre", label: "Sobre el Congreso" },
  { to: "/#programa", label: "Programa" },
  { to: "/#inscripciones", label: "Inscripciones" },
  { to: "/#ediciones", label: "Ediciones" },
  { to: "/#contacto", label: "Contacto" },
];

export function SiteLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all ${
          scrolled ? "glass-card border-b" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <img src={iconLogo} alt="CEIISE 2026" className="h-8 w-8 rounded-lg object-cover" />
            <span className="gradient-text">CEIISE 2026</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.to}
                href={item.to}
                className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="/#inscripciones"
            className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-brand text-primary-foreground text-sm font-medium glow hover:scale-105 transition-transform"
          >
            Inscríbete
          </a>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden glass-card border-t">
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm hover:bg-secondary"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#inscripciones"
                onClick={() => setOpen(false)}
                className="mt-2 text-center px-4 py-2 rounded-full gradient-brand text-primary-foreground text-sm font-medium"
              >
                Inscríbete
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border/50 mt-20">
        <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg mb-3">
              <img src={iconLogo} alt="CEIISE 2026" className="h-8 w-8 rounded-lg object-cover" />
              <span className="gradient-text">CEIISE 2026</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Congreso Estudiantil IISE 2026. Liderazgo, Innovación y Logística Inteligente.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Navegación</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navItems.map((i) => (
                <li key={i.to}>
                  <a href={i.to} className="hover:text-foreground transition-colors">
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contacto</h4>
            <p className="text-sm text-muted-foreground">epii_iise618@unsa.edu.pe</p>
            
          </div>
        </div>
        <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
          © 2026 CEIISE. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
