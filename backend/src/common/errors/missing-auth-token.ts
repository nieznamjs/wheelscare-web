import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingTokenError extends HttpException {
  constructor() {
    super('Missing token', HttpStatus.UNAUTHORIZED);
  }
}
