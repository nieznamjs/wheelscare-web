import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  VehicleFuelTypes, VehiclePaintColors,
  VehiclePaintTypes,
  VehiclesDriveTypes,
  VehicleTransmissionTypes,
  VehicleTypes,
} from '@purbanski-deftcode/wc-common';

import { BaseEntity } from '@entities';

import { User } from '../users/users.entity';

@Entity({ name: 'vehicles' })
export class Vehicle extends BaseEntity {
  @OneToOne(type => User)
  @JoinColumn()
  public owner: User;

  @Column()
  public vin: string;

  @Column()
  public paintColor: VehiclePaintColors;

  @Column()
  public paintType: VehiclePaintTypes;

  @Column()
  public type: VehicleTypes;

  @Column()
  public transmissionType: VehicleTransmissionTypes;

  @Column()
  public yearOfProduction: number;

  @Column({ default: true })
  public hasLeftSteeringWheelPosition: boolean;

  @Column()
  public driveType: VehiclesDriveTypes;

  @Column()
  public brand: string;

  @Column()
  public model: string;

  @Column()
  public enginePower: number;

  @Column()
  public engineCapacity: number;

  @Column()
  public fuelType: VehicleFuelTypes;
}
