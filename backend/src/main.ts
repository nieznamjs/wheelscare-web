process.env.TZ = 'UTC';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { AppModule } from './app.module';
import { AppConfigService } from '@config';
import { Routes } from '@constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

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
