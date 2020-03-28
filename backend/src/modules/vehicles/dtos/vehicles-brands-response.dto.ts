import { IVehicleBrands, VEHICLE_BRANDS } from '@purbanski-deftcode/wc-common';
import { ApiProperty } from '@nestjs/swagger';

export class VehiclesBrandsResponseDto {
  @ApiProperty({ example: VEHICLE_BRANDS })
  public brands: IVehicleBrands;
}
