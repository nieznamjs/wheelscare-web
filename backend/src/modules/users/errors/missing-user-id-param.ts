import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingUserIdParamError extends HttpException {
  constructor() {
    super('User :id param is missing', HttpStatus.NOT_FOUND);
  }
}
