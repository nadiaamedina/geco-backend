/* DTO DE REGISTRO — modulo auth
   Las reglas replican las restricciones de la tabla usuarios */
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthDto {
  @IsString({ message: 'El nombre debe ser un texto.' })
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @MaxLength(60, { message: 'El nombre no puede superar los 60 caracteres.' })
  nombre: string;

  @IsString({ message: 'El apellido debe ser un texto.' })
  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @MaxLength(60, { message: 'El apellido no puede superar los 60 caracteres.' })
  apellido: string;

  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido.' })
  @MaxLength(120, { message: 'El correo no puede superar los 120 caracteres.' })
  email: string;

  /* Llega en texto plano y se hashea en el service, nunca se guarda asi */
  @IsString({ message: 'La contraseña debe ser un texto.' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria.' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(128, { message: 'La contraseña no puede superar los 128 caracteres.' })
  contrasena: string;

  /* Los tres valores salen del CHECK de la tabla usuarios */
  @IsIn(['coordinador', 'operador', 'administrador'], {
    message: 'El rol debe ser coordinador, operador o administrador.',
  })
  rol: string;
}