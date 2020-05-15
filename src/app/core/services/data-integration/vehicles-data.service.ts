import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';

import {
  IVehicleBrands, Vehicle,
  VEHICLE_BRANDS,
  VehicleFuelTypes,
  VehiclePaintColors,
  VehiclePaintTypes,
  VehiclesDriveTypes,
  VehicleTransmissionTypes,
  VehicleTypes,
} from '@wheelscare/common';
import {
  FuelTypesLabels,
  TransmissionTypesLabels,
  VehiclesTypesLabels,
  DriveTypesLabels,
  PaintColorsLabels,
  PaintTypesLabels,
} from '@constants';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  constructor(private apollo: Apollo) {
  }

  public getBrands(): Observable<IVehicleBrands> {
    // TODO change to http request
    return of(VEHICLE_BRANDS);
  }

  public createNewVehicle(vehicle: Vehicle): Observable<FetchResult<Vehicle>> {
    const mutation = gql`
      mutation addMyVehicle($vehicle: CreateVehicle!) {
        addMyVehicle(vehicle: $vehicle) {
          id,
        }
      }
    `;

    return this.apollo.mutate({ mutation, variables: { vehicle } });
  }

  public getVehicleTypesSelectOptions(): { key: string, label: string }[] {
    return Object.keys(VehicleTypes).map(key => ({ key, label: VehiclesTypesLabels[key] }));
  }

  public getFuelTypesSelectOptions(): { key: string, label: string}[] {
    return Object.keys(VehicleFuelTypes).map(key => ({ key, label: FuelTypesLabels[key] }));
  }

  public getTransmissionTypesSelectOptions(): { key: string, label: string}[] {
    return Object.keys(VehicleTransmissionTypes).map(key => ({ key, label: TransmissionTypesLabels[key] }));
  }

  public getDriveTypesSelectOptions(): { key: string, label: string}[] {
    return Object.keys(VehiclesDriveTypes).map(key => ({ key, label: DriveTypesLabels[key] }));
  }

  public getPaintColorsSelectOptions(): { key: string, label: string}[] {
    return Object.keys(VehiclePaintColors).map(key => ({ key, label: PaintColorsLabels[key] }));
  }

  public getPaintTypesSelectOptions(): { key: string, label: string}[] {
    return Object.keys(VehiclePaintTypes).map(key => ({ key, label: PaintTypesLabels[key] }));
  }

  public getDoorsNumberSelectOptions(): number[] {
    return [ 3, 4, 5, 6, 7 ];
  }

  public getSeatsNumberSelectOptions(): number[] {
    return [ 2, 3, 4, 5, 6, 7, 8, 9 ];
  }
}
