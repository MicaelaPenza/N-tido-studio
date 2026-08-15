"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import type { Estado } from "@/lib/types";

const ESTADOS_VALIDOS: Estado[] = ["idea", "pendiente", "en_proceso", "listo", "publicado"];

export async function actualizarEstadoContenido(id: number, estado: string) {
  if (!ESTADOS_VALIDOS.includes(estado as Estado)) {
    throw new Error("Estado inválido");
  }
  if (!Number.isInteger(id)) {
    throw new Error("Id inválido");
  }

  getDb()
    .prepare("UPDATE contenidos SET estado = ? WHERE id = ?")
    .run(estado, id);

  revalidatePath("/");
  revalidatePath("/calendario");
}
