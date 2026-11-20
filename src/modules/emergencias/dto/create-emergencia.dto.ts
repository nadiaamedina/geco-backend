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
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  /* RN-01: la base solo acepta alta, media o baja */
  @IsIn(['alta', 'media', 'baja'])
  gravedad: string;

  /* RN-02: opcional porque la base pone 'activa' por omision */
  @IsOptional()
  @IsIn(['activa', 'en proceso', 'resuelta'])
  estado?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  zona: string;

  /* La base exige afectados >= 0 */
  @IsOptional()
  @IsInt()
  @Min(0)
  afectados?: number;

  /* RN-03: toda emergencia registra quien la reporto */
  @IsInt()
  @Min(1)
  usuarioId: number;
}