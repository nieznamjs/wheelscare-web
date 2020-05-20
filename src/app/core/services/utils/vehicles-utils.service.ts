import { Injectable } from '@angular/core';

import { SelectOption } from '@interfaces';
import { getRange } from '@shared/helpers/get-range';

@Injectable({
  providedIn: 'root'
})
export class VehiclesUtilsService {
  public getSelectOptions(enum1: { [key: string]: string }, enum2: { [key: string]: string }): SelectOption[] {
    return Object.keys(enum1).map(key => ({ key, label: enum2[key] }));
  }

  public getDoorsNumberSelectOptions(): number[] {
    return getRange(3, 7);
  }

  public getSeatsNumberSelectOptions(): number[] {
    return getRange(2, 9);
  }
}
