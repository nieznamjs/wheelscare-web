import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenError extends HttpException {
  constructor() {
    super('Invalid token', HttpStatus.UNAUTHORIZED);
  }
}
