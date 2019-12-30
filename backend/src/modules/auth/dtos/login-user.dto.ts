import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail() public email: string;
  @IsNotEmpty() public password: string;
}
