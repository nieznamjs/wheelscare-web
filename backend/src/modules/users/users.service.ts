import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { ReadAllResponse } from '@interfaces';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashService } from '@services';

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
}
