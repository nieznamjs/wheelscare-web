import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({ example: 'somestrongpassword' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @Matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){6,24}).*$/) // TODO: the same is used for user register, move to constant
  public readonly password: string;
}
