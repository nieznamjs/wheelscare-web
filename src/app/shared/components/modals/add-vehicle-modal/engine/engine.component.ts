import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';
import { VehiclesDataService } from '@services/data-integration/vehicles-data.service';

@Component({
  selector: 'wcw-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent {
  @Input() public formGroup: FormGroup;

  public readonly fuelTypes = this.vehiclesService.getFuelTypesSelectOptions();
  public readonly transmissionTypes = this.vehiclesService.getTransmissionTypesSelectOptions();
  public readonly driveTypes = this.vehiclesService.getDriveTypesSelectOptions();

  constructor(
    private formsService: FormsService,
    private vehiclesService: VehiclesDataService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public hasError(controlName: string): boolean {
    return (this.getFormControl(controlName).dirty || this.getFormControl(controlName).touched)
      && this.getFormControl(controlName).invalid;
  }
}
