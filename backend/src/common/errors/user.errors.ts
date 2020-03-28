// tslint:disable:max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

export class UserAlreadyExistsError extends HttpException {
  constructor() {
    super(ApiErrors.UserAlreadyExists, HttpStatus.CONFLICT);
  }
}

export class UserNotActiveError extends HttpException {
  constructor() {
    super(ApiErrors.UserIsNotActive, HttpStatus.FORBIDDEN);
  }
}

export class UserNotFoundError extends HttpException {
  constructor() {
    super(ApiErrors.UserNotFound, HttpStatus.NOT_FOUND);
  }
}

export class UserRoleNotAllowedError extends HttpException {
  constructor() {
    super(ApiErrors.UserRoleNotAllowed, HttpStatus.FORBIDDEN);
  }
}
