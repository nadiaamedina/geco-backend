import { Module } from '@nestjs/common';
import { EventosGlobalesService } from './eventos-globales.service';
import { EventosGlobalesController } from './eventos-globales.controller';

@Module({
  controllers: [EventosGlobalesController],
  providers: [EventosGlobalesService],
})
export class EventosGlobalesModule {}
