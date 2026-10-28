import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventosGlobalesService } from './eventos-globales.service';
import { CreateEventosGlobaleDto } from './dto/create-eventos-globale.dto';
import { UpdateEventosGlobaleDto } from './dto/update-eventos-globale.dto';

@Controller('eventos-globales')
export class EventosGlobalesController {
  constructor(private readonly eventosGlobalesService: EventosGlobalesService) {}

  @Post()
  create(@Body() createEventosGlobaleDto: CreateEventosGlobaleDto) {
    return this.eventosGlobalesService.create(createEventosGlobaleDto);
  }

  @Get()
  findAll() {
    return this.eventosGlobalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosGlobalesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventosGlobaleDto: UpdateEventosGlobaleDto) {
    return this.eventosGlobalesService.update(+id, updateEventosGlobaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosGlobalesService.remove(+id);
  }
}
