import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { ReadAllResponse } from '../../shared/interfaces/read-all-response.interface';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public read(): Promise<ReadAllResponse<User>> {
    return this.userRepository.findAndCount().then(data => ({ data: data[0], count: data[1] }));
  }

  public create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);

    return this.userRepository.save(user);
  }
}
