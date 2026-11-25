import { Controller, Get } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  /* Modulo de solo lectura: las estadisticas se calculan, no se guardan */
  @Get()
  findAll() {
    return this.estadisticasService.findAll();
  }
}