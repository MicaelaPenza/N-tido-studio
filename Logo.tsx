type LogoProps = {
  variant?: "bordo" | "beige";
  className?: string;
};

/**
 * Símbolo de marca: la "N" de Nítido enmarcada, trazo limpio y editorial.
 * Se dibuja en SVG inline para no depender de assets externos.
 */
export function LogoMark({ variant = "beige", className }: LogoProps) {
  const color = variant === "beige" ? "#F4EBDD" : "#6B2635";

  return (
    <svg
      viewBox="0 0 40 40"
      width="32"
      height="32"
      className={className}
      role="img"
      aria-label="Símbolo de Nítido"
    >
      <rect x="1" y="1" width="38" height="38" rx="10" fill="none" stroke={color} strokeWidth="1.5" />
      <path
        d="M13 28V12L27 28V12"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoWordmark({ variant = "beige", className }: LogoProps) {
  const color = variant === "beige" ? "#F4EBDD" : "#6B2635";
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-display)",
        color,
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      NÍTIDO
    </span>
  );
}
