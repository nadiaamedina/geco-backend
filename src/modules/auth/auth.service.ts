/* SERVICIO DE AUTENTICACION — registro e inicio de sesion */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { isPrismaUniqueConstraintError } from '../prisma/prisma-error.util';
import { hashPassword, verifyPassword } from './password.util';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const { contrasena, ...datos } = registerAuthDto;

    /* La contrasena se hashea antes de guardar: nunca se almacena en texto plano */
    const hash = await hashPassword(contrasena);

    try {
      /* select explicito: el hash nunca sale en la respuesta */
      return await this.prisma.usuario.create({
        data: { ...datos, contrasena: hash },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          rol: true,
          creadoEn: true,
        },
      });
    } catch (error) {
      if (isPrismaUniqueConstraintError(error)) {
        throw new ConflictException('Ya existe una cuenta con ese correo.');
      }

      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: loginAuthDto.email },
    });

    /* Mismo mensaje para correo inexistente y contrasena incorrecta:
       si fueran distintos, revelaria que correos estan registrados */
    const credencialesInvalidas = new UnauthorizedException(
      'Las credenciales son incorrectas.',
    );

    if (!usuario) {
      throw credencialesInvalidas;
    }

    const coincide = await verifyPassword(
      loginAuthDto.contrasena,
      usuario.contrasena,
    );

    if (!coincide) {
      throw credencialesInvalidas;
    }

    const accessToken = await this.jwt.signAsync({
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    });

    return {
      access_token: accessToken,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
      },
    };
  }
}