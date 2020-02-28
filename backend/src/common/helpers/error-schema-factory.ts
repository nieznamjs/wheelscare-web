import { Errors } from '@constants';
import { HttpStatus } from '@nestjs/common';

export const errorSchemaFactory = (statusCode: HttpStatus, message: Errors) => ({ example: { statusCode, message } });
