import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { equal } from 'assert';

import { TokenTypes } from '@constants';
import {
  MissingAuthHeaderError,
  InvalidTokenError,
  InvalidPasswordResetRequestError,
  ExpiredTokenError,
} from '@errors';
import { TokenService } from '@services';
import { AppConfigService } from '@config';
import { UsersService } from '../users.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class ResetPasswordGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly config: AppConfigService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) { throw new MissingAuthHeaderError(); }

    const token = authorizationHeader.replace('Bearer ', '');

    if (!req.params.id) {
      throw new InvalidPasswordResetRequestError();
    }

    const id = req.params.id;

    try {
      const passwordResetTokenSecret = this.usersService.createPasswordResetTokenSecret(this.config.auth.passwordResetSecret, id);
      const payload = await this.tokenService.decodeToken(token, passwordResetTokenSecret) as { type: string };

      equal(payload.type, TokenTypes.ResetPassword);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError();
      }

      throw new InvalidTokenError();
    }

    return true;
  }
}
