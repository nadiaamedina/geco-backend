/* DTO DE CREACION — modulo contacto
   Las reglas replican las restricciones de la tabla mensajes_contacto */
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactoDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(120, { message: 'El nombre no puede superar los 120 caracteres.' })
  nombre: string;

  @IsEmail({}, { message: 'El correo electronico no tiene un formato valido.' })
  @MaxLength(120, { message: 'El correo no puede superar los 120 caracteres.' })
  email: string;

  @IsString({ message: 'El asunto debe ser un texto.' })
  @IsNotEmpty({ message: 'El asunto es obligatorio.' })
  @MaxLength(160, { message: 'El asunto no puede superar los 160 caracteres.' })
  asunto: string;

  @IsString({ message: 'El mensaje debe ser un texto.' })
  @IsNotEmpty({ message: 'El mensaje es obligatorio.' })
  mensaje: string;
}