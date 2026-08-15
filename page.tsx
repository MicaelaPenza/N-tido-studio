import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";

export default function Pagina() {
  return (
    <>
      <PageHeader eyebrow="Nítido Studio" title="Generador de ideas" subtitle="Pensamos contenido para cada cliente, con IA." />
      <EmptyState
        titulo="Esta sección se construye en una próxima etapa"
        descripcion="La navegación y el diseño base ya están listos. El contenido funcional se agrega etapa por etapa, según lo planificado."
      />
    </>
  );
}
