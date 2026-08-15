import type { Estado } from "@/lib/types";
import { ESTADOS } from "@/lib/types";

const COLOR_POR_ESTADO: Record<Estado, string> = {
  idea: "var(--color-estado-idea)",
  pendiente: "var(--color-estado-pendiente)",
  en_proceso: "var(--color-estado-proceso)",
  listo: "var(--color-estado-listo)",
  publicado: "var(--color-estado-publicado)",
};

export function EstadoBadge({ estado }: { estado: Estado }) {
  const etiqueta = ESTADOS.find((e) => e.valor === estado)?.etiqueta ?? estado;
  const color = COLOR_POR_ESTADO[estado];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: "var(--color-beige)", color: "var(--color-texto)" }}
    >
      <span
        aria-hidden="true"
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {etiqueta}
    </span>
  );
}
