-- CreateTable
CREATE TABLE "asignaciones" (
    "id" SERIAL NOT NULL,
    "voluntario_id" INTEGER NOT NULL,
    "emergencia_id" INTEGER NOT NULL,
    "tarea" VARCHAR(160) NOT NULL,
    "fecha_asignacion" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "asignaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergencias" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(160) NOT NULL,
    "descripcion" TEXT,
    "gravedad" VARCHAR(10) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'activa',
    "fecha" DATE NOT NULL DEFAULT CURRENT_DATE,
    "zona" VARCHAR(120) NOT NULL,
    "afectados" INTEGER NOT NULL DEFAULT 0,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "emergencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensajes_contacto" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "asunto" VARCHAR(160) NOT NULL,
    "mensaje" TEXT NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT "mensajes_contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recursos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "cantidad_disponible" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "cantidad_distribuida" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "unidad" VARCHAR(20) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'suficiente',

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refugios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "direccion" VARCHAR(200) NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "alojados" INTEGER NOT NULL DEFAULT 0,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'activo',

    CONSTRAINT "refugios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitudes" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(160) NOT NULL,
    "descripcion" TEXT,
    "prioridad" VARCHAR(10) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'pendiente',
    "telefono_contacto" VARCHAR(30) NOT NULL,
    "fecha" DATE NOT NULL DEFAULT CURRENT_DATE,
    "emergencia_id" INTEGER NOT NULL,

    CONSTRAINT "solicitudes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(60) NOT NULL,
    "apellido" VARCHAR(60) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(20) NOT NULL,
    "creado_en" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voluntarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "telefono" VARCHAR(30) NOT NULL,
    "habilidad" VARCHAR(120) NOT NULL,
    "disponibilidad" VARCHAR(40) NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'disponible',

    CONSTRAINT "voluntarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "uq_asignaciones_voluntario_emergencia" ON "asignaciones"("voluntario_id", "emergencia_id");

-- CreateIndex
CREATE INDEX "ix_emergencias_estado" ON "emergencias"("estado");

-- CreateIndex
CREATE INDEX "ix_emergencias_gravedad" ON "emergencias"("gravedad");

-- CreateIndex
CREATE INDEX "ix_solicitudes_estado" ON "solicitudes"("estado");

-- CreateIndex
CREATE INDEX "ix_solicitudes_prioridad" ON "solicitudes"("prioridad");

-- CreateIndex
CREATE UNIQUE INDEX "uq_usuarios_email" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "asignaciones" ADD CONSTRAINT "fk_asignaciones_emergencia" FOREIGN KEY ("emergencia_id") REFERENCES "emergencias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignaciones" ADD CONSTRAINT "fk_asignaciones_voluntario" FOREIGN KEY ("voluntario_id") REFERENCES "voluntarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergencias" ADD CONSTRAINT "fk_emergencias_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitudes" ADD CONSTRAINT "fk_solicitudes_emergencia" FOREIGN KEY ("emergencia_id") REFERENCES "emergencias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;



-- CheckConstraints
-- Prisma no representa las restricciones CHECK en schema.prisma, asi que se
-- agregan aca a mano para que la base conserve las reglas de negocio definidas en (database/schema.sql).

ALTER TABLE usuarios ADD CONSTRAINT ck_usuarios_rol CHECK (rol IN ('coordinador', 'operador', 'administrador'));
ALTER TABLE refugios ADD CONSTRAINT ck_refugios_capacidad CHECK (capacidad > 0);
ALTER TABLE refugios ADD CONSTRAINT ck_refugios_alojados CHECK (alojados >= 0);
ALTER TABLE refugios ADD CONSTRAINT ck_refugios_ocupacion CHECK (alojados <= capacidad);
ALTER TABLE refugios ADD CONSTRAINT ck_refugios_estado CHECK (estado IN ('activo', 'casi lleno', 'completo'));
ALTER TABLE recursos ADD CONSTRAINT ck_recursos_disponible CHECK (cantidad_disponible >= 0);
ALTER TABLE recursos ADD CONSTRAINT ck_recursos_distribuida CHECK (cantidad_distribuida >= 0);
ALTER TABLE recursos ADD CONSTRAINT ck_recursos_stock CHECK (cantidad_distribuida <= cantidad_disponible);
ALTER TABLE recursos ADD CONSTRAINT ck_recursos_unidad CHECK (unidad IN ('kg', 'litros', 'unidades', 'kits'));
ALTER TABLE recursos ADD CONSTRAINT ck_recursos_estado CHECK (estado IN ('suficiente', 'bajo', 'crítico'));
ALTER TABLE voluntarios ADD CONSTRAINT ck_voluntarios_estado CHECK (estado IN ('disponible', 'activo', 'en terreno'));
ALTER TABLE emergencias ADD CONSTRAINT ck_emergencias_gravedad CHECK (gravedad IN ('alta', 'media', 'baja'));
ALTER TABLE emergencias ADD CONSTRAINT ck_emergencias_estado CHECK (estado IN ('activa', 'en proceso', 'resuelta'));
ALTER TABLE emergencias ADD CONSTRAINT ck_emergencias_afectados CHECK (afectados >= 0);
ALTER TABLE solicitudes ADD CONSTRAINT ck_solicitudes_prioridad CHECK (prioridad IN ('alta', 'media', 'baja'));
ALTER TABLE solicitudes ADD CONSTRAINT ck_solicitudes_estado CHECK (estado IN ('pendiente', 'en proceso', 'atendida'));