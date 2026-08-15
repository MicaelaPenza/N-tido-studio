export type Estado = "idea" | "pendiente" | "en_proceso" | "listo" | "publicado";

export const ESTADOS: { valor: Estado; etiqueta: string }[] = [
  { valor: "idea", etiqueta: "Idea" },
  { valor: "pendiente", etiqueta: "Pendiente" },
  { valor: "en_proceso", etiqueta: "En proceso" },
  { valor: "listo", etiqueta: "Listo" },
  { valor: "publicado", etiqueta: "Publicado" },
];

export const PLATAFORMAS = ["Instagram", "TikTok", "Facebook", "LinkedIn", "Otra"] as const;

export const FORMATOS = [
  "Reel",
  "Carrusel",
  "Historia",
  "Post",
  "TikTok",
  "Video",
  "Foto",
  "Otro",
] as const;

export const CATEGORIAS_IDEA = [
  "Educación",
  "Entretenimiento",
  "Venta",
  "Comunidad",
  "Tendencia",
  "Inspiración",
  "Institucional",
] as const;

export const OBJETIVOS_IA = [
  "Generar interacción",
  "Conseguir alcance",
  "Vender",
  "Educar",
  "Mostrar producto",
  "Humanizar la marca",
  "Conseguir seguidores",
  "Crear comunidad",
] as const;

export interface Cliente {
  id: number;
  nombre: string;
  rubro: string;
  descripcion: string;
  publico_objetivo: string;
  tono: string;
  objetivos: string;
  plataformas: string; // CSV
  frecuencia: string;
  temas_principales: string;
  temas_evitar: string;
  color: string;
  created_at: string;
}

export interface Contenido {
  id: number;
  cliente_id: number;
  fecha: string; // YYYY-MM-DD
  hora: string | null;
  plataforma: string;
  formato: string;
  titulo: string;
  tema: string;
  copy: string;
  cta: string;
  estado: Estado;
  notas: string;
  created_at: string;
}

export interface Idea {
  id: number;
  cliente_id: number | null;
  plataforma: string;
  formato: string;
  categoria: string;
  titulo: string;
  hook: string;
  concepto: string;
  cta: string;
  notas: string;
  created_at: string;
}
