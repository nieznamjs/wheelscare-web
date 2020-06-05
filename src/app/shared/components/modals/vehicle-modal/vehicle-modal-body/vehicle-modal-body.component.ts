import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { FormsService } from '@services/utils/forms.service';
import { VehiclesUtilsService } from '@services/utils/vehicles-utils.service';
import { VehiclePaintColors, VehiclePaintTypes } from '@wheelscare/common';
import { PaintColorsLabels, PaintTypesLabels } from '@constants';
import { getSelectOptions } from '@helpers';

@Component({
  selector: 'wcw-vehicle-modal-body',
  templateUrl: './vehicle-modal-body.component.html',
  styleUrls: ['./vehicle-modal-body.component.scss']
})
export class VehicleModalBodyComponent {
  @Input() public formGroup: FormGroup;
  @Input() public isLoading: boolean;
  @Input() public errors: string[];
  @Output() public saved = new EventEmitter<void>();

  public readonly paintColors = getSelectOptions(VehiclePaintColors, PaintColorsLabels);
  public readonly paintTypes = getSelectOptions(VehiclePaintTypes, PaintTypesLabels);
  public readonly doorsNumber = this.vehiclesService.getDoorsNumberSelectOptions();
  public readonly seatsNumber = this.vehiclesService.getSeatsNumberSelectOptions();

  constructor(
    private formsService: FormsService,
    private vehiclesService: VehiclesUtilsService,
  ) { }

  public getFormControl(name: string): AbstractControl {
    return this.formsService.getFormControl(this.formGroup, name);
  }

  public save(): void {
    if (this.formGroup.invalid) { return; }

    this.saved.emit();
  }
}
