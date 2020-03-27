import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';
import { VehicleResponseDto } from './vehicle-response.dto';

export class VehiclesResponseDto {
  @ApiProperty({ type: [VehicleResponseDto] })
  public readonly data: VehicleResponseDto[];

  @ApiProperty({ example: faker.random.number({ min: 10, max: 150 }) })
  public readonly count: number;
}
