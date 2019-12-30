import { HttpException, HttpStatus } from '@nestjs/common';

// TODO: make user errors more generic
export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super('User already exists', HttpStatus.CONFLICT);
  }
}
