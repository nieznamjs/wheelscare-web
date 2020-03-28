import { Injectable } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import got from 'got';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HashService, MailService, QueryService, TemplateService, TokenService } from '@services';
import { AppConfigService } from '@config';
import { MailSubjects, Templates, TokenTypes } from '@constants';
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
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    this.googleAuthClient = new OAuth2Client(this.appConfigService.auth.googleClientId);
  }

  public async register(userData: RegisterUserDto): Promise<User> {
    const createdUser = await this.usersService.create(userData as CreateUserDto);

    await this.sendAccountActivationEmail(createdUser);

    return createdUser;
  }

  public async loginViaGoogle(token: string): Promise<{ token: string }> {
    const googleTokenPayload = await this.getGoogleTokenPayload(token);
    const userByGoogleId = await this.userRepository.findOne({ googleId: googleTokenPayload.sub });

    if (!userByGoogleId) {
      return this.registerViaGoogle(googleTokenPayload.email, googleTokenPayload.sub);
    }

    const user = await this.findUserByEmailOrUnauthorize(googleTokenPayload.email);
    const authToken = await this.generateAuthToken(user.id, user.role);

    return { token: authToken };
  }

  public async loginViaFacebook(token: string): Promise<{ token: string }> {
    const facebookTokenPayload = await this.getFacebookTokenPayload(token);
    const userByFacebookId = await this.userRepository.findOne({ facebookId: facebookTokenPayload.id });

    if (!userByFacebookId) {
      return this.registerViaFacebook(facebookTokenPayload.email, facebookTokenPayload.id);
    }

    const user = await this.findUserByEmailOrUnauthorize(facebookTokenPayload.email);
    const authToken = await this.generateAuthToken(user.id, user.role);

    return { token: authToken };
  }

  public async login(loginData: LoginUserDto): Promise<{ token: string }> {
    const user = await this.findUserByEmailOrUnauthorize(loginData.email);
    const arePasswordsEqual = await this.hashService.compare(loginData.password, user.password);

    if (!arePasswordsEqual) { throw new UnauthorizedUserError(); }
    if (!user.active) { throw new UserNotActiveError(); }

    const token = await this.generateAuthToken(user.id, user.role);

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

  private async registerViaGoogle(email: string, googleId: string): Promise<{ token: string }> {
    const user = await this.usersService.create({
      email,
      password: null,
      active: true,
      googleId,
      role: UserRoles.Member,
    });

    const authToken = await this.generateAuthToken(user.id, user.role);

    return { token: authToken };
  }

  private async registerViaFacebook(email: string, facebookId: number): Promise<{ token: string }> {
    const user = await this.usersService.create({
      email,
      password: null,
      active: true,
      facebookId,
      role: UserRoles.Member,
    });

    const authToken = await this.generateAuthToken(user.id, user.role);

    return { token: authToken };
  }

  private async generateAuthToken(userId: string, userRole: UserRoles): Promise<string> {
    return this.tokenService.generateToken(this.appConfigService.auth.basicSecret, {
      userId,
      userRole,
      type: TokenTypes.Auth,
    });
  }

  private async findUserByEmailOrUnauthorize(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email }, { select: ['id', 'email', 'password', 'active', 'role'] });

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
