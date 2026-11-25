import { 
  IsIn, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  MaxLength 
} from 'class-validator';

export class CreateVoluntarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  habilidad: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  disponibilidad: string;

  @IsOptional()
  @IsIn(['disponible', 'activo', 'en terreno'])
  estado?: string;
}