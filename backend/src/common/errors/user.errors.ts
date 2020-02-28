// tslint:disable:max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from '@constants';

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super(Errors.UserAlreadyExists, HttpStatus.CONFLICT);
  }
}

export class UserNotActiveError extends HttpException {
  constructor() {
    super(Errors.UserIsNotActive, HttpStatus.FORBIDDEN);
  }
}

export class UserNotFoundError extends HttpException {
  constructor() {
    super(Errors.UserNotFound, HttpStatus.NOT_FOUND);
  }
}
