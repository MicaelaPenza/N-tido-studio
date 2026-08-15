import type { DatabaseSync } from "node:sqlite";

// Fechas relativas a "hoy" para que el seed siempre se vea vigente,
// sin importar cuándo se instale la app.
function isoDate(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function seedIfEmpty(db: DatabaseSync) {
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM clientes")
    .get() as { count: number };

  if (count > 0) return;

  const insertCliente = db.prepare(`
    INSERT INTO clientes
      (nombre, rubro, descripcion, publico_objetivo, tono, objetivos,
       plataformas, frecuencia, temas_principales, temas_evitar, color)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const clientes = [
    {
      nombre: "Pet Shop Huellitas (ejemplo)",
      rubro: "Mascotas",
      descripcion:
        "Pet shop de barrio con alimento balanceado, accesorios y servicio de baño y peluquería para perros y gatos. Clientela fiel, foco en cercanía y confianza.",
      publico_objetivo: "Dueños de mascotas de 25 a 45 años, zona local.",
      tono: "Cercano, cálido, con humor suave. Nada de tecnicismos veterinarios.",
      objetivos: "Fidelizar clientes actuales, educar y aumentar visitas a la tienda.",
      plataformas: "Instagram,TikTok",
      frecuencia: "3 veces por semana",
      temas_principales: "Cuidado de mascotas, alimentación, tips de peluquería, productos nuevos",
      temas_evitar: "Temas médicos delicados (enfermedades graves), maltrato animal explícito",
      color: "#6B2635",
    },
    {
      nombre: "Cafetería Mía (ejemplo)",
      rubro: "Gastronomía / Cafetería",
      descripcion:
        "Cafetería de especialidad con ambiente cálido, ideal para trabajar o encontrarse con amigos. Café de origen, repostería casera.",
      publico_objetivo: "Jóvenes profesionales y estudiantes de 20 a 35 años.",
      tono: "Divertido, cercano, con guiños a la cultura de café.",
      objetivos: "Generar comunidad y aumentar el boca en boca.",
      plataformas: "Instagram",
      frecuencia: "4 veces por semana",
      temas_principales: "Café de especialidad, repostería, ambiente, encuestas y interacción",
      temas_evitar: "Comparaciones directas con cadenas grandes de cafeterías",
      color: "#6B2635",
    },
    {
      nombre: "Marca Andina Indumentaria (ejemplo)",
      rubro: "Indumentaria",
      descripcion:
        "Marca de ropa cómoda y atemporal, producción local en pequeña escala, foco en calidad de materiales.",
      publico_objetivo: "Mujeres y hombres de 22 a 40 años interesados en moda consciente.",
      tono: "Elegante, minimalista, editorial.",
      objetivos: "Vender y mostrar producto, fortalecer identidad de marca.",
      plataformas: "Instagram,TikTok",
      frecuencia: "3 veces por semana",
      temas_principales: "Nuevas colecciones, detrás de escena, materiales, styling",
      temas_evitar: "Fast fashion, descuentos agresivos",
      color: "#6B2635",
    },
  ];

  const clienteIds: number[] = [];
  for (const c of clientes) {
    const result = insertCliente.run(
      c.nombre,
      c.rubro,
      c.descripcion,
      c.publico_objetivo,
      c.tono,
      c.objetivos,
      c.plataformas,
      c.frecuencia,
      c.temas_principales,
      c.temas_evitar,
      c.color
    );
    clienteIds.push(Number(result.lastInsertRowid));
  }

  const [petShopId, cafeteriaId, indumentariaId] = clienteIds;

  const insertContenido = db.prepare(`
    INSERT INTO contenidos
      (cliente_id, fecha, hora, plataforma, formato, titulo, tema, copy, cta, estado, notas)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const contenidos = [
    {
      cliente_id: petShopId,
      fecha: isoDate(0),
      hora: "09:00",
      plataforma: "Instagram",
      formato: "Reel",
      titulo: "3 errores al alimentar a tu perro",
      tema: "Alimentación",
      copy: "Si tenés perro, seguro cometés al menos uno de estos errores sin darte cuenta.",
      cta: "¿Cuál de estos hacías sin saberlo? Contanos en los comentarios.",
      estado: "pendiente",
      notas: "",
    },
    {
      cliente_id: cafeteriaId,
      fecha: isoDate(0),
      hora: "14:00",
      plataforma: "Instagram",
      formato: "Historia",
      titulo: "Encuesta: ¿café frío o caliente?",
      tema: "Interacción",
      copy: "Sticker de encuesta para historias.",
      cta: "Votá en la encuesta",
      estado: "en_proceso",
      notas: "",
    },
    {
      cliente_id: indumentariaId,
      fecha: isoDate(0),
      hora: "18:00",
      plataforma: "TikTok",
      formato: "Video",
      titulo: "POV: cuando encontrás tu prenda favorita",
      tema: "Producto",
      copy: "Formato POV mostrando la prenda en distintos looks.",
      cta: "Mirá la colección completa en el link de la bio",
      estado: "publicado",
      notas: "",
    },
    {
      cliente_id: petShopId,
      fecha: isoDate(1),
      hora: "11:00",
      plataforma: "Instagram",
      formato: "Carrusel",
      titulo: "5 alimentos que tu gato no debería comer",
      tema: "Alimentación",
      copy: "Carrusel educativo con imágenes claras de cada alimento.",
      cta: "Guardá este posteo para no olvidarte",
      estado: "idea",
      notas: "",
    },
    {
      cliente_id: cafeteriaId,
      fecha: isoDate(2),
      hora: "10:00",
      plataforma: "Instagram",
      formato: "Post",
      titulo: "Nueva torta de la semana",
      tema: "Producto",
      copy: "Foto del producto con buena luz natural.",
      cta: "Vení a probarla esta semana",
      estado: "pendiente",
      notas: "",
    },
    {
      cliente_id: indumentariaId,
      fecha: isoDate(-1),
      hora: "16:00",
      plataforma: "Instagram",
      formato: "Reel",
      titulo: "Detrás de escena del último shooting",
      tema: "Detrás de escena",
      copy: "Clips cortos del backstage de la producción de fotos.",
      cta: "Contanos qué look te gustó más",
      estado: "publicado",
      notas: "",
    },
    {
      cliente_id: petShopId,
      fecha: isoDate(-2),
      hora: "09:30",
      plataforma: "TikTok",
      formato: "Video",
      titulo: "Rutina de baño paso a paso",
      tema: "Cuidado",
      copy: "Video corto mostrando el paso a paso del baño en la tienda.",
      cta: "Reservá tu turno de baño",
      estado: "publicado",
      notas: "",
    },
  ];

  for (const c of contenidos) {
    insertContenido.run(
      c.cliente_id,
      c.fecha,
      c.hora,
      c.plataforma,
      c.formato,
      c.titulo,
      c.tema,
      c.copy,
      c.cta,
      c.estado,
      c.notas
    );
  }

  const insertIdea = db.prepare(`
    INSERT INTO ideas
      (cliente_id, plataforma, formato, categoria, titulo, hook, concepto, cta, notas)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const ideas = [
    {
      cliente_id: petShopId,
      plataforma: "Instagram",
      formato: "Reel",
      categoria: "Educación",
      titulo: "Cómo elegir el alimento según la edad de tu mascota",
      hook: "No todos los alimentos son para todas las edades.",
      concepto: "Reel corto explicando diferencias entre alimento para cachorro, adulto y senior.",
      cta: "Consultanos en la tienda cuál es el ideal para tu mascota",
      notas: "",
    },
    {
      cliente_id: cafeteriaId,
      plataforma: "Instagram",
      formato: "Carrusel",
      categoria: "Comunidad",
      titulo: "Presentamos al equipo de baristas",
      hook: "Conocé las manos detrás de tu café favorito.",
      concepto: "Carrusel con fotos y una frase de cada integrante del equipo.",
      cta: "Etiquetá a tu barista favorito",
      notas: "",
    },
    {
      cliente_id: indumentariaId,
      plataforma: "TikTok",
      formato: "Video",
      categoria: "Tendencia",
      titulo: "3 formas de combinar una misma prenda",
      hook: "Una prenda, tres looks completamente distintos.",
      concepto: "Video de cambios rápidos mostrando versatilidad de una prenda clave.",
      cta: "Contanos cuál combinación te gustó más",
      notas: "",
    },
    {
      cliente_id: null,
      plataforma: "",
      formato: "",
      categoria: "Inspiración",
      titulo: "Idea general: detrás de escena del día a día",
      hook: "Mostrar lo que no se ve.",
      concepto: "Formato aplicable a cualquier cliente: rutina diaria del negocio.",
      cta: "",
      notas: "Idea libre, sin cliente asignado todavía.",
    },
  ];

  for (const i of ideas) {
    insertIdea.run(
      i.cliente_id,
      i.plataforma,
      i.formato,
      i.categoria,
      i.titulo,
      i.hook,
      i.concepto,
      i.cta,
      i.notas
    );
  }
}
