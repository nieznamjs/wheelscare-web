import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPasswordResetRequestError extends HttpException {
  constructor() {
    super('Bad request data', HttpStatus.BAD_REQUEST);
  }
}
