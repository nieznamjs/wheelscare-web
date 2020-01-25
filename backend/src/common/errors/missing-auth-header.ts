import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingAuthHeaderError extends HttpException {
  constructor() {
    super('Missing Authorization header', HttpStatus.UNAUTHORIZED);
  }
}
