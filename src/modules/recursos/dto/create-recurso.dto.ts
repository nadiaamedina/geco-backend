import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRecursoDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(120, { message: 'El nombre no puede superar los 120 caracteres.' })
  nombre: string;

  @IsIn(['kg', 'litros', 'unidades', 'kits'], {
    message: 'La unidad debe ser: kg, litros, unidades o kits.',
  })
  unidad: string;

  @IsOptional()
  @IsNumber({}, { message: 'La cantidad disponible debe ser un número.' })
  @Min(0, { message: 'La cantidad disponible no puede ser negativa.' })
  cantidadDisponible?: number;

  @IsOptional()
  @IsNumber({}, { message: 'La cantidad distribuida debe ser un número.' })
  @Min(0, { message: 'La cantidad distribuida no puede ser negativa.' })
  cantidadDistribuida?: number;

  @IsOptional()
  @IsIn(['suficiente', 'bajo', 'crítico'], {
    message: 'El estado debe ser: suficiente, bajo o crítico.',
  })
  estado?: string;
}