import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { USER_PASSWORD_REGEX } from '@constants';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({ example: 'somestrongpassword' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @Matches(USER_PASSWORD_REGEX)
  public readonly password: string;
}
