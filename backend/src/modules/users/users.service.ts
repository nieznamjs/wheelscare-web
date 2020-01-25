import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAlreadyExistsError, UserNotFoundError } from '@errors';
import { ReadAllResponse } from '@interfaces';
import { QueryService } from '@services';
import { FindAllQueryDto } from '@dtos';

import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { AppConfigService } from '@config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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
