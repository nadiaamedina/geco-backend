SET client_encoding TO 'UTF8';
-- ============================================================================
--  GECO — Gestión de Emergencias Comunitarias
--  schema.sql · Estructura de la base de datos
--
--  Motor:    PostgreSQL 16
--  Base:     geco_db
--
--  Cada restricción referencia la regla de negocio que la justifica,
--  según la sección 5.4 de la carpeta de análisis.
-- ============================================================================


-- ----------------------------------------------------------------------------
--  Limpieza previa
--  Permite volver a ejecutar el script sin errores. El orden es inverso al de
--  creación: primero las tablas que dependen de otras.
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS asignaciones       CASCADE;
DROP TABLE IF EXISTS solicitudes        CASCADE;
DROP TABLE IF EXISTS emergencias        CASCADE;
DROP TABLE IF EXISTS voluntarios        CASCADE;
DROP TABLE IF EXISTS recursos           CASCADE;
DROP TABLE IF EXISTS refugios           CASCADE;
DROP TABLE IF EXISTS mensajes_contacto  CASCADE;
DROP TABLE IF EXISTS usuarios           CASCADE;


-- ----------------------------------------------------------------------------
--  usuarios
--  Quienes operan el sistema. No tiene claves foráneas.
-- ----------------------------------------------------------------------------
CREATE TABLE usuarios (
    id          SERIAL        PRIMARY KEY,
    nombre      VARCHAR(60)   NOT NULL,
    apellido    VARCHAR(60)   NOT NULL,
    email       VARCHAR(120)  NOT NULL,
    contrasena  VARCHAR(255)  NOT NULL,
    rol         VARCHAR(20)   NOT NULL,
    creado_en   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- RN-15: el correo es único en el sistema
    CONSTRAINT uq_usuarios_email UNIQUE (email),

    CONSTRAINT ck_usuarios_rol
        CHECK (rol IN ('coordinador', 'operador', 'administrador'))
);

COMMENT ON COLUMN usuarios.contrasena IS
    'RNF-02: se almacena cifrada, nunca en texto plano';


-- ----------------------------------------------------------------------------
--  refugios
--  Lugares habilitados para alojar personas. No tiene claves foráneas.
-- ----------------------------------------------------------------------------
CREATE TABLE refugios (
    id         SERIAL        PRIMARY KEY,
    nombre     VARCHAR(120)  NOT NULL,
    direccion  VARCHAR(200)  NOT NULL,
    capacidad  INTEGER       NOT NULL,
    alojados   INTEGER       NOT NULL DEFAULT 0,
    estado     VARCHAR(20)   NOT NULL DEFAULT 'activo',

    CONSTRAINT ck_refugios_capacidad CHECK (capacidad > 0),
    CONSTRAINT ck_refugios_alojados  CHECK (alojados >= 0),

    -- RN-04: los alojados nunca pueden superar la capacidad
    CONSTRAINT ck_refugios_ocupacion CHECK (alojados <= capacidad),

    CONSTRAINT ck_refugios_estado
        CHECK (estado IN ('activo', 'casi lleno', 'completo'))
);

-- RN-05: los lugares disponibles no se almacenan, se calculan.
--        Esta vista evita que el dato quede duplicado y se desactualice.
CREATE OR REPLACE VIEW refugios_disponibilidad AS
    SELECT id,
           nombre,
           capacidad,
           alojados,
           capacidad - alojados AS lugares_disponibles
      FROM refugios;


-- ----------------------------------------------------------------------------
--  recursos
--  Inventario disponible. No tiene claves foráneas.
-- ----------------------------------------------------------------------------
CREATE TABLE recursos (
    id                    SERIAL         PRIMARY KEY,
    nombre                VARCHAR(120)   NOT NULL,
    cantidad_disponible   NUMERIC(10, 2) NOT NULL DEFAULT 0,
    cantidad_distribuida  NUMERIC(10, 2) NOT NULL DEFAULT 0,
    unidad                VARCHAR(20)    NOT NULL,
    estado                VARCHAR(20)    NOT NULL DEFAULT 'suficiente',

    CONSTRAINT ck_recursos_disponible  CHECK (cantidad_disponible  >= 0),
    CONSTRAINT ck_recursos_distribuida CHECK (cantidad_distribuida >= 0),

    -- RN-06: no se puede distribuir más de lo disponible
    CONSTRAINT ck_recursos_stock
        CHECK (cantidad_distribuida <= cantidad_disponible),

    -- RN-07: todo recurso tiene una unidad de medida
    CONSTRAINT ck_recursos_unidad
        CHECK (unidad IN ('kg', 'litros', 'unidades', 'kits')),

    CONSTRAINT ck_recursos_estado
        CHECK (estado IN ('suficiente', 'bajo', 'crítico'))
);


-- ----------------------------------------------------------------------------
--  voluntarios
--  Personas disponibles para ayudar. No tiene claves foráneas.
-- ----------------------------------------------------------------------------
CREATE TABLE voluntarios (
    id              SERIAL        PRIMARY KEY,
    nombre          VARCHAR(120)  NOT NULL,
    telefono        VARCHAR(30)   NOT NULL,
    habilidad       VARCHAR(120)  NOT NULL,
    disponibilidad  VARCHAR(40)   NOT NULL,
    estado          VARCHAR(20)   NOT NULL DEFAULT 'disponible',

    CONSTRAINT ck_voluntarios_estado
        CHECK (estado IN ('disponible', 'activo', 'en terreno'))
);


