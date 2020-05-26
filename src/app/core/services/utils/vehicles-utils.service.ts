import { Injectable } from '@angular/core';

import { getRange } from '@shared/helpers/get-range';

@Injectable({
  providedIn: 'root'
})
export class VehiclesUtilsService {
  public getDoorsNumberSelectOptions(): number[] {
    return getRange(3, 7);
  }

  public getSeatsNumberSelectOptions(): number[] {
    return getRange(2, 9);
  }
}
