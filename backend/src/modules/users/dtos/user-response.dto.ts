import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';

import { BaseUserDto } from './base-user.dto';

export class UserResponseDto extends BaseUserDto {
  @ApiProperty({ example: faker.random.uuid() })
  public readonly id: string;

  @ApiProperty({ example: faker.date.past() })
  public readonly createdDate: string;

  @ApiProperty({ example: faker.date.past() })
  public readonly updatedDate: string;
}
