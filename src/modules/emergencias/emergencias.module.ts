import { Module } from '@nestjs/common';
import { EmergenciasService } from './emergencias.service';
import { EmergenciasController } from './emergencias.controller';

@Module({
  controllers: [EmergenciasController],
  providers: [EmergenciasService],
})
export class EmergenciasModule {}
