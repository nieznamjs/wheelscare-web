import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SES } from 'aws-sdk';

import { UserAlreadyExistsError, UserNotFoundError } from '@errors';
import { ReadAllResponse } from '@interfaces';
import { FindAllQueryDto } from '@dtos';
import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { HashService, QueryService, TokenService, MailService, TemplateService } from '@services';
import { TokenTypes, Templates } from '@constants';
import { AppConfigService } from '@config';
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
    private readonly queryService: QueryService,
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
      this.appConfigService.auth.passwordResetSecret,
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

  public async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<ResetPasswordDto> {
    return { ...resetPasswordDto, newPassword: 'hidden' };
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
