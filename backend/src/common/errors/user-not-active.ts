import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotActiveError extends HttpException {
  constructor() {
    super('User is not active', HttpStatus.FORBIDDEN);
  }
}
