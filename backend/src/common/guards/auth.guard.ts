import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as assert from 'assert';

import { TokenService } from '@services';
import { IRequest, AuthTokenPayload } from '@interfaces';
import { AppConfigService } from '@config';
import { Cookies, TokenTypes } from '@constants';
import { InvalidTokenError } from '@errors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: AppConfigService,
    private tokenService: TokenService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: IRequest = context.switchToHttp().getRequest();
    const authToken = req.cookies[Cookies.AuthToken];

    if (!authToken) { throw new InvalidTokenError(); }

    try {
      const payload =  await this.tokenService.decodeToken<AuthTokenPayload>(authToken, this.configService.auth.basicSecret);

      assert.strict.strictEqual(payload.type, TokenTypes.Auth, 'Token type is wrong');

      req.userData = {
        userId: payload.userId,
        userRole: payload.userRole,
      };

    } catch (error) {
      throw new InvalidTokenError();
    }

    return true;
  }
}
