import { HttpException, HttpStatus } from '@nestjs/common';

export class ExpiredTokenError extends HttpException {
  constructor() {
    super('Expired token', HttpStatus.UNAUTHORIZED);
  }
}
