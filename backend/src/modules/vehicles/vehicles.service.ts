import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoles } from '@purbanski-deftcode/wc-common';

import { FindAllQueryDto } from '@dtos';
import { QueryService } from '@services';
import { AuthTokenPayload, ReadAllResponse } from '@interfaces';

import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleNotFoundError, WrongVehicleOwnerError } from './errors';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { User } from '../users/users.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly queryService: QueryService,
  ) {}

  public async read(findAllQueryDto: FindAllQueryDto): Promise<ReadAllResponse<Vehicle>> {
    // TODO: need to change query builder to support returning vehicles owner only by requesting member user
    return this.queryService.findAll<Vehicle>(Vehicle, findAllQueryDto);
  }

  public async readOne(id: string, userData: AuthTokenPayload): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id, { relations: ['owner'] });

    if (userData.userRole === UserRoles.Member && userData.userId !== vehicle.owner.id) {
      throw new WrongVehicleOwnerError();
    }

    if (!vehicle) {
      throw new VehicleNotFoundError();
    }

    return vehicle;
  }

  public async create(vehicleDto: CreateVehicleDto, userData: AuthTokenPayload): Promise<Vehicle> {
    if (userData.userRole === UserRoles.Member && userData.userId !== vehicleDto.ownerId) {
      throw new WrongVehicleOwnerError();
    }

    const owner = await this.userRepository.findOne(vehicleDto.ownerId);
    const vehicle = this.vehicleRepository.create({ ...vehicleDto, owner });
    const createdVehicle = await this.vehicleRepository.save(vehicle);

    return this.vehicleRepository.findOne(createdVehicle.id);
  }

  public async delete(id: string, userData: AuthTokenPayload): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id, { relations: ['owner'] });

    if (userData.userRole === UserRoles.Member && userData.userId !== vehicle.owner.id) {
      throw new WrongVehicleOwnerError();
    }

    await this.vehicleRepository.delete(id);

    return vehicle;
  }

  public async update(vehicleData: UpdateVehicleDto, userData: AuthTokenPayload): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(vehicleData);

    if (userData.userRole === UserRoles.Member && userData.userId !== vehicleData.ownerId) {
      throw new WrongVehicleOwnerError();
    }

    await this.vehicleRepository.update(vehicle.id, vehicle);

    return this.vehicleRepository.findOne(vehicle.id);
  }
}
