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
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsIn(['kg', 'litros', 'unidades', 'kits'])
  unidad: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidad_disponible?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cantidad_distribuida?: number;

  @IsOptional()
  @IsIn(['suficiente', 'bajo', 'crítico'])
  estado?: string;
}