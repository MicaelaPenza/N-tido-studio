import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { seedIfEmpty } from "./seed";

// La base vive en data/nitido.db, en la raíz del proyecto.
const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "nitido.db");

declare global {
  // eslint-disable-next-line no-var
  var __nitidoDb: DatabaseSync | undefined;
}

function createSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      rubro TEXT NOT NULL DEFAULT '',
      descripcion TEXT NOT NULL DEFAULT '',
      publico_objetivo TEXT NOT NULL DEFAULT '',
      tono TEXT NOT NULL DEFAULT '',
      objetivos TEXT NOT NULL DEFAULT '',
      plataformas TEXT NOT NULL DEFAULT '',
      frecuencia TEXT NOT NULL DEFAULT '',
      temas_principales TEXT NOT NULL DEFAULT '',
      temas_evitar TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '#6B2635',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contenidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
      fecha TEXT NOT NULL,
      hora TEXT,
      plataforma TEXT NOT NULL,
      formato TEXT NOT NULL,
      titulo TEXT NOT NULL,
      tema TEXT NOT NULL DEFAULT '',
      copy TEXT NOT NULL DEFAULT '',
      cta TEXT NOT NULL DEFAULT '',
      estado TEXT NOT NULL DEFAULT 'idea',
      notas TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS ideas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
      plataforma TEXT NOT NULL DEFAULT '',
      formato TEXT NOT NULL DEFAULT '',
      categoria TEXT NOT NULL DEFAULT '',
      titulo TEXT NOT NULL,
      hook TEXT NOT NULL DEFAULT '',
      concepto TEXT NOT NULL DEFAULT '',
      cta TEXT NOT NULL DEFAULT '',
      notas TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS configuracion (
      clave TEXT PRIMARY KEY,
      valor TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_contenidos_fecha ON contenidos(fecha);
    CREATE INDEX IF NOT EXISTS idx_contenidos_cliente ON contenidos(cliente_id);
    CREATE INDEX IF NOT EXISTS idx_ideas_cliente ON ideas(cliente_id);
  `);
}

function initDb(): DatabaseSync {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA foreign_keys = ON;");
  createSchema(db);
  seedIfEmpty(db);
  return db;
}

// Reutilizamos una única conexión durante todo el ciclo de vida del server
// (incluyendo hot-reload en desarrollo) para no reabrir el archivo en cada request.
export function getDb(): DatabaseSync {
  if (!globalThis.__nitidoDb) {
    globalThis.__nitidoDb = initDb();
  }
  return globalThis.__nitidoDb;
}
