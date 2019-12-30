import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedUserError extends HttpException {
  constructor() {
    super('Unauthorized user', HttpStatus.UNAUTHORIZED);
  }
}
