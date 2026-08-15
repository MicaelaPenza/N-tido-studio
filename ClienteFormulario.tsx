"use client";

import { useFormStatus } from "react-dom";
import { PLATAFORMAS } from "@/lib/types";
import type { Cliente } from "@/lib/types";

export function ClienteFormulario({
  cliente,
  accion,
}: {
  cliente?: Cliente;
  accion: (formData: FormData) => Promise<void>;
}) {
  const plataformasActuales = cliente?.plataformas ? cliente.plataformas.split(",") : [];

  return (
    <form action={accion} className="flex flex-col gap-6 max-w-2xl">
      <Campo label="Nombre de la marca" htmlFor="nombre" requerido>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          defaultValue={cliente?.nombre}
          className="campo-input"
          placeholder="Ej: Pet Shop Huellitas"
        />
      </Campo>

      <Campo label="Rubro" htmlFor="rubro">
        <input
          id="rubro"
          name="rubro"
          type="text"
          defaultValue={cliente?.rubro}
          className="campo-input"
          placeholder="Ej: Mascotas, Gastronomía, Indumentaria..."
        />
      </Campo>

      <Campo
        label="Contame todo lo que debería saber sobre esta marca"
        htmlFor="descripcion"
        ayuda="Esta información es fundamental para que la IA genere ideas relevantes."
      >
        <textarea
          id="descripcion"
          name="descripcion"
          rows={4}
          defaultValue={cliente?.descripcion}
          className="campo-input"
          placeholder="Contexto general: qué vende, qué la hace diferente, historia de la marca, etc."
        />
      </Campo>

      <Campo label="Público objetivo" htmlFor="publico_objetivo">
        <input
          id="publico_objetivo"
          name="publico_objetivo"
          type="text"
          defaultValue={cliente?.publico_objetivo}
          className="campo-input"
          placeholder="Ej: mujeres de 25 a 40 años, zona norte"
        />
      </Campo>

      <Campo label="Tono de comunicación" htmlFor="tono">
        <input
          id="tono"
          name="tono"
          type="text"
          defaultValue={cliente?.tono}
          className="campo-input"
          placeholder="Ej: cercano, con humor, profesional..."
        />
      </Campo>

      <Campo label="Objetivos" htmlFor="objetivos">
        <input
          id="objetivos"
          name="objetivos"
          type="text"
          defaultValue={cliente?.objetivos}
          className="campo-input"
          placeholder="Ej: fidelizar clientes, vender más, dar a conocer la marca"
        />
      </Campo>

      <fieldset>
        <legend className="text-sm font-medium mb-2" style={{ color: "var(--color-texto)" }}>
          Plataformas
        </legend>
        <div className="flex flex-wrap gap-2">
          {PLATAFORMAS.map((p) => (
            <label
              key={p}
              className="flex items-center gap-2 text-sm rounded-full px-3 py-1.5 border cursor-pointer"
              style={{ borderColor: "var(--color-borde)" }}
            >
              <input
                type="checkbox"
                name="plataformas"
                value={p}
                defaultChecked={plataformasActuales.includes(p)}
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <Campo label="Frecuencia de publicación" htmlFor="frecuencia">
        <input
          id="frecuencia"
          name="frecuencia"
          type="text"
          defaultValue={cliente?.frecuencia}
          className="campo-input"
          placeholder="Ej: 3 veces por semana"
        />
      </Campo>

      <Campo label="Temas principales" htmlFor="temas_principales">
        <textarea
          id="temas_principales"
          name="temas_principales"
          rows={2}
          defaultValue={cliente?.temas_principales}
          className="campo-input"
          placeholder="Ej: tips, producto, detrás de escena..."
        />
      </Campo>

      <Campo label="Temas que NO quiere comunicar" htmlFor="temas_evitar">
        <textarea
          id="temas_evitar"
          name="temas_evitar"
          rows={2}
          defaultValue={cliente?.temas_evitar}
          className="campo-input"
          placeholder="Ej: precios de la competencia, temas polémicos..."
        />
      </Campo>

      <div className="flex items-center gap-3 pt-2">
        <BotonGuardar esEdicion={Boolean(cliente)} />
      </div>
    </form>
  );
}

function BotonGuardar({ esEdicion }: { esEdicion: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primario px-5 py-2.5 text-sm">
      {pending ? "Guardando…" : esEdicion ? "Guardar cambios" : "Crear cliente"}
    </button>
  );
}

function Campo({
  label,
  htmlFor,
  requerido,
  ayuda,
  children,
}: {
  label: string;
  htmlFor: string;
  requerido?: boolean;
  ayuda?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium" style={{ color: "var(--color-texto)" }}>
        {label}
        {requerido && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {ayuda && (
        <p className="text-xs" style={{ color: "var(--color-texto-suave)" }}>
          {ayuda}
        </p>
      )}
    </div>
  );
}
