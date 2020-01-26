import * as Joi from '@hapi/joi';
import { Environments } from '@constants';

export default Joi.object({
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  ENVIRONMENT: Joi.string().default(Environments.Local),
  BASIC_SECRET: Joi.string().required(),
  PASSWORD_RESET_SECRET: Joi.string().required(),
  ACCOUNT_ACTIVATION_SECRET: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  CLIENT_URL: Joi.string().required(),
  LOG_LEVEL: Joi.string().default('debug'),
  SYSTEM_EMAIL: Joi.string().email().required(),
});
