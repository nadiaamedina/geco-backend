import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRefugioDto } from './dto/create-refugio.dto';
import { UpdateRefugioDto } from './dto/update-refugio.dto';

@Injectable()
export class RefugiosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const refugios = await this.prisma.refugio.findMany();

    /* Los lugares disponibles se calculan, no se guardan:
       así nunca quedan desactualizados */
    return refugios.map((r) => ({
      ...r,
      disponibles: r.capacidad - r.alojados,
    }));
  }

  async findOne(id: number) {
    const refugio = await this.prisma.refugio.findUnique({ where: { id } });

    if (!refugio) {
      throw new NotFoundException(`No existe el refugio ${id}`);
    }
    return { ...refugio, disponibles: refugio.capacidad - refugio.alojados };
  }

  create(datos: CreateRefugioDto) {
    return this.prisma.refugio.create({ data: datos });
  }

  async update(id: number, datos: UpdateRefugioDto) {
    await this.findOne(id);
    return this.prisma.refugio.update({ where: { id }, data: datos });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.refugio.delete({ where: { id } });
  }
}