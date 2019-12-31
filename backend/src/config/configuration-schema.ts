import * as Joi from '@hapi/joi';
import { Environments } from '../common/constants';

export default Joi.object({
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  ENVIRONMENT: Joi.string().default(Environments.Local),
  BASIC_SECRET: Joi.string().required(),
});
