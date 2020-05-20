import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { IVehicleBrands, VehicleTypes, IVehicleModel } from '@wheelscare/common';
import { FormsService } from '@services/utils/forms.service';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { VehiclesTypesLabels } from '@constants';

@Component({
  selector: 'wcw-general-vehicle-data',
  templateUrl: './general-vehicle-data.component.html',
  styleUrls: ['./general-vehicle-data.component.scss'],
})
export class GeneralVehicleDataComponent {
  @Input() public formGroup: FormGroup;
  @Input() public brands: IVehicleBrands;
  @Input() public currYear: number;

  public models: { [key: string]: IVehicleModel };
  public readonly vehicleTypes = this.vehiclesService.getSelectOptions(VehicleTypes, VehiclesTypesLabels);

  constructor(
    private formsService: FormsService,
    private vehiclesService: VehiclesUtilsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public brandSelected(): void {
    this.models = this.brands[this.formGroup.get('brand').value].models;
  }
}
