import { BaseUserDto } from './base-user.dto';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';

export class UpdateUserDto extends BaseUserDto {
  @ApiProperty({ example: faker.random.uuid() }) @IsUUID('4') public readonly id: string;
}
