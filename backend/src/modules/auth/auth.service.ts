import { Injectable } from '@nestjs/common';

import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { HashService, QueryService, TokenService } from '../../common/services';
import { FindAllQueryDto } from '../../common/dtos';
import { UnauthorizedUserError, UserNotActiveError } from '../../common/errors';
import { AppConfigService } from '../../config/app-config.service';
import { EQUAL, TokenTypes } from '../../common/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly queryService: QueryService,
    private readonly appConfigService: AppConfigService,
  ) {}

  public async register(userData: RegisterUserDto): Promise<User> {
    // TODO: implement sending activation email
    return this.usersService.create(userData);
  }

  public async authenticate(loginData: LoginUserDto): Promise<{ token: string }> {
    const query = new FindAllQueryDto({
      queries: [
        {
          email: { operator: EQUAL, value: loginData.email },
        },
      ],
      select: ['id', 'password'],
    });

    const res = await this.queryService.findAll<User>(User, query);
    const user = res.data[0];

    if (!user) { throw new UnauthorizedUserError(); }

    const arePasswordsEqual = await this.hashService.compare(loginData.password, user.password);

    if (!arePasswordsEqual) { throw new UnauthorizedUserError(); }
    // if (!user.active) { throw new UserNotActiveError(); }

    // https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
    // TODO: go later for RS256 algorithm
    const token = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token };
  }
}
