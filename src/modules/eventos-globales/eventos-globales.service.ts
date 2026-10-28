import { Injectable } from '@nestjs/common';
import { CreateEventosGlobaleDto } from './dto/create-eventos-globale.dto';
import { UpdateEventosGlobaleDto } from './dto/update-eventos-globale.dto';

@Injectable()
export class EventosGlobalesService {
  create(createEventosGlobaleDto: CreateEventosGlobaleDto) {
    return 'This action adds a new eventosGlobale';
  }

  findAll() {
    return `This action returns all eventosGlobales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventosGlobale`;
  }

  update(id: number, updateEventosGlobaleDto: UpdateEventosGlobaleDto) {
    return `This action updates a #${id} eventosGlobale`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventosGlobale`;
  }
}
