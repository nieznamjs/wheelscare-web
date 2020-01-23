import { AppLoggerService } from '@services';

process.env.TZ = 'UTC';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as cors from 'cors';
import * as expressPino from 'express-pino-logger';

import { AppModule } from './app.module';
import { AppConfigService } from '@config';
import { Routes } from '@constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const config = app.get(AppConfigService);
  const logger = app.get(AppLoggerService);

  const options = new DocumentBuilder()
    .setTitle('WheelsCare')
    .setVersion('1.0')
    .addTag(Routes.Users)
    .addTag(Routes.Auth)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  app.useLogger(logger);

  app
    .use(cookieParser())
    .use(expressPino())
    .use(cors({
      credentials: true,
      origin: (origin: string, callback: (err: Error, val?: boolean) => void) => {
        return callback(null, true);
      },
    }));

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
