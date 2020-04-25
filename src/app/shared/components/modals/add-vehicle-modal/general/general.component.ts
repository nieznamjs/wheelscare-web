import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { IVehicleBrands } from '@wheelscare/common';

import { FormsService } from '@services/utils/forms.service';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

const DATEPICKER_YEAR_FORMAT = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'YYYY',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'wcw-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: DATEPICKER_YEAR_FORMAT },
  ],
})
export class GeneralComponent {
  @Input() public formGroup: FormGroup;
  @Input() public brands: IVehicleBrands;
  @Input() public currYear: number;

  public models: { [key: string]: { generations: string[] } };
  public readonly vehicleTypes = this.vehiclesService.getVehicleTypesSelectOptions();

  constructor(
    private formsService: FormsService,
    private vehiclesService: VehiclesDataService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public brandSelected(): void {
    this.models = this.brands[this.formGroup.get('brand').value].models;
  }
}
