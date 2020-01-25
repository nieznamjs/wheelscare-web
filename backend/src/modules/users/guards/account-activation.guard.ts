import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import assert = require('assert');

import { TokenTypes } from '@constants';
import { InvalidTokenError, MissingAuthHeaderError } from '@errors';
import { TokenService } from '@services';

import { MissingUserIdParamError } from '../errors';
import { UsersService } from '../users.service';

@Injectable()
export class AccountActivationGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) { throw new MissingAuthHeaderError(); }

    const token = this.tokenService.getTokenFromBearerString(authorizationHeader);

    if (!req.params.id) {
      throw new MissingUserIdParamError();
    }

    const userID = req.params.id;

    try {
      const passwordResetTokenSecret = this.usersService.generateAccountActivationSecret(userID);
      const payload = await this.tokenService.decodeToken(token, passwordResetTokenSecret) as { type: string };

      assert(payload.type === TokenTypes.AccountActivation);
    } catch (error) {
      throw new InvalidTokenError();
    }

    return true;
  }
}
