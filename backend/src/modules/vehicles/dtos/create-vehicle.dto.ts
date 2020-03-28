import {
  VehicleFuelTypes,
  VehiclePaintColors,
  VehiclePaintTypes,
  VehiclesDriveTypes,
  VehicleTransmissionTypes,
  VehicleTypes,
} from '@purbanski-deftcode/wc-common';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as faker from 'faker';

export class CreateVehicleDto {
  @IsString()
  @ApiProperty({ example: faker.random.uuid() })
  public ownerId: string;

  @IsString()
  @ApiProperty({ example: '1C6RD6KT7CS194094' })
  public vin: string;

  @IsString()
  @ApiProperty({ example: faker.random.objectElement(VehiclePaintColors) })
  public paintColor: VehiclePaintColors;

  @IsEnum(VehiclePaintTypes)
  @ApiProperty({ example: faker.random.objectElement(VehiclePaintTypes) })
  public paintType: VehiclePaintTypes;

  @IsEnum(VehicleTypes)
  @ApiProperty({ example: faker.random.objectElement(VehicleTypes) })
  public type: VehicleTypes;

  @IsEnum(VehicleTransmissionTypes)
  @ApiProperty({ example: faker.random.objectElement(VehicleTransmissionTypes) })
  public transmissionType: VehicleTransmissionTypes;

  @IsNumber()
  @ApiProperty({ example: 2012 })
  public yearOfProduction: number;

  @IsBoolean()
  @ApiProperty({ example: faker.random.boolean() })
  public hasLeftSteeringWheelPosition: boolean;

  @IsEnum(VehiclesDriveTypes)
  @ApiProperty({ example: faker.random.objectElement(VehiclesDriveTypes) })
  public driveType: VehiclesDriveTypes;

  @IsString()
  @ApiProperty({ example: 'Hyundai' })
  public brand: string;

  @IsString()
  @ApiProperty({ example: 'i40' })
  public model: string;

  @IsNumber()
  @ApiProperty({ example: faker.random.number(300) })
  public enginePower: number;

  @IsNumber()
  @ApiProperty({ example: faker.random.number(3000) })
  public engineCapacity: number;

  @IsEnum(VehicleFuelTypes)
  @ApiProperty({ example: faker.random.objectElement(VehicleFuelTypes) })
  public fuelType: VehicleFuelTypes;
}
