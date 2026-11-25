/* SERVICIO DE ESTADISTICAS — cuenta sobre las demas tablas con Prisma Client */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstadisticasService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    /* Las estadisticas no se guardan en una tabla: se calculan al pedirlas */
    const emergenciasActivas = await this.prisma.emergencia.count({
      where: { estado: 'activa' },
    });

    const totalSolicitudes = await this.prisma.solicitud.count();

    const solicitudesAtendidas = await this.prisma.solicitud.count({
      where: { estado: 'atendida' },
    });

    const voluntariosDisponibles = await this.prisma.voluntario.count({
      where: { estado: 'disponible' },
    });

    /* Si no hay solicitudes cargadas, el porcentaje es 0 y no una division por cero */
    const porcentajeAtendidas =
      totalSolicitudes === 0
        ? 0
        : Math.round((solicitudesAtendidas / totalSolicitudes) * 100);

    return {
      emergenciasActivas,
      totalSolicitudes,
      solicitudesAtendidas,
      voluntariosDisponibles,
      porcentajeAtendidas,
    };
  }
}