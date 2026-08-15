import { getDb } from "./db";
import type { Cliente, Contenido, Idea } from "./types";

export function getClientes(): Cliente[] {
  return getDb()
    .prepare("SELECT * FROM clientes ORDER BY nombre COLLATE NOCASE ASC")
    .all() as Cliente[];
}

export function getCliente(id: number): Cliente | undefined {
  return getDb().prepare("SELECT * FROM clientes WHERE id = ?").get(id) as
    | Cliente
    | undefined;
}

export function getContenidos(filtros?: {
  clienteId?: number;
  desde?: string;
  hasta?: string;
}): Contenido[] {
  let query = "SELECT * FROM contenidos WHERE 1=1";
  const params: (string | number)[] = [];

  if (filtros?.clienteId) {
    query += " AND cliente_id = ?";
    params.push(filtros.clienteId);
  }
  if (filtros?.desde) {
    query += " AND fecha >= ?";
    params.push(filtros.desde);
  }
  if (filtros?.hasta) {
    query += " AND fecha <= ?";
    params.push(filtros.hasta);
  }

  query += " ORDER BY fecha ASC, hora ASC";
  return getDb().prepare(query).all(...params) as Contenido[];
}

export function getContenidoDelDia(fecha: string): Contenido[] {
  return getDb()
    .prepare("SELECT * FROM contenidos WHERE fecha = ? ORDER BY hora ASC")
    .all(fecha) as Contenido[];
}

export function getIdeas(filtros?: {
  clienteId?: number;
  categoria?: string;
  formato?: string;
  busqueda?: string;
}): Idea[] {
  let query = "SELECT * FROM ideas WHERE 1=1";
  const params: (string | number)[] = [];

  if (filtros?.clienteId) {
    query += " AND cliente_id = ?";
    params.push(filtros.clienteId);
  }
  if (filtros?.categoria) {
    query += " AND categoria = ?";
    params.push(filtros.categoria);
  }
  if (filtros?.formato) {
    query += " AND formato = ?";
    params.push(filtros.formato);
  }
  if (filtros?.busqueda) {
    query += " AND (titulo LIKE ? OR concepto LIKE ?)";
    const like = `%${filtros.busqueda}%`;
    params.push(like, like);
  }

  query += " ORDER BY created_at DESC";
  return getDb().prepare(query).all(...params) as Idea[];
}

export interface ResumenDashboard {
  hoy: number;
  pendientes: number;
  enProceso: number;
  publicadosSemana: number;
}

export function getResumenDashboard(fechaHoy: string, inicioSemana: string, finSemana: string): ResumenDashboard {
  const db = getDb();

  const hoy = (
    db.prepare("SELECT COUNT(*) as n FROM contenidos WHERE fecha = ?").get(fechaHoy) as {
      n: number;
    }
  ).n;

  const pendientes = (
    db
      .prepare("SELECT COUNT(*) as n FROM contenidos WHERE estado = 'pendiente'")
      .get() as { n: number }
  ).n;

  const enProceso = (
    db
      .prepare("SELECT COUNT(*) as n FROM contenidos WHERE estado = 'en_proceso'")
      .get() as { n: number }
  ).n;

  const publicadosSemana = (
    db
      .prepare(
        "SELECT COUNT(*) as n FROM contenidos WHERE estado = 'publicado' AND fecha BETWEEN ? AND ?"
      )
      .get(inicioSemana, finSemana) as { n: number }
  ).n;

  return { hoy, pendientes, enProceso, publicadosSemana };
}
