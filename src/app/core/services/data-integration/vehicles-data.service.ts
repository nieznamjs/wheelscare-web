import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';
import { DataProxy } from 'apollo-cache';

import { IUser, IVehicleBrands, Vehicle, VEHICLE_BRANDS } from '@wheelscare/common';
import { DataService } from '@services/data-integration/data.service';
import { MutationResponse } from '@shared/interfaces/data.interface';
import { FetchResult } from 'apollo-link';

const getUsersVehiclesQuery = gql`
  {
    me {
      vehicles {
        id,
        vin,
        brand,
        mileage,
        engineCapacity,
        enginePower,
        yearOfProduction,
        vehicleModel,
        name,
      },
    },
  },
`;

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  constructor(private dataService: DataService) {}

  public getBrands(): Observable<IVehicleBrands> {
    // TODO change to http request
    return of(VEHICLE_BRANDS);
  }

  public createNewVehicle(vehicle: Vehicle): Observable<MutationResponse<{ addMyVehicle: Vehicle }>> {
    const mutation = gql`
      mutation addMyVehicle($vehicle: CreateVehicle!) {
        addMyVehicle(vehicle: $vehicle) {
          id,
          vin,
          brand,
          mileage,
          engineCapacity,
          enginePower,
          yearOfProduction,
          vehicleModel,
          name,
        },
      },
    `;

    return this.dataService.mutate<{ addMyVehicle: Vehicle }>({
      mutation,
      variables: { vehicle },
      update: (store: DataProxy, response: FetchResult<{ addMyVehicle: Vehicle }>) => {
        const storeData: { me: IUser } = store.readQuery({ query: getUsersVehiclesQuery });

        storeData.me.vehicles = [ ...storeData.me.vehicles, response.data.addMyVehicle ];

        store.writeQuery({ query: getUsersVehiclesQuery, data: storeData });
      },
    });
  }

  public deleteVehicle(id: string): Observable<MutationResponse<boolean>> {
    const mutation = gql`
      mutation deleteMyVehicle($id: String!) {
        deleteMyVehicle(id: $id),
      },
    `;

    return this.dataService.mutate<boolean>({
      mutation,
      variables: { id },
      update: (store: DataProxy) => {
        const storeData: { me: IUser } = store.readQuery({ query: getUsersVehiclesQuery });

        storeData.me.vehicles = storeData.me.vehicles.filter(vehicle => vehicle.id !== id);

        store.writeQuery({ query: getUsersVehiclesQuery, data: storeData });
      },
    });
  }
}
