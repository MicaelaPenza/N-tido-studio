# Nítido Studio

Content Studio local para gestionar el contenido de redes sociales de varios
clientes: calendario, clientes, ideas, biblioteca y un asistente de IA
opcional. Corre 100% en tu máquina, sin login, sin servicios externos y con
una base de datos SQLite local.

## Requisitos

- Node.js 22 o superior (usa `node:sqlite`, incluido en Node desde la v22).
- No hace falta instalar SQLite por separado.

## Instalación

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

La primera vez que arranca, la aplicación:

1. Crea el archivo `data/nitido.db` automáticamente.
2. Crea las tablas necesarias (`clientes`, `contenidos`, `ideas`,
   `configuracion`).
3. Si la base está vacía, carga datos de ejemplo: 3 clientes ficticios
   (marcados como "(ejemplo)"), con contenidos e ideas.

No hace falta ninguna configuración adicional para usar el calendario, los
clientes o la biblioteca.

## Resetear los datos de ejemplo

Para volver al estado inicial (borrar todo y regenerar el seed):

```bash
rm data/nitido.db
npm run dev
```

## IA (opcional)

La IA es una funcionalidad opcional y está desacoplada del resto de la app:
si no la configurás, el calendario, los clientes y la biblioteca funcionan
igual. Para activarla, vas a definir una variable de entorno con la API key
del proveedor (se documenta en detalle cuando se implemente esa etapa).

## Estructura del proyecto

```
src/
  app/            Rutas (App Router): inicio, calendario, clientes, ideas,
                   biblioteca, asistente, configuración.
  components/     Componentes reutilizables de UI.
  lib/
    db.ts         Conexión SQLite + creación de esquema.
    seed.ts       Datos de ejemplo.
    data.ts       Funciones de lectura de datos.
    types.ts      Tipos de dominio compartidos.
data/
  nitido.db       Base de datos local (se crea sola, no se versiona).
```

## Estado del proyecto

Este proyecto se construye por etapas. Estado actual:

- [x] Etapa 1 — Proyecto, base de datos, seed y layout principal.
- [x] Etapa 2 — Dashboard funcional.
- [x] Etapa 3 — Clientes y detalle de cliente.
- [ ] Etapa 4 — Creación y gestión de contenido.
- [ ] Etapa 5 — Calendario.
- [ ] Etapa 6 — Biblioteca de ideas.
- [ ] Etapa 7 — Vista "¿Qué publico hoy?".
- [ ] Etapa 8 — Integración de IA.
- [ ] Etapa 9 — Responsive + accesibilidad + pulido visual.
- [ ] Etapa 10 — Testing final y revisión de criterios de aceptación.
