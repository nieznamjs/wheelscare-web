import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import got from 'got';

import { HashService, MailService, QueryService, TemplateService, TokenService } from '@services';
import { FindAllQueryDto } from '@dtos';
import { AppConfigService } from '@config';
import { EQUAL, MailSubjects, Templates, TokenTypes } from '@constants';
import { InvalidTokenError, UnauthorizedUserError, UserNotActiveError } from '@errors';

import { User } from '../users/users.entity';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from '../users/dtos';
import { FacebookTokenPayload } from './interfaces/facebook-token-payload.interface';
import { UserRoles } from '@purbanski-deftcode/wc-common';

@Injectable()
export class AuthService {
  private googleAuthClient: OAuth2Client;

  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly queryService: QueryService,
    private readonly appConfigService: AppConfigService,
    private readonly templateService: TemplateService,
    private readonly mailService: MailService,
  ) {
    this.googleAuthClient = new OAuth2Client(this.appConfigService.auth.googleClientId);
  }

  public async register(userData: RegisterUserDto): Promise<User> {
    const createdUser = await this.usersService.create(userData as CreateUserDto);

    await this.sendAccountActivationEmail(createdUser);

    return createdUser;
  }

  public async registerViaGoogle(token: string): Promise<{ token: string }> {
    const googleTokenPayload = await this.getGoogleTokenPayload(token);
    const user = await this.usersService.create({
      email: googleTokenPayload.email,
      password: null,
      active: true,
      role: UserRoles.Member,
    });

    const authToken = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token: authToken };
  }

  public async registerViaFacebook(token: string): Promise<{ token: string }> {
    const googleTokenPayload = await this.getFacebookTokenPayload(token);
    const user = await this.usersService.create({
      email: googleTokenPayload.email,
      password: null,
      active: true,
      role: UserRoles.Member,
    });

    const authToken = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token: authToken };
  }

  public async loginViaGoogle(token: string): Promise<{ token: string }> {
    const googleTokenPayload = await this.getGoogleTokenPayload(token);
    const user = await this.findUserByEmail(googleTokenPayload.email);

    const authToken = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token: authToken };
  }

  public async loginViaFacebook(token: string): Promise<{ token: string }> {
    const facebookTokenPayload = await this.getFacebookTokenPayload(token);
    const user = await this.findUserByEmail(facebookTokenPayload.email);

    const authToken = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token: authToken };
  }

  public async authenticate(loginData: LoginUserDto): Promise<{ token: string }> {
    const user = await this.findUserByEmail(loginData.email);

    const arePasswordsEqual = await this.hashService.compare(loginData.password, user.password);

    if (!arePasswordsEqual) { throw new UnauthorizedUserError(); }
    if (!user.active) { throw new UserNotActiveError(); }

    const token = await this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId: user.id,
      type: TokenTypes.Auth,
    });

    return { token };
  }

  private async getGoogleTokenPayload(token: string): Promise<TokenPayload> {
    const ticket = await this.googleAuthClient.verifyIdToken({
      idToken: token,
      audience: this.appConfigService.auth.googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload.email || !payload.sub) {
      throw new InvalidTokenError();
    }

    return payload;
  }

  private async findUserByEmail(email: string): Promise<User> {
    const query = new FindAllQueryDto({
      queries: [
        {
          email: { operator: EQUAL, value: email },
        },
      ],
      select: ['id', 'password', 'active'],
    });

    const res = await this.queryService.findAll<User>(User, query);
    const user = res.data[0];

    if (!user) { throw new UnauthorizedUserError(); }

    return user;
  }

  private async sendAccountActivationEmail(user: User): Promise<void> {
    const token = await this.tokenService.generateToken(
      this.usersService.generateAccountActivationSecret(user.id),
      { type: TokenTypes.AccountActivation },
      { expiresIn: this.appConfigService.auth.accountActivationTokenExpiration },
    );

    const template = await this.templateService.compileTemplate(Templates.USER_ACTIVATION, {
      email: user.email,
      url: `${this.appConfigService.clientUrl}/auth/activate-account/${user.id}?token=${token}`,
    });

    await this.mailService.send({
      mailFrom: this.appConfigService.email.systemEmail,
      mailTo: user.email,
      body: template,
      subject: MailSubjects.AccountActivation,
    });
  }

  private async getFacebookTokenPayload(token: string): Promise<FacebookTokenPayload> {
    const url = `https://graph.facebook.com/me?fields=id,email&access_token=${token}`;
    const { body } = await got(url, { responseType: 'json' });

    if (!body.email || !body.id) {
      throw new InvalidTokenError();
    }

    return body;
  }
}
