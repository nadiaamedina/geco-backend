/* MODULO RAIZ — registra todos los modulos de la aplicacion */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmergenciasModule } from '../emergencias/emergencias.module';
import { AuthModule } from '../auth/auth.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { RecursosModule } from '../recursos/recursos.module';
import { RefugiosModule } from '../refugios/refugios.module';
import { VoluntariosModule } from '../voluntarios/voluntarios.module';
import { SolicitudesModule } from '../solicitudes/solicitudes.module';
import { ContactoModule } from '../contacto/contacto.module';
import { EstadisticasModule } from '../estadisticas/estadisticas.module';
import { EventosGlobalesModule } from '../eventos-globales/eventos-globales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EmergenciasModule,
    AuthModule,
    UsuariosModule,
    RecursosModule,
    RefugiosModule,
    VoluntariosModule,
    SolicitudesModule,
    ContactoModule,
    EstadisticasModule,
    EventosGlobalesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}