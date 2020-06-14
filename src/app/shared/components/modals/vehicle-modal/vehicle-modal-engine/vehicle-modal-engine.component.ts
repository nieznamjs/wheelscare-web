import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';
import { VehicleFuelTypes, VehiclesDriveTypes, VehicleTransmissionTypes } from '@wheelscare/common';
import { DriveTypesLabels, FuelTypesLabels, TransmissionTypesLabels } from '@constants';
import { getSelectOptions } from '@helpers';

@Component({
  selector: 'wcw-vehicle-modal-engine',
  templateUrl: './vehicle-modal-engine.component.html',
  styleUrls: ['./vehicle-modal-engine.component.scss']
})
export class VehicleModalEngineComponent {
  @Input() public formGroup: FormGroup;

  public readonly fuelTypes = getSelectOptions(VehicleFuelTypes, FuelTypesLabels);
  public readonly transmissionTypes = getSelectOptions(VehicleTransmissionTypes, TransmissionTypesLabels);
  public readonly driveTypes = getSelectOptions(VehiclesDriveTypes, DriveTypesLabels);

  constructor(
    private formsService: FormsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }
}
