import Link from "next/link";
import { IconMas } from "./icons";

/**
 * La creación real de contenido se implementa en la Etapa 4 (desde el
 * calendario). Por ahora este botón ya está visible en toda la app y
 * lleva a /calendario, que es donde va a vivir el formulario de alta.
 */
export function BotonNuevoContenido({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/calendario"
      className={`btn-primario inline-flex items-center gap-1.5 px-4 py-2 text-sm ${className}`}
    >
      <IconMas width={16} height={16} aria-hidden="true" />
      Nuevo contenido
    </Link>
  );
}
