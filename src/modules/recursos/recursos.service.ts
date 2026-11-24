import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRecursoDto } from './dto/create-recurso.dto';
import { UpdateRecursoDto } from './dto/update-recurso.dto';

@Injectable()
export class RecursosService {
  constructor(private readonly prisma: PrismaService) {}

  /* Prisma devuelve las cantidades como Decimal (NUMERIC en la base).
     Se convierten a número para que el JSON salga limpio */
  private convertir<
    T extends { cantidadDisponible: unknown; cantidadDistribuida: unknown },
  >(recurso: T) {
    return {
      ...recurso,
      cantidadDisponible: Number(recurso.cantidadDisponible),
      cantidadDistribuida: Number(recurso.cantidadDistribuida),
    };
  }

  async findAll() {
    const recursos = await this.prisma.recurso.findMany();
    return recursos.map((r) => this.convertir(r));
  }

  async findOne(id: number) {
    const recurso = await this.prisma.recurso.findUnique({ where: { id } });

    if (!recurso) {
      throw new NotFoundException(`No existe el recurso ${id}`);
    }
    return this.convertir(recurso);
  }

  async create(datos: CreateRecursoDto) {
    const recurso = await this.prisma.recurso.create({ data: datos });
    return this.convertir(recurso);
  }

  async update(id: number, datos: UpdateRecursoDto) {
    await this.findOne(id);
    const recurso = await this.prisma.recurso.update({
      where: { id },
      data: datos,
    });
    return this.convertir(recurso);
  }

  async remove(id: number) {
    await this.findOne(id);
    const recurso = await this.prisma.recurso.delete({ where: { id } });
    return this.convertir(recurso);
  }
}