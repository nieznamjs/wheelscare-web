import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';
import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends CreateVehicleDto {
  @ApiProperty({ example: faker.random.uuid() }) @IsUUID('4') public readonly id: string;
}
