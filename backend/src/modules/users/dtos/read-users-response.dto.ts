import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';
import { BaseUserDto } from './base-user.dto';

export class ReadUsersResponseDto {
  @ApiProperty({ type: [BaseUserDto] })
  public readonly data: BaseUserDto[];

  @ApiProperty({ example: faker.random.number({ min: 10, max: 150 }) })
  public readonly count: number;
}
