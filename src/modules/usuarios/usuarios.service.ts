import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  /* select explícito: la contraseña nunca sale de la base hacia la API */
  private readonly campos = {
    id: true,
    nombre: true,
    apellido: true,
    email: true,
    rol: true,
    creadoEn: true,
  };

  findAll() {
    return this.prisma.usuario.findMany({ select: this.campos });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: this.campos,
    });

    if (!usuario) {
      throw new NotFoundException(`No existe el usuario ${id}`);
    }
    return usuario;
  }
}