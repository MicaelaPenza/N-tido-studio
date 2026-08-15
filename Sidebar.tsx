"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark, LogoWordmark } from "./Logo";
import {
  IconInicio,
  IconCalendario,
  IconClientes,
  IconIdeas,
  IconBiblioteca,
  IconAsistente,
  IconConfiguracion,
} from "./icons";
import type { ComponentType, SVGProps } from "react";

const NAV_ITEMS: {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { href: "/", label: "Inicio", icon: IconInicio },
  { href: "/calendario", label: "Calendario", icon: IconCalendario },
  { href: "/clientes", label: "Clientes", icon: IconClientes },
  { href: "/ideas", label: "Ideas", icon: IconIdeas },
  { href: "/biblioteca", label: "Biblioteca", icon: IconBiblioteca },
  { href: "/asistente", label: "Asistente IA", icon: IconAsistente },
];

function esRutaActiva(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:h-screen lg:sticky lg:top-0"
      style={{ backgroundColor: "var(--color-bordo)" }}
      aria-label="Navegación principal"
    >
      <div className="flex items-center gap-2.5 px-6 pt-7 pb-8">
        <LogoMark />
        <div className="flex flex-col leading-none">
          <LogoWordmark className="text-lg" />
          <span
            className="text-xs mt-1"
            style={{ color: "var(--color-bordo-200)" }}
          >
            Content Studio
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const activo = esRutaActiva(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={activo ? "page" : undefined}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors"
              style={
                activo
                  ? { backgroundColor: "var(--color-beige)", color: "var(--color-bordo)" }
                  : { color: "var(--color-bordo-100)" }
              }
            >
              <Icon aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-6 pt-3" style={{ borderTop: "1px solid var(--color-bordo-600)" }}>
        <Link
          href="/configuracion"
          aria-current={esRutaActiva(pathname, "/configuracion") ? "page" : undefined}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors"
          style={
            esRutaActiva(pathname, "/configuracion")
              ? { backgroundColor: "var(--color-beige)", color: "var(--color-bordo)" }
              : { color: "var(--color-bordo-100)" }
          }
        >
          <IconConfiguracion aria-hidden="true" />
          Configuración
        </Link>
      </div>
    </aside>
  );
}

export function BottomNav() {
  const pathname = usePathname();
  const items = NAV_ITEMS.slice(0, 5); // Inicio, Calendario, Clientes, Ideas, Biblioteca

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center px-1 py-2"
      style={{
        backgroundColor: "var(--color-bordo)",
        paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))",
      }}
      aria-label="Navegación principal"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const activo = esRutaActiva(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={activo ? "page" : undefined}
            className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-medium"
            style={{ color: activo ? "var(--color-beige)" : "var(--color-bordo-200)" }}
          >
            <Icon aria-hidden="true" width={20} height={20} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
