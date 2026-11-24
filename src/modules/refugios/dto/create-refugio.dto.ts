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
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(120, { message: 'El nombre no puede superar los 120 caracteres.' })
  nombre: string;

  @IsString({ message: 'La dirección debe ser un texto.' })
  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @MaxLength(200, {
    message: 'La dirección no puede superar los 200 caracteres.',
  })
  direccion: string;

  @IsInt({ message: 'La capacidad debe ser un número entero.' })
  @Min(1, { message: 'La capacidad debe ser al menos 1.' })
  capacidad: number;

  @IsOptional()
  @IsInt({ message: 'Los alojados deben ser un número entero.' })
  @Min(0, { message: 'Los alojados no pueden ser negativos.' })
  alojados?: number;

  @IsOptional()
  @IsIn(['activo', 'casi lleno', 'completo'], {
    message: 'El estado debe ser: activo, casi lleno o completo.',
  })
  estado?: string;
}