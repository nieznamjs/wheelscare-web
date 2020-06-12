import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { getRange } from '@helpers';

@Injectable({
  providedIn: 'root'
})
export class VehiclesUtilsService {
  public currentVehicleId$ = new BehaviorSubject<string>(null);

  public setCurrentVehicle(id: string): void {
    this.currentVehicleId$.next(id);
  }

  public getDoorsNumberSelectOptions(): number[] {
    return getRange(3, 7);
  }

  public getSeatsNumberSelectOptions(): number[] {
    return getRange(2, 9);
  }
}
