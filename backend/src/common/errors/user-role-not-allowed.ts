import { HttpException, HttpStatus } from '@nestjs/common';

export class UserRolesNotAllowedError extends HttpException {
  constructor() {
    super('User roles do not have enough permissions.', HttpStatus.FORBIDDEN);
  }
}
