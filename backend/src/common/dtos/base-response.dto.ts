import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';

export class BaseResponseDto {
  @ApiProperty({ example: faker.random.uuid() })
  public id: string;

  @ApiProperty({ example: faker.date.past() })
  public createdAt: string;

  @ApiProperty({ example: faker.date.past() })
  public updatedAt: string;
}
