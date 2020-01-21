import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAlreadyExistsError, UserNotFoundError } from '@errors';
import { ReadAllResponse } from '@interfaces';
import { FindAllQueryDto } from '@dtos';
import { HashService, QueryService } from '@services';

import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
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
