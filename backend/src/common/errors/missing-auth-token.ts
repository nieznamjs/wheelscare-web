import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingAuthHeaderError extends HttpException {
  constructor() {
    super('Missing authorization header', HttpStatus.UNAUTHORIZED);
  }
}
