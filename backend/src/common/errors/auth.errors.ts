// tslint:disable:max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from '@constants';

export class InvalidTokenError extends HttpException {
  constructor() {
    super(Errors.InvalidToken, HttpStatus.UNAUTHORIZED);
  }
}

export class MissingAuthHeaderError extends HttpException {
  constructor() {
    super(Errors.MissingAuthorizationHeader, HttpStatus.UNAUTHORIZED);
  }
}

export class UnauthorizedUserError extends HttpException {
  constructor() {
    super(Errors.UnauthorizedUser, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordResetRequestError extends HttpException {
  constructor() {
    super(Errors.BadRequestData, HttpStatus.BAD_REQUEST);
  }
}
