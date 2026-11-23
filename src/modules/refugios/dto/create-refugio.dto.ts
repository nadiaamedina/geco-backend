import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRefugioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  direccion: string;

  @IsInt()
  @Min(1)
  capacidad: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  alojados?: number;

  @IsOptional()
  @IsIn(['activo', 'casi lleno', 'completo'])
  estado?: string;
}