import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { ReadAllResponse } from '@interfaces';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashService } from '@services';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
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
