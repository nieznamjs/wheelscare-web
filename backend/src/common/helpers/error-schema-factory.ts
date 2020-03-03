import { HttpStatus } from '@nestjs/common';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

export const errorSchemaFactory = (statusCode: HttpStatus, message: ApiErrors) => ({ example: { statusCode, message } });
