// tslint:disable:max-classes-per-file
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

export class InvalidTokenError extends HttpException {
  constructor() {
    super(ApiErrors.InvalidToken, HttpStatus.UNAUTHORIZED);
  }
}

export class MissingAuthHeaderError extends HttpException {
  constructor() {
    super(ApiErrors.MissingAuthorizationHeader, HttpStatus.UNAUTHORIZED);
  }
}

export class UnauthorizedUserError extends HttpException {
  constructor() {
    super(ApiErrors.UnauthorizedUser, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidPasswordResetRequestError extends HttpException {
  constructor() {
    super(ApiErrors.BadRequestData, HttpStatus.BAD_REQUEST);
  }
}
