import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';

import { IVehicleBrands, Vehicle, VEHICLE_BRANDS } from '@wheelscare/common';
import { DataService } from '@services/data-integration/data.service';
import { MutationResponse } from '@shared/interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  constructor(private dataService: DataService) {}

  public getBrands(): Observable<IVehicleBrands> {
    // TODO change to http request
    return of(VEHICLE_BRANDS);
  }

  public createNewVehicle(vehicle: Vehicle): Observable<MutationResponse<Vehicle>> {
    const mutation = gql`
      mutation addMyVehicle($vehicle: CreateVehicle!) {
        addMyVehicle(vehicle: $vehicle) {
          id,
        }
      }
    `;

    return this.dataService.mutate<Vehicle>({ mutation, variables: { vehicle } });
  }
}
