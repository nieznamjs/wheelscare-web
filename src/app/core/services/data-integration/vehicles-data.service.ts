import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IVehicleBrands, VEHICLE_BRANDS, VehicleTypes } from '@wheelscare/common';
import { VehiclesTypesLabels } from '@constants';

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
}
