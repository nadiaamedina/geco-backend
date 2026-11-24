/* SERVICIO DE CONTACTO — consulta la base a traves de Prisma Client */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';

@Injectable()
export class ContactoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createContactoDto: CreateContactoDto) {
    /* La fecha no se manda: la base la completa con CURRENT_DATE */
    return this.prisma.mensajeContacto.create({ data: createContactoDto });
  }

  findAll() {
    return this.prisma.mensajeContacto.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const mensaje = await this.prisma.mensajeContacto.findUnique({
      where: { id },
    });

    if (!mensaje) {
      throw new NotFoundException(`No existe un mensaje con id ${id}.`);
    }

    return mensaje;
  }

  async update(id: number, updateContactoDto: UpdateContactoDto) {
    await this.findOne(id);

    return this.prisma.mensajeContacto.update({
      where: { id },
      data: updateContactoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.mensajeContacto.delete({ where: { id } });
  }
}