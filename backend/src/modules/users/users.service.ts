import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAlreadyExistsError, UserNotFoundError } from '@errors';
import { ReadAllResponse } from '@interfaces';
import { FindAllQueryDto } from '@dtos';
import { User } from './users.entity';
import { HashService, QueryService, TokenService, MailService, TemplateService } from '@services';
import { TokenTypes, Templates, MailSubjects } from '@constants';
import { AppConfigService } from '@config';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  private readonly PASSWORD_RESET_TOKEN_EXPIRATION = 3600;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly templateService: TemplateService,
    private readonly queryService: QueryService,
    private readonly config: AppConfigService,
  ) {}

  public async read(findAllQueryDto: FindAllQueryDto): Promise<ReadAllResponse<User>> {
    return this.queryService.findAll<User>(User, findAllQueryDto);
  }

  public async readOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ email: userDto.email }, { select: ['id'] });

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const user = this.userRepository.create(userDto);
    const createdUser = await this.userRepository.save(user);

    return this.userRepository.findOne(createdUser.id);
  }

  public async initResetPassword(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.sendMailWithPasswordResetUrl(user);
  }

  private async getPasswordResetToken(userId: string): Promise<string> {
    return this.tokenService.generateToken(
      `${this.config.auth.passwordResetSecret}_${userId}`,
      { type: TokenTypes.ResetPassword },
      { expiresIn: this.PASSWORD_RESET_TOKEN_EXPIRATION },
    );
  }

  private async getUrlLinkWithToken(userId: string, token: string): Promise<string> {
    // TODO: url should be dynamic, based on host sending request to server
    return `http://localhost:4200/reset-password/${userId}?token=${token}`;
  }

  private async getPasswordResetEmailTemplate(user: User, token: string): Promise<string> {
    return this.templateService.compileTemplate(Templates.PASSWORD_RESET, {
      url: await this.getUrlLinkWithToken(user.id, token),
    });
  }

  private async sendMailWithPasswordResetUrl(user: User): Promise<void> {
    const token = await this.getPasswordResetToken(user.id);
    const template = await this.getPasswordResetEmailTemplate(user, token);

    await this.mailService.send({
      mailFrom: this.config.email.from,
      mailTo: user.email,
      body: template,
      subject: MailSubjects.PasswordReset,
    });
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  public async setPassword(email: string, newPassword: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    user.password = await this.hashService.encrypt(newPassword);

    await this.userRepository.save(user);
    return true;
  }

  public async resetPassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.readOne(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const password = this.hashService.encrypt(newPassword);
    const userConfig = { ...user, password };

    this.update(userConfig);

    return user;
  }

  public createPasswordResetTokenSecret(passwordResetSecret: string, userId: string): string {
    return `${passwordResetSecret}_${userId}`;
  }

  public async delete(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    await this.userRepository.delete(id);

    return user;
  }

  public async update(userData: UpdateUserDto): Promise<User> {
    const user = this.userRepository.create(userData);

    await this.userRepository.update(user.id, user);

    return this.userRepository.findOne(user.id);
  }

  public async activateUser(id: string): Promise<void> {
    await this.userRepository.update(id, { active: true });
  }

  public generateAccountActivationSecret(userID: string): string {
    return `${this.config.auth.accountActivationSecret}_${userID}`;
  }
}
