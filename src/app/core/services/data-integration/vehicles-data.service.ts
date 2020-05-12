import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  IVehicleBrands, VEHICLE_BRANDS, VehicleFuelTypes, VehiclesDriveTypes, VehicleTransmissionTypes, VehicleTypes,
} from '@wheelscare/common';
import { FuelTypesLabels, TransmissionTypesLabels, VehiclesTypesLabels } from '@constants';
import { DriveTypesLabels } from '@shared/constants/drive-types-labels';

@Injectable({
  providedIn: 'root',
})
export class VehiclesDataService {
  public getBrands(): Observable<IVehicleBrands> {
    // TODO change to http request
    return of(VEHICLE_BRANDS);
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
}
