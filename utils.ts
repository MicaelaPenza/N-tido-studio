/** YYYY-MM-DD en hora local, para usar como clave de fecha en la base. */
export function isoDeHoy(): string {
  return isoDeFecha(new Date());
}

export function isoDeFecha(d: Date): string {
  const año = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

/** Ej: "Viernes 15 de agosto" */
export function formatearFechaLarga(d: Date): string {
  const texto = d.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Lunes a domingo de la semana que contiene `d`, en formato ISO. */
export function semanaDe(d: Date): { inicio: string; fin: string } {
  const dia = d.getDay(); // 0 = domingo
  const offsetLunes = dia === 0 ? -6 : 1 - dia;

  const lunes = new Date(d);
  lunes.setDate(d.getDate() + offsetLunes);

  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);

  return { inicio: isoDeFecha(lunes), fin: isoDeFecha(domingo) };
}

export function formatearHora(hora: string | null): string | null {
  if (!hora) return null;
  return hora.slice(0, 5);
}
