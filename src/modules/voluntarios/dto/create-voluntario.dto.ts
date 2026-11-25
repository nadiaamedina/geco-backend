import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVoluntarioDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(120, { message: 'El nombre no puede superar los 120 caracteres.' })
  nombre: string;

  @IsString({ message: 'El teléfono debe ser un texto.' })
  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @MaxLength(30, { message: 'El teléfono no puede superar los 30 caracteres.' })
  telefono: string;

  @IsString({ message: 'La habilidad debe ser un texto.' })
  @IsNotEmpty({ message: 'La habilidad es obligatoria.' })
  @MaxLength(120, {
    message: 'La habilidad no puede superar los 120 caracteres.',
  })
  habilidad: string;

  @IsString({ message: 'La disponibilidad debe ser un texto.' })
  @IsNotEmpty({ message: 'La disponibilidad es obligatoria.' })
  @MaxLength(40, {
    message: 'La disponibilidad no puede superar los 40 caracteres.',
  })
  disponibilidad: string;

  @IsOptional()
  @IsIn(['disponible', 'activo', 'en terreno'], {
    message: 'El estado debe ser: disponible, activo o en terreno.',
  })
  estado?: string;
}