import * as mockAWS from 'aws-sdk-mock';

import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let sendEmailMock: any;

  beforeEach(() => {
    sendEmailMock = jest.fn();

    mockAWS.mock('SES', 'sendEmail', sendEmailMock);

    mailService = new MailService();
  });

  afterAll(() => {
    mockAWS.restore();
  });

  it('send email using correct params', () => {
    mailService.send({
      subject: 'Some test subject',
      mailFrom: 'from@example.com',
      mailTo: 'to@example.pl',
      body: '<h1>HELLO WORLD</h1>',
    });

    expect(sendEmailMock).toBeCalledTimes(1);
    expect(sendEmailMock).toBeCalledWith({
      Destination: {
        ToAddresses: ['to@example.pl'],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: '<h1>HELLO WORLD</h1>',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Some test subject',
        },
      },
      Source: 'from@example.com',
    }, expect.any(Function));
  });
});
