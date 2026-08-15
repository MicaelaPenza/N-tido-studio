export function PageHeader({
  eyebrow,
  title,
  subtitle,
  accion,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  accion?: React.ReactNode;
}) {
  return (
    <header className="px-6 lg:px-10 pt-8 lg:pt-10 pb-6 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: "var(--color-bordo)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl lg:text-4xl font-semibold" style={{ color: "var(--color-texto)" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-base" style={{ color: "var(--color-texto-suave)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {accion && <div className="shrink-0 hidden sm:block">{accion}</div>}
    </header>
  );
}
