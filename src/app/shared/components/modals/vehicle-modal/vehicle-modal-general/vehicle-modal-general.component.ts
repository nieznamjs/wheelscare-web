import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { IVehicleBrands, VehicleTypes, IVehicleModel } from '@wheelscare/common';
import { FormsService } from '@services/utils/forms.service';
import { VehiclesTypesLabels } from '@constants';
import { getSelectOptions } from '@helpers';

@Component({
  selector: 'wcw-vehicle-modal-general',
  templateUrl: './vehicle-modal-general.component.html',
  styleUrls: ['./vehicle-modal-general.component.scss'],
})
export class VehicleModalGeneralComponent {
  @Input() public formGroup: FormGroup;
  @Input() public brands: IVehicleBrands;
  @Input() public currYear: number;

  public models: { [key: string]: IVehicleModel };
  public readonly vehicleTypes = getSelectOptions(VehicleTypes, VehiclesTypesLabels);

  constructor(
    private formsService: FormsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public brandSelected(): void {
    this.models = this.brands[this.formGroup.get('brand').value].models;
  }
}
