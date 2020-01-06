process.env.TZ = 'UTC';

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  await app.listen(config.port);
}

bootstrap();
