function iniciales(nombre: string): string {
  const palabras = nombre.trim().split(/\s+/).filter(Boolean);
  const letras = palabras.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "");
  return letras.join("") || "?";
}

export function AvatarCliente({
  nombre,
  size = 44,
}: {
  nombre: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center rounded-full font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: "var(--color-bordo-100)",
        color: "var(--color-bordo)",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.36,
      }}
    >
      {iniciales(nombre)}
    </div>
  );
}
