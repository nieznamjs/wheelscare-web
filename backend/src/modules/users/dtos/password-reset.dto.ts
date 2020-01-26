import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { USER_PASSWORD_REGEX } from '@constants';

export class PasswordResetDto {
  @ApiProperty({ example: 'somestrongpassword' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(24)
  @Matches(USER_PASSWORD_REGEX)
  public readonly newPassword: string;
}
