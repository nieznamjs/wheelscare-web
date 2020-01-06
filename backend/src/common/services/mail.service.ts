import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { AppConfigService } from '../../config/app-config.service';

interface SendMailConfig {
  subject: string;
  mailTo: string;
  mailFrom: string;
  body: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly  appConfigService: AppConfigService,
  ) {
    sendgrid.setApiKey(this.appConfigService.sendgrid.apiKey);
  }

  public async send(config: SendMailConfig): Promise<void> {
    return sendgrid.send({
      to: config.mailTo,
      from: config.mailFrom,
      subject: config.subject,
      html: config.body,
    }).then();
  }
}
