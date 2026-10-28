# GECO — Backend

API del sistema de Gestión de Emergencias Comunitarias.
Construida con **NestJS** sobre base de datos **SQL**, bajo arquitectura cliente-servidor.

Repositorio 3 del proyecto integrador — Programación IV, UTN-FRT.

## Equipo

- Nadia Medina
- Constanza Luna
- Giacomo Marangon

## Estado

Estructura de carpetas y módulos generada con el CLI de NestJS.
Sin implementación todavía.

## Stack

| | |
|---|---|
| Framework | NestJS 12 |
| Lenguaje | TypeScript |
| Sistema de módulos | CommonJS |
| Testing | Jest |
| Gestor de paquetes | npm |

## Arquitectura

Cada módulo se compone de tres piezas:

| Pieza | Archivo | Responsabilidad |
|---|---|---|
| Controller | `*.controller.ts` | Define las rutas y recibe las peticiones HTTP |
| Service | `*.service.ts` | Contiene la lógica de negocio y consulta la base |
| Module | `*.module.ts` | Registra el controller y el service en la aplicación |

Y dos carpetas de apoyo:

- **`dto/`** — define y valida la forma de los datos que entran y salen por HTTP
- **`entities/`** — representa una tabla de la base de datos

Recorrido de una petición:

```
Cliente (React) -> Controller -> Service -> Entity -> Base SQL
```

## Módulos

| Módulo | Responsabilidad |
|---|---|
| `auth` | Autenticación y emisión de tokens |
| `usuarios` | Registro y gestión de usuarios del sistema |
| `emergencias` | Alta, consulta y seguimiento de emergencias |
| `recursos` | Inventario de recursos disponibles |
| `refugios` | Refugios, ubicación y capacidad |
| `voluntarios` | Voluntarios y sus asignaciones |
| `solicitudes` | Solicitudes de ayuda de la comunidad |
| `contacto` | Mensajes recibidos desde el formulario de contacto |
| `estadisticas` | Métricas calculadas a partir de los demás módulos |
| `eventos-globales` | Consumo de la API EONET de la NASA |

Todos fueron generados con:

```bash
npx nest g resource modules/NombreModulo
```

## Instalación

```bash
npm install
npm run start:dev
```

La aplicación queda escuchando en `http://localhost:3000`.

## Flujo de trabajo

Ramas creadas desde `dev`, con prefijo según el tipo de cambio:

- `feature/` — funcionalidad nueva
- `fix/` — corrección de errores
- `refactor/` — reorganización sin cambiar el comportamiento
- `docs/` — documentación

Todo entra por Pull Request con revisión del equipo. `main` solo recibe merges desde `dev`.
