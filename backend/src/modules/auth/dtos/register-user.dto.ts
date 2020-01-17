import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { USER_PASSWORD_REGEX } from '@constants';

export class RegisterUserDto {
  @ApiProperty({ example: 'contact@example.com' }) @IsEmail() public email: string;

  @ApiProperty({ example: 'somestrongpassword' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @Matches(USER_PASSWORD_REGEX)
  public readonly password: string;
}
