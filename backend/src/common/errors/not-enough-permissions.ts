import { HttpException, HttpStatus } from '@nestjs/common';

export class NotEnoughPermissionsError extends HttpException {
  constructor() {
    super('Not enough permissions', HttpStatus.FORBIDDEN);
  }
}
