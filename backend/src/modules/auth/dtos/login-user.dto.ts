import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'contact@example.com' })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'somestrongpassword' })
  @IsNotEmpty()
  public password: string;
}
