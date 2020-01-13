import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { ReadAllResponse } from '@interfaces';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashService, TokenService, MailService, TemplateService } from '@services';
import { UserNotFoundError } from '@errors';
import { TokenTypes, Templates } from '@constants';
import { AppConfigService } from '@config';
import { SES } from 'aws-sdk';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  private readonly PASSWORD_RESET_TOKEN_EXPIRATION = 3600;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly appConfigService: AppConfigService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly templateService: TemplateService,
  ) {}

  public async read(): Promise<ReadAllResponse<User>> {
    return this.userRepository.findAndCount().then(data => ({ data: data[0], count: data[1] }));
  }

  public async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);

    // TODO: maybe we can move this to entity to be always sure that passowrd will be encoded
    user.password = await this.hashService.encrypt(user.password);

    return this.userRepository.save(user);
  }

  // -------------------

  public async initResetPassword(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.sendMailWithPasswordResetUrl(user);
  }

  private async getPasswordResetToken(): Promise<string> {
    return this.tokenService.generateToken(
      this.appConfigService.passwordResetSecret,
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
      url: this.getUrlLinkWithToken(user.id, token),
    });
  }

  private async sendMailWithPasswordResetUrl(user: User): Promise<SES.SendEmailResponse> {
    const token = await this.getPasswordResetToken();
    const template = await this.getPasswordResetEmailTemplate(user, token);

    return await this.mailService.send({
      mailFrom: 'no-reply@chat.deftcode.pl',
      mailTo: user.email,
      body: template,
      subject: 'WheelsCare - Reset hasła',
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
}
