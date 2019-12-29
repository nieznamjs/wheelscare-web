import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.entity';
import { ReadAllResponse } from '../../shared/interfaces/read-all-response.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { HashService } from '../../shared/services/hash.service';

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
    user.password = await this.hashService.hash(user.password);

    return this.userRepository.save(user);
  }
}
