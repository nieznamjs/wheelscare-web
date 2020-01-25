import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetDto {
  @ApiProperty({ example: 'Str0ngp@ss' }) public readonly newPassword: string;
}
