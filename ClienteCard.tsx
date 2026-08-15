import Link from "next/link";
import { AvatarCliente } from "@/components/AvatarCliente";
import type { Cliente } from "@/lib/types";
import { getPendientesCount, getProximoContenido } from "@/lib/data";

export function ClienteCard({ cliente }: { cliente: Cliente }) {
  const pendientes = getPendientesCount(cliente.id);
  const proximo = getProximoContenido(cliente.id);
  const plataformas = cliente.plataformas
    ? cliente.plataformas.split(",").filter(Boolean)
    : [];

  return (
    <Link
      href={`/clientes/${cliente.id}`}
      className="card-nitido flex flex-col gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-suave-hover)]"
    >
      <div className="flex items-start gap-3">
        <AvatarCliente nombre={cliente.nombre} />
        <div className="min-w-0">
          <h3 className="text-base font-semibold truncate" style={{ color: "var(--color-texto)" }}>
            {cliente.nombre}
          </h3>
          {cliente.rubro && (
            <p className="text-sm" style={{ color: "var(--color-texto-suave)" }}>
              {cliente.rubro}
            </p>
          )}
        </div>
      </div>

      {plataformas.length > 0 && (
        <p className="text-sm" style={{ color: "var(--color-texto-suave)" }}>
          {plataformas.join(" · ")}
        </p>
      )}

      <p className="text-sm font-medium" style={{ color: "var(--color-bordo)" }}>
        {pendientes} {pendientes === 1 ? "contenido pendiente" : "contenidos pendientes"}
      </p>

      {proximo && (
        <div className="pt-2 mt-1" style={{ borderTop: "1px solid var(--color-borde)" }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-texto-suave)" }}>
            Próximo contenido
          </p>
          <p className="text-sm mt-0.5 truncate" style={{ color: "var(--color-texto)" }}>
            &ldquo;{proximo.titulo}&rdquo;
          </p>
        </div>
      )}
    </Link>
  );
}
