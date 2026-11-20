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
  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  /* RN-13: prioridades posibles */
  @IsIn(['alta', 'media', 'baja'])
  prioridad: string;

  /* RN-12: opcional porque la base pone 'pendiente' por omision */
  @IsOptional()
  @IsIn(['pendiente', 'en proceso', 'atendida'])
  estado?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  telefonoContacto: string;

  /* RN-11: toda solicitud pertenece a una emergencia.
     Obligatorio y sin valor por omision, a proposito */
  @IsInt()
  @Min(1)
  emergenciaId: number;
}