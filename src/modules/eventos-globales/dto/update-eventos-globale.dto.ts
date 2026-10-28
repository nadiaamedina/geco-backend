import { PartialType } from '@nestjs/mapped-types';
import { CreateEventosGlobaleDto } from './create-eventos-globale.dto';

export class UpdateEventosGlobaleDto extends PartialType(CreateEventosGlobaleDto) {}
