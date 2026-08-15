import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { BotonNuevoContenido } from "@/components/BotonNuevoContenido";
import { ResumenCard } from "@/components/dashboard/ResumenCard";
import { ContenidoDelDiaItem } from "@/components/dashboard/ContenidoDelDiaItem";
import { getClientes, getContenidoDelDia, getResumenDashboard } from "@/lib/data";
import { formatearFechaLarga, isoDeHoy, semanaDe } from "@/lib/utils";

export default function InicioPage() {
  const hoy = new Date();
  const fechaHoyIso = isoDeHoy();
  const { inicio, fin } = semanaDe(hoy);

  const resumen = getResumenDashboard(fechaHoyIso, inicio, fin);
  const contenidosHoy = getContenidoDelDia(fechaHoyIso);
  const clientes = getClientes();
  const nombrePorClienteId = new Map(clientes.map((c) => [c.id, c.nombre]));

  return (
    <>
      <PageHeader
        eyebrow="Nítido Studio"
        title="Buen día, Mica."
        subtitle="Esto es lo que tenés para crear hoy."
        accion={<BotonNuevoContenido />}
      />

      <p className="px-6 lg:px-10 -mt-4 mb-8 text-sm" style={{ color: "var(--color-texto-suave)" }}>
        {formatearFechaLarga(hoy)}
      </p>

      <section className="px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-10">
        <ResumenCard etiqueta="Hoy" valor={resumen.hoy} descripcion="contenidos para hoy" />
        <ResumenCard etiqueta="Pendientes" valor={resumen.pendientes} descripcion="contenidos pendientes" />
        <ResumenCard etiqueta="En proceso" valor={resumen.enProceso} descripcion="contenidos en proceso" />
        <ResumenCard etiqueta="Esta semana" valor={resumen.publicadosSemana} descripcion="publicados esta semana" />
      </section>

      <section className="px-6 lg:px-10">
        <h2 className="text-lg font-semibold mb-4" style={{ color: "var(--color-texto)", fontFamily: "var(--font-display)" }}>
          Tu día
        </h2>

        {contenidosHoy.length === 0 ? (
          <EmptyState
            titulo="No tenés contenido programado para hoy"
            descripcion="Cuando cargues contenido con la fecha de hoy, va a aparecer acá en orden cronológico."
            accion={<BotonNuevoContenido />}
          />
        ) : (
          <ul className="card-nitido divide-y-0 overflow-hidden">
            {contenidosHoy.map((c) => (
              <ContenidoDelDiaItem
                key={c.id}
                contenido={c}
                nombreCliente={nombrePorClienteId.get(c.cliente_id) ?? "Cliente"}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="px-6 lg:px-10 mt-10 mb-4">
        <EmptyState
          titulo="¿Qué publico hoy? llega en una próxima etapa"
          descripcion="Va a analizar tus contenidos pendientes, la frecuencia de cada cliente y sus últimas publicaciones para armar un plan de hoy sugerido."
        />
      </section>
    </>
  );
}
