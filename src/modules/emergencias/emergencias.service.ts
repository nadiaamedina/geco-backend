/* SERVICIO DE EMERGENCIAS — consulta la base a traves de Prisma Client */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmergenciaDto } from './dto/create-emergencia.dto';
import { UpdateEmergenciaDto } from './dto/update-emergencia.dto';

@Injectable()
export class EmergenciasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEmergenciaDto: CreateEmergenciaDto) {
    /* La fecha no se manda: la base la completa con CURRENT_DATE */
    return this.prisma.emergencia.create({ data: createEmergenciaDto });
  }

  findAll() {
    return this.prisma.emergencia.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const emergencia = await this.prisma.emergencia.findUnique({
      where: { id },
    });

    if (!emergencia) {
      throw new NotFoundException(`No existe una emergencia con id ${id}.`);
    }

    return emergencia;
  }

  async update(id: number, updateEmergenciaDto: UpdateEmergenciaDto) {
    await this.findOne(id);

    return this.prisma.emergencia.update({
      where: { id },
      data: updateEmergenciaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.emergencia.delete({ where: { id } });
  }
}