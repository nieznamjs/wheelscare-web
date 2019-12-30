import { Module } from '@nestjs/common';

import { MailService, QueryService, ResponseService, TemplateService, TokenService, HashService } from './services';

@Module({
  exports: [
    HashService,
    MailService,
    QueryService,
    ResponseService,
    TemplateService,
    TokenService,
  ],
  providers: [
    HashService,
    MailService,
    QueryService,
    ResponseService,
    TemplateService,
    TokenService,
  ],
})
export class CommonModule {}
