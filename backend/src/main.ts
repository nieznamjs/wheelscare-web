process.env.TZ = 'UTC';

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  await app.listen(config.port);
}

AWS.config.getCredentials(async err => {
  if (err) {
    // tslint:disable-next-line:no-console
    console.error('AWS login not working');
    return;
  }

  await bootstrap();
});
