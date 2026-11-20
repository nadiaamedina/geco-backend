/* MAIN — punto de entrada de la aplicacion */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* VALIDACION GLOBAL — ejecuta los decoradores de los DTOs
     en todas las peticiones que entran a la API */
  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();