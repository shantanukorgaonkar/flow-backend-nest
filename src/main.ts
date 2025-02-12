import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  const configService = app.get(ConfigService)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
  }))
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
