"use client";

import { useTransition } from "react";
import { actualizarEstadoContenido } from "@/app/actions";
import { EstadoBadge } from "@/components/EstadoBadge";
import { ESTADOS, type Contenido } from "@/lib/types";
import { formatearHora } from "@/lib/utils";

export function ContenidoDelDiaItem({
  contenido,
  nombreCliente,
}: {
  contenido: Contenido;
  nombreCliente: string;
}) {
  const [isPending, startTransition] = useTransition();
  const hora = formatearHora(contenido.hora);

  function onCambiarEstado(nuevoEstado: string) {
    startTransition(async () => {
      await actualizarEstadoContenido(contenido.id, nuevoEstado);
    });
  }

  return (
    <li
      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 py-4 px-5"
      style={{ borderBottom: "1px solid var(--color-borde)" }}
    >
      <div className="sm:w-16 shrink-0 text-sm font-medium" style={{ color: "var(--color-texto-suave)" }}>
        {hora ?? "—"}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-bordo)" }}>
          {nombreCliente}
        </p>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-texto-suave)" }}>
          {contenido.plataforma} · {contenido.formato}
        </p>
        <p className="text-base mt-0.5 truncate" style={{ color: "var(--color-texto)" }}>
          &ldquo;{contenido.titulo}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <EstadoBadge estado={contenido.estado} />
        <label className="sr-only" htmlFor={`estado-${contenido.id}`}>
          Cambiar estado de &ldquo;{contenido.titulo}&rdquo;
        </label>
        <select
          id={`estado-${contenido.id}`}
          value={contenido.estado}
          disabled={isPending}
          onChange={(e) => onCambiarEstado(e.target.value)}
          className="text-sm rounded-full px-3 py-1.5 border bg-transparent"
          style={{ borderColor: "var(--color-borde)", color: "var(--color-texto)" }}
        >
          {ESTADOS.map((e) => (
            <option key={e.valor} value={e.valor}>
              {e.etiqueta}
            </option>
          ))}
        </select>
      </div>
    </li>
  );
}
