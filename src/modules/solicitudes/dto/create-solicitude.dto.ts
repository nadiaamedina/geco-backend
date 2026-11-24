/* DTO DE CREACION — modulo solicitudes
   Las reglas replican las restricciones de la tabla solicitudes */
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSolicitudeDto {
  @IsString({ message: 'El título debe ser un texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @MaxLength(160, { message: 'El título no puede superar los 160 caracteres.' })
  titulo: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto.' })
  descripcion?: string;

  /* RN-13: prioridades posibles */
  @IsIn(['alta', 'media', 'baja'], {
    message: 'La prioridad debe ser alta, media o baja.',
  })
  prioridad: string;

  /* RN-12: opcional porque la base pone 'pendiente' por omision */
  @IsOptional()
  @IsIn(['pendiente', 'en proceso', 'atendida'], {
    message: 'El estado debe ser pendiente, en proceso o atendida.',
  })
  estado?: string;

  @IsString({ message: 'El teléfono de contacto debe ser un texto.' })
  @IsNotEmpty({ message: 'El teléfono de contacto es obligatorio.' })
  @MaxLength(30, {
    message: 'El teléfono no puede superar los 30 caracteres.',
  })
  telefonoContacto: string;

  /* RN-11: toda solicitud pertenece a una emergencia.
     Obligatorio y sin valor por omision, a proposito */
  @IsInt({ message: 'La emergencia debe indicarse con un número entero.' })
  @Min(1, { message: 'La emergencia debe ser un identificador válido.' })
  emergenciaId: number;
}