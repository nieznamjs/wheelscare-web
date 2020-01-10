import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({ example: 'contact@example.com' }) @IsEmail() public readonly email: string;
  @ApiProperty({ example: true, required: false }) @IsOptional() @IsBoolean() public readonly active: boolean;
}
