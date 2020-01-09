import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

interface SendMailConfig {
  subject: string;
  mailTo: string;
  mailFrom: string;
  body: string;
}

@Injectable()
export class MailService {
  private readonly CHARSET = 'UTF-8';

  private ses: AWS.SES;

  constructor() {
    this.ses = new AWS.SES({ apiVersion: '2010-12-01' });
  }

  public async send(config: SendMailConfig): Promise<AWS.SES.Types.SendEmailResponse> {
    return this.ses.sendEmail(this.generateSendEmailParams(config)).promise();
  }

  private generateSendEmailParams(config: SendMailConfig): AWS.SES.Types.SendEmailRequest {
    return {
      Destination: {
        ToAddresses: [config.mailTo],
      },
      Message: {
        Body: {
          Html: {
            Charset: this.CHARSET,
            Data: config.body,
          },
        },
        Subject: {
          Charset: this.CHARSET,
          Data: config.subject,
        },
      },
      Source: config.mailFrom,
    };
  }
}
