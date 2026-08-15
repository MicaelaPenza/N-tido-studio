"use client";

import { useTransition } from "react";
import { eliminarCliente } from "@/app/actions";
import { IconEliminar } from "@/components/icons";

export function BotonEliminarCliente({ id, nombre }: { id: number; nombre: string }) {
  const [isPending, startTransition] = useTransition();

  function onClick() {
    const confirmado = window.confirm(
      `¿Eliminar a ${nombre}? Esto también va a borrar sus contenidos e ideas asociadas.`
    );
    if (!confirmado) return;
    startTransition(async () => {
      await eliminarCliente(id);
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      className="btn-secundario inline-flex items-center gap-1.5 px-3.5 py-2 text-sm"
    >
      <IconEliminar width={16} height={16} aria-hidden="true" />
      {isPending ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
