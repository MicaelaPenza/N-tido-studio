"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

function leerDatosCliente(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  if (!nombre) {
    throw new Error("El nombre de la marca es obligatorio");
  }

  const plataformas = formData.getAll("plataformas").map(String).join(",");

  return {
    nombre,
    rubro: String(formData.get("rubro") ?? "").trim(),
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    publico_objetivo: String(formData.get("publico_objetivo") ?? "").trim(),
    tono: String(formData.get("tono") ?? "").trim(),
    objetivos: String(formData.get("objetivos") ?? "").trim(),
    plataformas,
    frecuencia: String(formData.get("frecuencia") ?? "").trim(),
    temas_principales: String(formData.get("temas_principales") ?? "").trim(),
    temas_evitar: String(formData.get("temas_evitar") ?? "").trim(),
  };
}

export async function crearCliente(formData: FormData) {
  const datos = leerDatosCliente(formData);

  const resultado = getDb()
    .prepare(
      `INSERT INTO clientes
        (nombre, rubro, descripcion, publico_objetivo, tono, objetivos,
         plataformas, frecuencia, temas_principales, temas_evitar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      datos.nombre,
      datos.rubro,
      datos.descripcion,
      datos.publico_objetivo,
      datos.tono,
      datos.objetivos,
      datos.plataformas,
      datos.frecuencia,
      datos.temas_principales,
      datos.temas_evitar
    );

  revalidatePath("/clientes");
  redirect(`/clientes/${resultado.lastInsertRowid}`);
}

export async function actualizarCliente(id: number, formData: FormData) {
  if (!Number.isInteger(id)) {
    throw new Error("Id inválido");
  }
  const datos = leerDatosCliente(formData);

  getDb()
    .prepare(
      `UPDATE clientes SET
        nombre = ?, rubro = ?, descripcion = ?, publico_objetivo = ?, tono = ?,
        objetivos = ?, plataformas = ?, frecuencia = ?, temas_principales = ?, temas_evitar = ?
       WHERE id = ?`
    )
    .run(
      datos.nombre,
      datos.rubro,
      datos.descripcion,
      datos.publico_objetivo,
      datos.tono,
      datos.objetivos,
      datos.plataformas,
      datos.frecuencia,
      datos.temas_principales,
      datos.temas_evitar,
      id
    );

  revalidatePath("/clientes");
  revalidatePath(`/clientes/${id}`);
  redirect(`/clientes/${id}`);
}

export async function eliminarCliente(id: number) {
  if (!Number.isInteger(id)) {
    throw new Error("Id inválido");
  }

  getDb().prepare("DELETE FROM clientes WHERE id = ?").run(id);

  revalidatePath("/clientes");
  redirect("/clientes");
}
