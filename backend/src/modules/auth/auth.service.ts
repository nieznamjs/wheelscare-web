import { Injectable } from '@nestjs/common';

import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { HashService, MailService, QueryService, TemplateService, TokenService } from '@services';
import { FindAllQueryDto } from '@dtos';
import { UnauthorizedUserError, UserNotActiveError } from '@errors';
import { AppConfigService } from '@config';
import { EQUAL, Templates, TokenTypes } from '@constants';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  private readonly ACCOUNT_ACTIVATION_TOKEN_EXPIRATION = 3600;

  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly queryService: QueryService,
    private readonly appConfigService: AppConfigService,
    private readonly templateService: TemplateService,
    private readonly mailService: MailService,
  ) {}

  public async register(userData: RegisterUserDto): Promise<User> {
    const createdUser = await this.usersService.create(userData as CreateUserDto);

    await this.sendAccountActivationEmail(createdUser);

    return createdUser;
  }

  public async authenticate(loginData: LoginUserDto): Promise<{ token: string }> {
    const query = new FindAllQueryDto({
      queries: [
        {
          email: { operator: EQUAL, value: loginData.email },
        },
      ],
      select: ['id', 'password', 'active'],
    });

    const res = await this.queryService.findAll<User>(User, query);
    const user = res.data[0];

    if (!user) { throw new UnauthorizedUserError(); }

    const arePasswordsEqual = await this.hashService.compare(loginData.password, user.password);

    if (!arePasswordsEqual) { throw new UnauthorizedUserError(); }
    if (!user.active) { throw new UserNotActiveError(); }

    // https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
    // TODO: go later for RS256 algorithm
    const token = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token };
  }

  private async sendAccountActivationEmail(user: User): Promise<void> {
    const token = await this.tokenService.generateToken(
      this.appConfigService.auth.basicSecret,
      { type: TokenTypes.AccountActivation },
      { expiresIn: this.ACCOUNT_ACTIVATION_TOKEN_EXPIRATION },
    );

    const template = await this.templateService.compileTemplate(Templates.USER_ACTIVATION, {
      email: user.email,
      // TODO: url should be dynamic, based on host sending request to server
      url: `https://localhost:4200/activate-account/${user.id}?token=${token}`,
    });

    await this.mailService.send({
      mailFrom: 'no-reply@chat.deftcode.pl',
      mailTo: user.email,
      body: template,
      subject: 'WheelsCare - Aktywacja konta',
    });
  }
}
