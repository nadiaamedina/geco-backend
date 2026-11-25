/* SERVICIO DE VOLUNTARIOS — consulta la base a traves de Prisma Client */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoluntarioDto } from './dto/create-voluntario.dto';
import { UpdateVoluntarioDto } from './dto/update-voluntario.dto';

@Injectable()
export class VoluntariosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVoluntarioDto: CreateVoluntarioDto) {
    /* El estado no se manda: la base lo completa con 'disponible' */
    return this.prisma.voluntario.create({ data: createVoluntarioDto });
  }

  findAll() {
    return this.prisma.voluntario.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const voluntario = await this.prisma.voluntario.findUnique({
      where: { id },
    });

    if (!voluntario) {
      throw new NotFoundException(`No existe un voluntario con id ${id}.`);
    }

    return voluntario;
  }

  async update(id: number, updateVoluntarioDto: UpdateVoluntarioDto) {
    await this.findOne(id);

    return this.prisma.voluntario.update({
      where: { id },
      data: updateVoluntarioDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.voluntario.delete({ where: { id } });
  }
}