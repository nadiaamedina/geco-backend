/* DTO DE CREACION — modulo emergencias
   Las reglas replican las restricciones de la tabla emergencias */
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateEmergenciaDto {
  @IsString({ message: 'El título debe ser un texto.' })
  @IsNotEmpty({ message: 'El título es obligatorio.' })
  @MaxLength(160, { message: 'El título no puede superar los 160 caracteres.' })
  titulo: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto.' })
  descripcion?: string;

  /* RN-01: la base solo acepta alta, media o baja */
  @IsIn(['alta', 'media', 'baja'], {
    message: 'La gravedad debe ser alta, media o baja.',
  })
  gravedad: string;

  /* RN-02: opcional porque la base pone 'activa' por omision */
  @IsOptional()
  @IsIn(['activa', 'en proceso', 'resuelta'], {
    message: 'El estado debe ser activa, en proceso o resuelta.',
  })
  estado?: string;

  @IsString({ message: 'La zona debe ser un texto.' })
  @IsNotEmpty({ message: 'La zona es obligatoria.' })
  @MaxLength(120, { message: 'La zona no puede superar los 120 caracteres.' })
  zona: string;

  /* La base exige afectados >= 0 */
  @IsOptional()
  @IsInt({ message: 'La cantidad de afectados debe ser un número entero.' })
  @Min(0, { message: 'La cantidad de afectados no puede ser negativa.' })
  afectados?: number;

  /* RN-03: toda emergencia registra quien la reporto */
  @IsInt({ message: 'El usuario debe indicarse con un número entero.' })
  @Min(1, { message: 'El usuario debe ser un identificador válido.' })
  usuarioId: number;
}