-- ----------------------------------------------------------------------------
--  mensajes_contacto
--  Mensajes recibidos desde el formulario público. No tiene claves foráneas.
-- ----------------------------------------------------------------------------
CREATE TABLE mensajes_contacto (
    id       SERIAL        PRIMARY KEY,
    nombre   VARCHAR(120)  NOT NULL,
    email    VARCHAR(120)  NOT NULL,
    asunto   VARCHAR(160)  NOT NULL,
    mensaje  TEXT          NOT NULL,
    fecha    DATE          NOT NULL DEFAULT CURRENT_DATE
);


-- ----------------------------------------------------------------------------
--  emergencias
--  Depende de usuarios.
-- ----------------------------------------------------------------------------
CREATE TABLE emergencias (
    id           SERIAL        PRIMARY KEY,
    titulo       VARCHAR(160)  NOT NULL,
    descripcion  TEXT,
    gravedad     VARCHAR(10)   NOT NULL,
    estado       VARCHAR(20)   NOT NULL DEFAULT 'activa',
    fecha        DATE          NOT NULL DEFAULT CURRENT_DATE,
    zona         VARCHAR(120)  NOT NULL,
    afectados    INTEGER       NOT NULL DEFAULT 0,
    usuario_id   INTEGER       NOT NULL,

    -- RN-01: la gravedad solo puede ser alta, media o baja
    CONSTRAINT ck_emergencias_gravedad
        CHECK (gravedad IN ('alta', 'media', 'baja')),

    -- RN-02: estados posibles de una emergencia
    CONSTRAINT ck_emergencias_estado
        CHECK (estado IN ('activa', 'en proceso', 'resuelta')),

    CONSTRAINT ck_emergencias_afectados CHECK (afectados >= 0),

    -- RN-03: toda emergencia registra quién la reportó.
    --        RESTRICT impide borrar un usuario que tenga emergencias cargadas.
    CONSTRAINT fk_emergencias_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX ix_emergencias_estado   ON emergencias (estado);
CREATE INDEX ix_emergencias_gravedad ON emergencias (gravedad);


-- ----------------------------------------------------------------------------
--  solicitudes
--  Depende de emergencias.
-- ----------------------------------------------------------------------------
CREATE TABLE solicitudes (
    id                 SERIAL        PRIMARY KEY,
    titulo             VARCHAR(160)  NOT NULL,
    descripcion        TEXT,
    prioridad          VARCHAR(10)   NOT NULL,
    estado             VARCHAR(20)   NOT NULL DEFAULT 'pendiente',
    telefono_contacto  VARCHAR(30)   NOT NULL,
    fecha              DATE          NOT NULL DEFAULT CURRENT_DATE,
    emergencia_id      INTEGER       NOT NULL,

    -- RN-13: prioridades posibles
    CONSTRAINT ck_solicitudes_prioridad
        CHECK (prioridad IN ('alta', 'media', 'baja')),

    -- RN-12: estados posibles de una solicitud
    CONSTRAINT ck_solicitudes_estado
        CHECK (estado IN ('pendiente', 'en proceso', 'atendida')),

    -- RN-11 y RN-14: toda solicitud pertenece a una emergencia, y no se puede
    --                borrar una emergencia que tenga solicitudes asociadas.
    CONSTRAINT fk_solicitudes_emergencia
        FOREIGN KEY (emergencia_id) REFERENCES emergencias (id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE INDEX ix_solicitudes_estado    ON solicitudes (estado);
CREATE INDEX ix_solicitudes_prioridad ON solicitudes (prioridad);


-- ----------------------------------------------------------------------------
--  asignaciones
--  Tabla intermedia entre voluntarios y emergencias.
--  Depende de ambas.
-- ----------------------------------------------------------------------------
CREATE TABLE asignaciones (
    id                SERIAL        PRIMARY KEY,
    voluntario_id     INTEGER       NOT NULL,
    emergencia_id     INTEGER       NOT NULL,
    tarea             VARCHAR(160)  NOT NULL,
    fecha_asignacion  DATE          NOT NULL DEFAULT CURRENT_DATE,

    -- RN-10: un voluntario no puede asignarse dos veces a la misma emergencia
    CONSTRAINT uq_asignaciones_voluntario_emergencia
        UNIQUE (voluntario_id, emergencia_id),

    -- RN-08: un voluntario puede estar en varias emergencias
    CONSTRAINT fk_asignaciones_voluntario
        FOREIGN KEY (voluntario_id) REFERENCES voluntarios (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- RN-09: una emergencia puede tener varios voluntarios
    CONSTRAINT fk_asignaciones_emergencia
        FOREIGN KEY (emergencia_id) REFERENCES emergencias (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ----------------------------------------------------------------------------
--  estadisticas (RN-18)
--  No es una tabla: se calcula a partir de las demás.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW estadisticas AS
    SELECT
        (SELECT COUNT(*) FROM emergencias WHERE estado <> 'resuelta')   AS emergencias_activas,
        (SELECT COALESCE(SUM(afectados), 0) FROM emergencias)           AS personas_afectadas,
        (SELECT COUNT(*) FROM voluntarios WHERE estado <> 'disponible') AS voluntarios_activos,
        (SELECT COALESCE(SUM(capacidad - alojados), 0) FROM refugios)   AS lugares_en_refugios,
        (SELECT COUNT(*) FROM solicitudes WHERE estado = 'atendida')    AS solicitudes_atendidas,
        (SELECT COUNT(*) FROM solicitudes)                              AS solicitudes_totales,
        (SELECT COUNT(DISTINCT zona) FROM emergencias)                  AS zonas_afectadas;


-- ============================================================================
--  Fin del schema.
--  Los eventos globales (RN-17) no tienen tabla: provienen de la API EONET.
-- ============================================================================
