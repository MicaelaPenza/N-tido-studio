export function ResumenCard({
  etiqueta,
  valor,
  descripcion,
}: {
  etiqueta: string;
  valor: number;
  descripcion: string;
}) {
  return (
    <div className="card-nitido px-5 py-5 flex flex-col gap-1">
      <p
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-texto-suave)" }}
      >
        {etiqueta}
      </p>
      <p className="text-3xl font-semibold" style={{ color: "var(--color-bordo)", fontFamily: "var(--font-display)" }}>
        {valor}
      </p>
      <p className="text-sm" style={{ color: "var(--color-texto-suave)" }}>
        {descripcion}
      </p>
    </div>
  );
}
