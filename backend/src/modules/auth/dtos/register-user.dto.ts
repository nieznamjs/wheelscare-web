import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'contact@example.com' }) @IsEmail() public email: string;

  @ApiProperty({ example: 'somestrongpassword' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @Matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){6,24}).*$/)
  public readonly password: string;
}
