import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { TokenTypes } from '@constants';
import { MissingAuthHeaderError, InvalidTokenError, InvalidPasswordResetRequestError  } from '@errors';
import { TokenService } from '@services';
import { AppConfigService } from '@config';
import { UsersService } from '../../modules/users/users.service';

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

      if (payload.type !== TokenTypes.ResetPassword) {
        throw new InvalidTokenError();
      }

    } catch (error) {
      throw new InvalidTokenError();
    }

    return true;
  }
}