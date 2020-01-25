import { LoggerService, Injectable } from '@nestjs/common';
import * as pino from 'pino';

import { AppConfigService } from '@config';
import { Environments } from '@constants';

@Injectable()
export class AppLoggerService implements LoggerService {
  private logger = pino({
    useLevelLabels: true,
    level: this.config.logLevel,
    prettyPrint: this.config.environment === Environments.Local,
  });

  constructor(private config: AppConfigService) {}

  public log(message: string, payload = {}): void {
    this.logger.info(payload, message);
  }

  public error(message: string, payload = {}): void {
    this.logger.error(payload, message);
  }

  public warn(message: string, payload = {}): void {
    this.logger.warn(payload, message);
  }

  public debug(message: string, payload = {}): void {
    this.logger.debug(payload, message);
  }

  public verbose(message: string, payload = {}): void {
    this.logger.verbose(payload, message);
  }
}
