import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { BaseUserDto } from './base-user.dto';

export class InitPasswordResetDto extends BaseUserDto {
  @ApiProperty({ example: 'contact@example.com' }) @IsEmail() public readonly email: string;
}
