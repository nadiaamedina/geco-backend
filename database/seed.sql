SET client_encoding TO 'UTF8';
-- ============================================================================
--  GECO — Gestión de Emergencias Comunitarias
--  seed.sql · Datos de prueba
--
--  Mínimo 5 registros por tabla, según el punto 4E de la consigna.
--
--  EL ORDEN IMPORTA: primero las tablas sin claves foráneas, después las que
--  dependen de ellas. Si se invierte, la base rechaza las filas por violación
--  de integridad referencial.
-- ============================================================================


-- ----------------------------------------------------------------------------
--  Limpieza previa, en orden inverso al de inserción.
--  TRUNCATE ... RESTART IDENTITY reinicia los contadores de los id.
-- ----------------------------------------------------------------------------
TRUNCATE TABLE asignaciones, solicitudes, emergencias, voluntarios,
               recursos, refugios, mensajes_contacto, usuarios
         RESTART IDENTITY CASCADE;


-- ============================================================================
--  NIVEL 1 — Tablas sin claves foráneas
-- ============================================================================

-- ----------------------------------------------------------------------------
--  Las contraseñas van cifradas con bcrypt (RNF-02). Las de este archivo son
--  hashes reales de la contraseña 'geco1234', para poder probar el login.
-- ----------------------------------------------------------------------------
INSERT INTO usuarios (nombre, apellido, email, contrasena, rol) VALUES
('Nadia',     'Medina',    'nadia.medina@geco.org',    '$2b$12$H5pR7RUGRV419YL3w.tR/OhgkViJ6fbBbc0vJ5SmYSzad7YZTZtVq', 'administrador'),
('Constanza', 'Luna',      'constanza.luna@geco.org',  '$2b$12$ug5Mbt2UWsLvTIoF/CdYA.UN4BcYTmCWlCoyhK9sBbQOnVtFRbsyC', 'coordinador'),
('Giacomo',   'Marangon',  'giacomo.marangon@geco.org','$2b$12$QAlRaK.EdO0frq.zaR8Lmu2IO0.s4gyiuEXa6Xhpx6vnrWCzrLtoK', 'coordinador'),
('Mariana',   'Quiroga',   'mariana.quiroga@geco.org', '$2b$12$OodFZ/2atDHzbYR3HFnyjOy1J5oWZWTn45Fse737/.16I5Z9poaYm', 'operador'),
('Facundo',   'Ibarra',    'facundo.ibarra@geco.org',  '$2b$12$HgWdHsiBJO5diHoH695f7uDWyUay4Pb6mltX2J2MKf357X7wxwcY.', 'operador'),
('Silvia',    'Juárez',    'silvia.juarez@geco.org',   '$2b$12$kyYyTB2waa8zeer1XDn25eJFhZgJaaUd6ZcjmQIYzgEY9Fk9tuWru', 'operador');

-- ----------------------------------------------------------------------------
--  refugios (5)
-- ----------------------------------------------------------------------------
INSERT INTO refugios (nombre, direccion, capacidad, alojados, estado) VALUES
('Escuela N° 15',           'Av. Belgrano 1250, Barrio Norte',   150,  95, 'activo'),
('Centro Comunitario',      'Pasaje Los Álamos 340, Centro',      80,  72, 'casi lleno'),
('Polideportivo Municipal', 'Ruta 9 km 1287, Zona Sur',          200,  45, 'activo'),
('Club Atlético Barrial',   'Calle San Martín 980, Villa Luján', 120,  30, 'activo'),
('Parroquia San José',      'Mendoza 455, Barrio Este',           60,  58, 'casi lleno');


-- ----------------------------------------------------------------------------
--  recursos (5)
--  La unidad cambia según el recurso, por eso es una columna propia (RN-07).
-- ----------------------------------------------------------------------------
INSERT INTO recursos (nombre, cantidad_disponible, cantidad_distribuida, unidad, estado) VALUES
('Alimentos no perecederos',  850.00,  320.00, 'kg',       'suficiente'),
('Agua potable',             2500.00, 1100.00, 'litros',   'crítico'),
('Frazadas y colchones',      320.00,  180.00, 'unidades', 'suficiente'),
('Medicamentos básicos',       45.00,   20.00, 'kits',     'bajo'),
('Ropa de abrigo',            500.00,  210.00, 'unidades', 'suficiente');


-- ----------------------------------------------------------------------------
--  voluntarios (6)
-- ----------------------------------------------------------------------------
INSERT INTO voluntarios (nombre, telefono, habilidad, disponibilidad, estado) VALUES
('Dr. Carlos Rodríguez', '381-4567890', 'Médico / Primeros auxilios',   'Turno tarde',  'activo'),
('Lucía Fernández',      '381-4123456', 'Rescate / Logística',          'Turno noche',  'en terreno'),
('Jorge Martínez',       '381-4987654', 'Comunicación / Redes sociales','Full-time',    'disponible'),
('Ana Gómez',            '381-4334455', 'Logística / Depósito',         'Turno mañana', 'activo'),
('Pedro Sosa',           '381-4778899', 'Transporte / Conducción',      'Turno tarde',  'disponible'),
('Valeria Paz',          '381-4221100', 'Asistencia psicológica',       'Turno mañana', 'disponible');


