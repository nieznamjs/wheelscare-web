import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { FindAllQueryDto } from '@dtos';
import { QueryService } from '@services';
import { ReadAllResponse } from '@interfaces';

import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleNotFoundError } from './errors';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    private readonly queryService: QueryService,
  ) {}

  public async read(findAllQueryDto: FindAllQueryDto): Promise<ReadAllResponse<Vehicle>> {
    return this.queryService.findAll<Vehicle>(Vehicle, findAllQueryDto);
  }

  public async readOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id);

    if (!vehicle) {
      throw new VehicleNotFoundError();
    }

    return vehicle;
  }

  public async create(vehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(vehicleDto);
    const createdVehicle = await this.vehicleRepository.save(vehicle);

    return this.vehicleRepository.findOne(createdVehicle.id);
  }

  public async delete(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne(id);

    await this.vehicleRepository.delete(id);

    return vehicle;
  }

  public async update(vehicleData: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(vehicleData);

    await this.vehicleRepository.update(vehicle.id, vehicle);

    return this.vehicleRepository.findOne(vehicle.id);
  }
}
