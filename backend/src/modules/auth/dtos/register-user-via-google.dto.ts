import { IsString } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class RegisterUserViaGoogleDto {
  @ApiProperty({ example: 'qIpdkjJ6aOK6zsat6YLwajgIioHGrHur' })
  @IsString()
  public token: string;
}
