import { BaseResponseDto } from '../../../common/dtos/base-response.dto';
import { User } from '../../users/users.entity';
import {
  VehicleFuelTypes, VehiclePaintColors,
  VehiclePaintTypes,
  VehiclesDriveTypes,
  VehicleTransmissionTypes,
  VehicleTypes,
} from '@purbanski-deftcode/wc-common';
import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';
import { UserResponseDto } from '../../users/dtos';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class VehicleResponseDto extends BaseResponseDto {
  @ApiModelProperty({ type: UserResponseDto })
  public owner: User;

  @ApiProperty({ example: '1C6RD6KT7CS194094' })
  public vin: string;

  @ApiProperty({ example: faker.random.objectElement(VehiclePaintColors) })
  public paintColor: VehiclePaintColors;

  @ApiProperty({ example: faker.random.objectElement(VehiclePaintTypes) })
  public paintType: VehiclePaintTypes;

  @ApiProperty({ example: faker.random.objectElement(VehicleTypes) })
  public type: VehicleTypes;

  @ApiProperty({ example: faker.random.objectElement(VehicleTransmissionTypes) })
  public transmissionType: VehicleTransmissionTypes;

  @ApiProperty({ example: 2012 })
  public yearOfProduction: number;

  @ApiProperty({ example: faker.random.boolean() })
  public hasLeftSteeringWheelPosition: boolean;

  @ApiProperty({ example: faker.random.objectElement(VehiclesDriveTypes) })
  public driveType: VehiclesDriveTypes;

  @ApiProperty({ example: 'Hyundai' })
  public brand: string;

  @ApiProperty({ example: 'i40' })
  public model: string;

  @ApiProperty({ example: faker.random.number(300) })
  public enginePower: number;

  @ApiProperty({ example: faker.random.number(3000) })
  public engineCapacity: number;

  @ApiProperty({ example: faker.random.objectElement(VehicleFuelTypes) })
  public fuelType: VehicleFuelTypes;
}
