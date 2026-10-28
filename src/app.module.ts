import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmergenciasModule } from './modules/emergencias/emergencias.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { RecursosModule } from './modules/recursos/recursos.module';
import { RefugiosModule } from './modules/refugios/refugios.module';
import { VoluntariosModule } from './modules/voluntarios/voluntarios.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';
import { ContactoModule } from './modules/contacto/contacto.module';
import { EstadisticasModule } from './modules/estadisticas/estadisticas.module';
import { EventosGlobalesModule } from './modules/eventos-globales/eventos-globales.module';

@Module({
  imports: [EmergenciasModule, AuthModule, UsuariosModule, RecursosModule, RefugiosModule, VoluntariosModule, SolicitudesModule, ContactoModule, EstadisticasModule, EventosGlobalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
