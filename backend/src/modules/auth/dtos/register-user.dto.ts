import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsEmail() public email: string;
  @IsNotEmpty() public password: string;
}
