import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRoles } from '@purbanski-deftcode/wc-common';
import * as faker from 'faker';

export class BaseUserDto {
  @ApiProperty({ example: 'contact@example.com' }) @IsEmail() public readonly email: string;
  @ApiProperty({ example: true, required: false }) @IsOptional() @IsBoolean() public readonly active: boolean;
  @ApiProperty({ example: faker.random.objectElement(UserRoles) }) @IsEnum(UserRoles) public readonly role: UserRoles;
}
