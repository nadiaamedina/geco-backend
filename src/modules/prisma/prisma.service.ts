/* SERVICIO DE PRISMA — conexion de NestJS con PostgreSQL */
import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('La variable de entorno DATABASE_URL es obligatoria.');
    }

    /* Prisma 7 se conecta a PostgreSQL a traves de un adaptador */
    super({ adapter: new PrismaPg({ connectionString }) });
  }

  async onModuleInit() {
    await this.$connect();
  }
}