import { Injectable } from '@angular/core';

import { getRange } from '@shared/helpers/get-range';
import { BehaviorSubject } from 'rxjs';

import { Vehicle } from '@wheelscare/common';

@Injectable({
  providedIn: 'root'
})
export class VehiclesUtilsService {
  public currentVehicle$ = new BehaviorSubject<Vehicle>(null);

  public setCurrentVehicle(vehicle: Vehicle): void {
    this.currentVehicle$.next(vehicle);
  }

  public getDoorsNumberSelectOptions(): number[] {
    return getRange(3, 7);
  }

  public getSeatsNumberSelectOptions(): number[] {
    return getRange(2, 9);
  }
}
