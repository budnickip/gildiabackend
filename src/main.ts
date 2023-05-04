import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe dostarcza nam wygodny sposob 
  // na egzekwowanie walidacji dla wszystkich
  // przychodzących inputów za pomocą class-validatora
  app.useGlobalPipes(new ValidationPipe({
    // zatrzyma request jeśli jakiekolwiek dodatkowy
    // klucz się pojawi, działa tylko jak
    // whitelist: true jest zdefiniowane
    forbidNonWhitelisted: true,
    // nie prześle dodatkowych kluczy dalej
    whitelist: true,
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