-- ----------------------------------------------------------------------------
--  mensajes_contacto (5)
-- ----------------------------------------------------------------------------
INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje, fecha) VALUES
('Roberto Díaz',   'roberto.diaz@mail.com',   'Ofrecimiento de donación',  'Tengo frazadas y ropa de abrigo para donar. ¿Dónde puedo acercarlas?',        '2026-10-28'),
('Carla Benítez',  'carla.benitez@mail.com',  'Quiero ser voluntaria',     'Soy enfermera y tengo disponibilidad los fines de semana.',                   '2026-10-30'),
('Hugo Ponce',     'hugo.ponce@mail.com',     'Consulta sobre refugios',   'Mi familia necesita alojamiento. ¿Qué refugio tiene lugar en la zona sur?',   '2026-11-01'),
('Lucía Paredes',  'lucia.paredes@mail.com',  'Oferta de transporte',      'Dispongo de una camioneta para traslados de ayuda durante la semana.',        '2026-11-02'),
('Marcos Herrera', 'marcos.herrera@mail.com', 'Reporte de zona anegada',   'En el pasaje Los Ceibos el agua no bajó. Hay varias casas afectadas.',        '2026-11-04');


-- ============================================================================
--  NIVEL 2 — Dependen de usuarios
-- ============================================================================

-- ----------------------------------------------------------------------------
--  emergencias (5)
--  usuario_id referencia a quien reportó la emergencia (RN-03).
-- ----------------------------------------------------------------------------
INSERT INTO emergencias (titulo, descripcion, gravedad, estado, fecha, zona, afectados, usuario_id) VALUES
('Inundación - Barrio Norte',  'Desborde del canal tras 48 horas de lluvia. Calles anegadas y viviendas afectadas.', 'alta',  'en proceso', '2026-10-25', 'Barrio Norte',    120, 2),
('Incendio - Zona Rural',      'Foco de incendio en campo lindero. Riesgo de propagación hacia viviendas.',          'media', 'en proceso', '2026-10-27', 'Zona Rural',       45, 3),
('Temporal - Costa Este',      'Voladura de techos y caída de árboles por vientos fuertes.',                         'baja',  'resuelta',   '2026-10-20', 'Costa Este',       30, 2),
('Corte de energía - Zona Sur','Corte prolongado que afecta a centros de salud y comercios de la zona.',             'media', 'activa',     '2026-11-02', 'Zona Sur',         80, 4),
('Derrumbe - Villa Esperanza', 'Desmoronamiento de un talud sobre la calle principal. Acceso interrumpido.',         'alta',  'activa',     '2026-11-04', 'Villa Esperanza',  25, 3);


-- ============================================================================
--  NIVEL 3 — Dependen de emergencias y voluntarios
-- ============================================================================

-- ----------------------------------------------------------------------------
--  solicitudes (6)
--  Cada solicitud pertenece a una emergencia (RN-11).
-- ----------------------------------------------------------------------------
INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, telefono_contacto, fecha, emergencia_id) VALUES
('Alimentos - Barrio Sur',           'Familias sin provisiones desde el inicio de la inundación.', 'alta',  'pendiente',  '381-2345678', '2026-10-26', 1),
('Agua potable - Zona Norte',        'La red de agua quedó contaminada. Se necesita agua envasada.','alta',  'en proceso', '381-3456789', '2026-10-26', 1),
('Medicamentos - Villa Esperanza',   'Vecinos con tratamiento crónico sin acceso a la farmacia.',   'media', 'atendida',   '381-4567891', '2026-11-05', 5),
('Frazadas - Costa Este',            'Familias evacuadas durante el temporal.',                     'baja',  'atendida',   '381-5678912', '2026-10-21', 3),
('Transporte - Zona Rural',          'Traslado de personas mayores fuera del área de riesgo.',      'media', 'pendiente',  '381-6789123', '2026-10-28', 2),
('Generadores - Zona Sur',           'Centro de salud sin energía desde hace dos días.',            'alta',  'en proceso', '381-7891234', '2026-11-03', 4);


-- ----------------------------------------------------------------------------
--  asignaciones (7)
--  Tabla intermedia. Nótese que el voluntario 1 está en dos emergencias
--  (RN-08) y que la emergencia 1 tiene tres voluntarios (RN-09).
-- ----------------------------------------------------------------------------
INSERT INTO asignaciones (voluntario_id, emergencia_id, tarea, fecha_asignacion) VALUES
(1, 1, 'Atención médica en el refugio Escuela N° 15', '2026-10-25'),
(2, 1, 'Coordinación de evacuación en zona anegada',  '2026-10-25'),
(4, 1, 'Recepción y clasificación de donaciones',     '2026-10-26'),
(1, 5, 'Atención médica en el punto de derrumbe',     '2026-11-04'),
(5, 2, 'Traslado de personas mayores',                '2026-10-28'),
(3, 4, 'Difusión del corte y puntos de carga',        '2026-11-02'),
(6, 5, 'Contención de familias evacuadas',            '2026-11-05');


-- ============================================================================
--  Fin de la carga de datos.
-- ============================================================================
