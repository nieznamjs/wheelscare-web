
import * as pino from 'pino';
import { Logger as PinoLogger } from 'pino';
import * as faker from 'faker';

import { AppLoggerService } from '@services';
import { AppConfigService } from '@config';

const loggerMock =  {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};

const configMock = {
  get logLevel() {
    return 'info';
  },
};

const message = faker.lorem.words();
const payload = { payload: faker.lorem.words() };

jest.mock('pino', () => (): Partial<PinoLogger> => loggerMock);

describe('AppLoggerService', () => {
  let appLoggerService: AppLoggerService;

  beforeEach(() => {
    appLoggerService = new AppLoggerService(configMock as AppConfigService);
  });

  describe('log', () => {
    it('should log message with payload as a log', () => {
      appLoggerService.log(message, payload);

      expect(loggerMock.info).toBeCalledTimes(1);
      expect(loggerMock.info).toBeCalledWith(payload, message);
    });
  });

  describe('error', () => {
    it('should log message with payload as an error', () => {
      appLoggerService.error(message, payload);

      expect(loggerMock.error).toBeCalledTimes(1);
      expect(loggerMock.error).toBeCalledWith(payload, message);
    });
  });

  describe('warn', () => {
    it('should log message with payload as a warn', () => {
      appLoggerService.warn(message, payload);

      expect(loggerMock.warn).toBeCalledTimes(1);
      expect(loggerMock.warn).toBeCalledWith(payload, message);
    });
  });

  describe('debug', () => {
    it('should log message with payload as a debug', () => {
      appLoggerService.debug(message, payload);

      expect(loggerMock.debug).toBeCalledTimes(1);
      expect(loggerMock.debug).toBeCalledWith(payload, message);
    });
  });

  describe('error', () => {
    it('should log message with payload as an verbose', () => {
      appLoggerService.verbose(message, payload);

      expect(loggerMock.verbose).toBeCalledTimes(1);
      expect(loggerMock.verbose).toBeCalledWith(payload, message);
    });
  });
});
