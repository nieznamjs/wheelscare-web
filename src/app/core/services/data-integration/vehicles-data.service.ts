import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import gql from 'graphql-tag';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';

import { IUser, IVehicleBrands, Vehicle, VEHICLE_BRANDS } from '@wheelscare/common';
import { DataService } from '@services/data-integration/data.service';
import { MutationResponse, WatchQueryResponse } from '@shared/interfaces/data.interface';
import { GetVehicleResponse, InitVehicleTransferBody } from '@interfaces';

const getUsersVehiclesQuery = gql`
  {
    me {
      id,
      vehicles {
        id,
        brand,
        vehicleModel,
        name,
        default,
      },
    },
  },
`;

const getVehicleQuery = gql`
  query vehicle($id: String!) {
    vehicle(id: $id) {
      id,
      vin,
      paintColor,
      paintType,
      type,
      transmissionType,
      yearOfProduction,
      hasLeftSteeringWheelPosition,
      driveType,
      brand,
      vehicleModel,
      generation,
      enginePower,
      engineCapacity,
      fuelType,
      name,
      mileage,
      seatsNumber,
      doorsNumber,
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

  public getVehicle(id: string): Observable<WatchQueryResponse<GetVehicleResponse>> {
    return this.dataService.watchQuery<GetVehicleResponse>({ query: getVehicleQuery, variables: { id } });
  }

  public createNewVehicle(vehicle: Vehicle): Observable<MutationResponse<{ addMyVehicle: Vehicle }>> {
    const mutation = gql`
      mutation addMyVehicle($vehicle: CreateVehicle!) {
        addMyVehicle(vehicle: $vehicle) {
          id,
          vin,
          type,
          brand,
          vehicleModel,
          generation,
          name,
        },
      },
    `;

    return this.dataService.mutate<{ addMyVehicle: Vehicle }>({
      mutation,
      variables: { vehicle },
      refetchQueries: [{
        query: getUsersVehiclesQuery,
      }],
    });
  }

  public updateVehicle(vehicle: Vehicle): Observable<MutationResponse<{ updateMyVehicle: Vehicle }>> {
    const mutation = gql`
      mutation updateMyVehicle($vehicle: UpdateVehicle!) {
        updateMyVehicle(vehicle: $vehicle) {
          id,
          vin,
          paintColor,
          paintType,
          type,
          transmissionType,
          yearOfProduction,
          hasLeftSteeringWheelPosition,
          driveType,
          brand,
          vehicleModel,
          generation,
          enginePower,
          engineCapacity,
          fuelType,
          name,
          mileage,
          seatsNumber,
          doorsNumber,
        },
      },
    `;

    return this.dataService.mutate({ mutation, variables: { vehicle }});
  }

  public setDefaultVehicle(vehicle: Partial<Vehicle>): Observable<MutationResponse<{ updateMyVehicle: Vehicle }>> {
    const mutation = gql`
      mutation updateMyVehicle($vehicle: UpdateVehicle!) {
        updateMyVehicle(vehicle: $vehicle) {
          id,
          default,
        },
      },
    `;

    return this.dataService.mutate({
      mutation,
      variables: { vehicle },
      refetchQueries: [{
        query: getUsersVehiclesQuery,
      }],
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

  public initVehicleTransfer(body: InitVehicleTransferBody): Observable<MutationResponse<boolean>> {
    const mutation = gql`
      mutation initTransferMyVehicle($vehicleId: String, $targetUserEmail: String) {
        initTransferMyVehicle(vehicleId: $vehicleId, targetUserEmail: $targetUserEmail),
      },
    `;

    return this.dataService.mutate({ mutation, variables: body });
  }

  public confirmVehicleTransfer(token: string): Observable<MutationResponse<boolean>> {
    const mutation = gql`
      mutation confirmTransferMyVehicle($token: String) {
        confirmTransferMyVehicle(token: $token)
      }
    `;

    return this.dataService.mutate({
      mutation,
      variables: { token },
      refetchQueries: [{
        query: getUsersVehiclesQuery,
      }],
    });
  }
}
