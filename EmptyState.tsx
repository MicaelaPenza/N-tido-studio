export function EmptyState({
  titulo,
  descripcion,
  accion,
}: {
  titulo: string;
  descripcion?: string;
  accion?: React.ReactNode;
}) {
  return (
    <div
      className="card-nitido flex flex-col items-center text-center gap-3 px-8 py-14 mx-6 lg:mx-10"
    >
      <h2 className="text-lg font-semibold" style={{ color: "var(--color-texto)" }}>
        {titulo}
      </h2>
      {descripcion && (
        <p className="max-w-sm text-sm" style={{ color: "var(--color-texto-suave)" }}>
          {descripcion}
        </p>
      )}
      {accion}
    </div>
  );
}
