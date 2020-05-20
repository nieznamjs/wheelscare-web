import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FetchResult } from 'apollo-link';

import { IVehicleBrands, Vehicle, VEHICLE_BRANDS } from '@wheelscare/common';

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  constructor(private apollo: Apollo) {}

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

    return this.apollo.mutate<Vehicle>({ mutation, variables: { vehicle } });
  }
}
