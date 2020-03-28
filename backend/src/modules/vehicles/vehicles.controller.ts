import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from '@purbanski-deftcode/wc-common';

import { AuthTokenPayload, ReadAllResponse } from '@interfaces';
import { FindAllQueryDto } from '@dtos';
import { Routes } from '@constants';
import { AuthGuard } from '@guards';
import { UserData } from '@decorators';

import { errorSchemaFactory } from '../../common/helpers';
import { Vehicle } from './vehicles.entity';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { VehicleResponseDto } from './dtos/vehicle-response.dto';
import { VehiclesService } from './vehicles.service';
import { VehiclesResponseDto } from './dtos/vehicles-response.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

@ApiTags(Routes.Vehicles)
@Controller(Routes.Vehicles)
@UseGuards(AuthGuard)
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
  ) {}

  @Get()
  @ApiOkResponse({ type: VehiclesResponseDto, description: 'List of vehicles' })
  public async read(@Query() findAllQueryDto: FindAllQueryDto): Promise<ReadAllResponse<Vehicle>> {
    return this.vehiclesService.read(findAllQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: VehicleResponseDto, description: 'Single vehicle' })
  @ApiNotFoundResponse({ description: 'Vehicle not found', schema: errorSchemaFactory(HttpStatus.NOT_FOUND, ApiErrors.VehicleNotFound) })
  public async readOne(@Param('id') id: string, @UserData() userData: AuthTokenPayload): Promise<Vehicle> {
    return this.vehiclesService.readOne(id, userData);
  }

  @Post()
  @ApiCreatedResponse({ type: VehicleResponseDto, description: 'Created vehicle' })
  @ApiConflictResponse({ description: 'Vehicle already exists', schema: errorSchemaFactory(HttpStatus.CONFLICT, ApiErrors.VehicleAlreadyExists) })
  public async create(@Body() createVehicleDto: CreateVehicleDto, @UserData() userData: AuthTokenPayload): Promise<Vehicle> {
    return this.vehiclesService.create(createVehicleDto, userData);
  }

  @Delete(':id')
  @ApiOkResponse({ type: VehicleResponseDto, description: 'Deleted vehicle'})
  public async delete(@Param('id') id: string, @UserData() userData: AuthTokenPayload): Promise<Vehicle> {
    return this.vehiclesService.delete(id, userData);
  }

  @Patch()
  @ApiOkResponse({ type: VehicleResponseDto, description: 'Updated vehicle'})
  public async update(@Body() vehicleData: UpdateVehicleDto, @UserData() userData: AuthTokenPayload): Promise<Vehicle> {
    return this.vehiclesService.update(vehicleData, userData);
  }
}
