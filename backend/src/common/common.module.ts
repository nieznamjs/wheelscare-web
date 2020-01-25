import { Module } from '@nestjs/common';

import {
  MailService,
  QueryService,
  ResponseService,
  TemplateService,
  TokenService,
  HashService,
  AppLoggerService,
} from '@services';

@Module({
  exports: [
    HashService,
    MailService,
    QueryService,
    ResponseService,
    TemplateService,
    TokenService,
    AppLoggerService,
  ],
  providers: [
    HashService,
    MailService,
    QueryService,
    ResponseService,
    TemplateService,
    TokenService,
    AppLoggerService,
  ],
})
export class CommonModule {}
