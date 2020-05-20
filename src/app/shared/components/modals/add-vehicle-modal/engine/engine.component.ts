import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { VehicleFuelTypes, VehiclesDriveTypes, VehicleTransmissionTypes } from '@wheelscare/common';
import { DriveTypesLabels, FuelTypesLabels, TransmissionTypesLabels } from '@constants';

@Component({
  selector: 'wcw-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent {
  @Input() public formGroup: FormGroup;

  public readonly fuelTypes = this.vehiclesService.getSelectOptions(VehicleFuelTypes, FuelTypesLabels);
  public readonly transmissionTypes = this.vehiclesService.getSelectOptions(VehicleTransmissionTypes, TransmissionTypesLabels);
  public readonly driveTypes = this.vehiclesService.getSelectOptions(VehiclesDriveTypes, DriveTypesLabels);

  constructor(
    private formsService: FormsService,
    private vehiclesService: VehiclesUtilsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }
}
