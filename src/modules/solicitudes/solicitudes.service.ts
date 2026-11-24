/* SERVICIO DE SOLICITUDES — consulta la base a traves de Prisma Client */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSolicitudeDto } from './dto/create-solicitude.dto';
import { UpdateSolicitudeDto } from './dto/update-solicitude.dto';

@Injectable()
export class SolicitudesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSolicitudeDto: CreateSolicitudeDto) {
    return this.prisma.solicitud.create({ data: createSolicitudeDto });
  }

  findAll() {
    return this.prisma.solicitud.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const solicitud = await this.prisma.solicitud.findUnique({
      where: { id },
    });

    if (!solicitud) {
      throw new NotFoundException(`No existe una solicitud con id ${id}.`);
    }

    return solicitud;
  }

  async update(id: number, updateSolicitudeDto: UpdateSolicitudeDto) {
    await this.findOne(id);

    return this.prisma.solicitud.update({
      where: { id },
      data: updateSolicitudeDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.solicitud.delete({ where: { id } });
  }
}